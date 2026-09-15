(function(){
  'use strict';

  function lesson(title, lead, explain, goals, syntax, code, second, third, steps, realExample, exercises, solution, mistakes, challenge, quiz){
    return {title,lead,explain,goals,syntax,code,second,third,steps,realExample,exercises,solution,mistakes,challenge,quiz};
  }

  const lessons = [
    lesson(
      'Introduzione e installazione',
      'Partiamo da Python e scopriamo perché Tkinter permette di trasformare uno script in una vera applicazione grafica.',
      'Tkinter è la libreria GUI inclusa nella distribuzione standard di Python. Non serve installare un framework esterno per iniziare: importiamo tkinter, creiamo una finestra Tk e avviamo il ciclo degli eventi con mainloop().',
      ['Capire cos’è una GUI','Verificare Python e Tkinter','Conoscere la struttura minima di un’app Tkinter','Eseguire il primo programma'],
      'import tkinter as tk\nroot = tk.Tk()\nroot.mainloop()',
      'import tkinter as tk\n\nroot = tk.Tk()\nroot.title("La mia prima app")\nroot.geometry("500x300")\n\nroot.mainloop()',
      'import tkinter as tk\n\nroot = tk.Tk()\nroot.title("Docente Moussa")\nroot.configure(bg="white")\nroot.mainloop()',
      'import tkinter as tk\nprint("Tkinter disponibile")\nroot = tk.Tk()\nroot.destroy()',
      ['import tkinter as tk → importa la libreria e usa tk come alias.','root = tk.Tk() → crea la finestra principale.','title() → assegna il titolo mostrato nella barra della finestra.','geometry() → imposta larghezza e altezza iniziali.','mainloop() → mantiene attiva l’applicazione e ascolta gli eventi.'],
      'Ogni applicazione desktop parte da una finestra principale che ospiterà widget, menu, form e altre finestre.',
      [
        {title:'Esercizio 1 — Prima finestra',text:'Crea una finestra chiamata "Scuola Moussa" con dimensione 600x400.'},
        {title:'Esercizio 2 — Personalizza',text:'Cambia il titolo e aggiungi un colore di sfondo alla finestra.'},
        {title:'Esercizio 3 — Controlla l’ambiente',text:'Esegui un programma che importi tkinter e stampi un messaggio prima di creare la finestra.'}
      ],
      'import tkinter as tk\n\nroot = tk.Tk()\nroot.title("Scuola Moussa")\nroot.geometry("600x400")\nroot.configure(bg="white")\nroot.mainloop()',
      ['Dimenticare mainloop().','Usare Tk() più volte per creare la finestra principale.','Confondere tkinter con un pacchetto da installare sempre tramite pip.'],
      'Aggiungi una costante per larghezza e altezza e costruisci la finestra usando quelle costanti.',
      [
        {q:'Quale istruzione crea la finestra principale?',opts:['tk.Tk()','tk.Window()','tk.Main()','tk.GUI()'],answer:0,explain:'Tk() crea l’istanza della finestra principale.'},
        {q:'A cosa serve mainloop()?',opts:['Avviare il ciclo degli eventi','Creare un database','Compilare Python','Chiudere la finestra'],answer:0,explain:'Il ciclo degli eventi permette alla GUI di reagire alle azioni dell’utente.'},
        {q:'Serve necessariamente pip per usare tkinter?',opts:['No, normalmente è incluso con Python','Sì, sempre','Solo su Windows','Solo su Linux'],answer:0,explain:'Tkinter è normalmente distribuito insieme a Python.'},
        {q:'Quale metodo cambia il titolo?',opts:['title()','caption()','header()','name()'],answer:0,explain:'title() imposta il testo della barra del titolo.'},
        {q:'Cosa rappresenta root?',opts:['La finestra principale','Un database','Un pulsante','Un file'],answer:0,explain:'È il riferimento alla finestra principale.'},
        {q:'geometry("500x300") indica...',opts:['larghezza e altezza iniziali','due coordinate del mouse','due widget','due colori'],answer:0,explain:'La sintassi indica dimensioni iniziali della finestra.'}
      ]
    ),
    lesson(
      'Prima finestra e Label',
      'Costruiamo una GUI leggibile inserendo testo, dimensioni, font e allineamento.',
      'Un Label mostra informazioni all’utente. È uno dei widget fondamentali e introduce il concetto di widget: un oggetto grafico inserito dentro un contenitore.',
      ['Creare un Label','Modificare testo e font','Usare pack()','Comprendere parent e widget'],
      'label = tk.Label(root, text="Ciao")\nlabel.pack()',
      'import tkinter as tk\n\nroot = tk.Tk()\nroot.title("Label")\n\nlabel = tk.Label(root, text="Benvenuto al corso Tkinter", font=("Arial", 18))\nlabel.pack(pady=40)\n\nroot.mainloop()',
      'label = tk.Label(root, text="Python", fg="white", bg="#173b63", padx=20, pady=10)\nlabel.pack()',
      'tk.Label(root, text="Nome studente").pack()\ntk.Label(root, text="Moussa").pack()',
      ['Label riceve root come contenitore.','text stabilisce il contenuto visualizzato.','font controlla famiglia e dimensione del carattere.','pack() inserisce il widget nella finestra.','pady aggiunge spazio verticale.'],
      'Un titolo, una descrizione o il nome di un campo di un modulo possono essere rappresentati con Label.',
      [
        {title:'Esercizio 1 — Titolo',text:'Crea una Label con il testo "Corso Python" e font 24.'},
        {title:'Esercizio 2 — Colori',text:'Crea una Label con testo bianco e sfondo blu.'},
        {title:'Esercizio 3 — Informazioni',text:'Mostra nome, corso e anno dello studente usando tre Label.'}
      ],
      'import tkinter as tk\nroot = tk.Tk()\ntk.Label(root, text="Corso Python", font=("Arial", 24)).pack(pady=20)\ntk.Label(root, text="Docente Moussa", fg="white", bg="#173b63").pack(pady=10)\nroot.mainloop()',
      ['Creare il widget senza assegnarlo al contenitore corretto.','Dimenticare pack(), grid() o place().','Usare una stringa per font quando serve una tupla con famiglia e dimensione.'],
      'Crea una piccola intestazione con titolo, sottotitolo e autore.',
      [
        {q:'Quale widget mostra testo?',opts:['Label','Button','Entry','Canvas'],answer:0,explain:'Label è il widget standard per visualizzare testo.'},
        {q:'Quale metodo inserisce rapidamente un widget?',opts:['pack()','put()','show()','placeText()'],answer:0,explain:'pack() è uno dei tre geometry manager.'},
        {q:'pady aggiunge...',opts:['spazio verticale','testo','colore','un evento'],answer:0,explain:'pady controlla il padding verticale esterno.'},
        {q:'fg indica...',opts:['colore del testo','colore dello sfondo','font','dimensione'],answer:0,explain:'fg è il foreground color.'},
        {q:'bg indica...',opts:['colore di sfondo','colore testo','bordo','larghezza'],answer:0,explain:'bg è il background color.'},
        {q:'Un widget deve essere inserito in un...',opts:['contenitore','database','file JSON','thread'],answer:0,explain:'root o un Frame possono essere parent del widget.'}
      ]
    ),
    lesson(
      'Button, Entry e input utente',
      'Facciamo interagire l’utente con pulsanti e campi di testo.',
      'Entry permette di raccogliere una singola riga di testo. Button esegue una funzione quando l’utente fa clic. Qui introduciamo il principio event-driven.',
      ['Leggere Entry.get()','Collegare command a una funzione','Aggiornare una Label','Gestire input utente'],
      'def saluta():\n    nome = entry.get()\n    label.config(text=f"Ciao {nome}")',
      'import tkinter as tk\n\nroot = tk.Tk()\nroot.title("Input utente")\n\nentry = tk.Entry(root, width=30)\nentry.pack(pady=10)\n\nlabel = tk.Label(root, text="Inserisci il tuo nome")\nlabel.pack(pady=10)\n\ndef saluta():\n    nome = entry.get()\n    label.config(text=f"Ciao {nome}!")\n\ntk.Button(root, text="Saluta", command=saluta).pack(pady=10)\nroot.mainloop()',
      'def conta():\n    valore = int(entry.get())\n    label.config(text=f"Valore: {valore + 1}")',
      'entry = tk.Entry(root)\nbutton = tk.Button(root, text="Invia", command=lambda: print(entry.get()))',
      ['Entry raccoglie il testo.','get() legge il contenuto dell’Entry.','command collega il clic a una funzione.','config() modifica un widget già creato.','La funzione viene passata senza parentesi: command=saluta.'],
      'Un modulo di registrazione può leggere nome ed email, validare i valori e aggiornare il messaggio di conferma.',
      [
        {title:'Esercizio 1 — Saluto',text:'Crea Entry + Button e mostra "Benvenuto NOME".'},
        {title:'Esercizio 2 — Contatore',text:'Leggi un numero da Entry e visualizza il numero successivo.'},
        {title:'Esercizio 3 — Login simulato',text:'Crea due Entry per username e password e mostra un messaggio dopo il click.'}
      ],
      'import tkinter as tk\nroot=tk.Tk()\nentry=tk.Entry(root,width=30)\nentry.pack(pady=10)\nlabel=tk.Label(root,text="Inserisci il nome")\nlabel.pack()\ndef saluta():\n    nome=entry.get().strip()\n    label.config(text=f"Benvenuto {nome}" if nome else "Inserisci un nome")\ntk.Button(root,text="Invia",command=saluta).pack(pady=10)\nroot.mainloop()',
      ['Scrivere command=saluta() invece di command=saluta.','Dimenticare di leggere Entry con get().','Non gestire un campo vuoto.'],
      'Aggiungi un secondo campo per il cognome e mostra il nome completo.',
      [
        {q:'Come leggi il contenuto di Entry?',opts:['get()','read()','value()','text()'],answer:0,explain:'Entry.get() restituisce il testo inserito.'},
        {q:'Come colleghi un Button a una funzione?',opts:['command=nome_funzione','click=nome_funzione','run=nome_funzione','event=nome_funzione'],answer:0,explain:'command è l’opzione standard del Button.'},
        {q:'Perché non scriviamo command=saluta()?',opts:['Perché chiamerebbe subito la funzione','Perché Python non supporta funzioni','Perché Button non supporta funzioni','Perché get() non funziona'],answer:0,explain:'Il callback deve essere eseguito al click, non durante la costruzione.'},
        {q:'config() serve a...',opts:['modificare un widget esistente','creare un database','chiudere Python','installare tkinter'],answer:0,explain:'config() aggiorna proprietà del widget.'},
        {q:'Quale concetto introduciamo?',opts:['Programmazione guidata dagli eventi','SQL','Multithreading','Networking'],answer:0,explain:'La GUI reagisce agli eventi dell’utente.'},
        {q:'Entry è adatto soprattutto a...',opts:['testo su una riga','disegno','animazioni 3D','database'],answer:0,explain:'Entry è un campo di input a singola riga.'}
      ]
    ),
    lesson(
      'Layout e geometry manager',
      'Impariamo pack, grid e place e soprattutto quando usare ciascuno.',
      'I geometry manager determinano dove vengono collocati i widget. In un’app reale grid è spesso utile per form, pack per strutture semplici e place per posizionamenti assoluti controllati.',
      ['Conoscere pack','Usare grid per form','Capire place','Organizzare i Frame'],
      'widget.grid(row=0, column=0, padx=8, pady=8)',
      'import tkinter as tk\nroot=tk.Tk()\nroot.title("Form")\n\ntk.Label(root,text="Nome").grid(row=0,column=0,padx=8,pady=8,sticky="e")\ntk.Entry(root).grid(row=0,column=1,padx=8,pady=8)\ntk.Label(root,text="Email").grid(row=1,column=0,padx=8,pady=8,sticky="e")\ntk.Entry(root).grid(row=1,column=1,padx=8,pady=8)\nroot.mainloop()',
      'frame=tk.Frame(root,padx=20,pady=20)\nframe.pack(fill="both",expand=True)',
      'tk.Button(root,text="Salva").place(x=150,y=180)',
      ['pack organizza i widget lungo un lato del contenitore.','grid usa righe e colonne.','place usa coordinate esplicite.','Frame permette di creare sezioni indipendenti.','Non usare grid e pack nello stesso parent.'],
      'Un form di registrazione è un caso naturale per grid perché ogni campo può essere allineato in una riga e una colonna.',
      [
        {title:'Esercizio 1 — Form',text:'Crea un form Nome, Cognome, Email usando grid.'},
        {title:'Esercizio 2 — Frame',text:'Dividi la finestra in header, contenuto e footer usando Frame + pack.'},
        {title:'Esercizio 3 — Responsive',text:'Usa rowconfigure/columnconfigure e sticky per permettere al form di espandersi.'}
      ],
      'import tkinter as tk\nroot=tk.Tk()\nroot.columnconfigure(1,weight=1)\nfor r,label in enumerate(["Nome","Cognome","Email"]):\n    tk.Label(root,text=label).grid(row=r,column=0,padx=10,pady=10,sticky="e")\n    tk.Entry(root).grid(row=r,column=1,padx=10,pady=10,sticky="ew")\nroot.mainloop()',
      ['Mescolare pack e grid nello stesso parent.','Usare place per tutto e ottenere interfacce fragili.','Dimenticare sticky e weight nei form ridimensionabili.'],
      'Costruisci una schermata login centrata e ridimensionabile.',
      [
        {q:'Quale geometry manager usa righe e colonne?',opts:['grid','pack','place','row'],answer:0,explain:'grid organizza i widget in una griglia.'},
        {q:'Quale manager usa coordinate x/y?',opts:['place','grid','pack','table'],answer:0,explain:'place consente coordinate esplicite.'},
        {q:'A cosa serve Frame?',opts:['Organizzare sezioni della GUI','Eseguire SQL','Creare thread','Leggere JSON'],answer:0,explain:'Frame è un contenitore per altri widget.'},
        {q:'È consigliato usare pack e grid nello stesso parent?',opts:['No','Sempre','Solo con Entry','Solo su Linux'],answer:0,explain:'Nel medesimo contenitore è meglio scegliere un geometry manager.'},
        {q:'sticky="ew" permette...',opts:['di espandere il widget orizzontalmente','di cambiare colore','di chiudere la finestra','di eseguire una funzione'],answer:0,explain:'sticky controlla l’allineamento nelle celle grid.'},
        {q:'rowconfigure(..., weight=1) aiuta a...',opts:['gestire lo spazio quando la finestra cambia dimensione','creare un widget','leggere un file','validare un form'],answer:0,explain:'weight assegna priorità nella distribuzione dello spazio.'}
      ]
    ),
    lesson(
      'Eventi, callback e variabili Tkinter',
      'Colleghiamo tastiera, mouse e variabili dell’interfaccia alla logica Python.',
      'Oltre a command, Tkinter offre bind() per eventi come click, tasti e movimento del mouse. StringVar, IntVar, DoubleVar e BooleanVar mantengono lo stato sincronizzato con i widget.',
      ['Usare bind','Conoscere event','Usare StringVar e IntVar','Separare UI e logica'],
      'root.bind("<Return>", gestisci_invior)',
      'import tkinter as tk\nroot=tk.Tk()\nvar=tk.StringVar(value="Moussa")\nentry=tk.Entry(root,textvariable=var)\nentry.pack(pady=20)\nlabel=tk.Label(root,textvariable=var)\nlabel.pack()\nroot.mainloop()',
      'def clic(event):\n    print("Coordinate:",event.x,event.y)\nroot.bind("<Button-1>",clic)',
      'def aggiorna(*args):\n    print("Valore:",var.get())\nvar.trace_add("write",aggiorna)',
      ['StringVar contiene stato testuale.','textvariable collega lo stato al widget.','bind() registra un handler per un evento.','L’handler riceve normalmente un oggetto event.','get() e set() leggono e aggiornano le variabili Tkinter.'],
      'Una barra di ricerca può aggiornare automaticamente un’etichetta o filtrare una lista mentre l’utente digita.',
      [
        {title:'Esercizio 1 — Enter',text:'Premendo Invio stampa il contenuto di un Entry.'},
        {title:'Esercizio 2 — Variabile',text:'Collega StringVar a Entry e Label in modo che la Label mostri sempre il valore.'},
        {title:'Esercizio 3 — Mouse',text:'Mostra in una Label le coordinate del mouse durante un click.'}
      ],
      'import tkinter as tk\nroot=tk.Tk()\nvar=tk.StringVar()\nentry=tk.Entry(root,textvariable=var)\nentry.pack(pady=10)\nlabel=tk.Label(root,text="Scrivi qualcosa")\nlabel.pack()\ndef aggiorna(*_):\n    label.config(text=f"Hai scritto: {var.get()}")\nvar.trace_add("write",aggiorna)\nroot.mainloop()',
      ['Dimenticare l’oggetto event in un callback bind.','Usare var.get senza parentesi.','Aggiornare direttamente troppi widget invece di centralizzare lo stato.'],
      'Realizza un contatore con StringVar o IntVar e due pulsanti +1 e -1.',
      [
        {q:'Quale metodo registra un evento?',opts:['bind()','event()','listen()','on()'],answer:0,explain:'bind associa un evento a una funzione.'},
        {q:'StringVar è usata per...',opts:['valori testuali collegati alla GUI','SQL','immagini','file ZIP'],answer:0,explain:'StringVar rappresenta stato testuale Tkinter.'},
        {q:'Il callback di bind riceve spesso...',opts:['un oggetto event','un database','una stringa SQL','un Frame'],answer:0,explain:'L’oggetto event contiene informazioni sull’evento.'},
        {q:'textvariable permette...',opts:['di sincronizzare il testo con una variabile Tk','di cambiare il font','di creare un Button','di chiudere la GUI'],answer:0,explain:'È il collegamento tra widget e variabile Tkinter.'},
        {q:'get() serve a...',opts:['leggere il valore','impostare il valore','creare la finestra','fare il bind'],answer:0,explain:'get restituisce il valore corrente.'},
        {q:'set() serve a...',opts:['impostare il valore','leggere il valore','creare un widget','avviare mainloop'],answer:0,explain:'set aggiorna il valore della variabile Tkinter.'}
      ]
    ),
    lesson(
      'Checkbutton, Radiobutton, Listbox e Combobox',
      'Introduciamo i controlli di selezione usati nei form reali.',
      'Checkbutton rappresenta scelte indipendenti, Radiobutton una scelta tra alternative e Listbox/Combobox permettono di selezionare elementi da una lista.',
      ['Gestire BooleanVar','Usare Radiobutton','Leggere Listbox','Usare ttk.Combobox'],
      'tk.Checkbutton(root, text="Accetto", variable=accetto)',
      'import tkinter as tk\nfrom tkinter import ttk\nroot=tk.Tk()\n\naccetto=tk.BooleanVar()\ntk.Checkbutton(root,text="Accetto i termini",variable=accetto).pack(pady=10)\n\nscelta=tk.StringVar(value="Python")\nfor valore in ["Python","C#","SQL"]:\n    tk.Radiobutton(root,text=valore,variable=scelta,value=valore).pack(anchor="w")\n\ncombo=ttk.Combobox(root,textvariable=scelta,values=["Python","C#","SQL"],state="readonly")\ncombo.pack(pady=10)\nroot.mainloop()',
      'lista=tk.Listbox(root,height=5)\nfor corso in ["Python","C#","SQL"]: lista.insert(tk.END,corso)\nlista.pack()',
      'combo=ttk.Combobox(root,values=["Ferrara","Bologna","Modena"],state="readonly")\ncombo.pack()',
      ['BooleanVar è adatta a Checkbutton.','Radiobutton usa una stessa variabile con valori differenti.','Listbox contiene più elementi selezionabili.','Combobox offre una lista a discesa.','ttk fornisce widget con stile più moderno.'],
      'Un modulo di iscrizione a un corso può chiedere accettazione termini, percorso preferito e città.',
      [
        {title:'Esercizio 1 — Checkbox',text:'Crea un checkbox e mostra lo stato True/False in una Label.'},
        {title:'Esercizio 2 — Radio',text:'Permetti di scegliere tra Python, C# e SQL.'},
        {title:'Esercizio 3 — Combobox',text:'Crea una lista di città e mostra la selezione.'}
      ],
      'import tkinter as tk\nfrom tkinter import ttk\nroot=tk.Tk()\nscelta=tk.StringVar(value="Python")\ncombo=ttk.Combobox(root,textvariable=scelta,values=["Python","C#","SQL"],state="readonly")\ncombo.pack(pady=20)\nlabel=tk.Label(root,textvariable=scelta)\nlabel.pack()\nroot.mainloop()',
      ['Usare variabili diverse per Radiobutton che devono rappresentare una sola scelta.','Dimenticare state="readonly" quando non vuoi input libero.','Non controllare la selezione della Listbox.'],
      'Costruisci un modulo per scegliere corso, livello e accettazione dei termini.',
      [
        {q:'Quale widget rappresenta una scelta sì/no?',opts:['Checkbutton','Radiobutton','Canvas','Menu'],answer:0,explain:'Checkbutton è adatto a una scelta indipendente.'},
        {q:'Radiobutton è adatto a...',opts:['una scelta tra alternative','testo lungo','disegno','file'],answer:0,explain:'Più Radiobutton condividono una variabile.'},
        {q:'Combobox mostra...',opts:['una lista a discesa','un canvas','un database','una finestra'],answer:0,explain:'ttk.Combobox presenta valori selezionabili.'},
        {q:'BooleanVar contiene...',opts:['True/False','un’immagine','un file','una lista SQL'],answer:0,explain:'È una variabile Tkinter booleana.'},
        {q:'Listbox serve a...',opts:['mostrare/selezionare elementi da una lista','creare finestre','disegnare','fare HTTP'],answer:0,explain:'Listbox è il controllo lista standard.'},
        {q:'state="readonly" nella Combobox...',opts:['impedisce l’inserimento libero','chiude la finestra','disabilita Python','crea un database'],answer:0,explain:'Permette la sola selezione dei valori disponibili.'}
      ]
    ),
    lesson(
      'ttk, Frame, Menu e finestre secondarie',
      'Passiamo da singoli widget a interfacce organizzate come vere applicazioni desktop.',
      'ttk aggiunge widget e temi più moderni. Frame permette di separare le responsabilità visive. Menu e Toplevel introducono navigazione e finestre secondarie.',
      ['Usare ttk.Style','Organizzare Frame','Creare menu','Aprire Toplevel'],
      'from tkinter import ttk\nstyle = ttk.Style(root)\nstyle.theme_use("clam")',
      'import tkinter as tk\nfrom tkinter import ttk, messagebox\n\nroot=tk.Tk()\nroot.title("Dashboard")\n\nbarra=ttk.Frame(root,padding=12)\nbarra.pack(fill="x")\nttk.Label(barra,text="Dashboard Scuola",font=("Arial",18,"bold")).pack(side="left")\n\ndef apri():\n    win=tk.Toplevel(root)\n    win.title("Dettaglio")\n    ttk.Label(win,text="Questa è una seconda finestra").pack(padx=30,pady=30)\n\nmenu=tk.Menu(root)\nfile_menu=tk.Menu(menu,tearoff=False)\nfile_menu.add_command(label="Apri finestra",command=apri)\nfile_menu.add_separator()\nfile_menu.add_command(label="Esci",command=root.destroy)\nmenu.add_cascade(label="File",menu=file_menu)\nroot.config(menu=menu)\nroot.mainloop()',
      'from tkinter import ttk\nroot=tk.Tk()\nstyle=ttk.Style(root)\nstyle.theme_use("clam")\nttk.Button(root,text="Salva").pack(pady=30)\nroot.mainloop()',
      'win=tk.Toplevel(root)\nwin.transient(root)\nwin.grab_set()\nwin.title("Modifica studente")',
      ['ttk.Style controlla temi e stili.','Frame crea contenitori per sezioni.','Menu costruisce la barra dei menu.','Toplevel crea una finestra figlia.','destroy chiude una finestra o l’applicazione.'],
      'Un gestionale può avere menu File/Modifica, una dashboard principale e finestre separate per inserimento e modifica dati.',
      [
        {title:'Esercizio 1 — ttk',text:'Crea una finestra con Label e Button ttk usando il tema clam.'},
        {title:'Esercizio 2 — Menu',text:'Crea File > Nuovo, Salva e Esci.'},
        {title:'Esercizio 3 — Toplevel',text:'Apri una finestra secondaria con un form di modifica.'}
      ],
      'import tkinter as tk\nfrom tkinter import ttk\nroot=tk.Tk()\nroot.title("App")\ndef nuova_finestra():\n    win=tk.Toplevel(root)\n    win.title("Nuovo")\n    ttk.Label(win,text="Finestra secondaria").pack(padx=30,pady=30)\nmenu=tk.Menu(root)\nfile_menu=tk.Menu(menu,tearoff=False)\nfile_menu.add_command(label="Nuovo",command=nuova_finestra)\nfile_menu.add_command(label="Esci",command=root.destroy)\nmenu.add_cascade(label="File",menu=file_menu)\nroot.config(menu=menu)\nroot.mainloop()',
      ['Dimenticare tearoff=False nei menu moderni.','Chiudere root quando vuoi chiudere solo Toplevel.','Mettere tutta la GUI in una singola funzione enorme.'],
      'Crea una finestra principale con menu File e una finestra Modifica Studente.',
      [
        {q:'Quale widget crea una finestra secondaria?',opts:['Toplevel','Window2','Dialog','Child'],answer:0,explain:'Toplevel rappresenta una finestra aggiuntiva.'},
        {q:'ttk serve soprattutto a...',opts:['widget e stili moderni','database','HTTP','compilazione'],answer:0,explain:'ttk è il set di widget tematizzabili.'},
        {q:'Menu.add_command collega...',opts:['una voce a una callback','un database','un colore','un file'],answer:0,explain:'La voce può eseguire una funzione tramite command.'},
        {q:'destroy() serve a...',opts:['chiudere/distruggere una finestra','creare una Label','leggere Entry','fare un bind'],answer:0,explain:'Distrugge il widget indicato.'},
        {q:'Frame è...',opts:['un contenitore','un evento','un database','un thread'],answer:0,explain:'Frame raggruppa widget.'},
        {q:'grab_set() può essere usato per...',opts:['rendere una finestra modale','creare un menu','leggere una lista','disegnare'],answer:0,explain:'La finestra cattura l’interazione finché resta attiva.'}
      ]
    ),
    lesson(
      'Messagebox, filedialog e validazione',
      'Impariamo a mostrare messaggi, scegliere file e impedire input non validi.',
      'Le finestre di dialogo rendono una GUI più professionale. La validazione deve essere fatta prima di salvare dati o eseguire operazioni importanti.',
      ['Usare messagebox','Aprire e salvare file','Validare Entry','Gestire errori'],
      'messagebox.showinfo("Titolo", "Operazione completata")',
      'import tkinter as tk\nfrom tkinter import messagebox, filedialog\n\nroot=tk.Tk()\n\ndef scegli_file():\n    path=filedialog.askopenfilename(filetypes=[("Testo","*.txt"),("Tutti","*.*")])\n    if path:\n        messagebox.showinfo("File",f"Hai scelto: {path}")\n\ntk.Button(root,text="Apri file",command=scegli_file).pack(pady=30)\nroot.mainloop()',
      'from tkinter import messagebox\nmessagebox.askyesno("Conferma","Vuoi eliminare il record?")',
      'def valida():\n    if not entry.get().strip():\n        messagebox.showerror("Errore","Il campo è obbligatorio")',
      ['showinfo comunica un successo o un’informazione.','showwarning mostra un avviso.','showerror segnala un errore.','askyesno restituisce True o False.','filedialog restituisce il percorso scelto.'],
      'Prima di eliminare uno studente, l’app deve chiedere conferma; prima di salvare, deve controllare i campi obbligatori.',
      [
        {title:'Esercizio 1 — Conferma',text:'Mostra una domanda askyesno prima di eseguire una cancellazione simulata.'},
        {title:'Esercizio 2 — File',text:'Apri un file .txt con filedialog e visualizza il percorso scelto.'},
        {title:'Esercizio 3 — Validazione',text:'Impedisci il salvataggio quando Nome o Email sono vuoti.'}
      ],
      'import tkinter as tk\nfrom tkinter import messagebox\nroot=tk.Tk()\nentry=tk.Entry(root)\nentry.pack(pady=10)\ndef salva():\n    if not entry.get().strip():\n        messagebox.showerror("Errore","Inserisci un valore")\n        return\n    messagebox.showinfo("OK","Dati salvati")\ntk.Button(root,text="Salva",command=salva).pack()\nroot.mainloop()',
      ['Usare solo validazione grafica senza validare i dati.','Ignorare il valore restituito da askyesno.','Non gestire Cancel nei dialog.'],
      'Costruisci una funzione di conferma riutilizzabile per operazioni distruttive.',
      [
        {q:'Quale funzione mostra un errore?',opts:['showerror','showfail','errorbox','alertError'],answer:0,explain:'messagebox.showerror mostra un dialog di errore.'},
        {q:'askyesno restituisce...',opts:['True o False','un file','un Entry','un widget'],answer:0,explain:'Il risultato indica la scelta dell’utente.'},
        {q:'filedialog.askopenfilename restituisce normalmente...',opts:['un percorso','un Button','un numero','un database'],answer:0,explain:'Restituisce il percorso selezionato oppure una stringa vuota.'},
        {q:'La validazione dovrebbe avvenire...',opts:['prima del salvataggio/elaborazione','solo dopo il crash','mai','solo in CSS'],answer:0,explain:'Serve a prevenire dati non validi.'},
        {q:'showwarning serve per...',opts:['un avviso','un database','un input','un file'],answer:0,explain:'Mostra un messaggio di attenzione.'},
        {q:'Se l’utente annulla un filedialog...',opts:['può restituire una stringa vuota','crea sempre un file','chiude Python','crea una Label'],answer:0,explain:'Il programma deve controllare il caso di annullamento.'}
      ]
    ),
    lesson(
      'Canvas e disegno',
      'Disegniamo forme, testo e immagini e impariamo a identificare gli oggetti sul Canvas.',
      'Canvas è un’area grafica dove possiamo creare linee, rettangoli, ovali, testo e immagini. Ogni oggetto ha un id che possiamo usare per modificarlo o muoverlo.',
      ['Creare forme','Usare create_*','Modificare oggetti','Capire coordinate e tag'],
      'canvas.create_rectangle(x1,y1,x2,y2,fill="blue")',
      'import tkinter as tk\nroot=tk.Tk()\ncanvas=tk.Canvas(root,width=600,height=350,bg="white")\ncanvas.pack()\ncanvas.create_rectangle(50,50,250,180,fill="#173b63")\ncanvas.create_oval(300,80,420,200,fill="#2f855a")\ncanvas.create_text(300,280,text="Tkinter Canvas",font=("Arial",20,"bold"))\nroot.mainloop()',
      'line=canvas.create_line(20,20,200,120,fill="red",width=3)\ncanvas.itemconfig(line,width=6)',
      'rect=canvas.create_rectangle(20,20,80,80)\ncanvas.move(rect,10,0)',
      ['Canvas usa un sistema di coordinate con origine in alto a sinistra.','create_rectangle crea rettangoli.','create_oval crea ovali/cerchi.','create_line crea linee.','itemconfig modifica proprietà di un oggetto.','move sposta un oggetto.'],
      'Canvas può essere usato per grafici semplici, firme, mappe, giochi e piccoli editor grafici.',
      [
        {title:'Esercizio 1 — Forme',text:'Disegna un rettangolo, un cerchio e una linea.'},
        {title:'Esercizio 2 — Logo',text:'Crea un piccolo logo usando forme e testo.'},
        {title:'Esercizio 3 — Movimento',text:'Crea un quadrato e spostalo quando premi un Button.'}
      ],
      'import tkinter as tk\nroot=tk.Tk()\ncanvas=tk.Canvas(root,width=500,height=300,bg="white")\ncanvas.pack()\nrect=canvas.create_rectangle(50,50,120,120,fill="blue")\ndef destra():\n    canvas.move(rect,20,0)\ntk.Button(root,text="Sposta",command=destra).pack(pady=10)\nroot.mainloop()',
      ['Invertire x/y nelle coordinate.','Confondere id dell’oggetto con il widget Canvas.','Disegnare fuori dall’area visibile.'],
      'Crea una piccola area di disegno dove il mouse lascia punti quando viene cliccato.',
      [
        {q:'Quale metodo crea un rettangolo?',opts:['create_rectangle','rectangle','draw_rect','add_rectangle'],answer:0,explain:'È il metodo Canvas standard.'},
        {q:'L’origine delle coordinate Canvas è...',opts:['in alto a sinistra','in basso a destra','al centro','fuori dalla finestra'],answer:0,explain:'x cresce verso destra e y verso il basso.'},
        {q:'move() serve a...',opts:['spostare un oggetto','creare una finestra','aprire un file','cambiare font'],answer:0,explain:'Canvas.move modifica la posizione relativa.'},
        {q:'itemconfig() serve a...',opts:['modificare proprietà di un oggetto Canvas','creare SQLite','leggere Entry','chiudere root'],answer:0,explain:'Permette di aggiornare proprietà dell’item.'},
        {q:'create_text crea...',opts:['testo sul Canvas','un Entry','un file','un menu'],answer:0,explain:'Inserisce testo nell’area grafica.'},
        {q:'Ogni item Canvas ha normalmente...',opts:['un identificatore numerico','un database','un thread','un URL'],answer:0,explain:'L’id permette di riferirsi all’oggetto.'}
      ]
    ),
    lesson(
      'after(), timer e animazioni',
      'Creiamo animazioni senza bloccare il ciclo eventi della GUI.',
      'after() pianifica una funzione tra un certo numero di millisecondi. È fondamentale per timer, animazioni e aggiornamenti periodici senza usare loop bloccanti.',
      ['Usare after','Creare un timer','Muovere oggetti','Evitare time.sleep nella GUI'],
      'root.after(1000, funzione)',
      'import tkinter as tk\nroot=tk.Tk()\nsecondi=0\nlabel=tk.Label(root,font=("Arial",30))\nlabel.pack(pady=40)\n\ndef tick():\n    global secondi\n    secondi += 1\n    label.config(text=f"Secondi: {secondi}")\n    root.after(1000,tick)\n\ntick()\nroot.mainloop()',
      'def aggiorna():\n    canvas.move(palla,5,0)\n    root.after(16,aggiorna)\naggiorna()',
      'def countdown(n):\n    label.config(text=str(n))\n    if n>0: root.after(1000,countdown,n-1)',
      ['after pianifica una callback.','Non blocca il mainloop come farebbe time.sleep.','16 ms corrispondono circa a 60 aggiornamenti al secondo.','Un timer ricorsivo richiama se stesso tramite after.'],
      'Un’app può mostrare un cronometro, una barra di avanzamento o animare un elemento grafico.',
      [
        {title:'Esercizio 1 — Orologio',text:'Aggiorna una Label ogni secondo con l’ora corrente.'},
        {title:'Esercizio 2 — Countdown',text:'Crea un conto alla rovescia da 10 a 0.'},
        {title:'Esercizio 3 — Palla',text:'Muovi una palla sul Canvas usando after.'}
      ],
      'import tkinter as tk\nroot=tk.Tk()\nlabel=tk.Label(root,text="10",font=("Arial",30))\nlabel.pack(pady=30)\ndef countdown(n=10):\n    label.config(text=str(n))\n    if n>0:\n        root.after(1000,countdown,n-1)\ncountdown()\nroot.mainloop()',
      ['Usare time.sleep nel thread GUI.','Creare un after infinito senza possibilità di fermarlo.','Aggiornare troppo rapidamente e consumare risorse.'],
      'Aggiungi un pulsante Avvia/Ferma al timer usando after_cancel.',
      [
        {q:'after() misura il ritardo in...',opts:['millisecondi','ore','byte','pixel'],answer:0,explain:'Il primo parametro è espresso in millisecondi.'},
        {q:'Perché evitare time.sleep nella GUI?',opts:['Blocca il ciclo degli eventi','Non esiste in Python','Cancella i widget','Chiude Tkinter'],answer:0,explain:'sleep blocca il thread che deve mantenere reattiva la GUI.'},
        {q:'16 ms sono circa...',opts:['60 aggiornamenti al secondo','16 minuti','1 ora','1600 secondi'],answer:0,explain:'1000/16 è circa 62,5.'},
        {q:'after_cancel serve a...',opts:['annullare un callback pianificato','creare un Canvas','aprire un file','chiudere Python'],answer:0,explain:'Permette di fermare un after già pianificato se conservi l’id.'},
        {q:'after può richiamare una funzione...',opts:['in futuro senza bloccare il mainloop','solo dopo chiusura','mai','solo una volta in Python'],answer:0,explain:'È il meccanismo di scheduling di Tkinter.'},
        {q:'Un timer GUI è un esempio di...',opts:['aggiornamento periodico','database relazionale','compilazione','CSS'],answer:0,explain:'La callback viene ripianificata periodicamente.'}
      ]
    ),
    lesson(
      'Calcolatrice: primo progetto completo',
      'Uniamo widget, layout, eventi e funzioni in una vera mini-applicazione.',
      'Un progetto piccolo è il momento giusto per applicare ciò che abbiamo imparato. La calcolatrice separa interfaccia e logica e introduce una struttura che potremo riutilizzare nei progetti successivi.',
      ['Progettare la UI','Gestire click','Separare la logica','Gestire errori di input'],
      'def aggiungi(valore):\n    display.insert(tk.END, valore)',
      'import tkinter as tk\n\nroot=tk.Tk()\nroot.title("Calcolatrice")\ndisplay=tk.Entry(root,font=("Arial",20),justify="right")\ndisplay.grid(row=0,column=0,columnspan=4,padx=10,pady=10,sticky="ew")\n\ndef aggiungi(valore):\n    display.insert(tk.END,valore)\n\ndef calcola():\n    try:\n        risultato=eval(display.get(),{"__builtins__":{}},{})\n        display.delete(0,tk.END)\n        display.insert(0,str(risultato))\n    except Exception:\n        display.delete(0,tk.END)\n        display.insert(0,"Errore")\n\nfor riga, valori in enumerate([["7","8","9","/"],["4","5","6","*"],["1","2","3","-"],["0",".","=","+"]],1):\n    for col,valore in enumerate(valori):\n        comando=calcola if valore=="=" else lambda v=valore: aggiungi(v)\n        tk.Button(root,text=valore,width=6,height=2,command=comando).grid(row=riga,column=col,padx=3,pady=3)\n\nroot.mainloop()',
      'def cancella():\n    display.delete(0,tk.END)',
      'tk.Button(root,text="C",command=cancella).grid(row=5,column=0,columnspan=4,sticky="ew")',
      ['Il display contiene l’espressione corrente.','Ogni pulsante invoca una callback.','La funzione aggiungi inserisce il valore.','calcola elabora l’espressione e aggiorna il display.','La gestione dell’errore impedisce il crash della GUI.'],
      'La calcolatrice è un esempio di applicazione event-driven: ogni click modifica lo stato dell’interfaccia.',
      [
        {title:'Esercizio 1 — Base',text:'Crea una calcolatrice con +, -, *, /.'},
        {title:'Esercizio 2 — Cancella',text:'Aggiungi un pulsante C per svuotare il display.'},
        {title:'Esercizio 3 — Migliora',text:'Aggiungi parentesi e una gestione più sicura delle operazioni.'}
      ],
      'import tkinter as tk\nroot=tk.Tk()\ndisplay=tk.Entry(root,font=("Arial",20),justify="right")\ndisplay.grid(row=0,column=0,columnspan=4,padx=10,pady=10)\ndef aggiungi(v): display.insert(tk.END,v)\ndef cancella(): display.delete(0,tk.END)\ntk.Button(root,text="7",command=lambda:aggiungi("7")).grid(row=1,column=0)\ntk.Button(root,text="C",command=cancella).grid(row=1,column=1)\nroot.mainloop()',
      ['Usare eval con input non controllato in un’app reale.','Creare lambda senza catturare correttamente il valore del ciclo.','Mescolare tutta la logica nella costruzione dei Button.'],
      'Rifattorizza la calcolatrice in una classe CalculatorApp.',
      [
        {q:'Quale widget usiamo come display?',opts:['Entry','Canvas','Frame','Menu'],answer:0,explain:'Entry può mostrare una singola riga di testo.'},
        {q:'Perché usare una funzione aggiungi?',opts:['Per centralizzare la gestione dei pulsanti','Per creare SQL','Per installare Tkinter','Per cambiare tema'],answer:0,explain:'Riduce la duplicazione e rende il codice più leggibile.'},
        {q:'Cosa deve succedere con un input non valido?',opts:['Mostrare un errore senza chiudere l’app','Crashare','Chiudere Windows','Eliminare Python'],answer:0,explain:'Una GUI deve gestire gli errori in modo controllato.'},
        {q:'grid è utile nella calcolatrice perché...',opts:['crea una griglia di pulsanti','crea un database','gestisce HTTP','crea un thread'],answer:0,explain:'La tastiera della calcolatrice è naturalmente tabellare.'},
        {q:'Una lambda con valore di ciclo può richiedere...',opts:['un parametro predefinito per catturare il valore','un database','un Frame','un Canvas'],answer:0,explain:'È un modo semplice per catturare il valore corrente del ciclo.'},
        {q:'Un progetto completo serve a...',opts:['integrare più concetti in un’app reale','evitare gli esercizi','saltare le basi','copiare codice'],answer:0,explain:'Il progetto consolida le competenze.'}
      ]
    ),
    lesson(
      'SQLite e CRUD con Tkinter',
      'Colleghiamo una GUI a un database locale e realizziamo operazioni CRUD.',
      'SQLite è integrato in Python e permette di costruire applicazioni desktop che persistono i dati. CRUD significa Create, Read, Update e Delete.',
      ['Creare un database SQLite','Usare query parametrizzate','Implementare CRUD','Mostrare dati nella GUI'],
      'conn = sqlite3.connect("scuola.db")\ncur = conn.cursor()',
      'import sqlite3\n\nconn=sqlite3.connect("scuola.db")\ncur=conn.cursor()\ncur.execute("CREATE TABLE IF NOT EXISTS studenti (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, voto INTEGER NOT NULL)")\ncur.execute("INSERT INTO studenti(nome,voto) VALUES (?,?)",("Amina",28))\nconn.commit()\n\nfor riga in cur.execute("SELECT id,nome,voto FROM studenti"):\n    print(riga)\nconn.close()',
      'cur.execute("UPDATE studenti SET voto=? WHERE id=?",(30,1))\nconn.commit()',
      'cur.execute("DELETE FROM studenti WHERE id=?",(1,))\nconn.commit()',
      ['connect apre o crea il database.','cursor esegue le istruzioni SQL.','? crea un parametro per evitare concatenazioni pericolose.','commit salva le modifiche.','SELECT legge i dati.','UPDATE e DELETE modificano i record.'],
      'Un gestionale studenti può salvare nome, corso e voto e mostrarli in una Treeview.',
      [
        {title:'Esercizio 1 — Tabella',text:'Crea una tabella corsi con id, nome e ore.'},
        {title:'Esercizio 2 — Inserimento',text:'Crea una funzione che inserisca un record letto da Entry.'},
        {title:'Esercizio 3 — CRUD',text:'Implementa inserimento, lettura, modifica e cancellazione.'},
        {title:'Esercizio 4 — GUI',text:'Mostra i record in una Treeview.'}
      ],
      'import sqlite3\nconn=sqlite3.connect("scuola.db")\ncur=conn.cursor()\ncur.execute("CREATE TABLE IF NOT EXISTS corsi (id INTEGER PRIMARY KEY AUTOINCREMENT,nome TEXT NOT NULL,ore INTEGER NOT NULL)")\ncur.execute("INSERT INTO corsi(nome,ore) VALUES (?,?)",("Python",40))\nconn.commit()\nprint(cur.execute("SELECT * FROM corsi").fetchall())\nconn.close()',
      ['Concatenare input dentro SQL.','Dimenticare commit dopo INSERT/UPDATE/DELETE.','Lasciare connessioni aperte.','Non usare query parametrizzate.'],
      'Crea un mini gestionale studenti con form, Treeview e pulsanti CRUD.',
      [
        {q:'Quale modulo Python usiamo?',opts:['sqlite3','sqlpython','tkdb','database'],answer:0,explain:'sqlite3 è il modulo standard per SQLite.'},
        {q:'commit() serve a...',opts:['salvare le modifiche','leggere un SELECT','creare un Button','chiudere la finestra'],answer:0,explain:'Commit conferma la transazione.'},
        {q:'Perché usare query parametrizzate?',opts:['sicurezza e corretta gestione dei valori','per cambiare font','per creare widget','per aprire finestre'],answer:0,explain:'Evitano concatenazioni SQL pericolose.'},
        {q:'CRUD significa...',opts:['Create Read Update Delete','Create Run Use Debug','Copy Read Upload Download','Code Run Update Deploy'],answer:0,explain:'Sono le quattro operazioni fondamentali sui dati.'},
        {q:'cursor serve a...',opts:['eseguire SQL','creare GUI','disegnare','gestire eventi'],answer:0,explain:'Il cursore esegue e recupera risultati SQL.'},
        {q:'SQLite è particolarmente adatto a...',opts:['database locali leggeri','cluster distribuiti giganti','grafica 3D','CSS'],answer:0,explain:'È ottimo per applicazioni locali e embedded.'}
      ]
    ),
    lesson(
      'Treeview, classi e architettura MVC',
      'Rendiamo il gestionale più professionale separando dati, interfaccia e logica.',
      'Treeview mostra dati tabellari. Quando l’app cresce, una classe principale e una separazione Model/View/Controller aiutano a mantenere il codice leggibile e testabile.',
      ['Usare Treeview','Selezionare una riga','Creare classi','Separare responsabilità'],
      'tree = ttk.Treeview(root, columns=("id","nome","voto"), show="headings")',
      'import tkinter as tk\nfrom tkinter import ttk\nroot=tk.Tk()\ntree=ttk.Treeview(root,columns=("id","nome","voto"),show="headings")\nfor col in ("id","nome","voto"):\n    tree.heading(col,text=col.title())\ntree.insert("",tk.END,values=(1,"Amina",28))\ntree.insert("",tk.END,values=(2,"Luca",24))\ntree.pack(fill="both",expand=True,padx=20,pady=20)\nroot.mainloop()',
      'def seleziona(_):\n    item=tree.selection()\n    if item:\n        print(tree.item(item[0],"values"))\ntree.bind("<<TreeviewSelect>>",seleziona)',
      'class StudenteRepository:\n    def __init__(self, conn):\n        self.conn=conn\n    def lista(self):\n        return self.conn.execute("SELECT * FROM studenti").fetchall()',
      ['Treeview usa colonne e heading.','insert inserisce una riga.','selection restituisce la selezione.','item(...,"values") legge i valori.','Repository può isolare l’accesso al database.'],
      'Un gestionale professionale può avere Model per i dati, View per Tkinter e Controller/Service per la logica.',
      [
        {title:'Esercizio 1 — Treeview',text:'Mostra cinque studenti con id, nome e voto.'},
        {title:'Esercizio 2 — Selezione',text:'Quando l’utente seleziona una riga, riempi gli Entry con i suoi valori.'},
        {title:'Esercizio 3 — Classi',text:'Crea una classe repository per le query SQLite.'},
        {title:'Esercizio 4 — Architettura',text:'Dividi il progetto in model.py, database.py, views.py e main.py.'}
      ],
      'import tkinter as tk\nfrom tkinter import ttk\nroot=tk.Tk()\ntree=ttk.Treeview(root,columns=("id","nome"),show="headings")\ntree.heading("id",text="ID")\ntree.heading("nome",text="Nome")\nfor i,nome in enumerate(["Amina","Luca","Sara"],1): tree.insert("",tk.END,values=(i,nome))\ntree.pack(fill="both",expand=True)\nroot.mainloop()',
      ['Mettere tutte le query dentro i callback della GUI.','Creare una classe gigantesca.','Non separare accesso dati e presentazione.'],
      'Trasforma il mini gestionale SQLite della lezione precedente in una piccola architettura MVC.',
      [
        {q:'Treeview è utile per...',opts:['dati tabellari','animazioni','password hashing','HTTP'],answer:0,explain:'Treeview visualizza gerarchie e tabelle.'},
        {q:'selection() restituisce...',opts:['gli item selezionati','il database','il testo di un Entry','un Frame'],answer:0,explain:'Permette di sapere quale riga è selezionata.'},
        {q:'Un Repository dovrebbe...',opts:['incapsulare l’accesso ai dati','disegnare la GUI','gestire CSS','creare menu'],answer:0,explain:'È una responsabilità tipica del layer dati.'},
        {q:'MVC aiuta soprattutto a...',opts:['separare responsabilità','rendere Python più veloce','installare Tkinter','creare immagini'],answer:0,explain:'La separazione rende il progetto più manutenibile.'},
        {q:'show="headings" mostra...',opts:['le intestazioni delle colonne','il database','il menu','la barra di stato'],answer:0,explain:'Configura Treeview come tabella con heading.'},
        {q:'Una classe aiuta a...',opts:['organizzare stato e comportamento','sostituire Python','creare HTML','installare pacchetti'],answer:0,explain:'Le classi permettono di modellare oggetti e responsabilità.'}
      ]
    ),
    lesson(
      'Gestione errori, file e JSON',
      'Rendiamo l’app robusta e capace di salvare configurazioni e dati semplici.',
      'try/except permette di gestire errori previsti. JSON è utile per configurazioni e piccoli dati esportabili, mentre i file di testo sono adatti a contenuti semplici.',
      ['Gestire ValueError e sqlite3.Error','Leggere e scrivere file','Usare JSON','Mostrare errori all’utente'],
      'try:\n    valore=int(entry.get())\nexcept ValueError:\n    ...',
      'import json\n\nconfig={"tema":"chiaro","lingua":"it","font_size":14}\nwith open("config.json","w",encoding="utf-8") as file:\n    json.dump(config,file,ensure_ascii=False,indent=4)\n\nwith open("config.json",encoding="utf-8") as file:\n    letta=json.load(file)\nprint(letta)',
      'try:\n    numero=int("abc")\nexcept ValueError:\n    print("Numero non valido")\nfinally:\n    print("Operazione terminata")',
      'import tkinter as tk\nfrom tkinter import messagebox\ndef sicuro():\n    try:\n        valore=int(entry.get())\n        label.config(text=str(valore*2))\n    except ValueError:\n        messagebox.showerror("Errore","Inserisci un numero")',
      ['try contiene il codice rischioso.','except gestisce l’errore previsto.','finally viene eseguito comunque.','with open chiude automaticamente il file.','json.dump salva un oggetto JSON.','json.load legge JSON.'],
      'Le preferenze dell’app possono essere salvate in config.json e ricaricate all’avvio.',
      [
        {title:'Esercizio 1 — Input',text:'Gestisci ValueError quando l’utente inserisce testo invece di un numero.'},
        {title:'Esercizio 2 — Config',text:'Salva tema e dimensione font in config.json.'},
        {title:'Esercizio 3 — Import/Export',text:'Esporta una lista di studenti in JSON e ricaricala.'}
      ],
      'import json\ndati=[{"nome":"Amina","voto":28},{"nome":"Luca","voto":24}]\nwith open("studenti.json","w",encoding="utf-8") as file:\n    json.dump(dati,file,ensure_ascii=False,indent=4)\nwith open("studenti.json",encoding="utf-8") as file:\n    print(json.load(file))',
      ['Usare except Exception ovunque senza motivo.','Non mostrare all’utente un messaggio comprensibile.','Aprire file senza encoding quando serve Unicode.'],
      'Aggiungi un sistema di backup automatico del file JSON prima del salvataggio.',
      [
        {q:'ValueError può avvenire quando...',opts:['converti testo non numerico in int','crei un Label','usi pack','crei un Frame'],answer:0,explain:'int("abc") produce ValueError.'},
        {q:'json.dump serve a...',opts:['scrivere JSON','leggere JSON','creare GUI','fare SQL'],answer:0,explain:'dump serializza un oggetto in un file.'},
        {q:'json.load serve a...',opts:['leggere JSON','scrivere JSON','creare un Button','gestire mouse'],answer:0,explain:'load deserializza JSON da un file.'},
        {q:'finally viene eseguito...',opts:['comunque dopo try/except','mai','solo se non c’è errore','solo su Windows'],answer:0,explain:'finally è il blocco di pulizia.'},
        {q:'with open è utile perché...',opts:['gestisce automaticamente la chiusura del file','crea una GUI','fa il bind','installa JSON'],answer:0,explain:'Il context manager chiude la risorsa.'},
        {q:'Un buon messaggio di errore dovrebbe...',opts:['spiegare cosa deve correggere l’utente','mostrare solo uno stack trace','chiudere l’app','ignorare il problema'],answer:0,explain:'Una GUI deve guidare l’utente.'}
      ]
    ),
    lesson(
      'Packaging, testing e distribuzione',
      'Portiamo l’app dal computer dello sviluppatore a un programma che altri possono usare.',
      'Un progetto Tkinter non finisce quando il codice funziona: servono struttura, test, gestione delle dipendenze e una strategia di distribuzione. PyInstaller è una soluzione comune per creare eseguibili desktop.',
      ['Organizzare un progetto','Scrivere test per la logica','Creare requirements/documentazione','Preparare un eseguibile'],
      'pyinstaller --onefile --windowed main.py',
      'project/\n├── main.py\n├── database.py\n├── models.py\n├── views.py\n├── services.py\n├── assets/\n├── tests/\n└── README.md',
      'def somma(a,b):\n    return a+b\n\nassert somma(2,3)==5\nassert somma(-1,1)==0',
      'python -m pytest',
      ['Separare logica e GUI rende i test più semplici.','assert permette controlli rapidi durante lo sviluppo.','pytest automatizza suite più complete.','PyInstaller può creare un eseguibile senza richiedere Python installato all’utente in molti scenari.'],
      'Un gestionale scolastico dovrebbe poter essere avviato dall’utente finale senza dover modificare il codice sorgente.',
      [
        {title:'Esercizio 1 — Struttura',text:'Organizza il progetto in moduli separando database, GUI e servizi.'},
        {title:'Esercizio 2 — Test',text:'Scrivi almeno tre assert per una funzione di calcolo.'},
        {title:'Esercizio 3 — Build',text:'Prepara il comando PyInstaller e documentalo nel README.'}
      ],
      'def somma(a,b):\n    return a+b\n\nassert somma(2,3)==5\nassert somma(10,5)==15\nprint("Test superati")',
      ['Testare solo la GUI e non la logica.','Distribuire senza README.','Usare percorsi assoluti per asset e database.'],
      'Crea uno script di build e una checklist di rilascio per la tua applicazione.',
      [
        {q:'PyInstaller serve a...',opts:['preparare applicazioni Python distribuibili','creare SQL','disegnare Canvas','gestire eventi'],answer:0,explain:'Può impacchettare applicazioni Python.'},
        {q:'pytest serve a...',opts:['eseguire test','creare GUI','creare database','gestire immagini'],answer:0,explain:'È un framework di testing Python.'},
        {q:'Separare la logica dalla GUI rende...',opts:['più facile testare il codice','Python più lento','Tkinter inutile','SQL obbligatorio'],answer:0,explain:'La logica isolata può essere testata senza aprire una finestra.'},
        {q:'Un README dovrebbe contenere...',opts:['installazione e utilizzo','solo immagini','solo password','solo codice minificato'],answer:0,explain:'Documenta come usare e avviare il progetto.'},
        {q:'Un percorso assoluto può essere problematico perché...',opts:['cambia tra computer','rende Python più veloce','crea un Button','impedisce test'],answer:0,explain:'I percorsi relativi o configurabili sono più portabili.'},
        {q:'Un progetto professionale dovrebbe avere...',opts:['struttura, test e documentazione','solo un file gigantesco','nessun errore gestito','solo screenshot'],answer:0,explain:'Qualità e manutenzione fanno parte dello sviluppo.'}
      ]
    ),
    lesson(
      'Progetto finale: Gestionale Scuola',
      'Mettiamo insieme Tkinter, ttk, SQLite, CRUD, validazione, menu, Treeview, classi e gestione errori.',
      'Il progetto finale simula un’applicazione reale per gestire studenti e corsi. L’obiettivo non è copiare tutto il codice, ma costruire il progetto per incrementi e applicare i concetti delle lezioni precedenti.',
      ['Progettare il database','Costruire la GUI','Implementare CRUD','Separare responsabilità','Gestire errori e validazione','Preparare il progetto alla distribuzione'],
      'GUI → Service → Repository → SQLite',
      'import tkinter as tk\nfrom tkinter import ttk\n\nclass ScuolaApp:\n    def __init__(self, root):\n        self.root=root\n        self.root.title("Gestionale Scuola")\n        self.tree=ttk.Treeview(root,columns=("id","nome","corso"),show="headings")\n        for col in ("id","nome","corso"):\n            self.tree.heading(col,text=col.title())\n        self.tree.pack(fill="both",expand=True,padx=20,pady=20)\n\nroot=tk.Tk()\napp=ScuolaApp(root)\nroot.mainloop()',
      'CREATE TABLE studenti (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, cognome TEXT NOT NULL, email TEXT UNIQUE NOT NULL, corso_id INTEGER)',
      'CREATE TABLE corsi (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, ore INTEGER NOT NULL)',
      ['Definisci prima il modello dati.','Crea il repository SQLite.','Costruisci il form.','Mostra i dati nella Treeview.','Aggiungi Create/Read/Update/Delete.','Inserisci validazione e messaggi.','Rifattorizza in classi e moduli.','Scrivi test per la logica.'],
      'Gestionale Scuola: studenti, corsi, iscrizioni, ricerca, modifica, eliminazione, esportazione JSON e dashboard.',
      [
        {title:'Milestone 1 — Database',text:'Crea database e tabelle Studenti e Corsi.'},
        {title:'Milestone 2 — Form',text:'Crea il form di inserimento studente con validazione.'},
        {title:'Milestone 3 — CRUD',text:'Implementa inserimento, modifica, eliminazione e ricerca.'},
        {title:'Milestone 4 — UI',text:'Aggiungi menu, Treeview, dialog e layout professionale.'},
        {title:'Milestone 5 — Qualità',text:'Separa classi, aggiungi test e prepara il packaging.'}
      ],
      'import tkinter as tk\nfrom tkinter import ttk\n\nclass ScuolaApp:\n    def __init__(self, root):\n        self.root=root\n        self.root.title("Gestionale Scuola")\n        self.tree=ttk.Treeview(root,columns=("id","nome","corso"),show="headings")\n        for col in ("id","nome","corso"):\n            self.tree.heading(col,text=col.title())\n        self.tree.pack(fill="both",expand=True)\n\nroot=tk.Tk()\nScuolaApp(root)\nroot.mainloop()',
      ['Costruire tutto in un unico file.','Saltare la validazione.','Usare SQL concatenato con input utente.','Non fare backup del database.','Non testare le operazioni CRUD.'],
      'Estendi il gestionale con login, ruoli Admin/Docente/Studente, dashboard e report.',
      [
        {q:'Qual è l’obiettivo del progetto finale?',opts:['Integrare i concetti in un’applicazione reale','Memorizzare 100 righe','Evitare SQLite','Usare solo Label'],answer:0,explain:'Il progetto verifica la capacità di integrare più competenze.'},
        {q:'Quale componente mostra bene molti record?',opts:['Treeview','Label','Button','Messagebox'],answer:0,explain:'Treeview è adatta alla visualizzazione tabellare.'},
        {q:'Dove dovrebbe stare l’accesso SQLite?',opts:['In un layer dedicato o repository','Dentro ogni Button','Nel CSS','Nel README'],answer:0,explain:'Separare l’accesso dati migliora manutenzione e test.'},
        {q:'Prima di salvare uno studente bisogna...',opts:['validare i dati','chiudere la GUI','cancellare il database','eseguire sempre DELETE'],answer:0,explain:'La validazione previene dati non validi.'},
        {q:'Il progetto finale deve essere...',opts:['incrementale e testabile','copiato interamente','un solo blocco senza classi','senza documentazione'],answer:0,explain:'La costruzione per milestone è più realistica.'},
        {q:'Una buona architettura separa...',opts:['GUI, logica e dati','solo i colori','solo i commenti','solo i Button'],answer:0,explain:'Separare responsabilità rende l’app più manutenibile.'},
        {q:'Dopo il progetto finale puoi aggiungere...',opts:['autenticazione, ruoli, report e API','solo altri Label','niente','solo CSS'],answer:0,explain:'Il progetto può diventare la base di un gestionale reale.'}
      ]
    )
  ];

  window.MOUSSA_TKINTER_BLUEPRINT = {
    title:'Python & Tkinter Completo',
    tag:'GUI Python',
    description:'Percorso completo da zero alla realizzazione di un gestionale desktop con Tkinter, ttk, SQLite, Canvas e OOP.',
    lessons
  };
})();
