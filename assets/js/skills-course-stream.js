(() => {
  'use strict';

  const showcase = document.querySelector('#skills-course-stream');
  const stream = showcase?.querySelector('#skills-stream');
  const track = showcase?.querySelector('#skills-track');
  const firstSet = track?.querySelector('.skills-card-set');
  const canvas = showcase?.querySelector('.skills-particles');

  if (!showcase || !stream || !track || !firstSet || !canvas) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  const secondSet = firstSet.cloneNode(true);
  secondSet.setAttribute('aria-hidden', 'true');
  secondSet.inert = true;
  track.append(secondSet);
  const cardSets = [firstSet, secondSet];

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scanner = showcase.querySelector('.skills-scanner');
  const previousCenters = new WeakMap();
  const codeRain = [];
  const snippets = {
    'skills-card--python': 'def class import pandas return lambda async await',
    'skills-card--desktop': 'import tkinter as tk class App tk Button mainloop',
    'skills-card--web': 'const function document html css display flex',
    'skills-card--sql': 'SELECT FROM JOIN WHERE GROUP BY CREATE TABLE',
    'skills-card--dotnet': 'using System public class async Task return',
    'skills-card--aspnet': 'using Microsoft ASP.NET MapGet HttpContext',
    'skills-card--blazor': '<Component> Inject RouteParameter @bind',
    'skills-card--maui': 'using Microsoft Maui Grid Button Shell',
    'skills-card--php': '<?php function class echo return $request',
    'skills-card--typescript': 'type interface const function Promise async',
    'skills-card--c': '#include <stdio.h> int main printf return',
    'skills-card--cpp': '#include <iostream> template class std vector',
    'skills-card--java': 'public class static void main System.out',
    'skills-card--go': 'package main func go chan context return',
    'skills-card--rust': 'fn main let mut impl trait match Result',
    'skills-card--kotlin': 'fun main val data class suspend when',
    'skills-card--swift': 'import Swift struct let async await protocol'
  };

  let progress = 0;
  let visible = true;
  let lastFrame = 0;
  let frameId = 0;
  let accessibleSet = null;

  function loopDistance() {
    const trackGap = parseFloat(getComputedStyle(track).gap) || 0;
    return firstSet.getBoundingClientRect().width + trackGap;
  }

  function resizeCanvas() {
    const rect = stream.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * pixelRatio));
    const height = Math.max(1, Math.round(rect.height * pixelRatio));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    return { width, height, pixelRatio };
  }

  function spawnCodeRain(card, streamRect) {
    const rect = card.getBoundingClientRect();
    const words = snippets[Object.keys(snippets).find(className => card.classList.contains(className))]
      || 'class function return value';
    const characters = `${words} 01 {} [] => ; .`;
    const columns = Math.max(12, Math.min(24, Math.round(rect.width / 13)));
    const rows = 16;
    const xStart = rect.left - streamRect.left;
    const yStart = rect.top - streamRect.top;

    for (let column = 0; column < columns; column++) {
      const x = xStart + (column / (columns - 1)) * rect.width;
      for (let row = 0; row < rows; row++) {
        const startY = yStart - row * 13;
        if (startY < -24) continue;
        codeRain.push({
          x: x + (Math.random() - 0.5) * 5,
          y: startY,
          char: characters[Math.floor(Math.random() * characters.length)],
          speed: 95 + Math.random() * 140,
          size: 10 + Math.random() * 3,
          age: 0,
          lifetime: 1.2 + Math.random() * 1.35,
          color: Math.random() < 0.18 ? '#c5bfff' : '#91f5bf'
        });
      }
    }
  }

  function drawCodeRain(delta, dimensions) {
    const { width, height, pixelRatio } = dimensions;
    context.clearRect(0, 0, width, height);
    context.textBaseline = 'middle';

    for (let i = codeRain.length - 1; i >= 0; i--) {
      const drop = codeRain[i];
      drop.age += delta;
      drop.y += drop.speed * delta;

      if (drop.age >= drop.lifetime || drop.y > height / pixelRatio + 20) {
        codeRain.splice(i, 1);
        continue;
      }

      const fade = Math.min(1, (drop.lifetime - drop.age) * 1.7);
      context.globalAlpha = fade * 0.9;
      context.fillStyle = drop.color;
      context.font = `${drop.size}px "JetBrains Mono", monospace`;
      context.fillText(drop.char, drop.x * pixelRatio, drop.y * pixelRatio);
    }
    context.globalAlpha = 1;
  }

  function updateAccessibleSet() {
    const focusedSet = cardSets.find(set => set.contains(document.activeElement));
    let preferredSet = focusedSet;

    if (!preferredSet) {
      const streamRect = stream.getBoundingClientRect();
      let largestVisibleArea = 0;

      cardSets.forEach(set => {
        const rect = set.getBoundingClientRect();
        const visibleArea = Math.max(0, Math.min(rect.right, streamRect.right) - Math.max(rect.left, streamRect.left));
        if (visibleArea > largestVisibleArea) {
          largestVisibleArea = visibleArea;
          preferredSet = set;
        }
      });
    }

    if (preferredSet === accessibleSet) return;
    accessibleSet = preferredSet;
    cardSets.forEach(set => {
      const isAccessible = set === accessibleSet;
      set.setAttribute('aria-hidden', String(!isAccessible));
      set.inert = !isAccessible;
    });
  }

  function scanCards(didWrap) {
    if (!scanner) return;
    const streamRect = stream.getBoundingClientRect();
    const scannerX = scanner.getBoundingClientRect().left - streamRect.left + scanner.offsetWidth / 2;

    track.querySelectorAll('.skills-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left - streamRect.left + rect.width / 2;
      const previousX = previousCenters.get(card);

      if (!didWrap && previousX !== undefined && previousX < scannerX && centerX >= scannerX) {
        card.classList.add('has-transformed');
        spawnCodeRain(card, streamRect);
      }
      previousCenters.set(card, centerX);
    });
  }

  function animate(timestamp) {
    frameId = 0;
    if (motionPreference.matches) {
      resetForReducedMotion();
      return;
    }
    if (!visible || document.hidden) return;

    const delta = lastFrame ? Math.min((timestamp - lastFrame) / 1000, 0.05) : 0;
    lastFrame = timestamp;
    const distance = loopDistance();
    let didWrap = false;
    progress += 120 * delta;
    if (distance && progress >= distance) {
      progress %= distance;
      didWrap = true;
      track.querySelectorAll('.has-transformed').forEach(card => card.classList.remove('has-transformed'));
    }

    track.style.transform = `translate3d(${progress - distance}px, 0, 0)`;
    updateAccessibleSet();
    scanCards(didWrap);
    drawCodeRain(delta, resizeCanvas());
    frameId = window.requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (!visible || document.hidden || motionPreference.matches || frameId) return;
    lastFrame = 0;
    frameId = window.requestAnimationFrame(animate);
  }

  function stopAnimation() {
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
    lastFrame = 0;
  }

  track.addEventListener('focusin', () => {
    stopAnimation();
    updateAccessibleSet();
  });
  track.addEventListener('focusout', event => {
    if (!track.contains(event.relatedTarget)) startAnimation();
  });

  function resetForReducedMotion() {
    stopAnimation();
    progress = 0;
    track.style.transform = 'none';
    track.querySelectorAll('.has-transformed').forEach(card => card.classList.remove('has-transformed'));
    codeRain.length = 0;
    updateAccessibleSet();
    const { width, height } = resizeCanvas();
    context.clearRect(0, 0, width, height);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startAnimation();
      else stopAnimation();
    }).observe(showcase);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAnimation();
    else startAnimation();
  });

  motionPreference.addEventListener?.('change', event => {
    if (event.matches) {
      resetForReducedMotion();
    } else {
      startAnimation();
    }
  });

  window.addEventListener('resize', () => {
    drawCodeRain(0, resizeCanvas());
    updateAccessibleSet();
  });

  resizeCanvas();
  track.style.transform = `translate3d(${-loopDistance()}px, 0, 0)`;
  updateAccessibleSet();
  startAnimation();
})();
