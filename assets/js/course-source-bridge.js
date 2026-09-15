/*
 * Connect source-based lesson packs to the existing course engine.
 * Dedicated reference packs are authoritative for their course while
 * the existing syllabus remains the structural source of truth.
 */
(function(){
  'use strict';
  const source = window.MOUSSA_SOURCE_LESSONS;
  const multi = window.MOUSSA_MULTILANG_SOURCE_LESSONS;
  const sqlsh = window.MOUSSA_SQLSH_REFERENCE;
  const sqlComplete = window.MOUSSA_SQL_COMPLETE;
  const blueprint = window.MOUSSA_TKINTER_BLUEPRINT;
  const content = window.MOUSSA_COURSE_CONTENT;
  if(!content || typeof content.build !== 'function') return;

  const originalBuild = content.build.bind(content);

  content.build = function(course, key){
    const resolvedKey = key || course?.key;

    if(resolvedKey === 'tkinter' && blueprint && Array.isArray(blueprint.lessons)){
      return blueprint.lessons.map(lesson => ({...lesson, blueprint:true}));
    }

    const baseLessons = originalBuild(course, key) || [];

    /* SQL uses the complete original teaching pack first. It keeps the
       existing Italian UI, exercises, editor and quiz flow. */
    if(resolvedKey === 'sql' && sqlComplete && Array.isArray(sqlComplete.lessons)){
      const byTitle = new Map(sqlComplete.lessons.map(lesson => [lesson.title, lesson]));
      const merged = baseLessons.map(lesson => byTitle.has(lesson.title)
        ? {...lesson, ...byTitle.get(lesson.title), sourcePack:'sql.sh-complete'}
        : lesson
      );
      const existing = new Set(merged.map(lesson => lesson.title));
      sqlComplete.lessons.forEach(lesson => {
        if(!existing.has(lesson.title)) merged.push({...lesson, sourcePack:'sql.sh-complete'});
      });
      return merged;
    }

    /* Legacy SQL adaptation retained as fallback. */
    if(resolvedKey === 'sql' && sqlsh && Array.isArray(sqlsh.lessons)){
      const byTitle = new Map(sqlsh.lessons.map(lesson => [lesson.title, lesson]));
      return baseLessons.map(lesson => byTitle.has(lesson.title)
        ? {...lesson, ...byTitle.get(lesson.title), sourcePack:'sql.sh'}
        : lesson
      );
    }

    const primary = source && typeof source.build === 'function'
      ? (source.build({...course, key:resolvedKey}) || []) : [];
    const secondary = multi && typeof multi.build === 'function'
      ? (multi.build({...course, key:resolvedKey}) || []) : [];

    const sourceLessons = [...primary, ...secondary];
    if(!sourceLessons.length) return baseLessons;

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
