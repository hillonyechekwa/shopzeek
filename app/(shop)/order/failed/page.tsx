"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

// 1. This is the child component that safely uses useSearchParams
function FailedOrderContent() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error") || "An unknown error occurred.";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-red-500 text-3xl">✕</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        We couldn't process your payment. {errorMessage}
      </p>
      <Link 
        href="/checkout" 
        className="bg-[#FF5A00] text-white px-8 py-3 rounded-md font-medium hover:bg-orange-600 transition-colors"
      >
        Try Again
      </Link>
    </div>
  );
}

// 2. This is the main page export that wraps the child in Suspense
export default function FailedOrderPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">Loading...</p>
      </div>
    }>
      <FailedOrderContent />
    </Suspense>
  );
}