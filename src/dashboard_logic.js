export function initDashboard(shadowRoot) {
  // ── STATE ──────────────────────────────────────────────────────────────────
  let nodes = [];
  let edges = [];
  let selectedNode = null;
  let simulationActive = false;
  let canvasScale = 1;
  let canvasOffset = { x: 0, y: 0 };
  let activeTool = 'select';
  let minimapVisible = false;
  let systemTick = 0;

  // ── NODE DEFINITIONS ───────────────────────────────────────────────────────
  const nodeTypes = {
    input:       { label: 'INPUT',       icon: '⬇', badge: 'INGESTION', desc: 'Collects raw data from external sources and normalizes it for processing.', color: '#6366f1' },
    constraint:  { label: 'CONSTRAINT',  icon: '🛡', badge: 'GUARD',     desc: 'Applies rate limits, policy rules, and ethical guardrails to the data stream.', color: '#f59e0b' },
    execution:   { label: 'EXECUTION',   icon: '⚡', badge: 'CORE',      desc: 'Runs the primary inference and action loop against current constraints.', color: '#39ff8e' },
    feedback:    { label: 'FEEDBACK',    icon: '↺',  badge: 'SIGNAL',    desc: 'Captures output quality signals and routes them back for adjustment.', color: '#8b5cf6' },
    optimization:{ label: 'OPTIM',       icon: '✦',  badge: 'AI',        desc: 'Continuously tunes hyperparameters based on feedback signal gradients.', color: '#f43f5e' },
    api:         { label: 'API GATEWAY', icon: '⬡',  badge: 'EXT',       desc: 'Handles external REST/GraphQL calls to third-party integrations.', color: '#06b6d4' },
  };

  function randomMetrics() {
    return {
      latency: (Math.random() * 80 + 10).toFixed(0) + 'ms',
      success: (Math.random() * 20 + 78).toFixed(1) + '%',
      throughput: (Math.random() * 900 + 100).toFixed(0) + '/s',
      errors: Math.floor(Math.random() * 8),
      uptime: (Math.random() * 5 + 94).toFixed(2) + '%',
    };
  }

  function randomSparkData() {
    const pts = [];
    let v = 50 + Math.random() * 20;
    for (let i = 0; i < 20; i++) {
      v = Math.max(10, Math.min(90, v + (Math.random() - 0.48) * 15));
      pts.push(v);
    }
    return pts;
  }

  function sparklineSVG(data, color) {
    const w = 162, h = 28;
    const mx = Math.max(...data), mn = Math.min(...data);
    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - mn) / (mx - mn + 1)) * (h - 4) - 2;
      return `${x},${y}`;
    });
    const fillPts = `0,${h} ${pts.join(' ')} ${w},${h}`;
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg${color.replace('#','')}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon points="${fillPts}" fill="url(#sg${color.replace('#','')})"/>
      <polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  // ── INITIAL NODES ──────────────────────────────────────────────────────────
  const initLayout = [
    { type: 'input',        x: 60,   y: 120 },
    { type: 'constraint',   x: 310,  y: 60  },
    { type: 'execution',    x: 560,  y: 120 },
    { type: 'feedback',     x: 560,  y: 320 },
    { type: 'optimization', x: 310,  y: 320 },
    { type: 'api',          x: 60,   y: 320 },
  ];

  const initEdges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [2, 4],
  ];

  // ── BUILD NODES ────────────────────────────────────────────────────────────
  function buildNode(type, x, y, id) {
    const t = nodeTypes[type];
    const metrics = randomMetrics();
    const spark = randomSparkData();
    const nodeId = id || 'n' + Date.now() + Math.random().toString(36).slice(2);

    const el = document.createElement('div');
    el.className = `node n-${type}`;
    el.id = nodeId;
    el.style.left = x + 'px';
    el.style.top  = y + 'px';

    el.innerHTML = `
      <div class="port port-in" data-node="${nodeId}" data-dir="in"></div>
      <div class="port port-out" data-node="${nodeId}" data-dir="out"></div>
      <div class="node-header">
        <div class="node-icon">${t.icon}</div>
        <div class="node-title">${t.label}</div>
        <div class="node-badge">${t.badge}</div>
      </div>
      <div class="node-body">
        <div class="node-desc">${t.desc}</div>
        <div class="sparkline">${sparklineSVG(spark, t.color)}</div>
        <div class="node-metrics">
          <div class="metric-pill">⏱ <span class="val">${metrics.latency}</span></div>
          <div class="metric-pill">✓ <span class="val">${metrics.success}</span></div>
          <div class="metric-pill">⬆ <span class="val">${metrics.throughput}</span></div>
        </div>
      </div>
    `;

    el._nodeType  = type;
    el._metrics   = metrics;
    el._sparkData = spark;
    el._id        = nodeId;

    makeDraggable(el);
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('port')) return;
      selectNode(el);
    });

    shadowRoot.getElementById('canvas').appendChild(el);

    const nodeObj = { el, type, x, y, id: nodeId, metrics };
    nodes.push(nodeObj);
    return nodeObj;
  }

  // ── DRAG ───────────────────────────────────────────────────────────────────
  function makeDraggable(el) {
    let startX, startY, origX, origY, dragging = false;

    el.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('port')) return;
      e.preventDefault();
      dragging = false;
      startX = e.clientX; startY = e.clientY;
      origX  = parseInt(el.style.left); origY = parseInt(el.style.top);

      const onMove = (e2) => {
        const dx = e2.clientX - startX, dy = e2.clientY - startY;
        if (!dragging && Math.hypot(dx, dy) > 4) {
          dragging = true;
          el.classList.add('dragging');
        }
        if (dragging) {
          const nx = origX + dx / canvasScale;
          const ny = origY + dy / canvasScale;
          el.style.left = nx + 'px';
          el.style.top  = ny + 'px';
          const node = nodes.find(n => n.el === el);
          if (node) { node.x = nx; node.y = ny; }
          drawEdges();
          updateMinimap();
        }
      };
      const onUp = () => {
        el.classList.remove('dragging');
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  }

  // ── SELECT NODE ───────────────────────────────────────────────────────────
  function selectNode(el) {
    nodes.forEach(n => n.el.classList.remove('selected'));
    const node = nodes.find(n => n.el === el);
    if (!node) return;
    el.classList.add('selected');
    selectedNode = node;
    openInspector(node);
  }

  // ── INSPECTOR ─────────────────────────────────────────────────────────────
  function openInspector(node) {
    const t = nodeTypes[node.type];
    const m = node.metrics;
    shadowRoot.getElementById('insp-title').textContent = t.label + ' · INSPECTOR';
    const successNum = parseFloat(m.success);
    const latNum     = parseInt(m.latency);

    shadowRoot.getElementById('insp-body').innerHTML = `
      <div class="insp-section">
        <div style="font-size:10px;color:var(--indigo);margin-bottom:12px;font-family:'Space Mono',monospace;line-height:1.4;">
          Each node represents part of the "Agentic Loop"
        </div>
        <div class="insp-section-title">Identity</div>
        <div class="insp-row"><span class="insp-label">Node ID</span><span class="insp-val">${node.id.slice(-8)}</span></div>
        <div class="insp-row"><span class="insp-label">Type</span><span class="insp-val">${node.type.toUpperCase()}</span></div>
        <div class="insp-row"><span class="insp-label">Status</span><span class="insp-val good">● ACTIVE</span></div>
        <div class="insp-row"><span class="insp-label">Position</span><span class="insp-val">${Math.round(node.x)}, ${Math.round(node.y)}</span></div>
      </div>
      <div class="insp-section">
        <div class="insp-section-title">Performance</div>
        <div class="insp-row"><span class="insp-label">Latency</span><span class="insp-val ${latNum > 60 ? 'warn' : 'good'}">${m.latency}</span></div>
        <div class="insp-row"><span class="insp-label">Success Rate</span><span class="insp-val ${successNum > 90 ? 'good' : successNum > 80 ? 'warn' : 'bad'}">${m.success}</span></div>
        <div class="insp-row"><span class="insp-label">Throughput</span><span class="insp-val">${m.throughput}</span></div>
        <div class="insp-row"><span class="insp-label">Errors/hr</span><span class="insp-val ${m.errors > 5 ? 'bad' : m.errors > 2 ? 'warn' : 'good'}">${m.errors}</span></div>
        <div class="insp-row"><span class="insp-label">Uptime</span><span class="insp-val good">${m.uptime}</span></div>

        <div style="margin-top:8px">
          <div style="font-size:9px;color:var(--muted);margin-bottom:4px">Success Rate</div>
          <div class="insp-bar"><div class="insp-bar-fill" style="width:${successNum}%;background:${successNum > 90 ? 'var(--neon)' : successNum > 80 ? 'var(--amber)' : 'var(--red)'}"></div></div>
        </div>
        <div style="margin-top:8px">
          <div style="font-size:9px;color:var(--muted);margin-bottom:4px">Load</div>
          <div class="insp-bar"><div class="insp-bar-fill" style="width:${Math.random()*60+20}%;background:var(--indigo)"></div></div>
        </div>
      </div>
      <div class="insp-section">
        <div class="insp-section-title">Configuration</div>
        <div class="toggle-row"><span class="toggle-label">Active</span><div class="toggle on"><div class="toggle-knob"></div></div></div>
        <div class="toggle-row"><span class="toggle-label">Auto-scale</span><div class="toggle on"><div class="toggle-knob"></div></div></div>
        <div class="toggle-row"><span class="toggle-label">Debug mode</span><div class="toggle"><div class="toggle-knob"></div></div></div>
        <div class="toggle-row"><span class="toggle-label">Cache</span><div class="toggle on"><div class="toggle-knob"></div></div></div>
      </div>
      <div class="insp-section">
        <div class="insp-section-title">Output Preview</div>
        <div style="background:rgba(0,0,0,0.3);border-radius:8px;padding:8px;font-family:'Space Mono',monospace;font-size:9px;color:var(--muted);line-height:1.7">
          <div><span style="color:var(--neon)">→</span> payload: {…}</div>
          <div><span style="color:var(--indigo)">→</span> tokens: ${Math.floor(Math.random()*2000+500)}</div>
          <div><span style="color:var(--amber)">→</span> model: claude-3-sonnet</div>
          <div><span style="color:var(--violet)">→</span> queue: ${Math.floor(Math.random()*10)}</div>
        </div>
      </div>
    `;

    // Add event listeners to toggles
    shadowRoot.querySelectorAll('.toggle').forEach(t => {
      t.addEventListener('click', () => t.classList.toggle('on'));
    });

    shadowRoot.getElementById('inspector').classList.add('open');
  }

  function closeInspector() {
    shadowRoot.getElementById('inspector').classList.remove('open');
    nodes.forEach(n => n.el.classList.remove('selected'));
    selectedNode = null;
  }

  // ── EDGES ─────────────────────────────────────────────────────────────────
  function getPortCenter(node, dir) {
    const el = node.el;
    const port = el.querySelector(`.port-${dir}`);
    if (!port) return null;
    const cr = el.getBoundingClientRect();
    const pr = port.getBoundingClientRect();
    const canvas = shadowRoot.getElementById('canvas').getBoundingClientRect();
    return {
      x: pr.left + pr.width / 2 - canvas.left,
      y: pr.top  + pr.height / 2 - canvas.top,
    };
  }

  function drawEdges() {
    const svg = shadowRoot.getElementById('edge-layer');
    svg.innerHTML = '';

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    // gradient for edges
    ['indigo-violet', 'indigo-neon'].forEach((id, i) => {
      const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      grad.setAttribute('id', 'eg-' + id);
      grad.setAttribute('gradientUnits', 'userSpaceOnUse');
      const c1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      c1.setAttribute('offset', '0%'); c1.setAttribute('stop-color', i === 0 ? '#6366f1' : '#6366f1');
      const c2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      c2.setAttribute('offset', '100%'); c2.setAttribute('stop-color', i === 0 ? '#8b5cf6' : '#39ff8e');
      grad.appendChild(c1); grad.appendChild(c2); defs.appendChild(grad);
    });
    svg.appendChild(defs);

    edges.forEach((edge, i) => {
      const from = nodes[edge[0]], to = nodes[edge[1]];
      if (!from || !to) return;
      const s = getPortCenter(from, 'out');
      const e = getPortCenter(to,   'in');
      if (!s || !e) return;

      const dx = e.x - s.x;
      const cp1x = s.x + dx * 0.5, cp1y = s.y;
      const cp2x = e.x - dx * 0.5, cp2y = e.y;
      const d = `M ${s.x} ${s.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${e.x} ${e.y}`;

      // shadow/glow
      const glow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      glow.setAttribute('d', d);
      glow.setAttribute('fill', 'none');
      glow.setAttribute('stroke', i % 2 === 0 ? '#6366f1' : '#8b5cf6');
      glow.setAttribute('stroke-width', '6');
      glow.setAttribute('stroke-opacity', '0.12');
      glow.setAttribute('stroke-linecap', 'round');
      svg.appendChild(glow);

      // main line
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', `url(#eg-indigo-${i % 2 === 0 ? 'violet' : 'neon'})`);
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('stroke-linecap', 'round');
      if (simulationActive) {
        path.classList.add('edge-animated');
        path.setAttribute('stroke-dasharray', '6 4');
      }
      path.style.cursor = 'pointer';

      // hover effect
      const hoverPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      hoverPath.setAttribute('d', d);
      hoverPath.setAttribute('fill', 'none');
      hoverPath.setAttribute('stroke', 'transparent');
      hoverPath.setAttribute('stroke-width', '16');
      hoverPath.style.cursor = 'pointer';
      hoverPath.addEventListener('mouseenter', () => {
        path.setAttribute('stroke-width', '2.5');
        glow.setAttribute('stroke-opacity', '0.25');
      });
      hoverPath.addEventListener('mouseleave', () => {
        path.setAttribute('stroke-width', '1.5');
        glow.setAttribute('stroke-opacity', '0.12');
      });

      // arrow head
      const angle = Math.atan2(e.y - cp2y, e.x - cp2x);
      const arrowSize = 6;
      const ax1 = e.x - arrowSize * Math.cos(angle - 0.4);
      const ay1 = e.y - arrowSize * Math.sin(angle - 0.4);
      const ax2 = e.x - arrowSize * Math.cos(angle + 0.4);
      const ay2 = e.y - arrowSize * Math.sin(angle + 0.4);
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      arrow.setAttribute('points', `${e.x},${e.y} ${ax1},${ay1} ${ax2},${ay2}`);
      arrow.setAttribute('fill', i % 2 === 0 ? '#8b5cf6' : '#39ff8e');
      arrow.setAttribute('opacity', '0.8');

      svg.appendChild(path);
      svg.appendChild(hoverPath);
      svg.appendChild(arrow);
    });
  }

  // ── SIMULATION ────────────────────────────────────────────────────────────
  let simInterval = null;

  function toggleSimulation() {
    simulationActive = !simulationActive;
    const btn = shadowRoot.getElementById('sim-btn');
    const canvas = shadowRoot.getElementById('canvas');

    if (simulationActive) {
      btn.textContent = '■ Stop';
      btn.style.background = 'rgba(244,63,94,0.15)';
      btn.style.borderColor = '#f43f5e';
      btn.style.color = '#f43f5e';
      canvas.classList.add('simulating');
      showNotif('▶', 'Simulation started', '12 nodes · 7 edges active', 'neon');
      simInterval = setInterval(animateParticle, 1200);
      animateParticle();
    } else {
      btn.textContent = '▶ Simulate';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      canvas.classList.remove('simulating');
      if (simInterval) clearInterval(simInterval);
    }
    drawEdges();
  }

  function animateParticle() {
    if (!simulationActive || edges.length === 0) return;
    const edge = edges[Math.floor(Math.random() * edges.length)];
    const from = nodes[edge[0]], to = nodes[edge[1]];
    if (!from || !to) return;
    const s = getPortCenter(from, 'out');
    const e = getPortCenter(to, 'in');
    if (!s || !e) return;

    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = s.x + 'px';
    p.style.top  = s.y + 'px';
    const canvas = shadowRoot.getElementById('canvas');
    canvas.appendChild(p);

    const dx = e.x - s.x, dy = e.y - s.y;
    const cp1x = s.x + dx * 0.5, cp1y = s.y;
    const cp2x = e.x - dx * 0.5, cp2y = e.y;

    let t = 0;
    const step = () => {
      t += 0.025;
      if (t > 1) { p.remove(); return; }
      const mt = 1 - t;
      const x = mt*mt*mt*s.x + 3*mt*mt*t*cp1x + 3*mt*t*t*cp2x + t*t*t*e.x;
      const y = mt*mt*mt*s.y + 3*mt*mt*t*cp1y + 3*mt*t*t*cp2y + t*t*t*e.y;
      p.style.left = (x - 4) + 'px';
      p.style.top  = (y - 4) + 'px';
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ── AUTO LAYOUT ───────────────────────────────────────────────────────────
  function autoLayout() {
    const positions = [
      { x: 60,  y: 120 }, { x: 310, y: 60  }, { x: 560, y: 120 },
      { x: 560, y: 320 }, { x: 310, y: 320 }, { x: 60,  y: 320 },
    ];
    nodes.forEach((node, i) => {
      const pos = positions[i % positions.length];
      const extraX = Math.floor(i / positions.length) * 220;
      const targetX = pos.x + extraX;
      const targetY = pos.y;
      animateNodeTo(node, targetX, targetY);
    });
    setTimeout(drawEdges, 350);
    showNotif('⚡', 'Auto-layout applied', 'Nodes reorganized optimally', 'indigo');
  }

  function animateNodeTo(node, tx, ty) {
    const startX = node.x, startY = node.y;
    const dur = 400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
      const cx = startX + (tx - startX) * e;
      const cy = startY + (ty - startY) * e;
      node.el.style.left = cx + 'px';
      node.el.style.top  = cy + 'px';
      node.x = cx; node.y = cy;
      drawEdges();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ── ADD / DELETE NODES ────────────────────────────────────────────────────
  function addRandomNode() {
    const types = Object.keys(nodeTypes);
    const type  = types[Math.floor(Math.random() * types.length)];
    const canvas = shadowRoot.getElementById('canvas');
    const cr     = canvas.getBoundingClientRect();
    const x = (Math.random() * (cr.width - 250) + 40) / canvasScale;
    const y = (Math.random() * (cr.height - 200) + 40) / canvasScale;
    buildNode(type, x, y);
    drawEdges();
    updateMinimap();
    showNotif('✦', 'Node added', nodeTypes[type].label, 'violet');
  }

  function deleteSelected() {
    if (!selectedNode) return;
    const idx = nodes.indexOf(selectedNode);
    if (idx !== -1) {
      selectedNode.el.remove();
      nodes.splice(idx, 1);
      edges = edges.filter(e => e[0] !== idx && e[1] !== idx)
                   .map(e => [e[0] > idx ? e[0]-1 : e[0], e[1] > idx ? e[1]-1 : e[1]]);
      closeInspector();
      drawEdges();
      updateMinimap();
    }
  }

  // ── ZOOM ──────────────────────────────────────────────────────────────────
  function zoom(factor) {
    canvasScale = Math.max(0.3, Math.min(2, canvasScale * factor));
    applyCanvasTransform();
  }

  function fitCanvas() {
    canvasScale = 1;
    canvasOffset = { x: 0, y: 0 };
    applyCanvasTransform();
  }

  function applyCanvasTransform() {
    shadowRoot.getElementById('canvas').style.transform = `translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${canvasScale})`;
    shadowRoot.getElementById('canvas').style.transformOrigin = '0 0';
    drawEdges();
  }

  // ── CANVAS PANNING ────────────────────────────────────────────────────────
  let isPanning = false;
  let panStartX = 0, panStartY = 0;

  function handlePanMove(e) {
    if (!isPanning) return;
    canvasOffset.x = e.clientX - panStartX;
    canvasOffset.y = e.clientY - panStartY;
    applyCanvasTransform();
  }

  function handlePanUp() {
    if (isPanning) {
      isPanning = false;
      const wrap = shadowRoot.getElementById('canvas-wrap');
      if (wrap) wrap.style.cursor = activeTool === 'pan' ? 'grab' : 'default';
    }
  }

  function bindPanEvents() {
    const wrap = shadowRoot.getElementById('canvas-wrap');
    if (wrap) {
      wrap.addEventListener('mousedown', (e) => {
        // Only pan if clicking on the wrap itself (not a node) or if pan tool is active
        if (e.target === wrap || e.target.id === 'canvas' || e.target.id === 'edge-layer' || activeTool === 'pan') {
          isPanning = true;
          panStartX = e.clientX - canvasOffset.x;
          panStartY = e.clientY - canvasOffset.y;
          wrap.style.cursor = 'grabbing';
        }
      });
    }

    document.addEventListener('mousemove', handlePanMove);
    document.addEventListener('mouseup', handlePanUp);
  }

  // ── MINIMAP ───────────────────────────────────────────────────────────────
  function toggleMinimap() {
    minimapVisible = !minimapVisible;
    shadowRoot.getElementById('minimap').style.display = minimapVisible ? 'block' : 'none';
    shadowRoot.getElementById('mm-btn').classList.toggle('active', minimapVisible);
    if (minimapVisible) updateMinimap();
  }

  function updateMinimap() {
    if (!minimapVisible) return;
    const mm = shadowRoot.getElementById('minimap');
    mm.innerHTML = '';
    const canvas = shadowRoot.getElementById('canvas');
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const mw = 120, mh = 80;

    nodes.forEach(node => {
      const d = document.createElement('div');
      d.className = 'mini-node';
      const t = nodeTypes[node.type];
      d.style.width  = (190 / cw * mw) + 'px';
      d.style.height = (80  / ch * mh) + 'px';
      d.style.left   = (node.x / cw * mw) + 'px';
      d.style.top    = (node.y / ch * mh) + 'px';
      d.style.background = t.color;
      mm.appendChild(d);
    });
  }

  // ── PROJECT SWITCH ────────────────────────────────────────────────────────
  function switchProject(el, name) {
    shadowRoot.querySelectorAll('.proj-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    showNotif('🔵', 'Switched project', name, 'indigo');
  }

  // ── SIDEBAR ───────────────────────────────────────────────────────────────
  function setSbActive(el) {
    shadowRoot.querySelectorAll('.sb-icon').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
  }

  // ── TOOL ─────────────────────────────────────────────────────────────────
  function setTool(name, el) {
    activeTool = name;
    shadowRoot.querySelectorAll('.ft-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
  }

  // ── NOTIFICATIONS ─────────────────────────────────────────────────────────
  function showNotif(icon, text, sub, type) {
    const stack = shadowRoot.getElementById('notif-stack');
    const el = document.createElement('div');
    el.className = 'notif';
    const colors = { neon: 'var(--neon)', indigo: 'var(--indigo)', violet: 'var(--violet)' };
    el.style.borderColor = colors[type] || 'var(--border)';
    el.innerHTML = `<div class="notif-icon">${icon}</div><div><div class="notif-text">${text}</div><div class="notif-sub">${sub}</div></div>`;
    stack.appendChild(el);
    setTimeout(() => el.style.opacity = '0', 2500);
    setTimeout(() => el.remove(), 2800);
  }

  // ── LIVE SYSTEM METRICS ───────────────────────────────────────────────────
  let metricsInterval = null;
  function tickMetrics() {
    systemTick++;
    const lat  = (Math.random() * 50 + 20).toFixed(0) + 'ms';
    const cpu  = (Math.random() * 40 + 20).toFixed(0) + '%';
    const mem  = (Math.random() * 0.8 + 1.4).toFixed(1) + ' GB';
    const agts = 10 + Math.floor(Math.random() * 5);
    shadowRoot.getElementById('latency-val').textContent = lat;
    shadowRoot.getElementById('cpu-val').textContent = cpu;
    shadowRoot.getElementById('mem-val').textContent = mem;
    shadowRoot.getElementById('agent-count').textContent = agts;
  }

  // ── KEYBOARD ──────────────────────────────────────────────────────────────
  function handleKeydown(e) {
    if (e.key === 'Escape') closeInspector();
    if (e.key === 'Delete' || e.key === 'Backspace') deleteSelected();
    if (e.key === '+' || e.key === '=') zoom(1.1);
    if (e.key === '-') zoom(0.9);
  }

  // ── EVENT BINDINGS ────────────────────────────────────────────────────────
  function bindEvents() {
    bindPanEvents();
    shadowRoot.getElementById('btn-auto-layout')?.addEventListener('click', autoLayout);
    shadowRoot.getElementById('sim-btn')?.addEventListener('click', toggleSimulation);
    
    shadowRoot.querySelectorAll('.proj-tab').forEach(tab => {
      tab.addEventListener('click', (e) => switchProject(e.currentTarget, e.currentTarget.dataset.proj));
    });

    shadowRoot.querySelectorAll('.sb-icon').forEach(icon => {
      icon.addEventListener('click', (e) => setSbActive(e.currentTarget));
    });

    shadowRoot.getElementById('tool-select')?.addEventListener('click', (e) => setTool('select', e.currentTarget));
    shadowRoot.getElementById('tool-pan')?.addEventListener('click', (e) => setTool('pan', e.currentTarget));
    shadowRoot.getElementById('btn-add-node')?.addEventListener('click', addRandomNode);
    shadowRoot.getElementById('btn-delete-node')?.addEventListener('click', deleteSelected);
    shadowRoot.getElementById('btn-zoom-in')?.addEventListener('click', () => zoom(1.15));
    shadowRoot.getElementById('btn-zoom-out')?.addEventListener('click', () => zoom(0.85));
    shadowRoot.getElementById('btn-fit-canvas')?.addEventListener('click', fitCanvas);
    shadowRoot.getElementById('mm-btn')?.addEventListener('click', toggleMinimap);
    shadowRoot.getElementById('btn-close-insp')?.addEventListener('click', closeInspector);

    document.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', handleResize);
  }

  function handleResize() {
    drawEdges();
    updateMinimap();
  }

  // ── INIT ──────────────────────────────────────────────────────────────────
  function initializeDashboard(data) {
    // Clear existing nodes and edges if any
    nodes.forEach(n => n.el.remove());
    nodes = [];
    edges = [];

    const layout = data.nodes || [];
    const newEdges = data.edges || [];

    layout.forEach((n, i) => buildNode(n.type, n.x, n.y, 'n' + i));
    edges = [...newEdges];

    bindEvents();

    requestAnimationFrame(() => {
      drawEdges();
      updateMinimap();
    });

    if (metricsInterval) clearInterval(metricsInterval);
    metricsInterval = setInterval(tickMetrics, 3000);

    setTimeout(() => showNotif('⚡', 'System online', `${nodes.length} nodes loaded · ${edges.length} edges active`, 'neon'), 800);
    setTimeout(() => showNotif('🔵', 'Project Alpha active', 'Ready for orchestration', 'indigo'), 1800);
  }

  // Listen for initialization data from parent
  window.addEventListener("message", (event) => {
    if (event.data && event.data.type === 'initDashboard') {
      if (window.fallbackInitTimer) clearTimeout(window.fallbackInitTimer);
      initializeDashboard(event.data.payload);
    }
  });

  // Fallback init if no message received
  window.fallbackInitTimer = setTimeout(() => {
    initializeDashboard({ nodes: initLayout, edges: initEdges });
  }, 500);

  // Return cleanup function
  return function cleanup() {
    if (simInterval) clearInterval(simInterval);
    if (metricsInterval) clearInterval(metricsInterval);
    if (window.fallbackInitTimer) clearTimeout(window.fallbackInitTimer);
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('mousemove', handlePanMove);
    document.removeEventListener('mouseup', handlePanUp);
    window.removeEventListener('resize', handleResize);
  };
}
