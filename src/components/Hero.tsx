import { memo, useMemo } from "react";
import { motion } from "motion/react";

function HeroComponent() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center pt-32 pb-20 px-6 md:px-12 overflow-hidden bg-deep-olive">
      {/* 2️⃣ Background System */}
      <div className="absolute inset-0 z-0 pointer-events-none contain-strict">
         {/* Base color wash with vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(233,216,154,0.35)_0%,_rgba(45,51,25,0.8)_60%,_rgba(22,24,18,1)_100%)]" />
        
        {/* Soft blur gradient clouds */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-olive-green/30 blur-[120px] rounded-full mix-blend-screen transform-gpu" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-mist-grey/10 blur-[100px] rounded-full mix-blend-overlay transform-gpu" />
      </div>

      {/* Abstract Metallic Spheres */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden contain-strict">
         {/* Sphere 2 */}
         <motion.div 
            className="absolute bottom-[15%] -left-[8%] w-48 h-48 rounded-full blur-[2px] transform-gpu"
            style={{
              background: 'radial-gradient(circle at 40% 40%, #F3F1E8 0%, #B8C3CC 50%, #8A939C 100%)',
              willChange: "transform",
            }}
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
         />
         {/* Sphere 3 - Smaller, distant */}
         <motion.div 
            className="absolute top-[40%] left-[20%] w-16 h-16 rounded-full blur-[1px] opacity-60 transform-gpu"
            style={{
               background: 'radial-gradient(circle at 30% 30%, #F3F1E8 0%, #D8DBD6 100%)',
               willChange: "transform",
            }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
         />
      </div>

      <div className="max-w-6xl xl:max-w-7xl mx-auto w-full flex flex-col-reverse lg:grid lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10 pt-6 sm:pt-10 lg:pt-0">
        
        {/* Left Column - Content */}
        <div className="w-full lg:col-span-6 flex flex-col gap-8 sm:gap-10 text-center lg:text-left items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[4.25rem] leading-[1.1] sm:leading-[1.05] tracking-tight mb-6 sm:mb-8 text-pearl-white drop-shadow-lg">
              I build products across markets, <br className="hidden sm:inline" />
              teams &amp; technologies <br />
              <span className="sm:ml-6 md:ml-16 inline-block mt-2">
                — <span className="text-[#D4D19C] italic hover:underline decoration-1 underline-offset-8 decoration-[#D4D19C]/50 transition-all cursor-default text-glow">globally</span>
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ willChange: "transform, opacity" }}
            className="max-w-[540px] flex flex-col gap-6 sm:gap-8"
          >
            <h2 className="font-sans text-base sm:text-lg md:text-xl text-mist-grey font-light leading-relaxed">
              <TypewriterText text="From zero to " delay={0.4} />
              <HighlightText text="global launch" delay={0.8} />
              <TypewriterText text=", from idea to " delay={1.0} />
              <HighlightText text="monetization" delay={1.4} />
              <TypewriterText text=" — shipping an extensive portfolio of high-throughput products, modular architectures, and scalable platforms that fueled multi-million dollar revenue growth." delay={1.7} />
            </h2>
            
            <p className="font-sans text-sm sm:text-base text-silver-blue/80 leading-relaxed">
              I have hands-on experience in the full product lifecycle — from discovery, strategy, and system design to delivery, experimentation, growth, and monetization — across B2B SaaS, e-commerce, and Web3 ecosystems.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 sm:gap-y-4 font-mono text-xs text-silver-blue/60 uppercase tracking-wider text-left mx-auto lg:mx-0 w-full max-w-[480px]">
              <div className="flex items-start gap-2">
                <span className="text-pale-yellow">01</span>
                <span>Full Product Lifecycle</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-pale-yellow">02</span>
                <span>International Growth</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-pale-yellow">03</span>
                <span>B2B & SaaS Monetization</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-pale-yellow">04</span>
                <span>Strategy & Discovery</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 sm:pt-4">
              <a 
                href="https://www.linkedin.com/in/slaciep/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-pearl-white text-olive-black font-sans font-medium rounded-full hover:bg-pale-yellow transition-colors duration-300 min-h-[44px] flex items-center justify-center text-center"
              >
                View LinkedIn
              </a>
              <a 
                href="https://canva.link/1k0d78kch35hft0" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 border border-pearl-white/20 text-pearl-white font-sans font-medium rounded-full hover:bg-pearl-white/5 transition-colors duration-300 min-h-[44px] flex items-center justify-center text-center"
              >
                PDF Resume →
              </a>
            </div>
          </motion.div>
        </div>

        {/* Spacer Column */}
        <div className="hidden lg:block lg:col-span-1" />

        {/* Right Column - Portrait & Orb System with Responsive Mobile/Tablet Scaling */}
        <div className="w-full lg:col-span-5 relative flex flex-col justify-center items-center lg:items-end min-h-[340px] sm:min-h-[460px] lg:h-[700px] lg:pr-8 xl:pr-0">
          <div className="relative w-[260px] sm:w-[360px] md:w-[420px] lg:w-[440px] xl:w-[480px] h-[320px] sm:h-[440px] md:h-[520px] lg:h-[560px] xl:h-[600px] flex items-center justify-center mx-auto lg:mr-10 xl:mr-2">
            
            {/* Layer 1: Petal SVG with Slate Blue (#64748B) tone filter & color harmony */}
            <>
              <motion.div
                className="absolute top-[-10%] sm:top-[-12%] right-[-10%] sm:right-[-18%] w-[320px] sm:w-[460px] lg:w-[560px] h-[320px] sm:h-[460px] lg:h-[560px] pointer-events-none select-none z-0 transform-gpu"
                style={{ willChange: "transform" }}
                animate={{
                  rotate: [0, 6, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* 4-petal flower SVG color-filtered to Slate Blue */}
                <img
                  src="https://cdn.jsdelivr.net/gh/trishapd/SVGcollection@main/4-petal%20green%20flower.svg"
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-contain opacity-75"
                  style={{
                    filter: "brightness(0.92) sepia(0.55) hue-rotate(168deg) saturate(1.3)",
                    mixBlendMode: "color-dodge"
                  }}
                />
                {/* Slate Blue (#64748B) tint overlay for deep canvas integration */}
                <div 
                  className="absolute inset-0 rounded-full opacity-65 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, #64748B 0%, rgba(100, 116, 139, 0.4) 60%, transparent 80%)",
                    mixBlendMode: "color"
                  }}
                />
              </motion.div>
              <motion.img
                src="https://raw.githubusercontent.com/trishapd/SVGcollection/refs/heads/main/Petal-olive-1.svg"
                alt=""
                loading="eager"
                decoding="async"
                className="absolute top-[-10%] sm:top-[-12%] right-[-10%] sm:right-[-18%] w-[320px] sm:w-[460px] lg:w-[560px] h-[320px] sm:h-[460px] lg:h-[560px] opacity-25 mix-blend-screen pointer-events-none select-none z-0 transform-gpu"
                style={{ willChange: "transform" }}
                animate={{
                  rotate: -360
                }}
                transition={{
                  duration: 90,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </>

            {/* Layer 2: Portrait */}
            <motion.div 
              className="relative z-10 w-full h-full transform-gpu"
              style={{ willChange: "transform, opacity" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
            >
                <img 
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7afab593-07f8-4c1d-a4ce-8ad98f70624f/dljlsi6-424b25d1-0e2e-4bc3-b9ff-00867448bacc.png/v1/fill/w_1280,h_1584/hero_portrait_by_phanxxy_dljlsi6-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTU4NCIsInBhdGgiOiIvZi83YWZhYjU5My0wN2Y4LTRjMWQtYTRjZS04YWQ5OGY3MDYyNGYvZGxqbHNpNi00MjRiMjVkMS0wZTJlLTRiYzMtYjlmZi0wMDg2NzQ0OGJhY2MucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.oNhD3aguvMBPKV5BBllIEDr-u0VPqDXs0EabJPXE8xg"
                    alt="Slacie Phan"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-contain object-bottom drop-shadow-[0_0_35px_rgba(237,231,216,0.2)]"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
                    }}
                />
            </motion.div>

            {/* Orbit Frame */}
            <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-20">
              <div className="w-[460px] lg:w-[560px] h-[540px] lg:h-[640px] rounded-[60px] lg:rounded-[80px] border border-white/10" />
            </div>

            {/* Layer 3: Orbit Labels (Floating Magnetic Drift) - (>= 768px) */}
            <div className="hidden md:block absolute inset-0 z-30 pointer-events-none">
              <DriftingLabel text="PRODUCT SPECIALIST" top="12%" left="-8%" delay={0} duration={9} />
              <DriftingLabel text="GTM & GROWTH STRATEGIST" top="22%" right="-8%" delay={2} duration={11} />
              <DriftingLabel text="CREATIVE TECHNOLOGIST" top="48%" left="-10%" delay={1} duration={10} />
              <DriftingLabel text="SYSTEMS BUILDER" top="58%" right="-6%" delay={3} duration={12} />
              <DriftingLabel text="EXPERIENCE ARCHITECT" bottom="18%" left="-6%" delay={2} duration={9.5} />
              <DriftingLabel text="AI EXPERIMENTER" bottom="8%" right="-8%" delay={4} duration={11.5} />
            </div>

          </div>

          {/* Mobile Persona Chips Cluster (< 768px) */}
          <div className="flex md:hidden flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 px-2 w-full max-w-[360px] z-30">
            {["PRODUCT SPECIALIST", "GTM & GROWTH STRATEGIST", "CREATIVE TECHNOLOGIST", "SYSTEMS BUILDER", "EXPERIENCE ARCHITECT", "AI EXPERIMENTER"].map((text) => (
              <span 
                key={text}
                className="px-2.5 py-1 rounded-full bg-olive-black/90 border border-white/15 text-pearl-white/90 font-mono text-[9.5px] tracking-wider uppercase shadow-sm"
              >
                {text}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

const DriftingLabel = memo(function DriftingLabel({ 
  text, 
  top, 
  left, 
  right, 
  bottom, 
  delay,
  duration = 10
}: { 
  text: string; 
  top?: string; 
  left?: string; 
  right?: string; 
  bottom?: string; 
  delay: number;
  duration?: number;
}) {
  return (
    <motion.div 
      className="absolute pointer-events-auto transform-gpu"
      style={{ top, left, right, bottom, willChange: "transform, opacity" }}
      animate={{ 
        x: [0, 8, -6, 0], 
        y: [0, -8, 6, 0],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay
      }}
    >
      <div className="group relative">
        <div className="absolute inset-0 bg-[#D4D19C]/20 blur-md rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative px-4 py-2 md:px-5 md:py-2.5 rounded-3xl bg-[#141712]/80 backdrop-blur-md border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.6)] group-hover:border-[#D4D19C]/40 transition-colors duration-300 flex items-center justify-center">
          <span 
            className="font-mono text-[10px] md:text-xs text-pearl-white/95 tracking-wider uppercase group-hover:text-[#D4D19C] transition-colors duration-300 max-w-[150px] md:max-w-[190px] text-center leading-relaxed inline-block"
            style={{
              textShadow: '0 0 12px rgba(212, 209, 156, 0.45), 0 2px 4px rgba(0, 0, 0, 0.85)'
            }}
          >
            {text}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

const TypewriterText = memo(function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = useMemo(() => text.split(" "), [text]);
  return (
    <span className="inline">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: delay + index * 0.05, ease: "easeOut" }}
          className="inline-block mr-[0.28em] transform-gpu"
          style={{ willChange: "transform, opacity" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
});

const HighlightText = memo(function HighlightText({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="relative inline-block text-pearl-white font-medium">
      {text}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pale-yellow/40 to-transparent transform-gpu"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
        style={{ originX: 0, willChange: "transform, opacity" }}
      />
    </span>
  );
});

const Hero = memo(HeroComponent);
export default Hero;
