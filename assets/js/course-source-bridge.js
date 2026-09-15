/*
 * Connect all source-based lesson packs to the existing course engine.
 * Dedicated complete blueprints are authoritative; source packs enrich
 * the remaining courses without replacing their full syllabi.
 */
(function(){
  'use strict';
  const source = window.MOUSSA_SOURCE_LESSONS;
  const multi = window.MOUSSA_MULTILANG_SOURCE_LESSONS;
  const blueprint = window.MOUSSA_TKINTER_BLUEPRINT;
  const content = window.MOUSSA_COURSE_CONTENT;
  if(!content || typeof content.build !== 'function') return;

  const originalBuild = content.build.bind(content);

  content.build = function(course, key){
    const resolvedKey = key || course?.key;

    /* The old complete Tkinter course is our quality reference:
       15 structured lessons, practical projects, many quizzes and
       progressively deeper GUI/database topics. */
    if(resolvedKey === 'tkinter' && blueprint && Array.isArray(blueprint.lessons)){
      return blueprint.lessons.map(lesson => ({...lesson, blueprint:true}));
    }

    const baseLessons = originalBuild(course, key) || [];
    const primary = source && typeof source.build === 'function'
      ? (source.build({...course, key:resolvedKey}) || []) : [];
    const secondary = multi && typeof multi.build === 'function'
      ? (multi.build({...course, key:resolvedKey}) || []) : [];

    const sourceLessons = [...primary, ...secondary];
    if(!sourceLessons.length) return baseLessons;

    /* The first pack wins. This keeps detailed dedicated lessons
       ahead of smaller multi-language enrichment packs. */
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
