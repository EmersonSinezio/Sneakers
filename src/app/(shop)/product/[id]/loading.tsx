/**
 * PDP loading state.
 */
export default function ProductPageLoading() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumbs skeleton */}
        <div className="flex gap-2 mb-6">
          <div className="h-3 bg-ink-100 rounded w-12 animate-pulse" />
          <div className="h-3 bg-ink-100 rounded w-16 animate-pulse" />
          <div className="h-3 bg-ink-100 rounded w-20 animate-pulse" />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery skeleton */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 md:w-20">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 md:w-20 md:h-20 bg-ink-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
            <div className="flex-1 aspect-square bg-gradient-to-br from-ink-50 to-ink-100 rounded-3xl animate-pulse" />
          </div>

          {/* Info skeleton */}
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="h-3 bg-ink-100 rounded w-32 animate-pulse" />
              <div className="h-4 bg-ink-100 rounded w-24 animate-pulse" />
            </div>
            <div className="h-12 bg-ink-100 rounded w-full max-w-md animate-pulse" />
            <div className="h-12 bg-ink-100 rounded w-3/4 max-w-md animate-pulse" />
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-ink-100 rounded animate-pulse"
                />
              ))}
              <div className="h-3 bg-ink-100 rounded w-24 ml-2 animate-pulse" />
            </div>
            <div className="h-12 bg-ink-100 rounded w-48 animate-pulse" />
            <div className="h-4 bg-ink-100 rounded w-full max-w-lg animate-pulse" />
            <div className="h-4 bg-ink-100 rounded w-5/6 max-w-lg animate-pulse" />

            {/* Sizes skeleton */}
            <div className="pt-4">
              <div className="h-3 bg-ink-100 rounded w-32 mb-3 animate-pulse" />
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 bg-ink-100 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* CTA skeleton */}
            <div className="h-14 bg-ink-100 rounded-full w-full max-w-xs animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
