"use client";

import Image from "next/image";

export function ProductGallery({ images, name }: { images: string[] | null, name: string }) {
  const mainImage = images && images.length > 0 ? images[0] : "/placeholder.png";

  return (
    <div className="bg-[#F9F9F9] rounded-3xl p-8 flex justify-center items-center h-[500px] md:h-[650px] w-full">
      <div className="relative w-full h-full max-w-[400px]">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-contain mix-blend-multiply"
          priority
        />
      </div>
    </div>
  );
}