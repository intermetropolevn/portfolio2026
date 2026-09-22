import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Copy, Check, X, ArrowUpRight } from "lucide-react";

function FooterComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("slaciephan@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  }, []);

  // Keyboard Esc listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal]);

  return (
    <>
      <footer className="w-full border-t border-white/10 bg-[#0d0f0c]/80 backdrop-blur-sm py-14 px-6 md:px-12 text-silver-blue/60 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Left: Identity, Copyright & Trigger */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2">
            <span className="text-pearl-white/90 font-medium">
              © 2026 Slacie Phan. All rights reserved.
            </span>
            <span className="text-white/20 select-none hidden sm:inline">·</span>
            <button
              onClick={openModal}
              className="text-[#D4D19C] hover:text-white underline underline-offset-4 decoration-[#D4D19C]/40 hover:decoration-white transition-all cursor-pointer tracking-wider uppercase font-mono text-[11px]"
              aria-haspopup="dialog"
            >
              Make a Similar Site
            </button>
          </div>

          {/* Right: Location & Email */}
          <div className="flex items-center gap-3 text-white/50 tracking-wide text-[11px]">
            <span>HCM City, Vietnam</span>
            <span className="text-white/20">·</span>
            <a 
              href="mailto:slaciephan@gmail.com" 
              className="text-pearl-white/70 hover:text-[#D4D19C] transition-colors"
            >
              slaciephan@gmail.com
            </a>
          </div>

        </div>
      </footer>

      {/* Glassmorphic Contact / Mailbox Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-2xl bg-[#141712]/95 border border-white/15 p-7 md:p-9 shadow-[0_24px_64px_rgba(0,0,0,0.8)] text-pearl-white z-10"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Subtitle tag */}
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#D4D19C] tracking-[0.25em] uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-[#D4D19C] animate-pulse" />
                <span>DIRECT INQUIRY &amp; ARCHITECTURE</span>
              </div>

              {/* Title */}
              <h3 
                id="modal-headline" 
                className="font-serif text-2xl md:text-3xl text-pearl-white tracking-tight leading-snug mb-4"
              >
                LET'S BUILD SOMETHING EXTRAORDINARY
              </h3>

              {/* Body Copy */}
              <p className="font-mono text-xs sm:text-sm text-pearl-white/75 font-light leading-relaxed mb-8">
                Interested in creating a high-density, system-oriented portfolio or tailored platform like this? Let's discuss architecture, creative technology, or potential collaborations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:slaciephan@gmail.com?subject=Inquiry:%20Building%20a%20Similar%20Site"
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#D4D19C] text-[#141712] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg shadow-[#D4D19C]/10 no-underline"
                >
                  <Mail className="w-4 h-4" />
                  <span>slaciephan@gmail.com</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/20 hover:border-[#D4D19C]/40 bg-white/5 hover:bg-white/10 text-pearl-white font-mono text-xs uppercase tracking-wider transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#D4D19C]" />
                      <span className="text-[#D4D19C]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-white/70" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Footer hint */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>Response time: ~24 hours</span>
                <span>Press Esc to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

const Footer = memo(FooterComponent);
export default Footer;
