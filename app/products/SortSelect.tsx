'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SortSelectProps {
  selectedSort: string;
}

export function SortSelect({ selectedSort }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    const currentParams = new URLSearchParams(searchParams ? searchParams.toString() : '');

    if (sortValue) {
      currentParams.set('sort', sortValue);
    } else {
      currentParams.delete('sort');
    }

    router.push(`/products?${currentParams.toString()}`);
  };

  return (
    <select
      name="sort"
      value={selectedSort}
      onChange={handleSortChange}
      className="bg-slate-50 border border-slate-200 rounded-xl text-xs px-3 py-2.5 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
    >
      <option value="newest">Sort: Newest</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating">Top Rated</option>
    </select>
  );
}
