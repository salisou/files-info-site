(function () {
  'use strict';

  const languageCourses = window.MOUSSA_LANGUAGE_COURSES || {};
  const frameworkCourses = {
    blazor: { title: 'Blazor Completo', lang: 'csharp', topics: ['Razor e componenti', 'Parametri ed eventi', 'Data binding', 'Routing', 'Form e validazione', 'HttpClient e API', 'Dependency Injection', 'Authentication', 'State management', 'Progetto finale'] },
    maui: { title: '.NET MAUI Completo', lang: 'csharp', topics: ['Struttura app', 'XAML e layout', 'Controls', 'Data binding', 'MVVM', 'Shell navigation', 'API REST', 'SQLite', 'SecureStorage', 'Progetto finale'] },
    aspnet: { title: 'ASP.NET Core Web API Completo', lang: 'csharp', topics: ['REST e HTTP', 'Routing', 'Controller', 'DTO', 'Validation', 'EF Core', 'CRUD', 'JWT', 'Swagger e logging', 'Progetto finale'] },
    tkinter: { title: 'Python & Tkinter Completo', lang: 'tkinter', topics: ['Prima finestra', 'Label e Button', 'Entry e form', 'Grid e layout', 'Eventi', 'Canvas', 'ttk', 'SQLite', 'MVC', 'Progetto finale'] },
    python_data: { title: 'Python Data Analyst Completo', lang: 'python', topics: ['Python per i dati', 'NumPy', 'Pandas DataFrame', 'Cleaning', 'GroupBy', 'Matplotlib', 'Statistiche', 'Correlazioni', 'Excel/CSV', 'Progetto finale'] },
    sqlserver: { title: 'SQL Server Completo', lang: 'sqlserver', topics: ['Database e tabelle', 'SELECT', 'WHERE', 'JOIN', 'GROUP BY', 'Subquery', 'INSERT/UPDATE/DELETE', 'Constraints', 'Views e procedure', 'Progetto finale'] },
    php_web: { title: 'PHP Full Stack Completo', lang: 'php', topics: ['PHP base', 'Arrays e funzioni', 'Forms', 'Sessioni', 'OOP', 'PDO', 'CRUD', 'Security', 'API JSON', 'Progetto finale'] },
    csharp_net: { title: 'C# & .NET Completo', lang: 'csharp', topics: ['Tipi e variabili', 'switch e cicli', 'Metodi', 'Classi', 'OOP', 'Collections', 'LINQ', 'Exceptions', 'Async/await', 'Progetto finale'] }
  };

  const frameworkExamples = {
    blazor: ['string framework = "Blazor";\nConsole.WriteLine(framework);', 'int count = 0;\ncount++;\nConsole.WriteLine(count);'],
    maui: ['Console.WriteLine("MAUI: Android, iOS, Windows, macOS");', 'string[] pages = { "Home", "Prodotti", "Profilo" };\nforeach (var page in pages) Console.WriteLine(page);'],
    aspnet: ['public record Prodotto(int Id, string Nome);\n\nvar prodotto = new Prodotto(1, "Laptop");\nConsole.WriteLine(prodotto);', 'string[] methods = { "GET", "POST", "PUT", "DELETE" };\nConsole.WriteLine(string.Join(" -> ", methods));'],
    tkinter: ['import tkinter as tk\n\nroot = tk.Tk()\nroot.title("Corso Tkinter")\ntk.Label(root, text="Ciao Moussa").pack(pady=40)\nroot.mainloop()', 'import tkinter as tk\n\nroot = tk.Tk()\ntk.Button(root, text="Saluta", command=lambda: print("Ciao!")).pack()\nroot.mainloop()'],
    python_data: ['import pandas as pd\n\ndf = pd.DataFrame({"corso": ["C#", "Python"], "voto": [28, 25]})\nprint(df)', 'import numpy as np\n\nprint(np.mean([18, 24, 30]))'],
    sqlserver: ['CREATE TABLE Studenti (Id INT PRIMARY KEY, Nome VARCHAR(80), Voto INT);', 'SELECT Nome, Voto FROM Studenti WHERE Voto >= 18 ORDER BY Voto DESC;'],
    php_web: ['<?php\n$nome = "Moussa";\necho "Ciao $nome";\n', '<?php\n$voti = [28, 25, 30];\necho array_sum($voti) / count($voti);\n'],
    csharp_net: ['int voto = 27;\nConsole.WriteLine(voto >= 18 ? "Superato" : "Non superato");', 'var voti = new[] { 18, 25, 30 };\nConsole.WriteLine(voti.Length);']
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>\"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
  }

  function makeLessons(course, key) {
    if (Array.isArray(course.lessons) && course.lessons.length) return course.lessons;

    const examples = course.examples || frameworkExamples[key] || ['Console.WriteLine("Esempio pratico");', 'Console.WriteLine("Secondo esempio");'];
    return course.topics.map((topic, index) => ({
      title: topic,
      explain: `In questa lezione affronti ${topic.toLowerCase()} partendo dal concetto e arrivando alla pratica. L'obiettivo non è memorizzare il codice: devi saperlo leggere, modificare, eseguire e correggere.`,
      goals: [`Comprendere ${topic}`, 'Leggere e modificare un esempio reale', 'Applicare il concetto in un esercizio'],
      code: examples[index % examples.length],
      second: examples[(index + 1) % examples.length],
      exercise: `Modifica l'esempio di “${topic}”: cambia almeno due valori e aggiungi una piccola funzionalità. Poi esegui il programma e verifica il risultato.`,
      solution: examples[(index + 1) % examples.length],
      mistakes: ['Copiare il codice senza capire cosa fa ogni istruzione', 'Non eseguire il programma dopo una modifica', 'Ignorare gli errori del compilatore o della console'],
      quiz: [
        { q: `Qual è l'obiettivo principale della lezione “${topic}”?`, opts: [`Comprendere e applicare ${topic}`, 'Saltare la pratica', 'Memorizzare senza eseguire'], a: 0, why: 'La programmazione si impara applicando il concetto in codice eseguibile.' },
        { q: 'Qual è il metodo di studio più efficace?', opts: ['Leggere, modificare, eseguire e correggere', 'Non eseguire mai il codice', 'Copiare senza capire'], a: 0, why: 'Il ciclo modifica-esecuzione-correzione sviluppa comprensione e capacità di debugging.' }
      ]
    }));
  }

  function getCourse() {
    const path = location.pathname.toLowerCase();
    for (const [key, course] of Object.entries(languageCourses)) {
      if (path.includes(`/corso_${key}`)) return { ...course, key, lessons: makeLessons(course, key) };
    }
    for (const [key, course] of Object.entries(frameworkCourses)) {
      if (path.includes(`/corso_${key}`)) return { ...course, key, lessons: makeLessons(course, key) };
    }
    return null;
  }

  function renderLab(course, lesson) {
    if (course.labMode === 'reference') {
      return `<section class="lab lab-reference"><div><h3>Laboratorio locale</h3><p>Questa tecnologia richiede un ambiente specifico e non viene falsamente presentata come eseguibile in un iframe generico. Usa il codice della lezione nel tuo ambiente di sviluppo.</p><pre><code>${escapeHtml(lesson.code)}</code></pre></div></section>`;
    }

    return `<section class="lab"><div><h3>Laboratorio interattivo</h3><p>Modifica il codice ed eseguilo online quando il linguaggio è supportato dal laboratorio.</p></div><iframe title="Editor online per ${escapeHtml(course.title)}" src="https://onecompiler.com/${encodeURIComponent(course.lang)}" loading="lazy"></iframe></section>`;
  }

  function start() {
    const course = getCourse();
    if (!course) return;

    document.body.innerHTML = `
      <div class="course-shell">
        <header class="course-header">
          <a href="/courses/" class="brand">MS Academy</a>
          <div>
            <span class="eyebrow">Percorso di studio</span>
            <h1>${escapeHtml(course.title)}</h1>
            <p>${course.lessons.length} lezioni · esempi · esercizi · soluzioni · quiz</p>
          </div>
          <a href="/courses/" class="back">Tutti i corsi</a>
        </header>
        <div class="course-grid">
          <aside class="course-sidebar">
            <label for="courseSearch" class="sr-only">Cerca una lezione</label>
            <input id="courseSearch" placeholder="Cerca una lezione..." autocomplete="off">
            <div id="lessonList"></div>
          </aside>
          <main id="lesson" tabindex="-1"></main>
        </div>
      </div>`;

    let index = Number(localStorage.getItem(`course:${course.key}`) || 0);
    if (!Number.isInteger(index) || index < 0 || index >= course.lessons.length) index = 0;

    const list = document.querySelector('#lessonList');
    const main = document.querySelector('#lesson');

    function render() {
      const lesson = course.lessons[index];
      const percent = Math.round(((index + 1) / course.lessons.length) * 100);

      list.innerHTML = course.lessons.map((item, i) => `
        <button class="lesson-link ${i === index ? 'active' : ''}" data-i="${i}" aria-current="${i === index ? 'step' : 'false'}">
          <span>${String(i + 1).padStart(2, '0')}</span>${escapeHtml(item.title)}
        </button>`).join('');

      main.innerHTML = `
        <div class="lesson-head">
          <span>Lezione ${index + 1} di ${course.lessons.length}</span>
          <div class="progress" aria-label="Progresso ${percent}%"><i style="width:${percent}%"></i></div>
        </div>
        <article class="lesson-card">
          <h2>${escapeHtml(lesson.title)}</h2>
          <p class="lead">${escapeHtml(lesson.explain)}</p>

          <h3>Obiettivi</h3>
          <ul>${(lesson.goals || []).map(goal => `<li>${escapeHtml(goal)}</li>`).join('')}</ul>

          <section class="example-grid">
            <div><h3>Esempio principale</h3><pre><code>${escapeHtml(lesson.code || '')}</code></pre></div>
            <div><h3>Esempio aggiuntivo</h3><pre><code>${escapeHtml(lesson.second || lesson.code || '')}</code></pre></div>
          </section>

          <section class="exercise"><h3>Esercizio</h3><p>${escapeHtml(lesson.exercise || 'Modifica il codice, eseguilo e verifica il risultato.')}</p></section>

          <section class="solution">
            <h3>Soluzione di riferimento</h3>
            <p>Confronta la tua soluzione solo dopo aver provato autonomamente.</p>
            <pre><code>${escapeHtml(lesson.solution || lesson.second || lesson.code || '')}</code></pre>
          </section>

          <section class="mistakes">
            <h3>Errori comuni</h3>
            <ul>${(lesson.mistakes || []).map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
          </section>

          ${renderLab(course, lesson)}

          <section class="quiz">
            <h3>Verifica rapida</h3>
            ${(lesson.quiz || []).map((question, qi) => `
              <div class="q" data-q="${qi}">
                <p><strong>${qi + 1}. ${escapeHtml(question.q)}</strong></p>
                <div class="quiz-options">${question.opts.map((option, oi) => `<button type="button" data-a="${oi}">${escapeHtml(option)}</button>`).join('')}</div>
                <p class="quiz-feedback" aria-live="polite"></p>
              </div>`).join('')}
          </section>

          <div class="lesson-nav">
            <button id="prev" ${index === 0 ? 'disabled' : ''}>← Precedente</button>
            <button id="next" ${index === course.lessons.length - 1 ? 'disabled' : ''}>Successiva →</button>
          </div>
        </article>`;

      document.querySelectorAll('.lesson-link').forEach(button => {
        button.onclick = () => { index = Number(button.dataset.i); saveAndRender(true); };
      });
      document.querySelector('#prev').onclick = () => { if (index > 0) { index--; saveAndRender(true); } };
      document.querySelector('#next').onclick = () => { if (index < course.lessons.length - 1) { index++; saveAndRender(true); } };

      document.querySelectorAll('.q').forEach(block => {
        block.querySelectorAll('button').forEach(button => {
          button.onclick = () => {
            const question = lesson.quiz[Number(block.dataset.q)];
            const selected = Number(button.dataset.a);
            const feedback = block.querySelector('.quiz-feedback');
            block.querySelectorAll('button').forEach(b => b.disabled = true);
            button.classList.add(selected === question.a ? 'correct' : 'wrong');
            feedback.textContent = selected === question.a ? `Corretto. ${question.why}` : `Non corretto. ${question.why}`;
          };
        });
      });
    }

    function saveAndRender(focus) {
      localStorage.setItem(`course:${course.key}`, String(index));
      render();
      if (focus) { main.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    }

    document.querySelector('#courseSearch').oninput = event => {
      const search = event.target.value.toLowerCase().trim();
      document.querySelectorAll('.lesson-link').forEach(button => {
        button.hidden = !button.textContent.toLowerCase().includes(search);
      });
    };

    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
