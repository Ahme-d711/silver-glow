"use client";

import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { HomeReview } from "../../types/review.types";
import { getImageUrl } from "@/utils/image.utils";

interface TestimonialCardProps {
  testimonial: HomeReview;
  index: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  const locale = useLocale();
  const isEn = locale === "en";
  const productName = isEn ? testimonial.productId.nameEn : testimonial.productId.nameAr;
  const userPhoto = getImageUrl(testimonial.userId.picture);
  const userInitial = testimonial.userId.name.charAt(0).toUpperCase();

  return (
    <div className="bg-card p-4 md:p-6 rounded-[32px] border border-divider shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col justify-between">
      <div className="space-y-6">
        <p className="text-lg md:text-xl text-content-primary leading-relaxed font-medium italic">
          {testimonial.comment}
        </p>
        
        <div className="flex items-center gap-4 pt-4 border-t border-divider">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/10 bg-secondary flex items-center justify-center">
            {testimonial.userId.picture ? (
              <Image
                src={userPhoto || ""}
                alt={testimonial.userId.name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-xl font-bold text-primary">{userInitial}</span>
            )}
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-content-primary text-lg">
              {testimonial.userId.name}
            </h4>
            <span className="text-sm text-content-tertiary font-medium">
              {productName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
