import { query } from '@/lib/db';
import { ProductCard, Product } from '@/components/ProductCard';
import { Search, Filter, SlidersHorizontal, PackageX } from 'lucide-react';
import Link from 'next/link';
import { SortSelect } from './SortSelect';

export const revalidate = 0;

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    sort?: string;
  };
}

async function getProducts(
  category?: string,
  search?: string,
  sort?: string
): Promise<Product[]> {
  try {
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];
    let paramIdx = 1;

    if (category && category !== 'All') {
      sql += ` AND LOWER(category) = LOWER($${paramIdx})`;
      params.push(category);
      paramIdx++;
    }

    if (search && search.trim() !== '') {
      sql += ` AND (LOWER(name) LIKE $${paramIdx} OR LOWER(description) LIKE $${paramIdx})`;
      params.push(`%${search.trim().toLowerCase()}%`);
      paramIdx++;
    }

    switch (sort) {
      case 'price-asc':
        sql += ' ORDER BY price ASC';
        break;
      case 'price-desc':
        sql += ' ORDER BY price DESC';
        break;
      case 'rating':
        sql += ' ORDER BY rating DESC';
        break;
      case 'newest':
      default:
        sql += ' ORDER BY id DESC';
        break;
    }

    const res = await query(sql, params);
    return res.rows;
  } catch (error) {
    console.error('Error fetching products catalog:', error);
    return [];
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const selectedCategory = searchParams.category || 'All';
  const searchQuery = searchParams.search || '';
  const selectedSort = searchParams.sort || 'newest';

  const products = await getProducts(selectedCategory, searchQuery, selectedSort);

  const categories = [
    'All',
    'Electronics',
    'Accessories',
    'Apparel',
    'Home & Office',
    'Fitness',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Product Catalog
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse our full range of high-quality products backed by PostgreSQL.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-auto">
          Showing {products.length} products
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 mr-1 flex-shrink-0 hidden sm:block" />
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            const href =
              cat === 'All'
                ? `/products${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`
                : `/products?category=${encodeURIComponent(cat)}${
                    searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''
                  }`;

            return (
              <Link
                key={cat}
                href={href}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          {/* Search Form */}
          <form method="GET" action="/products" className="relative flex-1 sm:w-64">
            {selectedCategory !== 'All' && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search catalog..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs px-3.5 py-2.5 pl-9 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          {/* Sort Selector */}
          <SortSelect selectedSort={selectedSort} />
        </div>
      </div>

      {/* Active Search & Filter Tags */}
      {(searchQuery || selectedCategory !== 'All') && (
        <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
          <span>Active Filters:</span>
          {selectedCategory !== 'All' && (
            <span className="bg-brand-50 border border-brand-200 text-brand-700 px-2.5 py-1 rounded-md font-medium">
              Category: {selectedCategory}
            </span>
          )}
          {searchQuery && (
            <span className="bg-brand-50 border border-brand-200 text-brand-700 px-2.5 py-1 rounded-md font-medium">
              Search: "{searchQuery}"
            </span>
          )}
          <Link
            href="/products"
            className="text-slate-400 hover:text-slate-700 underline font-medium ml-2"
          >
            Clear All
          </Link>
        </div>
      )}

      {/* Product Grid or Empty State */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <PackageX className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No Products Matched</h3>
          <p className="text-slate-500 text-sm">
            We couldn't find any products matching your search criteria or category filter.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            Reset Filters
          </Link>
        </div>
      )}
    </div>
  );
}
