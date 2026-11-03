import { profile, projects, skillGroups, credentials } from './content.js';

const $ = (selector, root = document) => root.querySelector(selector);
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

function projectVisual(project) {
  const visuals = {
    deployment: `<div class="visual visual-deploy" aria-hidden="true"><div class="visual-top"><span>RELEASE PIPELINE</span><span>01 / 03</span></div><div class="pipeline"><div class="pipeline-node"><i>01</i><b>BUILD</b><small>GitHub Actions</small></div><span class="pipeline-line"></span><div class="pipeline-node"><i>02</i><b>CONTAINERS</b><small>Docker</small></div><span class="pipeline-line"></span><div class="pipeline-node active-node"><i>03</i><b>ROUTE</b><small>Nginx</small></div></div><div class="env-switch"><span class="env env-active">BLUE <small>ACTIVE</small></span><span class="env">GREEN <small>STANDBY</small></span></div><div class="visual-caption">A CONTROLLED PATH FROM COMMIT TO RELEASE</div></div>`,
    sentiment: `<div class="visual visual-sentiment" aria-hidden="true"><div class="visual-top"><span>TEXT CLASSIFICATION</span><span>02 / 03</span></div><div class="sentiment-flow"><div class="text-sample">“Building something useful feels good.”</div><span class="flow-arrow">↓</span><div class="token-row"><b>building</b><b>useful</b><b>good</b></div><span class="flow-arrow">↓</span><div class="vector-row"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="model-chip"><span>TF–IDF</span><span>→</span><strong>MODEL</strong><span>→</span><b class="positive-label">POSITIVE</b></div></div><div class="visual-caption">LANGUAGE → FEATURES → PREDICTION</div></div>`,
    students: `<div class="visual visual-students" aria-hidden="true"><div class="visual-top"><span>STUDENT RECORDS</span><span>03 / 03</span></div><div class="database-window"><div class="window-bar"><i></i><i></i><i></i><span>students.sql</span></div><div class="db-table"><div class="db-row db-head"><span>ID</span><span>NAME</span><span>STATUS</span></div><div class="db-row"><span>001</span><span>Student A</span><b>ACTIVE</b></div><div class="db-row"><span>002</span><span>Student B</span><b>ACTIVE</b></div><div class="db-row"><span>003</span><span>Student C</span><b>ACTIVE</b></div><div class="db-row muted-row"><span>004</span><span>Student D</span><b>—</b></div></div><div class="crud-row"><span>CREATE</span><span>READ</span><span>UPDATE</span><span>DELETE</span></div></div><div class="visual-caption">STRUCTURED RECORDS. PERSISTENT DATA.</div></div>`
  };
  return visuals[project.visual] || '';
}

function renderProjects() {
  $('#project-grid').innerHTML = projects.map(project => `
    <article class="project-card reveal">
      <div class="project-art ${escapeHTML(project.visual)}">${projectVisual(project)}</div>
      <div class="project-card-body">
        <div class="project-meta"><span>${escapeHTML(project.number)} / ${escapeHTML(project.category)}</span><span class="project-mark" aria-hidden="true">↗</span></div>
        <h3>${escapeHTML(project.name)}</h3>
        <p>${escapeHTML(project.summary)}</p>
        <div class="inline-tags">${project.stack.map(item => `<span>${escapeHTML(item)}</span>`).join('')}</div>
        <button class="project-open" type="button" data-project="${escapeHTML(project.id)}">View project details <span aria-hidden="true">↗</span></button>
      </div>
    </article>`).join('');
}

function renderSkills() {
  $('#skills-grid').innerHTML = skillGroups.map((group, index) => `
    <article class="skill-card reveal"><div class="skill-number">0${index + 1}</div><h3>${escapeHTML(group.title)}</h3><p>${escapeHTML(group.subtitle)}</p><div class="skill-pills">${group.skills.map(skill => `<span>${escapeHTML(skill)}</span>`).join('')}</div></article>`).join('');
}

function renderCredentials() {
  $('#credentials-list').innerHTML = credentials.map((item, index) => `
    <article class="credential-row"><span class="credential-index">0${index + 1}</span><div><h4>${escapeHTML(item.title)}</h4><p>${escapeHTML(item.issuer)} <span>·</span> ${escapeHTML(item.kind)}</p></div>${item.url ? `<a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHTML(item.title)} credential">↗</a>` : '<span class="credential-check" aria-hidden="true">✓</span>'}</article>`).join('');
}

function hydrateProfileLinks() {
  document.querySelectorAll('[data-profile]').forEach(element => {
    const key = element.dataset.profile;
    element.href = key === 'email' ? `mailto:${profile.email}` : profile[key];
  });
}

function setupNavigation() {
  const toggle = $('#menu-toggle');
  const nav = $('#site-nav');
  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close();
      toggle.focus();
    }
  });
}

function setupTheme() {
  const button = $('#theme-toggle');
  const updateLabel = () => {
    const light = document.documentElement.dataset.theme === 'light';
    button.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
    $('.theme-icon', button).textContent = light ? '☾' : '☼';
  };
  updateLabel();
  button.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('muruli-theme', next); } catch { /* Storage may be unavailable. */ }
    updateLabel();
  });
}

function setupProjectDialog() {
  const dialog = $('#project-dialog');
  let lastTrigger = null;
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-project]');
    if (!trigger) return;
    const project = projects.find(item => item.id === trigger.dataset.project);
    if (!project) return;
    lastTrigger = trigger;
    $('#dialog-category').textContent = `${project.number} / ${project.category}`;
    $('#dialog-title').textContent = project.name;
    $('#dialog-summary').textContent = project.summary;
    $('#dialog-problem').textContent = project.problem;
    $('#dialog-approach').innerHTML = project.approach.map(step => `<li>${escapeHTML(step)}</li>`).join('');
    $('#dialog-stack').innerHTML = project.stack.map(skill => `<span>${escapeHTML(skill)}</span>`).join('');
    $('#dialog-outcome').textContent = project.outcome;
    dialog.showModal();
  });
  $('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => lastTrigger?.focus());
}

function setupCopyEmail() {
  const button = $('#copy-email');
  const status = $('#copy-status');
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Clipboard unavailable. Use the email link instead.';
    }
  });
}

function setupScrollEffects() {
  const progress = $('.scroll-progress');
  let ticking = false;
  const updateProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; }
  }, { passive: true });
  updateProgress();

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
    return;
  }
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
}

renderProjects();
renderSkills();
renderCredentials();
hydrateProfileLinks();
$('#year').textContent = new Date().getFullYear();
setupNavigation();
setupTheme();
setupProjectDialog();
setupCopyEmail();
setupScrollEffects();
