(() => {
  'use strict';

  const T=(key,fallback)=>typeof window.MOUSSA_T==='function'?window.MOUSSA_T(key):fallback;
  const languageCourses = window.MOUSSA_LANGUAGE_COURSES || {};
  const content = window.MOUSSA_COURSE_CONTENT || null;

  const frameworkCourses = {
    blazor:{title:'Blazor Completo',lang:'csharp',labMode:'reference',topics:['Introduzione a Blazor','Struttura progetto','Razor syntax','Componenti','Parametri','Eventi','Data binding','Cicli e condizioni','RenderFragment','Component lifecycle','Routing','Layout e navigazione','Form','EditForm','Validazione','HttpClient','Chiamate REST','JSON e DTO','Dependency Injection','Servizi','State management','Authentication','Authorization','Error handling','Logging','Configuration','JavaScript interop','Performance','Testing','Progetto finale Blazor']},
    maui:{title:'.NET MAUI Completo',lang:'csharp',labMode:'reference',topics:['Introduzione a .NET MAUI','Struttura progetto','XAML','Layout','Label Button Entry','Grid e FlexLayout','Images e Media','Styles e Resources','Data binding','Commands','MVVM','Navigation','Shell','CollectionView','Form e validazione','Dependency Injection','HttpClient','REST API','JSON','SQLite','SecureStorage','Preferences','Permissions','Platform APIs','Lifecycle','Handlers','Performance','Testing','Publishing','Progetto finale MAUI']},
    aspnet:{title:'ASP.NET Core Web API Completo',lang:'csharp',labMode:'reference',topics:['Introduzione a REST e HTTP','Struttura progetto','Minimal API e Controller','Routing','HTTP methods','Model binding','DTO','Validation','Status codes','Middleware','Dependency Injection','Configuration','Logging','EF Core','DbContext','Migrations','CRUD','Relationships','LINQ','Pagination e filtering','Authentication','JWT','Authorization','CORS','Swagger/OpenAPI','Error handling','Caching','Testing','Deployment','Progetto finale API']},
    tkinter:{title:'Python & Tkinter Completo',lang:'tkinter',labMode:'reference',topics:['Introduzione a Tkinter','Prima finestra','Label e Button','Entry','Frame','Pack','Grid','Place','Eventi','Command e callback','StringVar e IntVar','Checkbutton e Radiobutton','Listbox e Combobox','ttk','Treeview','Menu e dialog','Messagebox','Canvas','Toplevel','Layout responsive','Validazione form','File e JSON','SQLite','CRUD','Architettura MVC','Classi e componenti','Gestione errori','Packaging','Testing','Progetto finale GUI']},
    sqlserver:{title:'SQL Server Completo',lang:'sqlserver',labMode:'reference',topics:['Introduzione a SQL Server','Database e SSMS','CREATE DATABASE','CREATE TABLE','Data types','PRIMARY KEY','FOREIGN KEY','Constraints','SELECT','WHERE','ORDER BY','DISTINCT','Aggregate functions','GROUP BY','HAVING','INNER JOIN','LEFT JOIN','Subquery','CTE','INSERT','UPDATE','DELETE','MERGE','Views','Stored procedures','Functions','Triggers','Transactions','Indexes e performance','Progetto finale SQL Server']},
    php_web:{title:'PHP Full Stack Completo',lang:'php',labMode:'online',topics:['Introduzione a PHP','Ambiente e server web','Sintassi','Variabili e tipi','Operatori','Condizioni','switch','Cicli','Funzioni','Arrays','Stringhe','Forms','GET e POST','Validazione','Files','JSON','Cookies','Sessions','OOP','Inheritance','Interfaces','Exceptions','PDO','Prepared statements','CRUD','Authentication','Security','API JSON','Composer e MVC','Progetto finale PHP']},
    csharp_net:{title:'C# & .NET Completo',lang:'csharp',labMode:'online',topics:['Introduzione a C# e .NET','dotnet CLI e progetto','Variabili e tipi','Stringhe','Operatori','if','switch','Cicli','Metodi','Parametri','Array','List','Dictionary','Classi','Properties','Constructors','Encapsulation','Inheritance','Interfaces','Polymorphism','Generics','LINQ','Exceptions','Files','JSON','Delegates e events','Lambda','Async/await','HTTP e API','Dependency Injection','Progetto finale .NET']}
  };

  const onlineLanguages = new Set(['html','javascript','typescript','python','c','cpp','csharp','java','php','go','rust','kotlin','swift']);

  function escapeHtml(value){
    return String(value ?? '').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c] || c));
  }

  function getCourse(){
    const path=location.pathname.toLowerCase();
    for(const [key,course] of Object.entries(languageCourses)) if(path.includes(`/corso_${key}`)) return {...course,key};
    for(const [key,course] of Object.entries(frameworkCourses)) if(path.includes(`/corso_${key}`)) return {...course,key};
    return null;
  }

  function makeLessons(course){
    if(content && typeof content.build === 'function') return content.build(course,course.key);
    const lang=localStorage.getItem('site-language')||'it';
    const copy={
      it:{lead:t=>`Impariamo ${t} partendo da zero.`,explain:t=>`In questa lezione impari ${t} con un esempio semplice.`,goals:['Capire il concetto','Leggere l’esempio','Modificare il codice','Provare da solo'],real:t=>`Usiamo ${t} in un piccolo progetto reale.`,exercise:t=>`Crea un piccolo esempio su ${t}.`,mistakes:['Non saltare i passaggi.','Leggi gli errori.'],challenge:t=>`Crea una variante di ${t}.`},
      en:{lead:t=>`Let's learn ${t} from scratch.`,explain:t=>`In this lesson you learn ${t} with a simple example.`,goals:['Understand the concept','Read the example','Modify the code','Try it yourself'],real:t=>`We use ${t} in a small real-world project.`,exercise:t=>`Create a small example using ${t}.`,mistakes:['Do not skip the steps.','Read the errors.'],challenge:t=>`Create your own variation of ${t}.`},
      fr:{lead:t=>`Apprenons ${t} depuis zéro.`,explain:t=>`Dans cette leçon, vous apprenez ${t} avec un exemple simple.`,goals:['Comprendre le concept','Lire l’exemple','Modifier le code','Essayer seul'],real:t=>`Nous utilisons ${t} dans un petit projet réel.`,exercise:t=>`Créez un petit exemple avec ${t}.`,mistakes:['Ne sautez pas les étapes.','Lisez les erreurs.'],challenge:t=>`Créez votre propre variante de ${t}.`},
      es:{lead:t=>`Aprendamos ${t} desde cero.`,explain:t=>`En esta lección aprenderás ${t} con un ejemplo sencillo.`,goals:['Entender el concepto','Leer el ejemplo','Modificar el código','Probar por tu cuenta'],real:t=>`Usamos ${t} en un pequeño proyecto real.`,exercise:t=>`Crea un pequeño ejemplo usando ${t}.`,mistakes:['No te saltes los pasos.','Lee los errores.'],challenge:t=>`Crea tu propia variante de ${t}.`},
      de:{lead:t=>`Wir lernen ${t} von Grund auf.`,explain:t=>`In dieser Lektion lernst du ${t} anhand eines einfachen Beispiels.`,goals:['Das Konzept verstehen','Das Beispiel lesen','Den Code ändern','Selbst ausprobieren'],real:t=>`Wir verwenden ${t} in einem kleinen Praxisprojekt.`,exercise:t=>`Erstelle ein kleines Beispiel mit ${t}.`,mistakes:['Überspringe keine Schritte.','Lies die Fehlermeldungen.'],challenge:t=>`Erstelle deine eigene Variante von ${t}.`}
    }[lang]||copy.it;
    return (course.topics||[]).map((topic)=>({title:topic,lead:copy.lead(topic),explain:copy.explain(topic),goals:copy.goals,code:`// Example: ${topic}`,second:`// Second example: ${topic}`,third:`// Third example: ${topic}`,steps:[],realExample:copy.real(topic),exercise:copy.exercise(topic),solution:`// Guided solution for ${topic}`,mistakes:copy.mistakes,challenge:copy.challenge(topic),quiz:[]}));
  }

  function groupFor(i,total){
    if(i===total-1) return 'Progetto finale';
    if(i<5) return 'Partiamo da zero';
    if(i<15) return 'Fondamenti';
    if(i<30) return 'Pratica guidata';
    return 'Livello successivo';
  }

  function isOnline(course){return course.lang==='css'||course.labMode==='online'||(!course.labMode&&onlineLanguages.has(course.lang));}
  function compilerLanguage(course){return course.lang==='css'?'html':course.lang;}
  function labFileName(lang){return ({css:'index.html',html:'index.html',python:'main.py',javascript:'main.js',typescript:'main.ts',php:'index.php',csharp:'Program.cs',java:'Main.java',go:'main.go',rust:'main.rs',kotlin:'Main.kt',swift:'main.swift',c:'main.c',cpp:'main.cpp'})[lang]||'main.txt';}
  function labCode(course,code){
    if(course.lang!=='css') return code;
    return `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${code}</style></head><body><main class="preview"><h1>Anteprima CSS</h1><p>Questo testo serve solo per vedere il tuo CSS.</p><div class="card">Scheda di esempio</div><button>Prova</button></main></body></html>`;
  }

  function lessonExercises(lesson){
    const t=lesson.title;
    return [
      {title:'Esercizio 1 — Copia consapevole',text:`Ricrea l’esempio principale di “${t}”. Non devi impararlo a memoria: guarda una riga, scrivila, eseguila e controlla il risultato.`},
      {title:'Esercizio 2 — Cambia qualcosa',text:`Modifica almeno due valori dell’esempio “${t}”. Poi aggiungi una piccola istruzione tua e verifica che il programma continui a funzionare.`},
      {title:'Esercizio 3 — Caso reale',text:`Immagina di creare un’app per una scuola, un negozio o un sito. Usa “${t}” per risolvere una piccola esigenza concreta.`}
    ];
  }

  function quizQuestions(lesson){
    const base=Array.isArray(lesson.quiz)?lesson.quiz:[];
    const extra=[
      {q:`Perché stiamo studiando “${lesson.title}”?`,opts:[`Per imparare a usarlo in un programma reale`,'Per copiare un esempio','Per evitare di fare esercizi','Per memorizzare tutto'],answer:0,explain:'L’obiettivo è capire e applicare il concetto.'},
      {q:'Qual è il comportamento migliore per chi parte da zero?',opts:['Provare l’esempio, modificarlo e osservare il risultato','Copiare senza eseguire','Saltare gli esercizi','Ignorare gli errori'],answer:0,explain:'La pratica aiuta a trasformare la spiegazione in una competenza.'}
    ];
    return [...base,...extra].slice(0,5);
  }

  function lineSteps(lesson){
    if(Array.isArray(lesson.steps)&&lesson.steps.length) return lesson.steps;
    return String(lesson.code||'').split('\n').filter(Boolean).map((line,i)=>`Riga ${i+1}: ${line.trim()} — osserva cosa cambia nel programma quando esegui questa istruzione.`).slice(0,14);
  }

  function labMarkup(course,lesson,index){
    if(course.key==='python'){
      return `<section class="lab"><div class="lab-head"><div><div class="section-kicker">${T('course.pythonTerminal','Terminale Python')}/div><h3>${T('course.writeRun','Scrivi, modifica ed esegui')}/h3><p${T('course.pythonLabText','Editor in stile VS Code e terminale integrato. Il codice viene eseguito nel browser quando possibile.')}</p></div></div><pre class="code-block"><code>${escapeHtml(lesson.code||'')}</code></pre></section>`;
    }
    if(!isOnline(course)){
      return `<section class="lab lab-reference"><div class="section-kicker">${T('course.lab','Laboratorio')}/div><h3>${T('course.localTry','Prova in locale')}/h3><p>${escapeHtml(course.lang==='sqlserver'||course.lang==='sql'?'${T('course.sqlLabText','SQL richiede un database. Usa SSMS o il database indicato nel corso.')}':'${T('course.localLabText','Questa tecnologia richiede un ambiente locale o un framework. Il codice sotto è la base da copiare nel tuo progetto.')}')}</p><pre class="code-block"><code>${escapeHtml(labCode(course,lesson.code||''))}</code></pre></section>`;
    }
    const compiler=compilerLanguage(course);
    const src=`https://onecompiler.com/embed/${encodeURIComponent(compiler)}?listenToEvents=true&codeChangeEvent=true&hideTitle=true`;
    return `<section class="lab"><div class="lab-head"><div><div class="section-kicker">${T('course.tryIt','Try it yourself')}/div><h3>${T('course.writeRun','Scrivi, modifica ed esegui')}/h3><p>Prima esegui l’esempio. Poi cambia una riga e osserva cosa succede.</p></div><div class="lab-actions"><button type="button" class="lab-load" data-index="${index}">${T('course.loadExample','Carica esempio')}/button><button type="button" class="lab-run" data-index="${index}">${T('course.runCode','Esegui codice')}/button></div></div><iframe class="online-editor" id="oc-editor" title="Editor online ${escapeHtml(course.title)}" src="${src}" loading="lazy" allow="clipboard-read; clipboard-write"></iframe><p class="lab-status" id="labStatus" aria-live="polite">${T('course.editorReady','Editor pronto. Premi “Carica esempio”.')}</p></section>`;
  }

  function start(){
    const base=getCourse();
    if(!base) return;
    const course={...base,lessons:makeLessons(base)};
    const siteNav=window.MOUSSA_SITE_NAVBAR_HTML||'<header class="modern-header site-global-header"><div class="container header-inner"><a class="modern-logo" href="/"><span class="logo-mark">M/S</span><span class="logo-text">Docente <span>Moussa</span></span></a><button class="modern-toggle site-nav-toggle" aria-expanded="false" aria-label="Apri menu" type="button">☰</button><nav class="modern-nav modern-menu site-global-menu" aria-label="Navigazione principale"><a href="/">Home</a><a href="/#servizi">Servizi</a><a href="/courses/">Corsi</a><a href="/monitoraggio">Progetti</a><a href="/#chi-sono">Chi sono</a><a href="/risorse">Risorse</a><a class="nav-cta" href="/contact">Contattami</a></nav><div class="language-switcher"><button type="button" class="language-current">IT</button><div class="language-menu"><button data-lang="it">Italiano</button><button data-lang="en">English</button><button data-lang="fr">Français</button><button data-lang="es">Español</button><button data-lang="de">Deutsch</button></div></div></div></header>';
    if(base.key==='tkinter'){ const repo=document.getElementById('tkinterRepoLink'); if(repo) repo.hidden=false; }
    document.body.innerHTML=`<div class="site-course-page">${siteNav}<div class="course-shell"><header class="course-header"><a href="/courses/" class="brand">MS Academy</a><div class="course-heading"><span class="eyebrow" data-i18n="course.beginner">Corso completo per principianti</span><h1>${escapeHtml(course.title)}</h1><p id="courseSummary"></p></div><div class="course-header-actions"><a href="/courses/" class="back" data-i18n="course.all">Tutti i corsi</a><a class="back repo-link" href="https://github.com/salisou/WebTkinter" target="_blank" rel="noopener noreferrer" id="tkinterRepoLink" hidden>Repository WebTkinter ↗</a></div></header><div class="course-grid"><aside class="course-sidebar"><div class="sidebar-progress"><div><strong data-i18n="course.progress">Il tuo progresso</strong><span id="sidebarProgress">0%</span></div><div class="progress"><i id="sidebarProgressBar" style="width:0%"></i></div></div><label class="sr-only" for="courseSearch">Cerca una lezione</label><input id="courseSearch" placeholder="Cerca una lezione..." data-i18n-placeholder="course.search" autocomplete="off"><nav id="lessonList" aria-label="Indice del corso" data-i18n-aria="course.index"></nav></aside><main id="lesson" tabindex="-1"></main></div></div></div>`;

    const stateKey=`course:${course.key}:current`,completedKey=`course:${course.key}:completed`,notesKey=`course:${course.key}:notes`;
    let index=Number(localStorage.getItem(stateKey)||0);
    let completed=JSON.parse(localStorage.getItem(completedKey)||'[]');
    let notes=JSON.parse(localStorage.getItem(notesKey)||'{}');
    if(!Number.isInteger(index)||index<0||index>=course.lessons.length) index=0;
    if(!Array.isArray(completed)) completed=[];
    if(!notes||typeof notes!=='object'||Array.isArray(notes)) notes={};
    const list=document.querySelector('#lessonList'),main=document.querySelector('#lesson'),search=document.querySelector('#courseSearch');

    function save(){localStorage.setItem(stateKey,String(index));localStorage.setItem(completedKey,JSON.stringify(completed));localStorage.setItem(notesKey,JSON.stringify(notes));}
    function updateProgress(){const p=course.lessons.length?Math.round(completed.length/course.lessons.length*100):0;document.querySelector('#sidebarProgress').textContent=`${p}%`;document.querySelector('#sidebarProgressBar').style.width=`${p}%`;document.querySelector('#courseSummary').textContent=`${course.lessons.length} ${T('course.lessons','lezioni')} · ${T('course.examplesShort','esempi spiegati')} · ${T('course.exercises','esercizi')} · ${T('course.quizShort','quiz')} · ${T('course.challenge','challenge')} · ${isOnline(course)?T('course.onlineEditor','editor online'):T('course.localLab','laboratorio locale')}`;}
    function choose(i){index=i;save();render();window.scrollTo({top:0,behavior:'smooth'});main.focus();}
    function markComplete(){if(!completed.includes(index)) completed.push(index);completed.sort((a,b)=>a-b);save();render();}

    function renderSidebar(filter=''){
      const groups={};
      course.lessons.forEach((lesson,i)=>{const group=groupFor(i,course.lessons.length);(groups[group] ||= []).push({lesson,i});});
      list.innerHTML=Object.entries(groups).map(([group,items])=>{const filtered=items.filter(x=>!filter||x.lesson.title.toLowerCase().includes(filter.toLowerCase()));if(!filtered.length)return '';return `<details class="topic-group" open><summary>${escapeHtml(group)} <span>${filtered.length}</span></summary>${filtered.map(({lesson,i})=>`<button class="lesson-link ${i===index?'active':''} ${completed.includes(i)?'completed':''}" data-i="${i}"><span>${completed.includes(i)?'✓':String(i+1).padStart(2,'0')}</span><em>${escapeHtml(lesson.title)}</em></button>`).join('')}</details>`;}).join('');
      list.querySelectorAll('.lesson-link').forEach(b=>b.addEventListener('click',()=>choose(Number(b.dataset.i))));
    }

    function sendToEditor(code,run){
      const frame=document.querySelector('#oc-editor');
      if(!frame||!frame.contentWindow){return false;}
      const language=compilerLanguage(course);
      const message={language,files:[{name:labFileName(course.lang),content:labCode(course,code)}]};
      frame.contentWindow.postMessage({eventType:'populateCode',...message},'*');
      if(run) setTimeout(()=>frame.contentWindow.postMessage({eventType:'triggerRun'},'*'),450);
      return true;
    }

    function render(){
      const lesson=course.lessons[index]||{};
      const done=completed.includes(index);
      const p=Math.round(((index+1)/course.lessons.length)*100);
      const exercises=lessonExercises(lesson);
      const quiz=quizQuestions(lesson);
      const steps=lineSteps(lesson);
      const examples=[lesson.code,lesson.second,lesson.third].filter(Boolean);
      renderSidebar(search.value||'');
      updateProgress();

      const exampleMarkup=examples.map((code,i)=>`<div class="example-card"><div class="example-label">${T('course.example','Esempio')} ${i+1}</div><pre class="code-block"><code>${escapeHtml(code)}</code></pre><button type="button" class="copy-code" data-example="${i}">${T('course.copy','Copia esempio')}</button></div>`).join('');
      const goals=(lesson.goals||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join('');
      const stepsMarkup=steps.map(x=>`<li><code>${escapeHtml(x)}</code></li>`).join('');
      const exercisesMarkup=exercises.map((x,i)=>`<li><strong>${escapeHtml(x.title)}</strong><p>${escapeHtml(x.text)}</p></li>`).join('');
      const quizMarkup=quiz.map((q,qi)=>`<div class="q" data-q="${qi}"><p><strong>${qi+1}. ${escapeHtml(q.q||'')}</strong></p><div class="quiz-options">${(q.opts||[]).map((o,oi)=>`<button type="button" data-a="${oi}">${escapeHtml(o)}</button>`).join('')}</div><p class="quiz-feedback" aria-live="polite"></p></div>`).join('');
      const prev=index>0?`<button type="button" data-nav="${index-1}">${T('course.prevText','Lezione precedente')}</button>`:'<button type="button" disabled>${T('course.prevText','Lezione precedente')}</button>';
      const next=index<course.lessons.length-1?`<button type="button" data-nav="${index+1}">${T('course.nextText','Lezione successiva')}</button>`:'<button type="button" disabled>${T('course.completedCourse','Corso completato')}</button>';

      if(lesson.richHtml){
        const prev=index>0?'<button type="button" data-nav="'+(index-1)+'">'+T('course.prevText','Lezione precedente')+'</button>':'<button type="button" disabled>${T('course.prevText','Lezione precedente')}</button>';
        const next=index<course.lessons.length-1?'<button type="button" data-nav="'+(index+1)+'">'+T('course.nextText','Lezione successiva')+'</button>':'<button type="button" disabled>'+T('course.completedCourse','Corso completato')+'</button>';
        main.innerHTML='<div class="lesson-head"><div><span>Lezione '+(index+1)+' di '+course.lessons.length+'</span><strong>'+escapeHtml(groupFor(index,course.lessons.length))+'</strong></div><div class="progress"><i style="width:'+p+'%"></i></div></div><article class="lesson-card rich-lesson-card"><div class="lesson-status"><span class="lesson-badge">'+escapeHtml(lesson.difficulty||'Tkinter')+'</span><button type="button" class="complete-btn" '+(done?'disabled':'')+'>'+(done?T('course.completed','Lezione completata'):T('course.complete','Segna come completata'))+'</button></div><h2>'+escapeHtml(lesson.title)+'</h2><p class="lead">'+escapeHtml(lesson.lead||'')+'</p><div class="rich-course-content">'+lesson.richHtml+'</div>'+labMarkup(course,lesson,index)+'<section class="exercise"><div class="section-kicker">${T('course.lessonNotes','Appunti della lezione')}</div><h3>${T('course.notes','Le tue note')}</h3><textarea id="exerciseNotes" rows="7" placeholder="${T('course.notesPlaceholderShort','Scrivi qui codice, dubbi o appunti...')}">'+escapeHtml(notes[index]||'')+'</textarea><div class="exercise-actions"><button type="button" class="save-notes" data-i18n="course.save">Salva i miei appunti</button></div><p class="exercise-status" aria-live="polite"></p></section><div class="lesson-nav">'+prev+next+'</div></article>';
        const complete=main.querySelector('.complete-btn');
        if(complete) complete.addEventListener('click',markComplete);
        const saveNotes=main.querySelector('.save-notes');
        if(saveNotes) saveNotes.addEventListener('click',()=>{notes[index]=main.querySelector('#exerciseNotes').value;save();main.querySelector('.exercise-status').textContent=T('course.notesSaved','Appunti salvati sul tuo dispositivo.');});
        main.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>choose(Number(b.dataset.nav))));
        main.querySelectorAll('.code-copy').forEach((button)=>button.addEventListener('click',async()=>{const block=button.closest('.code-block');const pre=block&&block.querySelector('pre');const code=pre?pre.innerText||pre.textContent:'';try{await navigator.clipboard.writeText(code);button.textContent='Copiato';setTimeout(()=>button.textContent='copia',1200);}catch(e){button.textContent='Seleziona e copia';}}));
        main.querySelectorAll('.quiz-opt').forEach(option=>option.addEventListener('click',()=>{const box=option.closest('.quiz-box');if(!box||option.classList.contains('correct')||option.classList.contains('wrong'))return;box.querySelectorAll('.quiz-opt').forEach(o=>o.classList.remove('correct','wrong'));const ok=option.getAttribute('data-correct')==='true';option.classList.add(ok?'correct':'wrong');const result=box.querySelector('.quiz-result');if(result){result.textContent=ok?'Corretto. Ottimo lavoro.':'Risposta non corretta. Riprova dopo aver riletto la spiegazione.';result.classList.add('show');}}));
        updateProgress();
        if (typeof window.MOUSSA_APPLY_LANGUAGE === 'function') window.MOUSSA_APPLY_LANGUAGE(localStorage.getItem('site-language') || 'it');
        return;
      }

      main.innerHTML=`<div class="lesson-head"><div><span>Lezione ${index+1} di ${course.lessons.length}</span><strong>${escapeHtml(groupFor(index,course.lessons.length))}</strong></div><div class="progress"><i style="width:${p}%"></i></div></div><article class="lesson-card">
        <div class="lesson-status"><span class="lesson-badge">${escapeHtml(lesson.difficulty||'Principiante')}</span><button type="button" class="complete-btn" ${done?'disabled':''}>${done?T('course.completed','Lezione completata'):T('course.complete','Segna come completata')}</button></div>
        <h2>${escapeHtml(lesson.title)}</h2>
        <p class="lead">${escapeHtml(lesson.lead||'')}</p>

        <section class="zero-box"><div class="section-kicker">${T('course.before','Prima di iniziare')}</div><p>${escapeHtml(lesson.explain||'')}</p><p class="zero-note"><strong>${T('course.ruleLabel','Regola del corso:')}</strong> non devi sapere già programmare. Ogni esempio parte da una situazione semplice e viene costruito passo dopo passo.</p></section>

        <section class="learning-box"><h3>${T('course.what','Cosa imparerai')}</h3><ul>${goals}</ul></section>

        <section><div class="section-kicker">${T('course.syntaxLabel','Come si scrive')}</div><h3>${T('course.syntaxTitle','La regola fondamentale')}</h3><p>${escapeHtml(lesson.syntax||'')}</p></section>

        <section class="examples-section"><div class="section-kicker">${T('course.examples','Esempi pratici')}</div><h3>${T('course.examplesTitle','Guarda, esegui, modifica')}</h3><p>${T('course.examplesText','Non limitarti a leggere. Copia l’esempio, eseguilo, cambia un valore e guarda come cambia il risultato.')}</p><div class="example-stack">${exampleMarkup}</div></section>

        <section class="try-panel"><h3>${T('course.try','Prova tu')}</h3><p>${escapeHtml(lesson.exercise||'')}</p><p><strong>${T('course.tipLabel','Piccolo consiglio:')}</strong> se non sai da dove partire, copia l’Esempio 1 e modifica una sola riga.</p></section>

        <section><div class="section-kicker">${T('course.steps','Spiegazione passo passo')}</div><h3>${T('course.stepsTitle','Che cosa succede nel codice?')}</h3><ol class="line-by-line">${stepsMarkup}</ol></section>

        <section class="real-example"><div class="section-kicker">${T('course.real','Esempio del mondo reale')}</div><h3>${T('course.realTitle','Perché ti serve?')}</h3><p>${escapeHtml(lesson.realExample||'')}</p></section>

        <section class="exercise"><div class="section-kicker">${T('course.training','Allenamento')}</div><h3>${T('course.trainingTitle','3 esercizi per imparare davvero')}</h3><ol>${exercisesMarkup}</ol><label for="exerciseNotes">${T('course.notesLabel','Le mie prove e i miei appunti')}</label><textarea id="exerciseNotes" rows="8" placeholder="${T('course.notesPlaceholder','Scrivi qui il codice, i tuoi tentativi o cosa non hai capito...')}">${escapeHtml(notes[index]||'')}</textarea><div class="exercise-actions"><button type="button" class="save-notes" data-i18n="course.save">Salva i miei appunti</button><button type="button" class="primary complete-from-exercise">${T('course.complete','Completa la lezione')}</button></div><p class="exercise-status" aria-live="polite"></p></section>

        <details class="solution"><summary>${T('course.solution','Mostra la soluzione guidata')}</summary><p>${T('course.solutionText','Prima prova da solo. Poi apri qui per confrontare il tuo lavoro.')}</p><pre class="code-block"><code>${escapeHtml(lesson.solution||lesson.code||'')}</code></pre></details>

        <section class="mistakes"><div class="section-kicker">${T('course.attention','Attenzione')}</div><h3>${T('course.mistakes','Errori comuni')}</h3><ul>${(lesson.mistakes||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section>

        <section class="challenge"><div class="section-kicker">${T('course.challenge','Challenge')}</div><h3>${T('course.challengeTitle','Ora tocca a te')}</h3><p>${escapeHtml(lesson.challenge||'')}</p></section>

        ${labMarkup(course,lesson,index)}

        <section class="quiz"><div class="section-kicker">${T('course.finalCheck','Verifica finale')}</div><h3 data-i18n="course.quiz">Quiz della lezione</h3><p>${T('course.finalText','Non è una gara. Se sbagli, leggi la spiegazione e riprova.')}</p>${quizMarkup}</section>

        <section class="reference-box"><div class="section-kicker">${T('course.reference','Riferimento')}</div><h3>${escapeHtml(lesson.reference||course.title)}</h3><p class="reference-note">${T('course.referenceText','Usa la documentazione come riferimento dopo aver capito l’esempio. Prima pratica, poi approfondimento.')}</p></section>

        <div class="lesson-nav">${prev}${next}</div>
      </article>`;

      main.querySelector('.complete-btn').addEventListener('click',markComplete);
      main.querySelector('.complete-from-exercise').addEventListener('click',()=>{markComplete();});
      main.querySelector('.save-notes').addEventListener('click',()=>{notes[index]=document.querySelector('#exerciseNotes').value;save();document.querySelector('.exercise-status').textContent=T('course.notesSaved','Appunti salvati sul tuo dispositivo.');});
      main.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>choose(Number(b.dataset.nav))));
      main.querySelectorAll('.copy-code').forEach((button)=>button.addEventListener('click',async()=>{const code=examples[Number(button.dataset.example)]||'';try{await navigator.clipboard.writeText(code);button.textContent='Copiato';setTimeout(()=>button.textContent=T('course.copy','Copia esempio'),1200);}catch(e){button.textContent='Seleziona e copia';}}));

      main.querySelectorAll('.q').forEach(q=>q.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
        const selected=Number(button.dataset.a);const question=quiz[Number(q.dataset.q)];q.querySelectorAll('button').forEach(b=>b.disabled=true);button.classList.add(selected===question.answer?'correct':'wrong');const feedback=q.querySelector('.quiz-feedback');feedback.textContent=selected===question.answer?'Corretto. '+(question.explain||''):'Non ancora. '+(question.explain||'Rileggi la spiegazione e riprova.');
      })));

      const load=main.querySelector('.lab-load');
      const run=main.querySelector('.lab-run');
      if(load) load.addEventListener('click',()=>{sendToEditor(lesson.code||'',false);document.querySelector('#labStatus').textContent='Esempio caricato nell’editor.';});
      if(run) run.addEventListener('click',()=>{sendToEditor(lesson.code||'',true);document.querySelector('#labStatus').textContent='Codice inviato all’editor. Ora guarda il risultato.';});
      updateProgress();
      if (typeof window.MOUSSA_APPLY_LANGUAGE === 'function') window.MOUSSA_APPLY_LANGUAGE(localStorage.getItem('site-language') || 'it');
    }

    search.addEventListener('input',()=>renderSidebar(search.value));
    render();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();