// Organiza QUALQUER fluxo: lê todos os cards e todas as ligações do canvas, descobre a "árvore" do fluxo
// (quem sai de quem) e reposiciona tudo para as linhas não se cruzarem nem os cards ficarem um em cima do outro.
// Só arrasta os cards pelo cabeçalho (como você faria à mão). Não cria, apaga nem religa nada. Cole no console do fluxo.
//
// MODO = 'camadas' → colunas da esquerda para a direita (início → fim). Compacto; o melhor para fluxos de atendimento.
// MODO = 'teia'    → o início no centro e os próximos passos em anéis ao redor, como uma teia de aranha.
(async () => {
  const MODO = 'camadas';          // 'camadas' ou 'teia'
  const SO_MOSTRAR_PLANO = false;  // true = não move nada, só lê o fluxo e imprime o plano
  const QUANTIDADE = 0;            // 0 = todos; N = move só os N primeiros (teste)
  const ESPACO_X = 160;            // espaço horizontal entre colunas (camadas)
  const ESPACO_Y = 40;             // espaço vertical entre cards
  const ESPACO_FLUXOS = 240;       // espaço entre fluxos desconectados
  const ESPACO_ANEL = 140;         // espaço mínimo entre anéis (teia)
  const LIMITE_LEQUE = 6;          // saída com tantos "fins de linha" (cards sem saída) vira um bloco em grade
  const COLUNAS_BLOCO = 5;         // cards lado a lado dentro de um bloco / na área dos cards soltos

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const nodesEl = () => [...document.querySelectorAll('.task-flow-node')];
  const card = id => document.querySelector(`.task-flow-node[data-node-id="${id}"]`);
  const pos = n => ({ x: parseFloat(n.style.left) || 0, y: parseFloat(n.style.top) || 0 });
  const tam = n => ({ w: n.offsetWidth, h: n.offsetHeight });
  const rotulo = n => `${n.titulo}${n.nome ? ' · ' + n.nome : ''}`;

  // ================= 1. LER OS CARDS =================
  const els = nodesEl();
  if (!els.length) return console.error('[teia] nenhum card na tela. Abra um fluxo primeiro.');
  const esc = els[0].getBoundingClientRect().width / els[0].offsetWidth || 1; // zoom do canvas
  const N = els.map((el, i) => ({
    id: el.dataset.nodeId, i, el,
    titulo: el.querySelector('.node-title')?.textContent.trim() || '(sem título)',
    nome: el.querySelector('.node-name .text')?.textContent.trim() || '',
    ...pos(el), ...tam(el), filhos: [], pais: [],
  }));
  const porId = Object.fromEntries(N.map(n => [n.id, n]));
  const centro = r => [r.left + r.width / 2, r.top + r.height / 2];
  const dots = [];
  N.forEach(n => n.el.querySelectorAll('.connector-dot').forEach(d => { const r = d.getBoundingClientRect(); if (r.width || r.height) dots.push({ n, c: centro(r) }); }));
  const distRect = (p, r) => Math.hypot(Math.max(r.left - p[0], 0, p[0] - r.right), Math.max(r.top - p[1], 0, p[1] - r.bottom));
  // card mais próximo de um ponto. `naBorda` = a ponta da linha encosta na borda ESQUERDA do card destino (entrada)
  const maisPerto = (p, tol, excluir, naBorda) => {
    let m = null, md = Infinity;
    for (const n of N) {
      if (n === excluir) continue;
      const r = n.el.getBoundingClientRect();
      const d = naBorda ? Math.hypot(p[0] - r.left, Math.max(r.top - p[1], 0, p[1] - r.bottom)) + 0.05 * Math.abs(p[1] - (r.top + 20 * esc)) : distRect(p, r); // 2º critério: entrada perto do topo (desempata cards sobrepostos)
      if (d < md) { md = d; m = n; }
    }
    return m && md <= tol ? m : null;
  };

  // ================= 2. LER AS LIGAÇÕES (linhas do canvas) =================
  const arestas = [], naoLidas = [];
  for (const g of document.querySelectorAll('svg.canvas-connections > g')) {
    const path = g.querySelector('path.connection-line') || g.querySelector('path'); if (!path) continue;
    const m = path.getScreenCTM(); if (!m) continue;
    const proj = pt => [m.a * pt.x + m.c * pt.y + m.e, m.b * pt.x + m.d * pt.y + m.f];
    const ini = proj(path.getPointAtLength(0));
    const circ = g.querySelector('circle');
    const fim = circ ? centro(circ.getBoundingClientRect()) : proj(path.getPointAtLength(path.getTotalLength()));
    // origem = card dono da bolinha de saída mais próxima do começo da linha
    let origem = null, ord = 0, dmin = Infinity;
    for (const d of dots) { const dist = Math.hypot(d.c[0] - ini[0], d.c[1] - ini[1]); if (dist < dmin) { dmin = dist; origem = d.n; ord = d.c[1]; } }
    if (!origem || dmin > 30 * esc) { origem = maisPerto(ini, 40 * esc); ord = ini[1]; }
    const destino = origem && (maisPerto(fim, 25 * esc, origem, true) || maisPerto(fim, 40 * esc, origem));
    if (!origem || !destino) { naoLidas.push({ de: origem ? rotulo(origem) : '?', para: destino ? rotulo(destino) : '?' }); continue; }
    if (arestas.some(a => a.de === origem && a.para === destino)) continue; // duas linhas entre os mesmos cards
    arestas.push({ de: origem, para: destino, ord });
  }
  arestas.sort((a, b) => a.ord - b.ord || a.de.i - b.de.i);
  for (const a of arestas) { a.de.filhos.push(a.para); a.para.pais.push(a.de); }

  // ================= 3. FLUXOS (componentes), RAÍZES, CICLOS, CAMADAS =================
  const comp = new Map();
  const visitaComp = (n, c) => { if (comp.has(n)) return; comp.set(n, c); [...n.filhos, ...n.pais].forEach(x => visitaComp(x, c)); };
  N.forEach((n, i) => visitaComp(n, i));
  const grupos = new Map(); N.forEach(n => { const c = comp.get(n); if (!grupos.has(c)) grupos.set(c, []); grupos.get(c).push(n); });
  const fluxos = [...grupos.values()].filter(g => g.length > 1);
  const soltos = [...grupos.values()].filter(g => g.length === 1).map(g => g[0]);
  const ehInicio = n => /in[ií]cio|start|gatilho|trigger|entrada|webhook/i.test(n.titulo);

  const cicloRem = new Set(); // arestas "de volta" ignoradas para dar camadas (o desenho continua mostrando a linha)
  const prepara = membros => {
    const raizes = membros.filter(n => !n.pais.length).sort((a, b) => ehInicio(b) - ehInicio(a) || a.x - b.x || a.y - b.y);
    const ordemDfs = new Map(), pilha = new Set();
    const dfs = n => {
      ordemDfs.set(n, ordemDfs.size); pilha.add(n);
      for (const f of n.filhos) {
        if (pilha.has(f)) cicloRem.add(n.id + '>' + f.id);
        else if (!ordemDfs.has(f)) dfs(f);
      }
      pilha.delete(n);
    };
    raizes.forEach(r => { if (!ordemDfs.has(r)) dfs(r); });
    membros.filter(n => !ordemDfs.has(n)).sort((a, b) => a.x - b.x || a.y - b.y).forEach(n => { if (!ordemDfs.has(n)) { raizes.push(n); dfs(n); } });
    // camada = caminho mais longo a partir da raiz, ignorando as arestas de volta
    const dagPais = n => n.pais.filter(p => !cicloRem.has(p.id + '>' + n.id));
    const camada = new Map();
    const calc = n => {
      if (camada.has(n)) return camada.get(n);
      camada.set(n, 0);
      const c = Math.max(-1, ...dagPais(n).map(calc)) + 1;
      camada.set(n, c); return c;
    };
    membros.forEach(calc);
    return { raizes, ordemDfs, camada, dagPais };
  };

  // ================= 4. LAYOUT =================
  const medias = (v, fallback) => v.length ? v.reduce((s, x) => s + x, 0) / v.length : fallback;

  // 4a. camadas ---------------------------------------------------------
  const layoutCamadas = (membros, info) => {
    const { camada, ordemDfs, dagPais } = info;
    // leques: saídas com muitos cards "fim de linha" viram um bloco em grade
    const unidadeDe = new Map(), unidades = [];
    const novaUnidade = (itens, bloco) => {
      const u = { itens, bloco, camada: camada.get(itens[0]), dfs: Math.min(...itens.map(i => ordemDfs.get(i))) };
      if (bloco) {
        const cols = Math.min(COLUNAS_BLOCO, itens.length), cw = Math.max(...itens.map(i => i.w));
        const linhas = []; for (let k = 0; k < itens.length; k += cols) linhas.push(itens.slice(k, k + cols));
        let yy = 0; u.rel = new Map();
        linhas.forEach(l => { const alt = Math.max(...l.map(i => i.h)); l.forEach((i, c) => u.rel.set(i, { x: c * (cw + 40), y: yy })); yy += alt + ESPACO_Y; });
        u.w = cols * (cw + 40) - 40; u.h = yy - ESPACO_Y;
      } else { u.w = itens[0].w; u.h = itens[0].h; u.rel = new Map([[itens[0], { x: 0, y: 0 }]]); }
      itens.forEach(i => unidadeDe.set(i, u)); unidades.push(u); return u;
    };
    const emBloco = new Set();
    for (const p of [...membros].sort((a, b) => ordemDfs.get(a) - ordemDfs.get(b))) {
      const fins = p.filhos.filter(f => f.pais.length === 1 && !f.filhos.length && !emBloco.has(f));
      if (fins.length >= LIMITE_LEQUE) { fins.forEach(f => emBloco.add(f)); novaUnidade(fins, true); }
    }
    membros.filter(n => !emBloco.has(n)).forEach(n => novaUnidade([n], false));
    const paisU = u => [...new Set(u.itens.flatMap(i => dagPais(i)).map(p => unidadeDe.get(p)).filter(x => x !== u))];
    const filhosU = new Map(unidades.map(u => [u, []]));
    unidades.forEach(u => paisU(u).forEach(p => filhosU.get(p).push(u)));

    const nCam = Math.max(...unidades.map(u => u.camada)) + 1;
    const cols = Array.from({ length: nCam }, () => []);
    unidades.sort((a, b) => a.dfs - b.dfs).forEach(u => cols[u.camada].push(u));
    const idx = u => cols[u.camada].indexOf(u);
    // reduz cruzamentos: média da posição dos vizinhos (varre para a frente e para trás)
    for (let it = 0; it < 6; it++) {
      const ordem = it % 2 === 0 ? [...cols.keys()].slice(1) : [...cols.keys()].slice(0, -1).reverse();
      for (const k of ordem) {
        const viz = u => (it % 2 === 0 ? paisU(u) : filhosU.get(u)).map(idx);
        const chave = new Map(cols[k].map((u, p) => [u, medias(viz(u), p)]));
        cols[k] = cols[k].map((u, p) => ({ u, p })).sort((a, b) => chave.get(a.u) - chave.get(b.u) || a.p - b.p).map(x => x.u);
      }
    }
    // alturas: empilha cada coluna e aproxima cada card da média dos vizinhos
    const colar = (k, desejo) => {
      const lista = cols[k]; let ant = -Infinity;
      const topo = lista.map(u => (desejo.has(u) ? desejo.get(u) : u.cy) - u.h / 2);
      lista.forEach((u, p) => { if (topo[p] < ant) topo[p] = ant; ant = topo[p] + u.h + ESPACO_Y; });
      const desvio = medias(lista.map((u, p) => (desejo.has(u) ? desejo.get(u) : u.cy) - u.h / 2 - topo[p]), 0);
      lista.forEach((u, p) => { u.cy = topo[p] + desvio + u.h / 2; });
    };
    cols.forEach(l => { let yy = 0; l.forEach(u => { u.cy = yy + u.h / 2; yy += u.h + ESPACO_Y; }); });
    for (let it = 0; it < 8; it++) {
      for (let k = 1; k < nCam; k++) colar(k, new Map(cols[k].map(u => [u, medias(paisU(u).map(p => p.cy), u.cy)])));
      for (let k = nCam - 2; k >= 0; k--) colar(k, new Map(cols[k].map(u => [u, medias(filhosU.get(u).map(c => c.cy), u.cy)])));
    }
    for (let k = 1; k < nCam; k++) colar(k, new Map(cols[k].map(u => [u, medias(paisU(u).map(p => p.cy), u.cy)])));
    const larg = cols.map(l => Math.max(0, ...l.map(u => u.w)));
    const xs = []; larg.reduce((x, w, k) => (xs[k] = x, x + w + ESPACO_X), 0);
    const res = new Map();
    for (const u of unidades) for (const [i, r] of u.rel) res.set(i, { x: xs[u.camada] + r.x, y: u.cy - u.h / 2 + r.y });
    return res;
  };

  // 4b. teia (anéis) ----------------------------------------------------
  const layoutTeia = (membros, info) => {
    const { raizes, camada, dagPais } = info;
    const centroRaiz = raizes.length === 1 ? raizes[0] : { virtual: true, w: 0, h: 0, filhos: raizes, id: 'virtual' };
    const prof = new Map([[centroRaiz, 0]]), pai = new Map(), fila = [centroRaiz];
    while (fila.length) {
      const n = fila.shift();
      for (const f of n.filhos) {
        if (n !== centroRaiz && cicloRem.has(n.id + '>' + f.id)) continue;
        if (!prof.has(f)) { prof.set(f, prof.get(n) + 1); pai.set(f, n); fila.push(f); }
      }
    }
    membros.filter(n => !prof.has(n)).forEach(n => { prof.set(n, 1 + (camada.get(n) || 0)); pai.set(n, centroRaiz); });
    const kids = new Map([[centroRaiz, []]]); membros.forEach(n => kids.set(n, []));
    membros.forEach(n => { if (pai.has(n)) kids.get(pai.get(n)).push(n); });
    const peso = new Map(), pesa = n => { const k = kids.get(n); const w = k.length ? k.reduce((s, c) => s + pesa(c), 0) : 1; peso.set(n, w); return w; };
    pesa(centroRaiz);
    const varre = peso.get(centroRaiz) >= 8 ? 2 * Math.PI : Math.PI;
    const ang = new Map(), larg = new Map();
    const distribui = (n, a0, a1) => {
      let a = a0; const tot = kids.get(n).reduce((s, c) => s + peso.get(c), 0);
      for (const c of kids.get(n)) { const f = (a1 - a0) * peso.get(c) / tot; ang.set(c, a + f / 2); larg.set(c, f); distribui(c, a, a + f); a += f; }
    };
    distribui(centroRaiz, -varre / 2, varre / 2);
    const diag = n => Math.hypot(n.w, n.h);
    const maxProf = Math.max(...[...prof.values()]);
    const R = [0];
    for (let d = 1; d <= maxProf; d++) {
      const dd = membros.filter(n => prof.get(n) === d);
      const ant = Math.max(0, ...membros.filter(n => prof.get(n) === d - 1).map(diag)) / 2;
      let r = R[d - 1] + ESPACO_ANEL + ant + Math.max(0, ...dd.map(diag)) / 2;
      for (const n of dd) r = Math.max(r, (diag(n) + ESPACO_Y) / Math.max(larg.get(n), 0.01));
      R.push(r);
    }
    const res = new Map();
    for (const n of membros) { const a = ang.get(n) ?? 0, r = R[prof.get(n)]; res.set(n, { x: r * Math.cos(a) - n.w / 2, y: r * Math.sin(a) - n.h / 2 }); }
    return res;
  };

  // ================= 5. MONTA O PLANO (todos os fluxos, um embaixo do outro) =================
  const caixa = (mapa) => { const v = [...mapa.entries()]; return { x0: Math.min(...v.map(([n, p]) => p.x)), y0: Math.min(...v.map(([n, p]) => p.y)), x1: Math.max(...v.map(([n, p]) => p.x + n.w)), y1: Math.max(...v.map(([n, p]) => p.y + n.h)) }; };
  const ancX = Math.max(40, Math.min(...N.map(n => n.x))), ancY = Math.max(40, Math.min(...N.map(n => n.y)));
  const plano = new Map(); let yAtual = ancY;
  fluxos.sort((a, b) => Math.min(...a.map(n => n.y)) - Math.min(...b.map(n => n.y)));
  const resumo = [];
  for (const membros of fluxos) {
    const info = prepara(membros);
    const mapa = MODO === 'teia' ? layoutTeia(membros, info) : layoutCamadas(membros, info);
    const b = caixa(mapa);
    for (const [n, p] of mapa) plano.set(n, { x: Math.round(ancX + p.x - b.x0), y: Math.round(yAtual + p.y - b.y0) });
    resumo.push({ cards: membros.length, inicio: info.raizes.map(rotulo).join(' | '), camadas: Math.max(...membros.map(n => info.camada.get(n))) + 1, largura: Math.round(b.x1 - b.x0), altura: Math.round(b.y1 - b.y0) });
    yAtual += b.y1 - b.y0 + ESPACO_FLUXOS;
  }
  if (soltos.length) { // cards sem nenhuma ligação: grade embaixo de tudo
    const cw = Math.max(...soltos.map(n => n.w)); let yy = yAtual, c = 0, altLinha = 0;
    for (const n of soltos.sort((a, b) => a.y - b.y || a.x - b.x)) {
      plano.set(n, { x: ancX + c * (cw + 40), y: yy }); altLinha = Math.max(altLinha, n.h);
      if (++c === COLUNAS_BLOCO) { c = 0; yy += altLinha + ESPACO_Y; altLinha = 0; }
    }
    resumo.push({ cards: soltos.length, inicio: '(cards sem ligação)', camadas: 1, largura: '', altura: '' });
  }

  console.log(`[teia] modo "${MODO}": ${N.length} card(s), ${arestas.length} ligação(ões), ${fluxos.length} fluxo(s) conectado(s), ${soltos.length} card(s) solto(s), ${cicloRem.size} ligação(ões) de volta (ciclo).`);
  console.table(resumo);
  if (naoLidas.length) { console.warn(`[teia] ${naoLidas.length} linha(s) do canvas não identificadas (os cards delas serão tratados como soltos):`); console.table(naoLidas); }
  const porTitulo = {}; N.forEach(n => porTitulo[n.titulo] = (porTitulo[n.titulo] || 0) + 1);
  console.log('[teia] tipos de card:', Object.entries(porTitulo).map(([t, q]) => `${t} ×${q}`).join(', '));
  window.__teia = { nos: N.map(n => ({ id: n.id, titulo: n.titulo, nome: n.nome, x: n.x, y: n.y })), ligacoes: arestas.map(a => [a.de.id, a.para.id]), plano: [...plano].map(([n, p]) => ({ id: n.id, ...p })) };
  if (SO_MOSTRAR_PLANO) return console.log('[teia] SO_MOSTRAR_PLANO: nada foi movido. Plano em window.__teia.plano.');

  // ================= 6. ARRASTAR PELO CABEÇALHO =================
  const evento = (alvo, tipo, x, y, Ctor) => alvo.dispatchEvent(new Ctor(tipo, {
    bubbles: true, cancelable: true, composed: true, view: window, clientX: x, clientY: y, button: 0,
    buttons: tipo.endsWith('up') ? 0 : 1, pointerId: 1, pointerType: 'mouse', isPrimary: true,
  }));
  const arrastar = async (el, dx, dy, via) => {
    const t = el.querySelector('.node-title') || el.querySelector('.node-header') || el;
    const r = t.getBoundingClientRect();
    const x = r.left + Math.min(20 * esc, r.width / 2), yy = r.top + r.height / 2;
    const moves = via === 'document' ? document : t;
    evento(t, 'pointerdown', x, yy, PointerEvent); evento(t, 'mousedown', x, yy, MouseEvent);
    for (let i = 1; i <= 12; i++) {
      const px = x + dx * esc * i / 12, py = yy + dy * esc * i / 12;
      evento(moves, 'pointermove', px, py, PointerEvent); evento(moves, 'mousemove', px, py, MouseEvent);
      await sleep(8);
    }
    const fx = x + dx * esc, fy = yy + dy * esc;
    evento(moves, 'pointerup', fx, fy, PointerEvent); evento(moves, 'mouseup', fx, fy, MouseEvent);
    await sleep(120);
  };
  const mover = async (id, alvo) => {
    const el = card(id), antes = pos(el);
    if (Math.hypot(alvo.x - antes.x, alvo.y - antes.y) <= 3) return 'ok';
    for (const via of ['card', 'document']) {
      await arrastar(el, alvo.x - antes.x, alvo.y - antes.y, via);
      let p = pos(card(id));
      if (Math.hypot(p.x - antes.x, p.y - antes.y) < 1) continue; // não saiu do lugar: tenta o outro jeito
      if (Math.hypot(p.x - alvo.x, p.y - alvo.y) > 3) { await arrastar(card(id), alvo.x - p.x, alvo.y - p.y, via); p = pos(card(id)); }
      return Math.hypot(p.x - alvo.x, p.y - alvo.y) <= 12 ? 'ok' : `ficou em (${Math.round(p.x)}, ${Math.round(p.y)}), esperado (${alvo.x}, ${alvo.y})`;
    }
    return 'o card não se mexeu';
  };

  const original = N.map(n => ({ id: n.id, x: n.x, y: n.y }));
  window.__desfazerTeia = async () => { for (const o of original) await mover(o.id, o); console.log('[teia] posições originais restauradas (confira antes de salvar).'); };

  const fila = [...plano].sort((a, b) => a[1].x - b[1].x || a[1].y - b[1].y);
  let feitos = 0;
  for (const [n, p] of fila) {
    if (QUANTIDADE && feitos >= QUANTIDADE) break;
    if (!card(n.id)) { console.error(`[teia] o card "${rotulo(n)}" sumiu da tela. Parei.`); break; }
    const r = await mover(n.id, p);
    if (r !== 'ok') { console.error(`[teia] "${rotulo(n)}": ${r}. Parei.`); break; }
    feitos++;
    if (feitos % 10 === 0 || feitos === fila.length) console.log(`[teia] ${feitos}/${QUANTIDADE || fila.length} movidos…`);
  }

  // ================= 7. CONFERE =================
  if (feitos === fila.length) {
    await sleep(300);
    const rs = N.map(n => ({ n, ...pos(n.el), ...tam(n.el) }));
    const batidas = [];
    for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++) {
      const a = rs[i], b = rs[j];
      if (a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h) batidas.push(`${rotulo(a.n)} × ${rotulo(b.n)}`);
    }
    if (batidas.length) console.warn(`[teia] ATENÇÃO: ${batidas.length} par(es) de cards sobrepostos:`, batidas.join(' ; '));
    else console.log('[teia] nenhum card sobreposto ✔');
    const linhasDepois = document.querySelectorAll('svg.canvas-connections > g').length;
    console.log(`[teia] ligações no canvas: ${linhasDepois} (antes: ${arestas.length + naoLidas.length}).`);
  }
  console.log(`[teia] ${feitos} card(s) movido(s). Gostou? Clique em Salvar. Não gostou? Rode window.__desfazerTeia() ou recarregue a página sem salvar. Para outro desenho, troque MODO.`);
})();
