import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center pt-32 pb-20 px-6 md:px-12 overflow-hidden bg-deep-olive">
      {/* 2️⃣ Background System */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Base color wash with vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(233,216,154,0.35)_0%,_rgba(45,51,25,0.8)_60%,_rgba(22,24,18,1)_100%)]" />
        
        {/* Soft blur gradient clouds */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-olive-green/30 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-mist-grey/10 blur-[100px] rounded-full mix-blend-overlay" />

        {/* Fine grain noise texture (8-10%) */}
        <div className="absolute inset-0 opacity-[0.09] mix-blend-overlay" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")' }} 
        />
      </div>

      {/* Abstract Metallic Spheres */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         {/* Sphere 2 */}
         <motion.div 
            className="absolute bottom-[15%] -left-[8%] w-48 h-48 rounded-full blur-[2px]"
            style={{
              background: 'radial-gradient(circle at 40% 40%, #F3F1E8 0%, #B8C3CC 50%, #8A939C 100%)',
            }}
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
         />
         {/* Sphere 3 - Smaller, distant */}
         <motion.div 
            className="absolute top-[40%] left-[20%] w-16 h-16 rounded-full blur-[1px] opacity-60"
            style={{
               background: 'radial-gradient(circle at 30% 30%, #F3F1E8 0%, #D8DBD6 100%)',
            }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
         />
      </div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column - Content */}
        <div className="lg:col-span-6 flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight mb-8 text-pearl-white drop-shadow-lg">
              I build products <br />
              that <span className="text-pale-yellow italic hover:underline decoration-1 underline-offset-8 decoration-pale-yellow/50 transition-all cursor-default text-glow">scale</span> <br />
              <span className="ml-12 md:ml-24 block">— globally.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-[540px] flex flex-col gap-8"
          >
            <h2 className="font-sans text-lg md:text-xl text-mist-grey font-light leading-relaxed">
              <TypewriterText text="From zero to " delay={0.5} />
              <HighlightText text="global launch" delay={1.0} />
              <TypewriterText text=", from idea to " delay={1.2} />
              <HighlightText text="monetization" delay={1.8} />
              <TypewriterText text=" — I own the full product lifecycle across B2B, SaaS, Web3 and scalable digital platforms." delay={2.2} />
            </h2>
            
            <p className="font-sans text-base text-silver-blue/80 leading-relaxed">
              I bring a full-stack mindset to product—grounded in marketing and driving scalable business growth, with hands-on roadmap ownership and delivery, and a strong grasp of data, AI intuition, and product-led growth strategy. I thrive at the intersection of <span className="text-pale-yellow italic">vision</span> and <span className="text-pale-yellow italic">execution</span>. I’m drawn to build things that resonate—beautiful, functional, and sometimes distinctive.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 font-mono text-xs text-silver-blue/60 uppercase tracking-wider">
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

            <div className="flex flex-wrap gap-6 pt-4">
              <a 
                href="https://www.linkedin.com/in/laciep/" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-pearl-white text-olive-black font-sans font-medium rounded-full hover:bg-pale-yellow transition-colors duration-300"
              >
                View LinkedIn
              </a>
              <a 
                href="https://canva.link/32jf1i0tu1wwgcd" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-pearl-white/20 text-pearl-white font-sans font-medium rounded-full hover:bg-pearl-white/5 transition-colors duration-300"
              >
                PDF Resume →
              </a>
            </div>
          </motion.div>
        </div>

        {/* Spacer Column */}
        <div className="hidden lg:block lg:col-span-1" />

        {/* Right Column - Portrait & Orb System */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end h-[700px] items-center">
          <div className="relative w-[480px] h-[600px] flex items-center justify-center">
            
            {/* Layer 1: Petal SVG (Replacing Orbit Rings) */}
            <>
              <motion.img
                src="https://cdn.jsdelivr.net/gh/trishapd/SVGcollection@main/4-petal%20green%20flower.svg"
                className="absolute top-[-12%] right-[-18%] w-[560px] h-[560px] opacity-70 mix-blend-soft-light pointer-events-none select-none z-0"
                animate={{
                  rotate: [0, 6, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.img
                src="https://raw.githubusercontent.com/trishapd/SVGcollection/refs/heads/main/Petal-olive-1.svg"
                className="absolute top-[-12%] right-[-18%] w-[560px] h-[560px] opacity-25 mix-blend-screen pointer-events-none select-none z-0"
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
              className="relative z-10 w-full h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <img 
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7afab593-07f8-4c1d-a4ce-8ad98f70624f/dljlsi6-424b25d1-0e2e-4bc3-b9ff-00867448bacc.png/v1/fill/w_1280,h_1584/hero_portrait_by_phanxxy_dljlsi6-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTU4NCIsInBhdGgiOiIvZi83YWZhYjU5My0wN2Y4LTRjMWQtYTRjZS04YWQ5OGY3MDYyNGYvZGxqbHNpNi00MjRiMjVkMS0wZTJlLTRiYzMtYjlmZi0wMDg2NzQ0OGJhY2MucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.oNhD3aguvMBPKV5BBllIEDr-u0VPqDXs0EabJPXE8xg"
                    alt="Lacie Phan"
                    className="w-full h-full object-contain object-bottom drop-shadow-[0_0_35px_rgba(237,231,216,0.2)]"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
                    }}
                />
            </motion.div>

            {/* Orbit Frame */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="w-[560px] h-[640px] rounded-[80px] border border-white/10" />
            </div>

            {/* Layer 3: Orbit Labels (Floating Magnetic Drift) */}
            <div className="absolute inset-0 z-30 pointer-events-none">
              <DriftingLabel text="PRODUCT SPECIALIST" top="15%" left="-10%" delay={0} />
              <DriftingLabel text="GTM & GROWTH STRATEGIST" top="25%" right="-15%" delay={2} />
              <DriftingLabel text="CREATIVE CURATOR" top="50%" left="-12%" delay={1} />
              <DriftingLabel text="MICROSERVICE BUILDER" top="60%" right="-10%" delay={3} />
              <DriftingLabel text="EXPERIENCE ARCHITECT" bottom="20%" left="-8%" delay={2} />
              <DriftingLabel text="AI IMPLEMENTATION CONSULTANT" bottom="10%" right="-12%" delay={4} />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function DriftingLabel({ text, top, left, right, bottom, delay }: { text: string, top?: string, left?: string, right?: string, bottom?: string, delay: number }) {
  return (
    <motion.div 
      className="absolute pointer-events-auto"
      style={{ top, left, right, bottom }}
      animate={{ 
        x: [0, 8, -6, 0], 
        y: [0, -8, 6, 0],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ 
        duration: 8 + Math.random() * 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: delay
      }}
    >
      <div className="group relative">
        <div className="absolute inset-0 bg-pale-yellow/20 blur-md rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative px-5 py-2.5 rounded-3xl bg-gradient-to-r from-silver-blue/10 to-transparent backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.1)] group-hover:border-pale-yellow/30 transition-colors duration-300 flex items-center justify-center">
          <span className="font-mono text-[10px] text-pearl-white/90 tracking-[0.25em] uppercase group-hover:text-pale-yellow transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] max-w-[140px] md:max-w-[180px] text-center leading-relaxed inline-block">
            {text}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function TypewriterText({ text, delay = 0 }: { text: string, delay?: number }) {
  const characters = text.split("");
  return (
    <span className="inline-block">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05, delay: delay + index * 0.03, ease: "easeOut" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function HighlightText({ text, delay }: { text: string, delay: number }) {
  return (
    <span className="relative inline-block text-pearl-white font-medium">
      {text}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pale-yellow/40 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
    </span>
  );
}
