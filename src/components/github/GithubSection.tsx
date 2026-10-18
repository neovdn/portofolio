"use client";

import React from "react";
import { GithubData } from "@/types";
import { githubData as defaultGithubData } from "@/data/portfolioData";
import { ContributionGrid } from "./ContributionGrid";
import { GitHubIcon } from "@/components/ui/Icons";
import { Star, ArrowUpRight, Code2, GitFork } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

interface GithubSectionProps {
  data?: GithubData;
}

export function GithubSection({ data = defaultGithubData }: GithubSectionProps) {
  const currentData = data || defaultGithubData;

  return (
    <section id="github" className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-t border-[#D9D9D9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#737373] tracking-widest uppercase">
                04 / OPEN SOURCE &amp; CODE
              </span>
              <div className="h-[1px] w-8 bg-[#D9D9D9]" />
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111]">
              Developer Activity
            </h2>
          </div>

          <a
            href={currentData.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#111111] hover:underline underline-offset-4"
          >
            <GitHubIcon className="w-4 h-4" />
            <span>@{currentData.username} ↗</span>
          </a>
        </motion.div>

        {/* Contribution Graph Box */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="bg-[#FFFFFF] border border-[#D9D9D9] rounded-xl p-6 sm:p-8 mb-10 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#EBEBE8] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#111111] text-[#F5F5F3] flex items-center justify-center font-mono text-xs font-bold">
                NV
              </div>
              <div>
                <h3 className="font-sans text-base font-bold text-[#111111]">
                  GitHub Contribution History
                </h3>
                <p className="font-mono text-xs text-[#737373]">
                  {currentData.totalContributions} verified contribution{currentData.totalContributions === 1 ? "" : "s"} · {currentData.longestStreakDays} day peak streak
                </p>
              </div>
            </div>

            {/* Language Breakdown */}
            {currentData.topLanguages && currentData.topLanguages.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-[#737373]">
                {currentData.topLanguages.map((lang) => (
                  <span
                    key={lang.name}
                    className="px-2 py-0.5 bg-[#F5F5F3] border border-[#D9D9D9] text-[#111111] rounded text-[11px]"
                  >
                    {lang.name} {lang.percentage}%
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Heatmap Matrix */}
          <ContributionGrid
            weeks={currentData.contributionCalendar?.weeks}
            totalContributions={currentData.totalContributions}
          />
        </motion.div>

        {/* Featured Public Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-xs text-[#737373] uppercase tracking-wider">
              RECENTLY ACTIVE REPOSITORIES
            </h3>
            <span className="font-mono text-xs text-[#737373]">
              {currentData.activeReposCount} Total Repositories
            </span>
          </div>

          {currentData.featuredRepos && currentData.featuredRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {currentData.featuredRepos.map((repo, idx) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease }}
                  className="group p-6 bg-[#FFFFFF] border border-[#D9D9D9] hover:border-[#111111] rounded-xl transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#737373] group-hover:text-[#111111]" />
                        <h4 className="font-mono text-sm font-bold text-[#111111] group-hover:underline underline-offset-2">
                          {repo.name}
                        </h4>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#737373] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#111111]" />
                    </div>

                    <p className="font-sans text-xs text-[#737373] leading-relaxed mt-2 line-clamp-2">
                      {repo.description || "Public repository on GitHub"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#EBEBE8] text-xs font-mono text-[#737373]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#111111]" />
                      <span>{repo.language || "Plain Text"}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {typeof repo.forks === "number" && repo.forks > 0 && (
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-[#737373]" />
                          <span>{repo.forks}</span>
                        </div>
                      )}
                      {repo.stars > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-[#737373]" />
                          <span>{repo.stars}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-[#FFFFFF] border border-[#D9D9D9] rounded-xl text-center font-mono text-xs text-[#737373]">
              No public repositories found.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
