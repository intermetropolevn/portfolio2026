import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ProductCapabilities from "./components/ProductCapabilities";
import SelectedWork from "./components/SelectedWork";
import ProductEvolution from "./components/ProductEvolution";

export default function App() {
  return (
    <main className="w-full min-h-screen bg-olive-black text-pearl-white selection:bg-pale-yellow selection:text-olive-black">
      <div className="grain-overlay" />
      <Navigation />
      <Hero />
      <ProductCapabilities />
      <SelectedWork />
      <ProductEvolution />
      
      {/* Footer Placeholder */}
      <footer className="py-20 px-6 border-t border-white/5 text-center font-mono text-xs text-silver-blue/40 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Lacie Phan. All rights reserved.</p>
      </footer>
    </main>
  );
}
