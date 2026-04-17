// Markdown modal: intercept clicks on links ending with .md, fetch + render via marked.
(function(){
  'use strict';
  const STYLE_ID = 'md-modal-style';
  if (!document.getElementById(STYLE_ID)) {
    const s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = `
      .md-modal-overlay{position:fixed;inset:0;background:rgba(20,18,15,.55);backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;z-index:9999;animation:mdFade .15s ease}
      .md-modal-overlay.open{display:flex}
      .md-modal{background:var(--surface,#fff);border:1px solid var(--border,#e8e5d8);border-radius:12px;width:min(900px,92vw);max-height:88vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.25);animation:mdSlide .2s ease}
      .md-modal-head{padding:1rem 1.25rem;border-bottom:1px solid var(--border,#e8e5d8);display:flex;align-items:center;gap:1rem;flex-shrink:0}
      .md-modal-title{flex:1;font-weight:600;color:var(--fg,#1a1a1a);font-size:.95rem;font-family:ui-monospace,monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .md-modal-close{background:transparent;border:1px solid var(--border,#e8e5d8);border-radius:6px;width:32px;height:32px;cursor:pointer;color:var(--fg-2,#5e5d57);display:flex;align-items:center;justify-content:center;font-size:1.1rem;line-height:1;transition:all .15s}
      .md-modal-close:hover{background:var(--surface-2,#f4f1e8);color:var(--fg,#1a1a1a)}
      .md-modal-body{padding:1.5rem 1.75rem;overflow-y:auto;color:var(--fg,#1a1a1a);line-height:1.7;font-size:.92rem}
      .md-modal-body h1,.md-modal-body h2,.md-modal-body h3{margin:1.25em 0 .5em;line-height:1.3;color:var(--fg,#1a1a1a)}
      .md-modal-body h1{font-size:1.55rem;border-bottom:1px solid var(--border,#e8e5d8);padding-bottom:.4em}
      .md-modal-body h2{font-size:1.25rem}
      .md-modal-body h3{font-size:1.05rem}
      .md-modal-body p{margin:.7em 0}
      .md-modal-body ul,.md-modal-body ol{margin:.7em 0;padding-left:1.6em}
      .md-modal-body li{margin:.25em 0}
      .md-modal-body code{padding:.12em .35em;background:var(--surface-2,#f4f1e8);border-radius:4px;font-size:.85em;font-family:ui-monospace,monospace}
      .md-modal-body pre{background:var(--surface-2,#f4f1e8);border:1px solid var(--border,#e8e5d8);padding:.85rem 1rem;border-radius:8px;overflow-x:auto;margin:.85em 0}
      .md-modal-body pre code{padding:0;background:transparent;font-size:.82rem}
      .md-modal-body blockquote{border-left:3px solid var(--accent,#d97757);padding-left:1rem;color:var(--fg-2,#5e5d57);margin:.85em 0;font-style:italic}
      .md-modal-body a{color:var(--accent-2,#cc785c);text-decoration:underline}
      .md-modal-body table{border-collapse:collapse;margin:.85em 0;width:100%}
      .md-modal-body th,.md-modal-body td{border:1px solid var(--border,#e8e5d8);padding:.45rem .7rem;text-align:left}
      .md-modal-body th{background:var(--surface-2,#f4f1e8)}
      .md-modal-body img{max-width:100%;border-radius:6px}
      .md-modal-body strong{color:var(--fg,#1a1a1a)}
      .md-modal-body .loading{color:var(--fg-3,#8b8a82);text-align:center;padding:3rem 0}
      @keyframes mdFade{from{opacity:0}to{opacity:1}}
      @keyframes mdSlide{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
    `;
    document.head.appendChild(s);
  }

  const overlay = document.createElement('div');
  overlay.className = 'md-modal-overlay';
  overlay.innerHTML = `
    <div class="md-modal" role="dialog" aria-modal="true" aria-labelledby="md-modal-title">
      <div class="md-modal-head">
        <div class="md-modal-title" id="md-modal-title">…</div>
        <a class="md-modal-close" id="md-modal-raw" title="原始 Markdown" target="_blank">↗</a>
        <button class="md-modal-close" id="md-modal-x" aria-label="关闭">✕</button>
      </div>
      <div class="md-modal-body" id="md-modal-body"><div class="loading">加载中…</div></div>
    </div>`;
  document.body.appendChild(overlay);
  const titleEl = overlay.querySelector('#md-modal-title');
  const bodyEl = overlay.querySelector('#md-modal-body');
  const rawEl = overlay.querySelector('#md-modal-raw');
  const closeBtn = overlay.querySelector('#md-modal-x');

  function close(){ overlay.classList.remove('open'); document.body.style.overflow=''; }
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target===overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key==='Escape') close(); });

  async function open(url, title){
    titleEl.textContent = title || url.split('/').pop();
    rawEl.href = url;
    bodyEl.innerHTML = '<div class="loading">加载中…</div>';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(r.status + ' ' + r.statusText);
      const md = await r.text();
      // marked.js loaded as global (UMD)
      if (typeof marked === 'undefined') {
        bodyEl.innerHTML = '<pre>'+md.replace(/[<&>]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]))+'</pre>';
      } else {
        marked.setOptions({gfm:true, breaks:false});
        bodyEl.innerHTML = marked.parse(md);
      }
    } catch (e) {
      bodyEl.innerHTML = '<div class="loading">加载失败: '+e.message+'</div>';
    }
  }

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href$=".md"]');
    if (!a) return;
    if (a.target === '_blank') return;          // explicit new tab — let through
    if (e.metaKey || e.ctrlKey) return;        // user wants new tab
    if (a.hasAttribute('data-no-modal')) return;
    e.preventDefault();
    open(a.getAttribute('href'), a.textContent.trim());
  });
})();
