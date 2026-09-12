window.MOUSSA_COURSE_CONTENT = (() => {
  const snippets = {
    html: {
      intro:['<!doctype html>\n<html lang="it">\n<head><meta charset="utf-8"><title>Pagina</title></head>\n<body><h1>Ciao</h1></body>\n</html>','<main><h1>Corso HTML</h1><p>Una pagina semantica.</p></main>'],
      structure:['<!doctype html>\n<html lang="it">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body></body>\n</html>','<header><nav><a href="/">Home</a></nav></header>'],
      links:['<a href="/courses">Tutti i corsi</a>','<a href="mailto:info@example.com">Contattaci</a>'],
      images:['<img src="foto.jpg" alt="Studente che programma" width="320">','<figure><img src="corso.jpg" alt="Lezione di programmazione"><figcaption>Laboratorio</figcaption></figure>'],
      forms:['<form>\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" required>\n  <button type="submit">Invia</button>\n</form>','<label for="corso">Corso</label><select id="corso"><option>Python</option><option>C#</option></select>'],
      semantics:['<header>Testata</header><nav>Menu</nav><main><article>Contenuto</article></main><footer>Footer</footer>','<section aria-labelledby="titolo"><h2 id="titolo">Corsi</h2></section>'],
      seo:['<title>Corso Python | Docente Moussa</title>\n<meta name="description" content="Impara Python da zero con esercizi pratici.">','<link rel="canonical" href="https://www.moussasalisou.com/corso_python">'],
      advanced:['<details><summary>Leggi di più</summary><p>Contenuto aggiuntivo.</p></details>','<dialog id="info"><p>Dettagli corso</p><button onclick="info.close()">Chiudi</button></dialog>']
    },
    css: {
      selectors:['.card { padding: 1rem; }','main > h1 { margin-bottom: 1rem; }'],
      box:['.card { width: 300px; padding: 20px; border: 1px solid #ddd; box-sizing: border-box; }','.card { margin: 20px; overflow: auto; }'],
      flex:['.menu { display:flex; align-items:center; justify-content:space-between; gap:1rem; }','.actions { display:flex; flex-wrap:wrap; gap:.75rem; }'],
      grid:['.cards { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }','.layout { display:grid; grid-template-columns:240px 1fr; gap:2rem; }'],
      responsive:['.cards { display:grid; grid-template-columns:repeat(3,1fr); }\n@media (max-width:700px){ .cards{grid-template-columns:1fr;} }','img { max-width:100%; height:auto; }'],
      variables:[':root { --primary:#173b63; --space:1rem; }\n.card { color:var(--primary); padding:var(--space); }','h1 { font-size:clamp(1.8rem,4vw,3rem); }'],
      animation:['.button { transition:transform .2s ease; }\n.button:hover { transform:translateY(-2px); }','@keyframes fadeIn { from{opacity:0} to{opacity:1} }\n.card { animation:fadeIn .4s ease; }']
    },
    javascript: {
      basics:['const nome = "Moussa";\nlet eta = 30;\nconsole.log(nome, eta);','const corso = { nome:"Python", ore:40 };\nconsole.log(corso.nome);'],
      control:['const voto=27;\nconst esito=voto>=18 ? "Superato" : "Non superato";\nconsole.log(esito);','for(let i=1;i<=5;i++){ console.log(i); }'],
      functions:['function somma(a,b){ return a+b; }\nconsole.log(somma(12,8));','const doppio = n => n * 2;\nconsole.log(doppio(6));'],
      arrays:['const voti=[18,24,30];\nconst alti=voti.filter(v=>v>=24);\nconsole.log(alti);','const nomi=["Amina","Luca"];\nnomi.push("Sara");\nconsole.log(nomi);'],
      dom:['const titolo=document.querySelector("#titolo");\nif(titolo) titolo.textContent="Benvenuto";','const button=document.querySelector("#saluta");\nbutton?.addEventListener("click",()=>alert("Ciao!"));'],
      async:['async function carica(){\n  const response=await fetch("/api/corsi");\n  return response.json();\n}\ncarica().then(console.log);','fetch("/api/corsi").then(r=>r.json()).then(console.log).catch(console.error);']
    },
    python: {
      basics:['nome="Moussa"\neta=30\nprint(f"{nome} ha {eta} anni")','corso={"nome":"Python","ore":40}\nprint(corso["nome"])'],
      control:['voto=27\nif voto >= 18:\n    print("Superato")\nelse:\n    print("Non superato")','for i in range(1,6):\n    print(i)'],
      functions:['def somma(a, b):\n    return a + b\n\nprint(somma(12, 8))','def saluta(nome="Studente"):\n    return f"Ciao {nome}!"\n\nprint(saluta("Amina"))'],
      collections:['voti=[18,24,30]\nvalidi=[v for v in voti if v >= 18]\nprint(validi)','studenti={"Amina":28,"Luca":24}\nfor nome,voto in studenti.items():\n    print(nome,voto)'],
      files:['from pathlib import Path\nPath("note.txt").write_text("Corso Python", encoding="utf-8")\nprint(Path("note.txt").read_text(encoding="utf-8"))','import json\ndata={"corso":"Python","ore":40}\nprint(json.dumps(data, indent=2))'],
      oop:['class Studente:\n    def __init__(self, nome, voto):\n        self.nome=nome\n        self.voto=voto\n\ns=Studente("Amina",28)\nprint(s.nome)','class Corso:\n    def __init__(self,nome):\n        self.nome=nome\n']
    },
    sql: {
      select:['SELECT Nome, Voto FROM Studenti;','SELECT Nome, Voto AS Media FROM Studenti WHERE Voto >= 18 ORDER BY Voto DESC;'],
      aggregate:['SELECT CorsoId, COUNT(*) AS Totale, AVG(Voto) AS Media\nFROM Studenti\nGROUP BY CorsoId;','SELECT MAX(Voto) AS Massimo, MIN(Voto) AS Minimo FROM Studenti;'],
      join:['SELECT s.Nome, c.Nome AS Corso\nFROM Studenti s\nINNER JOIN Corsi c ON c.Id=s.CorsoId;','SELECT c.Nome, s.Nome\nFROM Corsi c\nLEFT JOIN Studenti s ON s.CorsoId=c.Id;'],
      write:['INSERT INTO Studenti(Nome,Voto,CorsoId) VALUES (\'Amina\',28,1);','UPDATE Studenti SET Voto=30 WHERE Id=1;\nDELETE FROM Studenti WHERE Id=10;'],
      design:['CREATE TABLE Corsi(\n  Id INT PRIMARY KEY,\n  Nome VARCHAR(100) NOT NULL UNIQUE\n);','CREATE TABLE Iscrizioni(\n  StudenteId INT NOT NULL,\n  CorsoId INT NOT NULL,\n  PRIMARY KEY(StudenteId,CorsoId),\n  FOREIGN KEY(StudenteId) REFERENCES Studenti(Id)\n);'],
      advanced:['WITH Medie AS (SELECT CorsoId,AVG(Voto) Media FROM Studenti GROUP BY CorsoId) SELECT * FROM Medie;','SELECT Nome, CASE WHEN Voto>=27 THEN \'Ottimo\' WHEN Voto>=18 THEN \'Superato\' ELSE \'Da recuperare\' END AS Esito FROM Studenti;']
    },
    csharp: {
      basics:['int eta=30;\nstring nome="Moussa";\nConsole.WriteLine($"{nome}: {eta}");','int[] voti={18,25,30};\nConsole.WriteLine(voti.Length);'],
      control:['int voto=27;\nstring esito=voto switch { >=18=>"Superato", _=>"Non superato" };\nConsole.WriteLine(esito);','for(int i=1;i<=5;i++) Console.WriteLine(i);'],
      oop:['public class Studente\n{\n    public string Nome { get; set; } = "Amina";\n    public int Voto { get; set; }\n}','public interface INotifica { void Invia(); }\npublic class Email : INotifica { public void Invia()=>Console.WriteLine("Inviata"); }'],
      linq:['var voti=new[]{18,24,30};\nvar alti=voti.Where(v=>v>=24).ToList();\nConsole.WriteLine(string.Join(", ",alti));','var studenti=new[]{new {Nome="Amina",Voto=28},new {Nome="Luca",Voto=24}};\nvar ordinati=studenti.OrderByDescending(s=>s.Voto);'],
      async:['async Task<string> CaricaAsync(HttpClient client)\n{\n    return await client.GetStringAsync("https://example.com");\n}','await Task.Delay(100);\nConsole.WriteLine("Operazione completata");']
    },
    java: { basics:['public class Main { public static void main(String[] args) { System.out.println("Ciao Java"); } }','int[] voti={18,25,30}; System.out.println(voti.length);'], control:['int voto=27; System.out.println(voto>=18 ? "Superato" : "Non superato");','for(int i=1;i<=5;i++) System.out.println(i);'], oop:['class Studente { String nome; int voto; Studente(String n,int v){nome=n;voto=v;} }','interface Notifica { void invia(); }'] },
    php: { basics:['<?php $nome="Moussa"; $eta=30; echo "$nome: $eta";','<?php $voti=[18,25,30]; echo count($voti);'], control:['<?php $voto=27; echo $voto>=18 ? "Superato" : "Non superato";','<?php for($i=1;$i<=5;$i++){ echo $i."\\n"; }'], web:['<?php $email=filter_input(INPUT_POST,"email",FILTER_VALIDATE_EMAIL); if($email===false){ echo "Email non valida"; }','<?php $pdo=new PDO($dsn,$user,$password); $stmt=$pdo->prepare("SELECT * FROM utenti WHERE email=?"); $stmt->execute([$email]);'], oop:['<?php class Studente { public function __construct(public string $nome, public int $voto) {} }','<?php interface Notifica { public function invia(): void; }'] },
    go: { basics:['package main\nimport "fmt"\nfunc main(){fmt.Println("Ciao Go")}','package main\nimport "fmt"\nfunc main(){nome:="Moussa";fmt.Println(nome)}'], control:['package main\nimport "fmt"\nfunc main(){voto:=27;if voto>=18{fmt.Println("Superato")}}','for i:=1;i<=5;i++{fmt.Println(i)}'], types:['voti:=[]int{18,25,30}\nstudenti:=map[string]int{"Amina":28}\nfmt.Println(voti,studenti)','type Studente struct { Nome string; Voto int }'] },
    rust: { basics:['fn main(){ println!("Ciao Rust"); }','let nome="Moussa"; let mut eta=30; eta+=1; println!("{} {}",nome,eta);'], control:['let voto=27; if voto>=18 { println!("Superato"); }','for i in 1..=5 { println!("{}",i); }'], ownership:['let testo=String::from("Ciao"); let riferimento=&testo; println!("{}",riferimento);','let numeri=vec![18,25,30]; println!("{}",numeri.len());'], types:['enum Stato { Attivo, Sospeso }','struct Studente { nome:String, voto:u8 }'] },
    kotlin: { basics:['fun main(){ val nome="Moussa"; val eta=30; println("$nome: $eta") }','val voti=listOf(18,25,30); println(voti.size)'], control:['val voto=27; println(if(voto>=18) "Superato" else "Non superato")','for(i in 1..5) println(i)'], oop:['data class Studente(val nome:String,val voto:Int)','interface Notifica { fun invia() }'] },
    swift: { basics:['import Foundation\nlet nome="Moussa"\nlet eta=30\nprint("\\(nome): \\(eta)")','let voti=[18,25,30]\nprint(voti.count)'], control:['let voto=27\nprint(voto >= 18 ? "Superato" : "Non superato")','for i in 1...5 { print(i) }'], oop:['struct Studente { let nome:String; let voto:Int }','protocol Notifica { func invia() }'] }
  };

  const keyFor = (lang, topic) => {
    const t=topic.toLowerCase();
    if(lang==='html') return /form|input|validazione/.test(t)?'forms':/link/.test(t)?'links':/immagini|figure/.test(t)?'images':/seo|meta/.test(t)?'seo':/semantic|header|nav|main|section|article|footer/.test(t)?'semantics':/details|dialog|template|microdata/.test(t)?'advanced':/struttura/.test(t)?'structure':'intro';
    if(lang==='css') return /flex/.test(t)?'flex':/grid/.test(t)?'grid':/responsive|media/.test(t)?'responsive':/box|margin|padding|overflow|width|height/.test(t)?'box':/variabili|calc|clamp/.test(t)?'variables':/transition|transform|animation|keyframes/.test(t)?'animation':'selectors';
    if(lang==='javascript') return /array|map|set|object|destructuring/.test(t)?'arrays':/dom|event|form/.test(t)?'dom':/async|promise|fetch|http/.test(t)?'async':/funzion|arrow|scope|closure/.test(t)?'functions':/ciclo|condizion|switch/.test(t)?'control':'basics';
    if(lang==='python') return /lista|tuple|set|dizion|comprehension/.test(t)?'collections':/file|csv|json/.test(t)?'files':/class|oop|ereditar/.test(t)?'oop':/funzion|parametri|lambda/.test(t)?'functions':/ciclo|condizion|operatori/.test(t)?'control':'basics';
    if(lang==='sql'||lang==='sqlserver') return /join/.test(t)?'join':/group|aggregate|having/.test(t)?'aggregate':/insert|update|delete|merge/.test(t)?'write':/create|primary|foreign|constraint|index|view/.test(t)?'design':/cte|subquery|case|transaction|procedure|function/.test(t)?'advanced':'select';
    if(['csharp','java','go','rust','kotlin','swift'].includes(lang)) return /class|interface|inheritance|polymorph|constructor|struct|protocol|oop/.test(t)?'oop':/async|http|api/.test(t)?'async':/if|switch|cicl|loop|condition|for|while|match/.test(t)?'control':/ownership|borrow|reference/.test(t)?'ownership':/array|list|collection|map|set|slice|vector|dictionary/.test(t)?'types':'basics';
    if(lang==='php') return /pdo|form|post|get|security|api|authentication/.test(t)?'web':/class|oop|inheritance|interface/.test(t)?'oop':/if|switch|cicl|loop/.test(t)?'control':'basics';
    return 'basics';
  };

  function build(course,key){
    if(!course?.topics) return [];
    const lang=course.lang==='sqlserver'?'sql':course.lang;
    const bank=snippets[lang]||snippets.csharp;
    return course.topics.map((topic,index)=>{
      const bucket=keyFor(lang,topic); const arr=bank[bucket]||bank.basics||Object.values(bank)[0];
      const code=arr[index%arr.length]; const second=arr[(index+1)%arr.length];
      return {
        title:topic,
        explain:`In questa lezione impari ${topic.toLowerCase()}. L'obiettivo è capire il concetto, riconoscere la sintassi corretta e applicarlo in un caso reale. Non limitarti a copiare: modifica l'esempio e verifica il comportamento.`,
        syntax:`Studia la forma generale di ${topic.toLowerCase()}, poi confrontala con l'esempio. Mantieni separati concetto, sintassi e applicazione pratica.`,
        goals:[`Capire ${topic.toLowerCase()}`,'Leggere e modificare un esempio funzionante','Applicare il concetto a un piccolo caso reale'],
        code,second,
        lineByLine:`1. Individua la struttura principale del codice.\n2. Identifica dati, istruzioni e risultato.\n3. Modifica un valore alla volta e riesegui.\n4. Controlla eventuali errori di sintassi o di esecuzione.`,
        realExample:`Caso reale: applica ${topic.toLowerCase()} a una piccola funzionalità di un progetto didattico, ad esempio gestione di studenti, corsi, utenti o dati. Parti dall'esempio e adattalo al tuo scenario.`,
        exercise:`Crea una variante autonoma sull'argomento “${topic}”. Cambia almeno due elementi dell'esempio, aggiungi una funzionalità e verifica il risultato.`,
        solution:second,
        mistakes:['Copiare il codice senza capire perché funziona','Cambiare molte cose contemporaneamente durante il debug','Ignorare gli errori del compilatore, interprete o browser'],
        quiz:[{q:`Qual è il risultato atteso dopo aver studiato “${topic}”?`,opts:[`Saper spiegare e applicare il concetto`,`Memorizzare il codice senza provarlo`,`Evitare di modificare gli esempi`],a:0,why:'Una competenza pratica richiede comprensione, modifica ed esecuzione.'},{q:'Qual è un buon metodo per imparare?',opts:['Leggere, provare, modificare e correggere','Copiare sempre lo stesso esempio','Saltare gli errori'],a:0,why:'Il ciclo prova-modifica-correzione consolida la comprensione.'}],
        challenge:`Mini challenge: usa ${topic.toLowerCase()} per migliorare una funzionalità del tuo progetto finale. Scrivi prima una soluzione, poi confrontala con una seconda possibile implementazione.`,
        difficulty:index<8?'Base':index<20?'Intermedio':'Avanzato'
      };
    });
  }
  return {build};
})();
