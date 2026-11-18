const projectNavigation = document.querySelector('#project-index');
const projectLinks = [...projectNavigation.querySelectorAll('a')];
const projects = projectLinks.map(link => document.getElementById(link.hash.slice(1)));
const caseControls = document.querySelector('.case-controls');
const caseLinks = [...caseControls.querySelectorAll('a')];
const caseNumber = caseControls.querySelector('[data-project-number]');
let activeProject;

function showProject(hash, animate = false) {
  const requestedIndex = projectLinks.findIndex(link => link.hash === hash);
  const selectedIndex = requestedIndex === -1 ? 0 : requestedIndex;

  projectLinks.forEach((link, index) => {
    const active = index === selectedIndex;
    projects[index].hidden = !active;
    if (active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });

  caseLinks.forEach(link => {
    const step = Number(link.dataset.projectStep);
    const index = (selectedIndex + step + projects.length) % projects.length;
    link.href = projectLinks[index].hash;
    link.querySelector('strong').textContent = projects[index].querySelector('h3').textContent;
  });
  caseNumber.textContent = selectedIndex + 1;

  const selectedProject = projects[selectedIndex];
  projects.forEach(project => project.classList.remove('case-enter'));
  if (animate && selectedProject !== activeProject) selectedProject.classList.add('case-enter');
  activeProject = selectedProject;
  return selectedProject;
}

function revealProject(project) {
  project.querySelector('h3').focus({ preventScroll: true });
  const top = project.getBoundingClientRect().top;
  if (top < 0 || top > window.innerHeight * 0.75) {
    caseControls.scrollIntoView({ block: 'start' });
  }
}

function isPlainClick(event) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

showProject(window.location.hash);
projectNavigation.classList.add('is-enhanced');
caseControls.hidden = false;

[...projectLinks, ...caseLinks].forEach(link => {
  link.addEventListener('click', event => {
    if (!isPlainClick(event)) return;

    event.preventDefault();
    if (window.location.hash !== link.hash) history.pushState(null, '', link.hash);
    revealProject(showProject(link.hash, true));
  });
});

window.addEventListener('hashchange', () => {
  if (projectLinks.some(link => link.hash === window.location.hash)) {
    const project = showProject(window.location.hash, true);
    if (project.getBoundingClientRect().top >= window.innerHeight) {
      caseControls.scrollIntoView({ block: 'start' });
    }
  } else if (!window.location.hash) {
    showProject(window.location.hash);
  }
});

const indexReturn = document.querySelector('.index-return');
indexReturn.addEventListener('click', event => {
  if (!isPlainClick(event)) return;

  event.preventDefault();
  projectNavigation.querySelector('[aria-current]')?.focus({ preventScroll: true });
  projectNavigation.scrollIntoView({ block: 'start' });
});

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

const portrait = document.querySelector('.portrait img');
if (portrait) {
  const hideUnavailablePortrait = () => { portrait.closest('.portrait').hidden = true; };
  portrait.addEventListener('error', hideUnavailablePortrait);
  if (portrait.complete && portrait.naturalWidth === 0) hideUnavailablePortrait();
}

const skills = document.querySelector('.skills-list');
const duplicateSkills = skills.cloneNode(true);
duplicateSkills.classList.add('skills-copy');
duplicateSkills.setAttribute('aria-hidden', 'true');
skills.after(duplicateSkills);

const page = document.documentElement;
const motionButton = document.querySelector('.motion-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = false;

function updateMotion() {
  page.classList.toggle('motion-enabled', !reducedMotion.matches);
  page.classList.toggle('motion-paused', motionPaused);
  motionButton.disabled = reducedMotion.matches;
  motionButton.textContent = reducedMotion.matches ? 'Motion off · device setting' : (motionPaused ? 'Resume motion' : 'Pause motion');
  if (motionPaused || reducedMotion.matches) {
    page.classList.remove('hero-enter');
    projects.forEach(project => project.classList.remove('case-enter'));
  }
}

motionButton.addEventListener('click', () => {
  motionPaused = !motionPaused;
  updateMotion();
});
reducedMotion.addEventListener('change', updateMotion);
if (!reducedMotion.matches) page.classList.add('hero-enter');
updateMotion();
motionButton.hidden = false;
