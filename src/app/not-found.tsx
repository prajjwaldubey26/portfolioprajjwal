import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-text">{"// 404"}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold">This page is not on the map.</h1>
        <a href="/" className={`${buttonStyles("primary")} mt-6`}>
          Back home
        </a>
      </div>
    </section>
  );
}
