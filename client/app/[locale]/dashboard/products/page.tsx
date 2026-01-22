import ProductsTemplate from "@/features/products/templates/ProductsTemplate";
import { Suspense } from "react";
import UniLoading from "@/components/shared/UniLoading";

export default function ProductsPage() {
  return (
    <Suspense fallback={<UniLoading />}>
      <ProductsTemplate />
    </Suspense>
  );
}
