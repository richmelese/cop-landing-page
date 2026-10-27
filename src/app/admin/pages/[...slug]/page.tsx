import PageEditor from "./PageEditor";

export const instant = false;

export default async function AdminPageEdit({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <PageEditor slug={slug.join("/")} />;
}
