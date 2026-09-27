import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useCallback, memo } from "react";

function NavigationComponent({ activePage }: { activePage?: 'overview' | 'about' | 'lab' }) {
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
      if (typeof window !== "undefined") {
        window.location.replace("/src/agentic_loop.html");
      }
      active = "lab";
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
      ? "px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-medium text-[#C8C58F] bg-[#5C5A45] border border-[#5C5A45] transition-colors duration-200 shrink-0 whitespace-nowrap min-h-[32px] sm:min-h-[36px] flex items-center"
      : "px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-medium text-[#121212] border border-transparent hover:bg-black/5 transition-colors duration-200 shrink-0 whitespace-nowrap min-h-[32px] sm:min-h-[36px] flex items-center";

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-white/70 backdrop-blur-md border-b border-black/10 transform-gpu gap-2 sm:gap-4"
        style={{ willChange: "transform" }}
      >
        <a href="/" className="font-serif font-bold text-sm sm:text-base md:text-lg tracking-tight text-[#121212] no-underline shrink-0 whitespace-nowrap">
          Slacie Phan
        </a>

        {/* Horizontal Navigation Pill Group with Smooth Mobile Scrolling */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 max-w-[calc(100%-100px)] sm:max-w-none flex-nowrap">
          <a href="/" className={getLinkClasses("overview")}>Overview</a>
          <a href="/src/about_page.html" className={getLinkClasses("about")}>About</a>
          <a href="/src/agentic_loop.html" className={getLinkClasses("lab")}>Lab</a>
          <a 
            href="https://www.linkedin.com/in/slaciep/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-medium text-[#AEBED4] bg-[#64748B] border border-[#64748B] hover:bg-[#5C5A45] hover:border-[#5C5A45] hover:text-[#C8C58F] transition-colors duration-200 shrink-0 whitespace-nowrap min-h-[32px] sm:min-h-[36px] flex items-center"
          >
            LinkedIn ↗
          </a>
        </div>

        <button 
          className="hidden text-[#121212] p-1.5 min-h-[40px] min-w-[40px] items-center justify-center rounded-md hover:bg-black/5"
          onClick={toggleOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
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
          <a href="/" className={active === 'overview' ? "px-5 py-2.5 rounded-full font-mono text-xs font-medium bg-[#5C5A45] text-[#C8C58F] min-h-[42px] flex items-center" : "text-[#121212] px-5 py-2.5 min-h-[42px] flex items-center"} onClick={closeMenu}>Overview</a>
          <a href="/src/about_page.html" className={active === 'about' ? "px-5 py-2.5 rounded-full font-mono text-xs font-medium bg-[#5C5A45] text-[#C8C58F] min-h-[42px] flex items-center" : "text-[#121212] px-5 py-2.5 min-h-[42px] flex items-center"} onClick={closeMenu}>About</a>
          <a href="/src/agentic_loop.html" className={active === 'lab' ? "px-5 py-2.5 rounded-full font-mono text-xs font-medium bg-[#5C5A45] text-[#C8C58F] min-h-[42px] flex items-center" : "text-[#121212] px-5 py-2.5 min-h-[42px] flex items-center"} onClick={closeMenu}>Lab</a>
          <a href="https://www.linkedin.com/in/slaciep/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full font-mono text-xs font-medium bg-[#64748B] text-[#AEBED4] min-h-[42px] flex items-center" onClick={closeMenu}>LinkedIn ↗</a>
        </motion.div>
      )}
    </>
  );
}

const Navigation = memo(NavigationComponent);
export default Navigation;
