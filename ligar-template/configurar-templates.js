// Para cada card "Template WhatsApp" (identificado pelo nome, ex.: adm_atualizacaout1): marca no painel Propriedades os números da
// planilha templates_por_numero_2.csv e, em cada número, escolhe o template com o MESMO nome do card.
// Cole no console do fluxo (digite `permitir colar` antes, se o Chrome pedir). A primeira execução faz só 1 card (QUANTIDADE = 1).
// Depois confira o card e clique em Salvar. NÃO mexe nos outros campos do card.
(async () => {
  const DADOS = {   // template (= nome do card) -> números
    'adm_atualizacaout1': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_atualizacaout2': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_atualizacaout3': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_atualizacaout4': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_atualizacaout5': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_atualizacaout6': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_atualizacaout7': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_atualizacaout8': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_atualizacaout9': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_atualizacaout10': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_expirandout1': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_expirandout2': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_expirandout3': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_expirandout4': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_expirandout5': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_expirandout6': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_expirandout7': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_expirandout8': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_expirandout9': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_expirandout10': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_fluxout1': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_fluxout2': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_fluxout3': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_fluxout4': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_fluxout5': ["11959588293", "1131640993", "11930032054", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_fluxout6': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_fluxout7': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_fluxout8': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_fluxout9': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_fluxout10': ["11959588293", "1131640993", "11961056689", "11970158745", "11977370378", "11977900652", "11977900324"],
    'adm_isencaomk1': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_isencaomk2': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_isencaomk3': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_isencaomk4': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'adm_isencaomk5': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmatualizacao_21': ["11959588293", "1131640993", "11962182834", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmatualizacao_22': ["11959588293", "1131640993", "11930032054", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmatualizacao_23': ["11959588293", "1131640993", "11930032054", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmatualizacao_24': ["11959588293", "1131640993", "11962182834", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmatualizacao_25': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmatualizacao_26': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmatualizacao_27': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmatualizacao_28': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmatualizacao_29': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmatualizacao_30': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmparcial_1': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmparcial_2': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmparcial_3': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmparcial_5': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmparcial_6': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmparcial_7': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmparcial_8': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"],
    'bvadmparcial_10': ["11959588293", "1131640993", "11961056689", "11970158745", "11977900652", "11977900324"]
  };
  const QUANTIDADE = 1;          // 1 = teste com um card; 0 = todos
  const COMECAR_EM = 0;          // pula os N primeiros cards da fila (para retomar de onde parou)
  const SOBRESCREVER = false;    // true = troca também números que já têm OUTRO template escolhido
  const REMOVER_EXTRAS = false;  // true = desmarca números do card que não estão na planilha
  const TITULO_CARD = 'Template WhatsApp';
  const PAUSA = 350;             // ms entre ações (aumente se o app estiver lento)

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const visivel = e => !!(e && (e.offsetWidth || e.offsetHeight || e.getClientRects().length));
  const painel = () => document.querySelector('.tfp-body');
  const folhas = (raiz, txt) => [...raiz.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.trim() === txt);
  const espera = async (fn, ms = 3000) => { for (let t = 0; t < ms; t += 50) { const r = fn(); if (r) return r; await sleep(50); } return null; };
  const evento = (el, tipo, Ctor) => { const r = el.getBoundingClientRect(); el.dispatchEvent(new Ctor(tipo, { bubbles: true, cancelable: true, composed: true, view: window, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, button: 0, buttons: tipo.endsWith('down') ? 1 : 0, pointerId: 1, pointerType: 'mouse', isPrimary: true })); };
  const clicar = el => { for (const [t, C] of [['pointerdown', PointerEvent], ['mousedown', MouseEvent], ['pointerup', PointerEvent], ['mouseup', MouseEvent], ['click', MouseEvent]]) evento(el, t, C); };
  const dig = s => s.replace(/\D/g, '').slice(-11);
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  const nodes = () => [...document.querySelectorAll('.task-flow-node')];
  const tituloDe = n => n.querySelector('.node-title')?.textContent.trim();
  const nomeDe = n => n.querySelector('.node-name .text')?.textContent.trim() || '';

  // ---------- listas suspensas ("Pesquisar item") ----------
  const campoBusca = () => [...document.querySelectorAll('input')].find(i => /pesquisar/i.test(i.placeholder || '') && visivel(i));
  const esc = alvo => alvo && alvo.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true }));
  const clicarFora = () => {
    const alvo = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && e.textContent.trim() === 'Propriedades' && visivel(e));
    if (alvo) clicar(alvo); else { document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })); document.body.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
  };
  const fecharLista = async () => {
    for (const passo of [() => esc(campoBusca()), clicarFora, () => { esc(document.activeElement); esc(document.body); }, clicarFora]) {
      if (!campoBusca()) return true;
      passo();
      if (await espera(() => !campoBusca(), 700)) return true;
    }
    return !campoBusca();
  };
  const raizLista = () => {
    const busca = campoBusca();
    let raiz = busca;
    for (let i = 0; i < 8 && raiz; i++) {
      raiz = raiz.parentElement;
      if (raiz && [...raiz.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.trim() && e !== busca).length >= 3) break;
    }
    return raiz;
  };
  const rolavelDe = raiz => [...raiz.querySelectorAll('*'), raiz].find(e => e.scrollHeight > e.clientHeight + 5 && /auto|scroll/.test(getComputedStyle(e).overflowY));
  const digitarBusca = async txt => {
    const i = campoBusca(); if (!i) return;
    i.focus(); setter.call(i, txt);
    i.dispatchEvent(new Event('input', { bubbles: true })); i.dispatchEvent(new Event('change', { bubbles: true }));
    await sleep(PAUSA);
  };
  // acha o item com esse texto na lista aberta: primeiro digitando na busca, depois rolando. Devolve o elemento (não clica).
  const buscarItem = async (txt, comparar = x => x) => {
    const raiz = raizLista(); if (!raiz) return null;
    const rolavel = rolavelDe(raiz);
    const area = rolavel || raiz; // capturado ANTES de digitar, para não confundir com o texto do campo que abriu a lista
    const procura = () => [...area.querySelectorAll('*')].find(e => e.children.length === 0 && visivel(e) && comparar(e.textContent.trim()) === txt);
    let el = procura(); if (el) return el;
    await digitarBusca(txt);
    el = await espera(procura, 2000); if (el) return el;
    await digitarBusca('');
    if (rolavel) {
      rolavel.scrollTop = 0; await sleep(120);
      for (let i = 0, ant = -1; i < 600 && rolavel.scrollTop !== ant; i++) {
        el = procura(); if (el) return el;
        ant = rolavel.scrollTop; rolavel.scrollTop += Math.max(40, rolavel.clientHeight * 0.8); await sleep(90);
      }
    }
    return procura();
  };

  // lê TODOS os itens da lista aberta (rolando) — usado só para diagnóstico quando um template não é encontrado
  const lerTudo = async () => {
    const raiz = raizLista(); if (!raiz) return [];
    const itens = new Set();
    const coletar = () => [...raiz.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.trim() && !e.closest('input') && visivel(e)).forEach(e => itens.add(e.textContent.trim()));
    const rolavel = rolavelDe(raiz);
    coletar();
    if (rolavel) {
      rolavel.scrollTop = 0; await sleep(120);
      for (let i = 0, ant = -1; i < 600 && rolavel.scrollTop !== ant; i++) { coletar(); ant = rolavel.scrollTop; rolavel.scrollTop += Math.max(40, rolavel.clientHeight * 0.8); await sleep(90); }
      coletar();
    }
    return [...itens];
  };

  // ---------- painel do card ----------
  const campoDescricao = () => {
    const p = painel(); if (!p) return null;
    const rotulo = folhas(p, 'Descrição')[0];
    return rotulo?.closest('.parameter-item')?.querySelector('input') || null;
  };
  const fecharPainel = async () => {
    let el = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && e.textContent.trim() === 'Propriedades' && visivel(e));
    for (let i = 0; el && i < 4; i++, el = el.parentElement) { const b = el.querySelector('button, [role="button"]'); if (b) { clicar(b); break; } }
    await espera(() => !painel(), 1200);
  };
  const abrirCard = async (nome) => {
    const el = nodes().find(n => tituloDe(n) === TITULO_CARD && nomeDe(n) === nome);
    if (!el) return 'card não encontrado na tela';
    if (campoBusca()) await fecharLista();
    if (painel()) { await fecharPainel(); await sleep(PAUSA); }
    const t = el.querySelector('.node-title') || el;
    clicar(t);
    let ok = await espera(() => campoDescricao()?.value.trim() === nome, 3000);
    if (!ok) { const r = t.getBoundingClientRect(); t.dispatchEvent(new MouseEvent('dblclick', { bubbles: true, clientX: r.left + 10, clientY: r.top + 10 })); ok = await espera(() => campoDescricao()?.value.trim() === nome, 3000); }
    await sleep(PAUSA);
    return ok ? null : 'o painel abriu, mas não é o deste card (Descrição diferente)';
  };

  // ---------- números e templates dentro do painel ----------
  const scrollPara = el => el.scrollIntoView({ block: 'center' });
  const blocos = () => { const p = painel(); if (!p) return []; return folhas(p, 'Configuração do número').map(r => {
    let el = r;
    while (el && el !== p && !folhas(el, 'Template').length) el = el.parentElement;
    return el && el !== p && folhas(el, 'Configuração do número').length === 1 ? el : null;
  }).filter(Boolean); };
  const numeroDoBloco = b => { const m = b.textContent.match(/\(\d{2}\)\s*\d{4,5}-\d{4}/); return m ? dig(m[0]) : null; };
  const blocoDe = num => blocos().find(b => numeroDoBloco(b) === num);
  const marcados = () => [...new Set(blocos().map(numeroDoBloco).filter(Boolean))];
  const gatilhoTpl = b => {
    const rotulo = folhas(b, 'Template')[0]; if (!rotulo) return null;
    const cands = [...b.querySelectorAll('*')].filter(e => visivel(e) && (rotulo.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING)
      && (/cursor-pointer|select-none/.test(e.className || '') || e.matches('[role="combobox"], button') || getComputedStyle(e).cursor === 'pointer'));
    return cands.find(e => /template/i.test(e.textContent)) || cands[0];
  };
  const textoTpl = b => (gatilhoTpl(b)?.textContent || '').trim();
  const semTemplate = t => !t || /selecione um template/i.test(t);
  const gatilhoNum = () => {
    const p = painel(), rotulo = p && folhas(p, 'Números WhatsApp')[0]; if (!rotulo) return null;
    const rr = rotulo.getBoundingClientRect();
    return [...p.querySelectorAll('*')].find(e => visivel(e) && (rotulo.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING)
      && e.getBoundingClientRect().top >= rr.bottom - 2 && (/cursor-pointer|select-none/.test(e.className || '') || getComputedStyle(e).cursor === 'pointer'));
  };
  const abrirNumeros = async () => {
    if (campoBusca()) return true;
    const g = gatilhoNum(); if (!g) return false;
    scrollPara(g); clicar(g);
    return !!(await espera(campoBusca));
  };
  const alternarNumero = async (num, quer) => {
    if (!(await abrirNumeros())) { console.error(`  ✖ ${num}: a lista "Números WhatsApp" não abriu.`); return false; }
    const item = await buscarItem(num, dig);
    if (!item) { console.error(`  ✖ ${num}: não achei este número na lista.`); return false; }
    clicar(item);
    if (await espera(() => marcados().includes(num) === quer, 3000)) { await sleep(PAUSA); return true; }
    console.error(`  ✖ ${num}: cliquei, mas o bloco do número ${quer ? 'não apareceu' : 'não sumiu'}.`);
    return false;
  };
  const escolherTemplate = async (num, nome) => {
    let b = blocoDe(num);
    if (!b) return `bloco do número ${num} não existe`;
    const atual = textoTpl(b);
    if (atual.includes(nome) && !semTemplate(atual)) return 'ja';
    if (!semTemplate(atual) && !SOBRESCREVER) return `já tem outro template (${atual}); use SOBRESCREVER = true para trocar`;
    scrollPara(b); await sleep(PAUSA);
    const g = gatilhoTpl(b); if (!g) return 'não achei o campo Template';
    clicar(g);
    if (!(await espera(campoBusca))) return 'a lista de templates não abriu';
    await sleep(PAUSA);
    const item = await buscarItem(nome);
    if (!item) {
      await digitarBusca('');
      const tudo = await lerTudo();
      const radical = nome.replace(/[\d_]+$/, '').slice(0, 8);
      const parecidos = tudo.filter(t => t.toLowerCase().includes(radical.toLowerCase()));
      const outros = blocos().filter(bb => numeroDoBloco(bb) !== num).map(bb => `${numeroDoBloco(bb)}=${textoTpl(bb)}`);
      window.__diagTpl = { numero: num, template: nome, totalNaLista: tudo.length, parecidos, primeiros: tudo.slice(0, 40), outrosBlocosDoCard: outros };
      console.warn(`  ? ${num}: a lista tem ${tudo.length} item(ns). Parecidos com "${radical}": ${parecidos.slice(0, 12).join(', ') || 'nenhum'}. Outros números do card estão com: ${outros.join(' | ') || '—'}. (detalhes em window.__diagTpl)`);
      await fecharLista();
      return `o template ${nome} não existe na lista deste número`;
    }
    clicar(item);
    await sleep(PAUSA);
    if (campoBusca()) await fecharLista();
    const ok = await espera(() => { const bb = blocoDe(num); return bb && textoTpl(bb).includes(nome); }, 3000);
    return ok ? 'ok' : `cliquei em ${nome}, mas o campo não mostrou o template`;
  };

  // ---------- fila ----------
  const naTela = new Set(nodes().filter(n => tituloDe(n) === TITULO_CARD).map(nomeDe));
  const fila = Object.keys(DADOS).filter(k => naTela.has(k));
  const semCard = Object.keys(DADOS).filter(k => !naTela.has(k));
  if (semCard.length) console.warn(`[config] ${semCard.length} template(s) da planilha sem card com esse nome na tela:`, semCard.join(', '));
  const lote = fila.slice(COMECAR_EM, QUANTIDADE ? COMECAR_EM + QUANTIDADE : undefined);
  console.log(`[config] ${fila.length} card(s) na fila; vou fazer ${lote.length} (a partir do ${COMECAR_EM + 1}º).`);

  const resumo = [];
  for (const [i, nome] of lote.entries()) {
    const numeros = DADOS[nome].map(dig);
    console.log(`[config] ${COMECAR_EM + i + 1}/${fila.length} ${nome}: ${numeros.length} número(s)`);
    const erro = await abrirCard(nome);
    if (erro) { console.error(`[config] ${nome}: ${erro}. Parei.`); resumo.push({ card: nome, status: 'ERRO: ' + erro }); break; }

    // 1) números
    let falhou = false;
    for (const n of numeros) if (!marcados().includes(n) && !(await alternarNumero(n, true))) { falhou = true; break; }
    if (falhou) { console.error(`[config] ${nome}: não consegui marcar todos os números. Parei.`); resumo.push({ card: nome, status: 'ERRO nos números' }); break; }
    if (REMOVER_EXTRAS) for (const n of marcados().filter(n => !numeros.includes(n))) if (!(await alternarNumero(n, false))) { falhou = true; break; }
    if (campoBusca() && !(await fecharLista())) { console.error(`[config] ${nome}: não consegui fechar a lista de números. Parei.`); resumo.push({ card: nome, status: 'ERRO fechar lista' }); break; }
    const extras = marcados().filter(n => !numeros.includes(n));
    if (extras.length) console.warn(`  ! ${nome}: números no card que não estão na planilha (mantidos): ${extras.join(', ')}`);
    await sleep(PAUSA);

    // 2) template de cada número
    const problemas = [];
    for (const n of numeros) {
      const r = await escolherTemplate(n, nome);
      if (r === 'ok') console.log(`  ✔ ${n} → ${nome}`);
      else if (r === 'ja') console.log(`  = ${n} já estava com ${nome}`);
      else { console.error(`  ✖ ${n}: ${r}`); problemas.push(`${n}: ${r}`); if (/não mostrou|não abriu|não achei o campo/.test(r)) { falhou = true; break; } }
    }
    resumo.push({ card: nome, numeros: numeros.length, status: problemas.length ? 'COM PROBLEMAS: ' + problemas.join(' / ') : 'ok' });
    if (falhou) { console.error(`[config] ${nome}: falha de interface. Parei.`); break; }
    await fecharPainel(); await sleep(PAUSA);
  }
  console.table(resumo);
  const feitos = resumo.filter(r => r.status === 'ok').length;
  console.log(`[config] ${feitos} card(s) configurado(s) sem problemas. ${QUANTIDADE ? 'Teste ok? Troque QUANTIDADE por 0 (e use COMECAR_EM para retomar). ' : ''}Depois rode o organizar-cards.js e clique em Salvar.`);
})();
