(function(){
  'use strict';

  const blueprint = window.MOUSSA_TKINTER_BLUEPRINT;
  if(!blueprint || !Array.isArray(blueprint.lessons)) return;

  function escapeHtml(value){
    return String(value ?? '').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c] || c));
  }

  function isTkinter(){
    return location.pathname.toLowerCase().includes('/corso_tkinter');
  }

  function sync(){
    if(!isTkinter()) return;

    const raw = Number(localStorage.getItem('course:tkinter:current') || 0);
    const index = Number.isInteger(raw) && raw >= 0 && raw < blueprint.lessons.length ? raw : 0;
    const lesson = blueprint.lessons[index];
    const main = document.querySelector('main#lesson');
    if(!main || !lesson) return;

    const exerciseBox = main.querySelector('.exercise');
    if(exerciseBox && Array.isArray(lesson.exercises)){
      const list = exerciseBox.querySelector('ol');
      if(list){
        list.innerHTML = lesson.exercises.map(item => `<li><strong>${escapeHtml(item.title || 'Esercizio')}</strong><p>${escapeHtml(item.text || '')}</p></li>`).join('');
      }
      exerciseBox.dataset.blueprintIndex = String(index);
    }

    const solution = main.querySelector('.solution pre code');
    if(solution && lesson.solution){
      solution.textContent = lesson.solution;
    }

    const challenge = main.querySelector('.challenge');
    if(challenge && lesson.challenge){
      const paragraph = challenge.querySelector('p');
      if(paragraph) paragraph.textContent = lesson.challenge;
    }

    const mistakes = main.querySelector('.mistakes ul');
    if(mistakes && Array.isArray(lesson.mistakes)){
      mistakes.innerHTML = lesson.mistakes.map(item => `<li>${escapeHtml(item)}</li>`).join('');
    }

    const status = main.querySelector('.lesson-status');
    if(status) status.setAttribute('data-blueprint','tkinter-complete');
  }

  const observer = new MutationObserver(sync);
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('storage',sync);
  setTimeout(sync,100);
  setTimeout(sync,600);
})();
