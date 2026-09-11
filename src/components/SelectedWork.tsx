import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const projects = [
  {
    id: "01",
    client: "User Engagement & Reward Systems",
    role: "Core Initiatives",
    period: "2024–2025",
    description: "Product Lifecycle Development & Growth Strategies",
    stats: [
      { value: 40, label: "MAU among New Users", suffix: "%+" },
      { value: 45, label: "Engagement Growth", suffix: "%+" },
      { value: 3, label: "Reward Participation", suffix: "x" }
    ],
    capabilities: ["Product Systems", "User Engagement", "Gamification Economy", "Web3 Social Platform"],
    tagline: "From complex Web3 UX to everyday-friendly social experiences.",
    svgBase: "https://raw.githubusercontent.com/trishapd/SVGcollection/refs/heads/main/layer-MC1.svg"
  },
  {
    id: "02",
    client: "Ordering & Fulfillment Web Application",
    role: "Core Initiatives",
    period: "2019–2024",
    description: "B2B Operational Management & Fulfillment Web Application Development",
    stats: [
      { value: 30, label: "Global Merchant Base", suffix: "%+" },
      { value: 45, label: "Order Handling Velocity Improvement", suffix: "%+" },
      { value: 12, label: "International Markets", suffix: "+" }
    ],
    capabilities: ["B2B Commerce", "Ordering Systems", "Fulfillment Infrastructure", "Platform Operations"],
    tagline: "From niche print-on-demand startup to global platform for sellers.",
    svgBase: "https://raw.githubusercontent.com/trishapd/SVGcollection/refs/heads/main/layer-MC2.svg"
  },
  {
    id: "03",
    client: "E-learning Themes & Plugins",
    role: "Core Initiatives",
    period: "2019-2020",
    description: "LMS WordPress System Integration & Feature Enhancement",
    stats: [
      { value: 50, label: "Traffic Growth", suffix: "%+" },
      { value: 20, label: "Market Presence", suffix: "%+" },
      { value: 40, label: "Monthly Visitors", suffix: "%+" }
    ],
    capabilities: ["SEO Architecture", "Performance Marketing", "WordPress Ecosystem", "EdTech Platform Growth"],
    tagline: "From WordPress theme vendor to global education product ecosystem.",
    svgBase: "https://raw.githubusercontent.com/trishapd/SVGcollection/refs/heads/main/Vector%20(1).svg"
  }
];

const AsciiFolder = () => (
  <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-48 md:h-48 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_12px_rgba(200,155,60,0.4)]">
    {/* Corner markers */}
    <path d="M 10 10 L 15 10 M 10 10 L 10 15" fill="none" stroke="rgba(200,155,60,0.5)" strokeWidth="1" />
    <path d="M 90 10 L 85 10 M 90 10 L 90 15" fill="none" stroke="rgba(200,155,60,0.5)" strokeWidth="1" />
    <path d="M 10 90 L 15 90 M 10 90 L 10 85" fill="none" stroke="rgba(200,155,60,0.5)" strokeWidth="1" />
    <path d="M 90 90 L 85 90 M 90 90 L 90 85" fill="none" stroke="rgba(200,155,60,0.5)" strokeWidth="1" />
    
    {/* Folder */}
    <path d="M 25 70 L 25 35 L 45 35 L 45 45 L 75 45 L 75 70 Z" 
          fill="none" 
          stroke="#E6C78C" 
          strokeWidth="2" 
          strokeDasharray="0 5" 
          strokeLinecap="round" />
    <path d="M 25 45 L 45 45" 
          fill="none" 
          stroke="#E6C78C" 
          strokeWidth="2" 
          strokeDasharray="0 5" 
          strokeLinecap="round" />
          
    {/* Decorative UI elements */}
    <text x="25" y="30" fill="rgba(200,155,60,0.7)" fontSize="4" fontFamily="monospace" letterSpacing="1">DIR_01</text>
    <circle cx="70" cy="65" r="1" fill="rgba(200,155,60,0.7)" />
    <circle cx="65" cy="65" r="1" fill="rgba(200,155,60,0.7)" />
    
    {/* Crosshair center */}
    <path d="M 48 55 L 52 55 M 50 53 L 50 57" fill="none" stroke="rgba(200,155,60,0.3)" strokeWidth="0.5" />
  </svg>
);

function Counter({ value, label, suffix = "", delay = 0 }: { value: number, label: string, suffix?: string, delay?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 1.2, delay: delay, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [isInView, value, delay]);

  return (
    <div ref={ref} className="flex flex-col">
       <div className="font-serif text-3xl md:text-4xl text-[rgba(240,240,235,0.9)] flex items-baseline">
         <motion.span>{rounded}</motion.span>
         {suffix && <span className="text-[#D97757] text-2xl ml-0.5 font-light">{suffix}</span>}
       </div>
       <span className="font-mono text-[10px] uppercase tracking-widest text-[rgba(240,240,235,0.5)] mt-2">{label}</span>
    </div>
  )
}

function CapabilityStrip({ items }: { items: string[] }) {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden relative group py-6 border-y border-[rgba(255,255,255,0.08)] my-6">
       <div className="absolute inset-0 flex items-center opacity-20 blur-[3px] pointer-events-none select-none mix-blend-screen">
          <motion.div 
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {duplicatedItems.map((item, i) => (
              <div key={`ghost-${i}`} className="flex items-center gap-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[rgba(240,240,235,0.5)]">{item}</span>
                <div className="w-1.5 h-1.5 rotate-45 bg-[rgba(240,240,235,0.5)]" />
              </div>
            ))}
          </motion.div>
       </div>

       <div className="relative z-10 flex items-center opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:brightness-125">
          <motion.div 
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ willChange: "transform" }}
          >
            {duplicatedItems.map((item, i) => (
              <div key={`front-${i}`} className="flex items-center gap-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[rgba(240,240,235,0.65)]">{item}</span>
                <div className="w-1.5 h-1.5 rotate-45 bg-[#D97757]/60" />
              </div>
            ))}
          </motion.div>
       </div>
    </div>
  )
}

export default function SelectedWork() {
  return (
    <section id="work" className="w-full py-32 px-6 md:px-12 bg-olive-black relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-[rgba(255,255,255,0.08)] pb-8"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-[rgba(240,240,235,0.9)]">Selected Works</h2>
          <span className="font-mono text-xs text-[rgba(240,240,235,0.5)] uppercase tracking-widest mt-4 md:mt-0">
            Recent Case Studies
          </span>
        </motion.div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <div key={project.id} className="py-24 lg:py-32 border-b border-[rgba(255,255,255,0.05)] last:border-0">
              <ProjectBlock project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectBlock({ project, index }: { project: typeof projects[0], index: number }) {
    const isEven = index % 2 === 0;
    
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-32 items-center relative`}
        >
            {/* Image Side */}
            <div className={`w-full lg:w-1/2 relative flex justify-center ${isEven ? 'lg:justify-start' : 'lg:justify-end'}`}>
                <div className="relative w-[85%] lg:w-[70%] aspect-square">
                    
                    {/* Container */}
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full h-full rounded-sm overflow-hidden bg-[#050505] border border-white/10 shadow-2xl"
                    >
                        {/* Base SVG Container */}
                        <div className="absolute inset-0 flex items-center justify-center overflow-visible">
                            <div className="aspect-square w-full max-w-[320px] min-w-[200px] min-h-[200px] relative flex items-center justify-center">
                                <img 
                                    src={project.svgBase} 
                                    alt={project.client} 
                                    className="w-full h-full object-contain opacity-90 mix-blend-screen blur-[0.5px]"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-white/5', 'to-transparent', 'rounded-full');
                                    }}
                                />
                            </div>
                        </div>
                        
                        {/* Grain Texture */}
                        <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

                        {/* ASCII Folder Icon */}
                        <AsciiFolder />

                        {/* Subtle Vignette */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)] pointer-events-none" />
                    </motion.div>

                    {/* Connector Line & Node */}
                    <div className={`absolute top-1/2 ${isEven ? '-right-16 lg:-right-32' : '-left-16 lg:-left-32'} w-16 lg:w-32 h-[20px] hidden lg:block overflow-visible z-20 -translate-y-1/2`}>
                        <svg width="100%" height="100%" className="overflow-visible">
                            <defs>
                                <marker id={`arrow-head-${project.id}`} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                                    <path d="M 0 2 L 8 5 L 0 8" fill="none" stroke="rgba(200,155,60,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                </marker>
                            </defs>
                            
                            {/* Base dashed line */}
                            <motion.line 
                                x1={isEven ? "100%" : "0"} 
                                y1="10" 
                                x2={isEven ? "0" : "100%"} 
                                y2="10" 
                                stroke="rgba(200,155,60,0.25)" 
                                strokeWidth="1" 
                                strokeDasharray="4 4"
                                markerEnd={`url(#arrow-head-${project.id})`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                            />
                            
                            {/* Traveling data dot (Content -> Image) */}
                            <motion.circle 
                                cy="10" 
                                r="2" 
                                fill="#E6C78C"
                                initial={{ cx: isEven ? "100%" : "0%", opacity: 0 }}
                                animate={{ 
                                    cx: isEven ? ["100%", "0%"] : ["0%", "100%"],
                                    opacity: [0, 1, 1, 0] 
                                }}
                                transition={{ 
                                    duration: 2.5, 
                                    repeat: Infinity, 
                                    ease: "linear",
                                    times: [0, 0.1, 0.9, 1]
                                }}
                                style={{ filter: "drop-shadow(0 0 6px rgba(230,199,140,0.8))" }}
                            />

                            {/* Node at the image side */}
                            <motion.circle 
                                cx={isEven ? "0%" : "100%"} 
                                cy="10" 
                                r="3" 
                                fill="#C89B3C"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 1.2, type: "spring" }}
                            />
                            <motion.circle 
                                cx={isEven ? "0%" : "100%"} 
                                cy="10" 
                                r="8" 
                                stroke="#C89B3C"
                                strokeWidth="0.5"
                                fill="none"
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1.5, opacity: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 1.2, repeat: 0 }}
                            />
                            
                            {/* Node at the content side */}
                            <motion.circle 
                                cx={isEven ? "100%" : "0%"} 
                                cy="10" 
                                r="2" 
                                fill="rgba(200,155,60,0.4)"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.8, type: "spring" }}
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content Side */}
            <motion.div 
                initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full lg:w-1/2 flex flex-col"
            >
                <div className="flex items-center gap-4 font-mono text-xs text-pale-yellow tracking-widest uppercase mb-6">
                  <span>{project.id}</span>
                  <span className="w-8 h-px bg-[rgba(255,255,255,0.08)]" />
                  <span>{project.period}</span>
                </div>

                <motion.h3 
                  className="font-serif text-4xl md:text-5xl text-[rgba(240,240,235,0.9)] mb-2"
                >
                  {project.client}
                </motion.h3>

                <div className="text-xl md:text-2xl text-[rgba(240,240,235,0.65)] font-sans font-light mb-10">
                  {project.role}
                </div>

                <div className="grid grid-cols-3 gap-8 mb-8 border-t border-[rgba(255,255,255,0.08)] pt-8">
                  {project.stats.map((stat, i) => (
                    <Counter key={i} value={stat.value} label={stat.label} suffix={stat.suffix} delay={0.6 + (i * 0.12)} />
                  ))}
                </div>

                <div className="mb-10">
                   <CapabilityStrip items={project.capabilities} />
                </div>

                <p className="font-sans text-base text-[rgba(240,240,235,0.65)] leading-relaxed max-w-md mb-8">
                  {project.description}
                </p>

                <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] mb-8">
                  <p className="font-serif italic text-lg text-[rgba(240,240,235,0.5)]">
                    "{project.tagline}"
                  </p>
                </div>

                <div className="pt-2">
                  <button className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[rgba(240,240,235,0.9)] hover:text-pale-yellow transition-colors relative">
                    <span className="relative">
                        View Case Study
                        <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-pale-yellow transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
