import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";

const evolutionStages = [
  {
    id: "01",
    label: "EXECUTION",
    title: "Optimizing What Exists",
    subtitle: "Optimizing what already exists — improving conversion, fixing friction, and making early traction sustainable.",
    lead: null,
    tags: ["Revenue clarity", "Funnel correction", "Operational friction removal"],
    cta: "Improve output without increasing complexity.",
    accent: "#8a9a6a",
    accentAlt: "#b5c49a",
    svg: (
      <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none">
        <defs>
          <linearGradient id="svgGrad1" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8a9a6a"/>
            <stop offset="1" stopColor="#b5c49a"/>
          </linearGradient>
        </defs>
        <path d="M40 30 L360 30 L300 80 L100 80 Z" stroke="url(#svgGrad1)" strokeWidth="1.2" fill="none"/>
        <path d="M100 85 L300 85 L260 135 L140 135 Z" stroke="url(#svgGrad1)" strokeWidth="1.2" fill="none"/>
        <path d="M140 140 L260 140 L230 175 L170 175 Z" stroke="url(#svgGrad1)" strokeWidth="1.2" fill="none"/>
        <line x1="200" y1="175" x2="200" y2="195" stroke="url(#svgGrad1)" strokeWidth="1.5" strokeDasharray="3 3"/>
        <line x1="60" y1="55" x2="60" y2="200" stroke="url(#svgGrad1)" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.4"/>
        <line x1="340" y1="55" x2="340" y2="200" stroke="url(#svgGrad1)" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.4"/>
      </svg>
    )
  },
  {
    id: "02",
    label: "SYSTEM DESIGN",
    title: "Structuring How It Works",
    subtitle: "Designing product systems — structuring workflows, defining architecture, and turning momentum into repeatable logic.",
    lead: "From feature collection to behavioral system.",
    tags: ["Modular flows", "Coherent architecture", "Reduced dependency on intuition"],
    cta: "Turn momentum into structure.",
    accent: "#e8d9a0",
    accentAlt: "#f0e6bc",
    svg: (
      <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none">
        <defs>
          <linearGradient id="svgGrad2" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e8d9a0"/>
            <stop offset="1" stopColor="#f0e6bc"/>
          </linearGradient>
        </defs>
        <rect x="30" y="20" width="70" height="40" rx="4" stroke="url(#svgGrad2)" strokeWidth="1.2" fill="none"/>
        <rect x="165" y="20" width="70" height="40" rx="4" stroke="url(#svgGrad2)" strokeWidth="1.2" fill="none"/>
        <rect x="300" y="20" width="70" height="40" rx="4" stroke="url(#svgGrad2)" strokeWidth="1.2" fill="none"/>
        <rect x="100" y="100" width="70" height="40" rx="4" stroke="url(#svgGrad2)" strokeWidth="1.2" fill="none"/>
        <rect x="230" y="100" width="70" height="40" rx="4" stroke="url(#svgGrad2)" strokeWidth="1.2" fill="none"/>
        <rect x="165" y="155" width="70" height="35" rx="4" stroke="url(#svgGrad2)" strokeWidth="1.5" fill="none"/>
        <line x1="100" y1="40" x2="165" y2="40" stroke="url(#svgGrad2)" strokeWidth="0.8" strokeDasharray="3 3"/>
        <line x1="235" y1="40" x2="300" y2="40" stroke="url(#svgGrad2)" strokeWidth="0.8" strokeDasharray="3 3"/>
        <line x1="65" y1="60" x2="135" y2="100" stroke="url(#svgGrad2)" strokeWidth="0.8" opacity="0.5"/>
        <line x1="200" y1="60" x2="200" y2="100" stroke="url(#svgGrad2)" strokeWidth="0.8" opacity="0.5"/>
        <line x1="335" y1="60" x2="265" y2="100" stroke="url(#svgGrad2)" strokeWidth="0.8" opacity="0.5"/>
        <line x1="135" y1="120" x2="230" y2="120" stroke="url(#svgGrad2)" strokeWidth="0.8" strokeDasharray="3 3"/>
        <line x1="170" y1="140" x2="200" y2="155" stroke="url(#svgGrad2)" strokeWidth="0.8" opacity="0.5"/>
        <line x1="265" y1="140" x2="235" y2="155" stroke="url(#svgGrad2)" strokeWidth="0.8" opacity="0.5"/>
      </svg>
    )
  },
  {
    id: "03",
    label: "ORCHESTRATION",
    title: "Scaling Across Functions",
    subtitle: "Scaling across functions — aligning product, engineering, marketing, and operations into one coherent system.",
    lead: "Marketing × Product × Engineering operating within one system logic.",
    tags: ["Constraints translated", "Entropy reduced", "Architecture supports growth"],
    cta: "Build a product organization that scales.",
    accent: "#a8c8e0",
    accentAlt: "#c4ddef",
    svg: (
      <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none">
        <defs>
          <linearGradient id="svgGrad3" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a8c8e0"/>
            <stop offset="1" stopColor="#c4ddef"/>
          </linearGradient>
        </defs>
        <circle cx="200" cy="100" r="12" stroke="url(#svgGrad3)" strokeWidth="1.5" fill="none"/>
        <circle cx="70" cy="40" r="7" stroke="url(#svgGrad3)" strokeWidth="1.2" fill="none"/>
        <circle cx="330" cy="40" r="7" stroke="url(#svgGrad3)" strokeWidth="1.2" fill="none"/>
        <circle cx="50" cy="160" r="7" stroke="url(#svgGrad3)" strokeWidth="1.2" fill="none"/>
        <circle cx="350" cy="160" r="7" stroke="url(#svgGrad3)" strokeWidth="1.2" fill="none"/>
        <circle cx="200" cy="180" r="7" stroke="url(#svgGrad3)" strokeWidth="1.2" fill="none"/>
        <circle cx="110" cy="100" r="5" stroke="url(#svgGrad3)" strokeWidth="1" fill="none"/>
        <circle cx="290" cy="100" r="5" stroke="url(#svgGrad3)" strokeWidth="1" fill="none"/>
        <circle cx="200" cy="30" r="5" stroke="url(#svgGrad3)" strokeWidth="1" fill="none"/>
        <line x1="200" y1="100" x2="70" y2="40" stroke="url(#svgGrad3)" strokeWidth="0.8"/>
        <line x1="200" y1="100" x2="330" y2="40" stroke="url(#svgGrad3)" strokeWidth="0.8"/>
        <line x1="200" y1="100" x2="50" y2="160" stroke="url(#svgGrad3)" strokeWidth="0.8"/>
        <line x1="200" y1="100" x2="350" y2="160" stroke="url(#svgGrad3)" strokeWidth="0.8"/>
        <line x1="200" y1="100" x2="200" y2="180" stroke="url(#svgGrad3)" strokeWidth="0.8"/>
        <line x1="200" y1="100" x2="110" y2="100" stroke="url(#svgGrad3)" strokeWidth="1"/>
        <line x1="200" y1="100" x2="290" y2="100" stroke="url(#svgGrad3)" strokeWidth="1"/>
        <line x1="200" y1="100" x2="200" y2="30" stroke="url(#svgGrad3)" strokeWidth="1"/>
        <line x1="70" y1="40" x2="110" y2="100" stroke="url(#svgGrad3)" strokeWidth="0.5" strokeDasharray="3 4"/>
        <line x1="330" y1="40" x2="290" y2="100" stroke="url(#svgGrad3)" strokeWidth="0.5" strokeDasharray="3 4"/>
        <line x1="50" y1="160" x2="110" y2="100" stroke="url(#svgGrad3)" strokeWidth="0.5" strokeDasharray="3 4"/>
        <line x1="350" y1="160" x2="290" y2="100" stroke="url(#svgGrad3)" strokeWidth="0.5" strokeDasharray="3 4"/>
      </svg>
    )
  },
];

function ProductEvolutionComponent() {
  const [activeStage, setActiveStage] = useState(0);

  const handleSelectStage = useCallback((idx: number) => {
    setActiveStage(idx);
  }, []);

  const activeData = evolutionStages[activeStage];

  return (
    <section 
      className="w-full pt-[120px] md:pt-[132px] lg:pt-[150px] pb-[80px] px-8 relative overflow-hidden bg-[#0a0a0f] text-[#e8e8e0] font-mono min-h-screen flex flex-col items-center contain-paint"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 20% 20%, rgba(138,154,106,0.04) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,200,224,0.04) 0%, transparent 60%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E")
        `
      }}
    >
      {/* Intro */}
      <div className="max-w-[640px] text-center mb-[72px] relative z-10 flex flex-col items-center">
        <h2 className="font-serif text-3xl md:text-5xl text-[#f0f0ea] tracking-tight mb-8 uppercase">
          Evolution of Impact
        </h2>
        <div className="space-y-4">
          <p className="font-mono text-[clamp(13px,1.6vw,15px)] leading-[1.85] text-[#e8e8e0]/55 font-light tracking-[0.02em]">
            Most of the products I worked on were built within early-stage startups, where I often joined at formative stages — helping establish product foundations, shape initial systems, and scale products alongside growing users, revenue, and operational complexity.
          </p>
          <p className="font-mono text-[clamp(13px,1.6vw,15px)] leading-[1.85] text-[#e8e8e0]/55 font-light tracking-[0.02em]">
            Over time, my role evolved from optimizing execution to designing full product systems, and eventually orchestrating cross-functional scale.
          </p>
          <p className="font-mono text-[clamp(13px,1.6vw,15px)] leading-[1.85] text-[#e8e8e0]/55 font-light tracking-[0.02em]">
            Each stage reflects a deeper level of impact — from improving features, to structuring systems, to helping build the foundations that enable products and teams to scale.
          </p>
        </div>
      </div>

      {/* Split layout */}
      <div className="flex w-full max-w-[960px] items-start min-h-[420px] relative z-10">

        {/* LEFT: Bookmark nav */}
        <div className="w-[22%] min-w-[140px] max-w-[190px] flex flex-col pt-2 relative z-10">
          {/* Vertical Line */}
          <div className="absolute left-0 top-6 bottom-6 w-[1px] bg-white/5" />
          
          {evolutionStages.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={stage.id}
                onClick={() => handleSelectStage(idx)}
                className="relative cursor-pointer py-5 pr-2.5 pl-5 mb-1.5 flex flex-col items-start gap-1.5 bg-transparent border-none text-inherit text-left w-full transition-colors duration-200 group"
              >
                <div 
                  className={`absolute left-0 top-[15%] h-[70%] w-[2px] rounded-[1px] transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-15 group-hover:opacity-40'}`}
                  style={{ background: `linear-gradient(180deg, ${stage.accent}, ${stage.accentAlt})` }}
                />
                <div 
                  className="font-serif text-[28px] font-extrabold leading-none tracking-[-0.02em] transition-colors duration-200"
                  style={{ color: isActive ? stage.accent : 'rgba(255,255,255,0.15)' }}
                >
                  {stage.id}
                </div>
                <div 
                  className={`font-mono text-[9px] font-medium tracking-[0.16em] uppercase leading-[1.4] transition-colors duration-200 ${isActive ? 'text-[#e8e8e0]/90' : 'text-[#e8e8e0]/30 group-hover:text-[#e8e8e0]/90'}`}
                >
                  {stage.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT: Card area */}
        <div className="flex-1 pl-8 relative">
          {/* Glow */}
          <div 
            className="absolute top-[10%] left-[20%] w-[60%] h-[60%] blur-[40px] pointer-events-none z-0 transition-opacity duration-300"
            style={{ background: `radial-gradient(ellipse, ${activeData.accent}18 0%, transparent 70%)` }}
          />
          
          {/* Ghosts */}
          <div className="absolute top-3 left-[44px] right-[-8px] bottom-[-10px] rounded-[16px_20px_14px_18px] bg-white/[0.015] border border-white/[0.04] z-0 pointer-events-none" />
          <div className="absolute top-5 left-[52px] right-[-14px] bottom-[-18px] rounded-[16px_20px_14px_18px] bg-white/[0.008] border border-white/[0.025] -z-10 pointer-events-none" />
          
          {/* Main Card */}
          <div className="relative z-10 bg-white/[0.04] backdrop-blur-[20px] rounded-[16px_20px_14px_18px] border border-white/[0.08] p-[48px_44px_44px] overflow-hidden min-h-[380px] shadow-[0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.06),0_24px_64px_rgba(0,0,0,0.5)]">
            
            {/* Top Border */}
            <div 
              className="absolute top-0 left-[8%] right-[30%] h-[1px] transition-colors duration-300"
              style={{ background: `linear-gradient(90deg, transparent, ${activeData.accent}70, ${activeData.accentAlt}50, transparent)` }}
            />
            
            {/* SVG Background */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`svg-${activeStage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 w-full h-full pointer-events-none transform-gpu"
                style={{ willChange: "opacity" }}
              >
                {activeData.svg}
              </motion.div>
            </AnimatePresence>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeStage}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative transform-gpu"
                style={{ willChange: "transform, opacity" }}
              >
                {/* State badge */}
                <div className="inline-flex items-center gap-2 mb-7">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-medium" style={{ color: activeData.accent }}>
                    {activeData.id}
                  </span>
                  <div className="w-7 h-[1px]" style={{ background: `linear-gradient(90deg, ${activeData.accent}, transparent)` }} />
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 font-normal">
                    {activeData.label}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-[clamp(22px,3.5vw,32px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-[#f0f0ea] mb-5">
                  {activeData.title}
                </h2>

                {/* Subtitle */}
                <p className={`font-mono text-[13px] font-light text-[#e8e8e0]/55 leading-[1.7] tracking-[0.01em] ${activeData.lead ? 'mb-1.5' : 'mb-7'}`}>
                  {activeData.subtitle}
                </p>

                {/* Lead */}
                {activeData.lead && (
                  <p className="font-mono text-[12px] font-normal text-[#e8e8e0]/35 leading-[1.7] mb-7 italic tracking-[0.01em]">
                    {activeData.lead}
                  </p>
                )}

                {/* Divider */}
                <div className="w-8 h-[1px] mb-6" style={{ background: `linear-gradient(90deg, ${activeData.accent}60, transparent)` }} />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeData.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="inline-block py-[5px] px-3 rounded-[2px] text-[10px] tracking-[0.12em] font-medium uppercase font-mono whitespace-nowrap"
                      style={{ background: `${activeData.accent}1a`, border: `1px solid ${activeData.accent}40`, color: `${activeData.accent}cc` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-[1px] shrink-0" style={{ background: `linear-gradient(90deg, ${activeData.accent}, ${activeData.accentAlt})` }} />
                  <p className="font-mono text-[11px] tracking-[0.1em] text-[#e8e8e0]/45 uppercase font-normal">
                    {activeData.cta}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom dot nav */}
      <div className="mt-[52px] flex gap-8 items-center relative z-10">
        {evolutionStages.map((stage, idx) => {
          const isActive = activeStage === idx;
          return (
            <button
              key={stage.id}
              onClick={() => handleSelectStage(idx)}
              className="bg-transparent border-none cursor-pointer flex items-center gap-[7px] transition-opacity duration-200 text-inherit"
              style={{ opacity: isActive ? 1 : 0.28 }}
            >
              <div 
                className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200"
                style={{ background: isActive ? `linear-gradient(135deg, ${stage.accent}, ${stage.accentAlt})` : 'rgba(255,255,255,0.4)' }}
              />
              <span 
                className="font-mono text-[9px] tracking-[0.15em] uppercase transition-colors duration-200"
                style={{ color: isActive ? stage.accent : 'rgba(255,255,255,0.5)' }}
              >
                {stage.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

const ProductEvolution = memo(ProductEvolutionComponent);
export default ProductEvolution;
