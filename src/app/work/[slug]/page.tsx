import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { projects } from "@/data/portfolioData";
import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { Navbar } from "@/components/navigation/Navbar";
import { ContactFooter } from "@/components/contact/ContactFooter";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found · Bernhardth Neo Videan",
    };
  }

  return {
    title: `${project.title} — Case Study · Bernhardth Neo Videan`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <CaseStudyLayout project={project} nextProject={nextProject} />
      </main>
      <ContactFooter />
    </div>
  );
}
