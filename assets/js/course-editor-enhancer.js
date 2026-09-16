/*
 * MS Academy - VS Code style course editor.
 * Uses Monaco Editor (the editor engine behind VS Code) from a public CDN.
 * Falls back to a textarea when the CDN is unavailable.
 */
(function(){
  'use strict';

  const MONACO_VERSION = '0.52.2';
  let monacoPromise = null;

  function courseInfo(){
    const path = location.pathname.toLowerCase();
    let lang = 'plaintext';
    let file = 'main.txt';
    if(path.includes('sqlserver') || path.includes('corso_sqlserver')) { lang='sql'; file='main.sql'; }
    else if(path.includes('tkinter')) { lang='python'; file='main.py'; }
    else if(path.includes('python_data')) { lang='python'; file='main.py'; }
    else if(path.includes('blazor')) { lang='razor'; file='Main.razor'; }
    else if(path.includes('maui')) { lang='xml'; file='MainPage.xaml'; }
    else if(path.includes('aspnet')) { lang='csharp'; file='Program.cs'; }
    else if(path.includes('dotnet') || path.includes('csharp')) { lang='csharp'; file='Program.cs'; }
    else if(path.includes('php')) { lang='php'; file='index.php'; }
    else if(path.includes('javascript')) { lang='javascript'; file='main.js'; }
    else if(path.includes('typescript')) { lang='typescript'; file='main.ts'; }
    else if(path.includes('python')) { lang='python'; file='main.py'; }
    else if(path.includes('java')) { lang='java'; file='Main.java'; }
    else if(path.includes('cpp')) { lang='cpp'; file='main.cpp'; }
    else if(path.includes('/corso_c')) { lang='c'; file='main.c'; }
    else if(path.includes('go')) { lang='go'; file='main.go'; }
    else if(path.includes('rust')) { lang='rust'; file='main.rs'; }
    else if(path.includes('kotlin')) { lang='kotlin'; file='Main.kt'; }
    else if(path.includes('swift')) { lang='swift'; file='main.swift'; }
    else if(path.includes('css')) { lang='css'; file='style.css'; }
    else if(path.includes('html')) { lang='html'; file='index.html'; }
    return {lang,file};
  }

  function loadMonaco(){
    if(window.monaco?.editor) return Promise.resolve(window.monaco);
    if(monacoPromise) return monacoPromise;
    monacoPromise = new Promise((resolve,reject)=>{
      const finish=()=>{
        if(!window.require) return reject(new Error('Monaco loader non disponibile'));
        window.require.config({paths:{vs:`https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_VERSION}/min/vs`}});
        window.require(['vs/editor/editor.main'],()=>window.monaco ? resolve(window.monaco) : reject(new Error('Monaco non disponibile')),reject);
      };
      const script=document.createElement('script');
      script.src=`https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_VERSION}/min/vs/loader.js`;
      script.onload=finish;
      script.onerror=()=>reject(new Error('Impossibile caricare Monaco Editor'));
      document.head.appendChild(script);
    });
    return monacoPromise;
  }

  function escapeHtml(value){
    return String(value ?? '').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]||c));
  }

  function sourceFromLab(lab){
    const pre=lab.querySelector('pre.code-block code');
    if(pre) return pre.textContent || '';
    const iframe=lab.querySelector('iframe');
    if(iframe){
      try{
        const url=new URL(iframe.src,location.href);
        const value=url.searchParams.get('code');
        if(value) return value;
      }catch(e){}
    }
    return '// Scrivi qui il codice della lezione.\n';
  }

  function storageKey(source){
    return `moussa-vscode-editor:${location.pathname}:${source.slice(0,120)}`;
  }

  function canRunLocal(lang){return ['html','css','javascript'].includes(lang);}

  function runLocal(lang,code,preview){
    if(!preview) return;
    let html=code;
    if(lang==='css') html=`<!doctype html><html lang="it"><head><meta charset="utf-8"><style>${code}</style></head><body><main class="demo"><h1>Anteprima CSS</h1><p>Modifica il CSS e premi Esegui.</p><div class="card">Elemento di esempio</div><button>Prova</button></main></body></html>`;
    if(lang==='javascript') html=`<!doctype html><html lang="it"><body><pre id="output"></pre><script>const out=document.getElementById('output'); const oldLog=console.log; console.log=(...a)=>{out.textContent+=a.join(' ')+'\\n';oldLog(...a)}; try{${code}}catch(e){out.textContent+='Errore: '+e.message}</script></body></html>`;
    preview.srcdoc=html;
    preview.hidden=false;
  }

  function enhanceLab(lab,index){
    if(lab.dataset.vscodeEnhanced==='1') return;
    lab.dataset.vscodeEnhanced='1';
    const info=courseInfo();
    const initial=sourceFromLab(lab);
    const key=storageKey(initial);
    const editorWrap=document.createElement('section');
    editorWrap.className='vscode-course-editor';
    editorWrap.innerHTML=`
      <div class="vscode-titlebar">
        <span class="vscode-dot"></span><span class="vscode-brand">MS Code</span>
        <span class="vscode-subtitle">Editor della lezione</span>
        <button type="button" class="vscode-action" data-action="fullscreen">Schermo intero</button>
      </div>
      <div class="vscode-tabs"><div class="vscode-tab active"><span class="vscode-file-icon">●</span>${escapeHtml(info.file)}<span class="vscode-close">×</span></div></div>
      <div class="vscode-toolbar">
        <button type="button" data-action="run">▶ Esegui</button>
        <button type="button" data-action="save">Salva</button>
        <button type="button" data-action="copy">Copia</button>
        <button type="button" data-action="download">Scarica</button>
        <button type="button" data-action="reset">Ripristina</button>
        <span class="vscode-hint">Ctrl+S salva · Ctrl+Enter esegue</span>
      </div>
      <div class="vscode-editor-host"></div>
      <div class="vscode-preview-panel" hidden><div class="vscode-preview-title">Anteprima</div><iframe sandbox="allow-scripts" title="Anteprima del codice"></iframe></div>
      <div class="vscode-statusbar"><span>Ln 1, Col 1</span><span class="vscode-status-message">Pronto</span><span>${escapeHtml(info.lang)}</span><span>UTF-8</span></div>`;

    const oldPre=lab.querySelector('pre.code-block');
    if(oldPre) oldPre.replaceWith(editorWrap);
    else {
      const iframe=lab.querySelector('iframe');
      if(iframe) lab.insertBefore(editorWrap,iframe);
      else lab.appendChild(editorWrap);
    }

    const host=editorWrap.querySelector('.vscode-editor-host');
    const preview=editorWrap.querySelector('.vscode-preview-panel iframe');
    const status=editorWrap.querySelector('.vscode-status-message');
    const saved=localStorage.getItem(key);
    const value=saved!==null?saved:initial;
    let editor=null;

    function getValue(){return editor ? editor.getValue() : host.querySelector('textarea')?.value || value;}
    function setStatus(text){status.textContent=text;}
    function download(){
      const blob=new Blob([getValue()],{type:'text/plain;charset=utf-8'});
      const url=URL.createObjectURL(blob); const a=document.createElement('a');
      a.href=url; a.download=info.file; a.click(); URL.revokeObjectURL(url); setStatus(`${info.file} scaricato.`);
    }
    function save(){localStorage.setItem(key,getValue());setStatus('Salvato nel browser.');}
    function copy(){navigator.clipboard?.writeText(getValue()).then(()=>setStatus('Codice copiato.')).catch(()=>setStatus('Copia manuale necessaria.'));}
    function reset(){localStorage.removeItem(key);if(editor) editor.setValue(initial);else host.querySelector('textarea').value=initial;setStatus('Esempio originale ripristinato.');}
    function run(){
      if(canRunLocal(info.lang)){runLocal(info.lang,getValue(),preview);setStatus('Eseguito nell’anteprima sicura.');}
      else setStatus('Modifica pronta. Per eseguire questo linguaggio usa il laboratorio/ambiente indicato nella lezione.');
    }

    function bindActions(){
      editorWrap.addEventListener('click',e=>{
        const action=e.target.dataset.action;if(!action)return;
        if(action==='save')save(); if(action==='copy')copy(); if(action==='download')download(); if(action==='reset')reset(); if(action==='run')run();
        if(action==='fullscreen')editorWrap.classList.toggle('vscode-fullscreen');
      });
    }

    loadMonaco().then(monaco=>{
      editor=monaco.editor.create(host,{value,language:info.lang,theme:'vs-dark',automaticLayout:true,fontSize:14,lineHeight:22,minimap:{enabled:true},wordWrap:'off',tabSize:4,insertSpaces:true,scrollBeyondLastLine:false,renderWhitespace:'selection',smoothScrolling:true,quickSuggestions:true,suggestOnTriggerCharacters:true,padding:{top:12,bottom:12}});
      editor.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.KeyS,save);
      editor.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.Enter,run);
      editor.onDidChangeCursorPosition(e=>status.parentElement.firstElementChild.textContent=`Ln ${e.position.lineNumber}, Col ${e.position.column}`);
      setStatus('Monaco Editor pronto.');
    }).catch(()=>{
      const ta=document.createElement('textarea'); ta.className='vscode-fallback'; ta.spellcheck=false; ta.value=value; host.appendChild(ta); setStatus('Editor base attivo. Monaco non è stato caricato.');
    });
    bindActions();
  }

  function enhance(root){
    root.querySelectorAll('.lab').forEach((lab,index)=>enhanceLab(lab,index));
  }

  function start(){
    enhance(document);
    const observer=new MutationObserver(()=>enhance(document));
    observer.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
