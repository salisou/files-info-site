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
    return (course.topics||[]).map(topic=>({title:topic,explain:`In questa lezione impari ${topic}.`,syntax:`Studia la sintassi e applica ${topic} nell'esempio.`,goals:[`Comprendere ${topic}`,`Applicare ${topic}`],code:'',second:'',lineByLine:'Esegui l’esempio, osserva ogni istruzione e modifica un valore.',realExample:`Applica ${topic} a studenti, clienti, prodotti o dati reali.`,exercise:`Crea un piccolo programma che utilizzi ${topic}.`,solution:'',mistakes:['Leggi il messaggio di errore prima di modificare il codice.'],quiz:[],challenge:`Estendi l’esercizio aggiungendo una funzionalità collegata a ${topic}.`,difficulty:'Fondamentale'}));
  }

  function groupFor(index,total){
    if(index===total-1) return 'Progetto finale';
    if(index<5) return 'Introduzione';
    if(index<12) return 'Fondamenti';
    if(index<20) return 'Strutture e programmazione';
    return 'Avanzato';
  }

  function online(course){return course.lang==='css'||course.labMode==='online'||(!course.labMode&&runnable.has(course.lang));}
  function compilerLanguage(course){
    if(course.lang==='css') return 'html';
    return ({js:'javascript',py:'python',csharp:'csharp',cpp:'cpp'}[course.lang]||course.lang);
  }
  function labCode(course,code){
    if(course.lang==='css') return `<!doctype html><html lang="it"><head><meta charset="utf-8"><style>${code}</style></head><body><main class="preview"><h1>Anteprima CSS</h1><p>Modifica le regole CSS e premi Run.</p><div class="card">Elemento di esempio</div><button>Prova</button></main></body></html>`;
    return code;
  }
  function labFileName(lang){
    return ({python:'main.py',javascript:'main.js',typescript:'main.ts',php:'index.php',csharp:'Program.cs',java:'Main.java',go:'main.go',rust:'main.rs',kotlin:'Main.kt',swift:'main.swift',c:'main.c',cpp:'main.cpp',html:'index.html'})[lang]||'main.txt';
  }

  function exerciseSet(lesson){
    const topic=lesson.title||'questo argomento';
    return [
      `Esercizio 1 — Riproduci: ricrea l’esempio principale su ${topic} senza copiarlo riga per riga.`,
      `Esercizio 2 — Modifica: cambia almeno due valori dell’esempio e aggiungi una nuova istruzione collegata a ${topic}.`,
      `Esercizio 3 — Applicazione reale: usa ${topic} per gestire un piccolo caso di scuola, clienti, prodotti, ordini o dati.`
    ];
  }

  function quizSet(lesson){
    const base=Array.isArray(lesson.quiz)?lesson.quiz:[];
    const extra=[
      {q:`Qual è il concetto centrale della lezione “${lesson.title}”?`,opts:[lesson.title,'Un argomento completamente diverso','Solo la formattazione del codice','Nessuna delle precedenti'],answer:0},
      {q:`Dopo aver studiato l’esempio di “${lesson.title}”, qual è il passo migliore?`,opts:['Eseguirlo, modificarlo e verificare il risultato','Saltare l’esercizio','Cancellare il codice','Cambiare tecnologia'],answer:0},
      {q:'Quale comportamento aiuta maggiormente a imparare programmazione?',opts:['Capire e modificare gli esempi','Copiare senza eseguire','Ignorare gli errori','Evitare la pratica'],answer:0}
    ];
    return [...base,...extra].slice(0,5);
  }

  function referenceFor(course){
    const map={html:'HTML Elements / Attributes / Forms',css:'CSS Selectors / Properties / Layout',javascript:'JavaScript Reference / DOM / Web APIs',typescript:'TypeScript Handbook / Type System',python:'Python Built-in Functions / Standard Library',sql:'SQL SELECT / JOIN / Aggregate Functions',c:'C standard library / language basics',cpp:'C++ standard library / language basics',csharp:'C# language reference / .NET API',java:'Java API / language documentation',php:'PHP manual / language reference',go:'Go specification / standard library',rust:'Rust Book / standard library',kotlin:'Kotlin language documentation',swift:'Swift language guide'};
    return map[course.lang]||`${course.title} — riferimenti tecnici`;
  }

  function labMarkup(course,lesson,index){
    if(!online(course)) return `<section class="lab lab-reference"><div class="section-kicker">Laboratorio</div><h3>Ambiente locale</h3><p>Questa tecnologia richiede il proprio runtime o framework. Usa l’esempio come base e segui le istruzioni di installazione del corso.</p><pre><code>${escapeHtml(lesson.code||'')}</code></pre></section>`;
    const lang=compilerLanguage(course);
    const src=`https://onecompiler.com/embed/${encodeURIComponent(lang)}?listenToEvents=true&codeChangeEvent=true&hideTitle=true`;
    return `<section class="lab"><div class="lab-head"><div><div class="section-kicker">Try it yourself</div><h3>Modifica ed esegui il codice</h3><p>Prova prima l’esempio, poi cambia una parte del programma e osserva il risultato.</p></div><div class="lab-actions"><button type="button" class="lab-load" data-index="${index}">Carica esempio</button><button type="button" class="lab-run" data-index="${index}">Esegui</button></div></div><iframe id="oc-editor" title="Editor online ${escapeHtml(course.title)}" src="${src}" loading="lazy" allow="clipboard-read; clipboard-write"></iframe><p class="lab-status" id="labStatus" aria-live="polite">Editor pronto.</p></section>`;
  }

  function start(){
    const base=getCourse(); if(!base) return;
    const course={...base,lessons:makeLessons(base)};
    document.body.innerHTML=`<div class="course-shell"><header class="course-header"><a href="/courses/" class="brand">MS Academy</a><div class="course-heading"><span class="eyebrow">Corso completo</span><h1>${escapeHtml(course.title)}</h1><p id="courseSummary"></p></div><a href="/courses/" class="back">Tutti i corsi</a></header><div class="course-grid"><aside class="course-sidebar"><div class="sidebar-progress"><div><strong>Il tuo progresso</strong><span id="sidebarProgress">0%</span></div><div class="progress"><i id="sidebarProgressBar" style="width:0%"></i></div></div><label for="courseSearch" class="sr-only">Cerca nel corso</label><input id="courseSearch" placeholder="Cerca nel corso..." autocomplete="off"><nav id="lessonList" aria-label="Indice del corso"></nav></aside><main id="lesson" tabindex="-1"></main></div></div>`;

    const stateKey=`course:${course.key}:current`,completedKey=`course:${course.key}:completed`,notesKey=`course:${course.key}:notes`;
    let index=Number(localStorage.getItem(stateKey)||0);
    let completed=JSON.parse(localStorage.getItem(completedKey)||'[]');
    let notes=JSON.parse(localStorage.getItem(notesKey)||'{}');
    if(!Number.isInteger(index)||index<0||index>=course.lessons.length) index=0;
    if(!Array.isArray(completed)) completed=[];
    if(!notes||typeof notes!=='object'||Array.isArray(notes)) notes={};
    const list=document.querySelector('#lessonList'),main=document.querySelector('#lesson'),search=document.querySelector('#courseSearch');

    function save(){localStorage.setItem(stateKey,String(index));localStorage.setItem(completedKey,JSON.stringify(completed));localStorage.setItem(notesKey,JSON.stringify(notes));}
    function progress(){const p=course.lessons.length?Math.round(completed.length/course.lessons.length*100):0;document.querySelector('#sidebarProgress').textContent=`${p}%`;document.querySelector('#sidebarProgressBar').style.width=`${p}%`;document.querySelector('#courseSummary').textContent=`${course.lessons.length} lezioni · esempi · Try it · esercizi · quiz · challenge · ${online(course)?'editor online':'laboratorio locale'}`;}
    function complete(){if(!completed.includes(index)) completed.push(index);completed.sort((a,b)=>a-b);save();render();}
    function choose(i){index=i;save();render();window.scrollTo({top:0,behavior:'smooth'});main.focus();}

    function renderSidebar(filter=''){
      const groups={};
      course.lessons.forEach((lesson,i)=>{const group=groupFor(i,course.lessons.length);if(!groups[group])groups[group]=[];groups[group].push({lesson,i});});
      list.innerHTML=Object.entries(groups).map(([group,items])=>{const filtered=items.filter(x=>!filter||x.lesson.title.toLowerCase().includes(filter.toLowerCase()));if(!filtered.length)return '';return `<details class="topic-group" open><summary>${escapeHtml(group)} <span>${filtered.length}</span></summary>${filtered.map(({lesson,i})=>`<button class="lesson-link ${i===index?'active':''} ${completed.includes(i)?'completed':''}" data-i="${i}"><span>${completed.includes(i)?'✓':String(i+1).padStart(2,'0')}</span><em>${escapeHtml(lesson.title)}</em></button>`).join('')}</details>`;}).join('');
      list.querySelectorAll('.lesson-link').forEach(b=>b.onclick=()=>choose(Number(b.dataset.i)));
    }

    function render(){
      const lesson=course.lessons[index]||{}; const done=completed.includes(index); const p=Math.round((index+1)/course.lessons.length*100); const exercises=exerciseSet(lesson); const quiz=quizSet(lesson);
      renderSidebar(search.value||'');
      const quizMarkup=quiz.map((q,qi)=>`<div class="q" data-q="${qi}"><p><strong>${qi+1}. ${escapeHtml(q.q||'')}</strong></p><div class="quiz-options">${(q.opts||[]).map((o,oi)=>`<button type="button" data-a="${oi}">${escapeHtml(o)}</button>`).join('')}</div><p class="quiz-feedback" aria-live="polite"></p></div>`).join('');
      const exerciseMarkup=exercises.map(x=>`<li>${escapeHtml(x)}</li>`).join('');
      main.innerHTML=`<div class="lesson-head"><div><span>Lezione ${index+1} di ${course.lessons.length}</span><strong>${escapeHtml(groupFor(index,course.lessons.length))}</strong></div><div class="progress"><i style="width:${p}%"></i></div></div><article class="lesson-card"><div class="lesson-status"><span class="lesson-badge">${done?'Completata':'In corso'}</span><button type="button" id="completeLesson" class="complete-btn" ${done?'disabled':''}>${done?'Lezione completata':'Segna come completata'}</button></div><h2>${escapeHtml(lesson.title)}</h2><p class="lead">${escapeHtml(lesson.explain||'')}</p><section class="learning-box"><h3>Cosa imparerai</h3><ul>${(lesson.goals||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section><section><h3>Concetto e sintassi</h3><p>${escapeHtml(lesson.syntax||'')}</p></section><section class="example-grid"><div><div class="example-label">Esempio</div><pre><code>${escapeHtml(lesson.code||'')}</code></pre></div><div><div class="example-label">Esempio aggiuntivo</div><pre><code>${escapeHtml(lesson.second||lesson.code||'')}</code></pre></div></section><section class="try-panel"><div class="section-kicker">Prova tu</div><h3>Non limitarti a leggere</h3><p>Modifica l’esempio, cambia i dati e verifica come cambia il risultato.</p></section><section><h3>Spiegazione passo per passo</h3><pre class="explanation-block">${escapeHtml(lesson.lineByLine||'')}</pre></section><section><h3>Esempio nel mondo reale</h3><p>${escapeHtml(lesson.realExample||'')}</p></section><section class="exercise"><div class="section-kicker">Esercizi</div><h3>Metti alla prova quello che hai imparato</h3><ol>${exerciseMarkup}</ol><label for="exerciseNotes">La tua soluzione / note</label><textarea id="exerciseNotes" rows="7" placeholder="Scrivi qui il codice o la soluzione..."></textarea><div class="exercise-actions"><button type="button" id="saveNotes">Salva</button><button type="button" id="finishExercise" class="primary">Completa esercizio</button></div><p id="exerciseStatus" class="exercise-status" aria-live="polite"></p></section><details class="solution"><summary>Mostra soluzione di riferimento</summary><p>Prova prima da solo. Poi confronta la tua soluzione con questa.</p><pre><code>${escapeHtml(lesson.solution||lesson.second||lesson.code||'')}</code></pre></details><section class="mistakes"><h3>Errori comuni</h3><ul>${(lesson.mistakes||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section><section class="challenge"><div class="section-kicker">Challenge</div><h3>Vai oltre l’esempio</h3><p>${escapeHtml(lesson.challenge||'')}</p></section>${labMarkup(course,lesson,index)}<section class="quiz"><div class="section-kicker">Quiz</div><h3>Verifica la comprensione</h3>${quizMarkup}</section><section class="reference-box"><div class="section-kicker">Reference</div><h3>Continua a studiare</h3><p>${escapeHtml(referenceFor(course))}</p><p class="reference-note">La reference serve per approfondire sintassi, proprietà, metodi, API e casi avanzati dopo aver completato la lezione.</p></section><div class="lesson-nav"><button id="prev" ${index===0?'disabled':''}>← Precedente</button><button id="next" ${index===course.lessons.length-1?'disabled':''}>Successiva →</button></div></article>`;

      document.querySelector('#exerciseNotes').value=notes[index]||'';
      document.querySelector('#completeLesson')?.addEventListener('click',complete);
      document.querySelector('#prev')?.addEventListener('click',()=>{if(index>0)choose(index-1);});
      document.querySelector('#next')?.addEventListener('click',()=>{if(index<course.lessons.length-1)choose(index+1);});
      document.querySelector('#saveNotes')?.addEventListener('click',()=>{notes[index]=document.querySelector('#exerciseNotes').value;save();document.querySelector('#exerciseStatus').textContent='Salvato nel browser.';});
      document.querySelector('#finishExercise')?.addEventListener('click',()=>{notes[index]=document.querySelector('#exerciseNotes').value;save();complete();});
      document.querySelectorAll('.quiz-options button').forEach(btn=>btn.onclick=()=>{const q=btn.closest('.q');const qi=Number(q.dataset.q);const answer=quiz[qi]?.answer;const chosen=Number(btn.dataset.a);q.querySelectorAll('button').forEach(x=>x.disabled=true);btn.classList.add(chosen===answer?'correct':'wrong');const feedback=q.querySelector('.quiz-feedback');feedback.textContent=chosen===answer?'Risposta corretta.':'Risposta non corretta. Rileggi la lezione e riprova.';if(chosen!==answer&&q.querySelectorAll('button')[answer])q.querySelectorAll('button')[answer].classList.add('correct');});

      const frame=document.querySelector('#oc-editor');
      if(frame){
        const load=()=>{try{frame.contentWindow.postMessage({eventType:'populateCode',language:compilerLanguage(course),files:[{name:labFileName(course.lang),content:labCode(course,lesson.code||'')}]},'*');}catch(e){}};
        frame.addEventListener('load',load);
        document.querySelector('.lab-load')?.addEventListener('click',()=>{load();document.querySelector('#labStatus').textContent='Esempio caricato nell’editor.';});
        document.querySelector('.lab-run')?.addEventListener('click',()=>{try{frame.contentWindow.postMessage({eventType:'triggerRun'},'*');document.querySelector('#labStatus').textContent='Esecuzione richiesta.';}catch(e){}});
      }
      progress();
    }

    search.addEventListener('input',()=>renderSidebar(search.value));
    render();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
