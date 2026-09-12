/*
 * MS Academy - Source-based lesson packs
 *
 * This file contains original teaching adaptations inspired by the user's
 * public course/project repositories. The goal is not to copy entire source
 * repositories, but to turn proven classroom examples into small lessons
 * that a complete beginner can read, copy, save, execute and modify.
 */
(function(){
  'use strict';

  const esc = String;

  function pack(title, lead, code, second, third, steps, exercise, solution, mistakes, challenge, quiz, reference){
    return {title, lead, explain: lead, goals:['Capire il concetto partendo da zero','Leggere ogni riga del codice','Copiare e provare l’esempio','Modificare il codice senza paura'], code, second, third, steps, realExample: reference, exercise, solution, mistakes, challenge, quiz, difficulty:'base'};
  }

  const sql = {};
  const S = (title, lead, code, second, third, steps, exercise, solution, reference) => {
    sql[title] = pack(title, lead, code, second, third, steps, exercise, solution,
      ['Non eseguire comandi di modifica senza WHERE quando la lezione lo richiede.','Esegui prima SELECT per controllare i dati.','Leggi il messaggio di errore invece di ignorarlo.'],
      `Parti dall’esempio e aggiungi una piccola modifica collegata a ${title}.`, [], reference);
  };

  S('Introduzione a SQL Server',
    'SQL Server è il sistema che useremo per creare e interrogare un database. Immaginalo come un grande archivio organizzato: il database contiene tabelle e le tabelle contengono dati.',
    `-- Il nostro primo database\nCREATE DATABASE ScuolaDb;`,
    `-- Dopo aver creato il database, lo selezioniamo\nUSE ScuolaDb;`,
    `-- Controlliamo i database disponibili\nSELECT name\nFROM sys.databases;`,
    ['-- Commento: questa riga non viene eseguita.','CREATE DATABASE ScuolaDb;  -- crea il database','USE ScuolaDb;             -- seleziona il database','SELECT name FROM sys.databases; -- legge i database'],
    'Scrivi il comando per creare un database chiamato BibliotecaDb e poi selezionalo.',
    `CREATE DATABASE BibliotecaDb;\nGO\n\nUSE BibliotecaDb;\nGO`,
    'Nel corso SQL Server dell’utente la base di lavoro è ScuolaDb.');

  S('Database e SSMS',
    'SQL Server Management Studio, spesso chiamato SSMS, è l’ambiente grafico in cui possiamo collegarci a SQL Server, aprire un database e scrivere query.',
    `-- Seleziona il database su cui lavorare\nUSE ScuolaDb;\n\n-- Verifica il database corrente\nSELECT DB_NAME() AS DatabaseCorrente;`,
    `-- Elenco delle tabelle del database corrente\nSELECT TABLE_NAME\nFROM INFORMATION_SCHEMA.TABLES\nWHERE TABLE_TYPE = 'BASE TABLE';`,
    `-- Una query semplice per verificare che SQL Server risponda\nSELECT 'SQL Server funziona!' AS Messaggio;`,
    ['USE ScuolaDb; — scegli il database','DB_NAME() — restituisce il nome del database corrente','INFORMATION_SCHEMA.TABLES — contiene informazioni sulle tabelle','SELECT — chiede a SQL Server di restituire un risultato'],
    'Visualizza il nome del database corrente con DB_NAME().',
    `USE ScuolaDb;\nSELECT DB_NAME() AS DatabaseCorrente;`,
    'Gli esercizi del corso SQL Server usano ScuolaDb come database didattico.');

  S('CREATE DATABASE',
    'CREATE DATABASE serve a creare un nuovo database. Per iniziare basta conoscere il comando e ricordare che il nome deve essere significativo.',
    `-- Creazione del database\nCREATE DATABASE ScuolaDb;`,
    `-- Un secondo database di esempio\nCREATE DATABASE BibliotecaDb;`,
    `-- Dopo la creazione, selezioniamo il database\nUSE ScuolaDb;`,
    ['CREATE DATABASE — comando per creare un database','ScuolaDb — nome scelto per il database','; — indica la fine dell’istruzione','USE — cambia il database corrente'],
    'Crea un database chiamato NegozioDb.',
    `CREATE DATABASE NegozioDb;`,
    'Il database ScuolaDb è il modello usato nei progetti didattici SQL dell’utente.');

  S('CREATE TABLE',
    'Una tabella è simile a una tabella Excel: ha colonne che descrivono i dati e righe che rappresentano i singoli record.',
    `-- Creiamo la tabella degli studenti\nCREATE TABLE Studenti (\n    StudenteId INT PRIMARY KEY,\n    Nome NVARCHAR(50) NOT NULL,\n    Cognome NVARCHAR(50) NOT NULL\n);`,
    `-- Aggiungiamo una tabella per i corsi\nCREATE TABLE Corsi (\n    CorsoId INT PRIMARY KEY,\n    NomeCorso NVARCHAR(100) NOT NULL,\n    Durata INT\n);`,
    `-- Ora possiamo leggere la struttura usando INFORMATION_SCHEMA\nSELECT COLUMN_NAME, DATA_TYPE\nFROM INFORMATION_SCHEMA.COLUMNS\nWHERE TABLE_NAME = 'Studenti';`,
    ['CREATE TABLE Studenti — crea la tabella','StudenteId INT — identifica lo studente con un numero','PRIMARY KEY — rende l’identificatore unico','NVARCHAR(50) — contiene testo fino a 50 caratteri','NOT NULL — obbliga a inserire un valore'],
    'Crea una tabella Libri con Id, Titolo e AnnoPubblicazione.',
    `CREATE TABLE Libri (\n    Id INT PRIMARY KEY,\n    Titolo NVARCHAR(150) NOT NULL,\n    AnnoPubblicazione INT\n);`,
    'Il modello Studenti/Corsi è ricorrente nei materiali SQL Server dell’utente.');

  S('Data types',
    'Il tipo di dato dice a SQL Server che cosa può essere memorizzato in una colonna. INT è un numero intero, NVARCHAR è testo e DATE è una data.',
    `CREATE TABLE Studenti (\n    StudenteId INT,\n    Nome NVARCHAR(50),\n    DataNascita DATE,\n    Media FLOAT\n);`,
    `-- Esempi di valori compatibili\nDECLARE @Eta INT = 16;\nDECLARE @Nome NVARCHAR(50) = 'Amina';\nDECLARE @Nascita DATE = '2010-05-12';\nDECLARE @Media FLOAT = 27.5;\n\nSELECT @Eta AS Eta, @Nome AS Nome, @Nascita AS DataNascita, @Media AS Media;`,
    `-- Un carattere singolo\nDECLARE @Iniziale CHAR(1) = 'M';\nSELECT @Iniziale AS Iniziale;`,
    ['INT — numeri interi','NVARCHAR — testo Unicode','DATE — data','FLOAT — numeri decimali','CHAR(1) — un carattere'],
    'Crea una variabile INT per l’età e una NVARCHAR per il nome, poi visualizzale.',
    `DECLARE @Eta INT = 16;\nDECLARE @Nome NVARCHAR(50) = 'Luca';\nSELECT @Eta AS Eta, @Nome AS Nome;`,
    'I materiali SQL dell’utente includono una tabella introduttiva dei tipi di dati più comuni.');

  S('PRIMARY KEY',
    'La chiave primaria identifica in modo univoco ogni riga. È come il numero di matricola di uno studente: non dovrebbe esistere due volte.',
    `CREATE TABLE Studenti (\n    StudenteId INT PRIMARY KEY,\n    Nome NVARCHAR(50) NOT NULL\n);`,
    `INSERT INTO Studenti (StudenteId, Nome)\nVALUES (1, 'Amina');\n\nSELECT * FROM Studenti;`,
    `-- Questo tentativo genera un errore perché 1 esiste già\n-- INSERT INTO Studenti (StudenteId, Nome) VALUES (1, 'Luca');`,
    ['StudenteId — identificatore','PRIMARY KEY — impone unicità e identificazione','INSERT — aggiunge una riga','Il secondo Id 1 non è consentito'],
    'Crea una tabella Corsi con CorsoId come PRIMARY KEY.',
    `CREATE TABLE Corsi (\n    CorsoId INT PRIMARY KEY,\n    NomeCorso NVARCHAR(100) NOT NULL\n);`,
    'Le tabelle Studenti e Corsi dei progetti didattici usano identificatori numerici.');

  S('FOREIGN KEY',
    'La chiave esterna collega due tabelle. Per esempio, un’iscrizione collega uno studente a un corso.',
    `CREATE TABLE Corsi (\n    CorsoId INT PRIMARY KEY,\n    NomeCorso NVARCHAR(100) NOT NULL\n);\n\nCREATE TABLE Iscrizioni (\n    IscrizioneId INT PRIMARY KEY,\n    StudenteId INT,\n    CorsoId INT,\n    FOREIGN KEY (CorsoId) REFERENCES Corsi(CorsoId)\n);`,
    `-- Un record che punta a un corso esistente\nINSERT INTO Corsi VALUES (1, 'SQL Server Base');\nINSERT INTO Iscrizioni VALUES (1, 10, 1);`,
    `-- La relazione può essere usata in una JOIN\nSELECT i.IscrizioneId, c.NomeCorso\nFROM Iscrizioni i\nINNER JOIN Corsi c ON i.CorsoId = c.CorsoId;`,
    ['Corsi.CorsoId — chiave primaria','Iscrizioni.CorsoId — chiave esterna','REFERENCES — indica quale chiave viene referenziata','JOIN — usa la relazione per leggere dati insieme'],
    'Collega una tabella Iscrizioni alla tabella Corsi tramite CorsoId.',
    `FOREIGN KEY (CorsoId) REFERENCES Corsi(CorsoId)`,
    'La struttura Studenti/Corsi/Iscrizioni è uno dei modelli usati nei corsi SQL Server dell’utente.');

  S('Constraints',
    'I vincoli proteggono la qualità dei dati. PRIMARY KEY, NOT NULL, UNIQUE, CHECK e FOREIGN KEY impediscono molti errori comuni.',
    `CREATE TABLE Studenti (\n    StudenteId INT PRIMARY KEY,\n    Email NVARCHAR(150) UNIQUE,\n    Nome NVARCHAR(50) NOT NULL,\n    Voto INT CHECK (Voto BETWEEN 0 AND 30)\n);`,
    `-- Un voto fuori dall'intervallo non è valido\n-- INSERT INTO Studenti VALUES (1, 'a@example.com', 'Amina', 50);`,
    `-- Una email duplicata non è valida\n-- INSERT INTO Studenti VALUES (2, 'a@example.com', 'Luca', 25);`,
    ['NOT NULL — valore obbligatorio','UNIQUE — valore non duplicabile','CHECK — regola sul valore','PRIMARY KEY — identità della riga'],
    'Crea una colonna Voto che accetti soltanto valori da 0 a 30.',
    `Voto INT CHECK (Voto BETWEEN 0 AND 30)`,
    'I materiali didattici dell’utente lavorano con dati realistici di studenti, corsi e voti.');

  S('SELECT',
    'SELECT serve a leggere dati. È il comando che userai più spesso per vedere che cosa contiene una tabella.',
    `-- Leggi tutte le colonne\nSELECT *\nFROM Studenti;`,
    `-- Leggi solo le colonne che ti servono\nSELECT Nome, Cognome\nFROM Studenti;`,
    `-- Dai un nome più leggibile alla colonna\nSELECT Nome + ' ' + Cognome AS NomeCompleto\nFROM Studenti;`,
    ['SELECT — scegli i dati','* — tutte le colonne','FROM Studenti — indica la tabella','AS — crea un alias leggibile'],
    'Visualizza Nome, Cognome e Email dalla tabella Studenti.',
    `SELECT Nome, Cognome, Email\nFROM Studenti;`,
    'Il corso SQL Server dell’utente usa spesso SELECT * e SELECT di colonne specifiche.');

  S('WHERE',
    'WHERE filtra le righe. In pratica diciamo a SQL Server: mostrami soltanto i dati che rispettano questa condizione.',
    `SELECT Nome, Cognome, Telefono\nFROM Studenti\nWHERE StudenteId = 2;`,
    `SELECT Nome, Cognome\nFROM Studenti\nWHERE DataNascita >= '2000-01-01';`,
    `SELECT *\nFROM Studenti\nWHERE Email IS NOT NULL;`,
    ['FROM Studenti — scegli la tabella','WHERE — inizia il filtro','StudenteId = 2 — condizione di uguaglianza','IS NOT NULL — cerca valori presenti'],
    'Mostra gli studenti con StudenteId uguale a 3.',
    `SELECT *\nFROM Studenti\nWHERE StudenteId = 3;`,
    'Gli esempi del corso dell’utente usano WHERE per filtrare studenti per Id, data e valori presenti.');

  S('ORDER BY',
    'ORDER BY ordina il risultato. ASC significa crescente, DESC significa decrescente.',
    `SELECT Nome, Cognome\nFROM Studenti\nORDER BY Nome ASC;`,
    `SELECT Nome, Cognome\nFROM Studenti\nORDER BY Nome DESC;`,
    `SELECT *\nFROM Studenti\nORDER BY DataNascita ASC;`,
    ['ORDER BY Nome — ordina per Nome','ASC — crescente','DESC — decrescente','Puoi ordinare anche date e numeri'],
    'Ordina gli studenti dal voto più alto al più basso.',
    `SELECT Nome, Voto\nFROM Studenti\nORDER BY Voto DESC;`,
    'Gli esempi SQL dell’utente mostrano ORDER BY con ASC e DESC.');

  S('DISTINCT',
    'DISTINCT elimina i duplicati dal risultato. È utile quando vuoi vedere quali valori diversi esistono in una colonna.',
    `SELECT DISTINCT NomeCorso\nFROM Corsi;`,
    `SELECT DISTINCT Crediti, Durata\nFROM Corsi;`,
    `SELECT DISTINCT DataNascita\nFROM Studenti;`,
    ['SELECT DISTINCT — chiede valori senza duplicati','NomeCorso — colonna da analizzare','Se scegli più colonne, viene considerata la combinazione'],
    'Mostra una sola volta ogni nome di corso.',
    `SELECT DISTINCT NomeCorso\nFROM Corsi;`,
    'Nel progetto SQL Server dell’utente DISTINCT è usato per rimuovere corsi duplicati nel risultato.');

  S('Aggregate functions',
    'Le funzioni aggregate calcolano un risultato su più righe. COUNT conta, AVG calcola la media, SUM somma, MIN e MAX trovano minimo e massimo.',
    `SELECT COUNT(*) AS TotaleStudenti\nFROM Studenti;`,
    `SELECT AVG(Voto) AS MediaVoti\nFROM Studenti;`,
    `SELECT MIN(Voto) AS VotoMinimo, MAX(Voto) AS VotoMassimo\nFROM Studenti;`,
    ['COUNT(*) — conta le righe','AVG(Voto) — media dei voti','MIN — valore minimo','MAX — valore massimo'],
    'Conta quanti corsi sono presenti nella tabella Corsi.',
    `SELECT COUNT(*) AS TotaleCorsi\nFROM Corsi;`,
    'Le funzioni aggregate sono presenti nei materiali SQL Server dell’utente.');

  S('GROUP BY',
    'GROUP BY raggruppa righe con lo stesso valore. È utile per rispondere a domande come: quanti studenti abbiamo per ogni corso?',
    `SELECT CorsoId, COUNT(*) AS NumeroIscritti\nFROM Iscrizioni\nGROUP BY CorsoId;`,
    `SELECT DataNascita, COUNT(*) AS NumeroStudenti\nFROM Studenti\nGROUP BY DataNascita;`,
    `SELECT NomeCorso, AVG(Crediti) AS MediaCrediti\nFROM Corsi\nGROUP BY NomeCorso;`,
    ['GROUP BY CorsoId — crea un gruppo per ogni corso','COUNT(*) — conta le righe di ogni gruppo','Ogni riga del risultato rappresenta un gruppo'],
    'Conta quanti corsi esistono per ogni valore di Durata.',
    `SELECT Durata, COUNT(*) AS NumeroCorsi\nFROM Corsi\nGROUP BY Durata;`,
    'I materiali SQL dell’utente usano aggregazioni su dati di corsi e iscrizioni.');

  S('HAVING',
    'HAVING filtra i gruppi creati da GROUP BY. WHERE filtra righe prima del raggruppamento; HAVING filtra il risultato del gruppo.',
    `SELECT CorsoId, COUNT(*) AS NumeroIscritti\nFROM Iscrizioni\nGROUP BY CorsoId\nHAVING COUNT(*) > 5;`,
    `SELECT NomeCorso, COUNT(*) AS Totale\nFROM Corsi\nGROUP BY NomeCorso\nHAVING COUNT(*) >= 2;`,
    `SELECT CorsoId, AVG(Voto) AS Media\nFROM Voti\nGROUP BY CorsoId\nHAVING AVG(Voto) >= 24;`,
    ['GROUP BY — crea i gruppi','HAVING — filtra i gruppi','COUNT(*) > 5 — mantiene solo i gruppi con più di 5 righe'],
    'Mostra solo i corsi che hanno almeno 2 iscrizioni.',
    `SELECT CorsoId, COUNT(*) AS NumeroIscritti\nFROM Iscrizioni\nGROUP BY CorsoId\nHAVING COUNT(*) >= 2;`,
    'HAVING completa il percorso SELECT/GROUP BY/aggregazioni presente nei materiali dell’utente.');

  S('INNER JOIN',
    'INNER JOIN unisce righe di due tabelle quando esiste una corrispondenza. È il modo principale per leggere dati collegati.',
    `SELECT\n    s.Nome,\n    s.Cognome,\n    c.NomeCorso\nFROM Studenti AS s\nINNER JOIN Iscrizioni AS i\n    ON s.StudenteId = i.StudenteId\nINNER JOIN Corsi AS c\n    ON i.CorsoId = c.CorsoId;`,
    `SELECT s.Nome, c.NomeCorso\nFROM Studenti s\nINNER JOIN Iscrizioni i ON s.StudenteId = i.StudenteId\nINNER JOIN Corsi c ON i.CorsoId = c.CorsoId\nWHERE s.StudenteId = 42;`,
    `-- Leggi solo il corso e lo studente\nSELECT s.Nome, c.NomeCorso\nFROM Studenti s\nJOIN Iscrizioni i ON s.StudenteId = i.StudenteId\nJOIN Corsi c ON c.CorsoId = i.CorsoId;`,
    ['s, i, c — alias brevi per le tabelle','ON — definisce il collegamento','StudenteId — collega studente e iscrizione','CorsoId — collega iscrizione e corso'],
    'Mostra Nome dello studente e NomeCorso usando le tre tabelle.',
    `SELECT s.Nome, c.NomeCorso\nFROM Studenti s\nINNER JOIN Iscrizioni i ON s.StudenteId = i.StudenteId\nINNER JOIN Corsi c ON i.CorsoId = c.CorsoId;`,
    'Questa JOIN a tre tabelle è direttamente coerente con gli esempi del corso SQL Server dell’utente.');

  S('LEFT JOIN',
    'LEFT JOIN mantiene tutte le righe della tabella a sinistra anche quando non esiste una corrispondenza a destra.',
    `SELECT\n    s.StudenteId,\n    s.Nome,\n    c.NomeCorso\nFROM Studenti AS s\nLEFT JOIN Iscrizioni AS i\n    ON s.StudenteId = i.StudenteId\nLEFT JOIN Corsi AS c\n    ON i.CorsoId = c.CorsoId;`,
    `-- Trova gli studenti senza corso\nSELECT s.StudenteId, s.Nome\nFROM Studenti s\nLEFT JOIN Iscrizioni i ON s.StudenteId = i.StudenteId\nWHERE i.StudenteId IS NULL;`,
    `-- Valore sostitutivo per NULL\nSELECT s.Nome, ISNULL(c.NomeCorso, 'Nessun corso') AS Corso\nFROM Studenti s\nLEFT JOIN Iscrizioni i ON s.StudenteId = i.StudenteId\nLEFT JOIN Corsi c ON i.CorsoId = c.CorsoId;`,
    ['LEFT JOIN — conserva tutte le righe a sinistra','NULL — indica che non è stata trovata una corrispondenza','IS NULL — cerca l’assenza di un valore','ISNULL — sostituisce NULL con un testo'],
    'Trova gli studenti che non hanno un’iscrizione.',
    `SELECT s.StudenteId, s.Nome\nFROM Studenti s\nLEFT JOIN Iscrizioni i ON s.StudenteId = i.StudenteId\nWHERE i.StudenteId IS NULL;`,
    'Gli esempi del corso dell’utente usano LEFT JOIN e ISNULL per trovare dati mancanti.');

  S('Subquery',
    'Una subquery è una query dentro un’altra query. Può aiutarti quando una condizione dipende dal risultato di una seconda ricerca.',
    `SELECT Nome, Voto\nFROM Studenti\nWHERE Voto > (\n    SELECT AVG(Voto)\n    FROM Studenti\n);`,
    `SELECT *\nFROM Corsi\nWHERE CorsoId IN (\n    SELECT CorsoId\n    FROM Iscrizioni\n);`,
    `-- La query interna calcola prima la media\nSELECT AVG(Voto) AS Media\nFROM Studenti;`,
    ['La query interna viene usata dalla query esterna','AVG(Voto) calcola la media','La query esterna confronta ogni studente con la media'],
    'Mostra gli studenti con un voto maggiore della media.',
    `SELECT Nome, Voto\nFROM Studenti\nWHERE Voto > (SELECT AVG(Voto) FROM Studenti);`,
    'La subquery è un passaggio naturale dopo SELECT, WHERE e funzioni aggregate.');

  S('CTE',
    'Una CTE, Common Table Expression, dà un nome temporaneo a una query e rende più leggibili query più complesse.',
    `WITH StudentiBravi AS (\n    SELECT Nome, Cognome, Voto\n    FROM Studenti\n    WHERE Voto >= 27\n)\nSELECT *\nFROM StudentiBravi;`,
    `WITH Statistiche AS (\n    SELECT CorsoId, COUNT(*) AS Iscritti\n    FROM Iscrizioni\n    GROUP BY CorsoId\n)\nSELECT *\nFROM Statistiche\nWHERE Iscritti >= 5;`,
    `WITH CorsiAttivi AS (\n    SELECT CorsoId, NomeCorso\n    FROM Corsi\n)\nSELECT * FROM CorsiAttivi;`,
    ['WITH — inizia la CTE','StudentiBravi — nome temporaneo','AS (...) — contiene la query','SELECT finale — usa il risultato della CTE'],
    'Crea una CTE chiamata CorsiLunghi che selezioni i corsi con Durata >= 100.',
    `WITH CorsiLunghi AS (\n    SELECT *\n    FROM Corsi\n    WHERE Durata >= 100\n)\nSELECT * FROM CorsiLunghi;`,
    'Le CTE sono il passo successivo alle subquery quando vuoi scrivere query più leggibili.');

  S('INSERT',
    'INSERT INTO aggiunge nuovi record. Prima di eseguire un INSERT devi conoscere le colonne obbligatorie della tabella.',
    `INSERT INTO Studenti\n    (Nome, Cognome, Email)\nVALUES\n    ('Amina', 'Rossi', 'amina@example.com');`,
    `-- Più righe in una sola istruzione\nINSERT INTO Corsi\n    (NomeCorso, Descrizione, Crediti, Durata)\nVALUES\n    ('SQL Server Base', 'Introduzione ai database', 9, 120),\n    ('SQL Server Avanzato', 'Query e procedure', 12, 160);`,
    `-- Controlla il risultato\nSELECT *\nFROM Studenti\nWHERE Email = 'amina@example.com';`,
    ['INSERT INTO — indica la tabella','(Nome, Cognome, Email) — colonne','VALUES — valori da inserire','SELECT dopo INSERT — verifica il risultato'],
    'Inserisci uno studente chiamato Luca Bianchi.',
    `INSERT INTO Studenti (Nome, Cognome, Email)\nVALUES ('Luca', 'Bianchi', 'luca@example.com');`,
    'Il corso SQL Server dell’utente contiene esempi INSERT su Studenti e Corsi.');

  S('UPDATE',
    'UPDATE modifica record esistenti. La regola più importante per un principiante è: controlla prima con SELECT e usa una WHERE precisa.',
    `-- Controlliamo prima il record\nSELECT *\nFROM Corsi\nWHERE CorsoId = 60;\n\n-- Poi modifichiamo\nUPDATE Corsi\nSET NomeCorso = 'Corso Base SQL'\nWHERE CorsoId = 60;`,
    `UPDATE Studenti\nSET Telefono = '+391234567890'\nWHERE StudenteId = 42;`,
    `-- Verifica dopo la modifica\nSELECT *\nFROM Studenti\nWHERE StudenteId = 42;`,
    ['SELECT prima — controlla il record','UPDATE — modifica','SET — indica il nuovo valore','WHERE — limita le righe da modificare'],
    'Modifica il nome del corso con CorsoId = 1 senza toccare gli altri corsi.',
    `UPDATE Corsi\nSET NomeCorso = 'SQL Server Base'\nWHERE CorsoId = 1;`,
    'Il file CRUD del corso dell’utente mostra UPDATE con WHERE e suggerisce esercizi mirati.');

  S('DELETE',
    'DELETE elimina righe. È un comando potente: senza WHERE rischi di eliminare tutti i record della tabella.',
    `-- Controlla prima quale riga vuoi eliminare\nSELECT *\nFROM Corsi\nWHERE CorsoId = 61;\n\n-- Elimina solo quella riga\nDELETE FROM Corsi\nWHERE CorsoId = 61;`,
    `-- Esempio didattico: elimina uno studente specifico\nDELETE FROM Studenti\nWHERE StudenteId = 42;`,
    `-- ATTENZIONE: senza WHERE vengono eliminate tutte le righe\n-- DELETE FROM Studenti;`,
    ['SELECT — controlla','DELETE FROM — elimina','WHERE — protegge le altre righe','Senza WHERE — rischio di eliminazione completa'],
    'Scrivi un DELETE che elimini solo il corso con CorsoId = 10.',
    `DELETE FROM Corsi\nWHERE CorsoId = 10;`,
    'Nel materiale CRUD dell’utente DELETE è spiegato insieme alla raccomandazione di usare una condizione precisa.');

  S('MERGE',
    'MERGE permette di sincronizzare una tabella in base alla corrispondenza tra dati sorgente e dati destinazione. È un argomento avanzato: prima impariamo il concetto, poi la sintassi.',
    `MERGE Corsi AS target\nUSING (VALUES\n    (1, 'SQL Server Base', 120)\n) AS source (CorsoId, NomeCorso, Durata)\nON target.CorsoId = source.CorsoId\nWHEN MATCHED THEN\n    UPDATE SET NomeCorso = source.NomeCorso, Durata = source.Durata\nWHEN NOT MATCHED THEN\n    INSERT (CorsoId, NomeCorso, Durata)\n    VALUES (source.CorsoId, source.NomeCorso, source.Durata);`,
    `-- Prima di usare MERGE in un progetto reale\nSELECT * FROM Corsi;`,
    `-- Un semplice controllo della chiave\nSELECT CorsoId, NomeCorso\nFROM Corsi\nWHERE CorsoId = 1;`,
    ['MERGE — sincronizza dati','USING — definisce la sorgente','ON — stabilisce la corrispondenza','WHEN MATCHED — aggiorna','WHEN NOT MATCHED — inserisce'],
    'Spiega con parole tue la differenza tra MATCHED e NOT MATCHED.',
    'MATCHED significa che esiste una riga corrispondente; NOT MATCHED significa che non esiste.',
    'MERGE va affrontato dopo INSERT e UPDATE perché combina concetti già conosciuti.');

  S('Views',
    'Una VIEW è una query salvata che puoi trattare come una tabella virtuale. È utile per riutilizzare una SELECT complessa.',
    `CREATE VIEW vw_StudentiCorsi AS\nSELECT\n    s.StudenteId,\n    s.Nome,\n    s.Cognome,\n    c.NomeCorso\nFROM Studenti s\nINNER JOIN Iscrizioni i ON s.StudenteId = i.StudenteId\nINNER JOIN Corsi c ON i.CorsoId = c.CorsoId;`,
    `-- Usiamo la view come una tabella\nSELECT *\nFROM vw_StudentiCorsi;`,
    `-- Possiamo filtrare la view\nSELECT *\nFROM vw_StudentiCorsi\nWHERE Nome = 'Amina';`,
    ['CREATE VIEW — salva la definizione della query','vw_StudentiCorsi — nome della view','SELECT * FROM view — usa la view'],
    'Crea una view che mostri Nome e Cognome degli studenti.',
    `CREATE VIEW vw_Studenti AS\nSELECT Nome, Cognome\nFROM Studenti;`,
    'Le view sono il passo successivo alle JOIN quando vuoi riutilizzare una query.');

  S('Stored procedures',
    'Una stored procedure è un programma SQL salvato nel database. Può ricevere parametri ed eseguire più istruzioni.',
    `CREATE PROCEDURE sp_GetAllStudenti\nAS\nBEGIN\n    SELECT *\n    FROM Studenti;\nEND;\nGO\n\nEXEC sp_GetAllStudenti;`,
    `CREATE PROCEDURE sp_GetStudenteById\n    @StudenteId INT\nAS\nBEGIN\n    SELECT *\n    FROM Studenti\n    WHERE StudenteId = @StudenteId;\nEND;\nGO\n\nEXEC sp_GetStudenteById @StudenteId = 3;`,
    `-- Controlla la procedura\nEXEC sp_helptext 'sp_GetAllStudenti';`,
    ['CREATE PROCEDURE — crea la procedura','@StudenteId — parametro','EXEC — esegue la procedura','WHERE — usa il parametro per filtrare'],
    'Crea una procedura che restituisca lo studente con un Id passato come parametro.',
    `CREATE PROCEDURE sp_GetStudenteById\n    @StudenteId INT\nAS\nBEGIN\n    SELECT * FROM Studenti WHERE StudenteId = @StudenteId;\nEND;`,
    'I repository SQL Server dell’utente contengono procedure GetAll e GetById.');

  S('Functions',
    'Una funzione SQL restituisce un valore e può essere riutilizzata in altre query. È diversa da una stored procedure perché nasce per produrre un risultato utilizzabile.',
    `CREATE FUNCTION dbo.CalcolaSconto(@Prezzo DECIMAL(10,2))\nRETURNS DECIMAL(10,2)\nAS\nBEGIN\n    RETURN @Prezzo * 0.90;\nEND;\nGO\n\nSELECT dbo.CalcolaSconto(100) AS PrezzoScontato;`,
    `SELECT dbo.CalcolaSconto(50) AS PrezzoScontato;`,
    `-- La funzione può essere usata in una SELECT\nSELECT NomeCorso, dbo.CalcolaSconto(Crediti * 10) AS Valore\nFROM Corsi;`,
    ['CREATE FUNCTION — definisce la funzione','RETURNS — tipo del risultato','RETURN — restituisce il valore','dbo.CalcolaSconto(...) — richiama la funzione'],
    'Crea una funzione che raddoppi un numero DECIMAL.',
    `CREATE FUNCTION dbo.Raddoppia(@Numero DECIMAL(10,2))\nRETURNS DECIMAL(10,2)\nAS\nBEGIN\n    RETURN @Numero * 2;\nEND;`,
    'Le funzioni arrivano dopo le stored procedure perché riutilizzano gli stessi concetti di parametri e logica.');

  S('Triggers',
    'Un trigger è una logica che SQL Server esegue automaticamente quando avviene un evento, per esempio INSERT, UPDATE o DELETE. È un argomento avanzato.',
    `CREATE TRIGGER trg_Studenti_Insert\nON Studenti\nAFTER INSERT\nAS\nBEGIN\n    PRINT 'È stato inserito un nuovo studente.';\nEND;`,
    `-- Inserendo un record il trigger può reagire\nINSERT INTO Studenti (StudenteId, Nome)\nVALUES (100, 'Sara');`,
    `-- Controlliamo il nuovo record\nSELECT * FROM Studenti WHERE StudenteId = 100;`,
    ['CREATE TRIGGER — crea il trigger','AFTER INSERT — reagisce dopo INSERT','ON Studenti — tabella osservata','PRINT — semplice effetto dimostrativo'],
    'Descrivi in una frase che cosa fa un trigger AFTER INSERT.',
    'Esegue automaticamente la logica definita dopo un inserimento nella tabella.',
    'I trigger vanno studiati dopo aver compreso bene INSERT, UPDATE e DELETE.');

  S('Transactions',
    'Una transazione raggruppa più operazioni in un’unica unità. Se qualcosa va storto possiamo fare ROLLBACK; se tutto va bene facciamo COMMIT.',
    `BEGIN TRANSACTION;\n\nUPDATE Corsi\nSET Durata = 150\nWHERE CorsoId = 1;\n\nCOMMIT TRANSACTION;`,
    `BEGIN TRANSACTION;\n\nUPDATE Corsi\nSET Durata = 999\nWHERE CorsoId = 1;\n\n-- Annulla la modifica\nROLLBACK TRANSACTION;`,
    `SELECT CorsoId, Durata\nFROM Corsi\nWHERE CorsoId = 1;`,
    ['BEGIN TRANSACTION — inizia','COMMIT — conferma','ROLLBACK — annulla','SELECT — controlla il risultato'],
    'Esegui una modifica dentro una transazione e annullala con ROLLBACK.',
    `BEGIN TRANSACTION;\nUPDATE Corsi SET Durata = 999 WHERE CorsoId = 1;\nROLLBACK TRANSACTION;`,
    'Le transazioni sono fondamentali quando più modifiche devono essere gestite insieme.');

  S('Indexes e performance',
    'Un indice aiuta SQL Server a trovare dati più velocemente, come l’indice di un libro. Va usato con criterio perché occupa spazio e rende più costose alcune modifiche.',
    `CREATE INDEX IX_Studenti_Email\nON Studenti (Email);`,
    `-- Controlla gli indici della tabella\nSELECT name\nFROM sys.indexes\nWHERE object_id = OBJECT_ID('Studenti');`,
    `-- Una query che può beneficiare di un indice\nSELECT *\nFROM Studenti\nWHERE Email = 'amina@example.com';`,
    ['CREATE INDEX — crea un indice','IX_Studenti_Email — nome dell’indice','ON Studenti (Email) — colonna indicizzata','WHERE Email = ... — esempio di ricerca'],
    'Crea un indice sulla colonna CodiceFiscale.',
    `CREATE INDEX IX_Studenti_CodiceFiscale\nON Studenti (CodiceFiscale);`,
    'Gli indici sono introdotti dopo aver imparato a interrogare e modificare i dati.');

  sql['Progetto finale SQL Server'] = pack(
    'Progetto finale SQL Server',
    'Ora mettiamo insieme tutto quello che abbiamo imparato costruendo una piccola base dati per una scuola: database, tabelle, dati, relazioni, query e una stored procedure.',
    `-- 1. Creazione del database\nCREATE DATABASE ScuolaDb;\nGO\n\nUSE ScuolaDb;\nGO\n\n-- 2. Tabella Corsi\nCREATE TABLE Corsi (\n    CorsoId INT PRIMARY KEY IDENTITY(1,1),\n    NomeCorso NVARCHAR(100) NOT NULL,\n    Durata INT NOT NULL\n);\n\n-- 3. Tabella Studenti\nCREATE TABLE Studenti (\n    StudenteId INT PRIMARY KEY IDENTITY(1,1),\n    Nome NVARCHAR(50) NOT NULL,\n    Cognome NVARCHAR(50) NOT NULL,\n    Email NVARCHAR(150) UNIQUE\n);`,
    `-- 4. Inserimento dati\nINSERT INTO Corsi (NomeCorso, Durata)\nVALUES\n('SQL Server Base', 120),\n('SQL Server Avanzato', 160);\n\nINSERT INTO Studenti (Nome, Cognome, Email)\nVALUES\n('Amina', 'Rossi', 'amina@example.com'),\n('Luca', 'Bianchi', 'luca@example.com');`,
    `-- 5. Prima interrogazione\nSELECT *\nFROM Studenti\nORDER BY Cognome;`,
    ['CREATE DATABASE — crea l’archivio','CREATE TABLE — crea le strutture','INSERT — aggiunge dati','SELECT — legge i dati','ORDER BY — ordina il risultato'],
    'Completa il progetto aggiungendo una tabella Iscrizioni con StudentId e CorsoId e crea una JOIN per mostrare studente e corso.',
    `CREATE TABLE Iscrizioni (\n    IscrizioneId INT PRIMARY KEY IDENTITY(1,1),\n    StudenteId INT NOT NULL,\n    CorsoId INT NOT NULL,\n    FOREIGN KEY (StudenteId) REFERENCES Studenti(StudenteId),\n    FOREIGN KEY (CorsoId) REFERENCES Corsi(CorsoId)\n);\n\nSELECT s.Nome, s.Cognome, c.NomeCorso\nFROM Studenti s\nINNER JOIN Iscrizioni i ON s.StudenteId = i.StudenteId\nINNER JOIN Corsi c ON i.CorsoId = c.CorsoId;`,
    ['Esegui tutto il progetto in un database di prova.','Se una query fallisce, esegui le parti una alla volta.','Non usare dati personali reali.'],
    'Aggiungi una stored procedure sp_GetAllStudenti e una query che conti gli iscritti per corso.',
    [
      {q:'Quale comando crea il database?',opts:['CREATE DATABASE','SELECT','INSERT','DELETE'],answer:0,explain:'CREATE DATABASE crea il database.'},
      {q:'Quale comando legge i dati?',opts:['SELECT','UPDATE','DELETE','CREATE'],answer:0,explain:'SELECT serve per leggere.'},
      {q:'Quale vincolo identifica una riga?',opts:['PRIMARY KEY','ORDER BY','GROUP BY','LIKE'],answer:0,explain:'PRIMARY KEY identifica univocamente la riga.'},
      {q:'Quale JOIN conserva tutte le righe della tabella sinistra?',opts:['LEFT JOIN','INNER JOIN','CROSS JOIN','Nessuna'],answer:0,explain:'LEFT JOIN mantiene le righe a sinistra.'},
      {q:'Quale comando annulla una transazione?',opts:['ROLLBACK','COMMIT','SELECT','EXEC'],answer:0,explain:'ROLLBACK annulla le modifiche non confermate.'}
    ],
    'Il progetto finale riusa il modello didattico ScuolaDb presente nei corsi SQL Server dell’utente.'
  );

  const python = {
    'Introduzione a Python': pack('Introduzione a Python','Python è un linguaggio leggibile. Iniziamo con un programma minuscolo: stampare un messaggio.',`# Il nostro primo programma\nprint("Ciao! Sto imparando Python.")`,`# Possiamo stampare più valori\nnome = "Amina"\nprint("Ciao", nome)`,`# Anche un numero\neta = 16\nprint("Età:", eta)`,['print(...) — mostra un risultato','Le stringhe sono racchiuse tra virgolette','Le variabili conservano valori'], 'Scrivi un programma che stampi il tuo nome.',`print("Mi chiamo Luca")`,'I corsi Python dell’utente sono ricchi di esempi progressivi e progetti pratici.'),
    'Variabili': pack('Variabili','Una variabile è un nome a cui assegniamo un valore. È come una scatola con un’etichetta.',`nome = "Amina"\neta = 16\nprint(nome)\nprint(eta)`,`prezzo = 19.90\nquantita = 3\ntotale = prezzo * quantita\nprint("Totale:", totale)`,`iscrizione_attiva = True\nprint("Attivo:", iscrizione_attiva)`,['nome = "Amina" — testo','eta = 16 — intero','totale = prezzo * quantita — calcolo'], 'Crea nome, età e città come tre variabili.',`nome = "Luca"\neta = 16\ncitta = "Ferrara"\nprint(nome, eta, citta)`,'I materiali Python dell’utente usano variabili con studenti, prezzi e dati reali.'),
    'Input': pack('Input','input() permette al programma di chiedere un dato alla persona che lo sta usando.',`nome = input("Come ti chiami? ")\nprint("Ciao", nome)`,`eta = int(input("Quanti anni hai? "))\nprint("L'anno prossimo avrai", eta + 1)`,`numero = float(input("Inserisci un numero: "))\nprint("Doppio:", numero * 2)`,['input(...) — legge testo dalla tastiera','int(...) — converte in intero','float(...) — converte in decimale'], 'Chiedi nome e età e stampali.',`nome = input("Nome: ")\neta = int(input("Età: "))\nprint("Ciao", nome, "hai", eta, "anni")`,'Il corso Python dell’utente lavora molto con input, conversioni e piccoli programmi interattivi.'),
    'Funzioni': pack('Funzioni','Una funzione raggruppa istruzioni con un nome. In questo modo possiamo riutilizzare lo stesso codice.',`def somma(a, b):\n    return a + b\n\nrisultato = somma(10, 5)\nprint("Risultato:", risultato)`,`def saluta(nome):\n    print("Ciao", nome)\n\nsaluta("Amina")`,`def area_rettangolo(base, altezza):\n    return base * altezza\n\nprint(area_rettangolo(5, 3))`,['def — inizia la funzione','a, b — parametri','return — restituisce il risultato','somma(10, 5) — chiama la funzione'], 'Crea una funzione moltiplica(a, b) che restituisca il prodotto.',`def moltiplica(a, b):\n    return a * b\n\nprint(moltiplica(4, 5))`,'I repository Python dell’utente contengono molti esercizi su funzioni e programmi modulari.'),
    'Progetto finale Python': pack('Progetto finale Python','Costruiamo una piccola applicazione da terminale: un menu che richiama funzioni separate. È il tipo di esempio che permette a un principiante di vedere come i concetti si collegano.',`import os\n\ndef somma():\n    print("\\n--- SOMMA TRA 2 NUMERI ---")\n    try:\n        num1 = float(input("Inserisci il primo numero: "))\n        num2 = float(input("Inserisci il secondo numero: "))\n        print("La somma:", num1 + num2)\n    except ValueError:\n        print("Errore: devi inserire solo numeri")\n\ndef mostra_menu():\n    print("\\n=== MENU DI SCELTA ===")\n    print("1. SOMMA")\n    print("2. ESCI")\n\ndef main():\n    while True:\n        mostra_menu()\n        scelta = input("Scegli un'opzione: ")\n        if scelta == "1":\n            somma()\n        elif scelta == "2":\n            print("Programma terminato")\n            break\n\nmain()`,`def concatena():\n    prima = input("Prima parola: ")\n    seconda = input("Seconda parola: ")\n    print("Risultato:", prima + " " + seconda)\n\nconcatena()`,`# Prova a sostituire il menu con una terza scelta\n# e crea una nuova funzione.`,['import os — importa un modulo','def somma() — separa una responsabilità','try/except — gestisce un errore di input','mostra_menu() — visualizza le scelte','while True — mantiene il menu attivo','break — esce dal ciclo','main() — avvia il programma'], 'Aggiungi una scelta per concatenare due stringhe e una scelta per pulire la console.',`def concatenazione():\n    prima = input("Prima parola: ")\n    seconda = input("Seconda parola: ")\n    print("Risultato:", prima + " " + seconda)`, 'Questo esempio è adattato dal modello di esercizio Python fornito dall’utente e dai suoi repository di corso.' )
  };

  const generic = {
    csharp_net: {
      'Introduzione a C# e .NET': ['Console.WriteLine("Ciao mondo!");','string nome = "Amina";\nConsole.WriteLine($"Ciao {nome}");','int eta = 16;\nConsole.WriteLine(eta);'],
      'Variabili e tipi': ['string nome = "Amina";\nint eta = 16;\ndouble media = 27.5;','bool attivo = true;\nConsole.WriteLine(attivo);','decimal prezzo = 19.90m;\nConsole.WriteLine(prezzo);'],
      'Metodi': ['static int Somma(int a, int b) => a + b;\nConsole.WriteLine(Somma(10, 5));','static void Saluta(string nome)\n{\n    Console.WriteLine($"Ciao {nome}");\n}','static double Area(double baseR, double altezza) => baseR * altezza;'],
      'Classi': ['class Studente\n{\n    public string Nome { get; set; } = "";\n    public int Voto { get; set; }\n}\n\nvar s = new Studente { Nome = "Amina", Voto = 28 };\nConsole.WriteLine(s.Nome);'],
      'Progetto finale .NET': ['var studenti = new List<string> { "Amina", "Luca", "Sara" };\nforeach (var studente in studenti)\n{\n    Console.WriteLine(studente);\n}']
    },
    php_web: {
      'Introduzione a PHP': ['<?php\n$name = "Amina";\necho "Ciao $name";'],
      'Variabili e tipi': ['<?php\n$nome = "Amina";\n$eta = 16;\n$attivo = true;\nvar_dump($nome, $eta, $attivo);'],
      'Funzioni': ['<?php\nfunction somma(float $a, float $b): float\n{\n    return $a + $b;\n}\necho somma(10, 5);'],
      'CRUD': ['<?php\n$pdo = new PDO("mysql:host=localhost;dbname=scuola", "root", "");\n$stmt = $pdo->prepare("SELECT * FROM studenti WHERE id = ?");\n$stmt->execute([1]);\nprint_r($stmt->fetchAll());'],
      'Progetto finale PHP': ['<?php\nfunction saluta(string $nome): string\n{\n    return "Ciao " . $nome;\n}\necho saluta("Amina");']
    }
  };

  function build(course){
    if(!course || !course.key) return null;
    if(course.key === 'sqlserver'){
      return (course.topics || []).map((topic, index) => {
        const item = sql[topic];
        if(item) return {...item, sourcePack:true, source:'Corso-completo-Sql-Server-TalentForm-Edizione-6'};
        return fallback(course, topic, index);
      });
    }
    if(course.key === 'python' || course.key === 'python_data'){
      return (course.topics || []).map((topic, index) => {
        const item = python[topic];
        if(item) return {...item, sourcePack:true, source:'Corso_Python2026 / corsi Python dell’utente'};
        return fallback(course, topic, index);
      });
    }
    const g = generic[course.key];
    if(g){
      return (course.topics || []).map((topic,index)=>{
        const codes=g[topic];
        if(codes){
          return pack(topic,`Impariamo ${topic} partendo da zero con un esempio C# o PHP molto piccolo.`,codes[0],codes[1]||codes[0],codes[2]||codes[0],['Leggi la prima riga','Individua i dati','Esegui l’esempio','Modifica un valore'],`Modifica l’esempio della lezione ${topic} e verifica il risultato.`,codes[0], 'Esempi adattati dalla tipologia di esercizi presente nei progetti dell’utente.');
        }
        return fallback(course,topic,index);
      });
    }
    return null;
  }

  function fallback(course,topic,index){
    const lang=course.lang||'text';
    const samples={
      html:[`<h1>Ciao!</h1>\n<p>Sto imparando ${topic}.</p>`,`<section>\n  <h2>${topic}</h2>\n  <p>Primo esercizio.</p>\n</section>`],
      css:[`.card {\n  padding: 20px;\n  border: 1px solid #ccc;\n}`],
      javascript:[`const valore = 10;\nconsole.log(valore);`],
      typescript:[`const valore: number = 10;\nconsole.log(valore);`],
      c:[`#include <stdio.h>\n\nint main(void)\n{\n    printf("Ciao mondo!\\n");\n    return 0;\n}`],
      cpp:[`#include <iostream>\n\nint main()\n{\n    std::cout << "Ciao mondo!\\n";\n    return 0;\n}`],
      java:[`public class Main {\n    public static void main(String[] args) {\n        System.out.println("Ciao mondo!");\n    }\n}`],
      go:[`package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Ciao mondo!")\n}`],
      rust:[`fn main() {\n    println!("Ciao mondo!");\n}`],
      kotlin:[`fun main() {\n    println("Ciao mondo!")\n}`],
      swift:[`print("Ciao mondo!")`]
    };
    const arr=samples[lang]||[`// Esempio di ${topic}`];
    const code=arr[0];
    return pack(topic,`In questa lezione impariamo ${topic} partendo da zero. Prima leggiamo un esempio piccolo, poi lo modifichiamo.`,code,arr[1]||code,`// Variante da provare\n${code}`,['Leggi l’esempio dall’alto verso il basso','Individua la parte che cambia','Esegui il codice','Modifica un valore e riprova'],`Copia l’esempio, eseguilo e modifica almeno una parte legata a ${topic}.`,code,['Non copiare senza capire.','Prova una modifica alla volta.'],'Crea una piccola variante personale.',[],`Lezione ${index+1} del percorso ${course.title}.`);
  }

  window.MOUSSA_SOURCE_LESSONS = {build};
})();
