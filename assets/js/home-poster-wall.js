(() => {
  'use strict';

  const hero = document.querySelector('.modern-hero');
  if (!hero || hero.querySelector('.hero-poster-wall')) return;

  const technologies = {
    python: { name: 'Python', category: 'DATA · AUTOMATION', icon: 'python-original.svg', note: 'Build · analyse · automate' },
    tkinter: { name: 'Tkinter', category: 'DESKTOP · GUI', icon: 'python-original.svg', note: 'Desktop applications' },
    html: { name: 'HTML + CSS', category: 'WEB · DESIGN', icon: 'html5-original.svg', note: 'Structure · style · access' },
    javascript: { name: 'JavaScript', category: 'WEB · INTERACTIVE', icon: 'javascript-original.svg', note: 'Interfaces · experiences' },
    typescript: { name: 'TypeScript', category: 'WEB · TYPES', icon: 'typescript-original.svg', note: 'Typed · scalable · robust' },
    sql: { name: 'SQL Server', category: 'DATABASE · T-SQL', icon: 'microsoftsqlserver-plain.svg', note: 'Query · model · manage' },
    csharp: { name: 'C# / .NET', category: 'SOFTWARE · APPS', icon: 'csharp-original.svg', note: 'Desktop · cloud · APIs' },
    aspnet: { name: 'ASP.NET Core', category: 'BACKEND · API', icon: 'dotnetcore-original.svg', note: 'Services · web · cloud' },
    blazor: { name: 'Blazor', category: 'WEB · .NET', icon: 'blazor-original.svg', note: 'Components · applications' },
    maui: { name: '.NET MAUI', category: 'CROSS-PLATFORM', icon: 'dotnetcore-original.svg', note: 'One codebase · many devices' },
    php: { name: 'PHP', category: 'BACKEND · WEB', icon: 'php-original.svg', note: 'Services · APIs · web' },
    c: { name: 'C', category: 'SYSTEMS · MEMORY', icon: 'c-original.svg', note: 'Pointers · systems · memory' },
    cpp: { name: 'C++', category: 'SYSTEMS · SOFTWARE', icon: 'cplusplus-original.svg', note: 'Modern C++ · STL · OOP' },
    java: { name: 'Java', category: 'SOFTWARE · JVM', icon: 'java-original.svg', note: 'Applications · services · JVM' },
    go: { name: 'Go', category: 'BACKEND · CLOUD', icon: 'go-original.svg', note: 'APIs · services · concurrency' },
    rust: { name: 'Rust', category: 'SYSTEMS · SAFETY', icon: 'rust-original.svg', note: 'Ownership · speed · safety' },
    kotlin: { name: 'Kotlin', category: 'APP · JVM', icon: 'kotlin-original.svg', note: 'Modern · concise · safe' },
    swift: { name: 'Swift', category: 'APP · APPLE', icon: 'swift-original.svg', note: 'Apps · Apple platforms · Swift' }
  };

  const columns = [
    ['python', 'sql', 'typescript', 'csharp', 'java', 'rust'],
    ['blazor', 'javascript', 'maui', 'python', 'tkinter', 'go'],
    ['sql', 'csharp', 'php', 'javascript', 'cpp', 'swift'],
    ['html', 'python', 'maui', 'sql', 'aspnet', 'kotlin'],
    ['php', 'blazor', 'tkinter', 'html', 'javascript', 'c'],
    ['maui', 'sql', 'python', 'php', 'csharp', 'typescript']
  ];

  function createPoster(id, index) {
    const technology = technologies[id];
    const poster = document.createElement('div');
    poster.className = `tech-poster tech-poster--${id}`;

    const meta = document.createElement('div');
    meta.className = 'poster-meta';

    const number = document.createElement('span');
    number.textContent = `MS / ${String(index + 1).padStart(2, '0')}`;
    const mark = document.createElement('span');
    mark.textContent = '</>';
    meta.append(number, mark);

    const emblem = document.createElement('div');
    emblem.className = 'poster-emblem';
    const image = document.createElement('img');
    image.src = `/assets/images/languages/${technology.icon}`;
    image.alt = '';
    image.width = 48;
    image.height = 48;
    image.decoding = 'async';
    emblem.append(image);

    const copy = document.createElement('div');
    copy.className = 'poster-copy';
    const category = document.createElement('span');
    category.className = 'poster-category';
    category.textContent = technology.category;
    const name = document.createElement('span');
    name.className = 'poster-title';
    name.textContent = technology.name;
    const note = document.createElement('span');
    note.className = 'poster-note';
    note.textContent = technology.note;
    copy.append(category, name, note);

    poster.append(meta, emblem, copy);
    return poster;
  }

  const wall = document.createElement('div');
  wall.className = 'hero-poster-wall';
  wall.setAttribute('aria-hidden', 'true');

  columns.forEach((items, columnIndex) => {
    const column = document.createElement('div');
    column.className = 'poster-column';
    const track = document.createElement('div');
    track.className = 'poster-track';

    [items, items].forEach((set, setIndex) => {
      const stack = document.createElement('div');
      stack.className = 'poster-stack';
      set.forEach((id, posterIndex) => {
        stack.append(createPoster(id, columnIndex * items.length + posterIndex + 1));
      });
      track.append(stack);
    });

    column.append(track);
    wall.append(column);
  });

  hero.classList.add('modern-hero--posters');
  hero.insertBefore(wall, hero.firstChild);
  hero.querySelector('.hero-visual')?.remove();
})();
