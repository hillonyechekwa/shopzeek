import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-[#FFB89E] to-[#FF8C66] rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center min-h-[450px]">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[450px] relative flex-shrink-0">
          <Image
            src="/hero.png"
            alt="Discover Your Beauty"
            fill
            priority // Add this for Hero images to load faster!
            className="object-cover object-center"
          />
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-1/2 p-10 md:p-16 z-10 flex flex-col justify-center items-start">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-md">
            Discover<br />Your Beauty
          </h1>
          <p className="text-white text-lg mb-8 font-medium">
            Shop the Best Beauty products Online.
          </p>
          <Button
            asChild
            className="bg-[#FF5A00] hover:bg-orange-600 text-white rounded-md px-10 py-6 text-lg font-bold shadow-lg"
          >
            <Link href="/shop">SHOP NOW</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}