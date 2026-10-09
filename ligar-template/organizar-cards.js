// Organiza os cards "Template WhatsApp" em blocos pela NOMENCLATURA BASE OFICIAL da planilha,
// na mesma ordem das saídas do "Executar JavaScript". Arrasta cada card pelo cabeçalho, como você faria à mão.
// Cole no console do fluxo. Identifica cada card pelo NOME (rode antes o renomear-cards.js) e usa a altura real de cada card (rode depois do configurar-templates.js).
(async () => {
  const QUANTIDADE = 0;            // 0 = todos; 1 = teste com um card
  const SO_MOSTRAR_PLANO = false;  // true = não move nada, só imprime a tabela do plano
  const COLUNAS_POR_GRUPO = 5;     // cards lado a lado em cada bloco
  const ESPACO_X = 40;             // espaço horizontal entre cards (px do canvas)
  const ESPACO_Y = 40;             // espaço vertical entre cards
  const ESPACO_GRUPO = 200;        // espaço vertical entre blocos de grupos
  const MARGEM_ESQUERDA = 300;     // distância entre o card JavaScript e o primeiro bloco
  const TITULO_ORIGEM = 'Executar JavaScript';
  const TITULO_DESTINO = 'Template WhatsApp';
  const NODE_ID = null;            // opcional: data-node-id do card de origem

  // Base oficial de cada saída, copiada da planilha Templates_BV_ADM.xlsx (coluna NOMENCLATURA BASE OFICIAL).
  const BASE_OFICIAL = {
    'adm_atualizacaout1': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'adm_atualizacaout2': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'adm_atualizacaout3': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'adm_atualizacaout4': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'adm_atualizacaout5': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'adm_atualizacaout6': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'adm_atualizacaout7': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'adm_atualizacaout8': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'adm_atualizacaout9': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'adm_atualizacaout10': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'adm_expirandout1': 'TRAD EXPIRANDO LOC / TRAD EXPIRANDO DESLOC',
    'adm_expirandout2': 'TRAD EXPIRANDO LOC / TRAD EXPIRANDO DESLOC',
    'adm_expirandout3': 'TRAD EXPIRANDO LOC / TRAD EXPIRANDO DESLOC',
    'adm_expirandout4': 'TRAD EXPIRANDO LOC / TRAD EXPIRANDO DESLOC',
    'adm_expirandout5': 'TRAD EXPIRANDO LOC / TRAD EXPIRANDO DESLOC',
    'adm_expirandout6': 'TRAD EXPIRANDO LOC / TRAD EXPIRANDO DESLOC',
    'adm_expirandout7': 'TRAD EXPIRANDO LOC / TRAD EXPIRANDO DESLOC',
    'adm_expirandout8': 'TRAD EXPIRANDO LOC / TRAD EXPIRANDO DESLOC',
    'adm_expirandout9': 'TRAD EXPIRANDO LOC / TRAD EXPIRANDO DESLOC',
    'adm_expirandout10': 'TRAD EXPIRANDO LOC / TRAD EXPIRANDO DESLOC',
    'adm_fluxout1': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC',
    'adm_fluxout2': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC',
    'adm_fluxout3': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC',
    'adm_fluxout4': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC',
    'adm_fluxout5': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC',
    'adm_fluxout6': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC',
    'adm_fluxout7': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC',
    'adm_fluxout8': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC',
    'adm_fluxout9': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC',
    'adm_fluxout10': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC',
    'adm_isencaomk1': 'TRAD ISENCAO LOC / TRAD ISENCAO DESLOC',
    'adm_isencaomk2': 'TRAD ISENCAO LOC / TRAD ISENCAO DESLOC',
    'adm_isencaomk3': 'TRAD ISENCAO LOC / TRAD ISENCAO DESLOC',
    'adm_isencaomk4': 'TRAD ISENCAO LOC / TRAD ISENCAO DESLOC',
    'adm_isencaomk5': 'TRAD ISENCAO LOC / TRAD ISENCAO DESLOC',
    'bvadmatualizacao_21': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'bvadmatualizacao_22': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'bvadmatualizacao_23': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'bvadmatualizacao_24': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'bvadmatualizacao_25': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'bvadmatualizacao_26': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'bvadmatualizacao_27': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'bvadmatualizacao_28': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'bvadmatualizacao_29': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'bvadmatualizacao_30': 'TRAD FLUXO LOC / TRAD FLUXO DESLOC / TRAD LOC / TRAD DESLOC',
    'bvadmparcial_1': 'TRAD PARCIAL LOC / TRAD PARCIAL DESLOC',
    'bvadmparcial_2': 'TRAD PARCIAL LOC / TRAD PARCIAL DESLOC',
    'bvadmparcial_3': 'TRAD PARCIAL LOC / TRAD PARCIAL DESLOC',
    'bvadmparcial_5': 'TRAD PARCIAL LOC / TRAD PARCIAL DESLOC',
    'bvadmparcial_6': 'TRAD PARCIAL LOC / TRAD PARCIAL DESLOC',
    'bvadmparcial_7': 'TRAD PARCIAL LOC / TRAD PARCIAL DESLOC',
    'bvadmparcial_8': 'TRAD PARCIAL LOC / TRAD PARCIAL DESLOC',
    'bvadmparcial_10': 'TRAD PARCIAL LOC / TRAD PARCIAL DESLOC',
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const nodes = () => [...document.querySelectorAll('.task-flow-node')];
  const titulo = n => n.querySelector('.node-title')?.textContent.trim();
  const ligadas = n => n.querySelectorAll('.branch-item.connected').length;
  const card = id => document.querySelector(`.task-flow-node[data-node-id="${id}"]`);
  const pos = n => ({ x: parseFloat(n.style.left) || 0, y: parseFloat(n.style.top) || 0 });
  const tam = n => ({ w: n.offsetWidth, h: n.offsetHeight });

  // ---------- 1. cards pelo NOME (o nome do card é o nome da saída, ex.: adm_fluxout3) ----------
  const origem = NODE_ID
    ? document.querySelector(`.task-flow-node[data-node-id="${NODE_ID}"]`)
    : nodes().filter(n => titulo(n) === TITULO_ORIGEM).sort((a, b) => ligadas(b) - ligadas(a))[0];
  if (!origem) return console.error('[organizar] card de origem não encontrado');
  const esc = origem.getBoundingClientRect().width / origem.offsetWidth || 1; // zoom atual do canvas
  // ordem das saídas no JavaScript (define a ordem dos cards dentro de cada grupo)
  const ordemSaida = {};
  [...origem.querySelectorAll('.branch-item:not(.branch-item--exception) .connector-dot')].forEach((d, i) => { if (!(d.dataset.branchKey in ordemSaida)) ordemSaida[d.dataset.branchKey] = i; });
  const cards = nodes().filter(n => titulo(n) === TITULO_DESTINO);
  const porNome = {};
  for (const n of cards) { const nome = n.querySelector('.node-name .text')?.textContent.trim(); if (nome) (porNome[nome] ||= []).push(n); }
  const repetidos = Object.entries(porNome).filter(([, l]) => l.length > 1).map(([k]) => k);
  if (repetidos.length) console.warn('[organizar] PULADOS (mais de um card com o mesmo nome, renomeie):', repetidos.join(', '));
  const semNome = cards.filter(n => !n.querySelector('.node-name .text')?.textContent.trim());
  if (semNome.length) console.warn(`[organizar] ${semNome.length} card(s) ${TITULO_DESTINO} sem nome, ficam parados:`, semNome.map(n => n.dataset.nodeId).join(', '));
  const lista = Object.entries(porNome).filter(([, l]) => l.length === 1)
    .map(([nome, [n]]) => ({ saida: nome, cardId: n.dataset.nodeId, ordem: nome in ordemSaida ? ordemSaida[nome] : 1e6 + Object.keys(BASE_OFICIAL).indexOf(nome) }))
    .sort((a, b) => a.ordem - b.ordem);
  if (!lista.length) return console.error('[organizar] nenhum card Template WhatsApp com nome. Rode antes o renomear-cards.js.');

  // ---------- 2. grupos e plano de posições (usa a altura REAL de cada card) ----------
  const grupoDe = chave => BASE_OFICIAL[chave] || 'SEM BASE OFICIAL (não está na planilha)';
  const grupos = [];
  for (const x of lista) {
    const nome = grupoDe(x.saida);
    let g = grupos.find(y => y.nome === nome);
    if (!g) grupos.push(g = { nome, itens: [] });
    g.itens.push({ ...x, ...tam(card(x.cardId)) });
  }
  const ids = new Set(lista.map(x => x.cardId));
  const W = Math.max(...lista.map(x => tam(card(x.cardId)).w));           // todas as colunas com a mesma largura
  const colunas = g => Math.min(COLUNAS_POR_GRUPO, g.itens.length);
  const linhasDe = g => { const c = colunas(g), r = []; for (let i = 0; i < g.itens.length; i += c) r.push(g.itens.slice(i, i + c)); return r; };
  const altura = g => linhasDe(g).reduce((s, l) => s + Math.max(...l.map(i => i.h)), 0) + ESPACO_Y * (linhasDe(g).length - 1);
  const larguraBloco = Math.min(COLUNAS_POR_GRUPO, Math.max(...grupos.map(g => g.itens.length))) * (W + ESPACO_X) - ESPACO_X;
  const alturaTotal = grupos.reduce((s, g) => s + altura(g), 0) + ESPACO_GRUPO * (grupos.length - 1);

  // procura um x livre: não bate em nenhum card que continuará parado
  const o = pos(origem), to = tam(origem);
  const parados = nodes().filter(n => !ids.has(n.dataset.nodeId) && n !== origem).map(n => ({ ...pos(n), ...tam(n) }));
  let x0 = o.x + to.w + MARGEM_ESQUERDA;
  const y0 = o.y;
  for (let i = 0; i < 50; i++) {
    const bate = parados.filter(p => p.x < x0 + larguraBloco + 40 && p.x + p.w > x0 - 40 && p.y < y0 + alturaTotal + 40 && p.y + p.h > y0 - 40);
    if (!bate.length) break;
    x0 = Math.max(...bate.map(p => p.x + p.w)) + 80;
  }

  const plano = [];
  let y = y0;
  for (const g of grupos) {
    let yl = y;
    for (const linha of linhasDe(g)) {
      linha.forEach((it, i) => plano.push({ grupo: g.nome, saida: it.saida, cardId: it.cardId, x: Math.round(x0 + i * (W + ESPACO_X)), y: Math.round(yl) }));
      yl += Math.max(...linha.map(i => i.h)) + ESPACO_Y;
    }
    y += altura(g) + ESPACO_GRUPO;
  }
  console.log(`[organizar] ${plano.length} card(s) em ${grupos.length} grupo(s):`, grupos.map(g => `${g.nome} (${g.itens.length})`).join(', '));
  console.table(plano.map(p => ({ grupo: p.grupo, saida: p.saida, x: p.x, y: p.y })));
  window.__plano = plano;
  if (SO_MOSTRAR_PLANO) return;

  // ---------- 3. arrastar pelo cabeçalho ----------
  const evento = (alvo, tipo, x, y, Ctor) => alvo.dispatchEvent(new Ctor(tipo, {
    bubbles: true, cancelable: true, composed: true, view: window, clientX: x, clientY: y, button: 0,
    buttons: tipo.endsWith('up') ? 0 : 1, pointerId: 1, pointerType: 'mouse', isPrimary: true,
  }));
  const arrastar = async (el, dx, dy, alvoMoves) => {
    const t = el.querySelector('.node-title') || el.querySelector('.node-header') || el;
    const r = t.getBoundingClientRect();
    const x = r.left + Math.min(20 * esc, r.width / 2), yy = r.top + r.height / 2;
    const moves = alvoMoves === 'document' ? document : t;
    evento(t, 'pointerdown', x, yy, PointerEvent); evento(t, 'mousedown', x, yy, MouseEvent);
    const passos = 12;
    for (let i = 1; i <= passos; i++) {
      const px = x + dx * esc * i / passos, py = yy + dy * esc * i / passos;
      evento(moves, 'pointermove', px, py, PointerEvent); evento(moves, 'mousemove', px, py, MouseEvent);
      await sleep(8);
    }
    const fx = x + dx * esc, fy = yy + dy * esc;
    evento(moves, 'pointerup', fx, fy, PointerEvent); evento(moves, 'mouseup', fx, fy, MouseEvent);
    await sleep(120);
  };
  const mover = async (id, alvo) => {
    const el = card(id), antes = pos(el);
    for (const via of ['card', 'document']) {
      await arrastar(el, alvo.x - antes.x, alvo.y - antes.y, via);
      let p = pos(card(id));
      if (Math.hypot(p.x - antes.x, p.y - antes.y) < 1 && Math.hypot(alvo.x - antes.x, alvo.y - antes.y) > 1) continue; // não saiu do lugar
      if (Math.hypot(p.x - alvo.x, p.y - alvo.y) > 3) { // 2ª passada corrige a diferença
        await arrastar(card(id), alvo.x - p.x, alvo.y - p.y, via);
        p = pos(card(id));
      }
      return Math.hypot(p.x - alvo.x, p.y - alvo.y) <= 12 ? 'ok' : `ficou em (${Math.round(p.x)}, ${Math.round(p.y)}), esperado (${alvo.x}, ${alvo.y})`;
    }
    return 'o card não se mexeu';
  };

  let feitos = 0;
  for (const p of plano) {
    if (QUANTIDADE && feitos >= QUANTIDADE) break;
    if (!card(p.cardId)) { console.error(`[organizar] card de ${p.saida} sumiu da tela. Parei.`); break; }
    const r = await mover(p.cardId, p);
    if (r !== 'ok') { console.error(`[organizar] ${p.saida}: ${r}. Parei.`); break; }
    feitos++;
    console.log(`[organizar] ${feitos}/${QUANTIDADE || plano.length} ${p.saida} → ${p.grupo} ✔`);
  }
  // ---------- 4. confere se algum card ficou em cima de outro ----------
  if (feitos === plano.length) {
    await sleep(300);
    const rs = plano.map(p => { const e = card(p.cardId); return { saida: p.saida, ...pos(e), ...tam(e) }; });
    const batidas = [];
    for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++) {
      const a = rs[i], b = rs[j];
      if (a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h) batidas.push(`${a.saida} × ${b.saida}`);
    }
    if (batidas.length) console.warn(`[organizar] ATENÇÃO: ${batidas.length} par(es) de cards ainda sobrepostos:`, batidas.join(', '));
    else console.log('[organizar] nenhum card sobreposto ✔');
  }
  console.log(`[organizar] ${feitos} card(s) movido(s). ${QUANTIDADE ? 'Conferiu? Troque QUANTIDADE por 0 e rode de novo. ' : ''}Depois clique em Salvar.`);
})();
