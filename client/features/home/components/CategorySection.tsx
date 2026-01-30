"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Category } from "@/features/dashboard/categories/services/category.service";

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Shop By <span className="text-primary-500">Category</span>
        </h2>
        <Link
          href="/categories"
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 transition-colors"
        >
          View All <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100"
          >
            <Image
              src={category.image}
              alt={category.nameAr} // Using Arabic name as primary or fallback
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-70" />

            {/* Floating Label */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between shadow-lg transform transition-transform duration-300 group-hover:-translate-y-1">
              <span className="font-semibold text-gray-900 text-sm truncate">
                {category.nameAr}
              </span>
              <div className="bg-primary-500 rounded-full p-1 text-white">
                <ArrowLeft className="w-3 h-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
