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

  const runnable = new Set(['html','css','javascript','typescript','python','sql','c','cpp','csharp','java','php','go','rust','kotlin','swift']);

  function escapeHtml(value){
    return String(value ?? '').replace(/[&<>\"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','\\':'\\\\','"':'&quot;'}[char] || char));
  }

  function makeLessons(course,key){
    if(Array.isArray(course.lessons) && course.lessons.length) return course.lessons;
    if(content && typeof content.build === 'function') return content.build(course,key);
    return (course.topics || []).map(topic => ({
      title:topic,
      explain:`Lezione dedicata a ${topic}.`,
      syntax:'Studia il concetto, prova l’esempio e modifica il codice.',
      goals:[`Comprendere ${topic}`,`Applicare ${topic} in un piccolo esercizio`],
      code:'',second:'',lineByLine:'Leggi il codice riga per riga e verifica il risultato.',
      realExample:'Adatta il concetto a un caso reale.',
      exercise:`Crea un piccolo esempio autonomo su ${topic}.`,solution:'',mistakes:['Controlla la sintassi.','Esegui il codice dopo ogni modifica.'],
      quiz:[],challenge:`Estendi l’esempio con una funzionalità aggiuntiva.`,difficulty:'Fondamentale'
    }));
  }

  function getCourse(){
    const path = location.pathname.toLowerCase();
    for(const [key,course] of Object.entries(languageCourses)){
      if(path.includes(`/corso_${key}`)) return {...course,key,lessons:makeLessons(course,key)};
    }
    for(const [key,course] of Object.entries(frameworkCourses)){
      if(path.includes(`/corso_${key}`)) return {...course,key,lessons:makeLessons(course,key)};
    }
    return null;
  }

  function isOnline(course){
    return course.labMode === 'online' || (!course.labMode && runnable.has(course.lang));
  }

  function compilerLanguage(course){
    const aliases = {js:'javascript',node:'javascript',csharp:'csharp',cpp:'cpp',py:'python'};
    return aliases[course.lang] || course.lang;
  }

  function labMarkup(course,lesson,index){
    if(!isOnline(course)){
      return `<section class="lab lab-reference">
        <div class="lab-head"><div><span class="lab-kicker">Laboratorio</span><h3>Esecuzione locale</h3><p>Questa tecnologia richiede il proprio ambiente di sviluppo. Copia il codice e segui le istruzioni della lezione per eseguirlo localmente.</p></div></div>
        <pre><code>${escapeHtml(lesson.code || '')}</code></pre>
      </section>`;
    }

    const lang = compilerLanguage(course);
    const src = `https://onecompiler.com/embed/${encodeURIComponent(lang)}?listenToEvents=true&codeChangeEvent=true&hideTitle=true`;
    return `<section class="lab">
      <div class="lab-head">
        <div><span class="lab-kicker">Laboratorio interattivo</span><h3>Scrivi, modifica ed esegui</h3><p>Il codice viene caricato nell’editor online. Puoi modificarlo, premere Run e vedere subito l’output.</p></div>
        <div class="lab-actions"><button type="button" class="lab-load" data-index="${index}">Carica esempio</button><button type="button" class="lab-run" data-index="${index}">Esegui codice</button></div>
      </div>
      <iframe id="oc-editor" title="Editor online ${escapeHtml(course.title)}" src="${src}" loading="lazy" allow="clipboard-read; clipboard-write"></iframe>
      <p class="lab-status" id="labStatus" aria-live="polite">Editor pronto: modifica il codice e usa Run.</p>
    </section>`;
  }

  function start(){
    const course = getCourse();
    if(!course) return;

    document.body.innerHTML = `<div class="course-shell">
      <header class="course-header">
        <a href="/courses/" class="brand">MS Academy</a>
        <div class="course-heading"><span class="eyebrow">Percorso di studio</span><h1>${escapeHtml(course.title)}</h1><p id="courseSummary"></p></div>
        <a href="/courses/" class="back">Tutti i corsi</a>
      </header>
      <div class="course-grid">
        <aside class="course-sidebar">
          <div class="sidebar-progress"><strong>Il tuo progresso</strong><span id="sidebarProgress">0%</span><div class="progress"><i id="sidebarProgressBar" style="width:0%"></i></div></div>
          <label for="courseSearch" class="sr-only">Cerca una lezione</label>
          <input id="courseSearch" placeholder="Cerca una lezione..." autocomplete="off">
          <div id="lessonList"></div>
        </aside>
        <main id="lesson" tabindex="-1"></main>
      </div>
    </div>`;

    const stateKey = `course:${course.key}`;
    const completedKey = `course:${course.key}:completed`;
    const notesKey = `course:${course.key}:notes`;
    let index = Number(localStorage.getItem(stateKey) || 0);
    let completed = JSON.parse(localStorage.getItem(completedKey) || '[]');
    const notes = JSON.parse(localStorage.getItem(notesKey) || '{}');

    if(!Number.isInteger(index) || index < 0 || index >= course.lessons.length) index = 0;
    if(!Array.isArray(completed)) completed = [];

    const list = document.querySelector('#lessonList');
    const main = document.querySelector('#lesson');

    function persist(){
      localStorage.setItem(stateKey,String(index));
      localStorage.setItem(completedKey,JSON.stringify(completed));
      localStorage.setItem(notesKey,JSON.stringify(notes));
    }

    function updateProgress(){
      const percent = course.lessons.length ? Math.round((completed.length/course.lessons.length)*100) : 0;
      document.querySelector('#sidebarProgress').textContent = `${percent}%`;
      document.querySelector('#sidebarProgressBar').style.width = `${percent}%`;
      document.querySelector('#courseSummary').textContent = `${course.lessons.length} lezioni · teoria · esempi · esercizi · soluzioni · quiz · ${isOnline(course) ? 'esecuzione online' : 'laboratorio locale'}`;
    }

    function markComplete(){
      if(!completed.includes(index)) completed.push(index);
      completed.sort((a,b)=>a-b);
      persist();
      render();
    }

    function render(){
      const lesson = course.lessons[index] || {};
      const percent = Math.round(((index+1)/course.lessons.length)*100);
      const done = completed.includes(index);

      list.innerHTML = course.lessons.map((item,i)=>`<button class="lesson-link ${i===index?'active':''} ${completed.includes(i)?'completed':''}" data-i="${i}" aria-current="${i===index?'step':'false'}"><span>${completed.includes(i)?'✓':String(i+1).padStart(2,'0')}</span>${escapeHtml(item.title)}</button>`).join('');

      const quizHtml = (lesson.quiz || []).map((q,qi)=>`<div class="q" data-q="${qi}"><p><strong>${qi+1}. ${escapeHtml(q.q || '')}</strong></p><div class="quiz-options">${(q.opts || []).map((o,oi)=>`<button type="button" data-a="${oi}">${escapeHtml(o)}</button>`).join('')}</div><p class="quiz-feedback" aria-live="polite"></p></div>`).join('');

      main.innerHTML = `<div class="lesson-head"><span>Lezione ${index+1} di ${course.lessons.length} · ${escapeHtml(lesson.difficulty || 'Percorso')}</span><div class="progress" aria-label="Avanzamento del percorso"><i style="width:${percent}%"></i></div></div>
      <article class="lesson-card">
        <div class="lesson-status"><span class="lesson-badge">${done?'Completata':'In corso'}</span><button type="button" id="completeLesson" class="complete-btn" ${done?'disabled':''}>${done?'Esercizio completato':'Segna lezione come completata'}</button></div>
        <h2>${escapeHtml(lesson.title)}</h2>
        <p class="lead">${escapeHtml(lesson.explain || '')}</p>
        <section><h3>Sintassi e concetto</h3><p>${escapeHtml(lesson.syntax || 'Confronta la sintassi con l’esempio e verifica ogni modifica.')}</p></section>
        <section><h3>Obiettivi</h3><ul>${(lesson.goals || []).map(g=>`<li>${escapeHtml(g)}</li>`).join('')}</ul></section>
        <section class="example-grid"><div><h3>Esempio principale</h3><pre><code>${escapeHtml(lesson.code || '')}</code></pre></div><div><h3>Esempio aggiuntivo</h3><pre><code>${escapeHtml(lesson.second || lesson.code || '')}</code></pre></div></section>
        <section><h3>Spiegazione operativa</h3><pre class="explanation-block">${escapeHtml(lesson.lineByLine || 'Leggi il codice riga per riga, eseguilo e modifica un elemento alla volta.')}</pre></section>
        <section><h3>Caso reale</h3><p>${escapeHtml(lesson.realExample || 'Adatta l’esempio a un piccolo progetto reale.')}</p></section>
        <section class="exercise"><div><span class="lab-kicker">Esercizio pratico</span><h3>Metti in pratica</h3></div><p>${escapeHtml(lesson.exercise || 'Crea una variante autonoma dell’esempio e verifica il risultato.')}</p><label for="exerciseNotes">La mia soluzione / note</label><textarea id="exerciseNotes" rows="5" placeholder="Scrivi qui la tua soluzione o le tue note...">${escapeHtml(notes[index] || '')}</textarea><div class="exercise-actions"><button type="button" id="saveNotes">Salva esercizio</button><button type="button" id="finishExercise" class="primary">Ho completato l’esercizio</button></div><p id="exerciseStatus" class="exercise-status" aria-live="polite"></p></section>
        <details class="solution"><summary>Mostra soluzione di riferimento</summary><p>Prova prima da solo, poi confronta il risultato.</p><pre><code>${escapeHtml(lesson.solution || lesson.second || lesson.code || '')}</code></pre></details>
        <section class="mistakes"><h3>Errori comuni</h3><ul>${(lesson.mistakes || []).map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ul></section>
        <section class="challenge"><span class="lab-kicker">Mini challenge</span><h3>Vai oltre l’esempio</h3><p>${escapeHtml(lesson.challenge || 'Estendi l’esempio con una piccola funzionalità aggiuntiva.')}</p></section>
        ${labMarkup(course,lesson,index)}
        <section class="quiz"><h3>Verifica rapida</h3>${quizHtml || '<p>Quiz in preparazione per questa lezione.</p>'}</section>
        <div class="lesson-nav"><button id="prev" ${index===0?'disabled':''}>← Precedente</button><button id="next" ${index===course.lessons.length-1?'disabled':''}>Successiva →</button></div>
      </article>`;

      document.querySelectorAll('.lesson-link').forEach(button=>button.onclick=()=>{index=Number(button.dataset.i);persist();render();main.focus();window.scrollTo({top:0,behavior:'smooth'});});
      document.querySelector('#prev').onclick=()=>{if(index>0){index--;persist();render();window.scrollTo({top:0,behavior:'smooth'});}};
      document.querySelector('#next').onclick=()=>{if(index<course.lessons.length-1){index++;persist();render();window.scrollTo({top:0,behavior:'smooth'});}};
      document.querySelector('#completeLesson').onclick=markComplete;

      const notesArea=document.querySelector('#exerciseNotes');
      document.querySelector('#saveNotes').onclick=()=>{notes[index]=notesArea.value;persist();document.querySelector('#exerciseStatus').textContent='Esercizio salvato nel browser.';};
      document.querySelector('#finishExercise').onclick=()=>{notes[index]=notesArea.value;markComplete();};

      document.querySelectorAll('.q').forEach(block=>block.querySelectorAll('button').forEach(button=>button.onclick=()=>{
        const q=lesson.quiz[Number(block.dataset.q)];
        const selected=Number(button.dataset.a);
        const feedback=block.querySelector('.quiz-feedback');
        block.querySelectorAll('button').forEach(item=>item.disabled=true);
        button.classList.add(selected===q.a?'correct':'wrong');
        feedback.textContent=selected===q.a?`Corretto. ${q.why || ''}`:`Non corretto. ${q.why || ''}`;
      }));

      const editor=document.querySelector('#oc-editor');
      const status=document.querySelector('#labStatus');
      const loadCode=()=>{
        if(!editor) return;
        editor.contentWindow.postMessage({eventType:'populateCode',language:compilerLanguage(course),files:[{name:'main',content:lesson.code || ''}]},'*');
        if(status) status.textContent='Esempio caricato nell’editor.';
      };
      document.querySelector('.lab-load')?.addEventListener('click',loadCode);
      document.querySelector('.lab-run')?.addEventListener('click',()=>{
        if(!editor) return;
        editor.contentWindow.postMessage({eventType:'triggerRun'},'*');
        if(status) status.textContent='Esecuzione avviata. Controlla il risultato nell’editor.';
      });
      editor?.addEventListener('load',()=>setTimeout(loadCode,600));

      updateProgress();
    }

    document.querySelector('#courseSearch').oninput=e=>{
      const search=e.target.value.toLowerCase().trim();
      document.querySelectorAll('.lesson-link').forEach(button=>button.hidden=!button.textContent.toLowerCase().includes(search));
    };

    render();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
