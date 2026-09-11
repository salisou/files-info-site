(function(){'use strict';
const extra=window.MOUSSA_LANGUAGE_COURSES||{};
const frameworkCourses={
 blazor:{title:'Blazor Completo',lang:'csharp',topics:['Razor e componenti','Parametri ed eventi','Data binding','Routing','Form e validazione','HttpClient e API','Dependency Injection','Authentication','State management','Progetto finale']},
 maui:{title:'.NET MAUI Completo',lang:'csharp',topics:['Struttura app','XAML e layout','Controls','Data binding','MVVM','Shell navigation','API REST','SQLite','SecureStorage','Progetto finale']},
 aspnet:{title:'ASP.NET Core Web API Completo',lang:'csharp',topics:['REST e HTTP','Routing','Controller','DTO','Validation','EF Core','CRUD','JWT','Swagger e logging','Progetto finale']},
 tkinter:{title:'Python & Tkinter Completo',lang:'tkinter',topics:['Prima finestra','Label e Button','Entry e form','Grid e layout','Eventi','Canvas','ttk','SQLite','MVC','Progetto finale']},
 python_data:{title:'Python Data Analyst Completo',lang:'python',topics:['Python per i dati','NumPy','Pandas DataFrame','Cleaning','GroupBy','Matplotlib','Statistiche','Correlazioni','Excel/CSV','Progetto finale']},
 sqlserver:{title:'SQL Server Completo',lang:'sqlserver',topics:['Database e tabelle','SELECT','WHERE','JOIN','GROUP BY','Subquery','INSERT/UPDATE/DELETE','Constraints','Views e procedure','Progetto finale']},
 php_web:{title:'PHP Full Stack Completo',lang:'php',topics:['PHP base','Arrays e funzioni','Forms','Sessioni','OOP','PDO','CRUD','Security','API JSON','Progetto finale']},
 csharp_net:{title:'C# & .NET Completo',lang:'csharp',topics:['Tipi e variabili','switch e cicli','Metodi','Classi','OOP','Collections','LINQ','Exceptions','Async/await','Progetto finale']}
};
const frameworkExamples={
 blazor:['string framework="Blazor"; Console.WriteLine(framework);','int count=0; count++; Console.WriteLine(count);'],
 maui:['Console.WriteLine("MAUI: Android, iOS, Windows, macOS");','string[] pages={"Home","Prodotti","Profilo"}; foreach(var p in pages) Console.WriteLine(p);'],
 aspnet:['record Prodotto(int Id,string Nome); Console.WriteLine(new Prodotto(1,"Laptop"));','string[] methods={"GET","POST","PUT","DELETE"}; Console.WriteLine(string.Join(" -> ",methods));'],
 tkinter:['import tkinter as tk\nroot=tk.Tk()\nroot.title("Corso Tkinter")\ntk.Label(root,text="Ciao Moussa").pack(pady=40)\nroot.mainloop()','import tkinter as tk\nroot=tk.Tk()\ntk.Button(root,text="Saluta",command=lambda: print("Ciao!")).pack()\nroot.mainloop()'],
 python_data:['import pandas as pd\ndf=pd.DataFrame({"corso":["C#","Python"],"voto":[28,25]})\nprint(df)','import numpy as np\nprint(np.mean([18,24,30]))'],
 sqlserver:['CREATE TABLE Studenti(Id INT PRIMARY KEY, Nome VARCHAR(80), Voto INT);','SELECT Nome,Voto FROM Studenti WHERE Voto>=18 ORDER BY Voto DESC;'],
 php_web:['<?php $nome="Moussa"; echo "Ciao $nome"; ?>','<?php $voti=[28,25,30]; echo array_sum($voti)/count($voti); ?>'],
 csharp_net:['int voto=27; Console.WriteLine(voto>=18 ? "Superato" : "Non superato");','var voti=new[]{18,25,30}; Console.WriteLine(voti.Length);']
};
function escapeHtml(s){return String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function makeLessons(course,key){
 const examples=course.examples||frameworkExamples[key]||['Console.WriteLine("Esempio pratico");','Console.WriteLine("Secondo esempio");'];
 return course.topics.map((topic,i)=>({title:topic,explain:`In questa lezione impari ${topic.toLowerCase()} con un approccio progressivo: concetto, sintassi, esempio guidato, secondo esempio, esercizio e verifica. Parti dal codice, modificalo e osserva il risultato.`,goals:[`Capire ${topic}`,'Leggere e modificare un esempio reale','Applicare il concetto in un esercizio'],code:examples[i%examples.length],second:examples[(i+1)%examples.length],exercise:`Modifica l'esempio di “${topic}”: cambia almeno due valori e aggiungi una nuova funzionalità senza copiare la soluzione.`,quiz:[{q:`Qual è l'obiettivo principale della lezione “${topic}”?`,opts:[`Comprendere e applicare ${topic}`,'Saltare la pratica','Memorizzare senza eseguire'],a:0},{q:'Qual è il modo migliore per imparare il codice?',opts:['Leggere, modificare, eseguire e correggere','Non eseguire mai il codice','Copiare senza capire'],a:0}] }));
}
function getCourse(){
 const p=location.pathname.toLowerCase();
 for(const [key,c] of Object.entries(extra)) if(p.includes('/corso_'+key)) return {...c,key,lessons:makeLessons(c,key)};
 if(p.includes('/corso_blazor')) return {...frameworkCourses.blazor,key:'blazor',lessons:makeLessons(frameworkCourses.blazor,'blazor')};
 if(p.includes('/corso_maui')) return {...frameworkCourses.maui,key:'maui',lessons:makeLessons(frameworkCourses.maui,'maui')};
 if(p.includes('/corso_aspnet')) return {...frameworkCourses.aspnet,key:'aspnet',lessons:makeLessons(frameworkCourses.aspnet,'aspnet')};
 if(p.includes('/corso_tkinter')) return {...frameworkCourses.tkinter,key:'tkinter',lessons:makeLessons(frameworkCourses.tkinter,'tkinter')};
 if(p.includes('/corso_python_data')) return {...frameworkCourses.python_data,key:'python_data',lessons:makeLessons(frameworkCourses.python_data,'python_data')};
 if(p.includes('/corso_sqlserver')) return {...frameworkCourses.sqlserver,key:'sqlserver',lessons:makeLessons(frameworkCourses.sqlserver,'sqlserver')};
 if(p.includes('/corso_php')) return {...frameworkCourses.php_web,key:'php',lessons:makeLessons(frameworkCourses.php_web,'php_web')};
 if(p.includes('/corso_csharp')) return {...frameworkCourses.csharp_net,key:'csharp',lessons:makeLessons(frameworkCourses.csharp_net,'csharp_net')};
 return null;
}
function start(){const c=getCourse(); if(!c)return; document.body.innerHTML=`<div class="course-shell"><header class="course-header"><a href="/courses/" class="brand">MS Academy</a><div><span class="eyebrow">Percorso completo</span><h1>${escapeHtml(c.title)}</h1><p>${c.lessons.length} lezioni · esempi · esercizi · quiz · laboratorio online</p></div><a href="/courses/" class="back">Tutti i corsi</a></header><div class="course-grid"><aside class="course-sidebar"><input id="courseSearch" placeholder="Cerca una lezione..."><div id="lessonList"></div></aside><main id="lesson"></main></div></div>`;let idx=Number(localStorage.getItem('course:'+c.key)||0);if(!Number.isFinite(idx)||idx<0||idx>=c.lessons.length)idx=0;const list=document.querySelector('#lessonList'),main=document.querySelector('#lesson');
 function render(){const l=c.lessons[idx];list.innerHTML=c.lessons.map((x,i)=>`<button class="lesson-link ${i===idx?'active':''}" data-i="${i}"><span>${String(i+1).padStart(2,'0')}</span>${escapeHtml(x.title)}</button>`).join('');main.innerHTML=`<div class="lesson-head"><span>Lezione ${idx+1} di ${c.lessons.length}</span><div class="progress"><i style="width:${((idx+1)/c.lessons.length)*100}%"></i></div></div><article class="lesson-card"><h2>${escapeHtml(l.title)}</h2><p class="lead">${escapeHtml(l.explain)}</p><h3>Obiettivi</h3><ul>${l.goals.map(g=>`<li>${escapeHtml(g)}</li>`).join('')}</ul><div class="example-grid"><section><h3>Esempio guidato</h3><pre><code>${escapeHtml(l.code)}</code></pre></section><section><h3>Secondo esempio</h3><pre><code>${escapeHtml(l.second)}</code></pre></section></div><div class="exercise"><h3>Esercizio</h3><p>${escapeHtml(l.exercise)}</p></div><section class="lab"><div><h3>Laboratorio interattivo</h3><p>Puoi modificare il codice ed eseguirlo direttamente online.</p></div><iframe title="Editor online" src="https://onecompiler.com/${encodeURIComponent(c.lang)}" loading="lazy"></iframe></section><section class="quiz"><h3>Verifica rapida</h3>${l.quiz.map((q,qi)=>`<div class="q"><p><strong>${qi+1}. ${escapeHtml(q.q)}</strong></p>${q.opts.map((o,oi)=>`<button data-q="${qi}" data-a="${oi}">${escapeHtml(o)}</button>`).join('')}</div>`).join('')}</section><div class="lesson-nav"><button id="prev" ${idx===0?'disabled':''}>← Precedente</button><button id="next" ${idx===c.lessons.length-1?'disabled':''}>Successiva →</button></div></article>`;
 document.querySelectorAll('.lesson-link').forEach(b=>b.onclick=()=>{idx=+b.dataset.i;localStorage.setItem('course:'+c.key,idx);render();window.scrollTo({top:0,behavior:'smooth'});});document.querySelector('#prev').onclick=()=>{if(idx>0){idx--;localStorage.setItem('course:'+c.key,idx);render();}};document.querySelector('#next').onclick=()=>{if(idx<c.lessons.length-1){idx++;localStorage.setItem('course:'+c.key,idx);render();}};document.querySelectorAll('.q button').forEach(b=>b.onclick=()=>{const q=l.quiz[+b.dataset.q];b.classList.add(+b.dataset.a===q.a?'correct':'wrong');});document.querySelector('#courseSearch').oninput=e=>{const s=e.target.value.toLowerCase();document.querySelectorAll('.lesson-link').forEach(b=>b.hidden=!b.textContent.toLowerCase().includes(s));};}
 render();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();