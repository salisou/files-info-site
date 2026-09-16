/*
 * MS Academy - VS Code style course editor.
 * Monaco is the editor engine behind VS Code. A textarea fallback is kept
 * so the course remains usable if the CDN is unavailable.
 */
(function(){
  'use strict';
  const MONACO_VERSION='0.52.2'; let monacoPromise=null;

  function courseInfo(){
    const path=location.pathname.toLowerCase();
    const query=new URLSearchParams(location.search);
    const selected=(query.get('lang')||'').toLowerCase();
    let lang='plaintext',file='main.txt';
    const set=(l,f)=>{lang=l;file=f;};
    if(path.includes('sqlserver')) set('sql','main.sql');
    else if(path.includes('tkinter')) set('python','main.py');
    else if(path.includes('python_data')) set('python','main.py');
    else if(path.includes('blazor')) set('razor','Main.razor');
    else if(path.includes('maui')) set('xml','MainPage.xaml');
    else if(path.includes('aspnet')) set('csharp','Program.cs');
    else if(path.includes('dotnet')||path.includes('csharp')) set('csharp','Program.cs');
    else if(path.includes('php')) set('php','index.php');
    else if(path.includes('javascript')) set('javascript','main.js');
    else if(path.includes('typescript')) set('typescript','main.ts');
    else if(path.includes('python')) set('python','main.py');
    else if(path.includes('java')) set('java','Main.java');
    else if(path.includes('cpp')) set('cpp','main.cpp');
    else if(path.includes('/corso_c')) set('c','main.c');
    else if(path.includes('go')) set('go','main.go');
    else if(path.includes('rust')) set('rust','main.rs');
    else if(path.includes('kotlin')) set('kotlin','Main.kt');
    else if(path.includes('swift')) set('swift','main.swift');
    else if(path.includes('css')) set('css','style.css');
    else if(path.includes('html')) set('html','index.html');
    if(path.includes('corso_language')&&selected){
      const map={html:['html','index.html'],css:['css','style.css'],javascript:['javascript','main.js'],typescript:['typescript','main.ts'],python:['python','main.py'],sql:['sql','main.sql'],c:['c','main.c'],cpp:['cpp','main.cpp'],csharp:['csharp','Program.cs'],java:['java','Main.java'],php:['php','index.php'],go:['go','main.go'],rust:['rust','main.rs'],kotlin:['kotlin','Main.kt'],swift:['swift','main.swift']};
      if(map[selected]) set(map[selected][0],map[selected][1]);
    }
    return {lang,file};
  }

  function loadMonaco(){
    if(window.monaco?.editor)return Promise.resolve(window.monaco);
    if(monacoPromise)return monacoPromise;
    monacoPromise=new Promise((resolve,reject)=>{
      const finish=()=>{if(!window.require)return reject(new Error('loader'));window.require.config({paths:{vs:`https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_VERSION}/min/vs`}});window.require(['vs/editor/editor.main'],()=>window.monaco?resolve(window.monaco):reject(new Error('monaco')),reject)};
      const s=document.createElement('script');s.src=`https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_VERSION}/min/vs/loader.js`;s.onload=finish;s.onerror=()=>reject(new Error('cdn'));document.head.appendChild(s);
    });return monacoPromise;
  }
  function esc(v){return String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]||c));}
  function sourceFromLab(lab){
    const pre=lab.querySelector('pre.code-block code');if(pre)return pre.textContent||'';
    const iframe=lab.querySelector('iframe');if(iframe){try{const u=new URL(iframe.src,location.href);const c=u.searchParams.get('code');if(c)return c;}catch(e){}}
    return '// Scrivi qui il codice della lezione.\n';
  }
  function key(source){return `moussa-vscode-editor:${location.pathname}:${location.search}:${source.slice(0,120)}`;}
  function runnable(lang){return ['html','css','javascript'].includes(lang);}
  function runLocal(lang,code,frame){
    if(!frame)return;let html=code;
    if(lang==='css')html=`<!doctype html><html lang="it"><head><meta charset="utf-8"><style>${code}</style></head><body><main class="demo"><h1>Anteprima CSS</h1><p>Modifica il CSS e premi Esegui.</p><div class="card">Elemento di esempio</div><button>Prova</button></main></body></html>`;
    if(lang==='javascript')html=`<!doctype html><html lang="it"><body><pre id="output"></pre><script>const o=document.getElementById('output');const l=console.log;console.log=(...a)=>{o.textContent+=a.join(' ')+'\\n';l(...a)};try{${code}}catch(e){o.textContent+='Errore: '+e.message}</script></body></html>`;
    frame.srcdoc=html;frame.hidden=false;
  }
  function enhanceLab(lab){
    if(lab.dataset.vscodeEnhanced==='1')return;lab.dataset.vscodeEnhanced='1';
    const info=courseInfo(),initial=sourceFromLab(lab),saved=localStorage.getItem(key(initial));
    const wrap=document.createElement('section');wrap.className='vscode-course-editor';
    wrap.innerHTML=`<div class="vscode-titlebar"><span class="vscode-dot"></span><span class="vscode-brand">MS Code</span><span class="vscode-subtitle">Editor della lezione</span><button type="button" class="vscode-action" data-action="fullscreen">Schermo intero</button></div><div class="vscode-tabs"><div class="vscode-tab active"><span class="vscode-file-icon">●</span>${esc(info.file)}<span class="vscode-close">×</span></div></div><div class="vscode-toolbar"><button type="button" data-action="run">▶ Esegui</button><button type="button" data-action="save">Salva</button><button type="button" data-action="copy">Copia</button><button type="button" data-action="download">Scarica</button><button type="button" data-action="reset">Ripristina</button><span class="vscode-hint">Ctrl+S salva · Ctrl+Enter esegue</span></div><div class="vscode-editor-host"></div><div class="vscode-preview-panel" hidden><div class="vscode-preview-title">Anteprima</div><iframe sandbox="allow-scripts" title="Anteprima del codice"></iframe></div><div class="vscode-statusbar"><span class="vscode-position">Ln 1, Col 1</span><span class="vscode-status-message">Caricamento...</span><span>${esc(info.lang)}</span><span>UTF-8</span></div>`;
    const pre=lab.querySelector('pre.code-block');const iframe=lab.querySelector('iframe');if(pre)pre.replaceWith(wrap);else if(iframe)lab.insertBefore(wrap,iframe);else lab.appendChild(wrap);
    const host=wrap.querySelector('.vscode-editor-host'),frame=wrap.querySelector('.vscode-preview-panel iframe'),status=wrap.querySelector('.vscode-status-message'),position=wrap.querySelector('.vscode-position');let editor=null;
    const value=saved!==null?saved:initial;
    const get=()=>editor?editor.getValue():(host.querySelector('textarea')?.value||value);
    const setStatus=t=>status.textContent=t;
    const save=()=>{localStorage.setItem(key(initial),get());setStatus('Salvato nel browser.');};
    const copy=()=>navigator.clipboard?.writeText(get()).then(()=>setStatus('Codice copiato.')).catch(()=>setStatus('Copia manuale necessaria.'));
    const reset=()=>{localStorage.removeItem(key(initial));if(editor)editor.setValue(initial);else host.querySelector('textarea').value=initial;setStatus('Esempio originale ripristinato.');};
    const download=()=>{const u=URL.createObjectURL(new Blob([get()],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download=info.file;a.click();URL.revokeObjectURL(u);setStatus(`${info.file} scaricato.`);};
    const run=()=>{if(runnable(info.lang)){runLocal(info.lang,get(),frame);setStatus('Eseguito nell’anteprima sicura.');}else setStatus('Codice pronto. Usa l’ambiente indicato nella lezione per l’esecuzione.');};
    wrap.addEventListener('click',e=>{const a=e.target.dataset.action;if(a==='save')save();else if(a==='copy')copy();else if(a==='reset')reset();else if(a==='download')download();else if(a==='run')run();else if(a==='fullscreen')wrap.classList.toggle('vscode-fullscreen');});
    loadMonaco().then(monaco=>{editor=monaco.editor.create(host,{value,language:info.lang,theme:'vs-dark',automaticLayout:true,fontSize:14,lineHeight:22,minimap:{enabled:true},wordWrap:'off',tabSize:4,insertSpaces:true,scrollBeyondLastLine:false,renderWhitespace:'selection',smoothScrolling:true,quickSuggestions:true,suggestOnTriggerCharacters:true,padding:{top:12,bottom:12}});editor.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.KeyS,save);editor.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.Enter,run);editor.onDidChangeCursorPosition(e=>position.textContent=`Ln ${e.position.lineNumber}, Col ${e.position.column}`);setStatus('Monaco Editor pronto.');}).catch(()=>{const ta=document.createElement('textarea');ta.className='vscode-fallback';ta.spellcheck=false;ta.value=value;host.appendChild(ta);setStatus('Editor base attivo.');});
  }
  function enhance(root){root.querySelectorAll('.lab').forEach(enhanceLab);}
  function start(){enhance(document);new MutationObserver(()=>enhance(document)).observe(document.body,{childList:true,subtree:true});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
