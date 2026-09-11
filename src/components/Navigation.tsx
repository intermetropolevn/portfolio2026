import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 bg-white/70 backdrop-blur-md border-b border-black/10"
      >
        <a href="index.html" className="font-serif font-bold text-lg tracking-tight text-[#121212] no-underline">
          Lacie Phan
        </a>

        <div className="hidden md:flex items-center gap-2">
          <a href="index.html" className="font-sans text-[0.85rem] font-medium text-[#D7FF3F] bg-[#121212] border border-[#121212] px-4 py-2 rounded transition-all duration-200">Overview</a>
          <a href="src/about_page.html" className="font-sans text-[0.85rem] font-medium text-[#121212] border border-transparent px-4 py-2 rounded hover:bg-black/5 transition-all duration-200">About</a>
          <a href="src/agentic_loop.html" className="font-sans text-[0.85rem] font-medium text-[#121212] border border-transparent px-4 py-2 rounded hover:bg-black/5 transition-all duration-200">Lab</a>
          <a href="https://www.linkedin.com/in/slaciephan" target="_blank" rel="noreferrer" className="font-sans text-[0.85rem] font-medium text-white bg-[#4F6BFF] border border-[#4F6BFF] px-4 py-2 rounded hover:bg-[#121212] hover:border-[#121212] hover:text-[#D7FF3F] transition-all duration-200">
            LinkedIn ↗
          </a>
        </div>

        <button 
          className="md:hidden text-[#121212]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 font-serif text-3xl"
        >
          <a href="index.html" className="text-[#121212]" onClick={() => setIsOpen(false)}>Overview</a>
          <a href="src/about_page.html" className="text-[#121212]" onClick={() => setIsOpen(false)}>About</a>
          <a href="src/agentic_loop.html" className="text-[#121212]" onClick={() => setIsOpen(false)}>Lab</a>
          <a href="https://www.linkedin.com/in/slaciephan" target="_blank" rel="noreferrer" className="text-[#4F6BFF]" onClick={() => setIsOpen(false)}>LinkedIn ↗</a>
        </motion.div>
      )}
    </>
  );
}
