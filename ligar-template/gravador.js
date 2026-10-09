// Diagnóstico: grava o que a página recebe quando você arrasta UMA bolinha até o canvas
// e escolhe "Template WhatsApp". Cole no console, faça o arrasto manual e depois rode: __rec.copiar()
(() => {
  const log = (window.__rec = { eventos: [], popup: null, copiar() { copy(JSON.stringify({ eventos: this.eventos, popup: this.popup }, null, 1)); console.log('copiado!'); } });
  const desc = e => (e && e.tagName) ? e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/).slice(0, 4).join('.') : '') + (e.dataset?.branchKey ? `[branch=${e.dataset.branchKey}]` : '') : String(e);
  let ultimoMove = 0;
  const tipos = ['pointerdown', 'mousedown', 'pointermove', 'mousemove', 'pointerup', 'mouseup', 'click', 'dragstart', 'contextmenu'];
  tipos.forEach(t => window.addEventListener(t, e => {
    if (/move/.test(t)) { if (Date.now() - ultimoMove < 150) return; ultimoMove = Date.now(); }
    log.eventos.push({ t, alvo: desc(e.target), x: Math.round(e.clientX), y: Math.round(e.clientY), buttons: e.buttons, trusted: e.isTrusted });
    if (t === 'mouseup' || t === 'pointerup') setTimeout(() => {
      const campo = [...document.querySelectorAll('input')].find(i => /buscar/i.test(i.placeholder) && i.getClientRects().length);
      if (campo && !log.popup) {
        let c = campo; for (let i = 0; i < 4 && c.parentElement; i++) c = c.parentElement;
        log.popup = c.outerHTML.slice(0, 6000);
      }
    }, 800);
  }, true));
  const cc = document.querySelector('.canvas-content');
  log.canvas = { transform: cc?.style.transform, classe: document.querySelector('.canvas-main')?.className };
  console.log('Gravando. Arraste uma bolinha, escolha o Template WhatsApp e rode __rec.copiar()');
})();
