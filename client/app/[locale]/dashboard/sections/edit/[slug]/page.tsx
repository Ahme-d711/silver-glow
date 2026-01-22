import EditSectionTemplate from "@/features/sections/templates/EditSectionTemplate";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function EditSectionPage({ params }: PageProps) {
  const { slug } = params;
  return <EditSectionTemplate slug={slug} />;
}
