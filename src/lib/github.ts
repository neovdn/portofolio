import {
  GithubData,
  GithubRepo,
  ContributionDay,
  ContributionWeek,
} from "@/types";
import { githubData as defaultGithubData } from "@/data/portfolioData";

const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

interface GraphQLResponse {
  data?: {
    user?: {
      name: string | null;
      login: string;
      url: string;
      repositories: {
        totalCount: number;
        nodes: {
          name: string;
          description: string | null;
          primaryLanguage: { name: string } | null;
          languages: {
            edges: {
              size: number;
              node: { name: string };
            }[];
          };
          stargazerCount: number;
          forkCount: number;
          pushedAt: string;
          url: string;
        }[];
      };
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              contributionCount: number;
              contributionLevel: string;
              date: string;
              weekday: number;
            }[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
}

const GITHUB_GRAPHQL_QUERY = `
query GetUserContributionsAndRepos($username: String!) {
  user(login: $username) {
    name
    login
    url
    repositories(first: 50, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC, isFork: false) {
      totalCount
      nodes {
        name
        description
        primaryLanguage {
          name
        }
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
          edges {
            size
            node {
              name
            }
          }
        }
        stargazerCount
        forkCount
        pushedAt
        url
      }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            contributionLevel
            date
            weekday
          }
        }
      }
    }
  }
}
`;

/**
 * Fetch GitHub user profile, contribution graph, and public repositories from GitHub GraphQL API.
 * Uses process.env.GITHUB_TOKEN server-side.
 * Gracefully falls back to REST API or neutral defaults if unavailable.
 */
export async function getGithubData(
  targetUsername?: string
): Promise<GithubData> {
  const username =
    targetUsername || process.env.GITHUB_USERNAME || "neovdn";
  const token = process.env.GITHUB_TOKEN?.trim();

  // 1. Attempt GraphQL query (preferred for authentic contribution calendar + language stats)
  if (token) {
    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Neo-Portfolio",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: GITHUB_GRAPHQL_QUERY,
          variables: { username },
        }),
        next: { revalidate: 3600 }, // Cache on server, revalidate every hour
      });

      if (res.ok) {
        const json: GraphQLResponse = await res.json();
        const user = json.data?.user;

        if (user) {
          // Calculate top languages by total bytes across public repositories
          const langMap: Record<string, number> = {};
          let totalBytes = 0;

          user.repositories.nodes.forEach((repo) => {
            repo.languages.edges.forEach((edge) => {
              langMap[edge.node.name] =
                (langMap[edge.node.name] || 0) + edge.size;
              totalBytes += edge.size;
            });
          });

          const topLanguages = Object.entries(langMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, bytes]) => ({
              name,
              percentage:
                totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0,
            }));

          // Featured Repos: Take top 6 recently active repositories
          const featuredRepos: GithubRepo[] = user.repositories.nodes
            .slice(0, 6)
            .map((r) => ({
              name: r.name,
              description: r.description || "Public repository on GitHub",
              language: r.primaryLanguage?.name || "Plain Text",
              stars: r.stargazerCount || 0,
              forks: r.forkCount || 0,
              url: r.url,
              pushedAt: r.pushedAt,
            }));

          // Contribution Calendar and Streaks
          const rawWeeks =
            user.contributionsCollection.contributionCalendar.weeks;
          const totalContributions =
            user.contributionsCollection.contributionCalendar
              .totalContributions;

          let maxStreak = 0;
          let tempStreak = 0;
          const allDays: { count: number; date: string }[] = [];

          const weeks: ContributionWeek[] = rawWeeks.map((w) => {
            // A standard week has 7 weekday slots (0 = Sun, ..., 6 = Sat)
            const days: (ContributionDay | null)[] = new Array(7).fill(null);
            for (const d of w.contributionDays) {
              const level = LEVEL_MAP[d.contributionLevel] ?? 0;
              days[d.weekday] = {
                date: d.date,
                count: d.contributionCount,
                level,
                weekday: d.weekday,
              };
              allDays.push({ count: d.contributionCount, date: d.date });
            }
            return { days };
          });

          // Calculate peak consecutive active days streak
          for (const day of allDays) {
            if (day.count > 0) {
              tempStreak++;
              if (tempStreak > maxStreak) maxStreak = tempStreak;
            } else {
              tempStreak = 0;
            }
          }

          const contributionMatrix = weeks.map((w) =>
            w.days.map((d) => (d ? d.level : 0))
          );

          return {
            username: user.login,
            profileUrl: user.url,
            totalContributions,
            activeReposCount: user.repositories.totalCount,
            longestStreakDays: maxStreak,
            topLanguages,
            featuredRepos,
            contributionCalendar: {
              totalContributions,
              weeks,
            },
            contributionMatrix,
          };
        }
      }
    } catch (error) {
      console.warn("GitHub GraphQL fetch encountered an error:", error);
    }
  }

  // 2. Fallback to REST API if GraphQL fails or token is missing
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Neo-Portfolio",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=pushed&per_page=30`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      ),
    ]);

    if (userRes.ok && reposRes.ok) {
      const userData = await userRes.json();
      const rawRepos = await reposRes.json();

      const featuredRepos: GithubRepo[] = Array.isArray(rawRepos)
        ? rawRepos
            .filter((r: { fork?: boolean }) => !r.fork)
            .slice(0, 6)
            .map((r: { name: string; description: string | null; language: string | null; stargazers_count: number; forks_count: number; html_url: string; pushed_at: string }) => ({
              name: r.name,
              description: r.description || "Public repository on GitHub",
              language: r.language || "Plain Text",
              stars: r.stargazers_count || 0,
              forks: r.forks_count || 0,
              url: r.html_url,
              pushedAt: r.pushed_at,
            }))
        : [];

      return {
        ...defaultGithubData,
        username: userData.login || username,
        profileUrl: userData.html_url || `https://github.com/${username}`,
        activeReposCount: userData.public_repos ?? featuredRepos.length,
        featuredRepos,
      };
    }
  } catch (restError) {
    console.error("GitHub REST fallback failed:", restError);
  }

  return defaultGithubData;
}
