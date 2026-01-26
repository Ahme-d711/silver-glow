"use client"

import { cn } from "@/lib/utils"
import { Bell, Heart, Home, ShoppingBag, User, Search, Signal, Wifi, Battery } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { Ad } from "../types"

export function AdsMobileMockup({ ads }: { ads: Ad[] }) {
  
  return (
    <div className="relative w-[360px] h-[700px] bg-white rounded-[40px] border-2 border-gray-900 shadow-xl overflow-hidden flex flex-col mx-auto">
      {/* Status Bar */}
      <div className="bg-[#192C56] text-white px-6 py-3 text-xs flex justify-between items-center z-10">
        <span>12:30</span>
        <div className="flex items-center gap-1.5">
          <Signal size={14} className="fill-white" />
          <Wifi size={14} />
          <Battery size={16} className="fill-white" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#192C56] p-4 text-white pb-6 rounded-b-[24px] z-0 -mt-1 pt-8 relative shrink-0">
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-white/20">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold text-sm">Tasbih Mourad</div>
                    <div className="text-xs opacity-70 flex items-center gap-1">
                        <ShoppingBag size={10} /> 33 Item in Cart
                    </div>
                </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Bell size={14} />
            </div>
        </div>

        {/* Search Bar */}
        <div className="bg-[#2A3F6D] rounded-xl px-3 py-2 flex items-center gap-2 text-sm text-gray-300">
            <Search size={16} />
            <span>Search</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="p-4 space-y-6">
            
            {/* Hero Ad Swiper */}
            <div className="relative h-40 rounded-xl overflow-hidden bg-gray-200 shadow-sm group">
                {ads.length > 0 ? (
                  <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    loop={ads.length > 1}
                    className="h-full w-full [&_.swiper-pagination-bullet-active]:bg-white [&_.swiper-pagination-bullet]:bg-white/60"
                  >
                    {ads.map((currentAd) => (
                      <SwiperSlide key={currentAd.id} className="relative h-full w-full">
                        <Image 
                            src={currentAd.photo.startsWith('http') || currentAd.photo.startsWith('/') ? currentAd.photo : `/${currentAd.photo}`} 
                            alt={currentAd.nameEn} 
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent p-4 flex flex-col justify-end text-white">
                             <h3 className="font-bold text-sm mb-1 line-clamp-1">{currentAd.nameEn}</h3>
                             <p className="text-[10px] opacity-90 line-clamp-2 mb-2">Own a timeless, elegant ring at a special price.</p>
                             <button className="absolute -bottom-3 -right-3 bg-[#1A2F5A] text-white text-[11px] font-bold py-2 px-5 rounded-full border-[3px] border-white shadow-sm z-20">Shop Now</button>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                    <div className="w-full h-full bg-gray-300 animate-pulse" />
                )}
            </div>

            {/* Placeholder Content (Pulse Animation) - Replaces Grid */}
            <div className="grid grid-cols-2 gap-3">
                {Array(4).fill(0).map((_, i) => (
                     <div key={i} className="aspect-square bg-slate-300/50 rounded-xl relative overflow-hidden animate-pulse">
                           {/* Mimic the shape inside placeholder */}
                           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-slate-300 rounded-full flex items-center justify-end px-1">
                                <div className="w-1 h-1 bg-slate-400 rounded-full" />
                           </div>
                     </div>
                ))}
            </div>

            {/* Best Seller Section Title */}
            <div>
                 <h3 className="font-bold text-gray-800 mb-2">Best Seller</h3>
                 <div className="flex gap-3 overflow-hidden">
                     {/* Horizontal list placeholders */}
                     {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="w-24 h-32 bg-slate-200 rounded-xl animate-pulse shrink-0" />
                     ))}
                 </div>
            </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="bg-white border-t py-3 px-6 flex justify-between items-center text-gray-400 shrink-0">
         <div className="p-2 bg-[#E6E8EC] rounded-xl text-[#192C56]">
             <Home size={20} fill="#192C56" />
         </div>
         <ShoppingBag size={20} />
         <Heart size={20} />
         <User size={20} />
      </div>
    </div>
  )
}
