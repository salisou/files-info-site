(function(){
  'use strict';

  const languageCourses = window.MOUSSA_LANGUAGE_COURSES || {};
  const content = window.MOUSSA_COURSE_CONTENT || null;
  const frameworkCourses = {
    blazor:{title:'Blazor Completo',lang:'csharp',labMode:'reference',topics:['Introduzione a Blazor','Struttura progetto','Razor syntax','Componenti','Parametri','Eventi','Data binding','Cicli e condizioni','RenderFragment','Component lifecycle','Routing','Layout e navigazione','Form','EditForm','Validazione','HttpClient','Chiamate REST','JSON e DTO','Dependency Injection','Servizi','State management','Authentication','Authorization','Error handling','Logging','Configuration','JavaScript interop','Performance','Testing','Progetto finale Blazor']},
    maui:{title:'.NET MAUI Completo',lang:'csharp',labMode:'reference',topics:['Introduzione a .NET MAUI','Struttura progetto','XAML','Layout','Label Button Entry','Grid e FlexLayout','Images e Media','Styles e Resources','Data binding','Commands','MVVM','Navigation','Shell','CollectionView','Form e validazione','Dependency Injection','HttpClient','REST API','JSON','SQLite','SecureStorage','Preferences','Permissions','Platform APIs','Lifecycle','Handlers','Performance','Testing','Publishing','Progetto finale MAUI']},
    aspnet:{title:'ASP.NET Core Web API Completo',lang:'csharp',labMode:'reference',topics:['Introduzione a REST e HTTP','Struttura progetto','Minimal API e Controller','Routing','HTTP methods','Model binding','DTO','Validation','Status codes','Middleware','Dependency Injection','Configuration','Logging','EF Core','DbContext','Migrations','CRUD','Relationships','LINQ','Pagination e filtering','Authentication','JWT','Authorization','CORS','Swagger/OpenAPI','Error handling','Caching','Testing','Deployment','Progetto finale API']},
    tkinter:{title:'Python & Tkinter Completo',lang:'tkinter',labMode:'reference',topics:['Introduzione a Tkinter','Prima finestra','Label e Button','Entry','Frame','Pack','Grid','Place','Eventi','Command e callback','StringVar e IntVar','Checkbutton e Radiobutton','Listbox e Combobox','ttk','Treeview','Menu e dialog','Messagebox','Canvas','Toplevel','Layout responsive','Validazione form','File e JSON','SQLite','CRUD','Architettura MVC','Classi e componenti','Gestione errori','Packaging','Testing','Progetto finale GUI']},
    python_data:{title:'Python Data Analyst Completo',lang:'python',labMode:'reference',topics:['Introduzione alla data analysis','Python per i dati','NumPy arrays','Indexing NumPy','Operazioni vettoriali','Pandas Series','DataFrame','Import CSV','Import Excel','Import JSON','Ispezione dati','Missing values','Cleaning','Duplicati e tipi','String operations','Filtering','Sorting','GroupBy','Aggregation','Merge e join','Pivot e reshape','Date e time series','Matplotlib','Grafici comparativi','Statistiche descrittive','Correlazione','Outlier','Report e storytelling','Export dei risultati','Progetto finale data analysis']},
    sqlserver:{title:'SQL Server Completo',lang:'sqlserver',labMode:'reference',topics:['Introduzione a SQL Server','Database e SSMS','CREATE DATABASE','CREATE TABLE','Data types','PRIMARY KEY','FOREIGN KEY','Constraints','SELECT','WHERE','ORDER BY','DISTINCT','Aggregate functions','GROUP BY','HAVING','INNER JOIN','LEFT JOIN','Subquery','CTE','INSERT','UPDATE','DELETE','MERGE','Views','Stored procedures','Functions','Triggers','Transactions','Indexes e performance','Progetto finale SQL Server']},
    php_web:{title:'PHP Full Stack Completo',lang:'php',labMode:'online',topics:['Introduzione a PHP','Ambiente e server web','Sintassi','Variabili e tipi','Operatori','Condizioni','switch','Cicli','Funzioni','Arrays','Stringhe','Forms','GET e POST','Validazione','Files','JSON','Cookies','Sessions','OOP','Inheritance','Interfaces','Exceptions','PDO','Prepared statements','CRUD','Authentication','Security','API JSON','Composer e MVC','Progetto finale PHP']},
    csharp_net:{title:'C# & .NET Completo',lang:'csharp',labMode:'online',topics:['Introduzione a C# e .NET','dotnet CLI e progetto','Variabili e tipi','Stringhe','Operatori','if','switch','Cicli','Metodi','Parametri','Array','List','Dictionary','Classi','Properties','Constructors','Encapsulation','Inheritance','Interfaces','Polymorphism','Generics','LINQ','Exceptions','Files','JSON','Delegates e events','Lambda','Async/await','HTTP e API','Dependency Injection','Progetto finale .NET']}
  };

  const runnable = new Set(['html','javascript','typescript','python','c','cpp','csharp','java','php','go','rust','kotlin','swift']);

  function escapeHtml(value){
    return String(value ?? '').replace(/[&<>\"]/g, function(char){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char] || char;
    });
  }

  function getCourse(){
    const path=location.pathname.toLowerCase();
    for(const [key,course] of Object.entries(languageCourses)) if(path.includes(`/corso_${key}`)) return {...course,key};
    for(const [key,course] of Object.entries(frameworkCourses)) if(path.includes(`/corso_${key}`)) return {...course,key};
    return null;
  }

  function makeLessons(course){
    if(Array.isArray(course.lessons)&&course.lessons.length) return course.lessons;
    if(content&&typeof content.build==='function') return content.build(course,course.key);
    return (course.topics||[]).map(topic=>({title:topic,explain:`Lezione dedicata a ${topic}.`,syntax:'Studia il concetto e prova l’esempio.',goals:[`Comprendere ${topic}`,`Applicare ${topic}`],code:'',second:'',lineByLine:'Esegui e osserva il risultato.',realExample:'Trasforma il concetto in una piccola funzionalità.',exercise:`Crea un esempio su ${topic}.`,solution:'',mistakes:['Leggi il messaggio di errore.'],quiz:[],challenge:`Estendi l’esercizio su ${topic}.`,difficulty:'Fondamentale'}));
  }

  function online(course){return course.labMode==='online'||(!course.labMode&&runnable.has(course.lang));}
  function compilerLanguage(course){
    const aliases={js:'javascript',py:'python',csharp:'csharp',cpp:'cpp'};
    return aliases[course.lang]||course.lang;
  }
  function labCode(course,code){
    if(course.lang==='css') return `<!doctype html><html><head><style>${code}</style></head><body><main><h1>CSS Lab</h1><p>Modifica il CSS nell’editor e premi Run.</p><div class="card">Anteprima</div></main></body></html>`;
    return code;
  }
  function labFileName(lang){
    return ({python:'main.py',javascript:'main.js',typescript:'main.ts',php:'index.php',csharp:'Program.cs',java:'Main.java',go:'main.go',rust:'main.rs',kotlin:'Main.kt',swift:'main.swift',c:'main.c',cpp:'main.cpp',html:'index.html'})[lang]||'main.txt';
  }

  function labMarkup(course,lesson,index){
    if(!online(course)) return `<section class="lab lab-reference"><div class="lab-head"><div><span class="lab-kicker">Laboratorio</span><h3>Ambiente locale</h3><p>Questa tecnologia richiede il proprio runtime o framework. Usa il codice come base e segui la configurazione indicata nel corso.</p></div></div><pre><code>${escapeHtml(lesson.code||'')}</code></pre></section>`;
    const lang=compilerLanguage(course);
    const src=`https://onecompiler.com/embed/${encodeURIComponent(lang)}?listenToEvents=true&codeChangeEvent=true&hideTitle=true`;
    return `<section class="lab"><div class="lab-head"><div><span class="lab-kicker">Laboratorio interattivo</span><h3>Scrivi, modifica ed esegui</h3><p>Puoi modificare l’esempio direttamente nell’editor e usare Run per vedere l’output.</p></div><div class="lab-actions"><button type="button" class="lab-load" data-index="${index}">Carica esempio</button><button type="button" class="lab-run" data-index="${index}">Esegui codice</button></div></div><iframe id="oc-editor" title="Editor online ${escapeHtml(course.title)}" src="${src}" loading="lazy" allow="clipboard-read; clipboard-write"></iframe><p class="lab-status" id="labStatus" aria-live="polite">Editor pronto.</p></section>`;
  }

  function start(){
    const base=getCourse(); if(!base) return;
    const course={...base,lessons:makeLessons(base)};
    document.body.innerHTML=`<div class="course-shell"><header class="course-header"><a href="/courses/" class="brand">MS Academy</a><div class="course-heading"><span class="eyebrow">Percorso di studio</span><h1>${escapeHtml(course.title)}</h1><p id="courseSummary"></p></div><a href="/courses/" class="back">Tutti i corsi</a></header><div class="course-grid"><aside class="course-sidebar"><div class="sidebar-progress"><strong>Il tuo progresso</strong><span id="sidebarProgress">0%</span><div class="progress"><i id="sidebarProgressBar" style="width:0%"></i></div></div><label for="courseSearch" class="sr-only">Cerca una lezione</label><input id="courseSearch" placeholder="Cerca una lezione..." autocomplete="off"><div id="lessonList"></div></aside><main id="lesson" tabindex="-1"></main></div></div>`;

    const stateKey=`course:${course.key}:current`,completedKey=`course:${course.key}:completed`,notesKey=`course:${course.key}:notes`;
    let index=Number(localStorage.getItem(stateKey)||0);
    let completed=JSON.parse(localStorage.getItem(completedKey)||'[]');
    let notes=JSON.parse(localStorage.getItem(notesKey)||'{}');
    if(!Number.isInteger(index)||index<0||index>=course.lessons.length) index=0;
    if(!Array.isArray(completed)) completed=[];
    if(!notes||typeof notes!=='object'||Array.isArray(notes)) notes={};
    const list=document.querySelector('#lessonList'),main=document.querySelector('#lesson');

    function save(){localStorage.setItem(stateKey,String(index));localStorage.setItem(completedKey,JSON.stringify(completed));localStorage.setItem(notesKey,JSON.stringify(notes));}
    function progress(){const p=course.lessons.length?Math.round(completed.length/course.lessons.length*100):0;document.querySelector('#sidebarProgress').textContent=`${p}%`;document.querySelector('#sidebarProgressBar').style.width=`${p}%`;document.querySelector('#courseSummary').textContent=`${course.lessons.length} lezioni · teoria · esempi · esercizi · soluzioni · quiz · ${online(course)?'esecuzione online':'laboratorio locale'}`;}
    function complete(){if(!completed.includes(index)) completed.push(index);completed.sort((a,b)=>a-b);save();render();}
    function choose(i){index=i;save();render();main.focus();}

    function render(){
      const lesson=course.lessons[index]||{}; const done=completed.includes(index); const p=Math.round((index+1)/course.lessons.length*100);
      list.innerHTML=course.lessons.map((x,i)=>`<button class="lesson-link ${i===index?'active':''} ${completed.includes(i)?'completed':''}" data-i="${i}" aria-current="${i===index?'step':'false'}"><span>${completed.includes(i)?'✓':String(i+1).padStart(2,'0')}</span>${escapeHtml(x.title)}</button>`).join('');
      const quiz=(lesson.quiz||[]).map((q,qi)=>`<div class="q" data-q="${qi}"><p><strong>${qi+1}. ${escapeHtml(q.q||'')}</strong></p><div class="quiz-options">${(q.opts||[]).map((o,oi)=>`<button type="button" data-a="${oi}">${escapeHtml(o)}</button>`).join('')}</div><p class="quiz-feedback" aria-live="polite"></p></div>`).join('');
      main.innerHTML=`<div class="lesson-head"><span>Lezione ${index+1} di ${course.lessons.length} · ${escapeHtml(lesson.difficulty||'Percorso')}</span><div class="progress"><i style="width:${p}%"></i></div></div><article class="lesson-card"><div class="lesson-status"><span class="lesson-badge">${done?'Completata':'In corso'}</span><button type="button" id="completeLesson" class="complete-btn" ${done?'disabled':''}>${done?'Lezione completata':'Segna lezione come completata'}</button></div><h2>${escapeHtml(lesson.title)}</h2><p class="lead">${escapeHtml(lesson.explain||'')}</p><section><h3>Sintassi e concetto</h3><p>${escapeHtml(lesson.syntax||'')}</p></section><section><h3>Obiettivi</h3><ul>${(lesson.goals||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section><section class="example-grid"><div><h3>Esempio principale</h3><pre><code>${escapeHtml(lesson.code||'')}</code></pre></div><div><h3>Esempio aggiuntivo</h3><pre><code>${escapeHtml(lesson.second||lesson.code||'')}</code></pre></div></section><section><h3>Spiegazione operativa</h3><pre class="explanation-block">${escapeHtml(lesson.lineByLine||'')}</pre></section><section><h3>Caso reale</h3><p>${escapeHtml(lesson.realExample||'')}</p></section><section class="exercise"><div><span class="lab-kicker">Esercizio pratico</span><h3>Metti in pratica</h3></div><p>${escapeHtml(lesson.exercise||'')}</p><label for="exerciseNotes">La mia soluzione / note</label><textarea id="exerciseNotes" rows="6" placeholder="Scrivi qui la tua soluzione o le tue note...">${escapeHtml(notes[index]||'')}</textarea><div class="exercise-actions"><button type="button" id="saveNotes">Salva esercizio</button><button type="button" id="finishExercise" class="primary">Ho completato l’esercizio</button></div><p id="exerciseStatus" class="exercise-status" aria-live="polite"></p></section><details class="solution"><summary>Mostra soluzione di riferimento</summary><p>Prova prima da solo, poi confronta il risultato.</p><pre><code>${escapeHtml(lesson.solution||lesson.second||lesson.code||'')}</code></pre></details><section class="mistakes"><h3>Errori comuni</h3><ul>${(lesson.mistakes||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section><section class="challenge"><span class="lab-kicker">Mini challenge</span><h3>Vai oltre l’esempio</h3><p>${escapeHtml(lesson.challenge||'')}</p></section>${labMarkup(course,lesson,index)}<section class="quiz"><h3>Verifica rapida</h3>${quiz||'<p>Quiz in preparazione.</p>'}</section><div class="lesson-nav"><button id="prev" ${index===0?'disabled':''}>← Precedente</button><button id="next" ${index===course.lessons.length-1?'disabled':''}>Successiva →</button></div></article>`;

      document.querySelectorAll('.lesson-link').forEach(b=>b.onclick=()=>choose(Number(b.dataset.i)));
      document.querySelector('#completeLesson')?.addEventListener('click',complete);
      document.querySelector('#prev')?.addEventListener('click',()=>{if(index>0)choose(index-1);});
      document.querySelector('#next')?.addEventListener('click',()=>{if(index<course.lessons.length-1)choose(index+1);});
      document.querySelector('#saveNotes')?.addEventListener('click',()=>{notes[index]=document.querySelector('#exerciseNotes').value;save();document.querySelector('#exerciseStatus').textContent='Esercizio salvato nel browser.';});
      document.querySelector('#finishExercise')?.addEventListener('click',()=>{notes[index]=document.querySelector('#exerciseNotes').value;complete();});
      document.querySelectorAll('.quiz-options button').forEach(btn=>btn.onclick=()=>{const q=btn.closest('.q');const qi=Number(q.dataset.q);const answer=(lesson.quiz||[])[qi]?.answer;const chosen=Number(btn.dataset.a);q.querySelectorAll('button').forEach(x=>x.disabled=true);q.querySelector('.quiz-feedback').textContent=chosen===answer?'Risposta corretta.':'Risposta non corretta. Rileggi la spiegazione e riprova la domanda.';});

      const iframe=document.querySelector('#oc-editor');
      function post(type){if(!iframe?.contentWindow)return;const payload=type==='run'?{eventType:'triggerRun'}:{eventType:'populateCode',language:compilerLanguage(course),files:[{name:labFileName(course.lang),content:labCode(course,lesson.code||'')}]};iframe.contentWindow.postMessage(payload,'*');}
      document.querySelector('.lab-load')?.addEventListener('click',()=>{post('load');const s=document.querySelector('#labStatus');if(s)s.textContent='Esempio caricato nell’editor.';});
      document.querySelector('.lab-run')?.addEventListener('click',()=>{post('run');const s=document.querySelector('#labStatus');if(s)s.textContent='Esecuzione richiesta all’editor.';});
      iframe?.addEventListener('load',()=>post('load'));
      progress();
    }

    document.querySelector('#courseSearch').addEventListener('input',e=>{const term=e.target.value.trim().toLowerCase();document.querySelectorAll('.lesson-link').forEach(b=>{b.hidden=term&&!b.textContent.toLowerCase().includes(term);});});
    render();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();