function initCaseReader() {
  const reader = document.querySelector('.case-reader');
  if (typeof reader.showModal !== 'function') return;

  const inlineCases = document.querySelector('.inline-cases');
  const body = reader.querySelector('.reader-body');
  const cases = [...document.querySelectorAll('.project-tile')].map(launcher => {
    const article = document.getElementById(launcher.hash.slice(1));
    const heading = document.getElementById(article.getAttribute('aria-labelledby'));
    const slot = document.createComment('');
    article.before(slot);
    return { hash: launcher.hash, launcher, article, heading, slot };
  });
  let activeCase;
  let openingTile;
  let pendingDismissal = false;
  let historyFrame = 0;

  function restoreTile(launcher) {
    requestAnimationFrame(() => {
      if (reader.open || cases.some(project => project.hash === location.hash)) return;
      launcher.scrollIntoView({ block: 'nearest' });
      launcher.focus({ preventScroll: true });
    });
  }

  function syncReader() {
    const nextCase = cases.find(project => project.hash === location.hash);
    const marker = history.state?.portfolioOpeningTile;
    const nextOpeningTile = cases.find(project => project.launcher.id === marker)?.launcher;
    if (nextCase === activeCase) {
      openingTile = nextOpeningTile;
      return;
    }

    if (activeCase) activeCase.slot.after(activeCase.article);
    if (!nextCase) {
      const launcher = openingTile ?? activeCase.launcher;
      activeCase = undefined;
      openingTile = undefined;
      pendingDismissal = false;
      reader.close();
      restoreTile(launcher);
      return;
    }

    activeCase = nextCase;
    openingTile = nextOpeningTile;
    pendingDismissal = false;
    body.append(activeCase.article);
    reader.setAttribute('aria-labelledby', activeCase.heading.id);
    if (!reader.open) reader.showModal();
    body.scrollTop = 0;
    activeCase.heading.focus({ preventScroll: true });
  }

  function dismissReader() {
    if (pendingDismissal) return;
    if (openingTile) {
      pendingDismissal = true;
      history.back();
      return;
    }
    history.replaceState(history.state, '', '#projects');
    syncReader();
  }

  for (const project of cases) {
    project.launcher.setAttribute('aria-haspopup', 'dialog');
    project.launcher.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      history.pushState({ portfolioOpeningTile: project.launcher.id }, '', project.hash);
      syncReader();
    });
  }

  for (const button of reader.querySelectorAll('[data-project-step]')) {
    const step = Number(button.dataset.projectStep);
    button.addEventListener('click', () => {
      if (pendingDismissal) return;
      const index = cases.indexOf(activeCase);
      const nextCase = cases[(index + step + cases.length) % cases.length];
      history.replaceState(history.state, '', nextCase.hash);
      syncReader();
    });
  }

  reader.querySelector('.reader-close').addEventListener('click', dismissReader);
  reader.addEventListener('cancel', event => {
    event.preventDefault();
    dismissReader();
  });

  function queueHistorySync() {
    if (historyFrame) return;
    historyFrame = requestAnimationFrame(() => {
      historyFrame = 0;
      syncReader();
    });
  }

  window.addEventListener('popstate', queueHistorySync);
  window.addEventListener('hashchange', queueHistorySync);
  inlineCases.hidden = true;
  syncReader();
}

function initExtraction() {
  const demo = document.querySelector('.extraction-demo');
  const sourceText = demo.querySelector('textarea');
  const extractedText = demo.querySelector('output');
  demo.querySelector('button').addEventListener('click', () => {
    const cleaned = sourceText.value.replace(/\s+/g, ' ').trim();
    extractedText.textContent = cleaned
      ? cleaned.split(/(?<=[.!?])\s+/).slice(0, 2).join(' ')
      : 'Enter some text to extract the first two sentences.';
  });
  demo.hidden = false;
  document.querySelector('.example').hidden = true;
}

function initTheme() {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  const preference = matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : preference.matches;
  const updateButton = () => button.setAttribute('aria-pressed', String(isDark()));

  button.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try {
      localStorage.setItem('portfolio-theme', root.dataset.theme);
    } catch {}
    updateButton();
    root.dispatchEvent(new Event('portfolio-theme-change'));
  });
  preference.addEventListener('change', updateButton);
  updateButton();
  button.hidden = false;
}

function traceContours(context, width, height, centerX, centerY, aspect, time) {
  const contourInterval = .038;
  const columns = Math.ceil(width / 18);
  const rows = Math.ceil(height / 18);
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  const stride = columns + 1;
  const samples = new Float32Array(stride * (rows + 1));

  for (let row = 0; row <= rows; row++) {
    for (let column = 0; column <= columns; column++) {
      const x = (column / columns - centerX) * aspect;
      const y = row / rows - centerY;
      const foldedX = x + .11 * Math.sin(y * 7.5 + time + 1.3);
      const foldedY = y + .085 * Math.sin(x * 8 - time + 2.1);
      samples[row * stride + column] = Math.hypot(foldedX, foldedY * .84);
    }
  }

  context.beginPath();
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const index = row * stride + column;
      const topLeft = samples[index];
      const topRight = samples[index + 1];
      const bottomLeft = samples[index + stride];
      const bottomRight = samples[index + stride + 1];
      const minimum = Math.min(topLeft, topRight, bottomLeft, bottomRight);
      const maximum = Math.max(topLeft, topRight, bottomLeft, bottomRight);
      const x = column * cellWidth;
      const y = row * cellHeight;

      // Interpolate crossings on a shared grid so adjacent cells meet at the same point.
      for (let level = Math.max(5, Math.floor(minimum / contourInterval) + 1); level * contourInterval <= maximum; level++) {
        const threshold = level * contourInterval;
        const crossings = [];
        if ((topLeft >= threshold) !== (topRight >= threshold)) {
          crossings.push([x + cellWidth * (threshold - topLeft) / (topRight - topLeft), y]);
        }
        if ((topRight >= threshold) !== (bottomRight >= threshold)) {
          crossings.push([x + cellWidth, y + cellHeight * (threshold - topRight) / (bottomRight - topRight)]);
        }
        if ((bottomLeft >= threshold) !== (bottomRight >= threshold)) {
          crossings.push([x + cellWidth * (threshold - bottomLeft) / (bottomRight - bottomLeft), y + cellHeight]);
        }
        if ((topLeft >= threshold) !== (bottomLeft >= threshold)) {
          crossings.push([x, y + cellHeight * (threshold - topLeft) / (bottomLeft - topLeft)]);
        }
        if (crossings.length === 4) {
          const center = (topLeft + topRight + bottomLeft + bottomRight) / 4;
          if ((center >= threshold) !== (topLeft >= threshold)) crossings.push(crossings.shift());
        }
        for (let edge = 0; edge < crossings.length; edge += 2) {
          context.moveTo(...crossings[edge]);
          context.lineTo(...crossings[edge + 1]);
        }
      }
    }
  }
  context.stroke();
}

function initContours() {
  const hero = document.querySelector('.hero');
  const canvas = hero.querySelector('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;

  const button = hero.querySelector('.motion-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const colorPreference = matchMedia('(prefers-color-scheme: dark)');
  const finePointer = matchMedia('(any-pointer: fine)');
  const portraitBelowCopy = matchMedia('(max-width: 39rem)');
  let playing = !reducedMotion.matches;
  let motionChoice;
  let inView = false;
  let frame = null;
  let lastDraw = null;
  let time = 0;
  let width = 0;
  let height = 0;
  const pointer = { x: 0, y: 0 };
  const offset = { x: 0, y: 0 };

  function draw() {
    if (!width || !height) return;
    const narrow = portraitBelowCopy.matches;
    const centerX = (narrow ? .62 : .69) + offset.x + .025 * Math.sin(time * .83);
    const centerY = (narrow ? .71 : .38) + offset.y + .027 * Math.sin(time);
    const aspect = Math.min(2.1, Math.max(.82, width / height));
    context.clearRect(0, 0, width, height);
    traceContours(context, width, height, centerX, centerY, aspect, time);
  }

  function applyColor() {
    context.strokeStyle = getComputedStyle(canvas).color;
    draw();
  }

  function resize() {
    const bounds = hero.getBoundingClientRect();
    const cssWidth = Math.round(bounds.width);
    const cssHeight = Math.round(bounds.height);
    if (!cssWidth || !cssHeight) return;
    const scale = Math.min(2, window.devicePixelRatio || 1, 2048 / Math.max(cssWidth, cssHeight));
    canvas.width = Math.round(cssWidth * scale);
    canvas.height = Math.round(cssHeight * scale);
    width = Math.min(cssWidth, 1440);
    height = Math.min(cssHeight, 1000);
    context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    context.lineWidth = 1.15;
    applyColor();
  }

  function animate(now) {
    const elapsed = lastDraw === null ? 0 : now - lastDraw;
    if (lastDraw === null || elapsed >= 1000 / 30) {
      lastDraw = now;
      time += Math.min(elapsed, 60) * .0004;
      offset.x += (pointer.x - offset.x) * .075;
      offset.y += (pointer.y - offset.y) * .075;
      draw();
    }
    frame = requestAnimationFrame(animate);
  }

  function syncAnimation() {
    if (playing && inView && !document.hidden) {
      if (frame === null) frame = requestAnimationFrame(animate);
    } else if (frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
      lastDraw = null;
    }
  }

  function setPlaying(value) {
    playing = value;
    button.textContent = playing ? 'Pause motion' : 'Play motion';
    syncAnimation();
  }

  function resetPointer() {
    pointer.x = 0;
    pointer.y = 0;
  }

  hero.addEventListener('pointermove', event => {
    if (!playing || !finePointer.matches || event.pointerType === 'touch') return;
    const bounds = hero.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width - .5) * .13;
    pointer.y = ((event.clientY - bounds.top) / bounds.height - .5) * .11;
  }, { passive: true });
  hero.addEventListener('pointerleave', resetPointer);
  button.addEventListener('click', () => {
    if (playing) resetPointer();
    motionChoice = !playing;
    setPlaying(motionChoice);
  });
  reducedMotion.addEventListener('change', () => {
    resetPointer();
    setPlaying(!reducedMotion.matches && motionChoice !== false);
  });
  colorPreference.addEventListener('change', applyColor);
  document.documentElement.addEventListener('portfolio-theme-change', applyColor);
  document.addEventListener('visibilitychange', syncAnimation);
  window.addEventListener('resize', resize);
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (!inView) resetPointer();
    syncAnimation();
  }).observe(hero);
  setPlaying(playing);
  button.hidden = false;
  resize();
}

const portrait = document.querySelector('.portrait img');
const hideUnavailablePortrait = () => { portrait.closest('.portrait').hidden = true; };
portrait.addEventListener('error', hideUnavailablePortrait);
if (portrait.complete && portrait.naturalWidth === 0) hideUnavailablePortrait();

initExtraction();
initCaseReader();
initTheme();
initContours();
