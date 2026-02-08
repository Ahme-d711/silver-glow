"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { TestimonialCard } from "../cards/TestimonialCard";
import { useHomeReviews } from "../../hooks/useHome";
import { HomeReview } from "../../types/review.types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function TestimonialSection() {
  const t = useTranslations("Home");
  const { data: reviews = [], isLoading } = useHomeReviews();

  // ... (rest of the logic remains same)

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 animate-pulse">
           <div className="h-10 w-64 bg-secondary rounded-lg mb-12"></div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-80 bg-secondary rounded-[32px]"></div>
              ))}
           </div>
        </div>
      </section>
    );
  }

  // If no reviews yet, we can optionally show nothing or keep mock data
  // Let's show mock data as a fallback to keep the design consistent
  const displayItems = reviews.length > 0 ? reviews : [];

  if (displayItems.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header with Title and Navigation */}
        <div className="flex items-center justify-between mb-12">
          <SectionHeader 
            title={t("customer_opinions")} 
            className="mb-0"
            titleClassName="text-3xl md:text-4xl" 
          />
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
            {displayItems.map((item, index) => (
              <SwiperSlide key={reviews.length > 0 ? (item as HomeReview)._id : index}>
                <TestimonialCard 
                  testimonial={item as HomeReview} 
                  index={index} 
                />
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
