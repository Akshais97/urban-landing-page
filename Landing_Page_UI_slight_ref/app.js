(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const scrollTo = id => $(id)?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });

  let toastTimer;
  function showToast(message) {
    $('#toast-copy').textContent = message;
    $('#toast').classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 3800);
  }

  // The page remains readable if JavaScript or the observer is unavailable.
  if ('IntersectionObserver' in window && !reducedMotion) {
    document.body.classList.add('js-motion');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    $$('.reveal').forEach(element => revealObserver.observe(element));
  }
  $('#copyright-year').textContent = new Date().getFullYear();

  // Compact menu, keyboard exit, and truthful navigation state.
  const menu = $('#mobile-menu');
  const menuToggle = $('#menu-toggle');
  function closeMenu(returnFocus = false) {
    menu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    if (returnFocus) menuToggle.focus();
  }
  menuToggle.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  $$('a', menu).forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('click', event => {
    if (!menu.hidden && !menu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) closeMenu(true);
  });
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $$('.desktop-nav a').forEach(link => {
            const active = link.hash === '#' + entry.target.id;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-10% 0px -65% 0px' });
    ['home', 'vision', 'residences', 'location', 'release'].forEach(id => navObserver.observe($('#' + id)));
  }

  // Native dialogs contain focus and restore it to the invoking control.
  let dialogTrigger;
  function openDialog(dialog, trigger) {
    closeMenu();
    dialogTrigger = trigger;
    document.body.classList.add('dialog-open');
    dialog.showModal();
  }
  $$('dialog').forEach(dialog => {
    $('[data-close]', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      dialogTrigger?.focus({ preventScroll: true });
    });
  });
  const gallery = [
    { src: 'assets/towers.webp', alt: 'Conceptual luxury high-rise architecture at a warm sunset', eyebrow: 'A new standard of living', title: 'A new perspective on home.', copy: 'The Living Wave is Urbanrise’s first Home 2.0 chapter in Gattahalli, Bengaluru. Energy, Water, Air, Mobility, Nature and Community come together in a more considered idea of residential living.' },
    { src: 'assets/interior.webp', alt: 'Indicative high-rise residence interior with warm natural materials', eyebrow: 'Space for a more meaningful life', title: 'Living, beautifully considered.', copy: 'Space, light and a closer connection to nature inspire the Home 2.0 story. Explore 3 and 4 BHK configurations in The Living Wave. This interior is an illustrative concept, rather than a representation of a confirmed apartment layout.' }
  ];
  let galleryIndex = 0;
  function renderGallery() {
    const item = gallery[galleryIndex];
    $('#story-image').src = item.src;
    $('#story-image').alt = item.alt;
    $('#story-eyebrow').textContent = item.eyebrow;
    $('#story-title').textContent = item.title;
    $('#story-copy').textContent = item.copy;
    $('#story-index').textContent = `${String(galleryIndex + 1).padStart(2, '0')} / 02`;
  }
  $$('[data-story], [data-gallery]').forEach(trigger => trigger.addEventListener('click', () => {
    galleryIndex = trigger.hasAttribute('data-gallery') ? 1 : 0;
    renderGallery();
    openDialog($('#story-dialog'), trigger);
  }));
  $('#story-prev').addEventListener('click', () => { galleryIndex = (galleryIndex + 1) % 2; renderGallery(); });
  $('#story-next').addEventListener('click', () => { galleryIndex = (galleryIndex + 1) % 2; renderGallery(); });
  $('#story-dialog').addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      galleryIndex = (galleryIndex + 1) % 2;
      renderGallery();
    }
  });
  $('#story-explore').addEventListener('click', () => $('#story-dialog').close());

  // The optional reveal is a campaign animation, never a fake installation.
  let updateTimer;
  const updateDialog = $('#update-dialog');
  $$('[data-update]').forEach(trigger => trigger.addEventListener('click', () => {
    $('#update-actions').hidden = false;
    $('#update-progress').hidden = true;
    $('#update-bar').style.width = '0%';
    $('#update-step').textContent = '';
    openDialog(updateDialog, trigger);
  }));
  updateDialog.addEventListener('close', () => clearTimeout(updateTimer));
  $('#update-later').addEventListener('click', () => updateDialog.close());
  $('#update-start').addEventListener('click', () => {
    $('#update-actions').hidden = true;
    $('#update-progress').hidden = false;
    const steps = ['A new perspective on energy.', 'A considered approach to water.', 'Air you can understand.', 'A future ready for electric mobility.', 'Nature within the architecture.', 'Life beyond four walls.'];
    let step = 0;
    function tick() {
      if (!updateDialog.open) return;
      $('#update-step').textContent = steps[step];
      $('#update-bar').style.width = ((step + 1) / steps.length * 100) + '%';
      step++;
      updateTimer = setTimeout(() => {
        if (step < steps.length) tick();
        else {
          updateDialog.close();
          scrollTo('#release');
          showToast('Discover the six capabilities of Home 2.0.');
        }
      }, reducedMotion ? 60 : 450);
    }
    tick();
  });

  const features = [
    { id: 'energy', label: 'Energy', icon: 'sun', title: 'Your home now generates.', sub: 'Wind and solar bring energy generation into the Home 2.0 story, with a more forward-looking approach to residential infrastructure.', image: 'assets/towers.webp', promise: 'A home that generates', steps: [['Generate', 'Wind and solar feature in the project’s campaign energy concept.'], ['Think collectively', 'A community approach to how energy is generated and used.'], ['Look ahead', 'Final system scope and allocation require project confirmation.']], old: 'Consumes', updated: 'Generates' },
    { id: 'water', label: 'Water', icon: 'water', title: 'Every drop, considered.', sub: 'Rainwater capture and thoughtful water use make conservation part of the way a community lives, rather than an afterthought.', image: 'assets/towers.webp', promise: 'Designed for water security', steps: [['Capture', 'Rainwater harvesting is part of the supplied Home 2.0 brief.'], ['Store and recharge', 'An approach that considers water beyond its first use.'], ['Use smarter', 'Final capacities and system specifications require confirmation.']], old: 'Depends on supply', updated: 'Conserves and secures' },
    { id: 'air', label: 'Air', icon: 'air', title: 'Air you can understand.', sub: 'The Home 2.0 concept brings purification and measurable air quality into the conversation about healthier everyday spaces.', image: 'assets/interior.webp', promise: 'Air quality you can measure', steps: [['Consider outdoors', 'The brief includes outdoor air purification.'], ['Think about home', 'In-home air purification forms part of the campaign concept.'], ['Make it visible', 'Systems, coverage and measurement details require confirmation.']], old: 'Unmeasured', updated: 'Purified and measured' },
    { id: 'mobility', label: 'Mobility', icon: 'charge', title: 'Ready for what drives you.', sub: 'EV-ready infrastructure recognises that the way we move is changing. Your home should be part of that change.', image: 'assets/towers.webp', promise: 'EV-ready living', steps: [['At your parking', 'The campaign brief proposes charging at private parking.'], ['Plan for tomorrow', 'Electric mobility belongs in the residential design conversation.'], ['Confirm the details', 'Charger specifications and provision require project confirmation.']], old: 'Not supported', updated: 'EV-ready parking' },
    { id: 'nature', label: 'Nature', icon: 'leaf', title: 'Green, every single day.', sub: 'Biophilic thinking and vertical gardens bring nature closer to everyday architecture, not just the edge of the neighbourhood.', image: 'assets/interior.webp', promise: 'Nature within the architecture', steps: [['Shape the spaces', 'Light, greenery and natural inspiration guide the concept.'], ['Think vertically', 'Vertical gardens form part of the supplied campaign narrative.'], ['Live with nature', 'Final landscaping and maintenance details require confirmation.']], old: 'An occasional escape', updated: 'Built into the architecture' },
    { id: 'community', label: 'Community', icon: 'people', title: 'Life beyond four walls.', sub: 'Places to meet, unwind and celebrate make community part of home. A more thoughtful day continues beyond your front door.', image: 'assets/interior.webp', promise: 'Living beyond four walls', steps: [['Come together', 'Clubhouses feature in the supplied project concept.'], ['Make time for life', 'Entertainment spaces support the community narrative.'], ['Meet your neighbours', 'Final amenity scope and clubhouse count require confirmation.']], old: 'Ends at the door', updated: 'Places to come together' }
  ];
  const tabList = $('#feature-tabs');
  const panel = $('#feature-panel');
  let selectedFeature = 1;
  features.forEach((feature, index) => {
    const tab = document.createElement('button');
    tab.className = 'feature-tab';
    tab.id = 'tab-' + feature.id;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', 'feature-panel');
    tab.innerHTML = `${icon(feature.icon)}<span>${feature.label}</span>`;
    tab.addEventListener('click', () => selectFeature(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % features.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + features.length - 1) % features.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = features.length - 1;
      if (next !== undefined) { event.preventDefault(); selectFeature(next); tabList.children[next].focus(); }
    });
    tabList.append(tab);
  });
  function selectFeature(index) {
    selectedFeature = index;
    const feature = features[index];
    [...tabList.children].forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', 'tab-' + feature.id);
    panel.innerHTML = `<div class="feature-art"><img src="${feature.image}" alt="Indicative architecture illustrating ${feature.label.toLowerCase()}" loading="lazy"><span class="feature-number">${String(index + 1).padStart(2, '0')} / 06</span><span class="feature-seal glass">${icon(feature.icon)}</span><div class="feature-art-caption"><p class="eyebrow">New in Home 2.0 · ${feature.label}</p><h3>${feature.title}</h3><p>${feature.promise}</p></div></div><div class="feature-details"><p>${feature.sub}</p><div class="feature-steps">${feature.steps.map(([title, copy], step) => `<div class="feature-step"><span>0${step + 1}</span><div><strong>${title}</strong><p>${copy}</p></div></div>`).join('')}</div><div class="feature-compare"><span>v1.0 · ${feature.old}</span>${icon('arrow')}<span>2.0 · ${feature.updated}</span></div></div>`;
  }
  selectFeature(selectedFeature);
  $$('[data-feature]').forEach(link => link.addEventListener('click', () => selectFeature(Number(link.dataset.feature))));

  const versionSwitch = $('#version-switch');
  function renderComparison(upgraded) {
    versionSwitch.setAttribute('aria-checked', String(upgraded));
    $('#benchmark-version').textContent = upgraded ? 'Home 2.0' : 'Home v1.0';
    $('#benchmark-grid').classList.toggle('is-upgraded', upgraded);
    $('#benchmark-grid').innerHTML = features.map(feature => `<div class="benchmark-cell"><span>${icon(feature.icon)}${feature.label}</span><strong>${upgraded ? feature.updated : feature.old}</strong></div>`).join('');
  }
  versionSwitch.addEventListener('click', () => renderComparison(versionSwitch.getAttribute('aria-checked') !== 'true'));
  renderComparison(false);

  const questions = [
    ['Energy', 'When the power goes out, what happens at home?', ['Total blackout', 'The inverter starts beeping', 'We barely notice']],
    ['Energy', 'Does your home make any of its own power?', ['No', 'Some solar in common areas', 'Yes, solar powers our home']],
    ['Water', 'Has your building ordered water tankers this year?', ['Often', 'Sometimes', 'Never']],
    ['Water', 'Does your building harvest rainwater?', ['No idea', 'Yes, not sure it works', 'Yes, and we use it']],
    ['Air', 'Do you know the air quality inside your home right now?', ['No idea', 'I check outdoor air on an app', 'Yes, we measure indoors']],
    ['Air', 'How is the air at home cleaned?', ['It isn’t', 'A purifier in one room', 'Built into the home']],
    ['Mobility', 'Can you charge an EV at your parking spot?', ['No', 'Only with a workaround', 'Yes, a dedicated charger']],
    ['Mobility', 'Is your building ready for more EVs?', ['Not at all', 'A few shared points', 'Every parking is EV-ready']],
    ['Nature', 'What do you see from your window?', ['Mostly concrete', 'A few trees', 'Green, every day']],
    ['Nature', 'Where is the nearest green space you actually use?', ['Need to drive there', 'Outside the complex', 'Inside my building']],
    ['Community', 'How many neighbours do you know by name?', ['None yet', 'A few', 'Many']],
    ['Community', 'Where do evenings happen for your family?', ['Inside the flat', 'Outside the complex', 'In shared spaces at home']]
  ];
  let questionIndex = 0;
  let answers = [];
  const quizMount = $('#quiz-mount');
  function renderQuestion(focus = false) {
    const [pillar, question, options] = questions[questionIndex];
    quizMount.innerHTML = `<div class="quiz-meta"><span>${pillar}</span><span>${String(questionIndex + 1).padStart(2, '0')} / 12</span></div><div class="progress-track" role="progressbar" aria-label="Questions completed" aria-valuemin="0" aria-valuemax="12" aria-valuenow="${questionIndex}"><span style="width:${questionIndex / 12 * 100}%"></span></div><h3 class="quiz-question" id="quiz-question" tabindex="-1">${question}</h3><div class="quiz-options" role="group" aria-labelledby="quiz-question">${options.map((option, index) => `<button class="quiz-option" data-answer="${index}">${option}${icon('chevron')}</button>`).join('')}</div>${questionIndex > 0 ? '<button class="text-link quiz-back" id="quiz-back">← Previous question</button>' : ''}`;
    $$('[data-answer]', quizMount).forEach(button => button.addEventListener('click', () => {
      answers[questionIndex] = Number(button.dataset.answer);
      questionIndex++;
      if (questionIndex === questions.length) renderResult();
      else renderQuestion(true);
    }));
    $('#quiz-back')?.addEventListener('click', () => { questionIndex--; renderQuestion(true); });
    if (focus) $('#quiz-question').focus({ preventScroll: true });
  }
  function renderResult() {
    const score = Math.round(answers.reduce((sum, value) => sum + value, 0) / 24 * 100);
    const version = 'v1.' + Math.min(9, Math.floor(score / 10));
    const pillarScores = {};
    questions.forEach((question, index) => { pillarScores[question[0]] = (pillarScores[question[0]] || 0) + answers[index]; });
    const weakestScore = Math.min(...Object.values(pillarScores));
    const weakest = Object.keys(pillarScores).filter(key => pillarScores[key] === weakestScore);
    const issues = questions.filter((_, index) => answers[index] === 0);
    quizMount.innerHTML = `<div class="quiz-result" role="status"><p class="eyebrow">Your campaign home version</p><h3 tabindex="-1" id="quiz-result-title">${version}</h3><p>Score ${score}/100 · ${issues.length} area${issues.length === 1 ? '' : 's'} to reconsider</p><p>Lowest scoring: ${weakest.join(', ')}.</p>${issues.length ? `<ul>${issues.map(question => `<li>${question[0]}: ${question[1]}</li>`).join('')}</ul>` : '<p>A thoughtful starting point. Discover what a new standard could offer.</p>'}<a class="button button-champagne" href="#access">Explore early access ${icon('arrow')}</a><button class="text-link" id="quiz-retake">Retake the version check</button></div>`;
    $('#quiz-retake').addEventListener('click', () => { questionIndex = 0; answers = []; renderQuestion(true); });
    $('#quiz-result-title').focus({ preventScroll: true });
  }
  renderQuestion();

  const models = [
    { name: 'Home 2.0', config: '3 BHK + 2T', area: '1,500–1,550 sq ft' },
    { name: 'Home 2.0 Plus', config: '3 BHK + 3T', area: '1,700–1,750 sq ft' },
    { name: 'Home 2.0 Max', config: '4 BHK + 3T', area: '1,950–2,000 sq ft' }
  ];
  function updateSelectedModel(name) {
    $$('.model-card').forEach(button => {
      const selected = button.dataset.model === name;
      button.setAttribute('aria-pressed', String(selected));
      $('.model-indicator', button).hidden = !selected;
    });
    $('#enquiry-model').value = name;
  }
  models.forEach((model, index) => {
    const button = document.createElement('button');
    button.className = 'model-card';
    button.dataset.model = model.name;
    button.setAttribute('aria-pressed', 'false');
    button.innerHTML = `<span class="model-number">RESIDENCE 0${index + 1}</span><span class="model-indicator" hidden>${icon('check')}SELECTED</span><h3>${model.name}</h3><span class="model-config">${model.config}</span><span class="model-size">${model.area}</span><span class="model-selection">Select for early access${icon('arrow')}</span>`;
    button.addEventListener('click', () => {
      updateSelectedModel(model.name);
      if ($('#access-form').hidden) editEnquiry();
      scrollTo('#access');
      showToast(`${model.name} selected for your enquiry preview.`);
    });
    $('#model-grid').append(button);
  });
  $('#enquiry-model').addEventListener('change', event => updateSelectedModel(event.target.value));
  updateSelectedModel('Home 2.0');

  // Deliberately local preview: no tracking, storage, or invented submission.
  const form = $('#access-form');
  let enquiry;
  function formError(input, message) {
    $('#form-error').textContent = message;
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', 'form-error');
    input.focus();
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    $$('#access-form [aria-invalid]').forEach(input => { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); });
    $('#enquiry-phone').setAttribute('aria-describedby', 'phone-help');
    $('#form-error').textContent = '';
    const name = $('#enquiry-name').value.trim();
    const phone = $('#enquiry-phone').value.replace(/\D/g, '');
    if (!name) return formError($('#enquiry-name'), 'Please enter your name.');
    if (!/^[6-9]\d{9}$/.test(phone)) return formError($('#enquiry-phone'), 'Please enter a valid 10-digit Indian mobile number.');
    if (!$('#enquiry-consent').checked) return formError($('#enquiry-consent'), 'Please agree to include your details in the enquiry preview.');
    enquiry = { status: 'Local preview — not submitted', project: 'The Living Wave', brand: 'Urbanrise', location: 'Gattahalli, Bengaluru', name, phone: '+91 ' + phone, residence: $('#enquiry-model').value, timeline: $('#enquiry-timeline').value, consentForPreview: true, createdAt: new Date().toISOString() };
    $('#success-title').textContent = `Your preview is ready, ${name.split(/\s+/)[0]}.`;
    $('#success-copy').textContent = `Your ${enquiry.residence} enquiry details are ready to download.`;
    form.hidden = true;
    $('#form-success').hidden = false;
    $('#form-success').focus({ preventScroll: true });
    showToast('Your enquiry preview is ready. No details have been sent.');
  });
  function editEnquiry() {
    form.hidden = false;
    $('#form-success').hidden = true;
  }
  $('#edit-enquiry').addEventListener('click', () => { editEnquiry(); $('#enquiry-name').focus(); });
  $('#download-enquiry').addEventListener('click', () => {
    if (!enquiry) return;
    const blob = new Blob([JSON.stringify(enquiry, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'Urbanrise-Home-2.0-Enquiry-Preview.json';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
