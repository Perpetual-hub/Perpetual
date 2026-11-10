import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-28 md:py-36">
      <p className="text-xs font-semibold text-brand-blue">404</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight md:text-5xl">
        This page isn&apos;t here yet.
      </h1>
      <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
        Perpetual is in beta and some sections are still being built. The record you were looking for may also have moved.
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
