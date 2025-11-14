import type { Component } from "@minireact";
import Hero from "@components/Hero";
import Navigation from "@components/Navigation";
import FooterMeta from "@components/FooterMeta";

const App: Component = () => {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink transition-colors duration-300">
      <Navigation />
      <Hero />
      <FooterMeta />
    </div>
  );
};

export default App;
