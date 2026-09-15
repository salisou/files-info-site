/* Use the WebTkinter reference lessons only for the Tkinter course. */
(function(){
  'use strict';
  const content=window.MOUSSA_COURSE_CONTENT;
  const reference=window.MOUSSA_TKINTER_REFERENCE;
  if(!content || typeof content.build!=='function' || !reference || !Array.isArray(reference.lessons)) return;
  const original=content.build.bind(content);
  content.build=function(course,key){
    const resolved=key || course?.key;
    if(resolved==='tkinter') return reference.lessons.map(x=>({...x,referencePack:true}));
    return original(course,key);
  };
})();
