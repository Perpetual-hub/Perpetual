/** Loading state for detail pages (project, country, region) while URL params resolve. */
export function DetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="border-b border-line bg-surface-2">
        <div className="container-page space-y-4 pt-8 pb-10">
          <div className="skeleton h-4 w-28 rounded" />
          <div className="skeleton h-5 w-56 rounded-full" />
          <div className="skeleton h-12 w-2/3 max-w-2xl rounded-lg" />
          <div className="grid max-w-3xl grid-cols-2 gap-6 pt-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="skeleton h-3 w-20 rounded" />
                <div className="skeleton h-7 w-24 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-page grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-3">
          <div className="skeleton h-5 w-full max-w-2xl rounded" />
          <div className="skeleton h-5 w-5/6 max-w-xl rounded" />
          <div className="skeleton mt-8 h-56 w-full rounded-xl" />
        </div>
        <div className="skeleton h-64 rounded-xl" />
      </div>
    </div>
  );
}
