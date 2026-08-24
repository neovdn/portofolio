"use client";

import React from "react";
import { githubData } from "@/data/portfolioData";
import { ContributionGrid } from "./ContributionGrid";
import { GitHubIcon } from "@/components/ui/Icons";
import { Star, ArrowUpRight, Code2 } from "lucide-react";

export function GithubSection() {
  return (
    <section id="github" className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 border-t border-[#D9D9D9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#737373] tracking-widest uppercase">
                03 / OPEN SOURCE &amp; CODE
              </span>
              <div className="h-[1px] w-8 bg-[#D9D9D9]" />
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111]">
              Developer Activity
            </h2>
          </div>

          <a
            href={githubData.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#111111] hover:underline underline-offset-4"
          >
            <GitHubIcon className="w-4 h-4" />
            <span>@{githubData.username} ↗</span>
          </a>
        </div>

        {/* Contribution Graph Box */}
        <div className="bg-[#FFFFFF] border border-[#D9D9D9] rounded-xl p-6 sm:p-8 mb-10 shadow-sm">
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
                  {githubData.totalContributions} verified contributions · {githubData.longestStreakDays} day peak streak
                </p>
              </div>
            </div>

            {/* Language Breakdown */}
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-[#737373]">
              {githubData.topLanguages.map((lang) => (
                <span
                  key={lang.name}
                  className="px-2 py-0.5 bg-[#F5F5F3] border border-[#D9D9D9] text-[#111111] rounded text-[11px]"
                >
                  {lang.name} {lang.percentage}%
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Heatmap Matrix */}
          <ContributionGrid />
        </div>

        {/* Featured Public Repositories */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-xs text-[#737373] uppercase tracking-wider">
              RECENTLY ACTIVE REPOSITORIES
            </h3>
            <span className="font-mono text-xs text-[#737373]">
              {githubData.activeReposCount} Total Repositories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {githubData.featuredRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
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

                  <p className="font-sans text-xs text-[#737373] leading-relaxed mt-2">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#EBEBE8] text-xs font-mono text-[#737373]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#111111]" />
                    <span>{repo.language}</span>
                  </div>

                  {repo.stars > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#737373]" />
                      <span>{repo.stars}</span>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
