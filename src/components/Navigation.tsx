import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useCallback, memo } from "react";

function NavigationComponent({ activePage }: { activePage?: 'overview' | 'about' | 'lab' | 'playground' }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
  let active = activePage || "overview";
  if (!activePage) {
    if (currentPath.includes("playground")) {
      active = "playground";
    } else if (currentPath.includes("agentic") || currentPath.includes("lab")) {
      active = "lab";
    } else if (currentPath.includes("about")) {
      active = "about";
    } else if (currentPath === "/" || currentPath.includes("index")) {
      active = "overview";
    }
  }

  const getLinkClasses = (page: string) =>
    active === page
      ? "px-3 py-1.5 rounded-full font-mono text-xs font-medium text-[#C8C58F] bg-[#5C5A45] border border-[#5C5A45] transition-colors duration-200"
      : "px-3 py-1.5 rounded-full font-mono text-xs font-medium text-[#121212] border border-transparent hover:bg-black/5 transition-colors duration-200";

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 bg-white/70 backdrop-blur-md border-b border-black/10 transform-gpu"
        style={{ willChange: "transform" }}
      >
        <a href="/" className="font-serif font-bold text-lg tracking-tight text-[#121212] no-underline">
          Slacie Phan
        </a>

        <div className="hidden md:flex items-center gap-2">
          <a href="/" className={getLinkClasses("overview")}>Overview</a>
          <a href="/src/about_page.html" className={getLinkClasses("about")}>About</a>
          <a href="/src/agentic_loop.html" className={getLinkClasses("lab")}>Lab</a>
          <a href="/src/playground.html" className={getLinkClasses("playground")}>Playground</a>
          <a 
            href="https://www.linkedin.com/in/slaciep/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-3 py-1.5 rounded-full font-mono text-xs font-medium text-[#AEBED4] bg-[#64748B] border border-[#64748B] hover:bg-[#5C5A45] hover:border-[#5C5A45] hover:text-[#C8C58F] transition-colors duration-200"
          >
            LinkedIn ↗
          </a>
        </div>

        <button 
          className="md:hidden text-[#121212] p-1"
          onClick={toggleOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 font-mono text-base transform-gpu"
          style={{ willChange: "opacity" }}
        >
          <a href="/" className={active === 'overview' ? "px-4 py-2 rounded-full font-mono text-xs font-medium bg-[#5C5A45] text-[#C8C58F]" : "text-[#121212] px-4 py-2"} onClick={closeMenu}>Overview</a>
          <a href="/src/about_page.html" className={active === 'about' ? "px-4 py-2 rounded-full font-mono text-xs font-medium bg-[#5C5A45] text-[#C8C58F]" : "text-[#121212] px-4 py-2"} onClick={closeMenu}>About</a>
          <a href="/src/agentic_loop.html" className={active === 'lab' ? "px-4 py-2 rounded-full font-mono text-xs font-medium bg-[#5C5A45] text-[#C8C58F]" : "text-[#121212] px-4 py-2"} onClick={closeMenu}>Lab</a>
          <a href="/src/playground.html" className={active === 'playground' ? "px-4 py-2 rounded-full font-mono text-xs font-medium bg-[#5C5A45] text-[#C8C58F]" : "text-[#121212] px-4 py-2"} onClick={closeMenu}>Playground</a>
          <a href="https://www.linkedin.com/in/slaciep/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full font-mono text-xs font-medium bg-[#64748B] text-[#AEBED4]" onClick={closeMenu}>LinkedIn ↗</a>
        </motion.div>
      )}
    </>
  );
}

const Navigation = memo(NavigationComponent);
export default Navigation;
