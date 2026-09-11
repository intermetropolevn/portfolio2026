import fs from 'fs';

let svg = fs.readFileSync('/system_map.svg', 'utf8');

// 1. Strip all inline `style="..."` attributes since they conflict with CSS
svg = svg.replace(/style="[^"]*"/g, '');

// 2. Identify and tag Core Nodes
// Core Parsing has specific text. The enclosing rects can be found.
// `x="627" y="189"` is the inner box of Core Parsing. 
// `x="818" y="183"` is Decision.
// Let's just add classes to the nodes.
svg = svg.replace(/<rect x="627" y="189" width="180" height="92"/g, '<rect class="node-core" x="627" y="189" width="180" height="92"');
svg = svg.replace(/<rect x="818" y="183" width="202" height="106"/g, '<rect class="node-core" x="818" y="183" width="202" height="106"');

// 3. Edges: The main flow arrows
// The comment <!-- MAIN FLOW ARROWS (solid, neon cyan) --> until Feedback loops
let lines = svg.split('\n');
let inMainFlow = false;
let inFeedbackFlow = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('MAIN FLOW ARROWS')) inMainFlow = true;
  if (lines[i].includes('FEEDBACK LOOPS')) {
    inMainFlow = false;
    inFeedbackFlow = true;
  }
  if (lines[i].includes('RISK LAYER INDICATOR BARS')) inFeedbackFlow = false;

  if (inMainFlow && (lines[i].startsWith('<line ') || lines[i].startsWith('<path '))) {
    lines[i] = lines[i].replace('<line ', '<line class="edge-flow" ').replace('<path ', '<path class="edge-flow" ');
  }
  if (inFeedbackFlow && (lines[i].startsWith('<line ') || lines[i].startsWith('<path '))) {
    lines[i] = lines[i].replace('<line ', '<line class="signal" ').replace('<path ', '<path class="signal" ');
  }
}
svg = lines.join('\n');


// 4. Background nodes "lower opacity (but not blurred)"
const bgNodes = [
  'x="53" y="68" width="124" height="68"', // Node 0
  'x="48" y="200" width="134" height="80"', // Node 1
  'x="238" y="200" width="150" height="80"', // Node 2
  'x="238" y="360" width="150" height="80"', // Node 3
  'x="627" y="360" width="180" height="88"', // Node 5
  'x="238" y="530" width="150" height="80"', // Node 7
  'x="1100" y="200" width="150" height="80"', // Node 8
  'x="1100" y="360" width="150" height="80"', // Node 9
  'x="1160" y="520" width="188" height="98"', // Node 10
  'x="977" y="500" width="156" height="80"', // Calendar Event
];
bgNodes.forEach(selector => {
  svg = svg.replace('<rect ' + selector, '<rect class="node-bg" ' + selector);
});

// Adding styles into the SVG definitions
const styles = `
<style>
  /* ── CSS ANIMATIONS ── */
  @keyframes edgeFlow {
    to { stroke-dashoffset: -40; }
  }
  .edge-flow {
    stroke-dasharray: 10 8;
    animation: edgeFlow 1s linear infinite;
  }
  
  @keyframes signalPulse {
    0%, 100% { opacity: 0.4; filter: drop-shadow(0 0 2px transparent); }
    50% { opacity: 1; filter: drop-shadow(0 0 8px currentColor); }
  }
  .signal {
    animation: signalPulse 2s ease-in-out infinite;
  }

  @keyframes corePulse {
    0%, 100% { filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.4)) brightness(1); }
    50% { filter: drop-shadow(0 0 25px rgba(34, 211, 238, 0.8)) brightness(1.2); }
  }
  .node-core {
    animation: corePulse 3s ease-in-out infinite;
  }

  .node-bg {
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }
  .node-bg:hover {
    opacity: 0.9;
  }
</style>
`;
svg = svg.replace('<defs>', '<defs>' + styles);

fs.writeFileSync('/system_map_inlined.svg', svg);
console.log("Done!");
