"use client";

import { useTranslations } from "next-intl";
import { useWishlist } from "../hooks/useWishlist";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { useLoginRequiredModal } from "@/features/auth/stores/loginRequiredModalStore";
import { WishlistHeader } from "../components/wishlist-template/WishlistHeader";
import { WishlistLoading } from "../components/wishlist-template/WishlistLoading";
import { WishlistEmpty } from "../components/wishlist-template/WishlistEmpty";
import { WishlistGrid } from "../components/wishlist-template/WishlistGrid";

export const WishlistTemplate = () => {
  const t = useTranslations("Wishlist");
  const { user } = useAuthStore();
  const openLoginRequired = useLoginRequiredModal((s) => s.openLoginRequired);
  const { wishlist, isLoading, clearWishlist } = useWishlist();
  const products = wishlist?.products || [];

  if (!user) {
    return (
      <div className="min-h-screen pt-40 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <WishlistHeader
            title={t("title")}
            description={t("description")}
            count={0}
            clearLabel={t("clear_all")}
            onClear={() => openLoginRequired("wishlist")}
            showClear={false}
          />
          <WishlistEmpty
            title={t("guest_title")}
            description={t("guest_description")}
            actionLabel={t("sign_in")}
            onAction={() => openLoginRequired("wishlist")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <WishlistHeader
          title={t("title")}
          description={t("description")}
          count={products.length}
          clearLabel={t("clear_all")}
          onClear={() => clearWishlist()}
          showClear={products.length > 0}
        />

        {isLoading ? (
          <WishlistLoading message={t("loading")} />
        ) : products.length === 0 ? (
          <WishlistEmpty
            title={t("empty_title")}
            description={t("empty_description")}
            actionLabel={t("explore_collection")}
            actionHref="/shop"
          />
        ) : (
          <WishlistGrid products={products} />
        )}
      </div>
    </div>
  );
};
