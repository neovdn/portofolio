import React from "react";
import { getGithubData } from "@/lib/github";
import { HeroSection } from "@/components/hero/HeroSection";
import { WorkSection } from "@/components/work/WorkSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { TechStackSection } from "@/components/stack/TechStackSection";
import { GithubSection } from "@/components/github/GithubSection";
import { ContactFooter } from "@/components/contact/ContactFooter";
import { HomeShell } from "@/components/navigation/HomeShell";

export default async function HomePage() {
  const githubData = await getGithubData();

  return (
    <HomeShell>
      <main className="flex-1 w-full">
        <HeroSection />
        <WorkSection />
        <ExperienceSection />
        <TechStackSection />
        <GithubSection data={githubData} />
      </main>
      <ContactFooter />
    </HomeShell>
  );
}

