// Liga cada saída livre do card "Executar JavaScript" a um novo card "Template WhatsApp".
// Cole no console da página do fluxo (F12 -> Console). Por padrão faz só 1 saída, como teste.
(async () => {
  // ===== CONFIGURAÇÃO =====
  const TITULO_CARD = 'Executar JavaScript'; // título do card de origem
  const NODE_ID = null;                      // opcional: data-node-id do card, se houver mais de um JS grande
  const ALVO = 'Template WhatsApp';          // card a criar
  const QUANTIDADE = 1;                      // 1 = teste. Troque por 0 para fazer TODAS as saídas livres
  const ESPACO_Y = 150;                      // distância vertical (px do canvas) entre os cards criados
  const AFASTAMENTO_X = 120;                 // distância à direita do card mais à direita do fluxo
  // ========================

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const esperar = async (fn, ms = 3000) => {
    const t = Date.now();
    while (Date.now() - t < ms) { const v = fn(); if (v) return v; await sleep(50); }
    return null;
  };
  const nodes = () => [...document.querySelectorAll('.task-flow-node')];
  const titulo = n => n.querySelector('.node-title')?.textContent.trim();
  const livres = n => [...n.querySelectorAll('.branch-item')]
    .filter(b => !b.classList.contains('branch-item--exception') && !b.classList.contains('connected'));

  const no = NODE_ID
    ? document.querySelector(`.task-flow-node[data-node-id="${NODE_ID}"]`)
    : nodes().filter(n => titulo(n) === TITULO_CARD).sort((a, b) => livres(b).length - livres(a).length)[0];
  if (!no) return alert(`Card "${TITULO_CARD}" não encontrado.`);
  const canvas = document.querySelector('.canvas-main');
  if (!canvas) return alert('Canvas (.canvas-main) não encontrado.');

  let pendentes = livres(no).map(b => b.dataset.branchKey);
  if (QUANTIDADE > 0) pendentes = pendentes.slice(0, QUANTIDADE);
  console.log(`[ligar] ${pendentes.length} saída(s) a ligar:`, pendentes);
  if (!pendentes.length) return alert('Nenhuma saída livre neste card.');

  // coordenadas: canvas -> tela
  const L0 = parseFloat(no.style.left), T0 = parseFloat(no.style.top);
  const escala = no.getBoundingClientRect().width / no.offsetWidth;
  const paraTela = (cx, cy) => {
    const r = no.getBoundingClientRect();
    return [r.left + (cx - L0) * escala, r.top + (cy - T0) * escala];
  };
  const maxDireita = Math.max(...nodes().map(n => parseFloat(n.style.left) + n.offsetWidth));

  // eventos de mouse + pointer, na mesma ordem que o navegador dispara
  const fire = (el, tipo, x, y, buttons) => {
    const init = { bubbles: true, cancelable: true, composed: true, view: window,
      clientX: x, clientY: y, screenX: x, screenY: y, button: 0, buttons };
    if (tipo.startsWith('pointer'))
      el.dispatchEvent(new PointerEvent(tipo, { ...init, pointerId: 1, pointerType: 'mouse', isPrimary: true }));
    else el.dispatchEvent(new MouseEvent(tipo, init));
  };
  const par = (el, t, x, y, b) => { fire(el, 'pointer' + t, x, y, b); fire(el, 'mouse' + t, x, y, b); };
  const sob = (x, y) => {
    const e = document.elementFromPoint(x, y);
    return e && !e.closest('.task-flow-node') ? e : canvas;
  };

  const arrastar = async (dot, x1, y1) => {
    const r = dot.getBoundingClientRect();
    const x0 = r.left + r.width / 2, y0 = r.top + r.height / 2;
    par(dot, 'down', x0, y0, 1);
    for (let i = 1; i <= 12; i++) {
      const x = x0 + (x1 - x0) * i / 12, y = y0 + (y1 - y0) * i / 12;
      par(sob(x, y), 'move', x, y, 1);
      await sleep(16);
    }
    par(sob(x1, y1), 'up', x1, y1, 0);
  };

  const campoBusca = () => [...document.querySelectorAll('input')]
    .find(i => /buscar/i.test(i.placeholder) && !i.closest('.task-flow-node') && i.getClientRects().length);
  const folha = raiz => [...raiz.querySelectorAll('*')]
    .find(e => !e.closest('.task-flow-node') && !e.children.length && e.textContent.trim() === ALVO);
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;

  let ok = 0;
  for (let i = 0; i < pendentes.length; i++) {
    const chave = pendentes[i];
    const b = no.querySelector(`.branch-item[data-branch-key="${CSS.escape(chave)}"]`);
    const dot = b?.querySelector('.connector-dot');
    if (!dot || b.classList.contains('connected')) continue;
    const antes = nodes().length;

    const [x1, y1] = paraTela(maxDireita + AFASTAMENTO_X, T0 + ok * ESPACO_Y);
    await arrastar(dot, x1 + 10, y1 + 10);

    const campo = await esperar(campoBusca);
    if (!campo) { console.error(`[ligar] "${chave}": popup de busca não abriu. Parando.`); break; }
    setter.call(campo, ALVO);
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    await sleep(200);

    let item = null, cont = campo.parentElement;
    while (cont && !(item = folha(cont))) cont = cont.parentElement;
    if (!item) { console.error(`[ligar] "${chave}": item "${ALVO}" não encontrado no popup. Parando.`); break; }
    const ir = item.getBoundingClientRect(), cx = ir.left + ir.width / 2, cy = ir.top + ir.height / 2;
    par(item, 'down', cx, cy, 1); par(item, 'up', cx, cy, 0); item.click();

    const criado = await esperar(() => nodes().length > antes);
    if (!criado) { console.error(`[ligar] "${chave}": card não foi criado. Parando.`); break; }
    await esperar(() => b.classList.contains('connected'), 1500);
    ok++;
    console.log(`[ligar] ${ok}/${pendentes.length} ${chave} ${b.classList.contains('connected') ? 'ligada' : 'card criado (confira a ligação)'}`);
    await sleep(250);
  }
  const msg = `${ok} de ${pendentes.length} saída(s) ligada(s). Lembre de salvar.`;
  console.log('[ligar] ' + msg); alert(msg);
})();
