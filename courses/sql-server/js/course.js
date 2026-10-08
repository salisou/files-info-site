(() => {
    const originalRoute = route;
    const sqlServerOnlyExercises = new Set([
        "Indici e prestazioni|Quale colonna indicizzeresti per velocizzare la ricerca dei clienti per email? Scrivi il comando.",
        "Viste, stored procedure, funzioni, trigger|Scrivi una vista che mostri i prodotti con giacenza = 0.",
        "CTE e window functions|Numera i dipendenti di ogni reparto dal più pagato.",
        "Transazioni e gestione errori|Scrivi una transazione che cancella un ordine e le sue righe di dettaglio.",
        "Sicurezza, backup e ripristino|Scrivi il comando che dà solo lettura sulla tabella Prodotti all'utente mario."
    ]);

    route = function () {
        originalRoute();

        const hash = location.hash.slice(1);
        if (!hash || hash === "home") {
            const hero = document.querySelector("#main .hero");
            const introduction = hero?.querySelector("p");
            if (hero && introduction) {
                introduction.textContent = "Un percorso completo in italiano: dai fondamenti di T-SQL alle query, alla progettazione, alla programmazione e all'amministrazione di SQL Server.";

                const note = document.createElement("div");
                note.className = "nota";
                note.textContent = "L'editor integrato è un simulatore didattico in browser basato su AlaSQL: esegue le query compatibili sul dataset locale, ma non è un'istanza SQL Server. Per i comandi T-SQL specifici, usa SSMS o Azure Data Studio.";
                introduction.after(note);
            }
        } else if (hash === "schema") {
            const introduction = document.querySelector("#main > p");
            if (introduction) {
                introduction.textContent = "Dataset dimostrativo dell'e-commerce: 880 righe complessive in 6 tabelle collegate. La tabella categorie contiene 10 righe; le altre ne contengono da 100 a 400. I dati sono incorporati nell'applicazione e «Reset DB» ripristina la versione originale.";
            }
        }

        document.querySelectorAll('#main button[data-a="ex"]').forEach(button => {
            const module = M[Number(button.dataset.m)];
            const exercise = module?.es[Number(button.dataset.j)];
            const key = exercise ? `${module.t}|${exercise[0]}` : "";
            if (sqlServerOnlyExercises.has(key)) {
                const label = document.createElement("span");
                label.className = "nr";
                label.textContent = "Solo SQL Server — svolgi in SSMS o Azure Data Studio";
                button.replaceWith(label);
            }
        });
    };

    window.onhashchange = route;
    route();
})();
