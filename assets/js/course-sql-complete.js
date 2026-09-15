/*
 * MS Academy - Corso SQL completo
 * Adattamento originale in italiano ispirato alla struttura didattica pubblica di sql.sh.
 * Non riproduce testi o contenuti proprietari: esempi e spiegazioni sono originali.
 */
(function(){
  'use strict';
  const lessons = [];
  const mistakes = [
    'Confondere SQL con il database specifico (MySQL, SQL Server, PostgreSQL, SQLite...).',
    'Dimenticare di controllare i nomi reali di tabelle e colonne.',
    'Usare SELECT * quando servono solo poche colonne.',
    'Modificare o cancellare dati senza prima verificare la condizione con SELECT.',
    'Ignorare le differenze di sintassi tra i diversi SGBD.'
  ];
  function add(title, explanation, examples, points, exercise, solution, challenge){
    const code = examples[0] || '-- Esempio';
    lessons.push({
      title, lead: explanation, explain: explanation,
      goals:['Capire il concetto partendo da zero','Leggere la sintassi riga per riga','Provare gli esempi e modificarli','Capire quando usare questa tecnica in un progetto reale'],
      syntax:code, code, second:examples[1] || code, third:examples[2] || code,
      steps:points, realExample:examples[2] || code,
      exercises:[exercise,'Modifica l’esempio cambiando almeno una colonna o condizione.','Scrivi una query simile usando una tabella del tuo progetto.','Spiega con parole tue quale risultato produce la query.'],
      solution, mistakes, challenge,
      quiz:[
        {question:'Qual è lo scopo principale di '+title+'?',answers:['Applicare la tecnica mostrata alla query','Formattare una pagina HTML','Creare un file CSS'],correct:0},
        {question:'Prima di usare una query su dati reali è buona pratica:',answers:['Controllare sintassi, tabelle e condizioni','Cancellare subito i dati','Ignorare il database usato'],correct:0},
        {question:'La sintassi SQL può cambiare tra SGBD diversi?',answers:['Sì, alcuni dettagli cambiano','No, mai','Solo nei commenti'],correct:0},
        {question:'Gli esempi del corso servono a:',answers:['Capire, copiare, modificare e sperimentare','Essere usati senza comprenderli','Sostituire la documentazione del proprio SGBD'],correct:0},
        {question:'Qual è il passo successivo consigliato?',answers:['Modificare l’esempio e verificare il risultato','Saltare direttamente al progetto','Eseguire UPDATE senza WHERE'],correct:0}
      ],
      reference:'Adattamento originale per MS Academy, con sintassi e concetti confrontabili tra i principali SGBD.',
      difficulty:'base', completeLesson:true, qualityStandard:'spiegazione + sintassi + esempi + esercizi + soluzione + quiz + challenge', fileExtension:'.sql', sourcePack:'sql.sh-complete'
    });
  }

  add('Introduzione a SQL','SQL è il linguaggio usato per leggere, inserire, modificare e cancellare dati in un database.',[
`-- Leggere tutti i dati\nSELECT *\nFROM Studenti;`,
`-- Leggere solo alcune colonne\nSELECT Nome, Cognome\nFROM Studenti;`,
`-- Leggere dati filtrati\nSELECT Nome, Citta\nFROM Studenti\nWHERE Citta = 'Ferrara';`],['SELECT legge dati.','FROM indica la tabella sorgente.','WHERE applica un filtro.'],'Scrivi una query che mostri tutti gli studenti.',`SELECT * FROM Studenti;`,'Crea una query che mostri nome, cognome e città degli studenti.');

  add('Database relazionali','Un database relazionale organizza i dati in tabelle composte da righe e colonne e usa relazioni per collegare le informazioni.',[
`CREATE TABLE Studenti (\n  Id INT PRIMARY KEY,\n  Nome VARCHAR(100) NOT NULL\n);`,
`CREATE TABLE Corsi (\n  Id INT PRIMARY KEY,\n  Nome VARCHAR(100) NOT NULL\n);`,
`CREATE TABLE Iscrizioni (\n  StudenteId INT NOT NULL,\n  CorsoId INT NOT NULL\n);`],['Una riga rappresenta un record.','Una colonna rappresenta un attributo.','Le chiavi permettono di identificare e collegare i record.'],'Progetta tre tabelle per studenti, corsi e iscrizioni.',`Studenti(Id, Nome)\nCorsi(Id, Nome)\nIscrizioni(StudenteId, CorsoId)`,'Aggiungi una tabella Docenti e una relazione con Corsi.');

  add('SELECT','SELECT è la base della lettura dei dati. Può restituire una o più colonne oppure tutte le colonne con *.',[
`SELECT Nome\nFROM Studenti;`,
`SELECT Nome, Cognome\nFROM Studenti;`,
`SELECT *\nFROM Studenti;`],['SELECT indica le colonne richieste.','FROM indica la tabella.','Le colonne multiple sono separate da virgole.'],'Mostra Nome e Città dalla tabella Studenti.',`SELECT Nome, Citta FROM Studenti;`,'Scrivi una SELECT con tre colonne e poi sostituiscile con *.');

  add('SELECT DISTINCT','DISTINCT elimina dal risultato le righe duplicate rispetto alle colonne selezionate.',[
`SELECT DISTINCT Citta\nFROM Studenti;`,
`SELECT DISTINCT CorsoId\nFROM Iscrizioni;`,
`SELECT DISTINCT Citta, CAP\nFROM Studenti;`],['DISTINCT lavora sul risultato della SELECT.','Con più colonne viene considerata la combinazione dei valori.','È utile per ottenere un elenco di valori differenti.'],'Trova tutte le città differenti degli studenti.',`SELECT DISTINCT Citta FROM Studenti;`,'Conta mentalmente quante combinazioni diverse produce DISTINCT su due colonne.');

  add('SQL_NO_CACHE','SQL_NO_CACHE è una sintassi specifica di MySQL usata in contesti in cui si vuole evitare l’uso della query cache; non è SQL standard e non va usata indiscriminatamente.',[
`-- MySQL in versioni/contesti che supportano questa sintassi\nSELECT SQL_NO_CACHE *\nFROM Studenti;`,
`-- In SQL standard usa semplicemente SELECT\nSELECT *\nFROM Studenti;`,
`-- Controlla sempre la versione MySQL prima di usare opzioni specifiche.`],['Non è una clausola SQL universale.','È legata al comportamento del database.','Per codice portabile preferisci SQL standard quando possibile.'],'Indica se SQL_NO_CACHE è portabile tra tutti i database.',`No. È una sintassi specifica e dipende dalla versione di MySQL.`,'Confronta una query standard con una ottimizzazione specifica del tuo SGBD.');

  add('Alias AS','AS permette di assegnare un nome temporaneo più leggibile a una colonna o a una tabella.',[
`SELECT Nome AS NomeStudente\nFROM Studenti;`,
`SELECT Prezzo * Quantita AS Totale\nFROM Ordini;`,
`SELECT s.Nome\nFROM Studenti AS s;`],['L’alias non rinomina fisicamente la colonna.','Gli alias rendono leggibili i risultati.','Gli alias di tabella sono utili soprattutto nelle JOIN.'],'Crea l’alias Totale per Prezzo * Quantita.',`SELECT Prezzo * Quantita AS Totale FROM Ordini;`,'Usa alias brevi e chiari nelle query con più tabelle.');

  add('Colonne calcolate','Una SELECT può calcolare nuovi valori senza salvarli nella tabella.',[
`SELECT Prezzo, Quantita,\n       Prezzo * Quantita AS Totale\nFROM Ordini;`,
`SELECT Prezzo,\n       Prezzo * 1.22 AS PrezzoIVA\nFROM Prodotti;`,
`SELECT 10 + 5 AS Risultato;`],['L’espressione viene calcolata durante la SELECT.','AS assegna un nome al risultato.','Le operazioni disponibili dipendono anche dai tipi di dato.'],'Calcola il totale di ogni riga ordine.',`SELECT Prezzo * Quantita AS Totale FROM Ordini;`,'Aggiungi una seconda colonna calcolata per lo sconto.');

  add('WHERE','WHERE filtra le righe e mantiene solo quelle che rispettano una condizione.',[
`SELECT *\nFROM Studenti\nWHERE Citta = 'Ferrara';`,
`SELECT Nome, Voto\nFROM Studenti\nWHERE Voto >= 18;`,
`SELECT *\nFROM Prodotti\nWHERE Prezzo > 100;`],['WHERE viene dopo FROM.','Le stringhe usano normalmente apici singoli.','Gli operatori di confronto permettono di costruire condizioni.'],'Trova i prodotti con prezzo maggiore di 50.',`SELECT * FROM Prodotti WHERE Prezzo > 50;`,'Aggiungi un secondo filtro con AND.');

  add('AND e OR','AND richiede che tutte le condizioni siano vere; OR richiede che almeno una sia vera.',[
`SELECT * FROM Studenti\nWHERE Citta = 'Ferrara'\n  AND Eta >= 18;`,
`SELECT * FROM Studenti\nWHERE Citta = 'Ferrara'\n   OR Citta = 'Modena';`,
`SELECT * FROM Prodotti\nWHERE Prezzo > 20\n  AND (Categoria = 'PC' OR Categoria = 'Tablet');`],['Usa parentesi quando la logica diventa complessa.','AND ha priorità rispetto a OR in molte sintassi SQL.','Una condizione leggibile è più facile da verificare.'],'Trova studenti di Ferrara maggiorenni.',`SELECT * FROM Studenti WHERE Citta='Ferrara' AND Eta>=18;`,'Scrivi una condizione con due città e un’età minima.');

  add('NOT','NOT nega una condizione e permette di escludere un insieme di righe.',[
`SELECT * FROM Studenti\nWHERE NOT Citta = 'Roma';`,
`SELECT * FROM Prodotti\nWHERE NOT Prezzo > 100;`,
`SELECT * FROM Studenti\nWHERE Citta NOT IN ('Roma','Milano');`],['NOT trasforma vero in falso e viceversa.','NOT IN è molto leggibile per escludere valori.','Attenzione ai NULL nelle condizioni negate.'],'Escludi gli studenti di Roma.',`SELECT * FROM Studenti WHERE NOT Citta='Roma';`,'Riscrivi la condizione usando <>.');

  add('IN','IN verifica se un valore appartiene a un elenco.',[
`SELECT * FROM Studenti\nWHERE Citta IN ('Ferrara','Modena','Bologna');`,
`SELECT * FROM Prodotti\nWHERE Categoria IN ('PC','Tablet');`,
`SELECT * FROM Studenti\nWHERE Id IN (1,3,5);`],['IN evita molti OR ripetuti.','Può lavorare con valori numerici o testuali.','La lista può anche provenire da una subquery.'],'Trova gli studenti di Ferrara o Modena.',`SELECT * FROM Studenti WHERE Citta IN ('Ferrara','Modena');`,'Trasforma una serie di OR in IN.');

  add('EXISTS','EXISTS verifica se una subquery produce almeno una riga.',[
`SELECT c.Nome\nFROM Clienti c\nWHERE EXISTS (\n  SELECT 1 FROM Ordini o\n  WHERE o.ClienteId = c.Id\n);`,
`SELECT s.Nome\nFROM Studenti s\nWHERE EXISTS (\n  SELECT 1 FROM Iscrizioni i\n  WHERE i.StudenteId = s.Id\n);`,
`-- EXISTS è utile per testare l’esistenza di una relazione.`],['La subquery può restituire anche molte righe.','EXISTS si ferma concettualmente alla verifica di esistenza.','È spesso utile nelle query correlate.'],'Trova i clienti che hanno almeno un ordine.',`SELECT c.Nome FROM Clienti c WHERE EXISTS (SELECT 1 FROM Ordini o WHERE o.ClienteId=c.Id);`,'Confronta EXISTS con IN su un piccolo dataset.');

  add('ALL','ALL confronta un valore con tutti i valori restituiti da una subquery.',[
`SELECT * FROM Prodotti\nWHERE Prezzo > ALL (\n  SELECT Prezzo FROM Prodotti WHERE Categoria='Tablet'\n);`,
`-- Prezzo > ALL significa maggiore di ogni valore restituito.`,
`-- Verifica sempre che la subquery produca il tipo di valore atteso.`],['ALL lavora con una subquery.','La condizione deve essere vera per tutti i valori.','È una tecnica avanzata di confronto.'],'Trova prodotti più costosi di tutti quelli di una categoria.',`SELECT * FROM Prodotti WHERE Prezzo > ALL (SELECT Prezzo FROM Prodotti WHERE Categoria='Tablet');`,'Prova a sostituire ALL con MAX e confronta il significato.');

  add('ANY e SOME','ANY e SOME verificano una condizione rispetto ad almeno uno dei valori di una subquery.',[
`SELECT * FROM Prodotti\nWHERE Prezzo > ANY (\n  SELECT Prezzo FROM Prodotti WHERE Categoria='Tablet'\n);`,
`SELECT * FROM Prodotti\nWHERE Prezzo = ANY (\n  SELECT Prezzo FROM Prodotti WHERE Categoria='PC'\n);`,
`-- SOME è sinonimo di ANY in questo contesto.`],['ANY significa almeno una corrispondenza.','SOME può essere usato come sinonimo.','Sono costrutti avanzati da usare con subquery chiare.'],'Trova prodotti più costosi di almeno un tablet.',`SELECT * FROM Prodotti WHERE Prezzo > ANY (SELECT Prezzo FROM Prodotti WHERE Categoria='Tablet');`,'Confronta ANY con ALL e descrivi la differenza.');

  add('BETWEEN','BETWEEN seleziona valori compresi in un intervallo e normalmente include gli estremi.',[
`SELECT * FROM Prodotti\nWHERE Prezzo BETWEEN 20 AND 50;`,
`SELECT * FROM Studenti\nWHERE Eta BETWEEN 18 AND 25;`,
`SELECT * FROM Ordini\nWHERE DataOrdine BETWEEN '2026-01-01' AND '2026-01-31';`],['BETWEEN è utile per numeri e date.','Gli estremi sono generalmente inclusi.','Per intervalli temporali verifica il tipo e la precisione della colonna.'],'Trova prodotti tra 10 e 30 euro.',`SELECT * FROM Prodotti WHERE Prezzo BETWEEN 10 AND 30;`,'Prova NOT BETWEEN per escludere un intervallo.');

  add('LIKE','LIKE cerca testo usando un modello con caratteri jolly.',[
`SELECT * FROM Studenti\nWHERE Nome LIKE 'M%';`,
`SELECT * FROM Clienti\nWHERE Email LIKE '%@gmail.com';`,
`SELECT * FROM Prodotti\nWHERE Nome LIKE '%Pro%';`],['% rappresenta zero o più caratteri.','_ rappresenta un singolo carattere.','La sensibilità a maiuscole/minuscole dipende dal database e dalla collation.'],'Trova i nomi che iniziano con A.',`SELECT * FROM Studenti WHERE Nome LIKE 'A%';`,'Cerca un testo che contenga la parola SQL.');

  add('Wildcards','I wildcard permettono di costruire ricerche testuali più flessibili.',[
`SELECT * FROM Clienti WHERE Nome LIKE 'A%';`,
`SELECT * FROM Clienti WHERE Nome LIKE '_aria';`,
`SELECT * FROM Prodotti WHERE Codice LIKE 'PC-___';`],['% sostituisce una sequenza.','_ sostituisce un carattere.','Altri wildcard e operatori possono cambiare tra SGBD.'],'Trova codici che iniziano con PC-.',`SELECT * FROM Prodotti WHERE Codice LIKE 'PC-%';`,'Costruisci un pattern per un codice di tre caratteri dopo PC-.');

  add('IS NULL e IS NOT NULL','NULL rappresenta un valore assente o sconosciuto e va verificato con IS NULL o IS NOT NULL.',[
`SELECT * FROM Studenti\nWHERE Email IS NULL;`,
`SELECT * FROM Studenti\nWHERE Email IS NOT NULL;`,
`SELECT * FROM Clienti\nWHERE Telefono IS NULL;`],['NULL non si confronta con = NULL.','IS NULL cerca valori mancanti.','IS NOT NULL cerca valori presenti.'],'Trova gli studenti senza numero di telefono.',`SELECT * FROM Studenti WHERE Telefono IS NULL;`,'Spiega perché WHERE Telefono = NULL non è la scelta corretta.');

  add('ORDER BY','ORDER BY ordina il risultato di una query.',[
`SELECT Nome, Voto\nFROM Studenti\nORDER BY Voto DESC;`,
`SELECT Nome\nFROM Studenti\nORDER BY Nome ASC;`,
`SELECT * FROM Prodotti\nORDER BY Categoria ASC, Prezzo DESC;`],['ASC ordina in modo crescente.','DESC ordina in modo decrescente.','Puoi ordinare per più colonne.'],'Ordina gli studenti dal voto più alto al più basso.',`SELECT * FROM Studenti ORDER BY Voto DESC;`,'Ordina per città e poi per cognome.');

  add('LIMIT','LIMIT limita il numero di righe restituite in MySQL, PostgreSQL e SQLite; SQL Server usa tipicamente TOP o OFFSET/FETCH.',[
`SELECT * FROM Studenti\nLIMIT 5;`,
`SELECT * FROM Studenti\nORDER BY Voto DESC\nLIMIT 3;`,
`SELECT * FROM Prodotti\nLIMIT 10 OFFSET 20;`],['LIMIT è dipendente dal SGBD.','ORDER BY prima di LIMIT rende il risultato deterministico.','OFFSET permette di saltare righe.'],'Mostra i primi tre prodotti più costosi.',`SELECT * FROM Prodotti ORDER BY Prezzo DESC LIMIT 3;`,'Riscrivi l’esempio con TOP per SQL Server.');

  add('TOP (SQL Server)','TOP è il modo tipico di SQL Server per limitare il numero di righe.',[
`SELECT TOP 5 *\nFROM Studenti;`,
`SELECT TOP 3 Nome, Voto\nFROM Studenti\nORDER BY Voto DESC;`,
`SELECT TOP 10 PERCENT *\nFROM Prodotti\nORDER BY Prezzo DESC;`],['TOP è specifico di SQL Server.','Con ORDER BY puoi scegliere quali righe ottenere.','TOP PERCENT lavora su una percentuale.'],'Mostra i primi 5 studenti ordinati per voto.',`SELECT TOP 5 * FROM Studenti ORDER BY Voto DESC;`,'Confronta TOP con LIMIT e spiega la differenza di dialetto.');

  add('Funzioni aggregate','Le funzioni aggregate trasformano molte righe in un valore statistico.',[
`SELECT COUNT(*) AS Totale\nFROM Studenti;`,
`SELECT AVG(Voto) AS MediaVoti\nFROM Studenti;`,
`SELECT SUM(Importo) AS TotaleVendite\nFROM Ordini;`],['COUNT conta.','SUM somma.','AVG calcola la media.','MIN e MAX trovano gli estremi.'],'Conta gli studenti presenti nella tabella.',`SELECT COUNT(*) AS Totale FROM Studenti;`,'Aggiungi MIN, MAX e AVG alla stessa query.');

  add('COUNT','COUNT conta righe o valori non NULL secondo la forma usata.',[
`SELECT COUNT(*) AS TotaleRighe\nFROM Studenti;`,
`SELECT COUNT(Email) AS EmailPresenti\nFROM Studenti;`,
`SELECT COUNT(DISTINCT Citta) AS CittaDiverse\nFROM Studenti;`],['COUNT(*) conta le righe.','COUNT(colonna) normalmente non conta i NULL.','COUNT(DISTINCT ...) conta valori distinti.'],'Conta quante email sono presenti.',`SELECT COUNT(Email) AS EmailPresenti FROM Studenti;`,'Confronta COUNT(*) e COUNT(Email) con dati contenenti NULL.');

  add('SUM','SUM somma i valori numerici di una colonna.',[
`SELECT SUM(Importo) AS Totale\nFROM Ordini;`,
`SELECT SUM(Quantita) AS Pezzi\nFROM OrdiniDettagli;`,
`SELECT Categoria, SUM(Importo) AS Totale\nFROM Ordini\nGROUP BY Categoria;`],['SUM lavora su valori numerici.','I NULL sono gestiti secondo le regole aggregate del SGBD.','Con GROUP BY ottieni somme per gruppo.'],'Calcola il totale degli ordini.',`SELECT SUM(Importo) AS Totale FROM Ordini;`,'Calcola il totale per categoria.');

  add('AVG','AVG calcola la media aritmetica dei valori numerici.',[
`SELECT AVG(Voto) AS Media\nFROM Studenti;`,
`SELECT Categoria, AVG(Prezzo) AS PrezzoMedio\nFROM Prodotti\nGROUP BY Categoria;`,
`SELECT AVG(DATEDIFF(day, DataInizio, DataFine)) AS DurataMedia\nFROM Corsi;`],['AVG è utile per statistiche.','Con GROUP BY puoi ottenere medie per gruppo.','La gestione delle date varia tra SGBD.'],'Calcola il voto medio.',`SELECT AVG(Voto) AS Media FROM Studenti;`,'Calcola la media dei prezzi per categoria.');

  add('MIN e MAX','MIN trova il valore minimo e MAX quello massimo.',[
`SELECT MIN(Prezzo) AS Minimo, MAX(Prezzo) AS Massimo\nFROM Prodotti;`,
`SELECT MIN(Voto), MAX(Voto)\nFROM Studenti;`,
`SELECT Categoria, MIN(Prezzo), MAX(Prezzo)\nFROM Prodotti\nGROUP BY Categoria;`],['Sono funzioni aggregate.','Possono essere usate con GROUP BY.','Il tipo della colonna deve essere confrontabile.'],'Trova il prezzo minimo e massimo.',`SELECT MIN(Prezzo), MAX(Prezzo) FROM Prodotti;`,'Calcola min e max per ogni categoria.');

  add('GROUP BY','GROUP BY raggruppa righe con lo stesso valore per ottenere statistiche separate.',[
`SELECT Citta, COUNT(*) AS Totale\nFROM Studenti\nGROUP BY Citta;`,
`SELECT Categoria, AVG(Prezzo) AS Media\nFROM Prodotti\nGROUP BY Categoria;`,
`SELECT CorsoId, COUNT(*) AS Iscritti\nFROM Iscrizioni\nGROUP BY CorsoId;`],['Le colonne non aggregate selezionate devono essere compatibili con il GROUP BY.','GROUP BY viene spesso usato con COUNT, SUM o AVG.','Ogni gruppo produce una riga nel risultato.'],'Conta gli studenti per città.',`SELECT Citta, COUNT(*) AS Totale FROM Studenti GROUP BY Citta;`,'Raggruppa gli ordini per mese o categoria.');

  add('GROUP BY WITH ROLLUP','ROLLUP crea livelli di subtotale e totale in alcuni SGBD, soprattutto MySQL e SQL Server con sintassi specifiche.',[
`-- MySQL\nSELECT Categoria, SUM(Importo) AS Totale\nFROM Ordini\nGROUP BY Categoria WITH ROLLUP;`,
`-- SQL Server usa una sintassi GROUP BY ROLLUP(...)\nSELECT Categoria, SUM(Importo)\nFROM Ordini\nGROUP BY ROLLUP(Categoria);`,
`-- Il risultato può contenere righe di subtotale/totale con NULL.`],['ROLLUP è dipendente dal SGBD.','Produce livelli gerarchici di aggregazione.','È utile per report e riepiloghi.'],'Descrivi la riga totale prodotta da ROLLUP.',`È il riepilogo complessivo ottenuto oltre ai gruppi.`,'Prova un ROLLUP su Anno e Categoria.');

  add('HAVING','HAVING filtra i gruppi creati da GROUP BY, mentre WHERE filtra le righe prima del raggruppamento.',[
`SELECT Citta, COUNT(*) AS Totale\nFROM Studenti\nGROUP BY Citta\nHAVING COUNT(*) >= 3;`,
`SELECT Categoria, AVG(Prezzo) AS Media\nFROM Prodotti\nGROUP BY Categoria\nHAVING AVG(Prezzo) > 50;`,
`SELECT ClienteId, SUM(Importo) AS Totale\nFROM Ordini\nGROUP BY ClienteId\nHAVING SUM(Importo) > 1000;`],['WHERE lavora sulle righe.','HAVING lavora sui gruppi.','HAVING è spesso associato a funzioni aggregate.'],'Mostra le città con almeno 5 studenti.',`SELECT Citta, COUNT(*) AS Totale FROM Studenti GROUP BY Citta HAVING COUNT(*)>=5;`,'Usa WHERE e HAVING nella stessa query.');

  add('INNER JOIN','INNER JOIN combina righe di tabelle diverse quando la condizione di collegamento è soddisfatta.',[
`SELECT s.Nome, c.Nome AS Corso\nFROM Studenti s\nINNER JOIN Iscrizioni i ON i.StudenteId = s.Id\nINNER JOIN Corsi c ON c.Id = i.CorsoId;`,
`SELECT o.Id, c.Nome\nFROM Ordini o\nJOIN Clienti c ON c.Id = o.ClienteId;`,
`SELECT p.Nome, d.Quantita\nFROM Prodotti p\nJOIN OrdiniDettagli d ON d.ProdottoId = p.Id;`],['ON definisce la relazione.','Gli alias rendono la query leggibile.','INNER JOIN restituisce solo le corrispondenze.'],'Visualizza nome cliente e numero ordine.',`SELECT c.Nome, o.Id FROM Clienti c JOIN Ordini o ON o.ClienteId=c.Id;`,'Aggiungi una terza tabella e una seconda JOIN.');

  add('CROSS JOIN','CROSS JOIN produce il prodotto cartesiano: ogni riga della prima tabella viene combinata con ogni riga della seconda.',[
`SELECT c.Nome AS Colore, t.Taglia\nFROM Colori c\nCROSS JOIN Taglie t;`,
`-- 3 colori x 4 taglie = 12 combinazioni`,
`SELECT * FROM A CROSS JOIN B;`],['Non serve una clausola ON.','Il numero di righe può crescere rapidamente.','È utile per generare combinazioni controllate.'],'Genera tutte le combinazioni tra colori e taglie.',`SELECT c.Nome, t.Taglia FROM Colori c CROSS JOIN Taglie t;`,'Calcola quante righe otterrai con 5 colori e 6 taglie.');

  add('LEFT JOIN','LEFT JOIN mantiene tutte le righe della tabella sinistra e aggiunge NULL quando non trova corrispondenze.',[
`SELECT c.Nome, o.Id\nFROM Clienti c\nLEFT JOIN Ordini o ON o.ClienteId = c.Id;`,
`SELECT s.Nome, i.CorsoId\nFROM Studenti s\nLEFT JOIN Iscrizioni i ON i.StudenteId = s.Id;`,
`-- Utile per trovare anche entità senza figli.`],['La tabella sinistra è completa.','Le colonne della tabella destra possono essere NULL.','È molto usato per trovare record senza relazione.'],'Trova anche i clienti che non hanno ordini.',`SELECT c.Nome FROM Clienti c LEFT JOIN Ordini o ON o.ClienteId=c.Id WHERE o.Id IS NULL;`,'Costruisci una query che trovi studenti senza iscrizioni.');

  add('RIGHT JOIN','RIGHT JOIN mantiene tutte le righe della tabella destra. Spesso può essere riscritto con LEFT JOIN invertendo le tabelle.',[
`SELECT o.Id, c.Nome\nFROM Ordini o\nRIGHT JOIN Clienti c ON c.Id = o.ClienteId;`,
`-- Equivalente più spesso leggibile\nSELECT c.Nome, o.Id\nFROM Clienti c\nLEFT JOIN Ordini o ON o.ClienteId=c.Id;`,
`-- Verifica il supporto del tuo SGBD.`],['La tabella destra viene mantenuta.','LEFT JOIN è spesso preferito per leggibilità.','Le colonne senza corrispondenza diventano NULL.'],'Riscrivi il RIGHT JOIN come LEFT JOIN.',`SELECT c.Nome, o.Id FROM Clienti c LEFT JOIN Ordini o ON o.ClienteId=c.Id;`,'Trova i record presenti solo nella tabella destra.');

  add('FULL JOIN','FULL OUTER JOIN conserva le righe di entrambe le tabelle, anche quando non esiste una corrispondenza.',[
`SELECT a.Id, b.Id\nFROM A a\nFULL OUTER JOIN B b ON a.Id=b.AId;`,
`-- Le righe senza corrispondenza hanno NULL dall’altro lato.`,
`-- MySQL non offre FULL OUTER JOIN nativamente: può essere simulato con UNION di LEFT JOIN.`],['FULL JOIN non è supportato allo stesso modo da tutti i SGBD.','È utile per confrontare due insiemi.','Controlla sempre la sintassi del database usato.'],'Cosa succede a una riga senza corrispondenza?',`Rimane nel risultato e le colonne dell’altro lato sono NULL.`,'Simula un FULL JOIN con LEFT JOIN + UNION.');

  add('SELF JOIN','SELF JOIN collega una tabella con se stessa, utile per strutture gerarchiche.',[
`SELECT e.Nome AS Dipendente, m.Nome AS Responsabile\nFROM Dipendenti e\nLEFT JOIN Dipendenti m ON e.ResponsabileId = m.Id;`,
`SELECT p.Nome AS Persona, r.Nome AS Referente\nFROM Persone p\nJOIN Persone r ON p.ReferenteId=r.Id;`,
`-- Sono necessari alias diversi per la stessa tabella.`],['La tabella appare due volte con alias diversi.','La relazione deve indicare quale record collega quale altro.','È comune per gerarchie.'],'Mostra dipendente e responsabile.',`SELECT e.Nome, m.Nome FROM Dipendenti e LEFT JOIN Dipendenti m ON e.ResponsabileId=m.Id;`,'Aggiungi il livello gerarchico del responsabile.');

  add('NATURAL JOIN','NATURAL JOIN collega automaticamente colonne con lo stesso nome; è poco esplicito e va usato con cautela.',[
`SELECT *\nFROM Studenti\nNATURAL JOIN Iscrizioni;`,
`-- Il database sceglie automaticamente le colonne omonime.`,
`-- Alternativa generalmente più esplicita:\nSELECT * FROM Studenti s JOIN Iscrizioni i ON i.StudenteId=s.Id;`],['La relazione dipende dai nomi delle colonne.','Un cambio di schema può cambiare il risultato.','Una JOIN con ON è spesso più chiara.'],'Perché una JOIN con ON è spesso preferibile?',`Perché rende esplicita la relazione tra le colonne.`,'Riscrivi una NATURAL JOIN usando JOIN ... ON.');

  add('UNION','UNION combina i risultati di due SELECT compatibili ed elimina i duplicati.',[
`SELECT Email FROM Clienti\nUNION\nSELECT Email FROM Fornitori;`,
`SELECT Citta FROM Studenti\nUNION\nSELECT Citta FROM Docenti;`,
`-- Le SELECT devono avere numero e tipi compatibili di colonne.`],['UNION elimina duplicati.','Le SELECT devono essere compatibili.','ORDER BY si applica al risultato finale.'],'Unisci le città di studenti e docenti senza duplicati.',`SELECT Citta FROM Studenti UNION SELECT Citta FROM Docenti;`,'Confronta UNION con UNION ALL.');

  add('UNION ALL','UNION ALL combina i risultati mantenendo anche i duplicati ed è spesso più veloce perché non deve eliminarli.',[
`SELECT Email FROM Clienti\nUNION ALL\nSELECT Email FROM Fornitori;`,
`SELECT Citta FROM Studenti\nUNION ALL\nSELECT Citta FROM Docenti;`,
`-- Usa UNION ALL quando i duplicati sono significativi o già gestiti.`],['Mantiene i duplicati.','Le SELECT devono essere compatibili.','Può evitare il costo della deduplicazione.'],'Unisci due elenchi mantenendo i duplicati.',`SELECT Citta FROM Studenti UNION ALL SELECT Citta FROM Docenti;`,'Spiega quando preferire UNION.');

  add('INTERSECT','INTERSECT restituisce le righe comuni a due SELECT nei database che lo supportano.',[
`SELECT Email FROM Clienti\nINTERSECT\nSELECT Email FROM Newsletter;`,
`SELECT Citta FROM Studenti\nINTERSECT\nSELECT Citta FROM Docenti;`,
`-- Verifica il supporto del tuo SGBD.`],['Le due SELECT devono essere compatibili.','Il risultato contiene i valori presenti in entrambi gli insiemi.','Il supporto varia tra database e versioni.'],'Trova le città presenti in entrambe le tabelle.',`SELECT Citta FROM Studenti INTERSECT SELECT Citta FROM Docenti;`,'Simula INTERSECT con JOIN o EXISTS.');

  add('EXCEPT e MINUS','EXCEPT restituisce le righe della prima SELECT che non compaiono nella seconda; Oracle usa tradizionalmente MINUS.',[
`SELECT Email FROM Clienti\nEXCEPT\nSELECT Email FROM Newsletter;`,
`-- Oracle usa MINUS in modo equivalente\nSELECT Email FROM Clienti\nMINUS\nSELECT Email FROM Newsletter;`,
`-- Verifica la sintassi del tuo SGBD.`],['EXCEPT esegue una differenza tra insiemi.','MINUS è il nome usato da Oracle.','Le SELECT devono essere compatibili.'],'Trova clienti che non sono nella newsletter.',`SELECT Email FROM Clienti EXCEPT SELECT Email FROM Newsletter;`,'Riscrivi la differenza con NOT EXISTS.');

  add('Subquery','Una subquery è una query inserita dentro un’altra query.',[
`SELECT * FROM Prodotti\nWHERE Prezzo > (\n  SELECT AVG(Prezzo) FROM Prodotti\n);`,
`SELECT * FROM Studenti\nWHERE Id IN (\n  SELECT StudenteId FROM Iscrizioni\n);`,
`-- Una subquery può comparire in WHERE, FROM o SELECT secondo il caso.`],['La subquery viene valutata per fornire un valore o un insieme.','IN è utile quando la subquery restituisce più righe.','Confronta sempre cardinalità e tipi.'],'Trova i prodotti sopra il prezzo medio.',`SELECT * FROM Prodotti WHERE Prezzo > (SELECT AVG(Prezzo) FROM Prodotti);`,'Crea una subquery che trovi studenti iscritti ad almeno un corso.');

  add('Correlated subquery','Una subquery correlata usa una colonna della query esterna e viene valutata in relazione alla riga esterna.',[
`SELECT s.Nome, s.Voto\nFROM Studenti s\nWHERE s.Voto > (\n  SELECT AVG(s2.Voto)\n  FROM Studenti s2\n  WHERE s2.Citta=s.Citta\n);`,
`-- La subquery usa s.Citta della query esterna.`,
`-- Può essere potente ma va valutata anche dal punto di vista delle prestazioni.`],['La query interna dipende dalla riga esterna.','Gli alias sono fondamentali.','Una JOIN o una finestra può talvolta essere più efficiente.'],'Trova studenti sopra la media della propria città.',`SELECT s.* FROM Studenti s WHERE s.Voto>(SELECT AVG(s2.Voto) FROM Studenti s2 WHERE s2.Citta=s.Citta);`,'Confronta la soluzione con GROUP BY + JOIN.');

  add('CTE WITH','Una CTE definisce un risultato temporaneo nominato usando WITH e rende le query complesse più leggibili.',[
`WITH StudentiAdulti AS (\n  SELECT * FROM Studenti WHERE Eta >= 18\n)\nSELECT * FROM StudentiAdulti;`,
`WITH Totali AS (\n  SELECT ClienteId, SUM(Importo) AS Totale\n  FROM Ordini GROUP BY ClienteId\n)\nSELECT * FROM Totali WHERE Totale>1000;`,
`-- Una CTE migliora la struttura logica della query.`],['WITH introduce la CTE.','La CTE vive nella singola istruzione.','È utile per spezzare problemi complessi.'],'Crea una CTE per gli studenti con voto almeno 24.',`WITH Promossi AS (SELECT * FROM Studenti WHERE Voto>=24) SELECT * FROM Promossi;`,'Aggiungi una seconda CTE che calcoli una statistica.');

  add('CTE avanzate e ricorsive','Le CTE ricorsive permettono di lavorare con gerarchie e sequenze quando il database le supporta.',[
`WITH RECURSIVE Numeri AS (\n  SELECT 1 AS N\n  UNION ALL\n  SELECT N+1 FROM Numeri WHERE N<5\n)\nSELECT * FROM Numeri;`,
`-- Per una gerarchia: parte dal nodo radice e segue i figli.`,
`-- La sintassi RECURSIVE varia tra SGBD.`],['Una parte iniziale è l’anchor.','La parte ricorsiva genera i livelli successivi.','Serve una condizione di arresto.'],'Genera i numeri da 1 a 5 con una CTE ricorsiva.',`WITH RECURSIVE Numeri AS (SELECT 1 AS N UNION ALL SELECT N+1 FROM Numeri WHERE N<5) SELECT * FROM Numeri;`,'Progetta una CTE per una gerarchia dipendente-responsabile.');

  add('CASE','CASE permette di creare logica condizionale direttamente nella query.',[
`SELECT Nome,\nCASE\n  WHEN Voto >= 24 THEN 'Promosso'\n  ELSE 'Da recuperare'\nEND AS Esito\nFROM Studenti;`,
`SELECT Nome,\nCASE WHEN Eta>=18 THEN 'Adulto' ELSE 'Minorenne' END AS Fascia\nFROM Studenti;`,
`SELECT Categoria, CASE Categoria WHEN 'PC' THEN 'Informatica' ELSE 'Altro' END AS Gruppo FROM Prodotti;`],['CASE restituisce un valore.','WHEN definisce una condizione.','ELSE gestisce i casi non coperti.'],'Crea una colonna Esito basata sul voto.',`SELECT CASE WHEN Voto>=18 THEN 'Promosso' ELSE 'Bocciato' END AS Esito FROM Studenti;`,'Crea tre fasce di prezzo con CASE.');

  add('INSERT INTO','INSERT INTO aggiunge nuove righe a una tabella.',[
`INSERT INTO Studenti (Nome, Cognome, Citta)\nVALUES ('Moussa','Salisou','Ferrara');`,
`INSERT INTO Studenti (Nome, Cognome)\nVALUES ('Anna','Rossi');`,
`INSERT INTO Studenti (Nome, Cognome, Citta)\nVALUES\n('Luca','Bianchi','Modena'),\n('Sara','Verdi','Bologna');`],['Indicare le colonne rende l’INSERT più sicuro e leggibile.','Le stringhe sono racchiuse tra apici singoli.','Più righe possono essere inserite con VALUES multipli.'],'Inserisci un nuovo studente.',`INSERT INTO Studenti (Nome, Cognome, Citta) VALUES ('Luca','Bianchi','Ferrara');`,'Inserisci tre studenti in una sola istruzione.');

  add('ON DUPLICATE KEY UPDATE','Questa estensione è tipica di MySQL e permette di aggiornare una riga quando un INSERT viola una chiave unica.',[
`INSERT INTO Utenti (Email, Nome)\nVALUES ('moussa@example.com','Moussa')\nON DUPLICATE KEY UPDATE Nome='Moussa';`,
`-- È una sintassi specifica di MySQL/MariaDB.`,
`-- In altri SGBD esistono MERGE o INSERT ... ON CONFLICT con sintassi diversa.`],['Richiede una chiave UNIQUE/PRIMARY KEY che possa entrare in conflitto.','Non è SQL standard portabile.','Usala solo conoscendo il SGBD target.'],'Qual è il vantaggio?',`Permette di gestire inserimento e aggiornamento in un’unica operazione MySQL.`,'Confronta la soluzione con MERGE o ON CONFLICT nel tuo SGBD.');

  add('UPDATE','UPDATE modifica dati già presenti in una tabella.',[
`UPDATE Studenti\nSET Citta = 'Bologna'\nWHERE Id = 1;`,
`UPDATE Prodotti\nSET Prezzo = Prezzo * 1.10\nWHERE Categoria = 'PC';`,
`-- Prima di un UPDATE importante prova la stessa WHERE con SELECT.`],['SET definisce i nuovi valori.','WHERE limita le righe modificate.','Senza WHERE potresti modificare tutte le righe.'],'Aggiorna la città dello studente con Id 2.',`UPDATE Studenti SET Citta='Modena' WHERE Id=2;`,'Scrivi prima una SELECT che mostri le righe che verrebbero aggiornate.');

  add('DELETE','DELETE elimina righe da una tabella.',[
`DELETE FROM Studenti\nWHERE Id = 10;`,
`DELETE FROM Studenti\nWHERE Citta = 'Ferrara';`,
`-- Controlla sempre la WHERE con SELECT prima di eliminare dati.`],['DELETE rimuove righe.','WHERE è fondamentale per limitare l’operazione.','Senza WHERE vengono eliminate tutte le righe.'],'Elimina lo studente con Id 10.',`DELETE FROM Studenti WHERE Id=10;`,'Prepara una SELECT di verifica prima del DELETE.');

  add('MERGE','MERGE permette di sincronizzare dati tra una sorgente e una tabella, con operazioni diverse in base alla corrispondenza; la sintassi varia tra SGBD.',[
`MERGE INTO Clienti AS target\nUSING ClientiImport AS source\nON target.Id=source.Id\nWHEN MATCHED THEN\n  UPDATE SET target.Nome=source.Nome\nWHEN NOT MATCHED THEN\n  INSERT (Id,Nome) VALUES (source.Id,source.Nome);`,
`-- MERGE è utile per sincronizzazioni e importazioni.`,
`-- Verifica la sintassi del tuo database prima di usarlo in produzione.`],['MERGE confronta sorgente e destinazione.','WHEN MATCHED gestisce le corrispondenze.','WHEN NOT MATCHED gestisce i nuovi record.'],'Descrivi la differenza tra MATCHED e NOT MATCHED.',`MATCHED indica un record corrispondente; NOT MATCHED indica un record assente nella destinazione.`,'Progetta un importazione da una tabella temporanea.');

  add('TRUNCATE TABLE','TRUNCATE TABLE rimuove tutte le righe di una tabella con una semantica diversa da DELETE e dipendente dal SGBD.',[
`TRUNCATE TABLE LogAccessi;`,
`-- Non usa una WHERE per scegliere singole righe.`,
`-- Prima di usarlo verifica transazioni, vincoli, identity e permessi del tuo SGBD.`],['TRUNCATE è pensato per svuotare rapidamente una tabella.','Non è la scelta per eliminare solo alcune righe.','Il comportamento su identity, trigger e transazioni varia tra SGBD.'],'Qual è la differenza principale rispetto a DELETE?',`TRUNCATE svuota la tabella senza selezionare righe tramite WHERE e ha regole specifiche del SGBD.`,'Confronta TRUNCATE e DELETE in un ambiente di test.');

  add('CREATE DATABASE','CREATE DATABASE crea un nuovo database quando il SGBD e i permessi lo consentono.',[
`CREATE DATABASE ScuolaDb;`,
`-- Dopo la creazione, la sintassi per selezionarlo cambia tra SGBD.`,
`-- SQL Server, MySQL e PostgreSQL hanno dettagli differenti.`],['È un’operazione amministrativa.','Servono permessi adeguati.','Non tutti gli ambienti permettono la creazione da un’applicazione.'],'Scrivi il comando per creare ScuolaDb.',`CREATE DATABASE ScuolaDb;`,'Cerca nella documentazione del tuo SGBD come selezionare il database creato.');

  add('DROP DATABASE','DROP DATABASE elimina un intero database e quindi richiede massima attenzione.',[
`DROP DATABASE TestDb;`,
`-- Usare questo comando solo su database di test quando si è certi del risultato.`,
`-- Molti SGBD offrono varianti IF EXISTS.`],['L’operazione è distruttiva.','Permessi e sintassi dipendono dal SGBD.','Non va usata alla cieca in produzione.'],'Qual è il rischio principale?',`Eliminare definitivamente il database e i suoi dati.`,'Scrivi una procedura sicura di verifica prima di eseguire DROP DATABASE.');

  add('CREATE TABLE','CREATE TABLE definisce struttura, colonne e vincoli di una tabella.',[
`CREATE TABLE Studenti (\n  Id INT PRIMARY KEY,\n  Nome VARCHAR(100) NOT NULL,\n  Email VARCHAR(200) UNIQUE,\n  Eta INT CHECK (Eta >= 0)\n);`,
`CREATE TABLE Corsi (\n  Id INT PRIMARY KEY,\n  Nome VARCHAR(100) NOT NULL\n);`,
`-- Una buona struttura rende le query e i dati più affidabili.`],['Definisci colonne e tipi.','Aggiungi vincoli coerenti.','Progetta la tabella prima di inserire molti dati.'],'Crea una tabella Prodotti con Id, Nome e Prezzo.',`CREATE TABLE Prodotti (Id INT PRIMARY KEY, Nome VARCHAR(100) NOT NULL, Prezzo DECIMAL(10,2));`,'Aggiungi UNIQUE e CHECK al modello.');

  add('Data types','I tipi di dato descrivono quali valori possono essere memorizzati.',[
`CREATE TABLE Prodotti (\n  Id INT,\n  Nome VARCHAR(100),\n  Prezzo DECIMAL(10,2),\n  Disponibile BOOLEAN\n);`,
`-- SQL Server usa BIT per molti casi booleani.`,
`-- Date e timestamp hanno tipi e funzioni che variano tra SGBD.`],['Scegli un tipo coerente con i dati.','VARCHAR è usato per testo variabile.','DECIMAL è adatto a importi monetari.'],'Quale tipo useresti per un prezzo?',`DECIMAL(10,2) o un equivalente appropriato al SGBD.`,'Scegli i tipi per una tabella Clienti.');

  add('AUTO_INCREMENT','AUTO_INCREMENT genera automaticamente valori progressivi in MySQL/MariaDB; altri SGBD usano meccanismi differenti.',[
`CREATE TABLE Studenti (\n  Id INT AUTO_INCREMENT PRIMARY KEY,\n  Nome VARCHAR(100) NOT NULL\n);`,
`INSERT INTO Studenti (Nome) VALUES ('Anna');`,
`-- SQL Server usa IDENTITY, PostgreSQL può usare identity/sequence.`],['È una funzione dipendente dal database.','L’utente può omettere l’Id nell’INSERT.','Non assumere la stessa sintassi in tutti i SGBD.'],'Come inserisci uno studente senza specificare l’Id?',`INSERT INTO Studenti (Nome) VALUES ('Anna');`,'Confronta AUTO_INCREMENT con IDENTITY di SQL Server.');

  add('PRIMARY KEY','La PRIMARY KEY identifica in modo univoco ogni riga.',[
`CREATE TABLE Studenti (\n  Id INT PRIMARY KEY,\n  Nome VARCHAR(100)\n);`,
`CREATE TABLE Iscrizioni (\n  StudenteId INT,\n  CorsoId INT,\n  PRIMARY KEY (StudenteId, CorsoId)\n);`,
`-- Una chiave può essere singola o composta.`],['Una primary key non deve duplicarsi.','È usata per identificare record.','Può essere composta da più colonne.'],'Definisci una chiave primaria per Corsi.',`CREATE TABLE Corsi (Id INT PRIMARY KEY, Nome VARCHAR(100));`,'Progetta una chiave composta per Iscrizioni.');

  add('FOREIGN KEY','FOREIGN KEY collega una colonna a una chiave di un’altra tabella e aiuta a mantenere l’integrità referenziale.',[
`CREATE TABLE Iscrizioni (\n  Id INT PRIMARY KEY,\n  StudenteId INT NOT NULL,\n  CorsoId INT NOT NULL,\n  FOREIGN KEY (StudenteId) REFERENCES Studenti(Id),\n  FOREIGN KEY (CorsoId) REFERENCES Corsi(Id)\n);`,
`-- Il record collegato deve rispettare le regole referenziali.`,
`-- ON DELETE/ON UPDATE dipendono dal modello e dal SGBD.`],['La foreign key rappresenta una relazione.','Previene riferimenti a record inesistenti secondo le regole del database.','Le azioni CASCADE vanno progettate con attenzione.'],'Collega Iscrizioni a Studenti.',`FOREIGN KEY (StudenteId) REFERENCES Studenti(Id)`,'Aggiungi una foreign key verso Corsi.');

  add('UNIQUE','UNIQUE impedisce duplicati nella colonna o nella combinazione indicata.',[
`CREATE TABLE Utenti (\n  Id INT PRIMARY KEY,\n  Email VARCHAR(200) UNIQUE\n);`,
`CREATE TABLE Utenti (\n  Id INT PRIMARY KEY,\n  Nome VARCHAR(100),\n  Codice VARCHAR(30),\n  UNIQUE (Codice)\n);`,
`-- Le regole sui NULL nelle UNIQUE possono variare tra SGBD.`],['UNIQUE protegge l’unicità dei dati.','È diverso da PRIMARY KEY, che identifica il record.','Può essere singolo o composto.'],'Rendi unica l’email.',`Email VARCHAR(200) UNIQUE`,'Crea un vincolo UNIQUE composto su CodiceNazione e Numero.');

  add('NOT NULL','NOT NULL impedisce che una colonna contenga NULL.',[
`CREATE TABLE Studenti (\n  Id INT PRIMARY KEY,\n  Nome VARCHAR(100) NOT NULL\n);`,
`INSERT INTO Studenti (Id) VALUES (1); -- errore perché Nome è obbligatorio`,
`-- Usa NOT NULL quando l’informazione è necessaria per il modello.`],['NOT NULL esprime un requisito del dato.','Non sostituisce la validazione dell’applicazione.','Sceglilo solo quando il valore è davvero obbligatorio.'],'Rendi obbligatorio il cognome.',`Cognome VARCHAR(100) NOT NULL`,'Aggiungi NOT NULL a una colonna Email obbligatoria.');

  add('CHECK','CHECK impone una condizione sui valori inseriti o aggiornati.',[
`CREATE TABLE Prodotti (\n  Prezzo DECIMAL(10,2) CHECK (Prezzo >= 0)\n);`,
`CREATE TABLE Studenti (\n  Eta INT CHECK (Eta >= 0 AND Eta <= 120)\n);`,
`-- Il supporto e alcuni dettagli cambiano tra database/versioni.`],['CHECK protegge l’integrità del dato.','La condizione deve essere vera per i valori ammessi.','Non sostituisce tutte le regole dell’applicazione.'],'Impedisci prezzi negativi.',`Prezzo DECIMAL(10,2) CHECK (Prezzo >= 0)`,'Aggiungi un CHECK per una quantità maggiore di zero.');

  add('DEFAULT','DEFAULT assegna un valore automatico quando l’INSERT non specifica la colonna.',[
`CREATE TABLE Ordini (\n  Id INT PRIMARY KEY,\n  Stato VARCHAR(30) DEFAULT 'Nuovo'\n);`,
`INSERT INTO Ordini (Id) VALUES (1);`,
`-- La riga avrà Stato = 'Nuovo' se il SGBD applica il default.`],['DEFAULT riduce dati ripetitivi.','È applicato quando la colonna viene omessa o secondo le regole del SGBD.','Può usare espressioni/funzioni supportate dal database.'],'Imposta lo stato predefinito su Nuovo.',`Stato VARCHAR(30) DEFAULT 'Nuovo'`,'Aggiungi un default per la data di creazione usando la funzione del tuo SGBD.');

  add('ALTER TABLE','ALTER TABLE modifica la struttura di una tabella esistente.',[
`ALTER TABLE Studenti\nADD Email VARCHAR(200);`,
`ALTER TABLE Studenti\nADD Telefono VARCHAR(30);`,
`-- RENAME, ALTER COLUMN e DROP COLUMN cambiano sintassi tra SGBD.`],['ALTER TABLE modifica lo schema.','Le operazioni possono essere impattanti su tabelle grandi.','Verifica compatibilità e backup prima di migrazioni importanti.'],'Aggiungi Email a Studenti.',`ALTER TABLE Studenti ADD Email VARCHAR(200);`,'Progetta una migrazione che aggiunga una colonna obbligatoria senza rompere i dati esistenti.');

  add('DROP TABLE','DROP TABLE elimina la tabella e la sua struttura.',[
`DROP TABLE TestStudenti;`,
`-- Verifica prima dipendenze e foreign key.`,
`-- Alcuni SGBD supportano DROP TABLE IF EXISTS.`],['È un’operazione distruttiva.','Può essere bloccata da dipendenze.','Usala con attenzione soprattutto fuori dagli ambienti di test.'],'Qual è la differenza tra DELETE e DROP TABLE?',`DELETE rimuove righe; DROP TABLE elimina la tabella e la sua struttura.`,'Confronta DROP TABLE, TRUNCATE e DELETE.');

  add('INDEX','Un indice aiuta il database a trovare dati più velocemente, ma occupa spazio e può aumentare il costo delle scritture.',[
`CREATE INDEX IX_Studenti_Citta\nON Studenti(Citta);`,
`SELECT * FROM Studenti\nWHERE Citta='Ferrara';`,
`-- L’indice può aiutare il filtro sulla colonna indicizzata.`],['Gli indici non sono gratis.','Sono utili per ricerche frequenti.','Una progettazione sbagliata può peggiorare INSERT/UPDATE.'],'Perché creare un indice su una colonna usata spesso in WHERE?',`Per facilitare la ricerca dei record e potenzialmente ridurre il lavoro del database.`,'Individua tre colonne candidate a indice in un gestionale.');

  add('CREATE INDEX','CREATE INDEX crea esplicitamente un indice.',[
`CREATE INDEX IX_Clienti_Email\nON Clienti(Email);`,
`CREATE INDEX IX_Ordini_ClienteData\nON Ordini(ClienteId, DataOrdine);`,
`-- Gli indici composti seguono l’ordine delle colonne definite.`],['Scegli nomi coerenti.','Gli indici composti possono supportare più condizioni.','Analizza le query reali prima di indicizzare.'],'Crea un indice su Clienti.Email.',`CREATE INDEX IX_Clienti_Email ON Clienti(Email);`,'Progetta un indice composto per ClienteId + DataOrdine.');

  add('VIEW','Una VIEW è una query salvata che può essere usata come una tabella logica.',[
`CREATE VIEW VistaStudenti AS\nSELECT Id, Nome, Cognome\nFROM Studenti;`,
`SELECT * FROM VistaStudenti;`,
`-- Una VIEW può centralizzare una query riutilizzata frequentemente.`],['La view normalmente non duplica i dati come una tabella fisica.','Nasconde complessità e può aiutare la sicurezza.','Le possibilità di INSERT/UPDATE dipendono dalla view e dal SGBD.'],'Crea una view con studenti promossi.',`CREATE VIEW VistaPromossi AS SELECT * FROM Studenti WHERE Voto>=18;`,'Crea una view che unisca Studenti e Corsi.');

  add('Stored procedure','Una stored procedure contiene istruzioni SQL riutilizzabili e viene gestita dal database, con sintassi specifica del SGBD.',[
`-- Esempio SQL Server\nCREATE PROCEDURE GetStudenti\nAS\nBEGIN\n  SELECT * FROM Studenti;\nEND;`,
`-- MySQL usa una sintassi diversa con CREATE PROCEDURE.`,
`-- Le procedure possono accettare parametri e contenere logica.`],['Le stored procedure non sono SQL portabile al 100%.','I parametri evitano query duplicate.','La gestione degli errori varia tra database.'],'A cosa serve una stored procedure?',`A incapsulare una o più operazioni SQL riutilizzabili sul database.`,'Progetta una procedura che riceva una Citta come parametro.');

  add('Functions','Le funzioni SQL possono essere aggregate, scalari o specifiche del database e restituiscono valori utili nelle query.',[
`SELECT UPPER(Nome)\nFROM Studenti;`,
`SELECT ROUND(Prezzo,2)\nFROM Prodotti;`,
`SELECT COUNT(*) FROM Studenti;`],['Le funzioni trasformano o aggregano dati.','La disponibilità dei nomi varia tra SGBD.','Controlla sempre la documentazione del database.'],'Cita una funzione che trasformi un testo.',`UPPER(Nome)`,'Trova una funzione equivalente per il tuo SGBD e confrontala con UPPER.');

  add('CONCAT','CONCAT unisce più valori in una singola stringa; la gestione dei NULL può variare tra SGBD.',[
`SELECT CONCAT(Nome, ' ', Cognome) AS NomeCompleto\nFROM Studenti;`,
`SELECT CONCAT('Ordine #', Id) AS Codice\nFROM Ordini;`,
`-- In SQL Server è possibile usare anche + o CONCAT secondo il caso.`],['CONCAT evita concatenazioni ripetute.','Il risultato è una stringa.','Controlla la gestione dei NULL nel database usato.'],'Crea NomeCompleto.',`SELECT CONCAT(Nome,' ',Cognome) AS NomeCompleto FROM Studenti;`,'Aggiungi una prefisso alla città.');

  add('REPLACE','REPLACE sostituisce una parte di una stringa con un’altra.',[
`SELECT REPLACE(Nome, 'a', '@')\nFROM Studenti;`,
`SELECT REPLACE(Codice, '-', '')\nFROM Prodotti;`,
`UPDATE Clienti SET Telefono=REPLACE(Telefono,' ','');`],['REPLACE restituisce un nuovo valore nella SELECT.','Usato in UPDATE modifica realmente i dati.','Testa sempre la trasformazione con SELECT prima di UPDATE.'],'Rimuovi gli spazi da un codice.',`SELECT REPLACE(Codice,' ','') FROM Prodotti;`,'Prepara una SELECT prima di applicare REPLACE con UPDATE.');

  add('SUBSTRING','SUBSTRING estrae una parte di una stringa; posizione e sintassi possono variare tra SGBD.',[
`SELECT SUBSTRING(Codice,1,3)\nFROM Prodotti;`,
`SELECT SUBSTRING(Nome,1,1) AS Iniziale\nFROM Studenti;`,
`-- Controlla la numerazione delle posizioni nel tuo SGBD.`],['La funzione estrae una porzione di testo.','La sintassi può avere varianti.','È utile per codici e trasformazioni.'],'Estrai i primi tre caratteri del codice.',`SELECT SUBSTRING(Codice,1,3) FROM Prodotti;`,'Estrai l’iniziale del cognome.');

  add('TRIM, LTRIM e RTRIM','Queste funzioni eliminano spazi indesiderati all’inizio, alla fine o su entrambi i lati.',[
`SELECT TRIM(Nome)\nFROM Studenti;`,
`SELECT LTRIM(Nome)\nFROM Studenti;`,
`SELECT RTRIM(Nome)\nFROM Studenti;`],['TRIM lavora sui bordi del testo.','LTRIM agisce a sinistra.','RTRIM agisce a destra; nomi e comportamento possono variare.'],'Pulisci gli spazi attorno a un codice.',`SELECT TRIM(Codice) FROM Prodotti;`,'Prepara una query di pulizia per dati importati.');

  add('LPAD','LPAD aggiunge caratteri a sinistra fino a raggiungere una lunghezza, quando supportato dal SGBD.',[
`SELECT LPAD(CAST(Id AS CHAR), 5, '0')\nFROM Studenti;`,
`-- Esempio concettuale: 7 diventa 00007`,
`-- SQL Server può richiedere RIGHT/REPLICATE invece di LPAD.`],['È utile per codici formattati.','La funzione non è disponibile con la stessa sintassi in tutti i database.','La formattazione non cambia il valore originale.'],'Formatta l’Id a 5 cifre.',`SELECT LPAD(CAST(Id AS CHAR),5,'0') FROM Studenti;`,'Cerca l’equivalente SQL Server usando RIGHT e REPLICATE.');

  add('LENGTH','LENGTH restituisce la lunghezza di una stringa, ma il significato rispetto ai caratteri/byte dipende dal SGBD.',[
`SELECT LENGTH(Nome) AS Lunghezza\nFROM Studenti;`,
`SELECT * FROM Studenti\nWHERE LENGTH(Nome) > 10;`,
`-- Alcuni SGBD usano LEN o funzioni equivalenti.`],['Controlla se la funzione conta caratteri o byte nel tuo SGBD.','È utile per validazioni e analisi.','SQL Server usa comunemente LEN.'],'Trova nomi più lunghi di 8 caratteri.',`SELECT * FROM Studenti WHERE LENGTH(Nome)>8;`,'Confronta LENGTH con LEN in SQL Server.');

  add('UPPER e LOWER','UPPER converte il testo in maiuscolo e LOWER in minuscolo.',[
`SELECT UPPER(Nome) AS NomeMaiuscolo\nFROM Studenti;`,
`SELECT LOWER(Email) AS EmailNormalizzata\nFROM Clienti;`,
`SELECT * FROM Clienti WHERE LOWER(Email)=LOWER('MOUSSA@example.com');`],['Sono utili per normalizzare confronti testuali.','La collation può influenzare i confronti.','Non modificano i dati se usate solo in SELECT.'],'Mostra le email in minuscolo.',`SELECT LOWER(Email) FROM Clienti;`,'Prepara una query per confrontare email senza differenze di maiuscole.');

  add('INSTR e LOCATE','INSTR o LOCATE cercano la posizione di una sottostringa; la funzione disponibile dipende dal SGBD.',[
`SELECT INSTR(Email, '@')\nFROM Clienti;`,
`SELECT LOCATE('@', Email)\nFROM Clienti;`,
`-- In SQL Server puoi usare CHARINDEX.`],['Restituiscono una posizione.','Sono utili per analizzare stringhe.','Non usare una funzione specifica senza verificare il SGBD.'],'Trova la posizione della @ nelle email.',`SELECT INSTR(Email,'@') FROM Clienti;`,'Confronta INSTR, LOCATE e CHARINDEX.');

  add('REVERSE','REVERSE restituisce una stringa invertita in database che supportano questa funzione.',[
`SELECT REVERSE(Nome)\nFROM Studenti;`,
`SELECT REVERSE('SQL') AS Risultato;`,
`-- SQL Server supporta REVERSE.`],['È una funzione di trasformazione.','Può essere utile per esercizi o casi specifici.','Non è una soluzione generale per ogni elaborazione testuale.'],'Inverti la stringa SQL.',`SELECT REVERSE('SQL');`,'Prova REVERSE su un codice e osserva il risultato.');

  add('Funzioni numeriche: ROUND','ROUND arrotonda un valore numerico a una precisione indicata.',[
`SELECT ROUND(123.4567, 2) AS Valore;`,
`SELECT ROUND(Prezzo, 2) FROM Prodotti;`,
`SELECT Categoria, ROUND(AVG(Prezzo),2) AS Media FROM Prodotti GROUP BY Categoria;`],['Il secondo parametro indica la precisione in molti SGBD.','L’arrotondamento è utile nei report.','Per il denaro scegli anche un tipo DECIMAL appropriato.'],'Arrotonda i prezzi a due decimali.',`SELECT ROUND(Prezzo,2) FROM Prodotti;`,'Calcola la media per categoria con due decimali.');

  add('RAND','RAND genera numeri pseudo-casuali in alcuni SGBD, con sintassi dipendente dal database.',[
`SELECT RAND() AS NumeroCasuale;`,
`-- In MySQL RAND() è una funzione comune.`,
`-- Per SQL Server puoi usare RAND() con regole diverse.`],['Il valore è pseudo-casuale.','Non usarlo come sorgente crittografica.','La sintassi e il comportamento dipendono dal SGBD.'],'A cosa serve RAND?',`A generare valori pseudo-casuali per simulazioni o test.`,'Crea una query che generi un valore casuale e osserva più esecuzioni.');

  add('DATE_FORMAT','DATE_FORMAT è una funzione tipica di MySQL per formattare date in testo.',[
`SELECT DATE_FORMAT(DataOrdine, '%d/%m/%Y') AS DataFormattata\nFROM Ordini;`,
`SELECT DATE_FORMAT(DataOrdine, '%Y-%m') AS Mese\nFROM Ordini;`,
`-- Altri SGBD usano funzioni differenti.`],['La funzione è specifica del dialetto MySQL.','La formattazione produce testo.','Per filtri e ordinamenti è spesso meglio mantenere il valore come data.'],'Formatta una data come giorno/mese/anno.',`SELECT DATE_FORMAT(DataOrdine,'%d/%m/%Y') FROM Ordini;`,'Trova l’equivalente SQL Server con FORMAT o CONVERT.');

  add('NOW e funzioni di data/ora','Le funzioni per ottenere data e ora corrente cambiano tra SGBD.',[
`SELECT NOW();`,
`-- SQL Server\nSELECT GETDATE();`,
`-- PostgreSQL\nSELECT CURRENT_TIMESTAMP;`],['NOW è comune in MySQL.','SQL Server usa GETDATE/varianti.','CURRENT_TIMESTAMP è una forma più standard.'],'Quale funzione useresti in SQL Server?',`GETDATE() o una funzione equivalente secondo il requisito.`,'Confronta tre SGBD e annota le funzioni equivalenti.');

  add('DATEDIFF','DATEDIFF calcola la differenza tra date, ma la sintassi e l’unità cambiano tra SGBD.',[
`-- SQL Server\nSELECT DATEDIFF(day, DataInizio, DataFine) AS Giorni\nFROM Corsi;`,
`-- MySQL\nSELECT DATEDIFF(DataFine, DataInizio) AS Giorni\nFROM Corsi;`,
`-- Verifica sempre quale argomento rappresenta la data iniziale/finale.`],['Non esiste una sola sintassi universale.','Definisci chiaramente l’unità.','Attenzione a ore e timestamp.'],'Calcola la durata in giorni di un corso.',`SELECT DATEDIFF(day, DataInizio, DataFine) FROM Corsi;`,'Riscrivi l’esempio per MySQL.');

  add('DAYOFWEEK, MONTH e YEAR','Le funzioni di estrazione della data permettono di ottenere parti come giorno della settimana, mese e anno.',[
`SELECT MONTH(DataOrdine) AS Mese, YEAR(DataOrdine) AS Anno\nFROM Ordini;`,
`-- MySQL\nSELECT DAYOFWEEK(DataOrdine) FROM Ordini;`,
`-- Altri SGBD possono usare EXTRACT o DATEPART.`],['MONTH estrae il mese.','YEAR estrae l’anno.','DAYOFWEEK e equivalenti dipendono dal SGBD.'],'Mostra anno e mese degli ordini.',`SELECT YEAR(DataOrdine), MONTH(DataOrdine) FROM Ordini;`,'Raggruppa gli ordini per anno e mese.');

  add('CAST','CAST converte un valore da un tipo a un altro secondo le regole del database.',[
`SELECT CAST(123.45 AS INT);`,
`SELECT CAST(Prezzo AS DECIMAL(10,2)) FROM Prodotti;`,
`SELECT CAST(DataOrdine AS DATE) FROM Ordini;`],['CAST esplicita la conversione.','Una conversione può perdere precisione o causare errore.','I tipi disponibili variano tra SGBD.'],'Converti un valore numerico in intero.',`SELECT CAST(123.45 AS INT);`,'Converti una data/ora in una data.');

  add('CONVERT','CONVERT è una funzione di conversione con sintassi diversa tra MySQL, SQL Server e altri database.',[
`-- SQL Server\nSELECT CONVERT(VARCHAR(10), DataOrdine, 103)\nFROM Ordini;`,
`-- MySQL usa CONVERT con forme differenti e CAST è spesso più portabile.`,
`-- Controlla sempre il dialetto.`],['CONVERT è fortemente dipendente dal SGBD.','SQL Server offre stili di formattazione per alcune conversioni.','CAST è spesso più leggibile per conversioni standard.'],'Converti una data in testo in SQL Server.',`SELECT CONVERT(VARCHAR(10),DataOrdine,103) FROM Ordini;`,'Confronta CAST e CONVERT nello stesso progetto.');

  add('GROUP_CONCAT','GROUP_CONCAT concatena più valori di un gruppo in una stringa in MySQL/MariaDB.',[
`SELECT ClienteId, GROUP_CONCAT(Id ORDER BY Id) AS Ordini\nFROM Ordini\nGROUP BY ClienteId;`,
`SELECT Categoria, GROUP_CONCAT(Nome SEPARATOR ', ') AS Prodotti\nFROM Prodotti\nGROUP BY Categoria;`,
`-- Altri SGBD usano funzioni come STRING_AGG.`],['È utile per report compatti.','La sintassi è specifica del SGBD.','Controlla dimensioni massime e ordinamento.'],'Concatena i nomi dei prodotti per categoria.',`SELECT Categoria, GROUP_CONCAT(Nome SEPARATOR ', ') FROM Prodotti GROUP BY Categoria;`,'Trova l’equivalente SQL Server con STRING_AGG.');

  add('VERSION','VERSION restituisce informazioni sulla versione del database quando il SGBD supporta questa funzione.',[
`SELECT VERSION();`,
`-- MySQL/MariaDB\nSELECT VERSION();`,
`-- SQL Server usa funzioni/variabili diverse per informazioni sulla versione.`],['Le funzioni diagnostiche sono dipendenti dal database.','La versione è utile per verificare compatibilità.','Non costruire codice portabile assumendo VERSION().'],'Come controlli la versione?',`Con la funzione o il comando specifico del SGBD in uso.`,'Crea una piccola tabella di riferimento con MySQL, SQL Server e PostgreSQL.');

  add('MD5 e SHA1','MD5 e SHA1 sono funzioni hash storiche disponibili in alcuni SGBD; non sono consigliate per memorizzare password moderne.',[
`SELECT MD5('testo');`,
`SELECT SHA1('testo');`,
`-- Per password usa sempre funzioni di password hashing moderne nell’applicazione.`],['Hashing non significa cifratura reversibile.','MD5 e SHA1 sono considerati deboli per password.','Usa Argon2, bcrypt, scrypt o PBKDF2 secondo la piattaforma.'],'Perché non usare MD5 per le password?',`Perché non offre una protezione adeguata contro gli attacchi moderni alle password.`,'Indica una strategia corretta per l’autenticazione.');

  add('LEFT e RIGHT','LEFT e RIGHT estraggono caratteri dall’inizio o dalla fine di una stringa.',[
`SELECT LEFT(Codice,3) FROM Prodotti;`,
`SELECT RIGHT(Codice,4) FROM Prodotti;`,
`-- La sintassi è disponibile in diversi SGBD con possibili differenze.`],['LEFT prende i caratteri iniziali.','RIGHT prende quelli finali.','Sono utili per prefissi e suffissi.'],'Estrai gli ultimi 4 caratteri di un codice.',`SELECT RIGHT(Codice,4) FROM Prodotti;`,'Estrai il prefisso di tre caratteri.');

  add('Window functions','Le window functions calcolano valori sulle righe correlate senza trasformare il risultato in una sola riga per gruppo.',[
`SELECT Nome, Voto,\n       AVG(Voto) OVER () AS MediaClasse\nFROM Studenti;`,
`SELECT Nome, Voto,\n       ROW_NUMBER() OVER (ORDER BY Voto DESC) AS Posizione\nFROM Studenti;`,
`SELECT Categoria, Nome, Prezzo,\n       RANK() OVER (PARTITION BY Categoria ORDER BY Prezzo DESC) AS Posizione\nFROM Prodotti;`],['OVER definisce la finestra.','PARTITION BY divide i dati in gruppi logici.','ROW_NUMBER e RANK sono utili per classifiche.'],'Classifica gli studenti per voto.',`SELECT Nome,Voto,ROW_NUMBER() OVER(ORDER BY Voto DESC) AS Posizione FROM Studenti;`,'Calcola la media per città senza perdere le singole righe.');

  add('Performance e EXPLAIN','EXPLAIN mostra il piano o informazioni utili sul modo in cui il database intende eseguire una query.',[
`EXPLAIN SELECT *\nFROM Studenti\nWHERE Citta='Ferrara';`,
`-- SQL Server usa strumenti e comandi come execution plan/SET SHOWPLAN.`,
`-- Usa EXPLAIN per capire scansioni, indici e join.`],['Prima ottimizza misurando.','Un indice non è automaticamente la soluzione.','Leggi il piano di esecuzione del tuo SGBD.'],'A cosa serve EXPLAIN?',`A esaminare il piano di esecuzione di una query.`,'Confronta una query prima e dopo la creazione di un indice.');

  add('OPTIMIZE','OPTIMIZE è un comando dipendente dal SGBD usato in alcuni ambienti per manutenzione/ottimizzazione delle tabelle.',[
`-- MySQL\nOPTIMIZE TABLE Studenti;`,
`-- Non è un comando SQL standard universale.`,
`-- Prima di usarlo verifica documentazione, costi e necessità nel tuo ambiente.`],['Le operazioni di manutenzione dipendono dal database.','Non sostituiscono una buona progettazione delle query.','Valuta tempi e impatto prima di eseguire in produzione.'],'Perché OPTIMIZE non è una soluzione generica?',`Perché il comportamento e il comando dipendono dal SGBD e dalla sua gestione interna.`,'Documenta una procedura di manutenzione per il tuo database.');

  add('Commenti SQL','I commenti spiegano il codice e non vengono interpretati come istruzioni SQL.',[
`-- Commento su una riga\nSELECT * FROM Studenti;`,
`/* Commento\n   su più righe */\nSELECT COUNT(*) FROM Studenti;`,
`SELECT Nome -- commento\nFROM Studenti;`],['-- commenta fino alla fine della riga.','/* */ permette commenti multilinea.','Commenta il perché di una query complessa, non ogni carattere.'],'Aggiungi un commento che spieghi una SELECT.',`-- Elenco degli studenti\nSELECT * FROM Studenti;`,'Documenta una query con JOIN usando commenti brevi e utili.');

  add('Transactions','Una transazione raggruppa più operazioni in un’unità logica che può essere confermata o annullata.',[
`BEGIN TRANSACTION;\nUPDATE Conti SET Saldo=Saldo-100 WHERE Id=1;\nUPDATE Conti SET Saldo=Saldo+100 WHERE Id=2;\nCOMMIT;`,
`-- Se qualcosa va storto puoi usare ROLLBACK secondo il SGBD.`,
`-- Le transazioni sono fondamentali per operazioni finanziarie e consistenti.`],['Una transazione protegge una sequenza logica di operazioni.','COMMIT conferma.','ROLLBACK annulla secondo le regole della transazione.'],'Perché usare una transazione per trasferire denaro?',`Per evitare di lasciare un conto aggiornato e l’altro non aggiornato.`,'Simula un trasferimento con COMMIT e poi riprova con ROLLBACK.');

  add('COMMIT e ROLLBACK','COMMIT rende effettive le modifiche della transazione; ROLLBACK annulla le modifiche ancora reversibili nella transazione.',[
`BEGIN TRANSACTION;\nUPDATE Prodotti SET Prezzo=Prezzo*1.05;\nROLLBACK;`,
`BEGIN TRANSACTION;\nUPDATE Prodotti SET Prezzo=Prezzo*1.05;\nCOMMIT;`,
`-- Il comportamento preciso dipende da autocommit e SGBD.`],['ROLLBACK è utile per recuperare da un errore prima del commit.','COMMIT chiude la fase di modifica.','Testa sempre le transazioni in un ambiente controllato.'],'Quale comando conferma le modifiche?',`COMMIT.`,'Scrivi una transazione che aggiorni due righe e poi annullala.');

  add('SQL injection e sicurezza','SQL injection nasce quando input utente non affidabile viene concatenato direttamente nelle query. La difesa principale è usare query parametrizzate/prepared statements.',[
`-- DA EVITARE\n-- SELECT * FROM Utenti WHERE Email = '`+`' + email + '`+`';`,
`-- CORRETTO: query parametrizzata\nSELECT * FROM Utenti WHERE Email = ?;`,
`-- In SQL Server: SELECT * FROM Utenti WHERE Email = @Email;`],['Non concatenare input utente nella query.','Usa parametri/prepared statements.','Limita i privilegi dell’account del database.','Valida anche i dati secondo il dominio dell’applicazione.'],'Come si previene principalmente la SQL injection?',`Con query parametrizzate/prepared statements e privilegi minimi.`,'Trasforma una query concatenata in una query parametrizzata nel linguaggio che usi.');

  add('Progetto finale: database relazionale','Il progetto finale riunisce SELECT, filtri, JOIN, aggregazioni, vincoli, CRUD, transazioni e sicurezza in un piccolo database reale.',[
`CREATE TABLE Clienti (\n  Id INT PRIMARY KEY,\n  Nome VARCHAR(100) NOT NULL,\n  Email VARCHAR(200) UNIQUE\n);`,
`CREATE TABLE Ordini (\n  Id INT PRIMARY KEY,\n  ClienteId INT NOT NULL,\n  Importo DECIMAL(10,2) CHECK (Importo>=0),\n  FOREIGN KEY (ClienteId) REFERENCES Clienti(Id)\n);`,
`SELECT c.Nome, COUNT(o.Id) AS NumeroOrdini, SUM(o.Importo) AS Totale\nFROM Clienti c\nLEFT JOIN Ordini o ON o.ClienteId=c.Id\nGROUP BY c.Id, c.Nome\nORDER BY Totale DESC;`],['Progetta prima lo schema.','Inserisci dati realistici.','Scrivi query di lettura prima delle modifiche distruttive.','Aggiungi vincoli, indici e test.'],'Crea un mini gestionale Clienti + Ordini con almeno 3 tabelle.',`Clienti(Id,Nome,Email)\nOrdini(Id,ClienteId,Importo)\nProdotti(Id,Nome,Prezzo)\nPoi aggiungi una tabella OrdiniDettagli.`,'Estendi il progetto con report mensile, JOIN, GROUP BY, una VIEW, un indice e una transazione.');

  window.MOUSSA_SQL_COMPLETE = { lessons };
})();
