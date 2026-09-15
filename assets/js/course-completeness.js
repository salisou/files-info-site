/*
 * Complete lesson quality layer.
 * Every lesson must be studyable on its own: explanation, syntax,
 * multiple examples, line-by-line guidance, exercises, solution,
 * mistakes, challenge and a 5-question quiz.
 */
(function () {
  'use strict';

  const content = window.MOUSSA_COURSE_CONTENT;
  if (!content || typeof content.build !== 'function') return;

  const originalBuild = content.build.bind(content);

  const labels = {
    html: 'HTML', css: 'CSS', javascript: 'JavaScript', typescript: 'TypeScript',
    python: 'Python', sql: 'SQL', c: 'C', cpp: 'C++', csharp: 'C#', java: 'Java',
    php: 'PHP', go: 'Go', rust: 'Rust', kotlin: 'Kotlin', swift: 'Swift',
    tkinter: 'Tkinter', blazor: 'Blazor', maui: '.NET MAUI', aspnet: 'ASP.NET Core',
    python_data: 'Python Data Analyst', sqlserver: 'SQL Server', php_web: 'PHP Full Stack',
    csharp_net: 'C# / .NET'
  };

  function languageOf(course, key) {
    return key || course?.key || 'programmazione';
  }

  function cleanTitle(title) {
    return String(title || 'questa lezione').replace(/^Lezione\s*\d*\s*[-:–]?\s*/i, '').trim();
  }

  function exampleFromCode(code, lang) {
    if (!code) return '';
    const name = labels[lang] || lang;
    return `Esempio pratico in ${name}: parti dal codice mostrato, eseguilo così com'è e poi modifica un solo elemento alla volta. In questo modo puoi osservare esattamente quale effetto produce ogni modifica.`;
  }

  function stepsFromCode(code) {
    const lines = String(code || '').split('\n').filter(line => line.trim());
    return lines.slice(0, 8).map((line, i) => `${i + 1}. ${line.trim()} — osserva quale parte della lezione rappresenta e quale risultato produce.`);
  }

  function makeExercises(title, lang) {
    const t = cleanTitle(title);
    const name = labels[lang] || lang;
    return [
      { title: 'Esercizio 1 — Riproduci', text: `Ricrea in ${name} l'esempio della lezione ${t} senza copiare subito la soluzione. Eseguilo e verifica il risultato.` },
      { title: 'Esercizio 2 — Modifica', text: `Parti dall'esempio e modifica almeno due elementi collegati a "${t}". Spiega con una frase cosa cambia nell'output o nell'interfaccia.` },
      { title: 'Esercizio 3 — Applica', text: `Crea un piccolo caso reale che utilizzi "${t}". Mantieni il programma semplice, leggibile e commentato.` },
      { title: 'Esercizio 4 — Verifica', text: `Introduci volontariamente un errore nell'esempio, eseguilo, leggi il messaggio e correggilo spiegando la causa.` }
    ];
  }

  function makeSolution(lesson) {
    if (lesson.solution) return lesson.solution;
    return lesson.code || lesson.second || '// Scrivi qui la soluzione dell’esercizio seguendo l’esempio della lezione.';
  }

  function makeMistakes(title) {
    const t = cleanTitle(title);
    return [
      `Copiare il codice senza capire quale parte realizza ${t}.`,
      'Modificare troppe cose contemporaneamente e non sapere quale modifica ha causato il risultato.',
      'Ignorare gli errori del compilatore/interprete invece di leggere il messaggio e correggere una causa alla volta.',
      'Non verificare il risultato dopo aver eseguito il codice.'
    ];
  }

  function makeQuiz(title, lang) {
    const t = cleanTitle(title);
    const name = labels[lang] || lang;
    return [
      { q: `Qual è l'obiettivo principale della lezione "${t}"?`, opts: [`Applicare il concetto di ${t}`, 'Installare un sistema operativo', 'Creare un account', 'Cambiare il browser'], answer: 0, explain: `La lezione introduce e applica direttamente il concetto ${t}.` },
      { q: `Qual è il modo migliore per imparare ${t}?`, opts: ['Eseguire, modificare e verificare esempi', 'Leggere soltanto la teoria', 'Copiare senza eseguire', 'Saltare gli esercizi'], answer: 0, explain: 'La pratica permette di collegare teoria, codice e risultato.' },
      { q: `Se un esempio ${name} genera un errore, cosa conviene fare per prima cosa?`, opts: ['Leggere il messaggio di errore', 'Cancellare tutto', 'Cambiare linguaggio', 'Riavviare sempre il PC'], answer: 0, explain: 'Il messaggio indica spesso il punto o la causa del problema.' },
      { q: `Quale pratica rende il codice di "${t}" più facile da mantenere?`, opts: ['Nomi chiari e codice organizzato', 'Una sola riga enorme', 'Duplicare tutto', 'Evitare commenti utili'], answer: 0, explain: 'Codice chiaro e organizzato facilita lettura, debug e manutenzione.' },
      { q: `Dopo aver completato "${t}", qual è il passo successivo?`, opts: ['Creare una piccola variante personale', 'Non eseguire più il codice', 'Eliminare gli esercizi', 'Saltare la verifica'], answer: 0, explain: 'Una variante personale dimostra che il concetto è stato realmente compreso.' }
    ];
  }

  function complete(lesson, course, key) {
    const lang = languageOf(course, key);
    const title = lesson.title || 'Lezione';
    const code = lesson.code || '';
    const second = lesson.second || code;
    const third = lesson.third || second;

    return {
      ...lesson,
      lead: lesson.lead || `In questa lezione affrontiamo "${cleanTitle(title)}" partendo dalle basi e arrivando a un esempio pratico.`,
      explain: lesson.explain || `Prima comprendiamo il concetto, poi osserviamo la sintassi, eseguiamo un esempio e infine lo modifichiamo. L'obiettivo è capire non solo cosa scrivere, ma perché il codice funziona.`,
      goals: Array.isArray(lesson.goals) && lesson.goals.length ? lesson.goals : [
        `Capire ${cleanTitle(title)}`,
        'Leggere e interpretare la sintassi',
        'Eseguire un esempio funzionante',
        'Modificare il codice in autonomia'
      ],
      syntax: lesson.syntax || code || `// Sintassi di riferimento per: ${cleanTitle(title)}`,
      code: code || lesson.syntax || `// Esempio introduttivo: ${cleanTitle(title)}`,
      second,
      third,
      steps: Array.isArray(lesson.steps) && lesson.steps.length ? lesson.steps : stepsFromCode(code),
      realExample: lesson.realExample || exampleFromCode(code, lang),
      exercises: Array.isArray(lesson.exercises) && lesson.exercises.length >= 3 ? lesson.exercises : makeExercises(title, lang),
      solution: makeSolution(lesson),
      mistakes: Array.isArray(lesson.mistakes) && lesson.mistakes.length >= 3 ? lesson.mistakes : makeMistakes(title),
      challenge: lesson.challenge || `Challenge: realizza una piccola variante personale di "${cleanTitle(title)}" usando un contesto reale, mantenendo il codice semplice e leggibile.`,
      quiz: Array.isArray(lesson.quiz) && lesson.quiz.length >= 5 ? lesson.quiz : makeQuiz(title, lang),
      completeLesson: true,
      qualityStandard: 'tkinter-blueprint'
    };
  }

  content.build = function (course, key) {
    const lessons = originalBuild(course, key) || [];
    return lessons.map(lesson => complete(lesson, course, key));
  };
})();
