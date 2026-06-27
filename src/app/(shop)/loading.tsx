import { ProductGridSkeleton } from "@/components/ui/Skeleton";

/**
 * Home page loading state — shows skeleton while data loads.
 */
export default function HomeLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <section className="bg-gradient-to-b from-ink-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="h-4 bg-ink-100 rounded w-32" />
            <div className="h-16 bg-ink-100 rounded w-3/4" />
            <div className="h-16 bg-ink-100 rounded w-2/3" />
            <div className="h-4 bg-ink-100 rounded w-full max-w-md" />
            <div className="h-4 bg-ink-100 rounded w-5/6 max-w-md" />
            <div className="flex gap-3 pt-4">
              <div className="h-12 bg-ink-100 rounded-full w-40" />
              <div className="h-12 bg-ink-100 rounded-full w-36" />
            </div>
          </div>
          <div className="relative aspect-square bg-ink-100 rounded-3xl" />
        </div>
      </section>

      {/* Feature strip skeleton */}
      <section className="bg-ink py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-ink-800" />
              <div className="space-y-1.5">
                <div className="h-3 bg-ink-800 rounded w-20" />
                <div className="h-2 bg-ink-800 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products skeleton */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-md">
            <div className="h-4 bg-ink-100 rounded w-24 mb-3" />
            <div className="h-10 bg-ink-100 rounded w-3/4" />
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      </section>
    </div>
  );
}
