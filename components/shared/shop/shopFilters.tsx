// components/storefront/ShopFilters.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

type Props = {
  categories: string[];
  brands: string[];
  searchParams: Record<string, string | undefined>;
};

const priceRanges = [
  { label: "All Price", min: undefined, max: undefined },
  { label: "Under N5,000", min: undefined, max: "5000" },
  { label: "N5,000 to N25,000", min: "5000", max: "25000" },
  { label: "N25,000 to N75,000", min: "25000", max: "75000" },
  { label: "N75,000 to N150,000", min: "75000", max: "150000" },
  { label: "N150,000 to N500,000", min: "150000", max: "500000" },
  { label: "N500,000 to N1,000,000", min: "500000", max: "1000000" },
];

// Determine the absolute max price for the slider
const ABSOLUTE_MAX = 1000000;

export function ShopFilters({ categories, brands, searchParams }: Props) {
  const router = useRouter();

  // Keep local state for the slider so it moves smoothly while dragging
  const [sliderRange, setSliderRange] = useState([
    Number(searchParams.minPrice || 0),
    Number(searchParams.maxPrice || ABSOLUTE_MAX),
  ]);

  // Sync local state if URL changes from outside (e.g., clicking a radio button)
  useEffect(() => {
    setSliderRange([
      Number(searchParams.minPrice || 0),
      Number(searchParams.maxPrice || ABSOLUTE_MAX),
    ]);
  }, [searchParams.minPrice, searchParams.maxPrice]);

  // NEW: Update multiple filters at once to prevent race conditions
  const updateFilters = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    
    // 1. Copy existing valid params
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v !== undefined) params.set(k, v);
    });

    // 2. Apply new updates
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });

    params.delete("page"); // Reset to page 1 on filter change
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <aside className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-900">
          Category
        </h3>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-[#FF5A00]">
                <input
                  type="radio"
                  name="category"
                  checked={searchParams.category === cat}
                  onChange={() => updateFilters({ category: cat })}
                  className="h-4 w-4 accent-[#FF5A00] border-gray-300"
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-200" />

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-900">
          Price Range
        </h3>
        
        {/* Interactive Visual Slider */}
        <div className="px-2 mb-6">
          <Slider
            min={0}
            max={ABSOLUTE_MAX}
            step={1000}
            value={sliderRange}
            onValueChange={setSliderRange} // Updates UI smoothly while dragging
            onValueCommit={(vals) => {
              // Pushes to URL only when the user lets go of the mouse
              updateFilters({
                minPrice: vals[0] > 0 ? String(vals[0]) : undefined,
                maxPrice: vals[1] < ABSOLUTE_MAX ? String(vals[1]) : undefined,
              });
            }}
            className="[&_[role=slider]]:border-[#FF5A00] [&_[role=slider]]:focus-visible:ring-[#FF5A00] [&_.bg-primary]:bg-[#FF5A00]"
          />
        </div>

        {/* Range Inputs */}
        <div className="flex items-center gap-2 mb-6">
          <Input 
            placeholder="Min price" 
            type="number"
            className="h-10 text-sm bg-white focus-visible:ring-[#FF5A00]"
            value={sliderRange[0] === 0 ? "" : sliderRange[0]}
            onChange={(e) => setSliderRange([Number(e.target.value), sliderRange[1]])}
            onBlur={(e) => updateFilters({ minPrice: e.target.value || undefined })}
          />
          <Input 
            placeholder="Max price" 
            type="number"
            className="h-10 text-sm bg-white focus-visible:ring-[#FF5A00]"
            value={sliderRange[1] === ABSOLUTE_MAX ? "" : sliderRange[1]}
            onChange={(e) => setSliderRange([sliderRange[0], Number(e.target.value)])}
            onBlur={(e) => updateFilters({ maxPrice: e.target.value || undefined })}
          />
        </div>

        {/* Radio Shortcuts */}
        <ul className="space-y-3">
          {priceRanges.map(({ label, min, max }) => (
            <li key={label}>
              <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-[#FF5A00]">
                <input
                  type="radio"
                  name="price"
                  checked={
                    searchParams.minPrice === min &&
                    searchParams.maxPrice === max
                  }
                  onChange={() => updateFilters({ minPrice: min, maxPrice: max })}
                  className="h-4 w-4 accent-[#FF5A00] border-gray-300"
                />
                {label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-200" />

      {/* Brands (2 Columns) */}
     <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-900">
          Popular Brands
        </h3>
        <ul className="grid grid-cols-2 gap-y-3 gap-x-2">
          {brands.map((brand) => {
            // Convert the comma-separated URL string into an array
            const currentBrands = searchParams.brand ? searchParams.brand.split(",") : [];
            const isChecked = currentBrands.includes(brand);

            return (
              <li key={brand}>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-[#FF5A00] truncate">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      let newBrands;
                      if (e.target.checked) {
                        newBrands = [...currentBrands, brand]; // Add brand
                      } else {
                        newBrands = currentBrands.filter((b) => b !== brand); // Remove brand
                      }
                      
                      // Join back into a comma-separated string, or remove entirely if empty
                      updateFilters({ 
                        brand: newBrands.length > 0 ? newBrands.join(",") : undefined 
                      });
                    }}
                    className="h-4 w-4 accent-[#FF5A00] rounded-sm border-gray-300 focus:ring-[#FF5A00]"
                  />
                  <span className="truncate">{brand}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}