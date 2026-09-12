window.MOUSSA_COURSE_CONTENT = (() => {
  const py = {
    "Introduzione a Python": ['print("Benvenuto nel corso Python")', 'import sys\nprint("Versione:", sys.version.split()[0])'],
    "Installazione e ambiente": ['import sys\nprint("Python:", sys.version)', 'print("Crea un ambiente con: python -m venv .venv")'],
    "Variabili": ['nome="Moussa"\neta=30\nmedia=28.5\nprint(nome,eta,media)', 'attivo=True\nprint(type(attivo).__name__)'],
    "Tipi di dati": ['nome="Amina"\nvoto=28\nprezzo=19.90\nattivo=True\nprint(type(nome),type(voto),type(prezzo),type(attivo))', 'valore="30"\nprint(int(valore)+5)'],
    "Output print": ['nome="Moussa"\nprint("Ciao",nome)', 'voti=[24,28,30]\nprint("Voti:",voti)'],
    "Input validation": ['try:\n    voto=float(input("Voto: "))\n    print("Superato" if voto>=18 else "Non superato")\nexcept ValueError:\n    print("Inserisci un numero")', 'nome=input("Nome: ").strip()\nif nome:\n    print("Ciao",nome)'],
    "if": ['voto=27\nif voto>=18:\n    print("Esame superato")\nelse:\n    print("Esame non superato")', 'eta=20\nif eta>=18:\n    print("Maggiorenne")'],
    "elif": ['voto=27\nif voto>=28:\n    print("Ottimo")\nelif voto>=18:\n    print("Superato")\nelse:\n    print("Da ripetere")', 'temperatura=15\nif temperatura>25:\n    print("Caldo")\nelif temperatura<10:\n    print("Freddo")\nelse:\n    print("Mite")'],
    "else": ['saldo=50\nif saldo>=100:\n    print("Acquisto possibile")\nelse:\n    print("Saldo insufficiente")', 'eta=16\nprint("Accesso" if eta>=18 else "Negato")'],
    "match": ['scelta=2\nmatch scelta:\n    case 1: print("Nuovo")\n    case 2: print("Apri")\n    case _: print("Esci")', 'ruolo="docente"\nmatch ruolo:\n    case "admin": print("Amministratore")\n    case "docente": print("Docente")\n    case _: print("Studente")'],
    "while": ['numero=3\nwhile numero>0:\n    print(numero)\n    numero-=1', 'while True:\n    scelta=input("Scrivi esci: ")\n    if scelta.lower()=="esci":\n        break'],
    "for": ['for i in range(1,6):\n    print("Numero:",i)', 'studenti=["Amina","Luca","Sara"]\nfor studente in studenti:\n    print(studente)'],
    "range": ['for i in range(1,6):\n    print(i)', 'for i in range(0,10,2):\n    print(i)'],
    "Liste": ['studenti=["Amina","Luca"]\nstudenti.append("Sara")\nprint(studenti)', 'voti=[24,28,30]\nprint(voti[0],len(voti))'],
    "List comprehension": ['voti=[12,18,24,30]\nsufficienti=[v for v in voti if v>=18]\nprint(sufficienti)', 'quadrati=[n*n for n in range(1,6)]\nprint(quadrati)'],
    "Tuple": ['studente=("Amina",28)\nnome,voto=studente\nprint(nome,voto)', 'coordinate=(44.84,11.62)\nprint(coordinate[0])'],
    "Set": ['linguaggi={"Python","C#","Python"}\nprint(linguaggi)', 'numeri={1,2,3}\nnumeri.add(4)\nprint(numeri)'],
    "Dizionari": ['studente={"nome":"Amina","voto":28}\nprint(studente["nome"])\nstudente["voto"]=30\nprint(studente)', 'corso={"nome":"Python","ore":40}\nfor k,v in corso.items():\n    print(k,v)'],
    "Stringhe": ['nome="Moussa Salisou"\nprint(nome.upper())\nprint(nome.lower())', 'email="moussa@example.com"\nprint(email.split("@")[1])'],
    "Slicing": ['nome="Moussa Salisou"\nprint(nome[:6])\nprint(nome[7:])', 'testo="Python"\nprint(testo[::-1])'],
    "Funzioni": ['def saluta(nome):\n    print(f"Ciao {nome}")\nsaluta("Moussa")', 'def somma(a,b):\n    return a+b\nprint(somma(12,8))'],
    "Parametri": ['def media(a,b):\n    return (a+b)/2\nprint(media(28,30))', 'def saluta(nome="Studente"):\n    print("Ciao",nome)\nsaluta()'],
    "Args e kwargs": ['def somma(*numeri):\n    return sum(numeri)\nprint(somma(2,3,5))', 'def mostra(**dati):\n    print(dati)\nmostra(nome="Amina",voto=28)'],
    "Lambda": ['numeri=[1,2,3,4]\ndoppi=list(map(lambda x:x*2,numeri))\nprint(doppi)', 'voti=[12,18,24]\nprint(list(filter(lambda v:v>=18,voti)))'],
    "OOP e classi": ['class Studente:\n    def __init__(self,nome,voto):\n        self.nome=nome\n        self.voto=voto\n    def presenta(self):\n        print(self.nome,self.voto)\ns=Studente("Amina",28)\ns.presenta()', 'class Conto:\n    def __init__(self,saldo): self.saldo=saldo\n    def deposita(self,importo): self.saldo+=importo\nc=Conto(100)\nc.deposita(50)\nprint(c.saldo)'],
    "Inheritance": ['class Persona:\n    def saluta(self): print("Ciao")\nclass Docente(Persona):\n    def insegna(self): print("Python")\nd=Docente()\nd.saluta()\nd.insegna()', 'class Animale:\n    def parla(self): print("Verso")\nclass Cane(Animale):\n    def parla(self): print("Bau")\nCane().parla()'],
    "File handling": ['with open("studenti.txt","w",encoding="utf-8") as f:\n    f.write("Amina - 28\\nLuca - 24")\nwith open("studenti.txt",encoding="utf-8") as f:\n    print(f.read())', 'with open("note.txt","a",encoding="utf-8") as f:\n    f.write("Nuova nota\\n")'],
    "CSV": ['import csv\nrighe=[["Nome","Voto"],["Amina",28],["Luca",24]]\nwith open("voti.csv","w",newline="",encoding="utf-8") as f:\n    csv.writer(f).writerows(righe)', 'import csv\nwith open("voti.csv",encoding="utf-8") as f:\n    for riga in csv.reader(f): print(riga)'],
    "JSON": ['import json\ndati={"nome":"Amina","voto":28}\nprint(json.dumps(dati,ensure_ascii=False))', 'import json\nprint(json.loads(\'{"nome":"Amina","voto":28}\'))'],
    "Eccezioni try except": ['try:\n    numero=float(input("Numero: "))\n    print(numero*2)\nexcept ValueError:\n    print("Valore non valido")', 'try:\n    print(10/0)\nexcept ZeroDivisionError:\n    print("Divisione per zero")'],
    "API e requests": ['import requests\nr=requests.get("https://jsonplaceholder.typicode.com/users/1",timeout=10)\nr.raise_for_status()\nprint(r.json()["name"])', 'import requests\nr=requests.get("https://jsonplaceholder.typicode.com/todos/1",timeout=10)\nprint(r.status_code)'],
    "Progetto finale: applicazione Python": ['import os\ndef somma():\n    try:\n        a=float(input("Primo numero: "))\n        b=float(input("Secondo numero: "))\n        print("Somma:",a+b)\n    except ValueError:\n        print("Inserisci numeri validi")\ndef menu():\n    print("1. Somma")\n    print("2. Pulisci")\n    print("3. Esci")\ndef main():\n    while True:\n        menu()\n        try:\n            scelta=int(input("Scelta: "))\n            if scelta==1: somma()\n            elif scelta==2: os.system("cls" if os.name=="nt" else "clear")\n            elif scelta==3: break\n            else: print("Scelta non valida")\n        except ValueError:\n            print("Inserisci un numero")\nmain()', 'def valida_voto(voto):\n    return 0<=voto<=30\nprint(valida_voto(28))']
  };

  function examples(lang,topic){
    if(lang==='python'){
      const hit=Object.keys(py).find(k=>topic.toLowerCase().includes(k.toLowerCase())||k.toLowerCase().includes(topic.toLowerCase()));
      if(hit)return py[hit];
    }
    const x=topic.toLowerCase();
    if(lang==='html'){
      if(x.includes('titoli'))return ['<h1>Titolo principale</h1>\n<h2>Sezione</h2>\n<h3>Sottosezione</h3>','<h1>Corso Python</h1>\n<p>Impara passo dopo passo.</p>'];
      if(x.includes('paragrafi'))return ['<p>Questo è un paragrafo HTML.</p>\n<p>Questo è un secondo paragrafo.</p>','<article><h2>Corso</h2><p>Contenuto della lezione.</p></article>'];
      if(x.includes('link'))return ['<nav><a href="/">Home</a> <a href="/courses/">Corsi</a></nav>','<a href="https://example.com" target="_blank" rel="noopener">Apri il sito</a>'];
      if(x.includes('immagini'))return ['<img src="foto.jpg" alt="Studente che programma" width="320">','<figure><img src="foto.jpg" alt="Postazione di lavoro"><figcaption>Studio di programmazione</figcaption></figure>'];
      if(x.includes('liste'))return ['<ul><li>Python</li><li>C#</li><li>SQL</li></ul>','<ol><li>Installa</li><li>Codifica</li><li>Esegui</li></ol>'];
      if(x.includes('tabelle'))return ['<table><tr><th>Nome</th><th>Voto</th></tr><tr><td>Amina</td><td>28</td></tr></table>','<table><thead><tr><th>Corso</th><th>Ore</th></tr></thead><tbody><tr><td>Python</td><td>40</td></tr></tbody></table>'];
      if(x.includes('form')||x.includes('input'))return ['<form><label for="email">Email</label><input id="email" type="email" required><button type="submit">Invia</button></form>','<form><label for="nome">Nome</label><input id="nome" name="nome" type="text" required></form>'];
      if(x.includes('semant'))return ['<header><h1>MS Academy</h1></header><nav><a href="/">Home</a></nav><main><article><h2>Corso</h2><p>Contenuto.</p></article></main><footer>© 2025 Docente Moussa Salisou</footer>','<section><h2>Servizi</h2><p>Formazione e sviluppo.</p></section>'];
      if(x.includes('seo')||x.includes('meta'))return ['<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Corso di programmazione">','<title>Corso di programmazione</title>\n<link rel="canonical" href="https://example.com/corso">'];
      return [`<!-- ${topic} -->\n<section><h2>${topic}</h2><p>Esempio HTML collegato alla lezione.</p></section>`,`<article><h2>Applicazione pratica</h2><p>${topic}: esempio.</p></article>`];
    }
    if(lang==='css'){
      if(x.includes('box model')||x.includes('margin')||x.includes('padding'))return ['.card{width:300px;padding:20px;border:2px solid #173b63;margin:24px;box-sizing:border-box;}','.box{padding:16px;margin:10px 0;border:1px solid #ddd;}'];
      if(x.includes('flex'))return ['.menu{display:flex;align-items:center;justify-content:space-between;gap:16px;}','.cards{display:flex;flex-wrap:wrap;gap:20px;}'];
      if(x.includes('grid'))return ['.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}','.layout{display:grid;grid-template-columns:240px 1fr;gap:24px;}'];
      if(x.includes('responsive')||x.includes('media'))return ['.card{width:100%;}@media (min-width:700px){.card{width:50%;}}','@media (max-width:700px){.menu{flex-direction:column;}}'];
      if(x.includes('variabili'))return [':root{--primary:#173b63;--space:20px;}.card{color:var(--primary);padding:var(--space);}','.button{background:var(--primary);}'];
      if(x.includes('animation'))return ['@keyframes entra{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}.card{animation:entra .4s ease;}','.loader{animation:spin 1s linear infinite;}'];
      return [`/* ${topic} */\n.card{padding:20px;border:1px solid #ddd;border-radius:10px;}`,`.title{font-size:2rem;margin-bottom:12px;}`];
    }
    if(lang==='javascript'||lang==='typescript'){
      const typed=lang==='typescript';
      if(x.includes('variabil'))return [typed?'const nome:string="Moussa";\nlet eta:number=30;\nconsole.log(nome,eta);':'const nome="Moussa";\nlet eta=30;\nconsole.log(nome,eta);','const corso={nome:"Python",ore:40};\nconsole.log(corso.nome);'];
      if(x.includes('switch'))return [typed?'const scelta:number=2;\nswitch(scelta){case 1:console.log("Nuovo");break;case 2:console.log("Apri");break;default:console.log("Esci");}':'const scelta=2;\nswitch(scelta){case 1:console.log("Nuovo");break;case 2:console.log("Apri");break;default:console.log("Esci");}','function descrivi(ruolo:string){return ruolo==="docente"?"Insegna":"Utente";}\nconsole.log(descrivi("docente"));'];
      if(x.includes('cicli'))return ['for(let i=1;i<=5;i++){console.log(i);}','let n=3;while(n>0){console.log(n);n--;}'];
      if(x.includes('funzioni'))return [typed?'function somma(a:number,b:number):number{return a+b;}\nconsole.log(somma(12,8));':'function somma(a,b){return a+b;}\nconsole.log(somma(12,8));',typed?'const saluta=(nome:string):string=>`Ciao ${nome}`;':'const saluta=nome=>`Ciao ${nome}`;\nconsole.log(saluta("Moussa"));'];
      if(x.includes('array'))return ['const voti=[24,28,30];\nconsole.log(voti.map(v=>v+1));','const studenti=["Amina","Luca"];\nstudenti.push("Sara");\nconsole.log(studenti);'];
      if(x.includes('dom'))return ['const titolo=document.querySelector("#titolo");\nif(titolo) titolo.textContent="Benvenuto!";','document.querySelector("button")?.addEventListener("click",()=>alert("Cliccato!"));'];
      if(x.includes('fetch')||x.includes('http'))return ['fetch("https://jsonplaceholder.typicode.com/users/1").then(r=>r.json()).then(data=>console.log(data.name));','async function carica(){const r=await fetch("https://jsonplaceholder.typicode.com/users/1");console.log(await r.json());}\ncarica();'];
      return [`// ${topic}\n${typed?'const valore:number = 10;':'const valore = 10;'}\nconsole.log("${topic}:",valore);`,`function esempio(){return "Esempio pratico";}\nconsole.log(esempio());`];
    }
    if(lang==='sql'){
      if(x.includes('select'))return ['SELECT nome,voto FROM studenti;','SELECT nome,voto FROM studenti WHERE voto>=18 ORDER BY voto DESC;'];
      if(x.includes('where'))return ['SELECT nome,voto FROM studenti WHERE voto>=18;','SELECT * FROM studenti WHERE nome LIKE \'A%\';'];
      if(x.includes('group')||x.includes('aggregate'))return ['SELECT corso_id,COUNT(*) AS totale FROM studenti GROUP BY corso_id;','SELECT AVG(voto) AS media,MAX(voto) AS massimo FROM studenti;'];
      if(x.includes('join'))return ['SELECT s.nome,c.nome AS corso FROM studenti s INNER JOIN corsi c ON c.id=s.corso_id;','SELECT c.nome,COUNT(s.id) AS studenti FROM corsi c LEFT JOIN studenti s ON s.corso_id=c.id GROUP BY c.nome;'];
      if(x.includes('insert'))return ["INSERT INTO studenti(nome,voto) VALUES ('Amina',28);","INSERT INTO corsi(nome) VALUES ('Python');"];
      if(x.includes('update'))return ['UPDATE studenti SET voto=30 WHERE id=1;','UPDATE corsi SET nome=\'Python Avanzato\' WHERE id=2;'];
      if(x.includes('delete'))return ['DELETE FROM studenti WHERE id=1;','DELETE FROM studenti WHERE voto<18;'];
      if(x.includes('create'))return ['CREATE TABLE studenti(id INT PRIMARY KEY,nome VARCHAR(100) NOT NULL,voto INT);','CREATE TABLE corsi(id INT PRIMARY KEY,nome VARCHAR(100) NOT NULL);'];
      return [`-- ${topic}\nSELECT nome,voto FROM studenti;`,`-- Applicazione pratica: ${topic}\nSELECT corso_id,COUNT(*) AS totale FROM studenti GROUP BY corso_id;`];
    }
    const simple={
      c:['#include <stdio.h>\nint main(void){int valore=10;printf("Valore: %d\\n",valore);return 0;}','#include <stdio.h>\nint somma(int a,int b){return a+b;}\nint main(void){printf("%d\\n",somma(12,8));return 0;}'],
      cpp:['#include <iostream>\nint main(){int valore=10;std::cout<<valore;}','#include <iostream>\nint somma(int a,int b){return a+b;}\nint main(){std::cout<<somma(12,8);}'],
      csharp:['int valore=10;\nConsole.WriteLine(valore);','static int Somma(int a,int b)=>a+b;\nConsole.WriteLine(Somma(12,8));'],
      java:['public class Main{public static void main(String[] args){int valore=10;System.out.println(valore);}}','public class Main{static int somma(int a,int b){return a+b;}public static void main(String[] args){System.out.println(somma(12,8));}}'],
      php:['<?php\n$valore=10;\necho $valore;','<?php\nfunction somma(int $a,int $b):int{return $a+$b;}\necho somma(12,8);'],
      go:['package main\nimport "fmt"\nfunc main(){valore:=10;fmt.Println(valore)}','package main\nimport "fmt"\nfunc somma(a,b int)int{return a+b}\nfunc main(){fmt.Println(somma(12,8))}'],
      rust:['fn main(){let valore=10;println!("{}",valore);}','fn somma(a:i32,b:i32)->i32{a+b}\nfn main(){println!("{}",somma(12,8));}'],
      kotlin:['fun main(){val valore=10;println(valore)}','fun somma(a:Int,b:Int)=a+b\nfun main(){println(somma(12,8))}'],
      swift:['let valore=10\nprint(valore)','func somma(_ a:Int,_ b:Int)->Int{a+b}\nprint(somma(12,8))']
    };
    return simple[lang]||[`// ${topic}\nprint("${topic}")`,`// Esempio pratico di ${topic}`];
  }

  function build(course){
    return (course.topics||[]).map((topic,index)=>{const pair=examples(course.lang,topic);const level=index<6?'Fondamentale':index<20?'Base':index<35?'Intermedio':'Avanzato';return {title:topic,explain:`In questa lezione impari ${topic}. L'argomento viene presentato con un esempio semplice, un secondo esempio e un'attività pratica.`,syntax:`Studia la sintassi dell'esempio, individua la parte che realizza ${topic} e modifica un valore per verificare il comportamento.`,goals:[`Comprendere ${topic}`,'Scrivere autonomamente un esempio','Applicare il concetto a un caso reale'],code:pair[0],second:pair[1],lineByLine:`1. Leggi il codice dall'alto verso il basso.\n2. Individua la parte collegata a ${topic}.\n3. Esegui l'esempio.\n4. Modifica almeno un valore.\n5. Riscrivi l'esempio senza copiarlo.`,realExample:`Usa ${topic} in un caso realistico: studenti e voti, clienti e ordini, prodotti e prezzi oppure dati provenienti da file e API.`,exercise:`Crea una variante dell'esempio su ${topic}. Inserisci un dato di partenza, applica il concetto della lezione e mostra un risultato verificabile.`,solution:pair[1],mistakes:['Non copiare l esempio senza capire il ruolo delle istruzioni.','Controlla parentesi, indentazione, tipi e nomi delle variabili.','Esegui il codice dopo ogni modifica importante.'],quiz:[{q:`Qual è il tema principale della lezione “${topic}”?`,opts:[topic,'Un argomento diverso','Solo la grafica','Nessuno'],answer:0},{q:`Come verifichi meglio di aver capito “${topic}”?`,opts:['Modificando ed eseguendo l esempio','Copiandolo senza eseguirlo','Saltando l esercizio','Cambiando linguaggio'],answer:0}],challenge:`Costruisci una piccola funzionalità autonoma che utilizzi ${topic} e prova a inserirla nel progetto finale.`,difficulty:level};});
  }
  return {build};
})();
