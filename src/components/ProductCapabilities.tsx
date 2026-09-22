import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Settings, Workflow, Rocket, CreditCard, Layers, LayoutTemplate, X, Network } from "lucide-react";

const topClusters = [
  {
    id: "01",
    title: "Discovery",
    icon: Settings,
    items: [
      { name: "Ontology mapping", desc: "Define the system entities, relationships, and boundaries." },
      { name: "Capability scan", desc: "Audit existing capabilities, constraints, and leverage points." },
      { name: "Problem abstraction", desc: "Translate surface problems into structural patterns." },
      { name: "Hypothesis framing", desc: "Form testable system-level assumptions." }
    ]
  },
  {
    id: "02",
    title: "Build",
    icon: Workflow,
    items: [
      { name: "System design", desc: "Design modular architecture and interaction layers." },
      { name: "Workflow compression", desc: "Reduce steps and cognitive overhead in execution." },
      { name: "Module orchestration", desc: "Coordinate components into coherent flows." },
      { name: "Delivery logic", desc: "Ensure consistent and scalable execution paths." }
    ]
  },
  {
    id: "03",
    title: "Launch",
    icon: Rocket,
    items: [
      { name: "GTM architecture", desc: "Structure go-to-market as a system, not a campaign." },
      { name: "Narrative systems", desc: "Design messaging that compounds over time." },
      { name: "Channel modeling", desc: "Map acquisition and distribution pathways." },
      { name: "Signal tracking", desc: "Capture early indicators of traction and friction." }
    ]
  }
];

const bottomClusters = [
  {
    id: "04",
    title: "Scale",
    icon: CreditCard,
    items: [
      { name: "Growth loops", desc: "Design self-reinforcing acquisition and retention loops." },
      { name: "Platform layering", desc: "Expand system capabilities without breaking structure." },
      { name: "Automation mesh", desc: "Connect workflows into adaptive automation systems." },
      { name: "Infra expansion", desc: "Scale infrastructure to support growth complexity." }
    ]
  },
  {
    id: "05",
    title: "Optimize",
    icon: Layers,
    items: [
      { name: "Funnel tuning", desc: "Continuously refine conversion pathways." },
      { name: "Cost logic", desc: "Balance efficiency with growth investment." },
      { name: "UX compression", desc: "Reduce friction and cognitive load." },
      { name: "Refactor cycles", desc: "Iterate on system structure, not just features." }
    ]
  },
  {
    id: "06",
    title: "Govern",
    icon: LayoutTemplate,
    items: [
      { name: "Risk logic", desc: "Define and manage system-level risks." },
      { name: "Policy layer", desc: "Embed rules that guide autonomous behavior." },
      { name: "Data discipline", desc: "Ensure data integrity and decision reliability." },
      { name: "Ops governance", desc: "Maintain alignment across teams and systems." }
    ]
  }
];

const ALL_CLUSTERS = [...topClusters, ...bottomClusters];
const CLUSTER_IDS = ALL_CLUSTERS.map(c => c.id);

function ProductCapabilitiesComponent() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [autoActiveId, setAutoActiveId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { margin: "-50px" });
  
  // Auto-loop logic refs
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentLoopIndexRef = useRef<number>(0);

  const stopAutoLoop = useCallback(() => {
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
  }, []);

  const startAutoLoop = useCallback(() => {
    stopAutoLoop();
    
    const runLoop = () => {
      const currentIndex = currentLoopIndexRef.current;
      
      if (currentIndex >= CLUSTER_IDS.length) {
        setAutoActiveId(null);
        currentLoopIndexRef.current = 0;
        loopTimeoutRef.current = setTimeout(runLoop, 800);
        return;
      }

      setAutoActiveId(CLUSTER_IDS[currentIndex]);
      
      loopTimeoutRef.current = setTimeout(() => {
        currentLoopIndexRef.current++;
        runLoop();
      }, 1500);
    };

    runLoop();
  }, [stopAutoLoop]);

  // Run auto-loop only when section is in viewport and not hovered
  useEffect(() => {
    if (!isSectionInView || hoveredId) {
      stopAutoLoop();
      if (hoveredId) {
        setAutoActiveId(null);
      }
    } else {
      const resumeTimeout = setTimeout(() => {
        startAutoLoop();
      }, 400);
      return () => clearTimeout(resumeTimeout);
    }
    return () => stopAutoLoop();
  }, [isSectionInView, hoveredId, startAutoLoop, stopAutoLoop]);

  const handleClusterClick = useCallback((id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  }, []);

  const handleSetHoveredId = useCallback((id: string | null) => {
    setHoveredId(id);
  }, []);

  // Determine which ID is currently "active" for visual effects
  const activeId = hoveredId || autoActiveId;
  const isAutoMode = !hoveredId && !!autoActiveId;

  return (
    <section ref={sectionRef} className="relative w-full py-32 px-6 md:px-12 bg-deep-olive overflow-hidden min-h-screen flex flex-col items-center contain-paint">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none contain-strict" 
           style={{ backgroundImage: 'radial-gradient(#E9D89A 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-20 mb-16 text-center"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-pearl-white tracking-tight">
          PRODUCT OS BUILDER
        </h2>
        <div className="w-[1px] h-16 bg-gradient-to-b from-pale-yellow/50 to-transparent mx-auto mt-6" />
      </motion.div>

      {/* Diagram Container */}
      <div className="relative w-full max-w-[1400px] z-10">
        
        {/* Connector System (SVG Layer) */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block -z-10">
          <ConnectorSystem activeId={activeId} isAutoMode={isAutoMode} />
        </div>

        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 relative px-4 lg:px-8">
          {topClusters.map((cluster, i) => (
            <ClusterNode 
              key={cluster.id} 
              data={cluster} 
              index={i} 
              row="top"
              activeId={activeId}
              isAutoMode={isAutoMode}
              setHoveredId={handleSetHoveredId}
              isExpanded={expandedId === cluster.id}
              onClick={() => handleClusterClick(cluster.id)}
            />
          ))}
        </div>

        {/* Central Hub Node (Visual) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 hidden lg:flex items-center justify-center z-0 pointer-events-none">
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                animate={{ 
                    scale: activeId ? 1.2 : [1, 1.1, 1],
                    boxShadow: activeId 
                        ? (isAutoMode ? "0 0 25px rgba(233,216,154,0.4)" : "0 0 35px rgba(233,216,154,0.8)") 
                        : "0 0 15px rgba(233,216,154,0.2)"
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                    scale: { duration: activeId ? 0.3 : 8, repeat: activeId ? 0 : Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 0.3 }
                }}
                className="w-4 h-4 rounded-full bg-pale-yellow transform-gpu"
                style={{ willChange: "transform" }}
            />
            <motion.div 
                className="absolute inset-0 rounded-full border border-pale-yellow/40 transform-gpu"
                style={{ willChange: "transform, opacity" }}
                animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative px-4 lg:px-8">
          {bottomClusters.map((cluster, i) => (
            <ClusterNode 
              key={cluster.id} 
              data={cluster} 
              index={i + 3} 
              row="bottom"
              activeId={activeId}
              isAutoMode={isAutoMode}
              setHoveredId={handleSetHoveredId}
              isExpanded={expandedId === cluster.id}
              onClick={() => handleClusterClick(cluster.id)}
            />
          ))}
        </div>

      </div>

      {/* Expansion Overlay Modal */}
      <AnimatePresence>
        {expandedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-deep-olive/90 backdrop-blur-md p-4"
            onClick={() => setExpandedId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-olive-black border border-white/10 p-10 rounded-2xl max-w-3xl w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setExpandedId(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h3 className="font-serif text-4xl text-pearl-white mb-2">
                {[...topClusters, ...bottomClusters].find(c => c.id === expandedId)?.title}
              </h3>
              <p className="font-mono text-pale-yellow text-sm mb-8">MICRO-ONTOLOGY EXPLORER</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[...topClusters, ...bottomClusters].find(c => c.id === expandedId)?.items.map((item, i) => (
                    <div key={i} className="p-5 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                            <Network size={18} className="text-silver-blue" />
                            <span className="text-pearl-white font-sans font-medium text-lg">{item.name}</span>
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                 ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const ConnectorSystem = memo(function ConnectorSystem({ activeId, isAutoMode }: { activeId: string | null, isAutoMode: boolean }) {
    const paths = [
        { id: "01", d: "M 16 15 C 16 35, 50 35, 50 50" },
        { id: "02", d: "M 50 15 C 50 35, 50 35, 50 50" },
        { id: "03", d: "M 84 15 C 84 35, 50 35, 50 50" },
        { id: "04", d: "M 50 50 C 50 65, 16 65, 16 85" },
        { id: "05", d: "M 50 50 C 50 65, 50 65, 50 85" },
        { id: "06", d: "M 50 50 C 50 65, 84 65, 84 85" },
    ];

    return (
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(233, 216, 154, 0.05)" />
                    <stop offset="50%" stopColor="rgba(233, 216, 154, 0.3)" />
                    <stop offset="100%" stopColor="rgba(233, 216, 154, 0.05)" />
                </linearGradient>
            </defs>

            {/* Central Vertical Axis */}
            <motion.line 
              x1="50" y1="0" x2="50" y2="100" 
              stroke="url(#connectorGradient)" 
              strokeWidth="0.2"
              strokeDasharray="2 2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
            />

            {/* Base Lines */}
            {paths.map((path) => (
                <motion.path
                    key={path.id}
                    d={path.d}
                    fill="none"
                    stroke="url(#connectorGradient)"
                    strokeWidth="0.3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
                />
            ))}

            {/* Active Highlight Lines */}
            {paths.map((path) => {
                const isDirectlyActive = activeId === path.id;
                
                return (
                    <motion.path
                        key={`active-${path.id}`}
                        d={path.d}
                        fill="none"
                        stroke="#E9D89A"
                        strokeWidth={isDirectlyActive ? (isAutoMode ? "0.4" : "0.6") : "0"}
                        strokeOpacity={isDirectlyActive ? (isAutoMode ? 0.6 : 1) : 0}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isDirectlyActive ? 1 : 0 }}
                        transition={{ duration: 0.35 }}
                    />
                );
            })}

            {/* Data Flow Particles */}
            <AnimatePresence>
                {activeId && paths.map((path) => {
                     if (path.id !== activeId) return null;
                     return (
                        <motion.circle
                            key={`particle-${path.id}`}
                            r={isAutoMode ? "0.6" : "0.8"}
                            fill="#E9D89A"
                            opacity={isAutoMode ? 0.6 : 1}
                        >
                            <animateMotion
                                dur="1.5s"
                                repeatCount="indefinite"
                                path={path.d}
                                keyPoints="0;1"
                                keyTimes="0;1"
                            />
                        </motion.circle>
                     )
                })}
            </AnimatePresence>
        </svg>
    );
});

const ClusterNode = memo(function ClusterNode({ 
    data, 
    index, 
    row, 
    activeId,
    isAutoMode,
    setHoveredId, 
    isExpanded, 
    onClick
}: { 
    data: any, 
    index: number, 
    row: "top" | "bottom", 
    activeId: string | null,
    isAutoMode: boolean,
    setHoveredId: (id: string | null) => void,
    isExpanded: boolean,
    onClick: () => void
}) {
  const isDimmed = !isAutoMode && activeId !== null && activeId !== data.id;
  const isHighlighted = activeId === data.id;

  const revealDelay = row === 'top' 
    ? 0.3 + (index * 0.1) 
    : 0.6 + ((index - 3) * 0.1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ 
          opacity: isDimmed ? 0.65 : 1, 
          y: 0,
          scale: 1
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
          duration: 0.6, 
          delay: revealDelay,
          ease: "easeOut"
      }}
      style={{ willChange: "transform, opacity" }}
      onMouseEnter={() => setHoveredId(data.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={onClick}
      className={`group relative cursor-pointer transform-gpu ${row === 'top' ? 'mb-4' : 'mt-4'}`}
    >
      <motion.div 
        animate={{ 
            y: isHighlighted && !isAutoMode ? -6 : 0,
            scale: isHighlighted ? 1.015 : 1,
            borderColor: isHighlighted 
                ? (isAutoMode ? "rgba(233, 216, 154, 0.3)" : "rgba(233, 216, 154, 0.4)") 
                : "rgba(255, 255, 255, 0.05)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative h-full p-8 bg-olive-black/60 backdrop-blur-md border transition-colors duration-300 overflow-hidden rounded-2xl
          ${isHighlighted && !isAutoMode ? 'shadow-[0_0_30px_rgba(233,216,154,0.12)]' : ''}
          ${isHighlighted && isAutoMode ? 'shadow-[0_0_15px_rgba(233,216,154,0.04)]' : ''}
          ${!isHighlighted ? 'hover:border-white/10' : ''}
        `}
      >
        
        {/* Gradient Glow Background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent transition-opacity duration-300 ${isHighlighted ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Accent Left Line */}
        <div className={`absolute left-0 top-0 bottom-0 w-[4px] transition-colors duration-300
            ${isHighlighted ? 'bg-pale-yellow' : 'bg-white/10'}
        `} />

        <div className="flex items-center gap-4 mb-8 relative z-10">
          <div className={`p-3 rounded-lg transition-colors duration-300 ${isHighlighted ? 'bg-pale-yellow text-olive-black' : 'bg-white/5 text-silver-blue'}`}>
            <data.icon size={24} strokeWidth={1.5} />
          </div>
          <h3 
            className={`font-serif font-medium text-xl tracking-tight transition-colors duration-300 ${isHighlighted ? 'text-pale-yellow' : 'text-pearl-white'}`}
          >
            {data.title}
          </h3>
        </div>

        <ul className="space-y-4 relative z-10">
          {data.items.map((item: { name: string, desc: string }, i: number) => (
            <li 
                key={i} 
                className="flex items-start gap-3"
            >
              <span 
                className={`mt-2 w-1.5 h-1.5 rounded-full transition-colors duration-300 shrink-0 ${isHighlighted ? 'bg-pale-yellow' : 'bg-white/20'}`} 
              />
              <span className={`font-mono text-sm transition-colors duration-300 leading-relaxed ${isHighlighted ? 'text-pearl-white' : 'text-silver-blue/60'}`}>
                {item.name}
              </span>
            </li>
          ))}
        </ul>

        {/* Interactive "Expand" Hint */}
        <div className={`absolute bottom-6 right-6 transition-opacity duration-300 ${isHighlighted && !isAutoMode ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-8 h-8 rounded-full border border-pale-yellow/30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-pale-yellow rounded-full animate-pulse" />
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

const ProductCapabilities = memo(ProductCapabilitiesComponent);
export default ProductCapabilities;
