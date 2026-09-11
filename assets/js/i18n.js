(() => {
  const translations = {
    it: {
      'nav.home':'Home','nav.services':'Servizi','nav.courses':'Corsi','nav.resources':'Risorse','nav.about':'Chi sono','nav.contact':'Contattami',
      'contact.kicker':'PARLIAMO','contact.title':'Hai un progetto, un corso o una collaborazione in mente?','contact.subtitle':'Scrivimi direttamente. Riceverò il tuo messaggio su <strong>msalisou1@gmail.com</strong> e potrò risponderti personalmente.','contact.formKicker':'MESSAGGIO','contact.formTitle':'Scrivimi','contact.formText':'Compila il modulo. Il messaggio verrà inoltrato alla mia casella email.','contact.name':'Nome','contact.email':'Email','contact.subject':'Oggetto','contact.message':'Messaggio','contact.consent':"Acconsento all'invio del messaggio tramite il servizio di form.",'contact.send':'Invia messaggio','contact.note':"Prima dell'utilizzo, FormSubmit richiede una conferma iniziale dell'indirizzo email.",
      'resources.kicker':'LEARNING HUB','resources.title':'Risorse che uso e consiglio ai miei studenti','resources.subtitle':'Documentazione ufficiale, corsi, tutorial ed editor online per continuare a esercitarsi dopo ogni lezione.'
    },
    en: {
      'nav.home':'Home','nav.services':'Services','nav.courses':'Courses','nav.resources':'Resources','nav.about':'About','nav.contact':'Contact me',
      'contact.kicker':'LET’S TALK','contact.title':'Do you have a project, course or collaboration in mind?','contact.subtitle':'Write to me directly. I will receive your message at <strong>msalisou1@gmail.com</strong> and reply personally.','contact.formKicker':'MESSAGE','contact.formTitle':'Send me a message','contact.formText':'Fill in the form. Your message will be forwarded to my email inbox.','contact.name':'Name','contact.email':'Email','contact.subject':'Subject','contact.message':'Message','contact.consent':'I agree to send this message through the form service.','contact.send':'Send message','contact.note':'FormSubmit requires an initial email confirmation before the form can receive messages.','resources.kicker':'LEARNING HUB','resources.title':'Resources I use and recommend to my students','resources.subtitle':'Official documentation, courses, tutorials and online editors to keep practicing after every lesson.'
    },
    fr: {
      'nav.home':'Accueil','nav.services':'Services','nav.courses':'Cours','nav.resources':'Ressources','nav.about':'À propos','nav.contact':'Me contacter',
      'contact.kicker':'PARLONS','contact.title':'Vous avez un projet, une formation ou une collaboration en tête ?','contact.subtitle':'Écrivez-moi directement. Je recevrai votre message sur <strong>msalisou1@gmail.com</strong> et je vous répondrai personnellement.','contact.formKicker':'MESSAGE','contact.formTitle':'Écrivez-moi','contact.formText':'Remplissez le formulaire. Votre message sera envoyé à ma boîte email.','contact.name':'Nom','contact.email':'Email','contact.subject':'Objet','contact.message':'Message','contact.consent':"J'accepte l'envoi de ce message via le service de formulaire.",'contact.send':'Envoyer le message','contact.note':'FormSubmit demande une confirmation initiale de votre adresse email avant de recevoir les messages.','resources.kicker':'LEARNING HUB','resources.title':'Ressources que j’utilise et recommande à mes étudiants','resources.subtitle':'Documentation officielle, cours, tutoriels et éditeurs en ligne pour continuer à pratiquer après chaque leçon.'
    },
    es: {
      'nav.home':'Inicio','nav.services':'Servicios','nav.courses':'Cursos','nav.resources':'Recursos','nav.about':'Sobre mí','nav.contact':'Contactarme',
      'contact.kicker':'HABLEMOS','contact.title':'¿Tienes un proyecto, curso o colaboración en mente?','contact.subtitle':'Escríbeme directamente. Recibiré tu mensaje en <strong>msalisou1@gmail.com</strong> y te responderé personalmente.','contact.formKicker':'MENSAJE','contact.formTitle':'Escríbeme','contact.formText':'Completa el formulario. El mensaje será enviado a mi correo.','contact.name':'Nombre','contact.email':'Email','contact.subject':'Asunto','contact.message':'Mensaje','contact.consent':'Acepto enviar este mensaje mediante el servicio de formularios.','contact.send':'Enviar mensaje','contact.note':'FormSubmit requiere una confirmación inicial del correo antes de recibir mensajes.','resources.kicker':'LEARNING HUB','resources.title':'Recursos que utilizo y recomiendo a mis estudiantes','resources.subtitle':'Documentación oficial, cursos, tutoriales y editores online para seguir practicando después de cada lección.'
    },
    de: {
      'nav.home':'Startseite','nav.services':'Leistungen','nav.courses':'Kurse','nav.resources':'Ressourcen','nav.about':'Über mich','nav.contact':'Kontakt',
      'contact.kicker':'SPRECHEN WIR','contact.title':'Hast du ein Projekt, einen Kurs oder eine Zusammenarbeit im Sinn?','contact.subtitle':'Schreib mir direkt. Ich erhalte deine Nachricht unter <strong>msalisou1@gmail.com</strong> und antworte persönlich.','contact.formKicker':'NACHRICHT','contact.formTitle':'Schreib mir','contact.formText':'Fülle das Formular aus. Deine Nachricht wird an mein E-Mail-Postfach weitergeleitet.','contact.name':'Name','contact.email':'E-Mail','contact.subject':'Betreff','contact.message':'Nachricht','contact.consent':'Ich stimme dem Versand dieser Nachricht über den Formulardienst zu.','contact.send':'Nachricht senden','contact.note':'FormSubmit benötigt eine einmalige Bestätigung der E-Mail-Adresse, bevor Nachrichten empfangen werden können.','resources.kicker':'LEARNING HUB','resources.title':'Ressourcen, die ich nutze und meinen Studenten empfehle','resources.subtitle':'Offizielle Dokumentation, Kurse, Tutorials und Online-Editoren zum Weiterüben nach jeder Lektion.'
    }
  };

  const langCodes = {it:'IT',en:'EN',fr:'FR',es:'ES',de:'DE'};
  const saved = localStorage.getItem('site-language');
  const browser = (navigator.language || 'it').slice(0,2);
  let current = translations[saved] ? saved : (translations[browser] ? browser : 'it');

  function apply(lang) {
    current = translations[lang] ? lang : 'it';
    document.documentElement.lang = current;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = translations[current][el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    document.querySelectorAll('.language-current').forEach(el => el.textContent = langCodes[current]);
    localStorage.setItem('site-language', current);
    document.title = current === 'it' ? document.title.replace(/^.*? —/, 'Contatti —') : document.title;
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.language-switcher').forEach(switcher => {
      const currentBtn = switcher.querySelector('.language-current');
      currentBtn?.addEventListener('click', () => switcher.classList.toggle('open'));
      switcher.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => { apply(btn.dataset.lang); switcher.classList.remove('open'); }));
    });
    apply(current);
  });
})();
