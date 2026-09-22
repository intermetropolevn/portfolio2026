import { lazy, Suspense } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const ProductCapabilities = lazy(() => import("./components/ProductCapabilities"));
const SelectedWork = lazy(() => import("./components/SelectedWork"));
const ProductEvolution = lazy(() => import("./components/ProductEvolution"));

function SectionFallback({ height = "min-h-[600px]" }: { height?: string }) {
  return (
    <div className={`w-full ${height} flex items-center justify-center`} aria-hidden="true">
      <div className="w-5 h-5 rounded-full border border-white/20 border-t-white/80 animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <main className="w-full min-h-screen bg-olive-black text-pearl-white selection:bg-pale-yellow selection:text-olive-black">
      <div className="grain-overlay" />
      <Navigation />
      <Hero />
      <Suspense fallback={<SectionFallback height="min-h-[800px]" />}>
        <ProductCapabilities />
      </Suspense>
      <Suspense fallback={<SectionFallback height="min-h-[900px]" />}>
        <SelectedWork />
      </Suspense>
      <Suspense fallback={<SectionFallback height="min-h-[700px]" />}>
        <ProductEvolution />
      </Suspense>
      
      <Footer />
    </main>
  );
}
