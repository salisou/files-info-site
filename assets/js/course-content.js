window.MOUSSA_COURSE_CONTENT = (() => {
  const python = {
    'Introduzione e installazione': ['print("Benvenuto nel corso Python")', 'import sys\nprint("Versione Python:", sys.version.split()[0])'],
    'Sintassi e indentazione': ['nome = "Moussa"\nif nome:\n    print("Nome presente:", nome)', 'for numero in range(1, 4):\n    print("Numero:", numero)'],
    'Variabili e tipi': ['nome = "Moussa"\neta = 30\nmedia = 28.5\nattivo = True\nprint(nome, eta, media, attivo)', 'numero = 25\nprint(type(numero).__name__)'],
    'Input e output': ['nome = input("Inserisci il tuo nome: ")\nprint(f"Ciao {nome}!")', 'numero = float(input("Inserisci un numero: "))\nprint("Il doppio è:", numero * 2)'],
    'Operatori': ['a = 10\nb = 3\nprint("Somma:", a + b)\nprint("Divisione:", a / b)\nprint("Resto:", a % b)', 'prezzo = 50\nsconto = 10\nprint("Prezzo finale:", prezzo - prezzo * sconto / 100)'],
    'Condizioni': ['voto = float(input("Inserisci il voto: "))\nif voto >= 18:\n    print("Esame superato")\nelse:\n    print("Esame non superato")', 'eta = int(input("Età: "))\nif eta >= 18:\n    print("Puoi entrare")\nelse:\n    print("Accesso negato")'],
    'Cicli for': ['for i in range(1, 6):\n    print("Numero:", i)', 'studenti = ["Amina", "Luca", "Sara"]\nfor studente in studenti:\n    print("Studente:", studente)'],
    'while e controllo del ciclo': ['numero = 3\nwhile numero > 0:\n    print("Conto alla rovescia:", numero)\n    numero -= 1', 'while True:\n    scelta = input("Scrivi esci per terminare: ")\n    if scelta.lower() == "esci":\n        break\n    print("Hai scritto:", scelta)'],
    'Funzioni': ['def saluta(nome):\n    print(f"Ciao {nome}!")\n\nsaluta("Moussa")', 'def somma(a, b):\n    return a + b\n\nprint("Risultato:", somma(12, 8))'],
    'Parametri e return': ['def calcola_media(voto1, voto2):\n    return (voto1 + voto2) / 2\n\nmedia = calcola_media(28, 30)\nprint("Media:", media)', 'def prezzo_finale(prezzo, sconto=0):\n    return prezzo - prezzo * sconto / 100\n\nprint(prezzo_finale(100, 20))'],
    'Scope e lambda': ['def esempio():\n    messaggio = "Variabile locale"\n    print(messaggio)\n\nesempio()', 'numeri = [1, 2, 3, 4]\ndoppi = list(map(lambda x: x * 2, numeri))\nprint(doppi)'],
    'Liste': ['studenti = ["Amina", "Luca", "Sara"]\nstudenti.append("Marco")\nprint(studenti)', 'voti = [24, 28, 30]\nprint("Primo voto:", voti[0])\nprint("Totale:", len(voti))'],
    'Tuple': ['studente = ("Amina", 28)\nnome, voto = studente\nprint(nome, voto)', 'coordinate = (44.84, 11.62)\nprint("Latitudine:", coordinate[0])'],
    'Set': ['linguaggi = {"Python", "C#", "Python", "SQL"}\nprint("Linguaggi unici:", linguaggi)', 'numeri = {1, 2, 3}\nnumeri.add(4)\nprint(numeri)'],
    'Dizionari': ['studente = {"nome": "Amina", "voto": 28}\nprint("Nome:", studente["nome"])\nstudente["voto"] = 30\nprint(studente)', 'corso = {"nome": "Python", "ore": 40}\nfor chiave, valore in corso.items():\n    print(chiave, ":", valore)'],
    'Stringhe e slicing': ['nome = "Moussa Salisou"\nprint(nome.upper())\nprint(nome.lower())\nprint(nome[:6])', 'email = "moussa@example.com"\nprint("Dominio:", email.split("@")[1])'],
    'Comprehension': ['voti = [12, 18, 24, 30]\nsufficienti = [v for v in voti if v >= 18]\nprint(sufficienti)', 'quadrati = [numero ** 2 for numero in range(1, 6)]\nprint(quadrati)'],
    'Moduli e import': ['import math\nraggio = 5\narea = math.pi * raggio ** 2\nprint("Area:", area)', 'from datetime import date\nprint("Oggi:", date.today())'],
    'pip e pacchetti': ['# Esempio concettuale: installazione da terminale\n# pip install requests\n\nimport requests\nprint("Libreria requests pronta per le chiamate HTTP")', 'import json\ndati = {"nome": "Amina", "voto": 28}\nprint(json.dumps(dati, ensure_ascii=False))'],
    'venv e ambienti virtuali': ['# Creazione dell ambiente virtuale da terminale\n# python -m venv .venv\n# .venv\\Scripts\\activate\n\nprint("Ambiente virtuale Python configurato")', 'import sys\nprint("Interpreter corrente:", sys.executable)'],
    'File di testo': ['with open("studenti.txt", "w", encoding="utf-8") as file:\n    file.write("Amina - 28\\nLuca - 24")\n\nwith open("studenti.txt", encoding="utf-8") as file:\n    print(file.read())', 'with open("note.txt", "a", encoding="utf-8") as file:\n    file.write("Nuova nota\\n")'],
    'CSV e JSON': ['import csv\nrighe = [["Nome", "Voto"], ["Amina", 28], ["Luca", 24]]\nwith open("voti.csv", "w", newline="", encoding="utf-8") as file:\n    csv.writer(file).writerows(righe)\nprint("CSV creato")', 'import json\ndati = {"nome": "Amina", "voto": 28}\nwith open("studente.json", "w", encoding="utf-8") as file:\n    json.dump(dati, file, ensure_ascii=False, indent=4)'],
    'Eccezioni': ['try:\n    numero = float(input("Inserisci un numero: "))\n    print("Doppio:", numero * 2)\nexcept ValueError:\n    print("Errore: devi inserire un numero")', 'try:\n    risultato = 10 / 0\nexcept ZeroDivisionError:\n    print("Non puoi dividere per zero")'],
    'Debugging': ['def calcola_totale(prezzo, quantita):\n    totale = prezzo * quantita\n    print("DEBUG totale:", totale)\n    return totale\n\nprint(calcola_totale(12.5, 3))', 'nome = "Amina"\nvoto = 28\nprint("DEBUG:", nome, voto)\nassert voto >= 0'],
    'OOP e classi': ['class Studente:\n    def __init__(self, nome, voto):\n        self.nome = nome\n        self.voto = voto\n\n    def presenta(self):\n        print(f"{self.nome}: {self.voto}")\n\nstudente = Studente("Amina", 28)\nstudente.presenta()', 'class Conto:\n    def __init__(self, saldo):\n        self.saldo = saldo\n\n    def deposita(self, importo):\n        self.saldo += importo\n\nconto = Conto(100)\nconto.deposita(50)\nprint(conto.saldo)'],
    'Ereditarietà e composizione': ['class Persona:\n    def saluta(self):\n        print("Ciao!")\n\nclass Docente(Persona):\n    def insegna(self):\n        print("Lezione di Python")\n\ndocente = Docente()\ndocente.saluta()\ndocente.insegna()', 'class Motore:\n    def avvia(self):\n        print("Motore avviato")\n\nclass Auto:\n    def __init__(self):\n        self.motore = Motore()\n\nauto = Auto()\nauto.motore.avvia()'],
    'Iteratori e generatori': ['numeri = [1, 2, 3]\nit = iter(numeri)\nprint(next(it))\nprint(next(it))', 'def conta_fino_a(n):\n    for i in range(1, n + 1):\n        yield i\n\nfor numero in conta_fino_a(3):\n    print(numero)'],
    'Decorator e context manager': ['def log(funzione):\n    def wrapper():\n        print("Inizio funzione")\n        funzione()\n        print("Fine funzione")\n    return wrapper\n\n@log\ndef saluta():\n    print("Ciao!")\n\nsaluta()', 'with open("registro.txt", "w", encoding="utf-8") as file:\n    file.write("Operazione completata")\nprint("File chiuso automaticamente")'],
    'API, requests e async': ['import requests\nrisposta = requests.get("https://jsonplaceholder.typicode.com/users/1", timeout=10)\nrisposta.raise_for_status()\ndati = risposta.json()\nprint("Nome:", dati["name"])', 'import asyncio\n\nasync def saluta():\n    await asyncio.sleep(1)\n    print("Risposta asincrona")\n\nasyncio.run(saluta())'],
    'Progetto finale: applicazione Python': ['import os\n\ndef somma():\n    try:\n        num1 = float(input("Inserisci il primo numero: "))\n        num2 = float(input("Inserisci il secondo numero: "))\n        print("La somma:", num1 + num2)\n    except ValueError:\n        print("Errore: devi inserire solo numeri")\n\ndef concatenazione():\n    stringa1 = input("Inserisci la prima stringa: ")\n    stringa2 = input("Inserisci la seconda stringa: ")\n    if stringa1.isdigit() or stringa2.isdigit():\n        print("Errore: inserisci testo, non numeri")\n        return\n    print("Risultato:", stringa1 + " " + stringa2)\n\ndef pulisci_console():\n    os.system("cls" if os.name == "nt" else "clear")\n\ndef mostra_menu():\n    print("\\n=== MENU DI SCELTA ===")\n    print("1. SOMMA TRA 2 NUMERI")\n    print("2. CONCATENARE 2 STRINGHE")\n    print("3. PULISCI LA CONSOLE")\n    print("4. ESCI DAL PROGRAMMA")\n\ndef main():\n    while True:\n        mostra_menu()\n        try:\n            scelta = int(input("Scegli un'opzione: "))\n            if scelta == 1:\n                somma()\n            elif scelta == 2:\n                concatenazione()\n            elif scelta == 3:\n                pulisci_console()\n            elif scelta == 4:\n                print("Programma terminato. A presto!")\n                break\n            else:\n                print("Opzione non valida")\n        except ValueError:\n            print("Errore: inserisci un numero da 1 a 4")\n\nmain()']
  };

  function genericExample(lang, topic) {
    const examples = {
      javascript: [`// Lezione: ${topic}\nconst valore = 10;\nconsole.log("${topic}:", valore);`, `// Applichiamo ${topic}\nfunction esempio() {\n  return "Esempio pratico";\n}\nconsole.log(esempio());`],
      typescript: [`// Lezione: ${topic}\nconst valore: number = 10;\nconsole.log("${topic}:", valore);`, `function esempio(nome: string): string {\n  return "Ciao " + nome;\n}\nconsole.log(esempio("Moussa"));`],
      csharp: [`// Lezione: ${topic}\nint valore = 10;\nConsole.WriteLine("${topic}: " + valore);`, `static int Somma(int a, int b) => a + b;\nConsole.WriteLine(Somma(12, 8));`],
      java: [`public class Main {\n    public static void main(String[] args) {\n        // Lezione: ${topic}\n        int valore = 10;\n        System.out.println("${topic}: " + valore);\n    }\n}`, `public class Main {\n    static int somma(int a, int b) { return a + b; }\n    public static void main(String[] args) {\n        System.out.println(somma(12, 8));\n    }\n}`],
      php: [`<?php\n// Lezione: ${topic}\n$valore = 10;\necho "${topic}: " . $valore;`, `<?php\nfunction somma(int $a, int $b): int { return $a + $b; }\necho somma(12, 8);`],
      c: [`#include <stdio.h>\nint main(void) {\n    // Lezione: ${topic}\n    int valore = 10;\n    printf("%s: %d\\n", "${topic}", valore);\n    return 0;\n}`, `#include <stdio.h>\nint somma(int a, int b) { return a + b; }\nint main(void) { printf("%d\\n", somma(12, 8)); return 0; }`],
      cpp: [`#include <iostream>\nint main() {\n    // Lezione: ${topic}\n    int valore = 10;\n    std::cout << "${topic}: " << valore << "\\n";\n    return 0;\n}`, `#include <iostream>\nint somma(int a, int b) { return a + b; }\nint main() { std::cout << somma(12, 8); }`],
      go: [`package main\nimport "fmt"\nfunc main() {\n    // Lezione: ${topic}\n    valore := 10\n    fmt.Println("${topic}:", valore)\n}`, `package main\nimport "fmt"\nfunc somma(a, b int) int { return a + b }\nfunc main() { fmt.Println(somma(12, 8)) }`],
      rust: [`fn main() {\n    // Lezione: ${topic}\n    let valore = 10;\n    println!("${topic}: {}", valore);\n}`, `fn somma(a: i32, b: i32) -> i32 { a + b }\nfn main() { println!("{}", somma(12, 8)); }`],
      kotlin: [`fun main() {\n    // Lezione: ${topic}\n    val valore = 10\n    println("${topic}: $valore")\n}`, `fun somma(a: Int, b: Int): Int = a + b\nfun main() { println(somma(12, 8)) }`],
      swift: [`import Foundation\nlet valore = 10\nprint("${topic}:", valore)`, `func somma(_ a: Int, _ b: Int) -> Int { a + b }\nprint(somma(12, 8))`],
      html: [`<!-- Lezione: ${topic} -->\n<section>\n  <h2>${topic}</h2>\n  <p>Questo esempio applica il concetto in una pagina HTML.</p>\n</section>`, `<article>\n  <h2>Corso di programmazione</h2>\n  <p>Esempio pratico collegato a: ${topic}.</p>\n</article>`],
      css: [`/* Lezione: ${topic} */\n.card {\n  padding: 20px;\n  border: 1px solid #ddd;\n}`, `.title {\n  font-size: 2rem;\n  margin-bottom: 12px;\n}`],
      sql: [`-- Lezione: ${topic}\nSELECT nome, voto\nFROM studenti\nWHERE voto >= 18;`, `-- Esempio pratico: ${topic}\nSELECT corso_id, COUNT(*) AS totale\nFROM studenti\nGROUP BY corso_id;`]
    };
    return examples[lang] || [`# Lezione: ${topic}\n# Esempio pratico da completare`, `# Applicazione del concetto: ${topic}`];
  }

  function build(course) {
    const topics = course.topics || [];
    const isPython = course.lang === 'python';
    return topics.map((topic, index) => {
      const pair = isPython && python[topic] ? python[topic] : genericExample(course.lang, topic);
      return {
        title: topic,
        explain: `In questa lezione impari ${topic}. L'esempio è costruito appositamente per applicare questo concetto, non per mostrare un argomento scollegato.`,
        syntax: `Studia la struttura dell'esempio e individua come ${topic.toLowerCase()} viene utilizzato nel programma.`,
        goals: [`Comprendere ${topic}`, `Saper applicare ${topic} in un programma reale`, 'Riconoscere gli errori più comuni'],
        code: pair[0],
        second: pair[1],
        lineByLine: `1. Leggi ogni istruzione dell'esempio.\n2. Individua la parte che realizza ${topic.toLowerCase()}.\n3. Esegui il programma.\n4. Modifica un valore e osserva come cambia il risultato.`,
        realExample: `Trasforma l'esempio in una piccola funzionalità del tuo progetto: per esempio gestione di studenti, corsi, prodotti, clienti o dati.` ,
        exercise: `Crea una variante dell'esempio usando ${topic.toLowerCase()}. Aggiungi almeno un input, un risultato visibile e una gestione corretta degli errori quando è pertinente.`,
        solution: pair[1],
        mistakes: [`Non usare codice relativo a un argomento diverso dalla lezione.`, `Esegui l'esempio e controlla il messaggio di errore prima di modificarlo.`, `Prova a cambiare almeno un valore per verificare di aver capito il comportamento.`],
        quiz: [
          {q:`Qual è l'obiettivo principale della lezione "${topic}"?`,opts:[`Applicare ${topic}`, 'Ignorare il risultato', 'Usare sempre codice diverso', 'Evitare gli esercizi'],answer:0},
          {q:'Cosa conviene fare dopo aver studiato l’esempio?',opts:['Copiarlo senza modificarlo','Eseguirlo e modificarlo','Saltare il codice','Eliminare gli errori senza leggerli'],answer:1}
        ],
        challenge: `Estendi l'esempio aggiungendo una funzionalità utile collegata a ${topic.toLowerCase()}.`,
        difficulty: index < 5 ? 'Fondamentale' : index < 15 ? 'Base' : index < 25 ? 'Intermedio' : 'Avanzato'
      };
    });
  }

  return { build };
})();