import EditBrandTemplate from "@/features/brands/templates/EditBrandTemplate";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function EditBrandPage({ params }: PageProps) {
  const { slug } = params;
  return <EditBrandTemplate slug={slug} />;
}
