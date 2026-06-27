import { ProductGridSkeleton } from "@/components/ui/Skeleton";

/**
 * Product listing loading state.
 */
export default function ProductListingLoading() {
  return (
    <div className="min-h-screen bg-ink-50">
      {/* Top bar skeleton */}
      <div className="bg-white border-b border-ink-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="h-8 bg-ink-100 rounded w-48 animate-pulse" />
              <div className="h-3 bg-ink-100 rounded w-32 animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 bg-ink-100 rounded-full w-64 animate-pulse" />
              <div className="h-10 bg-ink-100 rounded-full w-32 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters skeleton */}
          <aside className="hidden lg:block w-64 space-y-6">
            <div className="space-y-2">
              <div className="h-4 bg-ink-100 rounded w-24 animate-pulse" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-ink-100 rounded-full animate-pulse"
                />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-ink-100 rounded w-28 animate-pulse" />
              <div className="h-20 bg-ink-100 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-ink-100 rounded w-24 animate-pulse" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-ink-100 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <ProductGridSkeleton count={9} />
          </div>
        </div>
      </div>
    </div>
  );
}
