/* Connect source-based lesson packs to the existing course engine. */
(function(){
  'use strict';
  const source = window.MOUSSA_SOURCE_LESSONS;
  const content = window.MOUSSA_COURSE_CONTENT;
  if(!source || typeof source.build !== 'function' || !content || typeof content.build !== 'function') return;

  const originalBuild = content.build.bind(content);

  content.build = function(course, key){
    const baseLessons = originalBuild(course, key) || [];
    const sourceLessons = source.build({...course, key: key || course?.key}) || [];
    if(!sourceLessons.length) return baseLessons;

    const sourceByTitle = new Map(sourceLessons.map(lesson => [lesson.title, lesson]));
    const merged = baseLessons.map(lesson => sourceByTitle.has(lesson.title)
      ? {...lesson, ...sourceByTitle.get(lesson.title), sourcePack:true}
      : lesson
    );

    const existing = new Set(baseLessons.map(lesson => lesson.title));
    sourceLessons.forEach(lesson => {
      if(!existing.has(lesson.title)) merged.push({...lesson, sourcePack:true});
    });

    return merged;
  };
})();
