// Descobre em qual número (linha) está cada template da planilha Templates_BV_ADM.xlsx.
// ATENÇÃO: este script MARCA e DESMARCA números em "Números WhatsApp" do card aberto. Ao desmarcar um número, o app apaga a
// configuração dele no card. Por isso use um card DESCARTÁVEL (um Template WhatsApp novo, sem templates escolhidos) e NÃO salve depois.
// Como usar: abra o painel Propriedades desse card, cole no console e aperte Enter.
// Para cada número: marca só ele, abre a lista "Template", lê todos os itens (rolando) e fecha SEM escolher nada.
(async () => {
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
    'bvadmparcial_10': 'TRAD PARCIAL LOC / TRAD PARCIAL DESLOC'
  };
  const NUMEROS = [];            // [] = todos os números da lista; ou ['11969693938', '11979518930', ...]
  const CARD_DESCARTAVEL = false; // true = confirma que o card pode perder a configuração dos números (veja aviso acima)
  const PAUSA = 350;             // ms entre ações (aumente se o app estiver lento)

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const visivel = e => !!(e && (e.offsetWidth || e.offsetHeight || e.getClientRects().length));
  const folhas = (raiz, txt) => [...raiz.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.trim() === txt);
  const espera = async (fn, ms = 3000) => { for (let t = 0; t < ms; t += 50) { const r = fn(); if (r) return r; await sleep(50); } return null; };
  const evento = (el, tipo, Ctor) => { const r = el.getBoundingClientRect(); el.dispatchEvent(new Ctor(tipo, { bubbles: true, cancelable: true, composed: true, view: window, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, button: 0, buttons: tipo.endsWith('down') ? 1 : 0, pointerId: 1, pointerType: 'mouse', isPrimary: true })); };
  const clicar = el => { for (const [t, C] of [['pointerdown', PointerEvent], ['mousedown', MouseEvent], ['pointerup', PointerEvent], ['mouseup', MouseEvent], ['click', MouseEvent]]) evento(el, t, C); };
  const dig = s => s.replace(/\D/g, '').slice(-11);
  const ehNumero = t => /^\+?\d{10,13}$/.test(t.replace(/[\s()-]/g, ''));
  const campoBusca = () => [...document.querySelectorAll('input')].find(i => /pesquisar/i.test(i.placeholder || '') && visivel(i));
  // fecha a lista aberta: tenta Esc, depois clique FORA (no título "Propriedades"), depois Esc no body. Nunca clica em itens.
  const clicarFora = () => {
    const alvo = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && e.textContent.trim() === 'Propriedades' && visivel(e));
    if (alvo) clicar(alvo); else { document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })); document.body.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
  };
  const esc = alvo => alvo && alvo.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true }));
  const fechar = async () => {
    const passos = [() => esc(campoBusca()), clicarFora, () => { esc(document.activeElement); esc(document.body); esc(document); }, clicarFora];
    for (const passo of passos) {
      if (!campoBusca()) return true;
      passo();
      if (await espera(() => !campoBusca(), 700)) return true;
    }
    if (campoBusca()) { try { window.__diag = raizLista().outerHTML.slice(0, 6000); } catch (e) {} }
    return !campoBusca();
  };
  const raizLista = () => {
    const busca = campoBusca(); if (!busca) return null;
    const popup = busca.closest('[data-popper-placement]');   // a lista é um popup solto no <body>: NUNCA sobe além dele
    if (popup) return popup;
    let raiz = busca;
    for (let i = 0; i < 8 && raiz; i++) {
      raiz = raiz.parentElement;
      if (raiz && [...raiz.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.trim() && e !== busca).length >= 3) break;
    }
    return raiz;
  };
  // só os textos dos itens (li) da lista; se a lista não usar <li>, cai para qualquer texto
  const folhasLista = raiz => {
    const f = [...raiz.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.trim() && !e.closest('input') && visivel(e) && !e.closest('.task-flow-node, .canvas-main'));
    const li = f.filter(e => e.closest('li'));
    return li.length ? li : f;
  };
  // lê todos os itens da lista aberta, rolando; devolve {itens:Set, linhas:Map texto->elemento (só os visíveis no fim)}
  const lerLista = async () => {
    const raiz = raizLista(); if (!raiz) return null;
    const itens = new Set();
    const coletar = () => folhasLista(raiz).forEach(e => itens.add(e.textContent.trim()));
    const rolavel = [...raiz.querySelectorAll('*'), raiz].find(e => e.scrollHeight > e.clientHeight + 5 && /auto|scroll/.test(getComputedStyle(e).overflowY));
    coletar();
    if (rolavel) {
      rolavel.scrollTop = 0; await sleep(120);
      for (let i = 0, ant = -1; i < 400 && rolavel.scrollTop !== ant; i++) {
        coletar(); ant = rolavel.scrollTop;
        rolavel.scrollTop += Math.max(40, rolavel.clientHeight * 0.8); await sleep(90);
      }
      coletar();
    }
    return itens;
  };
  // rola a lista aberta até aparecer o item com esse texto e devolve o elemento
  const acharItem = async (txt, comparar = x => x) => {
    const raiz = raizLista(); if (!raiz) return null;
    const procura = () => [...raiz.querySelectorAll('*')].find(e => e.children.length === 0 && visivel(e) && !e.closest('input') && comparar(e.textContent.trim()) === txt);
    let el = procura(); if (el) return el;
    const rolavel = [...raiz.querySelectorAll('*'), raiz].find(e => e.scrollHeight > e.clientHeight + 5 && /auto|scroll/.test(getComputedStyle(e).overflowY));
    if (!rolavel) return null;
    rolavel.scrollTop = 0; await sleep(120);
    for (let i = 0, ant = -1; i < 400 && rolavel.scrollTop !== ant; i++) {
      el = procura(); if (el) return el;
      ant = rolavel.scrollTop; rolavel.scrollTop += Math.max(40, rolavel.clientHeight * 0.8); await sleep(90);
    }
    return procura();
  };

  const painel = document.querySelector('.tfp-body');
  if (!painel) return console.error('[linhas] painel Propriedades fechado. Abra um card Template WhatsApp (descartável) primeiro.');

  // ---------- campo "Números WhatsApp" ----------
  const rotuloNum = folhas(painel, 'Números WhatsApp')[0];
  if (!rotuloNum) return console.error('[linhas] não achei o campo "Números WhatsApp" no painel.');
  const gatilhoNum = () => {
    const rr = rotuloNum.getBoundingClientRect();
    return [...painel.querySelectorAll('*')].find(e => visivel(e) && (rotuloNum.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING)
      && e.getBoundingClientRect().top >= rr.bottom - 2 && (/cursor-pointer|select-none/.test(e.className || '') || getComputedStyle(e).cursor === 'pointer'));
  };
  // quais números estão marcados = quais blocos "Configuração do número" existem (mais confiável que ler as etiquetas)
  const tagsMarcadas = () => [...new Set(blocos().map(numeroDoBloco).filter(Boolean))];
  const abrirNumeros = async () => {
    if (campoBusca()) return true;
    scrollPara(rotuloNum); clicar(gatilhoNum());
    return !!(await espera(campoBusca));
  };
  const scrollPara = el => { el.scrollIntoView({ block: 'center' }); };
  const blocos = () => folhas(painel, 'Configuração do número').map(r => {
    let el = r;
    while (el && el !== painel && !folhas(el, 'Template').length) el = el.parentElement;
    return el && el !== painel && folhas(el, 'Configuração do número').length === 1 ? el : null;
  }).filter(Boolean);
  const numeroDoBloco = b => { const m = b.textContent.match(/\(\d{2}\)\s*\d{4,5}-\d{4}/); return m ? dig(m[0]) : null; };
  const textoCampoTpl = b => { const g = gatilhoTpl(b); return g ? g.textContent.trim() : ''; };
  const gatilhoTpl = b => {
    const rotulo = folhas(b, 'Template')[0]; if (!rotulo) return null;
    const cands = [...b.querySelectorAll('*')].filter(e => visivel(e) && (rotulo.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING)
      && (/cursor-pointer|select-none/.test(e.className || '') || e.matches('[role="combobox"], button') || getComputedStyle(e).cursor === 'pointer'));
    return cands.find(e => /template/i.test(e.textContent)) || cands[0];
  };

  // ---------- trava de segurança ----------
  const jaConfigurados = blocos().filter(b => !/selecione um template/i.test(textoCampoTpl(b)) && textoCampoTpl(b));
  if (jaConfigurados.length && !CARD_DESCARTAVEL) {
    return console.error(`[linhas] PAROU: ${jaConfigurados.length} número(s) deste card já têm template escolhido, e este script desmarca números (isso apaga a configuração). Use um card novo/descartável, ou defina CARD_DESCARTAVEL = true se este card pode ser perdido.`);
  }

  // ---------- 1. descobre a lista de números ----------
  const originais = tagsMarcadas();
  if (!(await abrirNumeros())) return console.error('[linhas] a lista "Números WhatsApp" não abriu.');
  await sleep(PAUSA);
  const todos = [...(await lerLista() || [])].filter(ehNumero).map(dig);
  const alvos = NUMEROS.length ? NUMEROS.map(dig) : [...new Set(todos)];
  if (!alvos.length) { await fechar(); return console.error('[linhas] não achei números na lista.'); }
  console.log(`[linhas] ${alvos.length} número(s) a verificar: ${alvos.join(', ')}. Marcados no começo: ${originais.join(', ') || 'nenhum'}.`);

  // ---------- 2. liga/desliga um número pela lista ----------
  const alternar = async (num, quer) => {
    if (!(await abrirNumeros())) return false;
    const item = await acharItem(num, dig);
    if (!item) { console.error(`[linhas] ${num}: não achei na lista.`); return false; }
    clicar(item);
    // espera o app refletir; NUNCA clica de novo sem ver mudança (clicar de novo desfaz)
    if (await espera(() => tagsMarcadas().includes(num) === quer, 3000)) { await sleep(PAUSA); return true; }
    console.error(`[linhas] ${num}: cliquei na linha mas o bloco do número ${quer ? 'não apareceu' : 'não sumiu'}. Marcados agora: ${tagsMarcadas().join(', ') || 'nenhum'}.`);
    window.__diag = (item.closest('li, [role="option"], div') || item).outerHTML;
    console.log('[linhas] HTML da linha clicada guardado em window.__diag (digite copy(window.__diag)).');
    return false;
  };
  const definirSelecao = async desejado => {
    const atual = tagsMarcadas();
    for (const n of desejado.filter(n => !atual.includes(n))) if (!(await alternar(n, true))) return false;   // primeiro adiciona
    for (const n of tagsMarcadas().filter(n => !desejado.includes(n))) if (!(await alternar(n, false))) return false; // depois remove
    return true;
  };

  // ---------- 3. lê a lista de templates de cada número ----------
  const linhas = [];
  for (const num of alvos) {
    if (!(await definirSelecao([num]))) { console.error(`[linhas] ${num}: não consegui deixar só este número marcado. Parei.`); break; }
    if (campoBusca() && !(await fechar())) { console.error('[linhas] não consegui fechar a lista de números. Parei.'); break; }
    await sleep(PAUSA);
    const bloco = await espera(() => blocos().find(b => numeroDoBloco(b) === num));
    if (!bloco) { console.error(`[linhas] ${num}: o bloco "Configuração do número" não apareceu.`); window.__diag = painel.outerHTML; linhas.push({ numero: num, templates: [], erro: 'sem bloco' }); continue; }
    scrollPara(bloco); await sleep(PAUSA);
    const gat = gatilhoTpl(bloco);
    if (!gat) { console.error(`[linhas] ${num}: não achei o campo Template.`); window.__diag = bloco.outerHTML; linhas.push({ numero: num, templates: [], erro: 'sem campo' }); continue; }
    clicar(gat);
    if (!(await espera(campoBusca))) { console.error(`[linhas] ${num}: a lista de templates não abriu.`); window.__diag = bloco.outerHTML; linhas.push({ numero: num, templates: [], erro: 'lista não abriu' }); continue; }
    await sleep(PAUSA);
    const itens = await lerLista();
    if (!(await fechar())) { console.error(`[linhas] ${num}: não consegui fechar a lista. Parei para não escolher template sem querer.`); break; }
    await sleep(PAUSA);
    linhas.push({ numero: num, templates: itens ? [...itens].filter(t => !/nenhum template/i.test(t)) : [] });
    console.log(`[linhas] ${num}: ${itens ? itens.size : 0} item(ns) na lista de templates.`);
  }

  // ---------- 4. devolve a seleção original ----------
  if (originais.length && !(await definirSelecao(originais))) console.warn('[linhas] não consegui recolocar os números do começo. Confira o card (e não salve).');
  if (campoBusca()) await fechar();

  // ---------- 5. cruza com a planilha ----------
  const norm = s => s.trim().toLowerCase();
  const porTemplate = {};
  for (const l of linhas) for (const t of l.templates) (porTemplate[norm(t)] ||= []).push(l.numero);
  const resultado = Object.entries(BASE_OFICIAL).map(([nome, base]) => ({ template: nome, base_oficial: base, numeros: (porTemplate[norm(nome)] || []).join(' | ') || '— não achei —' }));
  window.__linhas = { linhas, resultado };
  console.table(resultado);
  const faltam = resultado.filter(r => r.numeros.startsWith('—'));
  const varios = resultado.filter(r => r.numeros.includes('|'));
  console.log(`[linhas] ${linhas.length} número(s) lidos. ${resultado.length - faltam.length} de ${resultado.length} templates achados. ${faltam.length} sem número. ${varios.length} em mais de um número. NÃO salve este card.`);
  if (faltam.length) console.warn('[linhas] sem número:', faltam.map(r => r.template).join(', '));
  const csv = 'template;base_oficial;numeros\n' + resultado.map(r => [r.template, r.base_oficial, r.numeros].join(';')).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv' })); a.download = 'templates_por_numero.csv'; a.click();
})();
