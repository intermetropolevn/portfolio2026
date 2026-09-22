import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, memo } from "react";

const projects = [
  {
    id: "01",
    client: "User Engagement & Reward Systems",
    role: "Core Initiatives",
    period: "2024–2025",
    description: "Product Lifecycle Development & Growth Strategies for a hybrid Web3 social platform.",
    stats: [
      { value: 15, label: "Activation Uplift", prefix: "+", suffix: "%" },
      { value: 40, label: "New-User MAU", prefix: "+", suffix: "%" },
      { value: 60, label: "CPI Reduction", prefix: "~", suffix: "%" }
    ],
    metricChips: [
      "Driving +15% activation uplift, +40% new-user MAU growth, and retention improvement from <10% to 35%.",
      "Reducing CPI by ~60% through ASO improvements, retargeting and in-product virality loops."
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
    description: "B2B Operational Management & Fulfillment Web Application Development for print-on-demand commerce.",
    stats: [
      { value: 45, label: "Category Adoption", prefix: "+", suffix: "%" },
      { value: 5000, label: "Connected Stores", suffix: "+" },
      { value: 10, label: "Platform Integrations", suffix: "+" }
    ],
    metricChips: [
      "Productized enterprise fulfillment tiers and high-margin packaging add-ons, increasing new product category adoption by 45%.",
      "Standardized platform data schemas across catalog, pricing, and fulfillment APIs, engineering a dynamic feed engine that syndicated compliant product data across Google Shopping, Meta, and Pinterest for 5,000+ connected stores."
    ],
    capabilities: ["B2B Commerce", "Ordering Systems", "Fulfillment Infrastructure", "Platform Operations"],
    tagline: "From niche print-on-demand startup to global platform for sellers.",
    svgBase: "https://raw.githubusercontent.com/trishapd/SVGcollection/refs/heads/main/layer-MC2.svg"
  },
  {
    id: "03",
    client: "CommerceOS — Multi-Tenant B2B Platform",
    role: "Core Initiatives",
    period: "2025–Present",
    description: "Defined the product architecture for a scalable multi-tenant B2B SaaS platform, establishing organization & dependency, workspace, role-based access control (RBAC), configurable modules, and AI-assisted decision workflows connecting research and data-access models.",
    stats: [
      { value: 15, label: "Commerce Teams", prefix: ">", suffix: "+" },
      { value: 7000, label: "Active Users", suffix: "+" },
      { value: 28, label: "ARPA Expansion", prefix: "+", suffix: "%" }
    ],
    metricChips: [
      "Enabled >15 commerce teams and 7000+ active users through a configurable multi-tenant architecture and modular commerce intelligence workflows.",
      "Architected usage-based and seat-based upsell triggers in tenant workspaces; increased Average Revenue Per Account (ARPA) by 28%."
    ],
    capabilities: ["B2B SaaS", "Multi-Tenant", "AI Agents", "RBAC Architecture", "Commerce Intelligence"],
    tagline: "From fragmented commerce workflows to modular, AI-assisted decision systems.",
    svgBase: "https://raw.githubusercontent.com/trishapd/SVGcollection/refs/heads/main/Vector%20(1).svg"
  }
];

const AsciiFolder = memo(function AsciiFolder() {
  return (
    <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-48 md:h-48 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
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
});

const Counter = memo(function Counter({ value, label, suffix = "", prefix = "", delay = 0 }: { value: number, label: string, suffix?: string, prefix?: string, delay?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 1.0, delay, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, delay, count]);

  return (
    <div ref={ref} className="flex flex-col">
       <div className="font-serif text-3xl md:text-4xl text-[rgba(240,240,235,0.9)] flex items-baseline">
         {prefix && <span className="text-[#D97757] text-2xl mr-0.5 font-light">{prefix}</span>}
         <motion.span>{rounded}</motion.span>
         {suffix && <span className="text-[#D97757] text-2xl ml-0.5 font-light">{suffix}</span>}
       </div>
       <span className="font-mono text-[10px] uppercase tracking-widest text-[rgba(240,240,235,0.5)] mt-2">{label}</span>
    </div>
  );
});

const CapabilityStrip = memo(function CapabilityStrip({ items }: { items: string[] }) {
  const duplicatedItems = [...items, ...items, ...items, ...items];
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "50px" });

  return (
    <div ref={containerRef} className="w-full overflow-hidden relative group py-6 border-y border-[rgba(255,255,255,0.08)] my-6">
       <div className="relative z-10 flex items-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div 
            className="flex gap-8 whitespace-nowrap transform-gpu"
            animate={isInView ? { x: ["0%", "-50%"] } : undefined}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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
  );
});

function SelectedWorkComponent() {
  return (
    <section id="work" className="w-full py-32 px-6 md:px-12 bg-olive-black relative overflow-hidden contain-paint">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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

const ProjectBlock = memo(function ProjectBlock({ project, index }: { project: typeof projects[0], index: number }) {
    const isEven = index % 2 === 0;
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-32 items-center relative transform-gpu`}
        >
            {/* Image Side - Centered within its parent column */}
            <div className="w-full lg:w-1/2 relative flex items-center justify-center my-auto">
                <div className="relative w-[85%] sm:w-[75%] lg:w-[75%] xl:w-[70%] aspect-square mx-auto my-auto flex items-center justify-center">
                    
                    {/* Container */}
                    <div 
                        className="relative w-full h-full rounded-sm overflow-hidden bg-[#050505] border border-white/10 shadow-2xl"
                    >
                        {/* Base SVG Container */}
                        <div className="absolute inset-0 flex items-center justify-center overflow-visible">
                            <div className="aspect-square w-full max-w-[320px] min-w-[200px] min-h-[200px] relative flex items-center justify-center">
                                <img 
                                    src={project.svgBase} 
                                    alt={project.client} 
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-contain opacity-90 mix-blend-screen"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-white/5', 'to-transparent', 'rounded-full');
                                    }}
                                />
                            </div>
                        </div>

                        {/* ASCII Folder Icon */}
                        <AsciiFolder />

                        {/* Subtle Vignette */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)] pointer-events-none" />
                    </div>

                    {/* Connector Line & Node */}
                    <div className={`absolute top-1/2 ${isEven ? '-right-12 lg:-right-20 xl:-right-28' : '-left-12 lg:-left-20 xl:-left-28'} w-12 lg:w-20 xl:w-28 h-[20px] hidden lg:block overflow-visible z-20 -translate-y-1/2 pointer-events-none`}>
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
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
                            />
                            
                            {/* Traveling data dot (Content -> Image) */}
                            <motion.circle 
                                cy="10" 
                                r="2.5" 
                                fill="#E6C78C"
                                initial={{ cx: isEven ? "100%" : "0%", opacity: 0 }}
                                animate={{ 
                                    cx: isEven ? ["100%", "0%"] : ["0%", "100%"],
                                    opacity: [0, 1, 1, 0] 
                                }}
                                transition={{ 
                                    duration: 2.2, 
                                    repeat: Infinity, 
                                    ease: "linear",
                                    times: [0, 0.1, 0.9, 1]
                                }}
                            />

                            {/* Node at the image side */}
                            <motion.circle 
                                cx={isEven ? "0%" : "100%"} 
                                cy="10" 
                                r="3" 
                                fill="#C89B3C"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.3, delay: 0.8 }}
                            />
                            
                            {/* Node at the content side */}
                            <motion.circle 
                                cx={isEven ? "100%" : "0%"} 
                                cy="10" 
                                r="2" 
                                fill="rgba(200,155,60,0.4)"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.3, delay: 0.5 }}
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 flex flex-col">
                <div className="flex items-center gap-4 font-mono text-xs text-pale-yellow tracking-widest uppercase mb-6">
                  <span>{project.id}</span>
                  <span className="w-8 h-px bg-[rgba(255,255,255,0.08)]" />
                  <span>{project.period}</span>
                </div>

                <h3 className="font-serif text-4xl md:text-5xl text-[rgba(240,240,235,0.9)] mb-2">
                  {project.client}
                </h3>

                <div className="text-xl md:text-2xl text-[rgba(240,240,235,0.65)] font-sans font-light mb-10">
                  {project.role}
                </div>

                <div className="grid grid-cols-3 gap-8 mb-6 border-t border-[rgba(255,255,255,0.08)] pt-8">
                  {project.stats.map((stat, i) => (
                    <Counter key={i} value={stat.value} label={stat.label} suffix={stat.suffix} prefix={stat.prefix} delay={0.3 + (i * 0.1)} />
                  ))}
                </div>

                {/* Metric Chips with exact impact metrics */}
                <div className="flex flex-col gap-2.5 mb-8">
                  {project.metricChips.map((metric, i) => (
                    <div 
                      key={i} 
                      className="group/chip flex items-start gap-3 p-3.5 rounded bg-white/[0.025] hover:bg-white/[0.045] border border-white/[0.08] hover:border-[#D4D19C]/30 transition-all duration-300"
                    >
                      <span className="font-mono text-[#D4D19C] text-sm leading-none mt-0.5 select-none shrink-0 group-hover/chip:translate-x-0.5 transition-transform duration-200">↳</span>
                      <span className="font-mono text-xs text-pearl-white/85 leading-relaxed tracking-wide">
                        {metric}
                      </span>
                    </div>
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
                  <a 
                    href="/src/about_page.html#career-trajectory" 
                    className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#D4D19C] hover:text-white transition-colors relative no-underline"
                  >
                    <span className="relative font-medium tracking-wider">
                        INSPECT ARCHITECTURE &amp; IMPACT →
                        <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#D4D19C] transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-[#D4D19C]" />
                  </a>
                </div>
            </div>
        </motion.div>
    );
});

const SelectedWork = memo(SelectedWorkComponent);
export default SelectedWork;
