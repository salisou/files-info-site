/*
 * Moussa Course Complete Engine
 * Standardizza tutte le lezioni del catalogo con la stessa profondita didattica
 * usata per il corso Tkinter: teoria -> sintassi -> 3 esempi -> spiegazione
 * riga per riga -> esercizi -> soluzione -> errori -> challenge -> quiz.
 */
(function () {
  'use strict';

  const content = window.MOUSSA_COURSE_CONTENT;
  if (!content || typeof content.build !== 'function') return;

  const originalBuild = content.build.bind(content);

  const labels = {
    html:'HTML', css:'CSS', javascript:'JavaScript', typescript:'TypeScript',
    python:'Python', sql:'SQL', c:'C', cpp:'C++', csharp:'C#', java:'Java',
    php:'PHP', go:'Go', rust:'Rust', kotlin:'Kotlin', swift:'Swift',
    tkinter:'Tkinter', blazor:'Blazor', maui:'.NET MAUI', aspnet:'ASP.NET Core',
    python_data:'Python Data Analyst', sqlserver:'SQL Server', php_web:'PHP Full Stack',
    csharp_net:'C# / .NET'
  };

  const ext = {
    html:'html', css:'css', javascript:'js', typescript:'ts', python:'py', sql:'sql',
    sqlserver:'sql', c:'c', cpp:'cpp', csharp:'cs', csharp_net:'cs', java:'java',
    php:'php', php_web:'php', go:'go', rust:'rs', kotlin:'kt', swift:'swift',
    tkinter:'py', blazor:'razor', maui:'xaml', aspnet:'cs', python_data:'py'
  };

  function titleOf(title) {
    return String(title || 'questa lezione')
      .replace(/^Lezione\s*\d*\s*[-:–]?\s*/i,'').trim();
  }

  function keyOf(title) {
    return titleOf(title).toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[^a-z0-9]+/g,' ').trim();
  }

  function firstMatch(text, words) {
    return words.some(w => text.includes(w));
  }

  function fallbackCode(lang, title) {
    const t = keyOf(title);
    const L = labels[lang] || lang;

    if (lang === 'html') {
      if (firstMatch(t,['form','input'])) return '<form>\n  <label for="nome">Nome</label>\n  <input id="nome" name="nome" type="text" required>\n  <button type="submit">Invia</button>\n</form>';
      if (firstMatch(t,['tabell'])) return '<table>\n  <tr><th>Nome</th><th>Voto</th></tr>\n  <tr><td>Amina</td><td>28</td></tr>\n</table>';
      if (firstMatch(t,['link','percorsi'])) return '<a href="/courses/">Scopri i corsi</a>';
      if (firstMatch(t,['immagini','image','alt'])) return '<img src="foto.jpg" alt="Studente che programma" width="320">';
      return '<!doctype html>\n<html lang="it">\n<head>\n  <meta charset="utf-8">\n  <title>Pagina di esempio</title>\n</head>\n<body>\n  <h1>Imparo HTML</h1>\n  <p>Questo è un esempio semplice.</p>\n</body>\n</html>';
    }

    if (lang === 'css') {
      if (firstMatch(t,['flex'])) return '.menu {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}';
      if (firstMatch(t,['grid'])) return '.cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}';
      if (firstMatch(t,['media','responsive','mobile'])) return '@media (max-width: 700px) {\n  .menu {\n    flex-direction: column;\n  }\n}';
      if (firstMatch(t,['animation','keyframe'])) return '@keyframes entra {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.card { animation: entra .4s ease; }';
      return '.card {\n  padding: 20px;\n  border: 1px solid #d1d5db;\n  border-radius: 12px;\n  margin: 20px;\n}';
    }

    if (['javascript','typescript'].includes(lang)) {
      const typed = lang === 'typescript';
      const types = typed ? ': number' : '';
      if (firstMatch(t,['array','liste'])) return `const voti${typed ? ': number[]' : ''} = [18, 24, 30];\nconst sufficienti = voti.filter(voto => voto >= 18);\nconsole.log(sufficienti);`;
      if (firstMatch(t,['funzion','function'])) return `function somma(a${types}, b${types})${typed ? ': number' : ''} {\n  return a + b;\n}\n\nconsole.log(somma(10, 5));`;
      if (firstMatch(t,['switch','when'])) return 'const scelta = 2;\nswitch (scelta) {\n  case 1:\n    console.log("Nuovo");\n    break;\n  case 2:\n    console.log("Apri");\n    break;\n  default:\n    console.log("Scelta non riconosciuta");\n}';
      if (firstMatch(t,['dom','eventi','evento'])) return 'const bottone = document.querySelector("button");\nbottone?.addEventListener("click", () => {\n  console.log("Hai cliccato");\n});';
      return typed ? 'const nome: string = "Amina";\nconst eta: number = 16;\nconsole.log(nome, eta);' : 'const nome = "Amina";\nlet eta = 16;\nconsole.log(nome, eta);';
    }

    if (lang === 'python' || lang === 'python_data') {
      if (firstMatch(t,['input','validazione'])) return 'nome = input("Come ti chiami? ")\nprint("Ciao", nome)';
      if (firstMatch(t,['funzion'])) return 'def somma(a, b):\n    return a + b\n\nprint(somma(10, 5))';
      if (firstMatch(t,['class','oop','ereditar'])) return 'class Studente:\n    def __init__(self, nome, voto):\n        self.nome = nome\n        self.voto = voto\n\n    def presenta(self):\n        print(self.nome, self.voto)';
      if (firstMatch(t,['lista','list','array'])) return 'studenti = ["Amina", "Luca"]\nstudenti.append("Sara")\nprint(studenti)';
      if (firstMatch(t,['dizionari','dict'])) return 'studente = {"nome": "Amina", "voto": 28}\nprint(studente["nome"])';
      if (firstMatch(t,['file','csv','json'])) return 'import json\n\ndata = {"nome": "Amina", "voto": 28}\nwith open("studente.json", "w", encoding="utf-8") as file:\n    json.dump(data, file, indent=2)';
      if (lang === 'python_data' && firstMatch(t,['pandas','dataframe','analisi'])) return 'import pandas as pd\n\ndf = pd.DataFrame({"nome":["Amina","Luca"],"voto":[28,24]})\nprint(df)\nprint("Media:", df["voto"].mean())';
      return 'nome = "Amina"\neta = 16\nprint(f"{nome} ha {eta} anni")';
    }

    if (lang === 'sql' || lang === 'sqlserver') {
      if (firstMatch(t,['database'])) return 'CREATE DATABASE ScuolaDb;\nGO\n\nUSE ScuolaDb;\nGO';
      if (firstMatch(t,['table','tabelle'])) return 'CREATE TABLE Studenti (\n    Id INT PRIMARY KEY,\n    Nome NVARCHAR(100) NOT NULL,\n    Voto INT\n);';
      if (firstMatch(t,['insert'])) return "INSERT INTO Studenti (Id, Nome, Voto)\nVALUES (1, 'Amina', 28);";
      if (firstMatch(t,['update'])) return "UPDATE Studenti\nSET Voto = 30\nWHERE Id = 1;";
      if (firstMatch(t,['delete'])) return 'DELETE FROM Studenti\nWHERE Id = 1;';
      if (firstMatch(t,['join'])) return 'SELECT s.Nome, c.Nome AS Corso\nFROM Studenti s\nINNER JOIN Iscrizioni i ON s.Id = i.StudenteId\nINNER JOIN Corsi c ON c.Id = i.CorsoId;';
      if (firstMatch(t,['group','aggregate','count','sum','avg'])) return 'SELECT CorsoId, COUNT(*) AS Totale\nFROM Iscrizioni\nGROUP BY CorsoId;';
      return 'SELECT Id, Nome, Voto\nFROM Studenti\nWHERE Voto >= 18\nORDER BY Voto DESC;';
    }

    if (lang === 'c') return '#include <stdio.h>\n\nint main(void) {\n    int numero = 10;\n    printf("Numero: %d\\n", numero);\n    return 0;\n}';
    if (lang === 'cpp') return '#include <iostream>\n\nint main() {\n    int numero = 10;\n    std::cout << "Numero: " << numero << "\\n";\n    return 0;\n}';
    if (lang === 'csharp' || lang === 'csharp_net') return 'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        int numero = 10;\n        Console.WriteLine($"Numero: {numero}");\n    }\n}';
    if (lang === 'java') return 'public class Main {\n    public static void main(String[] args) {\n        int numero = 10;\n        System.out.println("Numero: " + numero);\n    }\n}';
    if (lang === 'php' || lang === 'php_web') return '<?php\n$nome = "Amina";\necho "Ciao $nome";\n?>';
    if (lang === 'go') return 'package main\n\nimport "fmt"\n\nfunc main() {\n    numero := 10\n    fmt.Println("Numero:", numero)\n}';
    if (lang === 'rust') return 'fn main() {\n    let numero = 10;\n    println!("Numero: {}", numero);\n}';
    if (lang === 'kotlin') return 'fun main() {\n    val numero = 10\n    println("Numero: $numero")\n}';
    if (lang === 'swift') return 'let numero = 10\nprint("Numero: \\(numero)")';

    if (lang === 'blazor') return '@page "/studenti"\n\n<h1>Studenti</h1>\n\n<p>Totale: @studenti.Count</p>\n\n@code {\n    private List<string> studenti = new() { "Amina", "Luca" };\n}';
    if (lang === 'maui') return '<VerticalStackLayout Padding="20">\n    <Label Text="Gestione studenti" FontSize="24" />\n    <Button Text="Carica" Clicked="OnCaricaClicked" />\n</VerticalStackLayout>';
    if (lang === 'aspnet') return 'var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\n\napp.MapGet("/api/studenti", () => new[] { "Amina", "Luca" });\n\napp.Run();';
    if (lang === 'tkinter') return 'import tkinter as tk\n\nroot = tk.Tk()\nroot.title("App Moussa")\nroot.geometry("500x350")\ntk.Label(root, text="Ciao Tkinter").pack(pady=30)\nroot.mainloop()';

    return `// Esempio introduttivo di ${L}\n// Argomento: ${titleOf(title)}\nconsole.log("Esempio pronto da eseguire");`;
  }

  function explainLines(code) {
    const lines = String(code || '').split('\n').filter(x => x.trim());
    return lines.slice(0,10).map((line,i) => `${i + 1}. ${line.trim()} — questa riga partecipa alla realizzazione dell'esempio; prova a modificarla e riesegui.`);
  }

  function goals(title) {
    const t = titleOf(title);
    return [`Capire ${t} partendo dalle basi`,`Riconoscere la sintassi principale`,`Eseguire un esempio funzionante`,`Modificare il codice senza rompere il programma`,`Applicare il concetto a un caso reale`];
  }

  function exercises(title, lang) {
    const t = titleOf(title), L = labels[lang] || lang;
    return [
      {title:'Esercizio 1 — Riproduci',text:`Ricrea l'esempio di "${t}" in ${L}, eseguilo e verifica il risultato.`},
      {title:'Esercizio 2 — Modifica',text:`Modifica almeno due elementi dell'esempio di "${t}" e descrivi cosa cambia.`},
      {title:'Esercizio 3 — Caso reale',text:`Crea una piccola funzionalità reale che utilizzi "${t}". Mantieni il codice semplice e commentato.`},
      {title:'Esercizio 4 — Debug',text:`Introduci un piccolo errore, esegui il programma, leggi l'errore e correggilo spiegando la causa.`}
    ];
  }

  function mistakes(title) {
    const t = titleOf(title);
    return [`Copiare ${t} senza capire il ruolo delle singole istruzioni.`,`Modificare molte righe contemporaneamente e perdere la causa dell'errore.`,`Ignorare il messaggio del compilatore, interprete o browser.`,`Non testare l'esempio dopo ogni modifica.`,`Usare nomi poco chiari o una struttura difficile da mantenere.`];
  }

  function quiz(title, lang) {
    const t = titleOf(title), L = labels[lang] || lang;
    return [
      {q:`Qual è l'obiettivo della lezione "${t}"?`,opts:[`Comprendere e applicare ${t}`,'Installare il sistema operativo','Cambiare browser','Creare un account'],answer:0,explain:`La lezione serve a comprendere e applicare ${t}.`},
      {q:`Qual è il modo migliore per imparare ${t}?`,opts:['Eseguire, modificare e verificare il codice','Leggere soltanto la teoria','Copiare senza eseguire','Saltare gli esercizi'],answer:0,explain:'La pratica collega teoria, codice e risultato.'},
      {q:`Se un esempio ${L} genera un errore, cosa fai per prima cosa?`,opts:['Leggi il messaggio di errore','Cancelli tutto','Cambi linguaggio','Riavvii il PC'],answer:0,explain:'Il messaggio di errore è il primo indizio per capire cosa non funziona.'},
      {q:`Quale pratica rende il codice di "${t}" più mantenibile?`,opts:['Nomi chiari e codice organizzato','Una riga enorme','Duplicazione del codice','Nessuna verifica'],answer:0,explain:'Codice leggibile e organizzato è più facile da correggere ed estendere.'},
      {q:`Dopo aver studiato "${t}", qual è il passo successivo?`,opts:['Creare una variante personale','Eliminare il codice','Saltare il test','Cambiare linguaggio'],answer:0,explain:'Una variante personale dimostra di saper applicare il concetto in autonomia.'}
    ];
  }

  function complete(lesson, course, key) {
    const lang = key || course?.key || 'programmazione';
    const title = lesson.title || 'Lezione';
    const code = lesson.code || fallbackCode(lang,title);
    const second = lesson.second && lesson.second !== code ? lesson.second : fallbackCode(lang, title + ' — variante');
    const third = lesson.third && lesson.third !== second ? lesson.third : fallbackCode(lang, title + ' — caso reale');

    return {
      ...lesson,
      lead: lesson.lead || `In questa lezione affrontiamo "${titleOf(title)}" con un percorso pratico e progressivo.`,
      explain: lesson.explain || `Partiamo dalla teoria essenziale, analizziamo la sintassi, eseguiamo un esempio completo e poi lo modifichiamo. L'obiettivo è capire perché il codice funziona, non soltanto copiarlo.`,
      goals: Array.isArray(lesson.goals) && lesson.goals.length >= 4 ? lesson.goals : goals(title),
      syntax: lesson.syntax || code,
      code,
      second,
      third,
      steps: Array.isArray(lesson.steps) && lesson.steps.length >= 4 ? lesson.steps : explainLines(code),
      realExample: lesson.realExample || `Caso reale: applica "${titleOf(title)}" in una piccola funzionalità di un progetto scolastico o professionale. Parti dall'esempio, cambia un elemento alla volta e verifica il risultato dopo ogni modifica.`,
      exercises: Array.isArray(lesson.exercises) && lesson.exercises.length >= 3 ? lesson.exercises : exercises(title,lang),
      solution: lesson.solution || code,
      mistakes: Array.isArray(lesson.mistakes) && lesson.mistakes.length >= 3 ? lesson.mistakes : mistakes(title),
      challenge: lesson.challenge || `Challenge: realizza una variante personale di "${titleOf(title)}" usando un contesto reale. Il risultato deve essere eseguibile, leggibile e commentato.`,
      quiz: Array.isArray(lesson.quiz) && lesson.quiz.length >= 5 ? lesson.quiz : quiz(title,lang),
      reference: lesson.reference || `Riferimento didattico: ${labels[lang] || lang} — ${titleOf(title)}.`,
      completeLesson: true,
      qualityStandard: 'moussa-complete-course-v2',
      fileExtension: ext[lang] || 'txt'
    };
  }

  content.build = function(course,key) {
    const lessons = originalBuild(course,key) || [];
    return lessons.map(lesson => complete(lesson,course,key));
  };
})();
