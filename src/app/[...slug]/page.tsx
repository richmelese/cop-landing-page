import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailBody from "@/components/DetailBody";
import DetailHero from "@/components/DetailHero";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import VisitorNav from "@/components/VisitorNav";
import { detailPages } from "@/content/detailPages";

export const instant = false;

export function generateStaticParams() {
  return Object.keys(detailPages).map((key) => ({ slug: key.split("/") }));
}

function getPage(slug: string[]) {
  return detailPages[slug.join("/")];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const page = getPage((await params).slug);
  if (!page) return {};
  return { title: `${page.title} | COP32 Ethiopia`, description: page.summary };
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const page = getPage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <DetailHero
          eyebrow={page.eyebrow}
          title={page.title}
          summary={page.summary}
          image={page.image}
          crumbs={
            page.sectionLabel === page.title
              ? [{ label: page.title }]
              : [{ label: page.sectionLabel, href: page.sectionHref }, { label: page.title }]
          }
        />
        {page.visitor && <VisitorNav current={page.visitorLabel ?? page.title} />}
        <DetailBody
          sections={page.sections}
          timeline={page.timeline}
          stats={page.stats}
          tagline={page.tagline}
          note={page.note}
          showWeather={page.showWeather}
        />
      </main>
      <Footer />
    </>
  );
}
