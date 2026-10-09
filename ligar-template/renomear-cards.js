// Renomeia cada card "Template WhatsApp" com o nome da saída do "Executar JavaScript" de onde ele sai.
// Faz o mesmo que você faz à mão: clica no card, preenche "Descrição" no painel Propriedades e fecha o painel.
// Cole no console do fluxo. A primeira execução renomeia só 1 card (QUANTIDADE = 1).
(async () => {
  const QUANTIDADE = 1;          // 1 = teste com um card; 0 = todos
  const SOBRESCREVER = false;    // true = troca também nomes que já existem
  const TITULO_ORIGEM = 'Executar JavaScript';
  const TITULO_DESTINO = 'Template WhatsApp';
  const NODE_ID = null;          // opcional: data-node-id do card de origem
  const PAUSA = 250;             // ms entre ações (aumente se o app estiver lento)

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const nodes = () => [...document.querySelectorAll('.task-flow-node')];
  const titulo = n => n.querySelector('.node-title')?.textContent.trim();
  const nomeDe = n => n.querySelector('.node-name .text')?.textContent.trim() || '';
  const ligadas = n => n.querySelectorAll('.branch-item.connected').length;
  const card = id => document.querySelector(`.task-flow-node[data-node-id="${id}"]`);

  // ---------- 1. descobre qual card sai de qual saída (igual ao mapear-ligacoes.js) ----------
  const origem = NODE_ID
    ? document.querySelector(`.task-flow-node[data-node-id="${NODE_ID}"]`)
    : nodes().filter(n => titulo(n) === TITULO_ORIGEM).sort((a, b) => ligadas(b) - ligadas(a))[0];
  if (!origem) return console.error('[renomear] card de origem não encontrado');

  const esc = origem.getBoundingClientRect().width / origem.offsetWidth || 1;
  const centro = r => [r.left + r.width / 2, r.top + r.height / 2];
  const dots = [...origem.querySelectorAll('.branch-item:not(.branch-item--exception) .connector-dot')]
    .map(d => ({ chave: d.dataset.branchKey, c: centro(d.getBoundingClientRect()) }));

  const mapa = [];
  for (const g of document.querySelectorAll('svg.canvas-connections > g')) {
    const path = g.querySelector('path.connection-line'), fim = g.querySelector('circle');
    if (!path || !fim) continue;
    const p0 = path.getPointAtLength(0), m = path.getScreenCTM();
    const ini = [m.a * p0.x + m.c * p0.y + m.e, m.b * p0.x + m.d * p0.y + m.f];
    const perto = dots.map(d => ({ d, dist: Math.hypot(d.c[0] - ini[0], d.c[1] - ini[1]) })).sort((a, b) => a.dist - b.dist)[0];
    if (!perto || perto.dist > 30 * esc) continue;
    const [ex, ey] = centro(fim.getBoundingClientRect());
    const alvo = nodes().find(n => {
      const r = n.getBoundingClientRect();
      return Math.abs(ex - r.left) <= 20 * esc && ey >= r.top && ey <= r.bottom;
    });
    if (alvo && titulo(alvo) === TITULO_DESTINO) mapa.push({ saida: perto.d.chave, cardId: alvo.dataset.nodeId });
  }
  const porCard = {};
  for (const x of mapa) (porCard[x.cardId] ||= []).push(x.saida);
  const ambiguos = Object.entries(porCard).filter(([, s]) => s.length > 1);
  const fila = mapa.filter(x => porCard[x.cardId].length === 1);
  if (ambiguos.length) console.warn('[renomear] PULADOS (card ligado a mais de uma saída, confira à mão):', Object.fromEntries(ambiguos));
  console.log(`[renomear] ${fila.length} card(s) com origem única.`);

  // ---------- 2. gestos na tela ----------
  const evento = (el, tipo, x, y, Ctor) => el.dispatchEvent(new Ctor(tipo, {
    bubbles: true, cancelable: true, composed: true, view: window, clientX: x, clientY: y, button: 0, buttons: tipo.endsWith('down') ? 1 : 0,
    pointerId: 1, pointerType: 'mouse', isPrimary: true,
  }));
  const clicar = el => {
    const [x, y] = centro(el.getBoundingClientRect());
    for (const [t, C] of [['pointerdown', PointerEvent], ['mousedown', MouseEvent], ['pointerup', PointerEvent], ['mouseup', MouseEvent], ['click', MouseEvent]]) evento(el, t, x, y, C);
  };
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  const escrever = (el, v) => {
    el.focus();
    setter.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
  };
  const campoDescricao = () => {
    const rotulo = [...document.querySelectorAll('.tfp-body *')].find(e => e.children.length === 0 && e.textContent.trim() === 'Descrição');
    return rotulo?.closest('.parameter-item')?.querySelector('input') || null;
  };
  const esperar = async (fn, ms = 2500) => {
    for (let t = 0; t < ms; t += 50) { const r = fn(); if (r) return r; await sleep(50); }
    return null;
  };
  const fechar = async () => {
    const cab = [...document.querySelectorAll("*")].find(e => e.children.length === 0 && e.textContent.trim() === 'Propriedades');
    let el = cab;
    for (let i = 0; el && i < 4; i++, el = el.parentElement) {
      const b = el.querySelector('button, [role="button"]');
      if (b) { clicar(b); break; }
    }
    if (campoDescricao() && !(await esperar(() => !campoDescricao(), 1000))) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await sleep(PAUSA);
    }
  };

  // ---------- 3. renomeia ----------
  if (campoDescricao()) await fechar(); // garante que o painel aberto não é de outro card
  let feitos = 0, pulados = 0;
  for (const { saida, cardId } of fila) {
    if (QUANTIDADE && feitos >= QUANTIDADE) break;
    const el = card(cardId);
    if (!el) { console.error(`[renomear] card ${cardId} (${saida}) sumiu da tela. Parei.`); break; }
    const atual = nomeDe(el);
    if (atual === saida) { pulados++; continue; }
    if (atual && !SOBRESCREVER) { console.warn(`[renomear] ${saida}: card já se chama "${atual}", pulei (SOBRESCREVER = false).`); pulados++; continue; }

    const antes = new Map(nodes().map(n => [n, nomeDe(n)]));
    clicar(el.querySelector('.node-title') || el);
    let campo = await esperar(campoDescricao);
    if (!campo) { // alguns apps só abrem o painel com duplo clique
      const t = el.querySelector('.node-title') || el;
      const [x, y] = centro(t.getBoundingClientRect());
      evento(t, 'dblclick', x, y, MouseEvent);
      campo = await esperar(campoDescricao);
    }
    if (!campo) { console.error(`[renomear] ${saida}: o painel Propriedades não abriu. Parei.`); break; }
    await sleep(PAUSA);

    escrever(campo, saida);
    const ok = await esperar(() => nomeDe(card(cardId)) === saida, 2000);
    const trocados = nodes().filter(n => n !== card(cardId) && antes.has(n) && nomeDe(n) !== antes.get(n));
    if (trocados.length) { console.error(`[renomear] ${saida}: outro card mudou de nome junto (${trocados.map(n => n.dataset.nodeId)}). Parei — confira.`); break; }
    if (!ok) { console.error(`[renomear] ${saida}: digitei no campo mas o card não mostrou o nome. Parei.`); break; }
    await fechar();
    await sleep(PAUSA);
    feitos++;
    console.log(`[renomear] ${feitos} ${saida} ✔`);
  }
  console.log(`[renomear] ${feitos} renomeado(s), ${pulados} já tinham nome. ${QUANTIDADE ? 'Teste ok? Troque QUANTIDADE por 0 e rode de novo. ' : ''}Depois clique em Salvar.`);
})();
