(function(){
  'use strict';

  const path = window.location.pathname.toLowerCase();
  const configs = {
    corso_csharp: {
      label:'C# / .NET',
      intro:'Modifica il codice, premi Run nell’editor e osserva il risultato direttamente nella lezione.',
      examples:[
        ['Variabili e metodi','csharp','using System;\n\nclass Program\n{\n    static int Somma(int a, int b)\n    {\n        return a + b;\n    }\n\n    static void Main()\n    {\n        int risultato = Somma(10, 25);\n        Console.WriteLine($"Risultato: {risultato}");\n    }\n}'],
        ['LINQ','csharp','using System;\nusing System.Linq;\n\nvar numeri = new[] { 2, 5, 8, 11, 14, 20 };\nvar pari = numeri.Where(n => n % 2 == 0);\n\nConsole.WriteLine(string.Join(", ", pari));']
      ]
    },
    corso_blazor:{label:'Blazor',intro:'Prova C# e i concetti fondamentali usati nei componenti Blazor.',examples:[['Component logic','csharp','using System;\n\nstring nome = "Moussa";\nint contatore = 0;\n\ncontatore++;\nConsole.WriteLine($"Ciao {nome}, click: {contatore}");'],['Binding concept','csharp','string testo = "Blazor";\nConsole.WriteLine($"Valore visualizzato: {testo}");']]},
    corso_maui:{label:'.NET MAUI',intro:'Esercita la logica C# che userai nei progetti .NET MAUI.',examples:[['Binding e stato','csharp','using System;\n\nstring titolo = "La mia app MAUI";\nint contatore = 0;\ncontatore += 3;\nConsole.WriteLine($"{titolo}: {contatore}");'],['MVVM – modello','csharp','using System;\n\nclass Prodotto\n{\n    public string Nome { get; set; } = "Notebook";\n    public decimal Prezzo { get; set; } = 899m;\n}\n\nvar p = new Prodotto();\nConsole.WriteLine($"{p.Nome}: {p.Prezzo:C}");']]},
    corso_aspnet:{label:'ASP.NET Web API',intro:'Esegui esempi C# utili per controller, DTO e logica REST.',examples:[['DTO','csharp','using System;\n\nrecord Studente(int Id, string Nome, string Corso);\n\nvar studente = new Studente(1, "Amina", "C#");\nConsole.WriteLine($"{studente.Id} - {studente.Nome} - {studente.Corso}");'],['Status HTTP','csharp','using System;\n\nint statusCode = 200;\nstring messaggio = statusCode switch\n{\n    200 => "OK",\n    201 => "Created",\n    404 => "Not Found",\n    _ => "Unknown"\n};\nConsole.WriteLine(messaggio);']]},
    corso_python_data:{label:'Python Data Analyst',intro:'Analizza piccoli dataset con Python e prova subito il codice.',examples:[['Liste e statistiche','python','voti = [18, 24, 27, 30, 25]\nmedia = sum(voti) / len(voti)\nprint(f"Media: {media:.2f}")\nprint("Massimo:", max(voti))'],['Pandas','python','import pandas as pd\n\ndf = pd.DataFrame({\n    "nome": ["Amina", "Luca", "Sara"],\n    "voto": [28, 24, 30]\n})\n\nprint(df)\nprint("Media:", df["voto"].mean())']]},
    corso_tkinter:{label:'Python & Tkinter',intro:'L’editor permette di modificare ed eseguire la logica Python. Le GUI Tkinter complete possono richiedere un ambiente desktop.',examples:[['Python base','python','nome = "Moussa"\neta = 30\nprint(f"Ciao {nome}, hai {eta} anni")'],['Tkinter – struttura','python','import tkinter as tk\n\nroot = tk.Tk()\nroot.title("Prima app Tkinter")\nroot.geometry("420x240")\n\nlabel = tk.Label(root, text="Ciao da Tkinter")\nlabel.pack(pady=40)\n\nroot.mainloop()']]},
    corso_sqlserver:{label:'SQL Server',intro:'Esegui query SQL e modifica i dati nell’editor. Per SQL Server specifico puoi usare il collegamento alla documentazione del corso.',examples:[['SELECT e aggregazioni','sqlite','CREATE TABLE studenti (id INTEGER, nome TEXT, voto INTEGER);\nINSERT INTO studenti VALUES (1, "Amina", 28);\nINSERT INTO studenti VALUES (2, "Luca", 24);\nINSERT INTO studenti VALUES (3, "Sara", 30);\n\nSELECT * FROM studenti WHERE voto >= 27;'],['GROUP BY','sqlite','CREATE TABLE vendite (prodotto TEXT, quantita INTEGER);\nINSERT INTO vendite VALUES ("PC", 3);\nINSERT INTO vendite VALUES ("PC", 2);\nINSERT INTO vendite VALUES ("Mouse", 5);\n\nSELECT prodotto, SUM(quantita) AS totale\nFROM vendite\nGROUP BY prodotto;']]},
    corso_php:{label:'Full Stack PHP',intro:'Modifica ed esegui PHP direttamente nella pagina per sperimentare sintassi e backend.',examples:[['Funzioni PHP','php','<?php\nfunction saluta(string $nome): string {\n    return "Ciao " . $nome;\n}\n\necho saluta("Moussa");'],['Array e foreach','php','<?php\n$corsi = ["C#", "Python", "SQL", "PHP"];\n\nforeach ($corsi as $corso) {\n    echo $corso . PHP_EOL;\n}']]}
  };

  const key = Object.keys(configs).find(k => path.includes('/'+k)) || null;
  if(!key || document.querySelector('.course-lab')) return;

  const cfg = configs[key];
  const root = document.createElement('section');
  root.className = 'course-lab';
  root.innerHTML = '<div class="course-lab-head"><h2>Laboratorio interattivo</h2><p>'+cfg.intro+'</p></div><div class="course-lab-grid"></div><div class="course-lab-note"><strong>Nota didattica:</strong> il codice viene eseguito in un ambiente online isolato fornito da OneCompiler. Non inserire password, chiavi API o dati personali.</div>';
  const grid = root.querySelector('.course-lab-grid');

  cfg.examples.forEach((example,index)=>{
    const card=document.createElement('article');
    card.className='course-lab-card';
    const title=document.createElement('h3'); title.textContent=(index+1)+'. '+example[0];
    const p=document.createElement('p'); p.textContent='Modifica l’esempio e premi Run.';
    const iframe=document.createElement('iframe');
    iframe.className='course-lab-frame';
    iframe.id='oc-editor-'+index;
    iframe.title=cfg.label+' - '+example[0];
    iframe.loading='lazy';
    iframe.allow='clipboard-read; clipboard-write';
    iframe.src='https://onecompiler.com/embed/'+example[1]+'?listenToEvents=true&hideTitle=true&hideNew=true&theme=light';
    iframe.addEventListener('load',function(){
      try{
        iframe.contentWindow.postMessage({eventType:'populateCode',language:example[1],files:[{name:example[1]==='python'?'main.py':example[1]==='php'?'main.php':example[1]==='sqlite'?'main.sql':'Program.cs',content:example[2]}]},'*');
      }catch(e){}
    });
    card.append(title,p,iframe); grid.appendChild(card);
  });

  const target=document.querySelector('.center-col') || document.querySelector('main') || document.body;
  target.appendChild(root);
})();
