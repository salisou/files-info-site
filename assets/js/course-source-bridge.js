/* Connect source-based lesson packs to the existing course engine. */
(function(){
  'use strict';
  const source = window.MOUSSA_SOURCE_LESSONS;
  const content = window.MOUSSA_COURSE_CONTENT;
  if(!source || typeof source.build !== 'function' || !content || typeof content.build !== 'function') return;
  const originalBuild = content.build.bind(content);
  content.build = function(course, key){
    const sourceLessons = source.build({...course, key: key || course?.key});
    return sourceLessons && sourceLessons.length ? sourceLessons : originalBuild(course, key);
  };
})();
