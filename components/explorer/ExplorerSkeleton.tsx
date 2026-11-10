/** Designed loading state for the explorer, shown while the client reads the URL filters. */
export function ExplorerSkeleton() {
  return (
    <div className="flex flex-col lg:h-[calc(100svh-6.25rem)]" aria-busy="true" aria-label="Loading projects">
      <div className="container-page pt-8 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Projects</h1>
        <div className="skeleton mt-2.5 h-4 w-48 rounded" />
      </div>
      <div className="border-y border-line bg-surface-2">
        <div className="container-page flex gap-2 py-3">
          {[160, 110, 90, 90, 90, 100, 100, 110].map((w, i) => (
            <div key={i} className="skeleton h-9 rounded-lg" style={{ width: w }} />
          ))}
        </div>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="skeleton hidden flex-1 lg:block" />
        <ul className="w-full divide-y divide-line lg:w-[440px] lg:border-l lg:border-line">
          {Array.from({ length: 7 }).map((_, i) => (
            <li key={i} className="flex gap-3 px-5 py-4">
              <div className="skeleton mt-1 size-2.5 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-3.5 w-3/4 rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
              </div>
              <div className="skeleton h-3.5 w-14 rounded" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
