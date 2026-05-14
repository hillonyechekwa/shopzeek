// components/storefront/ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Product } from "@/types/database";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  const isOnDeal =
    product.deal_price &&
    product.deal_ends_at &&
    new Date(product.deal_ends_at) > new Date();

  const imageBgColor = isOnDeal ? "bg-[#FFEBE3]" : "bg-[#F3F4F6]";
  const activePrice = product.deal_price ?? product.price;
  
  // Calculate percentage off
  const percentOff = isOnDeal 
    ? Math.round(((product.price - product.deal_price!) / product.price) * 100) 
    : 0;

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      {/* Image Container */}
      <div className={`${imageBgColor} rounded-2xl relative h-64 w-full mb-4 overflow-hidden transition-colors duration-300`}>
        {isOnDeal && percentOff > 0 && (
          <div className="absolute top-3 right-3 bg-[#E53935] text-white text-[10px] font-bold px-2 py-1 rounded z-10">
            {percentOff}% OFF
          </div>
        )}
        <Image
          src={product.image_urls[0] ?? "/placeholder.png"}
          alt={product.name}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 pt-1">
          <span className="text-base font-bold text-[#FF5A00]">
            ₦{activePrice.toLocaleString()}
          </span>
          {isOnDeal && (
            <span className="text-xs text-gray-400 line-through">
              ₦{product.price.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < 4 ? "fill-[#FF5A00] text-[#FF5A00]" : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-gray-500 pt-2 font-medium">
          1,286 Purchases
        </p>
      </div>
    </Link>
  );
}