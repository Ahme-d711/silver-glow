"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function TestimonialSection() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isAr = locale === "ar";
  const testimonials = t.raw("testimonials") as { text: string; author: string; product: string }[];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header with Title and Navigation */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            {t("customer_opinions")}
          </h2>
          <div className="flex gap-4">
            <button className="testimonial-prev w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="testimonial-next w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swiper Carousel */}
        <div className="relative pb-16">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              el: ".testimonial-pagination",
              bulletClass: "swiper-pagination-bullet !bg-secondary !opacity-100",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-primary !w-8 !rounded-full transition-all duration-300",
            }}
            navigation={{
              nextEl: ".testimonial-next",
              prevEl: ".testimonial-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            className="h-full"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-card p-8 md:p-10 rounded-[32px] border border-divider shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <p className="text-lg md:text-xl text-content-primary leading-relaxed font-medium italic">
                      {testimonial.text}
                    </p>
                    
                    <div className="flex items-center gap-4 pt-4 border-t border-divider">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/10">
                        <Image
                          src={`https://i.pravatar.cc/150?u=${index}`}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-content-primary text-lg">
                          {testimonial.author}
                        </h4>
                        <span className="text-sm text-content-tertiary font-medium">
                          {testimonial.product}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="testimonial-pagination absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex gap-2" />
        </div>
      </div>
    </section>
  );
}
