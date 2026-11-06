'use strict';
(() => {
  const $ = (id) => document.getElementById(id);
  const STORAGE_KEY = 'traditions.field-companion.v1';
  const tabs = ['home', 'course', 'scorecard', 'watch', 'members'];
  let courses = {};
  let guideCourse = 'Riverside';
  let activeCourse = 'Riverside';
  let standIndex = 0;
  let rounds = {};
  let noticeTimer;
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function notify(text, persistent = false) {
    clearTimeout(noticeTimer);
    $('notice').replaceChildren(el('span', '', text));
    $('notice').hidden = false;
    if (!persistent) noticeTimer = setTimeout(() => { $('notice').hidden = true; }, 5500);
  }
  function navigate() {
    const requested = location.hash.slice(1);
    const tab = tabs.includes(requested) ? requested : 'home';
    tabs.forEach((id) => { $(id).hidden = id !== tab; });
    document.querySelectorAll('[data-tab]').forEach((link) => {
      if (link.dataset.tab === tab) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.title = `Traditions Field Club · ${tab.charAt(0).toUpperCase() + tab.slice(1)}`;
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', navigate);
  function connection() {
    $('connection').textContent = navigator.onLine ? 'FIELD COMPANION' : 'OFFLINE MODE';
    $('connection').classList.toggle('offline', !navigator.onLine);
  }
  window.addEventListener('online', connection);
  window.addEventListener('offline', connection);
  connection();
  navigate();
  const now = new Date();
  $('visit-date').value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeCourse, standIndex, rounds })); }
    catch { notify('Storage is unavailable or full. Keep this page open and share your results before leaving.', true); }
  }
  function round() {
    if (!rounds[activeCourse]) rounds[activeCourse] = { shooters: [] };
    return rounds[activeCourse];
  }
  function newShooter(name) {
    return { name, scores: courses[activeCourse].stands.map((s) => Array(s.targets).fill(null)) };
  }
  function restore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object' || !saved.rounds || typeof saved.rounds !== 'object') throw new Error('Invalid round');
      // Validate stored data before using it; never insert names as HTML.
      for (const name of Object.keys(courses)) {
        const data = saved.rounds[name];
        if (!data || !Array.isArray(data.shooters)) continue;
        rounds[name] = { shooters: data.shooters.filter((s) => s && typeof s.name === 'string' && Array.isArray(s.scores)).map((s) => ({
          name: s.name.slice(0, 40),
          scores: courses[name].stands.map((stand, i) => Array.from({length: stand.targets}, (_, t) => [0, 1].includes(s.scores[i]?.[t]) ? s.scores[i][t] : null))
        })) };
      }
      if (Object.hasOwn(courses, saved.activeCourse)) activeCourse = saved.activeCourse;
      if (Number.isInteger(saved.standIndex)) standIndex = Math.max(0, Math.min(saved.standIndex, courses[activeCourse].stands.length - 1));
    } catch { notify('Saved scorecard could not be read. A new blank scorecard is ready; the old saved data has not been changed.'); }
  }
  function renderGuide() {
    const course = courses[guideCourse];
    const wrap = $('course-guide');
    wrap.replaceChildren();
    const summary = el('div', 'course-summary');
    summary.append(el('h2', '', guideCourse), el('span', 'pill', `${course.stands.length} STATIONS · 100 TARGETS`), el('p', '', course.description));
    wrap.append(summary);
    const list = el('div', 'stand-list');
    course.stands.forEach((stand) => {
      const detail = el('details');
      const heading = el('summary');
      heading.append(el('span', 'stand-number', stand.number), el('span', '', `Stand ${stand.number}`), el('span', 'stand-meta', `${stand.pairs} pairs · ${stand.targets} targets`));
      detail.append(heading, el('p', '', `Stand notes: ${stand.notes}`));
      list.append(detail);
    });
    wrap.append(list);
  }
  document.querySelectorAll('[data-guide]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!courses[button.dataset.guide]) return;
      guideCourse = button.dataset.guide;
      document.querySelectorAll('[data-guide]').forEach((b) => {
        b.classList.toggle('active', b === button);
        b.setAttribute('aria-pressed', String(b === button));
      });
      renderGuide();
    });
  });
  function totalsFor(shooter) {
    const values = shooter.scores.flat();
    return { hits: values.filter((x) => x === 1).length, scored: values.filter((x) => x !== null).length };
  }
  function renderScorecard() {
    if (!courses[activeCourse]) return;
    $('score-course').value = activeCourse;
    const stands = courses[activeCourse].stands;
    $('stand-select').replaceChildren(...stands.map((stand, index) => {
      const option = el('option', '', `Stand ${stand.number} · ${stand.targets} targets`);
      option.value = index;
      return option;
    }));
    $('stand-select').value = standIndex;
    $('previous-stand').disabled = standIndex === 0;
    $('next-stand').disabled = standIndex === stands.length - 1;
    $('totals').replaceChildren();
    $('target-grid').replaceChildren();
    if (!round().shooters.length) {
      $('target-grid').append(el('div', 'empty-state', 'Add your first shooter above to start this round. Each course keeps its own scorecard.'));
    }
    round().shooters.forEach((shooter, shooterIndex) => {
      const totals = totalsFor(shooter);
      const chip = el('div', 'total-chip');
      chip.append(el('span', 'shooter-label', shooter.name), el('strong', '', `${totals.hits} / 100`), el('small', '', `${totals.scored} targets scored`));
      $('totals').append(chip);
      const card = el('article', 'shooter-card');
      const header = el('header');
      const standScores = shooter.scores[standIndex];
      header.append(el('h3', '', shooter.name), el('span', 'stand-total', `Stand: ${standScores.filter((x) => x === 1).length} / ${standScores.length}`));
      card.append(header);
      for (let p = 0; p < stands[standIndex].pairs; p++) {
        const pair = el('div', 'pair');
        pair.append(el('span', '', `Pair ${p + 1}`));
        for (let target = p * 2; target < p * 2 + 2; target++) {
          const value = standScores[target];
          const label = value === 1 ? 'hit' : value === 0 ? 'miss' : 'unscored';
          const button = el('button', `target${value === 1 ? ' hit' : value === 0 ? ' miss' : ''}`, value === 1 ? '✓' : value === 0 ? '×' : '–');
          button.type = 'button';
          button.dataset.shooter = shooterIndex;
          button.dataset.target = target;
          button.setAttribute('aria-label', `${shooter.name}, stand ${standIndex + 1}, target ${target + 1}: ${label}. Tap to change.`);
          pair.append(button);
        }
        card.append(pair);
      }
      $('target-grid').append(card);
    });
  }
  $('shooter-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = $('shooter-name').value.trim();
    if (!name) { $('shooter-name').focus(); return; }
    if (!courses[activeCourse]) return notify('Course data is still loading. Please try again.');
    round().shooters.push(newShooter(name));
    $('shooter-name').value = '';
    persist(); renderScorecard();
  });
  $('target-grid').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-target]');
    if (!button) return;
    const si = Number(button.dataset.shooter), ti = Number(button.dataset.target);
    const scores = round().shooters[si].scores[standIndex];
    scores[ti] = scores[ti] === null ? 1 : scores[ti] === 1 ? 0 : null;
    persist(); renderScorecard();
    $('target-grid').querySelector(`[data-shooter="${si}"][data-target="${ti}"]`)?.focus({preventScroll:true});
  });
  $('score-course').addEventListener('change', () => {
    if (!Object.hasOwn(courses, $('score-course').value)) return;
    activeCourse = $('score-course').value; standIndex = 0;
    persist(); renderScorecard();
  });
  function changeStand(value) {
    if (!courses[activeCourse]) return;
    standIndex = Math.max(0, Math.min(value, courses[activeCourse].stands.length - 1));
    persist(); renderScorecard();
  }
  $('stand-select').addEventListener('change', () => changeStand(Number($('stand-select').value)));
  $('previous-stand').addEventListener('click', () => changeStand(standIndex - 1));
  $('next-stand').addEventListener('click', () => changeStand(standIndex + 1));
  $('reset-round').addEventListener('click', () => {
    if (!courses[activeCourse]) return;
    if (!confirm(`Clear all ${activeCourse} scores and shooters on this device? Share any results you want to keep first. The other course is unchanged.`)) return;
    rounds[activeCourse] = { shooters: [] }; standIndex = 0;
    persist(); renderScorecard();
  });
  function resultText() {
    return ['Traditions Field Club', `${activeCourse} · 100-target round`, '', ...round().shooters.map((s) => {
      const total = totalsFor(s);
      return `${s.name}: ${total.hits}/100 (${total.scored}/100 scored)\n` + s.scores.map((values, i) => `Stand ${i + 1}: ${values.filter((x) => x === 1).length}/${values.length} [${values.map((x) => x === 1 ? '✓' : x === 0 ? '×' : '–').join(' ')}]`).join('\n');
    }), '', '✓ hit · × miss · – unscored'].join('\n');
  }
  async function copyResults(text) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      notify('Results copied. Paste them into a text or save them for later.');
    } catch {
      notify('Copy is unavailable here. Select and copy your results below.', true);
      const textarea = el('textarea', 'copy-results');
      textarea.value = text; textarea.readOnly = true;
      textarea.setAttribute('aria-label', 'Results to copy');
      $('notice').append(textarea); textarea.focus(); textarea.select();
    }
  }
  $('share-results').addEventListener('click', async () => {
    if (!round().shooters.length) return notify('Add a shooter first to share results.');
    const text = resultText();
    if (navigator.share) {
      try { await navigator.share({ title: 'Traditions scorecard', text }); return; }
      catch (error) { if (error.name === 'AbortError') return; }
    }
    await copyResults(text);
  });
  $('checkin-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!$('checkin-form').reportValidity()) return;
    const name = $('member-name').value.trim();
    if (!name) return $('member-name').focus();
    const body = `Traditions member check-in request\nName: ${name}\nParty size: ${$('party-size').value}\nVisit date: ${$('visit-date').value}\nPlease confirm availability. Thank you!`;
    // iOS uses &body while other SMS handlers generally use ?body.
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    window.location.href = `sms:+18433218152${ios ? '&' : '?'}body=${encodeURIComponent(body)}`;
  });
  async function loadData() {
    try {
      const response = await fetch('./courses.json');
      if (!response.ok) throw new Error('Course data unavailable');
      courses = await response.json();
      restore(); renderGuide(); renderScorecard();
    } catch {
      $('course-guide').textContent = 'Course guide unavailable. Open the app online once to save it for offline use.';
      $('target-grid').textContent = 'Scorecard data unavailable. Reopen online to load the course layouts.';
      notify('Course data could not be loaded. Please reopen online.');
    }
    try {
      const response = await fetch('./events.json');
      if (!response.ok) throw new Error('Events unavailable');
      const events = await response.json();
      $('events').replaceChildren();
      if (!events.length) $('events').append(el('p', 'footnote', 'No events listed yet.'));
      events.forEach((event) => {
        const card = el('article', 'card event-card');
        if (event.placeholder) card.append(el('span', 'event-placeholder', 'PLACEHOLDER · NOT A SCHEDULED EVENT'));
        card.append(el('h3', '', event.title));
        if (event.date) card.append(el('p', '', event.date));
        card.append(el('p', '', event.details));
        $('events').append(card);
      });
    } catch { $('events').textContent = 'Events unavailable. Coming soon — Jim to fill.'; }
  }
  loadData();
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js', { scope: './' }).catch(() => {
        notify('Offline setup is unavailable here. For installation, open the app over HTTPS or localhost.');
      });
    });
  }
})();
