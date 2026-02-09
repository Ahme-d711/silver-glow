"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/utils/image.utils";
import { cn } from "@/lib/utils";
import type { Swiper as SwiperCore } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Slider */}
      <div className="relative group rounded-3xl overflow-hidden aspect-square bg-secondary/10">
        <Swiper
          modules={[Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          navigation={{
            prevEl: ".gallery-prev",
            nextEl: ".gallery-next",
          }}
          className="h-full w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={getImageUrl(img) || "/images/placeholder.png"}
                  alt={`${name} - ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button className="gallery-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-primary shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 disabled:opacity-0">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="gallery-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-primary shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 disabled:opacity-0">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="relative h-24">
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={4}
            watchSlidesProgress
            className="h-full w-full thumbs-slider"
          >
            {images.map((img, index) => (
              <SwiperSlide 
                key={index} 
                className="cursor-pointer rounded-xl overflow-hidden border-2 border-transparent transition-all h-full!"
              >
                <div className="relative h-full w-full bg-secondary/10">
                  <Image
                    src={getImageUrl(img) || "/images/placeholder.png"}
                    alt={`${name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover opacity-70 transition-opacity hover:opacity-100"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};
