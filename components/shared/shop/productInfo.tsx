"use client";

import { useState } from "react";
import { Star, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductInfo({ product, avgRating, totalReviews }: any) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col pt-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {product.name}
      </h1>
      
      <div className="flex items-center gap-4 mb-8 text-sm">
        <div className="flex items-center gap-1 text-[#FF5A00]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill={i < Math.round(avgRating) ? "currentColor" : "none"} className={i >= Math.round(avgRating) ? "text-gray-300" : ""} />
          ))}
          <span className="text-gray-900 ml-2 font-bold">( {avgRating.toFixed(1)} / 5 )</span>
        </div>
        <span className="text-gray-300">|</span>
        <span className="text-gray-600">{totalReviews} Reviews</span>
        <span className="text-gray-300">|</span>
        <span className="text-gray-600">1K Sold</span>
      </div>

      <div className="text-5xl font-bold text-[#FF5A00] mb-10">
        ₦{product.price?.toLocaleString()}
      </div>

      <div className="border-t border-gray-200 pt-8 space-y-6 mb-10">
        <div className="grid grid-cols-[140px_1fr] items-start">
          <span className="font-bold text-gray-900 text-lg">Brief Description</span>
          <p className="text-gray-500 leading-relaxed">
            {product.description || "Rejuvenate and refresh your skin with our products which provide a burst of hydration."}
          </p>
        </div>
        <div className="grid grid-cols-[140px_1fr] items-center">
          <span className="font-bold text-gray-900 text-lg">Size</span>
          <span className="text-gray-500">60 ml</span>
        </div>
        <div className="grid grid-cols-[140px_1fr] items-center">
          <span className="font-bold text-gray-900 text-lg">Stock</span>
          <span className="text-gray-500">{product.stock || 100} Units</span>
        </div>
      </div>

      <div className="grid grid-cols-[140px_1fr] items-center mb-10">
        <span className="font-bold text-gray-900 uppercase tracking-widest">QUANTITY</span>
        <div className="flex items-center border border-gray-200 rounded-md w-fit h-12">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500">
            <Minus size={16} />
          </button>
          <span className="w-16 text-center font-medium">{quantity.toString().padStart(2, '0')}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500">
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex gap-4 mt-auto">
        <Button className="flex-1 bg-[#FF5A00] hover:bg-orange-600 h-14 text-sm font-bold uppercase tracking-widest gap-2 rounded-md">
          ADD TO CARD <ShoppingCart size={18} />
        </Button>
        <Button variant="outline" className="flex-1 border-gray-200 text-[#FF5A00] hover:text-orange-600 h-14 text-sm font-bold uppercase tracking-widest rounded-md">
          BUY NOW
        </Button>
        <Button variant="outline" className="h-14 w-14 border-[#FF5A00] bg-[#FF5A00] text-white hover:bg-orange-600 rounded-md shrink-0 p-0">
          <Heart size={24} fill="currentColor" />
        </Button>
      </div>
    </div>
  );
}