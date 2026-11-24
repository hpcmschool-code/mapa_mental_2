/* =============================================================
   MAPA MENTAL INTERATIVO DA FAMÍLIA
   - Expansão progressiva por cliques (radial)
   - Zoom, arrasto (pan), recentrar
   - Painel de definições só após "VER DEFINIÇÃO"
   ============================================================= */

/* ---------- Elementos ---------- */
const home = document.getElementById('home');
const mapScreen = document.getElementById('mapScreen');
const viewport = document.getElementById('viewport');
const stage = document.getElementById('stage');
const svg = document.getElementById('connectors');
const panel = document.getElementById('definitionPanel');
const panelContent = document.getElementById('definitionContent');
const seeDefBar = document.getElementById('seeDefBar');
const seeDefBtn = document.getElementById('seeDefBtn');
const seeDefLabel = document.getElementById('seeDefLabel');
const mapHint = document.getElementById('mapHint');

/* ---------- Conteúdos (definidos em content.js) ---------- */
const FAMILY_MAP = window.FAMILY_CONTENT.familyMap;
const VIS = window.FAMILY_VISUALS;
const ROOT_TEXT = window.FAMILY_CONTENT.ROOT_INFO;

/* ---------- Índice de nós + nó raiz ---------- */
const nodeIndex = new Map();
const ROOT = { id: '__root__', title: 'FAMÍLIA', root: true, items: FAMILY_MAP };

function index(node, parent, branchColor) {
  node.parent = parent;
  node.branchColor = node.root ? null : (node.color || branchColor);
  node._expanded = false;
  nodeIndex.set(node.id, node);
  (node.items || []).forEach(ch => index(ch, node, node.branchColor));
}
index(ROOT, null, null);

/* lado do mapa (1 = direita, -1 = esquerda): os 4 primeiros tópicos à direita */
function sideOf(node){
  while (node.parent && node.parent.parent) node = node.parent;
  return FAMILY_MAP.indexOf(node) < 4 ? 1 : -1;
}

/* anéis decorativos concêntricos à volta do centro */
svg.insertAdjacentHTML('afterbegin',
  '<circle r="128" fill="none" stroke="#efbd72" stroke-opacity=".16" stroke-dasharray="2 9" stroke-linecap="round" stroke-width="2"/>' +
  '<circle r="236" fill="none" stroke="#efbd72" stroke-opacity=".07" stroke-width="1.5"/>');

/* depth */
function depthOf(node){ let d=0,n=node; while(n.parent){d++;n=n.parent;} return d; }

/* ---------- Estado de vista (pan/zoom) ---------- */
let scale = 1, panX = 0, panY = 0;
const MIN_SCALE = 0.12, MAX_SCALE = 2.2;

function applyTransform(){
  stage.style.transform = `translate(${panX}px,${panY}px) scale(${scale})`;
  svg.style.transform = `translate(${panX}px,${panY}px) scale(${scale})`;
}

/* =============================================================
   LAYOUT DO MAPA MENTAL (equilibrado, à volta do centro)
   - 4 tópicos à direita e 4 à esquerda do botão FAMÍLIA
   - cada nível ocupa uma coluna; os ramos nunca se sobrepõem
     porque cada sub-árvore reserva a sua própria faixa vertical
   - as alturas reais dos nós são medidas no DOM
   ============================================================= */
const H_GAP = 64;          // espaço horizontal entre níveis
const V_GAP = 14;          // espaço vertical entre nós irmãos
const TOPIC_GAP = 46;      // espaço vertical entre tópicos principais
const ROOT_R = 90;         // raio do botão FAMÍLIA
const positions = new Map(); // id -> {x,y,w,h,side}
const elMap = new Map();     // id -> <button>
const pathMap = new Map();   // id -> <path>
let selectedId = null;

function collectVisible(){
  const out = [];
  (function walk(node){
    out.push(node);
    if (node._expanded && node.items) node.items.forEach(walk);
  })(ROOT);
  return out;
}

function size(node){ const el = elMap.get(node.id); return { w: el.offsetWidth, h: el.offsetHeight }; }

/* altura total da faixa ocupada por uma sub-árvore */
function bandHeight(node){
  const own = size(node).h;
  if (!node._expanded || !node.items || !node.items.length) return own;
  const kids = node.items.reduce((s,c)=>s + bandHeight(c), 0) + V_GAP * (node.items.length - 1);
  return Math.max(own, kids);
}

/* coloca o nó com o centro vertical em y e a margem interior em xEdge */
function place(node, xEdge, y, side){
  const s = size(node);
  const x = xEdge + side * s.w / 2;
  positions.set(node.id, { x, y, w: s.w, h: s.h, side });
  if (!node._expanded || !node.items || !node.items.length) return;
  const childEdge = xEdge + side * (s.w + H_GAP);
  stackChildren(node.items, childEdge, y, side, V_GAP);
}

function stackChildren(list, xEdge, yCenter, side, gap){
  const bands = list.map(bandHeight);
  const total = bands.reduce((a,b)=>a+b,0) + gap * (list.length - 1);
  let cursor = yCenter - total / 2;
  list.forEach((ch, i)=>{
    place(ch, xEdge, cursor + bands[i] / 2, side);
    cursor += bands[i] + gap;
  });
}

/* Distribuição orgânica: cada tópico tem o seu afastamento (dx) e desvio vertical (dy);
   os dois lados também estão deslocados entre si. As faixas continuam a não se sobrepor. */
const TOPIC_LAYOUT = {
  conceito:{dx:14,dy:-14}, tipos:{dx:74,dy:10}, caracteristicas:{dx:0,dy:-4}, organizacao:{dx:46,dy:12},
  evolucao:{dx:36,dy:-12}, funcoes:{dx:-6,dy:8}, papeis:{dx:60,dy:-8}, desafios:{dx:12,dy:14}
};
function layoutSide(list, side, baseEdge, yShift){
  const bands = list.map(bandHeight);
  const total = bands.reduce((a,b)=>a+b,0) + TOPIC_GAP * (list.length - 1);
  let cursor = yShift - total / 2;
  list.forEach((ch, i)=>{
    const L = TOPIC_LAYOUT[ch.id] || {dx:0, dy:0};
    place(ch, baseEdge + side * L.dx, cursor + bands[i] / 2 + L.dy, side);
    cursor += bands[i] + TOPIC_GAP;
  });
}
function computeLayout(){
  positions.clear();
  const rs = size(ROOT);
  positions.set(ROOT.id, { x:0, y:0, w: rs.w, h: rs.h, side:0 });
  if (!ROOT._expanded) return;
  layoutSide(FAMILY_MAP.slice(0, 4),  1, ROOT_R + H_GAP - 6, -26);
  layoutSide(FAMILY_MAP.slice(4),    -1, -(ROOT_R + H_GAP - 6), 34);
}

/* =============================================================
   RENDER (com animação: novos ramos crescem a partir do pai)
   ============================================================= */
let animFrame = null;

function render(){
  const visible = collectVisible();
  const visibleIds = new Set(visible.map(n=>n.id));
  const prev = new Map(positions);

  // remove nós e ligações que deixaram de estar visíveis
  [...elMap.keys()].forEach(id=>{
    if (!visibleIds.has(id)){
      elMap.get(id).remove(); elMap.delete(id);
      if (pathMap.has(id)){ pathMap.get(id).remove(); pathMap.delete(id); }
    }
  });

  // cria/atualiza nós visíveis
  visible.forEach(node=>{
    let btn = elMap.get(node.id);
    if (!btn){
      btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.node = node.id;
      if (node.parent) btn.dataset.side = String(sideOf(node));
      if (depthOf(node) === 1) btn.dataset.topic = node.id;
      btn.style.setProperty('--node-color', node.branchColor || '#efbd72');
      btn.addEventListener('click', e=>{ e.stopPropagation(); onNodeClick(node); });
      btn.classList.add('entering');
      stage.appendChild(btn);
      elMap.set(node.id, btn);
      if (node.parent){
        const path = document.createElementNS('http://www.w3.org/2000/svg','path');
        const top = depthOf(node) === 1;
        path.setAttribute('fill','none');
        path.setAttribute('stroke', node.branchColor);
        path.setAttribute('stroke-width', top ? 2.2 : 1.3);
        path.setAttribute('stroke-opacity', top ? .8 : .5);
        path.setAttribute('stroke-linecap','round');
        svg.appendChild(path);
        pathMap.set(node.id, path);
      }
    }
    const hasChildren = node.items && node.items.length;
    btn.className = 'node ' + nodeClass(node) + (btn.classList.contains('entering') ? ' entering' : '') + (node.id === selectedId ? ' selected' : '');
    btn.setAttribute('aria-expanded', hasChildren ? String(!!node._expanded) : 'false');
    const chev = hasChildren && !node.root ? `<span class="chev" aria-hidden="true">${node._expanded ? '−' : '+'}</span>` : '';
    const ttl = `<span class="ttl">${escapeHtml(node.title)}</span>`;
    btn.innerHTML = node.root ? `<span>${escapeHtml(node.title)}</span>`
      : depthOf(node) === 1 ? `${VIS.art(node.id)}${ttl}${chev}`
      : `<span class="ico">${VIS.icon(node)}</span>${ttl}${chev}`;
  });

  computeLayout();

  // posição inicial de cada nó: anterior, ou a do pai (para "crescer" a partir dele)
  const from = new Map();
  visible.forEach(node=>{
    let start = prev.get(node.id);
    if (!start){
      let p = node.parent;
      while (p && !prev.get(p.id)) p = p.parent;
      start = p ? prev.get(p.id) : positions.get(node.id);
    }
    from.set(node.id, start);
  });

  cancelAnimationFrame(animFrame);
  const t0 = performance.now(), DUR = 480;
  const step = now=>{
    const t = Math.min(1, (now - t0) / DUR);
    const e = 1 - Math.pow(1 - t, 3);
    const cur = new Map();
    visible.forEach(node=>{
      const a = from.get(node.id), b = positions.get(node.id);
      cur.set(node.id, { x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e, w: b.w, h: b.h, side: b.side });
    });
    drawFrame(visible, cur);
    if (t < 1) animFrame = requestAnimationFrame(step);
    else elMap.forEach(el=>el.classList.remove('entering'));
  };
  animFrame = requestAnimationFrame(step);
  drawFrame(visible, (()=>{ const m=new Map(); visible.forEach(n=>m.set(n.id, from.get(n.id))); return m; })());
}

function drawFrame(visible, cur){
  visible.forEach(node=>{
    const p = cur.get(node.id);
    const el = elMap.get(node.id);
    el.style.left = p.x + 'px';
    el.style.top = p.y + 'px';
    if (!node.parent) return;
    const q = cur.get(node.parent.id);
    const side = positions.get(node.id).side;
    const sx = node.parent.root ? q.x + side * ROOT_R * 0.9 : q.x + side * q.w / 2;
    const ex = p.x - side * p.w / 2;
    const mx = (sx + ex) / 2;
    pathMap.get(node.id).setAttribute('d', `M ${sx} ${q.y} C ${mx} ${q.y}, ${mx} ${p.y}, ${ex} ${p.y}`);
  });
}

function nodeClass(node){
  if (node.root) return 'root';
  const d = depthOf(node);
  if (d === 1) return 'topic';
  if (node.items && node.items.length) return 'sub';
  return 'sub leaf';
}

/* =============================================================
   INTERAÇÃO COM NÓS
   Um clique: expande/recolhe (se tiver filhos) + seleciona
   ============================================================= */
function onNodeClick(node){
  if (node.items && node.items.length){
    node._expanded = !node._expanded;
  }
  selectedId = node.id;
  render();
  smoothRecenter(node);
  updateSeeDefBar(node);
  hideHintOnce();
  // se o painel já está aberto, atualiza a definição
  if (!panel.classList.contains('hidden')){
    showDefinition(node);
  }
}

function updateSeeDefBar(node){
  seeDefLabel.textContent = node.root ? 'Família' : node.title;
  seeDefBar.classList.remove('hidden');
  seeDefBar.dataset.node = node.id;
}

let hintHidden = false;
function hideHintOnce(){
  if (hintHidden) return;
  hintHidden = true;
  mapHint.textContent = 'Clica num conceito para abrir ramos · Arrasta para mover · Roda do rato para zoom';
}

/* =============================================================
   PAINEL DE DEFINIÇÕES
   ============================================================= */
function listHtml(title, arr, col){
  if (!arr || !arr.length) return '';
  return `<h3>${title}</h3><ul style="--panel-accent:${col}">${arr.map(t=>`<li>${escapeHtml(t)}</li>`).join('')}</ul>`;
}

function showDefinition(node){
  const info = node.root ? ROOT_TEXT : node;
  const col = node.branchColor || '#efbd72';
  const d = depthOf(node);
  const tag = node.root ? 'CONCEITO CENTRAL' : d === 1 ? 'TÓPICO PRINCIPAL' : (node.items && node.items.length ? 'SUBTEMA' : 'CONCEITO');

  let html = `<span class="def-tag" style="border-color:${col};color:${col}">${tag}</span>`;
  html += `<h2>${escapeHtml(node.root ? 'Família' : node.title)}</h2>`;
  if (node.parent && !node.parent.root){
    html += `<p class="def-path">FAMÍLIA › ${pathOf(node)}</p>`;
  }
  html += `<h3>Definição</h3><p>${escapeHtml(info.desc || '')}</p>`;
  html += listHtml('Características', info.chars, col);
  html += listHtml('Exemplos', info.examples, col);
  if (info.extra) html += `<h3>Informação complementar</h3><div class="panel-tip">${escapeHtml(info.extra)}</div>`;
  if (node.items && node.items.length){
    html += `<h3>Subdivisões</h3><ul style="--panel-accent:${col}">${node.items.map(it=>`<li><b>${escapeHtml(it.title)}</b></li>`).join('')}</ul>`;
  }

  panelContent.innerHTML = html;
  panelContent.scrollTop = 0;
  const wasHidden = panel.classList.contains('hidden');
  panel.classList.remove('hidden');
  if (wasHidden) requestAnimationFrame(()=>smoothRecenter());
}

function pathOf(node){
  const parts = [];
  let n = node.parent;
  while (n && !n.root){ parts.unshift(escapeHtml(n.title)); n = n.parent; }
  return parts.join(' › ') || '—';
}
function truncate(s,n){ return s.length > n ? s.slice(0,n).trim() + '…' : s; }
function escapeHtml(v=''){ return v.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* =============================================================
   EXPANDIR / RECOLHER TUDO + RECENTRAR
   ============================================================= */
function setExpandedAll(val){
  nodeIndex.forEach(n=>{ if (n.items && n.items.length) n._expanded = val; });
  render();
}

/* Enquadra o mapa visível no ecrã.
   focus: nó clicado — se o mapa não couber sem ficar demasiado pequeno,
   mantém-se uma escala legível e centra-se a sub-árvore desse nó. */
function boundsOf(ids){
  let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  ids.forEach(id=>{ const p=positions.get(id); if(!p) return;
    minX=Math.min(minX,p.x-p.w/2); maxX=Math.max(maxX,p.x+p.w/2);
    minY=Math.min(minY,p.y-p.h/2); maxY=Math.max(maxY,p.y+p.h/2); });
  return {minX,minY,maxX,maxY};
}
function recenter(focus){
  const rect = viewport.getBoundingClientRect();
  const mobile = rect.width < 720;
  const padX = mobile ? 16 : 70, padTop = mobile ? 80 : 95, padBottom = padTop;
  let b = boundsOf([...positions.keys()]);
  if (!isFinite(b.minX)) return;
  const fit = bb => Math.min((rect.width-padX*2)/(bb.maxX-bb.minX), (rect.height-padTop-padBottom)/(bb.maxY-bb.minY), 1.1);
  let s = fit(b);
  const floor = mobile ? 0.5 : 0.6;
  if (focus && s < floor){
    const ids = []; (function w(n){ ids.push(n.id); if(n._expanded&&n.items) n.items.forEach(w); })(focus);
    if (focus.parent) ids.push(focus.parent.id);
    b = boundsOf(ids);
    s = Math.max(floor, Math.min(fit(b), 1));
  }
  scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));
  const cx = (b.minX+b.maxX)/2, cy = (b.minY+b.maxY)/2;
  panX = rect.width/2 - cx*scale;
  panY = padTop + (rect.height-padTop-padBottom)/2 - cy*scale;
  applyTransform();
}

function smoothRecenter(focus){
  stage.classList.add('animating'); svg.classList.add('animating');
  recenter(focus && focus.id ? focus : undefined);
  setTimeout(()=>{ stage.classList.remove('animating'); svg.classList.remove('animating'); }, 550);
}

/* =============================================================
   ZOOM & PAN
   ============================================================= */
function zoomAt(clientX, clientY, factor){
  const rect = viewport.getBoundingClientRect();
  const mx = clientX - rect.left, my = clientY - rect.top;
  const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * factor));
  // mantém o ponto sob o cursor
  panX = mx - (mx - panX) * (newScale / scale);
  panY = my - (my - panY) * (newScale / scale);
  scale = newScale;
  applyTransform();
}

viewport.addEventListener('wheel', e=>{
  e.preventDefault();
  zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.12 : 0.89);
}, { passive:false });

let dragging=false, lastX=0, lastY=0, moved=false;
viewport.addEventListener('pointerdown', e=>{
  if (e.target.closest('.node')) return; // não arrastar ao clicar num nó
  dragging=true; moved=false; lastX=e.clientX; lastY=e.clientY;
  viewport.classList.add('grabbing');
  viewport.setPointerCapture(e.pointerId);
});
viewport.addEventListener('pointermove', e=>{
  if (!dragging) return;
  const dx=e.clientX-lastX, dy=e.clientY-lastY;
  if (Math.abs(dx)>2||Math.abs(dy)>2) moved=true;
  panX+=dx; panY+=dy; lastX=e.clientX; lastY=e.clientY;
  applyTransform();
});
function endDrag(){ dragging=false; viewport.classList.remove('grabbing'); }
viewport.addEventListener('pointerup', endDrag);
viewport.addEventListener('pointercancel', endDrag);
viewport.addEventListener('pointerleave', endDrag);

/* touch pinch-zoom */
let pinchDist=0;
viewport.addEventListener('touchmove', e=>{
  if (e.touches.length===2){
    e.preventDefault();
    const [a,b]=e.touches;
    const d=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);
    if (pinchDist){
      const mx=(a.clientX+b.clientX)/2, my=(a.clientY+b.clientY)/2;
      zoomAt(mx,my, d/pinchDist);
    }
    pinchDist=d;
  }
}, { passive:false });
viewport.addEventListener('touchend', ()=>{ pinchDist=0; });

/* =============================================================
   NAVEGAÇÃO ENTRE ECRÃS
   ============================================================= */
function showMap(){
  const btn = document.getElementById('startButton');
  btn.classList.add('clicked');
  home.classList.add('leaving');
  setTimeout(()=>{
    home.classList.add('hidden');
    mapScreen.classList.remove('hidden');
    // estado inicial: só FAMÍLIA
    setExpandedAll(false);
    selectedId = null;
    requestAnimationFrame(()=> recenter());
  }, 520);
}

/* =============================================================
   LIGAÇÕES DE BOTÕES
   ============================================================= */
document.getElementById('startButton').addEventListener('click', showMap);
document.getElementById('backHome').addEventListener('click', ()=>{
  mapScreen.classList.add('hidden');
  home.classList.remove('hidden','leaving');
  document.getElementById('startButton').classList.remove('clicked');
  panel.classList.add('hidden');
  seeDefBar.classList.add('hidden');
  window.scrollTo(0,0);
});
document.getElementById('expandAll').addEventListener('click', ()=>{ setExpandedAll(true); smoothRecenter(); });
document.getElementById('collapseAll').addEventListener('click', ()=>{
  setExpandedAll(false); selectedId=null; panel.classList.add('hidden'); seeDefBar.classList.add('hidden'); smoothRecenter();
});
document.getElementById('recenter').addEventListener('click', ()=>smoothRecenter());
document.getElementById('zoomIn').addEventListener('click', ()=>{ const r=viewport.getBoundingClientRect(); zoomAt(r.left+r.width/2, r.top+r.height/2, 1.18); });
document.getElementById('zoomOut').addEventListener('click', ()=>{ const r=viewport.getBoundingClientRect(); zoomAt(r.left+r.width/2, r.top+r.height/2, 0.85); });
document.getElementById('closePanel').addEventListener('click', ()=>{ panel.classList.add('hidden'); requestAnimationFrame(()=>smoothRecenter()); });
seeDefBtn.addEventListener('click', ()=>{
  const n = nodeIndex.get(seeDefBar.dataset.node);
  if (n) showDefinition(n);
});

/* Abre o ramo até um conceito, seleciona-o e mostra a definição
   (usado pelo botão «Ver no mapa» do quiz) */
function focusNode(id){
  const node = nodeIndex.get(id);
  if (!node) return;
  for (let p = node.parent; p; p = p.parent) p._expanded = true;
  selectedId = id;
  render();
  updateSeeDefBar(node);
  hideHintOnce();
  showDefinition(node);
  requestAnimationFrame(()=> requestAnimationFrame(()=> smoothRecenter(node)));
}
window.FamilyMap = { focusNode };

window.addEventListener('resize', ()=>{ if (!mapScreen.classList.contains('hidden')) recenter(); });

