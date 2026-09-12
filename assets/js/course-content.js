window.MOUSSA_COURSE_CONTENT = (() => {
  'use strict';

  const banks = {
    python: {
      variables: ['nome = "Amina"\neta = 16\nprint(nome)\nprint(eta)', 'prezzo = 19.90\nquantita = 3\ntotale = prezzo * quantita\nprint("Totale:", totale)', 'iscrizione_attiva = True\nprint("Attivo:", iscrizione_attiva)'],
      print: ['nome = "Moussa"\nprint("Ciao", nome)', 'voti = [24, 28, 30]\nprint("Voti:", voti)', 'print("Benvenuto nel corso Python!")'],
      input: ['nome = input("Come ti chiami? ")\nprint("Ciao", nome)', 'eta = int(input("Quanti anni hai? "))\nprint("L\'anno prossimo avrai", eta + 1)', 'numero = float(input("Inserisci un numero: "))\nprint("Doppio:", numero * 2)'],
      if: ['eta = 16\nif eta >= 18:\n    print("Sei maggiorenne")\nelse:\n    print("Sei minorenne")', 'voto = 27\nif voto >= 18:\n    print("Esame superato")\nelse:\n    print("Esame non superato")', 'saldo = 120\nif saldo >= 100:\n    print("Acquisto possibile")'],
      switch: ['scelta = 2\nmatch scelta:\n    case 1:\n        print("Nuovo")\n    case 2:\n        print("Apri")\n    case _:\n        print("Scelta non riconosciuta")', 'giorno = "sabato"\nmatch giorno:\n    case "sabato" | "domenica":\n        print("Weekend")\n    case _:\n        print("Giorno lavorativo")'],
      loops: ['for numero in range(1, 6):\n    print("Numero:", numero)', 'numero = 1\nwhile numero <= 5:\n    print(numero)\n    numero += 1', 'for studente in ["Amina", "Luca", "Sara"]:\n    print("Studente:", studente)'],
      lists: ['studenti = ["Amina", "Luca"]\nstudenti.append("Sara")\nprint(studenti)', 'voti = [24, 28, 30]\nprint("Primo voto:", voti[0])\nprint("Numero voti:", len(voti))', 'numeri = [10, 20, 30]\nnumeri[1] = 25\nprint(numeri)'],
      dict: ['studente = {"nome": "Amina", "voto": 28}\nprint(studente["nome"])\nstudente["voto"] = 30\nprint(studente)', 'corso = {"nome": "Python", "ore": 40}\nfor chiave, valore in corso.items():\n    print(chiave, valore)'],
      functions: ['def saluta(nome):\n    print("Ciao", nome)\n\nsaluta("Amina")', 'def somma(a, b):\n    return a + b\n\nrisultato = somma(10, 5)\nprint("Risultato:", risultato)', 'def area_rettangolo(base, altezza):\n    return base * altezza\n\nprint(area_rettangolo(5, 3))'],
      classes: ['class Studente:\n    def __init__(self, nome, voto):\n        self.nome = nome\n        self.voto = voto\n\n    def presenta(self):\n        print(self.nome, "ha preso", self.voto)\n\nstudente = Studente("Amina", 28)\nstudente.presenta()', 'class Conto:\n    def __init__(self, saldo):\n        self.saldo = saldo\n\n    def deposita(self, importo):\n        self.saldo += importo\n\nconto = Conto(100)\nconto.deposita(50)\nprint(conto.saldo)'],
      files: ['with open("studenti.txt", "w", encoding="utf-8") as file:\n    file.write("Amina - 28\\nLuca - 24")\n\nwith open("studenti.txt", encoding="utf-8") as file:\n    print(file.read())', 'with open("note.txt", "a", encoding="utf-8") as file:\n    file.write("Nuova nota\\n")'],
      errors: ['try:\n    numero = float(input("Numero: "))\n    print("Doppio:", numero * 2)\nexcept ValueError:\n    print("Devi inserire un numero")', 'try:\n    risultato = 10 / 0\nexcept ZeroDivisionError:\n    print("Non puoi dividere per zero")'],
      final: ['def somma():\n    print("\\n--- SOMMA TRA 2 NUMERI ---")\n    try:\n        num1 = float(input("Inserisci il primo numero: "))\n        num2 = float(input("Inserisci il secondo numero: "))\n        print("La somma:", num1 + num2)\n    except ValueError:\n        print("Errore: devi inserire solo numeri")\n\ndef mostra_menu():\n    print("\\n=== MENU DI SCELTA ===")\n    print("1. SOMMA")\n    print("2. ESCI")\n\ndef main():\n    while True:\n        mostra_menu()\n        scelta = input("Scegli un\'opzione: ")\n        if scelta == "1":\n            somma()\n        elif scelta == "2":\n            print("Programma terminato")\n            break\n\nmain()', 'def concatena():\n    prima = input("Prima parola: ")\n    seconda = input("Seconda parola: ")\n    print("Risultato:", prima + " " + seconda)\n\nconcatena()']
    },
    html: {
      document: ['<!doctype html>\n<html lang="it">\n<head>\n  <meta charset="utf-8">\n  <title>La mia prima pagina</title>\n</head>\n<body>\n  <h1>Ciao mondo!</h1>\n  <p>Sto imparando HTML.</p>\n</body>\n</html>', '<h1>Il mio profilo</h1>\n<p>Mi chiamo Amina e ho 16 anni.</p>\n<p>Il mio obiettivo è imparare a programmare.</p>'],
      links: ['<a href="https://example.com">Apri il sito</a>', '<nav>\n  <a href="/">Home</a>\n  <a href="/courses/">Corsi</a>\n  <a href="/contact/">Contatti</a>\n</nav>'],
      images: ['<img src="foto.jpg" alt="Studente che programma" width="320">', '<figure>\n  <img src="computer.jpg" alt="Computer su una scrivania">\n  <figcaption>La mia postazione.</figcaption>\n</figure>'],
      lists: ['<ul>\n  <li>Python</li>\n  <li>C#</li>\n  <li>SQL</li>\n</ul>', '<ol>\n  <li>Imparo</li>\n  <li>Pratico</li>\n  <li>Creo un progetto</li>\n</ol>'],
      forms: ['<form>\n  <label for="nome">Nome</label>\n  <input id="nome" name="nome" type="text" required>\n  <button type="submit">Invia</button>\n</form>', '<form>\n  <label for="email">Email</label>\n  <input id="email" type="email" required>\n  <label for="messaggio">Messaggio</label>\n  <textarea id="messaggio"></textarea>\n</form>'],
      table: ['<table>\n  <tr><th>Nome</th><th>Voto</th></tr>\n  <tr><td>Amina</td><td>28</td></tr>\n  <tr><td>Luca</td><td>24</td></tr>\n</table>'],
      semantic: ['<header>MS Academy</header>\n<nav>Menu</nav>\n<main>\n  <section>\n    <h1>Corso Python</h1>\n    <p>Impara passo dopo passo.</p>\n  </section>\n</main>\n<footer>© 2025 Docente Moussa Salisou</footer>']
    },
    css: {
      selectors: ['body { font-family: Arial, sans-serif; }\nh1 { font-size: 2rem; }\np { line-height: 1.6; }', '.card { padding: 20px; border: 1px solid #ddd; }'],
      box: ['.card {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #173b63;\n  margin: 20px;\n  box-sizing: border-box;\n}', '.box { margin: 10px; padding: 16px; border: 1px solid #ccc; }'],
      flex: ['.menu {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}', '.cards { display: flex; flex-wrap: wrap; gap: 20px; }'],
      grid: ['.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}', '.layout { display: grid; grid-template-columns: 240px 1fr; gap: 24px; }'],
      responsive: ['.card { width: 100%; }\n\n@media (min-width: 700px) {\n  .card { width: 50%; }\n}', '@media (max-width: 700px) {\n  .menu { flex-direction: column; }\n}'],
      variables: [':root {\n  --primary: #173b63;\n  --space: 20px;\n}\n\n.card {\n  color: var(--primary);\n  padding: var(--space);\n}', '.button { background: var(--primary); }'],
      animation: ['@keyframes entra {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.card { animation: entra .4s ease; }']
    },
    javascript: {
      variables: ['const nome = "Amina";\nlet eta = 16;\nconsole.log(nome, eta);', 'const prodotto = { nome: "Mouse", prezzo: 25 };\nconsole.log(prodotto.nome);'],
      conditions: ['const voto = 27;\nif (voto >= 18) {\n  console.log("Superato");\n} else {\n  console.log("Non superato");\n}', 'const eta = 16;\nconst messaggio = eta >= 18 ? "Accesso" : "Negato";\nconsole.log(messaggio);'],
      switch: ['const scelta = 2;\nswitch (scelta) {\n  case 1:\n    console.log("Nuovo");\n    break;\n  case 2:\n    console.log("Apri");\n    break;\n  default:\n    console.log("Esci");\n}'],
      loops: ['for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}', 'let numero = 1;\nwhile (numero <= 5) {\n  console.log(numero);\n  numero++;\n}'],
      functions: ['function somma(a, b) {\n  return a + b;\n}\n\nconsole.log(somma(10, 5));', 'const saluta = (nome) => {\n  return `Ciao ${nome}`;\n};\n\nconsole.log(saluta("Amina"));'],
      arrays: ['const studenti = ["Amina", "Luca"];\nstudenti.push("Sara");\nconsole.log(studenti);', 'const voti = [18, 24, 30];\nconst sufficienti = voti.filter(voto => voto >= 18);\nconsole.log(sufficienti);'],
      objects: ['const studente = { nome: "Amina", voto: 28 };\nconsole.log(studente.nome);\nstudente.voto = 30;\nconsole.log(studente);'],
      dom: ['const titolo = document.querySelector("h1");\ntitolo.textContent = "Ciao dal JavaScript!";', 'const bottone = document.querySelector("button");\nbottone.addEventListener("click", () => {\n  alert("Hai cliccato!");\n});'],
      fetch: ['async function carica() {\n  const risposta = await fetch("https://jsonplaceholder.typicode.com/users/1");\n  const utente = await risposta.json();\n  console.log(utente.name);\n}\n\ncarica();']
    },
    typescript: {
      types: ['let nome: string = "Amina";\nlet eta: number = 16;\nlet attivo: boolean = true;\nconsole.log(nome, eta, attivo);', 'const voti: number[] = [24, 28, 30];\nconsole.log(voti);'],
      functions: ['function somma(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(somma(10, 5));'],
      interfaces: ['interface Studente {\n  nome: string;\n  voto: number;\n}\n\nconst studente: Studente = {\n  nome: "Amina",\n  voto: 28\n};\n\nconsole.log(studente);'],
      generics: ['function primo<T>(valori: T[]): T {\n  return valori[0];\n}\n\nconsole.log(primo<number>([10, 20, 30]));']
    },
    sql: {
      select: ['SELECT nome, voto\nFROM Studenti;', 'SELECT *\nFROM Studenti\nWHERE voto >= 18;'],
      where: ['SELECT nome, voto\nFROM Studenti\nWHERE voto >= 18\nORDER BY voto DESC;', 'SELECT *\nFROM Prodotti\nWHERE prezzo BETWEEN 10 AND 50;'],
      aggregate: ['SELECT COUNT(*) AS TotaleStudenti\nFROM Studenti;', 'SELECT AVG(voto) AS Media\nFROM Studenti;'],
      join: ['SELECT Studenti.nome, Corsi.nome\nFROM Studenti\nINNER JOIN Iscrizioni ON Studenti.id = Iscrizioni.studente_id\nINNER JOIN Corsi ON Corsi.id = Iscrizioni.corso_id;', 'SELECT c.nome, COUNT(i.id) AS iscritti\nFROM Corsi c\nLEFT JOIN Iscrizioni i ON c.id = i.corso_id\nGROUP BY c.nome;'],
      insert: ['INSERT INTO Studenti (nome, voto)\nVALUES (\'Amina\', 28);'],
      update: ['UPDATE Studenti\nSET voto = 30\nWHERE nome = \'Amina\';'],
      delete: ['DELETE FROM Studenti\nWHERE id = 10;'],
      table: ['CREATE TABLE Studenti (\n  id INT PRIMARY KEY,\n  nome VARCHAR(100) NOT NULL,\n  voto INT\n);']
    }
  };

  function pick(lang, topic) {
    const t = topic.toLowerCase();
    const bank = banks[lang] || {};
    const keys = Object.keys(bank);
    const rules = [
      ['final', ['progetto finale', 'applicazione', 'progetto']],
      ['input', ['input', 'get started', 'utente']],
      ['print', ['print', 'output', 'echo', 'console']],
      ['if', ['if', 'condizion', 'else', 'elif']],
      ['switch', ['switch', 'match', 'when']],
      ['loops', ['ciclo', 'for', 'while', 'loop', 'range']],
      ['lists', ['list', 'array', 'collections', 'vector', 'slice']],
      ['dict', ['dizion', 'dictionary', 'map', 'hashmap', 'object']],
      ['functions', ['funzion', 'metod', 'lambda', 'callback']],
      ['classes', ['class', 'oop', 'object', 'constructor']],
      ['files', ['file', 'csv', 'json']],
      ['errors', ['error', 'exception', 'try', 'gestione error']],
      ['box', ['box model', 'margin', 'padding', 'border', 'width', 'height']],
      ['flex', ['flex']],
      ['grid', ['grid']],
      ['responsive', ['responsive', 'media quer']],
      ['variables', ['variabil', 'variable', 'const', 'let', 'tipi']],
      ['selectors', ['selector', 'selettor']],
      ['dom', ['dom', 'event', 'element']],
      ['fetch', ['fetch', 'api', 'http']],
      ['types', ['type', 'tipi', 'interface', 'union', 'nullable']],
      ['generics', ['generic']],
      ['aggregate', ['aggregate', 'count', 'sum', 'avg', 'min', 'max', 'group by']],
      ['join', ['join', 'relazion']],
      ['where', ['where', 'order by', 'filter', 'having']],
      ['insert', ['insert']],
      ['update', ['update']],
      ['delete', ['delete']],
      ['table', ['create table', 'table', 'database']],
      ['select', ['select', 'query', 'sql']]
    ];
    for (const [key, words] of rules) {
      if (keys.includes(key) && words.some(w => t.includes(w))) return bank[key];
    }
    if (keys.length) return bank[keys[0]];
    return null;
  }

  function fallback(lang, topic) {
    const examples = {
      c: `#include <stdio.h>\n\nint main(void) {\n    printf("Lezione: ${topic}");\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Lezione: ${topic}" << endl;\n    return 0;\n}`,
      csharp: `using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Lezione: ${topic}");\n    }\n}`,
      java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Lezione: ${topic}");\n    }\n}`,
      php: `<?php\n$argomento = "${topic}";\necho "Lezione: " . $argomento;`,
      go: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Lezione: ${topic}")\n}`,
      rust: `fn main() {\n    println!("Lezione: ${topic}");\n}`,
      kotlin: `fun main() {\n    println("Lezione: ${topic}")\n}`,
      swift: `import Foundation\n\nprint("Lezione: ${topic}")`
    };
    const first = examples[lang] || `// Esempio introduttivo: ${topic}\n// Scrivi qui il tuo primo codice.`;
    return [first, first + '\n\n// Ora modifica il valore e osserva cosa cambia.'];
  }

  function cleanTopic(topic) {
    return topic.replace(/^\d+[.)-]\s*/, '').trim();
  }

  function makeSteps(code) {
    const lines = String(code || '').split('\n').filter(line => line.trim());
    return lines.slice(0, 12).map((line, i) => {
      const text = line.trim();
      let explanation = 'Questa riga esegue un\'istruzione del programma.';
      if (/^(#|\/\/|<!--|\/\*)/.test(text)) explanation = 'È un commento: serve a spiegare il codice e non viene eseguito.';
      else if (/^(def |function |func |fun |fn |static .*\(|class |interface )/.test(text)) explanation = 'Qui definiamo una funzione, una classe o una struttura che potremo riutilizzare.';
      else if (/^(if |if\s*\(|elif |else|case |switch|match|when)/.test(text)) explanation = 'Qui il programma prende una decisione in base a una condizione.';
      else if (/^(for |while |for\s*\()/.test(text)) explanation = 'Qui iniziamo una ripetizione: il programma esegue un blocco più volte.';
      else if (/^(print|console\.log|Console\.WriteLine|fmt\.Print|println|echo|SELECT|INSERT|UPDATE|DELETE)/i.test(text)) explanation = 'Qui chiediamo al programma di mostrare un risultato o di eseguire un\'azione.';
      else if (/^(import |using |#include|require|from )/.test(text)) explanation = 'Qui importiamo uno strumento o una libreria che ci serve.';
      else if (/[=:].*["'\d]/.test(text)) explanation = 'Qui creiamo o assegniamo un valore a una variabile o proprietà.';
      return `Riga ${i + 1}: ${text} — ${explanation}`;
    });
  }

  function buildLesson(course, topic, index) {
    const lang = course.lang;
    const title = cleanTopic(topic);
    const chosen = pick(lang, title) || fallback(lang, title);
    const code = chosen[0];
    const second = chosen[1] || chosen[0];
    const third = chosen[2] || second;
    const isFirst = index === 0;
    const isFinal = /progetto finale|applicazione/i.test(title);
    const steps = makeSteps(code);
    const beginner = isFirst
      ? `Partiamo davvero da zero. Prima di scrivere codice, pensa al computer come a un assistente: noi gli diamo istruzioni precise e lui le esegue nell'ordine indicato. In questa lezione vediamo ${title} senza dare nulla per scontato.`
      : `Se è la prima volta che incontri questo argomento, nessun problema. ${title} significa, in pratica, imparare una nuova istruzione che possiamo usare dentro un programma. Prima leggiamo un esempio piccolo, poi lo modifichiamo e infine proviamo a usarlo in un caso reale.`;
    const goals = [
      `Capire con parole semplici che cosa significa "${title}".`,
      'Leggere un esempio senza doverlo conoscere a memoria.',
      'Scrivere una piccola modifica partendo dall’esempio.',
      'Provare il codice e imparare a leggere eventuali errori.'
    ];
    const exercise = isFinal
      ? `Crea una piccola applicazione completa collegando gli argomenti studiati. Parti dal menu, aggiungi almeno due funzioni, controlla gli input e prova ogni scelta.`
      : `Ricrea l'esempio di "${title}". Poi cambia almeno un valore e aggiungi una piccola modifica tua. Non cercare di scrivere tutto perfettamente al primo tentativo: l'obiettivo è capire cosa succede.`;
    const solution = isFinal
      ? code
      : `${code}\n\n# Variante: prova a cambiare i dati dell'esempio e verifica il nuovo risultato.`;
    return {
      title,
      explain: beginner,
      lead: `In questa lezione impariamo ${title} con esempi piccoli e concreti.`,
      syntax: `Regola pratica: osserva prima la struttura dell'esempio, poi sostituisci i valori con qualcosa che conosci tu.`,
      goals,
      code,
      second,
      third,
      steps,
      realExample: `Immagina di creare una piccola app per una scuola. Puoi usare ${title} per gestire studenti, voti, corsi, prodotti o ordini. L'idea importante è trasformare un problema reale in istruzioni semplici per il computer.`,
      exercise,
      solution,
      mistakes: [
        'Copiare il codice senza eseguirlo: prova sempre a cambiare una riga.',
        'Saltare gli spazi, le parentesi o l’indentazione richiesti dal linguaggio.',
        'Quando compare un errore, leggere il messaggio prima di modificare il programma a caso.'
      ],
      challenge: `Senza guardare subito la soluzione, prova a creare una variante di "${title}" usando nomi e dati scelti da te. Poi confronta il risultato con l'esempio.`,
      quiz: [
        {q:`Qual è l'obiettivo principale della lezione "${title}"?`,opts:[`Capire e applicare ${title}`,'Imparare tutto a memoria','Copiare il codice senza provarlo','Saltare gli esempi'],answer:0,explain:'La programmazione si impara capendo il perché delle istruzioni e mettendole in pratica.'},
        {q:'Cosa conviene fare quando il programma mostra un errore?',opts:['Leggere il messaggio e controllare la riga indicata','Cancellare tutto','Ignorarlo','Cambiare linguaggio'],answer:0,explain:'Il messaggio di errore è un indizio: ci aiuta a capire dove il programma non fa quello che ci aspettavamo.'},
        {q:'Qual è il modo migliore per imparare da un esempio?',opts:['Eseguirlo, modificarlo e osservare il risultato','Guardarlo soltanto','Copiarlo senza eseguirlo','Saltare l’esercizio'],answer:0,explain:'Modificare un esempio trasforma la lettura passiva in pratica.'}
      ],
      reference: `${course.title}: ${title}`,
      difficulty: isFinal ? 'Progetto' : (isFirst ? 'Principiante assoluto' : 'Principiante'),
      isFinal,
      meta: `Esempi: 3 · Spiegazione passo passo · Esercizio · Soluzione · Quiz · Challenge`
    };
  }

  function build(course) {
    return (course.topics || []).map((topic, index) => buildLesson(course, topic, index));
  }

  return { build };
})();