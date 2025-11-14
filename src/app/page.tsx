import { Hero } from "@/components/hero/hero";
import { Header } from "@/components/header/header";

export default function HomePage() {
  // HomePage is a Server Component that streams the layout shell quickly.
  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-16 pt-10 sm:px-8">
      <div className="pointer-events-none absolute inset-0 hero-gradient opacity-70 blur-3xl" aria-hidden />
      <Header />
      <Hero />
    </main>
  );
}
