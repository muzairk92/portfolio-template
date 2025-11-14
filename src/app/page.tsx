import { Hero } from "@/components/hero/hero";
import { Header } from "@/components/header/header";

export default function HomePage() {
  // HomePage is a Server Component that streams the layout shell quickly.
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden px-4 pb-16 pt-8 sm:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-page" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-[32rem] max-w-5xl rounded-full bg-white/40 blur-3xl dark:bg-white/5" aria-hidden />
      <Header />
      <Hero />
    </main>
  );
}
