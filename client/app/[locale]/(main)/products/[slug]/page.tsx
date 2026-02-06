import { ProductDetailsTemplate } from "@/features/main/product/templates/ProductDetailsTemplate";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProductDetailsTemplate slug={slug} />;
}
