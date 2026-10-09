# Moussa Salisou — sito e corsi di programmazione

Sito web personale di Moussa Salisou, docente e sviluppatore. Comprende la
homepage, il catalogo dei corsi, le risorse didattiche e le pagine dei corsi
interattivi.

## Contenuti

- Homepage con percorsi formativi, presentazione e navigazione condivisa.
- Catalogo dei linguaggi e dei framework, tra cui Python, HTML, CSS, JavaScript,
  TypeScript, SQL Server, C, C++, C#, Java, Go, Rust, Kotlin, Swift e tecnologie
  .NET.
- Corsi interattivi, incluso il corso completo di SQL Server in
  `courses/sql-server/`.
- Risorse per continuare a esercitarsi e pagine informative.

## Struttura del progetto

- `index.html` — homepage.
- `assets/css/` e `assets/js/` — stili, componenti e script condivisi.
- `assets/images/languages/` — icone locali delle tecnologie; le icone Devicon
  sono distribuite con licenza MIT, riportata in `assets/images/languages/LICENSE`.
- `courses/` — catalogo e corsi organizzati in cartelle.
- `corso_*.html` — pagine dei singoli corsi.

## Sviluppo locale

Il sito è composto da file statici e non richiede una fase di compilazione.
Servire la cartella del progetto con un server HTTP locale e aprire la homepage
nel browser; alcuni percorsi del sito usano URL assoluti a partire dalla root.

## Pubblicazione

Pubblicare i file del repository mantenendo la struttura delle cartelle, così
che gli URL degli asset e dei corsi restino invariati.
