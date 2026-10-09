// SOMENTE LEITURA. Mostra qual card "Template WhatsApp" está ligado a qual saída do "Executar JavaScript".
// Cole no console do fluxo. Resultado em console.table e em window.__mapa.
(() => {
  const TITULO_ORIGEM = 'Executar JavaScript';
  const TITULO_DESTINO = 'Template WhatsApp';
  const NODE_ID = null; // opcional: data-node-id do card de origem

  const nodes = [...document.querySelectorAll('.task-flow-node')];
  const titulo = n => n.querySelector('.node-title')?.textContent.trim();
  const ligadas = n => n.querySelectorAll('.branch-item.connected').length;
  const origem = NODE_ID
    ? document.querySelector(`.task-flow-node[data-node-id="${NODE_ID}"]`)
    : nodes.filter(n => titulo(n) === TITULO_ORIGEM).sort((a, b) => ligadas(b) - ligadas(a))[0];
  if (!origem) return console.error('[mapa] card de origem não encontrado');

  const esc = origem.getBoundingClientRect().width / origem.offsetWidth || 1;
  const centro = r => [r.left + r.width / 2, r.top + r.height / 2];
  const dots = [...origem.querySelectorAll('.branch-item:not(.branch-item--exception) .connector-dot')]
    .map(d => ({ chave: d.dataset.branchKey, c: centro(d.getBoundingClientRect()) }));

  const mapa = [], ignoradas = [];
  for (const g of document.querySelectorAll('svg.canvas-connections > g')) {
    const path = g.querySelector('path.connection-line'), fim = g.querySelector('circle');
    if (!path || !fim) continue;
    const p0 = path.getPointAtLength(0), m = path.getScreenCTM();
    const ini = [m.a * p0.x + m.c * p0.y + m.e, m.b * p0.x + m.d * p0.y + m.f];
    const perto = dots.map(d => ({ d, dist: Math.hypot(d.c[0] - ini[0], d.c[1] - ini[1]) })).sort((a, b) => a.dist - b.dist)[0];
    if (!perto || perto.dist > 30 * esc) continue; // linha de outro card
    const [ex, ey] = centro(fim.getBoundingClientRect());
    const alvo = nodes.find(n => {
      const r = n.getBoundingClientRect();
      return Math.abs(ex - r.left) <= 20 * esc && ey >= r.top && ey <= r.bottom;
    });
    if (!alvo) { ignoradas.push({ saida: perto.d.chave, motivo: 'destino não identificado' }); continue; }
    if (titulo(alvo) !== TITULO_DESTINO) { ignoradas.push({ saida: perto.d.chave, motivo: 'vai para "' + titulo(alvo) + '"' }); continue; }
    mapa.push({ saida: perto.d.chave, cardId: alvo.dataset.nodeId, nomeAtual: alvo.querySelector('.node-name .text')?.textContent.trim() || '(sem nome)' });
  }
  window.__mapa = mapa;
  console.log(`[mapa] ${mapa.length} saída(s) ligada(s) a "${TITULO_DESTINO}":`); console.table(mapa);
  if (ignoradas.length) { console.log('[mapa] ignoradas (não vão para ' + TITULO_DESTINO + '):'); console.table(ignoradas); }
  const dup = mapa.filter((x, i) => mapa.findIndex(y => y.cardId === x.cardId) !== i);
  if (dup.length) console.warn('[mapa] ATENÇÃO: card ligado a mais de uma saída:', dup);
})();
