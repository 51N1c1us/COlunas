// SOMENTE LEITURA. Descobre em qual número (linha) está cada template da planilha Templates_BV_ADM.xlsx.
// Como usar: abra UM card "Template WhatsApp" (painel Propriedades) que já tenha os números marcados em "Números WhatsApp"
// (marque todos os números que quer verificar). Cole no console e aperte Enter.
// O script abre a lista "Template" de cada número, lê todos os templates (rolando a lista) e fecha SEM escolher nada.
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
  const PAUSA = 350; // ms entre ações (aumente se o app estiver lento)

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const visivel = e => !!(e && (e.offsetWidth || e.offsetHeight || e.getClientRects().length));
  const folhas = (raiz, txt) => [...raiz.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.trim() === txt);
  const espera = async (fn, ms = 3000) => { for (let t = 0; t < ms; t += 50) { const r = fn(); if (r) return r; await sleep(50); } return null; };
  const evento = (el, tipo, Ctor) => { const r = el.getBoundingClientRect(); el.dispatchEvent(new Ctor(tipo, { bubbles: true, cancelable: true, composed: true, view: window, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, button: 0, buttons: tipo.endsWith('down') ? 1 : 0, pointerId: 1, pointerType: 'mouse', isPrimary: true })); };
  const clicar = el => { for (const [t, C] of [['pointerdown', PointerEvent], ['mousedown', MouseEvent], ['pointerup', PointerEvent], ['mouseup', MouseEvent], ['click', MouseEvent]]) evento(el, t, C); };
  const campoBusca = () => [...document.querySelectorAll('input')].find(i => /pesquisar/i.test(i.placeholder || '') && visivel(i));
  const fechar = async () => {
    for (const alvo of [campoBusca(), document.activeElement, document.body]) {
      if (!alvo) continue;
      alvo.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true }));
      if (await espera(() => !campoBusca(), 500)) return true;
    }
    return !campoBusca();
  };

  const painel = document.querySelector('.tfp-body');
  if (!painel) return console.error('[linhas] painel Propriedades fechado. Abra um card Template WhatsApp primeiro.');

  // ---------- 1. blocos "Configuração do número" ----------
  const rotulos = folhas(painel, 'Configuração do número');
  const blocos = rotulos.map(r => {
    let el = r;
    while (el && el !== painel && !folhas(el, 'Template').length) el = el.parentElement;
    return el && el !== painel && folhas(el, 'Configuração do número').length === 1 ? el : null;
  }).filter(Boolean);
  if (!blocos.length) {
    console.error('[linhas] não achei nenhum bloco "Configuração do número". Marque ao menos um número em "Números WhatsApp".');
    return;
  }
  console.log(`[linhas] ${blocos.length} número(s) encontrados no card.`);

  // ---------- 2. lê a lista de templates de cada número ----------
  const lerLista = async () => {
    const busca = campoBusca();
    let raiz = busca;
    for (let i = 0; i < 8 && raiz; i++) {
      raiz = raiz.parentElement;
      if (raiz && [...raiz.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.trim() && e !== busca).length >= 3) break;
    }
    if (!raiz) return null;
    const itens = new Set();
    const coletar = () => [...raiz.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.trim() && !e.closest('input') && visivel(e)).forEach(e => itens.add(e.textContent.trim()));
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

  const linhas = [];
  for (const [i, bloco] of blocos.entries()) {
    const numero = (bloco.textContent.match(/\(\d{2}\)\s*\d{4,5}-\d{4}/) || ['(número ' + (i + 1) + ')'])[0];
    bloco.scrollIntoView({ block: 'center' }); await sleep(PAUSA);
    const rotuloTpl = folhas(bloco, 'Template')[0];
    // o campo de seleção é o próximo elemento clicável depois do rótulo "Template"
    const candidatos = [...bloco.querySelectorAll('*')]
      .filter(e => visivel(e) && (rotuloTpl.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING)
        && (/cursor-pointer|select-none/.test(e.className || '') || e.matches('[role="combobox"], button') || getComputedStyle(e).cursor === 'pointer'));
    const gatilho = candidatos.find(e => /template/i.test(e.textContent)) || candidatos[0];
    if (!gatilho) { console.error(`[linhas] ${numero}: não achei o campo Template. Rode diagnostico (veja README).`); window.__diag = bloco.outerHTML; continue; }
    if (campoBusca()) await fechar();
    clicar(gatilho);
    if (!(await espera(campoBusca))) { console.error(`[linhas] ${numero}: a lista não abriu.`); window.__diag = bloco.outerHTML; continue; }
    await sleep(PAUSA);
    const itens = await lerLista();
    const fechou = await fechar();
    if (!fechou) { console.error(`[linhas] ${numero}: não consegui fechar a lista. Parei para não escolher template sem querer.`); return; }
    await sleep(PAUSA);
    linhas.push({ numero, templates: itens ? [...itens] : [] });
    console.log(`[linhas] ${numero}: ${itens ? itens.size : 0} item(ns) na lista.`);
  }

  // ---------- 3. cruza com a planilha ----------
  const norm = s => s.trim().toLowerCase();
  const porTemplate = {};
  for (const l of linhas) for (const t of l.templates) (porTemplate[norm(t)] ||= []).push(l.numero);
  const resultado = Object.entries(BASE_OFICIAL).map(([nome, base]) => ({ template: nome, base_oficial: base, numeros: (porTemplate[norm(nome)] || []).join(' | ') || '— não achei —' }));
  window.__linhas = { linhas, resultado };
  console.table(resultado);
  const faltam = resultado.filter(r => r.numeros.startsWith('—'));
  const varios = resultado.filter(r => r.numeros.includes('|'));
  console.log(`[linhas] ${resultado.length - faltam.length} de ${resultado.length} templates achados. ${faltam.length} sem número. ${varios.length} em mais de um número.`);
  if (faltam.length) console.warn('[linhas] sem número:', faltam.map(r => r.template).join(', '));
  const csv = 'template;base_oficial;numeros\n' + resultado.map(r => [r.template, r.base_oficial, r.numeros].join(';')).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv' })); a.download = 'templates_por_numero.csv'; a.click();
})();
