/* F Studio — Compact Tactical Board Controller
   Fetches squad from players.json · Drag & Drop · Formations · Edit · Substitution */

const FM = {
  "4-3-3":  [[50,87],[14,70],[37,74],[63,74],[86,70],[28,48],[50,40],[72,48],[18,20],[50,14],[82,20]],
  "4-4-2":  [[50,87],[14,70],[37,74],[63,74],[86,70],[16,46],[40,48],[60,48],[84,46],[36,18],[64,18]],
  "3-5-2":  [[50,87],[26,74],[50,76],[74,74],[14,46],[36,50],[50,36],[64,50],[86,46],[36,16],[64,16]],
  "4-2-3-1":[[50,87],[14,70],[37,74],[63,74],[86,70],[36,55],[64,55],[18,34],[50,30],[82,34],[50,14]]
};

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const role = p => p === 'GK' ? 'gk' : 'CB LB RB'.includes(p) ? 'def' : 'CM CDM'.includes(p) ? 'mid' : 'fwd';

const FALLBACK = {
  starters: [
    { name: "M. Neuer",    num: 1,  pos: "GK", ovr: 90, nat: "🇩🇪", x: 50, y: 87 },
    { name: "Marcelo",     num: 12, pos: "LB", ovr: 86, nat: "🇧🇷", x: 14, y: 70 },
    { name: "S. Ramos",    num: 4,  pos: "CB", ovr: 87, nat: "🇪🇸", x: 37, y: 74 },
    { name: "T. Silva",    num: 2,  pos: "CB", ovr: 88, nat: "🇧🇷", x: 63, y: 74 },
    { name: "Dani Alves",  num: 22, pos: "RB", ovr: 84, nat: "🇧🇷", x: 86, y: 70 },
    { name: "A. Iniesta",  num: 8,  pos: "CM", ovr: 88, nat: "🇪🇸", x: 28, y: 48 },
    { name: "L. Modrić",   num: 19, pos: "CM", ovr: 87, nat: "🇭🇷", x: 50, y: 40 },
    { name: "P. Pogba",    num: 6,  pos: "CM", ovr: 86, nat: "🇫🇷", x: 72, y: 48 },
    { name: "Neymar Jr",   num: 11, pos: "LW", ovr: 88, nat: "🇧🇷", x: 18, y: 20 },
    { name: "C. Ronaldo",  num: 7,  pos: "ST", ovr: 94, nat: "🇵🇹", x: 50, y: 14 },
    { name: "L. Messi",    num: 10, pos: "RW", ovr: 94, nat: "🇦🇷", x: 82, y: 20 }
  ],
  bench: [
    { name: "G. Buffon",      num: 77, pos: "GK", ovr: 88, nat: "🇮🇹" },
    { name: "D. Alaba",       num: 27, pos: "LB", ovr: 85, nat: "🇦🇹" },
    { name: "G. Piqué",       num: 3,  pos: "CB", ovr: 85, nat: "🇪🇸" },
    { name: "T. Kroos",       num: 39, pos: "CM", ovr: 87, nat: "🇩🇪" },
    { name: "S. Busquets",    num: 5,  pos: "CM", ovr: 86, nat: "🇪🇸" },
    { name: "E. Hazard",      num: 17, pos: "LW", ovr: 89, nat: "🇧🇪" },
    { name: "L. Suárez",      num: 9,  pos: "ST", ovr: 90, nat: "🇺🇾" },
    { name: "Z. Ibrahimović", num: 18, pos: "ST", ovr: 89, nat: "🇸🇪" }
  ]
};

(async () => {
  let D;
  try {
    const res = await fetch('players.json');
    if (!res.ok) throw new Error();
    D = await res.json();
  } catch {
    // Graceful fallback if opened via file:// protocol
    D = FALLBACK;
  }

  const P = $('#pitch'), B = $('#bench');

  /* ── Render Pitch Token ── */
  D.starters.forEach(p => {
    const t = document.createElement('div');
    t.className = 'token';
    Object.entries(p).forEach(([k, v]) => t.dataset[k] = v);
    t.style.left = p.x + '%'; t.style.top = p.y + '%';
    t.innerHTML = `<div class="jersey${p.pos === 'GK' ? ' gk' : ''}">${p.num}</div>` +
      `<div class="tag"><span class="p-name">${p.name}</span><span class="p-pos pos-${role(p.pos)}">${p.pos}</span></div>`;

    // Drag + Click
    let sx, sy, mv;
    t.onpointerdown = e => {
      if (e.button) return;
      try { t.setPointerCapture(e.pointerId); } catch {}
      sx = e.clientX; sy = e.clientY; mv = false;
      t.classList.add('drag');
      t.onpointermove = m => {
        if (Math.hypot(m.clientX - sx, m.clientY - sy) > 4) mv = true;
        const r = P.getBoundingClientRect();
        t.style.left = Math.max(4, Math.min(96, (m.clientX - r.left) / r.width * 100)) + '%';
        t.style.top  = Math.max(4, Math.min(96, (m.clientY - r.top) / r.height * 100)) + '%';
      };
      t.onpointerup = u => {
        t.classList.remove('drag'); t.onpointermove = t.onpointerup = null;
        try { t.releasePointerCapture(u.pointerId); } catch {}
        if (!mv) openEdit(t);
      };
    };
    P.appendChild(t);
  });

  /* ── Render Bench ── */
  D.bench.forEach(p => {
    const b = document.createElement('div');
    b.className = 'bench-item';
    Object.entries(p).forEach(([k, v]) => b.dataset[k] = v);
    b.innerHTML = `<span class="b-num">#${p.num}</span><span class="b-name">${p.name}</span>` +
      `<span class="b-ovr">${p.ovr}</span><span class="b-pos pos-${role(p.pos)}">${p.pos}</span>` +
      `<button class="sub-btn">⇄ Sub</button>`;
    b.querySelector('.sub-btn').onclick = () => openSub(b);
    B.appendChild(b);
  });
  $('#benchCount').textContent = D.bench.length + ' reserves';

  /* ── Formation Presets ── */
  $$('.fm-btn').forEach(btn => btn.onclick = () => {
    $$('.fm-btn').forEach(x => x.classList.toggle('active', x === btn));
    const c = FM[btn.dataset.f];
    $$('.token').forEach((t, i) => { if (c[i]) { t.style.left = c[i][0] + '%'; t.style.top = c[i][1] + '%'; } });
  });

  /* ── Edit Modal ── */
  const em = $('#editModal'); let editTk;
  function openEdit(t) {
    editTk = t; $('#eName').value = t.dataset.name;
    $('#eNum').value = t.dataset.num; $('#ePos').value = t.dataset.pos;
    em.classList.add('open');
  }
  $('#editSave').onclick = () => {
    const d = editTk.dataset;
    d.name = $('#eName').value; d.num = $('#eNum').value; d.pos = $('#ePos').value;
    editTk.querySelector('.jersey').textContent = d.num;
    editTk.querySelector('.jersey').className = 'jersey' + (d.pos === 'GK' ? ' gk' : '');
    editTk.querySelector('.p-name').textContent = d.name;
    const ps = editTk.querySelector('.p-pos'); ps.textContent = d.pos; ps.className = 'p-pos pos-' + role(d.pos);
    em.classList.remove('open');
  };
  $('#editCancel').onclick = () => em.classList.remove('open');

  /* ── Substitution Modal ── */
  const sm = $('#subModal'); let subBi;
  function openSub(b) {
    subBi = b;
    $('#subDesc').textContent = `Swap #${b.dataset.num} ${b.dataset.name} (${b.dataset.pos}) with:`;
    const sel = $('#subSelect'); sel.innerHTML = '';
    $$('.token').forEach((t, i) => sel.innerHTML += `<option value="${i}">#${t.dataset.num} ${t.dataset.name} — ${t.dataset.pos}</option>`);
    sm.classList.add('open');
  }
  $('#subConfirm').onclick = () => {
    const b = subBi, t = $$('.token')[$('#subSelect').value];
    ['name', 'num', 'pos', 'ovr', 'nat'].forEach(k => { const v = t.dataset[k]; t.dataset[k] = b.dataset[k]; b.dataset[k] = v; });
    // Refresh pitch token DOM
    t.querySelector('.jersey').textContent = t.dataset.num;
    t.querySelector('.jersey').className = 'jersey' + (t.dataset.pos === 'GK' ? ' gk' : '');
    t.querySelector('.p-name').textContent = t.dataset.name;
    const ps = t.querySelector('.p-pos'); ps.textContent = t.dataset.pos; ps.className = 'p-pos pos-' + role(t.dataset.pos);
    // Refresh bench item DOM
    b.querySelector('.b-num').textContent = '#' + b.dataset.num;
    b.querySelector('.b-name').textContent = b.dataset.name;
    b.querySelector('.b-ovr').textContent = b.dataset.ovr;
    const bp = b.querySelector('.b-pos'); bp.textContent = b.dataset.pos; bp.className = 'b-pos pos-' + role(b.dataset.pos);
    sm.classList.remove('open');
  };
  $('#subCancel').onclick = () => sm.classList.remove('open');

  /* ── Close Modals (Backdrop / Escape) ── */
  [em, sm].forEach(m => m.onclick = e => { if (e.target === m) m.classList.remove('open'); });
  onkeydown = e => { if (e.key === 'Escape') { em.classList.remove('open'); sm.classList.remove('open'); } };
})();
