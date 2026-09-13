/*
 * Connect all source-based lesson packs to the existing course engine.
 * Dedicated SQL/framework packs remain authoritative; multi-language packs
 * enrich the remaining language tracks without replacing their full syllabus.
 */
(function(){
  'use strict';
  const source = window.MOUSSA_SOURCE_LESSONS;
  const multi = window.MOUSSA_MULTILANG_SOURCE_LESSONS;
  const content = window.MOUSSA_COURSE_CONTENT;
  if(!content || typeof content.build !== 'function') return;

  const originalBuild = content.build.bind(content);

  content.build = function(course, key){
    const baseLessons = originalBuild(course, key) || [];
    const primary = source && typeof source.build === 'function'
      ? (source.build({...course, key:key || course?.key}) || []) : [];
    const secondary = multi && typeof multi.build === 'function'
      ? (multi.build({...course, key:key || course?.key}) || []) : [];

    const sourceLessons = [...primary, ...secondary];
    if(!sourceLessons.length) return baseLessons;

    /* The first pack wins. This keeps the detailed SQL/framework lessons
       ahead of the smaller multi-language enrichment packs. */
    const sourceByTitle = new Map();
    sourceLessons.forEach(lesson => {
      if(!sourceByTitle.has(lesson.title)) sourceByTitle.set(lesson.title, lesson);
    });

    const merged = baseLessons.map(lesson => sourceByTitle.has(lesson.title)
      ? {...lesson, ...sourceByTitle.get(lesson.title), sourcePack:true}
      : lesson
    );

    const existing = new Set(baseLessons.map(lesson => lesson.title));
    sourceLessons.forEach(lesson => {
      if(!existing.has(lesson.title) && !merged.some(x => x.title === lesson.title))
        merged.push({...lesson, sourcePack:true});
    });

    return merged;
  };
})();
