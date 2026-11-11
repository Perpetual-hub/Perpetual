import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-28 md:py-36">
      <p className="tabular text-sm text-muted">Error 404</p>
      <h1 className="mt-3 max-w-2xl text-[2.5rem] leading-[1.05] font-bold tracking-[-0.025em] md:text-[3.5rem]">Page Not Found</h1>
      <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
        The page or record you were looking for may have moved or been removed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue"
      >
        Back to the globe
      </Link>
    </div>
  );
}
