"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductReviews({ reviews, avgRating, totalReviews, productId }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 lg:gap-32">
      
      {/* Left Column: Summary Stats */}
      <div>
        <h3 className="text-3xl font-bold mb-6 text-gray-900">Reviews</h3>
        <div className="text-6xl font-bold text-[#FF5A00] mb-4 flex items-baseline gap-2">
          {avgRating.toFixed(1)} <span className="text-gray-300 text-5xl font-medium">/ 5</span>
        </div>
        <div className="flex gap-2 text-[#FF5A00] mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} fill={i < Math.round(avgRating) ? "currentColor" : "none"} className={i >= Math.round(avgRating) ? "text-gray-200" : ""} size={24} />
          ))}
        </div>
        <p className="text-gray-900 font-medium mb-10">{totalReviews} Reviews</p>

        <div className="space-y-4">
          {[5, 4, 3, 2, 1].map((num) => (
            <div key={num} className="flex items-center gap-4">
              <span className="text-lg font-bold w-4">{num}</span>
              <Star size={18} className="text-[#FF5A00]" fill="currentColor" />
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FF5A00] rounded-full" 
                  style={{ width: num === 5 ? '80%' : num === 4 ? '40%' : '0%' }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Reviews List & Form */}
      <div>
        {/* Existing Reviews */}
        <div className="space-y-10 mb-10">
          {reviews.length > 0 ? reviews.map((review: any) => (
            <div key={review.id} className="pb-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    {/* Placeholder for Avatar */}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.profiles?.full_name || "Anonymous User"}</h4>
                    <p className="text-sm text-gray-500">user@example.com</p>
                  </div>
                </div>
                <span className="text-sm text-gray-900 font-medium">
                 {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <p className="text-gray-500 leading-relaxed">{review.comment}</p>
            </div>
          )) : (
             <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
          )}
        </div>

        {reviews.length > 0 && (
          <Button className="bg-[#FF5A00] hover:bg-orange-600 text-white px-8 h-12 uppercase font-bold text-sm tracking-widest rounded-md mb-16">
            VIEW MORE
          </Button>
        )}

        {/* Review Form Box */}
        <div className="p-8 md:p-12 bg-white border border-gray-200 rounded-[2rem]">
          <h4 className="font-medium text-gray-500 mb-4">You review</h4>
          <textarea 
            className="w-full border border-gray-200 rounded-xl p-4 min-h-[160px] mb-6 focus:outline-none focus:border-[#FF5A00] resize-none" 
            placeholder="Enter your review"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Name</label>
              <input type="text" className="w-full border border-gray-200 rounded-xl h-14 px-4 focus:outline-none focus:border-[#FF5A00]" placeholder="Anita Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Email</label>
              <input type="email" className="w-full border border-gray-200 rounded-xl h-14 px-4 focus:outline-none focus:border-[#FF5A00]" placeholder="olivia@untitledui.com" />
            </div>
          </div>
          <div className="mb-10 flex items-center gap-4">
            <label className="text-sm text-gray-500">Your rating</label>
            <div className="flex gap-2 text-gray-300">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} className="cursor-pointer hover:text-[#FF5A00] transition-colors" />)}
            </div>
          </div>
          <Button className="bg-[#FF5A00] hover:bg-orange-600 px-12 h-14 font-bold uppercase tracking-widest rounded-md text-white">
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
}