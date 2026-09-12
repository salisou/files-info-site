/*
 * Reference-course editor enhancement.
 * Gives SQL Server, Tkinter, Blazor, MAUI, ASP.NET and other local labs
 * a small Visual-Studio-style editor even when browser execution is not safe.
 */
(function(){
  'use strict';

  function editorFile(){
    const path = location.pathname.toLowerCase();
    if(path.includes('sqlserver')) return 'main.sql';
    if(path.includes('python')) return 'main.py';
    if(path.includes('blazor')) return 'Main.razor';
    if(path.includes('maui')) return 'MainPage.xaml';
    if(path.includes('aspnet')) return 'Program.cs';
    return 'main.txt';
  }

  function enhance(root){
    root.querySelectorAll('.lab-reference').forEach(lab => {
      if(lab.dataset.editorEnhanced === '1') return;
      const pre = lab.querySelector('pre.code-block');
      if(!pre) return;
      const code = pre.querySelector('code');
      if(!code) return;

      const initial = code.textContent || '';
      const fileName = editorFile();
      const editor = document.createElement('div');
      editor.className = 'local-editor';
      editor.innerHTML = `
        <div class="local-editor-toolbar">
          <span class="local-editor-title">Editor locale</span>
          <span class="local-editor-file">${fileName}</span>
          <button type="button" data-editor-action="copy">Copia</button>
          <button type="button" data-editor-action="save">Salva</button>
          <button type="button" data-editor-action="download">Scarica</button>
          <button type="button" data-editor-action="reset">Ripristina</button>
        </div>
        <textarea class="local-editor-input" spellcheck="false" aria-label="Editor del codice"></textarea>
        <div class="local-editor-status" aria-live="polite">Puoi scrivere, modificare e salvare il codice sul tuo dispositivo.</div>`;
      const textarea = editor.querySelector('textarea');
      textarea.value = initial;
      pre.replaceWith(editor);
      lab.dataset.editorEnhanced = '1';

      const status = editor.querySelector('.local-editor-status');
      const storageKey = `moussa-editor:${location.pathname}:${initial.slice(0,80)}`;
      const saved = localStorage.getItem(storageKey);
      if(saved !== null) textarea.value = saved;

      function setStatus(message){ status.textContent = message; }
      editor.addEventListener('click', event => {
        const action = event.target.dataset.editorAction;
        if(!action) return;
        if(action === 'copy'){
          navigator.clipboard?.writeText(textarea.value).then(() => setStatus('Codice copiato negli appunti.')).catch(() => setStatus('Seleziona il codice e copialo manualmente.'));
        }
        if(action === 'save'){
          localStorage.setItem(storageKey, textarea.value);
          setStatus('Codice salvato localmente nel browser.');
        }
        if(action === 'reset'){
          textarea.value = initial;
          localStorage.removeItem(storageKey);
          setStatus('Esempio originale ripristinato.');
        }
        if(action === 'download'){
          const isSql = /sqlserver|sql/i.test(location.pathname);
          const ext = isSql ? 'sql' : 'txt';
          const blob = new Blob([textarea.value], {type:'text/plain;charset=utf-8'});
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = isSql ? 'esercizio.sql' : `esercizio-${fileName.replace(/[^a-z0-9.]/gi,'_')}`;
          a.click();
          URL.revokeObjectURL(url);
          setStatus(`File ${ext.toUpperCase()} scaricato.`);
        }
      });
    });
  }

  const observer = new MutationObserver(() => enhance(document));
  function start(){
    enhance(document);
    observer.observe(document.body, {childList:true, subtree:true});
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
