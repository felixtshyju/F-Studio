/* ═══════════════════════════════════════════════════════════════════════
   F Studio — Tactical Board Controller (Vanilla JS)
   Formations · Position-Aware Alignment · Captaincy · Custom Squad · Export
   ═══════════════════════════════════════════════════════════════════════ */

// ── Formation Slots with Tactical Roles, Flanks & Pitch Coordinates [X%, Y%] ──
// Defending goal is at bottom (Y ~ 89%), Attacking goal is at top (Y ~ 15%)
const FORMATION_SLOTS = {
  "4-3-3": [
    { role: "GK",  pos: "GK",  side: "C",  coords: [50, 89] },
    { role: "DEF", pos: "LB",  side: "L",  coords: [15, 73] },
    { role: "DEF", pos: "CB",  side: "CL", coords: [36, 75] },
    { role: "DEF", pos: "CB",  side: "CR", coords: [64, 75] },
    { role: "DEF", pos: "RB",  side: "R",  coords: [85, 73] },
    { role: "MID", pos: "CDM", side: "C",  coords: [50, 58] },
    { role: "MID", pos: "CM",  side: "L",  coords: [32, 43] },
    { role: "MID", pos: "CM",  side: "R",  coords: [68, 43] },
    { role: "ATT", pos: "LW",  side: "L",  coords: [18, 22] },
    { role: "ATT", pos: "ST",  side: "C",  coords: [50, 15] },
    { role: "ATT", pos: "RW",  side: "R",  coords: [82, 22] }
  ],
  "4-4-2": [
    { role: "GK",  pos: "GK",  side: "C",  coords: [50, 89] },
    { role: "DEF", pos: "LB",  side: "L",  coords: [15, 74] },
    { role: "DEF", pos: "CB",  side: "CL", coords: [36, 76] },
    { role: "DEF", pos: "CB",  side: "CR", coords: [64, 76] },
    { role: "DEF", pos: "RB",  side: "R",  coords: [85, 74] },
    { role: "MID", pos: "LM",  side: "L",  coords: [16, 46] },
    { role: "MID", pos: "CM",  side: "CL", coords: [38, 50] },
    { role: "MID", pos: "CM",  side: "CR", coords: [62, 50] },
    { role: "MID", pos: "RM",  side: "R",  coords: [84, 46] },
    { role: "ATT", pos: "ST",  side: "CL", coords: [38, 18] },
    { role: "ATT", pos: "ST",  side: "CR", coords: [62, 18] }
  ],
  "3-5-2": [
    { role: "GK",  pos: "GK",  side: "C",  coords: [50, 89] },
    { role: "DEF", pos: "CB",  side: "L",  coords: [26, 76] },
    { role: "DEF", pos: "CB",  side: "C",  coords: [50, 78] },
    { role: "DEF", pos: "CB",  side: "R",  coords: [74, 76] },
    { role: "MID", pos: "LWB", side: "L",  coords: [12, 48] },
    { role: "MID", pos: "RWB", side: "R",  coords: [88, 48] },
    { role: "MID", pos: "CDM", side: "C",  coords: [50, 60] },
    { role: "MID", pos: "CM",  side: "L",  coords: [34, 44] },
    { role: "MID", pos: "CM",  side: "R",  coords: [66, 44] },
    { role: "ATT", pos: "ST",  side: "CL", coords: [38, 17] },
    { role: "ATT", pos: "ST",  side: "CR", coords: [62, 17] }
  ],
  "4-2-3-1": [
    { role: "GK",  pos: "GK",  side: "C",  coords: [50, 89] },
    { role: "DEF", pos: "LB",  side: "L",  coords: [15, 74] },
    { role: "DEF", pos: "CB",  side: "CL", coords: [36, 76] },
    { role: "DEF", pos: "CB",  side: "CR", coords: [64, 76] },
    { role: "DEF", pos: "RB",  side: "R",  coords: [85, 74] },
    { role: "MID", pos: "CDM", side: "CL", coords: [36, 58] },
    { role: "MID", pos: "CDM", side: "CR", coords: [64, 58] },
    { role: "ATT", pos: "LW",  side: "L",  coords: [18, 34] },
    { role: "ATT", pos: "RW",  side: "R",  coords: [82, 34] },
    { role: "MID", pos: "CAM", side: "C",  coords: [50, 31] },
    { role: "ATT", pos: "ST",  side: "C",  coords: [50, 15] }
  ]
};

// Default Argentina squad
const DEFAULT_SQUAD = {
  teamName: "Argentina AFA",
  teamTag: "AFA XI",
  teamFlag: "🇦🇷",
  starters: [
    { name: "E. Martínez", num: 23, pos: "GK", ovr: 90, nat: "🇦🇷", captain: false },
    { name: "N. Tagliafico", num: 3, pos: "LB", ovr: 83, nat: "🇦🇷", captain: false },
    { name: "N. Otamendi", num: 19, pos: "CB", ovr: 85, nat: "🇦🇷", captain: false },
    { name: "C. Romero", num: 13, pos: "CB", ovr: 86, nat: "🇦🇷", captain: false },
    { name: "N. Molina", num: 26, pos: "RB", ovr: 83, nat: "🇦🇷", captain: false },
    { name: "E. Fernández", num: 24, pos: "CDM", ovr: 86, nat: "🇦🇷", captain: false },
    { name: "A. Mac Allister", num: 20, pos: "CM", ovr: 85, nat: "🇦🇷", captain: false },
    { name: "R. De Paul", num: 7, pos: "CM", ovr: 85, nat: "🇦🇷", captain: false },
    { name: "Á. Di María", num: 11, pos: "LW", ovr: 87, nat: "🇦🇷", captain: false },
    { name: "J. Álvarez", num: 9, pos: "ST", ovr: 86, nat: "🇦🇷", captain: false },
    { name: "L. Messi", num: 10, pos: "RW", ovr: 94, nat: "🇦🇷", captain: true }
  ],
  bench: [
    { name: "F. Armani", num: 1, pos: "GK", ovr: 79, nat: "🇦🇷", captain: false },
    { name: "G. Rulli", num: 12, pos: "GK", ovr: 81, nat: "🇦🇷", captain: false },
    { name: "M. Acuña", num: 8, pos: "LB", ovr: 84, nat: "🇦🇷", captain: false },
    { name: "G. Montiel", num: 4, pos: "RB", ovr: 81, nat: "🇦🇷", captain: false },
    { name: "L. Martínez", num: 25, pos: "CB", ovr: 85, nat: "🇦🇷", captain: false },
    { name: "G. Pezzella", num: 6, pos: "CB", ovr: 79, nat: "🇦🇷", captain: false },
    { name: "L. Paredes", num: 5, pos: "CDM", ovr: 83, nat: "🇦🇷", captain: false },
    { name: "G. Rodríguez", num: 18, pos: "CDM", ovr: 80, nat: "🇦🇷", captain: false },
    { name: "E. Palacios", num: 14, pos: "CM", ovr: 81, nat: "🇦🇷", captain: false },
    { name: "P. Dybala", num: 21, pos: "CAM", ovr: 86, nat: "🇦🇷", captain: false },
    { name: "Lautaro M.", num: 22, pos: "ST", ovr: 87, nat: "🇦🇷", captain: false },
    { name: "Á. Correa", num: 15, pos: "RW", ovr: 82, nat: "🇦🇷", captain: false }
  ]
};

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const role = p => p === 'GK' ? 'gk' : 'CB LB RB LWB RWB'.includes(p) ? 'def' : 'CM CDM CAM LM RM'.includes(p) ? 'mid' : 'fwd';

/* ── Smart Position-to-Slot Matching Engine ── */
function getFitScore(pos, slot) {
  // Goalkeeper strict logic: GK goes ONLY to GK slot, outfield players NEVER go to GK slot
  if (pos === 'GK' && slot.role === 'GK') return 2000;
  if (pos === 'GK' && slot.role !== 'GK') return -10000;
  if (pos !== 'GK' && slot.role === 'GK') return -10000;

  // Exact position match (e.g. LB -> LB, ST -> ST)
  if (pos === slot.pos) return 1000;

  // Flank defender compatibility
  if (pos === 'LB' && (slot.pos === 'LWB' || (slot.role === 'DEF' && slot.side === 'L'))) return 850;
  if (pos === 'RB' && (slot.pos === 'RWB' || (slot.role === 'DEF' && slot.side === 'R'))) return 850;
  if (pos === 'LWB' && (slot.pos === 'LB' || (slot.role === 'MID' && slot.side === 'L'))) return 850;
  if (pos === 'RWB' && (slot.pos === 'RB' || (slot.role === 'MID' && slot.side === 'R'))) return 850;
  if (pos === 'CB' && slot.role === 'DEF') return 800;

  // Flank attacker / midfielder compatibility
  if ((pos === 'LW' || pos === 'LM') && (slot.pos === 'LW' || slot.pos === 'LM' || (slot.side === 'L' && slot.role !== 'GK'))) return 850;
  if ((pos === 'RW' || pos === 'RM') && (slot.pos === 'RW' || slot.pos === 'RM' || (slot.side === 'R' && slot.role !== 'GK'))) return 850;

  // Central midfield compatibility
  if (['CDM', 'CM', 'CAM'].includes(pos) && ['CDM', 'CM', 'CAM'].includes(slot.pos)) return 800;

  // Striker compatibility
  if (pos === 'ST' && slot.role === 'ATT') return 850;
  if (['LW', 'RW', 'ST', 'CF'].includes(pos) && slot.role === 'ATT') return 700;

  // Line category match (DEF -> DEF, MID -> MID, ATT -> ATT)
  const pRole = role(pos).toUpperCase();
  const sRole = slot.role === 'ATT' ? 'FWD' : slot.role;
  if (pRole === sRole) return 500;

  // Adjacent line match (DEF in MID, or MID in ATT)
  if ((pRole === 'DEF' && sRole === 'MID') || (pRole === 'MID' && sRole === 'DEF')) return 200;
  if ((pRole === 'MID' && sRole === 'FWD') || (pRole === 'FWD' && sRole === 'MID')) return 200;

  return 50;
}

function assignToSlots(items, formationKey) {
  const slots = FORMATION_SLOTS[formationKey] || FORMATION_SLOTS["4-3-3"];
  const remainingSlots = slots.map((s, idx) => ({ ...s, slotIndex: idx }));
  const remainingItems = items.map((it, idx) => ({
    item: it,
    pos: it.dataset ? it.dataset.pos : it.pos,
    originalIndex: idx
  }));

  const assignments = [];

  // Step 1: Assign Goalkeepers first to ensure GK always gets slot coords [50, 89]
  for (let i = remainingItems.length - 1; i >= 0; i--) {
    if (remainingItems[i].pos === 'GK') {
      const gkSlotIndex = remainingSlots.findIndex(s => s.role === 'GK');
      if (gkSlotIndex !== -1) {
        assignments.push({
          item: remainingItems[i].item,
          coords: remainingSlots[gkSlotIndex].coords,
          slot: remainingSlots[gkSlotIndex]
        });
        remainingSlots.splice(gkSlotIndex, 1);
        remainingItems.splice(i, 1);
      }
    }
  }

  // Step 2: Greedy matching by highest compatibility score
  while (remainingItems.length > 0 && remainingSlots.length > 0) {
    let bestScore = -Infinity;
    let bestItemIdx = 0;
    let bestSlotIdx = 0;

    for (let i = 0; i < remainingItems.length; i++) {
      for (let j = 0; j < remainingSlots.length; j++) {
        const sc = getFitScore(remainingItems[i].pos, remainingSlots[j]);
        if (sc > bestScore) {
          bestScore = sc;
          bestItemIdx = i;
          bestSlotIdx = j;
        }
      }
    }

    assignments.push({
      item: remainingItems[bestItemIdx].item,
      coords: remainingSlots[bestSlotIdx].coords,
      slot: remainingSlots[bestSlotIdx]
    });
    remainingItems.splice(bestItemIdx, 1);
    remainingSlots.splice(bestSlotIdx, 1);
  }

  return assignments;
}

/* ── Helper to format squad tag (e.g. "RMA XI", "FCB XI", "AFA XI") ── */
function formatSquadTag(name, explicitTag) {
  if (explicitTag && explicitTag.trim()) {
    const t = explicitTag.trim().toUpperCase();
    return t.endsWith('XI') ? t : `${t} XI`;
  }
  if (!name || !name.trim()) return "CUSTOM XI";
  const words = name.trim().split(/\s+/);
  if (words.length > 1) {
    const initials = words.map(w => w[0].toUpperCase()).join('');
    if (initials.length >= 2 && initials.length <= 4) return `${initials} XI`;
    return `${words[0].toUpperCase().slice(0, 5)} XI`;
  }
  return `${name.slice(0, 6).toUpperCase()} XI`;
}

/* ── Intro Splash ── */
(() => {
  const splash = $('#introSplash');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => splash.remove(), 700);
    }, 2800);
  }
})();

/* ── Toast Notification ── */
function showToast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(showToast._tm);
  showToast._tm = setTimeout(() => t.classList.remove('visible'), 2800);
}

/* ═══ MAIN APP INITIALIZATION ═══ */
(async () => {
  let D;
  try {
    const res = await fetch('players.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    D = await res.json();
    if (!D.teamTag) D.teamTag = "AFA XI";
    if (!D.teamName) D.teamName = "Argentina AFA";
    if (!D.teamFlag) D.teamFlag = "🇦🇷";
  } catch {
    D = DEFAULT_SQUAD;
  }

  const P = $('#pitch'), B = $('#bench');
  let currentFormation = '4-3-3';
  let activeSquadTag = D.teamTag || "AFA XI";
  let activeSquadName = D.teamName || "Argentina AFA";
  let activeSquadFlag = D.teamFlag || "🇦🇷";

  /* ── Theme Controller ── */
  const themeToggle = $('#themeToggle'), themeText = $('#themeText');

  function applyTheme(th) {
    document.documentElement.setAttribute('data-theme', th);
    try { localStorage.setItem('fstudio-theme', th); } catch {}
    const iconImg = $('#themeIconImg');
    if (th === 'light') {
      if (iconImg) { iconImg.src = 'moon-dark-theme.svg'; iconImg.alt = 'Dark Mode'; }
      themeText.textContent = 'Dark';
      themeToggle.title = 'Switch to Dark Theme';
    } else {
      if (iconImg) { iconImg.src = 'bright-sun-light.svg'; iconImg.alt = 'Light Theme'; }
      themeText.textContent = 'Light';
      themeToggle.title = 'Switch to Light Theme';
    }
  }

  const savedTheme = (() => { try { return localStorage.getItem('fstudio-theme'); } catch { return null; } })();
  applyTheme(savedTheme || 'dark');
  themeToggle.onclick = () => {
    const next = (document.documentElement.getAttribute('data-theme') || 'dark') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(`Theme switched to ${next.toUpperCase()}`);
  };

  /* ── Squad Metrics & Badges ── */
  function updateSquadMetrics() {
    const tokens = $$('.token');
    let cap = null, sumOvr = 0, redCount = 0;
    tokens.forEach(t => {
      if (t.dataset.captain === 'true') cap = t.dataset;
      sumOvr += parseFloat(t.dataset.ovr || 84);
      if (t.dataset.card === 'red') redCount++;
    });
    if (cap) {
      $('#capName').textContent = cap.name;
      const specs = $('#captainDisplay .captain-specs');
      if (specs) specs.innerHTML = `<span class="spec-num">#${cap.num}</span><span class="spec-pos">${cap.pos}</span><span class="spec-ovr">${cap.ovr || 90} OVR</span>`;
    } else {
      $('#capName').textContent = 'None Assigned';
      const specs = $('#captainDisplay .captain-specs');
      if (specs) specs.innerHTML = `<span class="spec-num">--</span><span class="spec-pos">--</span>`;
    }
    if (tokens.length) {
      $('#avgOvr').textContent = (sumOvr / tokens.length).toFixed(1);
      $('#totalStarters').textContent = tokens.length;
      if ($('#pitchCount')) {
        if (redCount > 0) {
          const activePlayers = tokens.length - redCount;
          $('#pitchCount').textContent = `${activePlayers} On Pitch (${redCount} Red)`;
        } else {
          $('#pitchCount').textContent = `${tokens.length} On Pitch`;
        }
      }
    }
    const benchItems = $$('.bench-item');
    $('#totalReserves').textContent = benchItems.length;
    $('#benchCount').textContent = `${benchItems.length} reserves`;

    // Always keep the squad tag beside Captain Info synced!
    const tagEl = $('#squadTag');
    if (tagEl) tagEl.textContent = activeSquadTag;
  }

  /* ── Token DOM Builder ── */
  function updateTokenDOM(t) {
    const d = t.dataset, isCap = d.captain === 'true';
    const card = d.card || 'none';

    t.classList.toggle('is-captain', isCap);
    t.classList.toggle('has-red-card', card === 'red');
    t.classList.toggle('has-yellow-card', card === 'yellow');

    let cardBadge = '';
    let tagCardBadge = '';
    if (card === 'red') {
      cardBadge = '<span class="match-card-badge red" title="Red Card (Sent Off)"></span>';
      tagCardBadge = '<span class="tag-card red" title="Red Card">RC</span>';
    } else if (card === 'yellow') {
      cardBadge = '<span class="match-card-badge yellow" title="Yellow Card"></span>';
      tagCardBadge = '<span class="tag-card yellow" title="Yellow Card">YC</span>';
    }

    t.innerHTML = `
      <div class="jersey${d.pos === 'GK' ? ' gk' : ''}">
        ${cardBadge}
        ${d.num}
        ${isCap ? '<span class="captain-armband" title="Captain">C</span>' : ''}
      </div>
      <div class="tag">
        ${isCap ? '<span class="cap-indicator">©</span>' : ''}
        ${tagCardBadge}
        <span class="p-name">${d.name}</span>
        <span class="p-pos pos-${role(d.pos)}">${d.pos}</span>
      </div>`;
  }

  /* ── Attach Token Drag & Click Handlers ── */
  function attachTokenEvents(t) {
    let sx, sy, mv;
    t.onpointerdown = e => {
      if (e.button && e.button !== 0) return;
      try { t.setPointerCapture(e.pointerId); } catch {}
      sx = e.clientX; sy = e.clientY; mv = false;
      t.classList.add('drag');
      t.onpointermove = m => {
        if (Math.hypot(m.clientX - sx, m.clientY - sy) > 4) mv = true;
        const r = P.getBoundingClientRect();
        t.style.left = Math.max(5, Math.min(95, (m.clientX - r.left) / r.width * 100)).toFixed(1) + '%';
        t.style.top = Math.max(5, Math.min(95, (m.clientY - r.top) / r.height * 100)).toFixed(1) + '%';
      };
      t.onpointerup = u => {
        t.classList.remove('drag'); t.onpointermove = t.onpointerup = null;
        try { t.releasePointerCapture(u.pointerId); } catch {}
        if (!mv) openEdit(t);
      };
      t.onpointercancel = () => { t.classList.remove('drag'); t.onpointermove = t.onpointerup = null; };
    };
  }

  /* ── Render Starters with Accurate Role Coordinates ── */
  function renderStarters(startersList, formationKey) {
    P.querySelectorAll('.token').forEach(t => t.remove());
    const assignments = assignToSlots(startersList, formationKey);

    assignments.forEach(({ item: p, coords }) => {
      const t = document.createElement('div');
      t.className = 'token' + (p.captain ? ' is-captain' : '');
      Object.entries(p).forEach(([k, v]) => t.dataset[k] = v);
      t.style.left = coords[0] + '%';
      t.style.top = coords[1] + '%';
      updateTokenDOM(t);
      attachTokenEvents(t);
      P.appendChild(t);
    });
  }

  /* ── Render Bench ── */
  function renderBenchItem(p) {
    const b = document.createElement('div');
    b.className = 'bench-item';
    b.dataset.role = role(p.pos);
    Object.entries(p).forEach(([k, v]) => b.dataset[k] = v);
    b.innerHTML = `<span class="b-num">#${p.num}</span><span class="b-name">${p.name}${p.captain ? ' <b class="b-cap">©</b>' : ''}</span><span class="b-ovr">${p.ovr}</span><span class="b-pos pos-${role(p.pos)}">${p.pos}</span><button class="sub-btn" title="Substitute">Sub</button>`;
    b.querySelector('.sub-btn').onclick = () => openSub(b);
    return b;
  }

  function renderBench(benchList) {
    B.innerHTML = '';
    benchList.forEach(p => B.appendChild(renderBenchItem(p)));
  }

  // Initial Squad Rendering
  renderStarters(D.starters, currentFormation);
  renderBench(D.bench);
  updateSquadMetrics();

  /* ── Formation Switching & Position-Aware Re-alignment ── */
  function applyFormation(fKey) {
    currentFormation = fKey;
    $('#activeFmDisplay').textContent = currentFormation;
    $$('.fm-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.f === currentFormation));

    const tokens = Array.from($$('.token'));
    const assignments = assignToSlots(tokens, currentFormation);

    assignments.forEach(({ item: token, coords }) => {
      token.style.left = coords[0] + '%';
      token.style.top = coords[1] + '%';
    });
    showToast(`Formation: ${currentFormation}`);
  }

  $$('.fm-btn').forEach(btn => btn.onclick = () => applyFormation(btn.dataset.f));

  /* ── Reset Formation Positions ── */
  $('#resetFormation').onclick = () => {
    applyFormation(currentFormation);
    showToast(`Reset to ${currentFormation}`);
  };

  /* ── Bench Filtering ── */
  $$('.filter-pill').forEach(pill => pill.onclick = () => {
    $$('.filter-pill').forEach(p => p.classList.toggle('active', p === pill));
    const f = pill.dataset.filter;
    $$('.bench-item').forEach(item => {
      item.style.display = (f === 'ALL' || item.dataset.role === f) ? 'flex' : 'none';
    });
  });

  /* ── Compact Tags Toggle ── */
  let compactTags = false;
  const toggleBtn = $('#toggleNamesBtn'), toggleTxt = $('#toggleNamesTxt');
  if (toggleBtn) toggleBtn.onclick = () => {
    compactTags = !compactTags;
    P.classList.toggle('compact-view', compactTags);
    toggleTxt.textContent = compactTags ? 'Full Tags' : 'Compact Tags';
    showToast(compactTags ? 'Compact Tags enabled' : 'Full Tags enabled');
  };

  /* ── Guide Modal ── */
  const hm = $('#helpModal');
  $('#helpBtn').onclick = () => hm.classList.add('open');
  $('#helpCloseBtn').onclick = () => hm.classList.remove('open');
  $('#helpGotIt').onclick = () => hm.classList.remove('open');

  /* ── Edit Player Modal ── */
  const em = $('#editModal');
  let editTk;
  function openEdit(t) {
    editTk = t;
    $('#eName').value = t.dataset.name;
    $('#eNum').value = t.dataset.num;
    $('#ePos').value = t.dataset.pos;
    $('#eCaptain').checked = t.dataset.captain === 'true';
    const card = t.dataset.card || 'none';
    const cardRadio = document.querySelector(`input[name="eCardOpt"][value="${card}"]`);
    if (cardRadio) cardRadio.checked = true;
    em.classList.add('open');
  }
  $('#editSave').onclick = () => {
    if (!editTk) return;
    const d = editTk.dataset;
    d.name = $('#eName').value.trim() || d.name;
    d.num = $('#eNum').value || d.num;
    d.pos = $('#ePos').value;
    if ($('#eCaptain').checked) {
      $$('.token').forEach(t => { t.dataset.captain = 'false'; updateTokenDOM(t); });
      d.captain = 'true';
    } else if (d.captain === 'true') {
      d.captain = 'false';
    }
    const cardOpt = document.querySelector('input[name="eCardOpt"]:checked')?.value || 'none';
    d.card = cardOpt;

    updateTokenDOM(editTk);
    updateSquadMetrics();
    em.classList.remove('open');

    if (cardOpt === 'red') {
      showToast(`🟥 Red Card: #${d.num} ${d.name} sent off!`);
    } else if (cardOpt === 'yellow') {
      showToast(`🟨 Yellow Card: #${d.num} ${d.name} booked`);
    } else {
      showToast(`Updated #${d.num} ${d.name}`);
    }
  };
  $('#editCancel').onclick = () => em.classList.remove('open');
  $('#editCloseBtn').onclick = () => em.classList.remove('open');

  /* ── Substitution Modal ── */
  const sm = $('#subModal');
  let subBi;
  function openSub(b) {
    subBi = b;
    $('#subDesc').textContent = `Swap #${b.dataset.num} ${b.dataset.name} (${b.dataset.pos}) with:`;
    const sel = $('#subSelect');
    sel.innerHTML = '';
    $$('.token').forEach((t, i) => {
      const cap = t.dataset.captain === 'true' ? ' (C)' : '';
      sel.innerHTML += `<option value="${i}">#${t.dataset.num} ${t.dataset.name} — ${t.dataset.pos}${cap}</option>`;
    });
    sm.classList.add('open');
  }
  $('#subConfirm').onclick = () => {
    if (!subBi) return;
    const b = subBi, t = $$('.token')[$('#subSelect').value];
    if (!t) return;
    ['name', 'num', 'pos', 'ovr', 'nat', 'captain', 'card'].forEach(k => {
      const v = t.dataset[k];
      t.dataset[k] = b.dataset[k];
      b.dataset[k] = v;
    });
    updateTokenDOM(t);
    b.dataset.role = role(b.dataset.pos);
    b.querySelector('.b-num').textContent = '#' + b.dataset.num;
    b.querySelector('.b-name').innerHTML = b.dataset.name + (b.dataset.captain === 'true' ? ' <b class="b-cap">©</b>' : '');
    b.querySelector('.b-ovr').textContent = b.dataset.ovr;
    const bp = b.querySelector('.b-pos');
    bp.textContent = b.dataset.pos;
    bp.className = 'b-pos pos-' + role(b.dataset.pos);
    updateSquadMetrics();
    sm.classList.remove('open');
    showToast(`Substitution: ${t.dataset.name} IN`);
  };
  $('#subCancel').onclick = () => sm.classList.remove('open');
  $('#subCloseBtn').onclick = () => sm.classList.remove('open');

  /* ═══ EXPORT SYSTEM (PDF, Image, Clipboard, Full Page) ═══ */
  const exm = $('#exportModal');
  $('#exportBtn').onclick = () => exm.classList.add('open');
  $('#exportCloseBtn').onclick = () => exm.classList.remove('open');

  async function capturePitch() {
    showToast('Capturing pitch...');
    return html2canvas($('.pitch-container'), {
      scale: 2, useCORS: true, backgroundColor: null,
      logging: false, allowTaint: true
    });
  }

  // Save as Image (PNG)
  $('#exportImage').onclick = async () => {
    try {
      const canvas = await capturePitch();
      const link = document.createElement('a');
      link.download = `FStudio_${activeSquadName.replace(/\s+/g, '_')}_${currentFormation}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      exm.classList.remove('open');
      showToast('Image saved successfully!');
    } catch (err) {
      showToast('Image export failed');
      console.error(err);
    }
  };

  // Export as PDF
  $('#exportPDF').onclick = async () => {
    try {
      const canvas = await capturePitch();
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageW = pdf.internal.pageSize.getWidth();

      // Header
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.setTextColor(30, 64, 175);
      pdf.text('F STUDIO — Tactical Lineup', pageW / 2, 18, { align: 'center' });

      // Subtitle
      pdf.setFontSize(10);
      pdf.setTextColor(90);
      pdf.text(`${activeSquadName} (${activeSquadTag}) | Formation: ${currentFormation}`, pageW / 2, 26, { align: 'center' });

      // Pitch image
      const imgW = pageW - 40, imgH = (canvas.height / canvas.width) * imgW;
      pdf.addImage(imgData, 'PNG', 20, 32, imgW, imgH);

      // Starters listing
      let y = 38 + imgH;
      pdf.setFontSize(12);
      pdf.setTextColor(30, 64, 175);
      pdf.text('Starting XI', 20, y);
      y += 6;
      pdf.setFontSize(9);
      pdf.setTextColor(60);
      $$('.token').forEach((t, i) => {
        const cap = t.dataset.captain === 'true' ? ' (C)' : '';
        const cardNotice = t.dataset.card === 'red' ? ' [RED CARD]' : t.dataset.card === 'yellow' ? ' [YELLOW]' : '';
        pdf.text(`${i + 1}. #${t.dataset.num} ${t.dataset.name} [${t.dataset.pos}] OVR: ${t.dataset.ovr || '-'} ${cap}${cardNotice}`, 22, y);
        y += 5;
        if (y > 280) { pdf.addPage(); y = 20; }
      });

      // Footer
      y += 4;
      pdf.setFontSize(8);
      pdf.setTextColor(150);
      pdf.text('Generated by F Studio Tactical Board Engine', pageW / 2, y, { align: 'center' });
      pdf.save(`FStudio_${activeSquadName.replace(/\s+/g, '_')}_${currentFormation}.pdf`);
      exm.classList.remove('open');
      showToast('PDF exported successfully!');
    } catch (err) {
      showToast('PDF export failed');
      console.error(err);
    }
  };

  // Copy to Clipboard
  $('#exportClipboard').onclick = () => {
    let text = `F STUDIO TACTICAL LINEUP\n`;
    text += `Team: ${activeSquadName} (${activeSquadTag}) | Formation: ${currentFormation}\n`;
    text += `${'─'.repeat(40)}\nSTARTING XI:\n`;
    $$('.token').forEach((t, i) => {
      const cap = t.dataset.captain === 'true' ? ' (C)' : '';
      const cardNotice = t.dataset.card === 'red' ? ' [RED CARD]' : t.dataset.card === 'yellow' ? ' [YELLOW]' : '';
      text += `${i + 1}. #${t.dataset.num} ${t.dataset.name} [${t.dataset.pos}] OVR: ${t.dataset.ovr || '-'}${cap}${cardNotice}\n`;
    });
    text += `${'─'.repeat(40)}\nGenerated with F Studio Tactical Board`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Lineup summary copied to clipboard!');
        exm.classList.remove('open');
      }).catch(() => showToast('Clipboard ready'));
    } else {
      showToast('Clipboard access unavailable');
    }
  };

  // Full Page Screenshot
  $('#exportFullPage').onclick = async () => {
    try {
      showToast('Capturing full tactical board...');
      const canvas = await html2canvas(document.body, {
        scale: 1.5, useCORS: true, backgroundColor: null,
        logging: false, allowTaint: true
      });
      const link = document.createElement('a');
      link.download = `FStudio_FullBoard_${currentFormation}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      exm.classList.remove('open');
      showToast('Full board image saved!');
    } catch (err) {
      showToast('Capture failed');
      console.error(err);
    }
  };

  /* ═══ CUSTOM LINEUP MANAGER ═══ */
  const cm = $('#customModal');
  let customPlayers = [];

  $('#customLineupBtn').onclick = () => {
    renderCustomTable();
    cm.classList.add('open');
  };
  $('#customCloseBtn').onclick = () => cm.classList.remove('open');

  // Add player
  $('#cpAdd').onclick = () => {
    const name = $('#cpName').value.trim();
    const num = parseInt($('#cpNum').value) || 0;
    const pos = $('#cpPos').value;
    const ovr = parseInt($('#cpOvr').value) || 85;
    if (!name || !num) {
      showToast('Player Name and Jersey # required');
      return;
    }
    customPlayers.push({ name, num, pos, ovr });
    $('#cpName').value = '';
    $('#cpNum').value = '';
    $('#cpOvr').value = '85';
    renderCustomTable();
    showToast(`Added ${name} to squad`);
  };

  function renderCustomTable() {
    const body = $('#lineupBody'), empty = $('#emptyLineup');
    body.innerHTML = '';
    if (!customPlayers.length) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    customPlayers.forEach((p, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${p.num}</td><td>${p.name}</td><td><span class="p-pos pos-${role(p.pos)}">${p.pos}</span></td><td>${p.ovr}</td>
        <td class="tbl-actions">
          <button class="tbl-btn" data-i="${i}" title="Edit Player">Edit</button>
          <button class="tbl-btn del" data-i="${i}" title="Delete Player">Del</button>
        </td>`;

      // Edit Player
      tr.querySelector('.tbl-btn:not(.del)').onclick = () => {
        const np = prompt('Player Name:', p.name);
        if (np !== null) p.name = np.trim() || p.name;
        const nn = prompt('Jersey #:', p.num);
        if (nn !== null) p.num = parseInt(nn) || p.num;
        const no = prompt('OVR Rating:', p.ovr);
        if (no !== null) p.ovr = parseInt(no) || p.ovr;
        renderCustomTable();
      };

      // Delete Player
      tr.querySelector('.tbl-btn.del').onclick = () => {
        customPlayers.splice(i, 1);
        renderCustomTable();
        showToast('Player removed');
      };
      body.appendChild(tr);
    });
  }

  // Clear all
  $('#clearLineup').onclick = () => {
    if (customPlayers.length && confirm('Clear all players from custom lineup?')) {
      customPlayers = [];
      renderCustomTable();
      showToast('Custom squad cleared');
    }
  };

  // Save lineup to localStorage
  $('#saveLineup').onclick = () => {
    const clubName = $('#clubName').value.trim() || 'My Club';
    const clubTag = $('#clubTag').value.trim() || formatSquadTag(clubName);
    const clubFlag = $('#clubFlag').value.trim() || '⚽';
    const data = { clubName, clubTag, clubFlag, players: customPlayers };
    try {
      localStorage.setItem('fstudio-custom-lineup', JSON.stringify(data));
      showToast(`Saved "${clubName}" (${customPlayers.length} players)`);
    } catch {
      showToast('Save failed');
    }
  };

  // Load saved lineup
  $('#loadLineup').onclick = () => {
    try {
      const raw = localStorage.getItem('fstudio-custom-lineup');
      if (!raw) {
        showToast('No saved custom squad found');
        return;
      }
      const data = JSON.parse(raw);
      customPlayers = data.players || [];
      $('#clubName').value = data.clubName || '';
      $('#clubTag').value = data.clubTag || '';
      $('#clubFlag').value = data.clubFlag || '';
      renderCustomTable();
      showToast(`Loaded "${data.clubName}" (${customPlayers.length} players)`);
    } catch {
      showToast('Load failed');
    }
  };

  // ── Apply custom lineup to pitch with Position-Aware Placement ──
  $('#applyLineup').onclick = () => {
    if (customPlayers.length < 1) {
      showToast('Add at least 1 player to apply');
      return;
    }

    // 1. Update Team Info & Dynamic Squad Tag
    const clubName = $('#clubName').value.trim() || 'Custom Club';
    const rawTag = $('#clubTag').value.trim();
    const clubTag = formatSquadTag(clubName, rawTag);
    const clubFlag = $('#clubFlag').value.trim() || '⚽';

    activeSquadName = clubName;
    activeSquadTag = clubTag;
    activeSquadFlag = clubFlag;

    if ($('#teamNameDisplay')) $('#teamNameDisplay').textContent = clubName;
    if ($('#teamFlag')) $('#teamFlag').textContent = clubFlag;
    if ($('#squadTag')) $('#squadTag').textContent = clubTag;

    // 2. Select starting 11 intelligently:
    // If more than 11 players, ensure 1 GK is prioritized in starters, then DEF, MID, ATT
    let starters = [];
    let bench = [];

    if (customPlayers.length <= 11) {
      starters = customPlayers.map((p, idx) => ({ ...p, captain: idx === 0, nat: clubFlag }));
      bench = [];
    } else {
      const gks = customPlayers.filter(p => p.pos === 'GK');
      const outfield = customPlayers.filter(p => p.pos !== 'GK');

      // Pick 1 GK for starters if available
      const startingGk = gks.length > 0 ? [gks[0]] : [];
      const reserveGks = gks.length > 0 ? gks.slice(1) : [];

      const neededOutfield = 11 - startingGk.length;
      const startingOutfield = outfield.slice(0, neededOutfield);
      const reserveOutfield = outfield.slice(neededOutfield);

      starters = [...startingGk, ...startingOutfield].map((p, idx) => ({
        ...p,
        captain: idx === 0,
        nat: clubFlag
      }));
      bench = [...reserveGks, ...reserveOutfield].map(p => ({
        ...p,
        captain: false,
        nat: clubFlag
      }));
    }

    // 3. Render Starters accurately mapped to pitch slots
    renderStarters(starters, currentFormation);

    // 4. Render Bench
    renderBench(bench);

    // 5. Update Metrics & Close Modal
    updateSquadMetrics();
    cm.classList.remove('open');
    showToast(`Applied ${clubName} (${activeSquadTag}) to pitch`);
  };

  /* ── Global Modal Close (Backdrop Click / Escape Key) ── */
  [em, sm, hm, exm, cm].forEach(m => {
    if (m) m.onclick = e => { if (e.target === m) m.classList.remove('open'); };
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') [em, sm, hm, exm, cm].forEach(m => m?.classList.remove('open'));
  });
})();
