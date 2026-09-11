/**
 * ==============================================================================
 * TACTIX PRO - Football Tactical Lineup & Strategy Management System
 * Plain Vanilla JavaScript - Clean, Student-Friendly, and Extensively Commented
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 1. DATA STRUCTURES: Formation Coordinates Presets (x: 0% to 100%, y: 0% to 100%)
// Note: y=90% is near home goal (GK), y=15% is near opponent goal (Attackers)
// ------------------------------------------------------------------------------
const FORMATION_PRESETS = {
  // Preset 1: 4-3-3 Attacking
  "4-3-3": [
    { pos: "GK",  name: "Alisson",      num: 1,  x: 50, y: 90, isCaptain: false, role: "Sweeper Keeper" },
    { pos: "LB",  name: "Robertson",    num: 26, x: 16, y: 73, isCaptain: false, role: "Inverted Wing Back" },
    { pos: "CB",  name: "Van Dijk",     num: 4,  x: 37, y: 76, isCaptain: true,  role: "Ball Playing Defender" },
    { pos: "CB",  name: "Konate",       num: 5,  x: 63, y: 76, isCaptain: false, role: "Standard" },
    { pos: "RB",  name: "Alexander-A.", num: 66, x: 84, y: 73, isCaptain: false, role: "Inverted Wing Back" },
    { pos: "CM",  name: "Mac Allister", num: 10, x: 26, y: 52, isCaptain: false, role: "Deep Lying Playmaker" },
    { pos: "CAM", name: "Szoboszlai",   num: 8,  x: 50, y: 44, isCaptain: false, role: "Shadow Striker" },
    { pos: "CM",  name: "Gravenberch",  num: 38, x: 74, y: 52, isCaptain: false, role: "Box-to-Box" },
    { pos: "LW",  name: "Diaz",         num: 7,  x: 20, y: 22, isCaptain: false, role: "Inside Forward" },
    { pos: "ST",  name: "Nunez",        num: 9,  x: 50, y: 16, isCaptain: false, role: "Poacher" },
    { pos: "RW",  name: "Salah",        num: 11, x: 80, y: 22, isCaptain: false, role: "Inside Forward" }
  ],

  // Preset 2: 4-4-2 Classic
  "4-4-2": [
    { pos: "GK", name: "Alisson",      num: 1,  x: 50, y: 90, isCaptain: false, role: "Sweeper Keeper" },
    { pos: "LB", name: "Robertson",    num: 26, x: 15, y: 74, isCaptain: false, role: "Standard" },
    { pos: "CB", name: "Van Dijk",     num: 4,  x: 37, y: 76, isCaptain: true,  role: "Ball Playing Defender" },
    { pos: "CB", name: "Konate",       num: 5,  x: 63, y: 76, isCaptain: false, role: "Standard" },
    { pos: "RB", name: "Alexander-A.", num: 66, x: 85, y: 74, isCaptain: false, role: "Standard" },
    { pos: "LM", name: "Diaz",         num: 7,  x: 18, y: 48, isCaptain: false, role: "Standard" },
    { pos: "CM", name: "Mac Allister", num: 10, x: 39, y: 50, isCaptain: false, role: "Deep Lying Playmaker" },
    { pos: "CM", name: "Szoboszlai",   num: 8,  x: 61, y: 50, isCaptain: false, role: "Box-to-Box" },
    { pos: "RM", name: "Salah",        num: 11, x: 82, y: 48, isCaptain: false, role: "Inside Forward" },
    { pos: "ST", name: "Jota",         num: 20, x: 36, y: 18, isCaptain: false, role: "Target Man" },
    { pos: "ST", name: "Nunez",        num: 9,  x: 64, y: 18, isCaptain: false, role: "Poacher" }
  ],

  // Preset 3: 3-5-2 Midfield Control
  "3-5-2": [
    { pos: "GK",  name: "Alisson",      num: 1,  x: 50, y: 90, isCaptain: false, role: "Sweeper Keeper" },
    { pos: "CB",  name: "Gomez",        num: 2,  x: 26, y: 76, isCaptain: false, role: "Standard" },
    { pos: "CB",  name: "Van Dijk",     num: 4,  x: 50, y: 78, isCaptain: true,  role: "Ball Playing Defender" },
    { pos: "CB",  name: "Konate",       num: 5,  x: 74, y: 76, isCaptain: false, role: "Standard" },
    { pos: "LWB", name: "Robertson",    num: 26, x: 12, y: 48, isCaptain: false, role: "Standard" },
    { pos: "CM",  name: "Mac Allister", num: 10, x: 34, y: 52, isCaptain: false, role: "Deep Lying Playmaker" },
    { pos: "CAM", name: "Szoboszlai",   num: 8,  x: 50, y: 40, isCaptain: false, role: "Shadow Striker" },
    { pos: "CM",  name: "Gravenberch",  num: 38, x: 66, y: 52, isCaptain: false, role: "Box-to-Box" },
    { pos: "RWB", name: "Alexander-A.", num: 66, x: 88, y: 48, isCaptain: false, role: "Standard" },
    { pos: "ST",  name: "Salah",        num: 11, x: 36, y: 18, isCaptain: false, role: "Inside Forward" },
    { pos: "ST",  name: "Nunez",        num: 9,  x: 64, y: 18, isCaptain: false, role: "Poacher" }
  ],

  // Preset 4: 4-2-3-1 Defensive / Counter
  "4-2-3-1": [
    { pos: "GK",  name: "Alisson",      num: 1,  x: 50, y: 90, isCaptain: false, role: "Sweeper Keeper" },
    { pos: "LB",  name: "Robertson",    num: 26, x: 16, y: 74, isCaptain: false, role: "Standard" },
    { pos: "CB",  name: "Van Dijk",     num: 4,  x: 37, y: 77, isCaptain: true,  role: "Ball Playing Defender" },
    { pos: "CB",  name: "Konate",       num: 5,  x: 63, y: 77, isCaptain: false, role: "Standard" },
    { pos: "RB",  name: "Alexander-A.", num: 66, x: 84, y: 74, isCaptain: false, role: "Standard" },
    { pos: "CDM", name: "Endo",         num: 3,  x: 36, y: 58, isCaptain: false, role: "Deep Lying Playmaker" },
    { pos: "CDM", name: "Mac Allister", num: 10, x: 64, y: 58, isCaptain: false, role: "Deep Lying Playmaker" },
    { pos: "LM",  name: "Diaz",         num: 7,  x: 20, y: 38, isCaptain: false, role: "Inside Forward" },
    { pos: "CAM", name: "Szoboszlai",   num: 8,  x: 50, y: 35, isCaptain: false, role: "Shadow Striker" },
    { pos: "RM",  name: "Salah",        num: 11, x: 80, y: 38, isCaptain: false, role: "Inside Forward" },
    { pos: "ST",  name: "Nunez",        num: 9,  x: 50, y: 16, isCaptain: false, role: "Poacher" }
  ],

  // Preset 5: 5-3-2 Solid Block
  "5-3-2": [
    { pos: "GK",  name: "Alisson",      num: 1,  x: 50, y: 90, isCaptain: false, role: "Sweeper Keeper" },
    { pos: "LWB", name: "Robertson",    num: 26, x: 12, y: 68, isCaptain: false, role: "Standard" },
    { pos: "CB",  name: "Gomez",        num: 2,  x: 30, y: 76, isCaptain: false, role: "Standard" },
    { pos: "CB",  name: "Van Dijk",     num: 4,  x: 50, y: 78, isCaptain: true,  role: "Ball Playing Defender" },
    { pos: "CB",  name: "Konate",       num: 5,  x: 70, y: 76, isCaptain: false, role: "Standard" },
    { pos: "RWB", name: "Alexander-A.", num: 66, x: 88, y: 68, isCaptain: false, role: "Standard" },
    { pos: "CM",  name: "Mac Allister", num: 10, x: 30, y: 50, isCaptain: false, role: "Deep Lying Playmaker" },
    { pos: "CM",  name: "Endo",         num: 3,  x: 50, y: 53, isCaptain: false, role: "Standard" },
    { pos: "CM",  name: "Szoboszlai",   num: 8,  x: 70, y: 50, isCaptain: false, role: "Box-to-Box" },
    { pos: "ST",  name: "Salah",        num: 11, x: 38, y: 19, isCaptain: false, role: "Inside Forward" },
    { pos: "ST",  name: "Nunez",        num: 9,  x: 62, y: 19, isCaptain: false, role: "Poacher" }
  ],

  // Preset 6: 3-4-3 High Press
  "3-4-3": [
    { pos: "GK", name: "Alisson",      num: 1,  x: 50, y: 90, isCaptain: false, role: "Sweeper Keeper" },
    { pos: "CB", name: "Gomez",        num: 2,  x: 26, y: 76, isCaptain: false, role: "Standard" },
    { pos: "CB", name: "Van Dijk",     num: 4,  x: 50, y: 78, isCaptain: true,  role: "Ball Playing Defender" },
    { pos: "CB", name: "Konate",       num: 5,  x: 74, y: 76, isCaptain: false, role: "Standard" },
    { pos: "LM", name: "Robertson",    num: 26, x: 16, y: 50, isCaptain: false, role: "Standard" },
    { pos: "CM", name: "Mac Allister", num: 10, x: 38, y: 52, isCaptain: false, role: "Deep Lying Playmaker" },
    { pos: "CM", name: "Szoboszlai",   num: 8,  x: 62, y: 52, isCaptain: false, role: "Box-to-Box" },
    { pos: "RM", name: "Alexander-A.", num: 66, x: 84, y: 50, isCaptain: false, role: "Standard" },
    { pos: "LW", name: "Diaz",         num: 7,  x: 20, y: 20, isCaptain: false, role: "Inside Forward" },
    { pos: "ST", name: "Nunez",        num: 9,  x: 50, y: 16, isCaptain: false, role: "Poacher" },
    { pos: "RW", name: "Salah",        num: 11, x: 80, y: 20, isCaptain: false, role: "Inside Forward" }
  ]
};

// ------------------------------------------------------------------------------
// 2. STATE: Current Active Starting Lineup & Bench Substitutes
// ------------------------------------------------------------------------------
let currentFormation = "4-3-3";

// Deep copy initial 4-3-3 players for the pitch starting XI (11 players)
let startingXI = JSON.parse(JSON.stringify(FORMATION_PRESETS["4-3-3"]));

// Substitutes Bench Roster (Reserve Players)
let substitutes = [
  { id: 101, name: "Kelleher",   num: 62, pos: "GK",  role: "Sweeper Keeper" },
  { id: 102, name: "Quansah",    num: 78, pos: "CB",  role: "Standard" },
  { id: 103, name: "Tsimikas",   num: 21, pos: "LB",  role: "Standard" },
  { id: 104, name: "Bradley",    num: 84, pos: "RB",  role: "Standard" },
  { id: 105, name: "Elliott",    num: 19, pos: "CAM", role: "Shadow Striker" },
  { id: 106, name: "Jones",      num: 17, pos: "CM",  role: "Box-to-Box" },
  { id: 107, name: "Gakpo",      num: 18, pos: "LW",  role: "Inside Forward" },
  { id: 108, name: "Chiesa",     num: 14, pos: "RW",  role: "Inside Forward" }
];

// Currently selected player for editing in the modal
let activeEditingIndex = null;
let activeEditingSource = "pitch"; // "pitch" or "bench"

// Kit Colors
let outfieldKitColor = "#0066ff";
let gkKitColor = "#f59e0b";

// ------------------------------------------------------------------------------
// 3. INITIALIZATION
// ------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Render
  renderPitchPlayers();
  renderStartingRosterList();
  renderBenchRosterList();

  // 2. Setup Event Listeners
  setupFormationButtons();
  setupModalEvents();
  setupKitColorPickers();
  setupMentalitySelector();
  setupAddSubstituteForm();
  setupExportAndResetButtons();
});

// ------------------------------------------------------------------------------
// 4. PITCH RENDERING & DRAGGING (HTML / DOM Manipulation)
// ------------------------------------------------------------------------------
function renderPitchPlayers() {
  const container = document.getElementById("playersOverlay");
  container.innerHTML = ""; // Clear existing tokens

  startingXI.forEach((player, index) => {
    // Create player token container
    const token = document.createElement("div");
    token.className = "player-token";
    token.id = `player-token-${index}`;
    token.dataset.index = index;
    token.dataset.position = player.pos;

    // Helper: Determine position group for color-coding
    if (["LW", "RW", "ST", "CF"].includes(player.pos)) {
      token.dataset.posGroup = "FWD";
    }

    // Set normalized percentage coordinates
    token.style.left = `${player.x}%`;
    token.style.top = `${player.y}%`;

    // Inner HTML for the circular jersey badge, number, name, and position
    token.innerHTML = `
      <div class="player-jersey" style="background: ${getJerseyGradient(player.pos)}">
        <span class="player-number">${player.num}</span>
        <span class="player-pos-badge">${player.pos}</span>
        ${player.isCaptain ? '<span class="captain-badge">C</span>' : ''}
      </div>
      <span class="player-name-tag">${player.name}</span>
    `;

    // Attach Drag and Click behaviors using clean Pointer Events
    attachDragAndClickToToken(token, index);

    container.appendChild(token);
  });
}

// Helper: Get jersey background gradient based on role (Goalkeeper vs Outfield)
function getJerseyGradient(pos) {
  if (pos === "GK") {
    return `linear-gradient(135deg, ${gkKitColor}, #b45309)`;
  }
  return `linear-gradient(135deg, ${outfieldKitColor}, #1d4ed8)`;
}

/**
 * Attaches smooth dragging and click detection to each player token.
 * Uses standard Pointer Events (works smoothly on both mouse and touchscreens).
 */
function attachDragAndClickToToken(token, index) {
  let isDragging = false;
  let startPointerX = 0;
  let startPointerY = 0;
  let hasMoved = false;

  const pitch = document.getElementById("footballPitch");

  // Pointer Down (Mouse Click or Finger Touch)
  token.addEventListener("pointerdown", (e) => {
    // Prevent default browser dragging
    e.preventDefault();
    token.setPointerCapture(e.pointerId);

    isDragging = true;
    hasMoved = false;
    startPointerX = e.clientX;
    startPointerY = e.clientY;

    token.classList.add("is-dragging");
  });

  // Pointer Move (Dragging across pitch)
  token.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    // Check if pointer moved more than 4px (to distinguish drag from a click)
    const distanceMoved = Math.hypot(e.clientX - startPointerX, e.clientY - startPointerY);
    if (distanceMoved > 4) {
      hasMoved = true;
    }

    // Calculate position within pitch bounding rectangle
    const pitchRect = pitch.getBoundingClientRect();
    let newX = ((e.clientX - pitchRect.left) / pitchRect.width) * 100;
    let newY = ((e.clientY - pitchRect.top) / pitchRect.height) * 100;

    // Clamp coordinates so player stays inside pitch boundaries (5% to 95%)
    newX = Math.max(5, Math.min(95, newX));
    newY = Math.max(5, Math.min(95, newY));

    // Update token visually in real-time
    token.style.left = `${newX}%`;
    token.style.top = `${newY}%`;

    // Save coordinates in player data
    startingXI[index].x = Math.round(newX);
    startingXI[index].y = Math.round(newY);
  });

  // Pointer Up (Drop or Click)
  token.addEventListener("pointerup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    token.classList.remove("is-dragging");
    token.releasePointerCapture(e.pointerId);

    // If the user did not drag, it was a click -> Open the Player Edit Modal!
    if (!hasMoved) {
      openPlayerEditModal(index, "pitch");
    }
  });
}

// ------------------------------------------------------------------------------
// 5. FORMATION PRESET SWITCHER
// ------------------------------------------------------------------------------
function setupFormationButtons() {
  const buttons = document.querySelectorAll(".formation-btn");
  const formationPill = document.getElementById("activeFormationPill");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const formationKey = btn.dataset.formation;
      currentFormation = formationKey;
      formationPill.textContent = `${formationKey} ${btn.querySelector(".f-tag").textContent}`;

      applyFormation(formationKey);
      showToast(`Formation switched to ${formationKey}!`);
    });
  });
}

/**
 * Applies new formation coordinates to the starting XI
 */
function applyFormation(formationKey) {
  const preset = FORMATION_PRESETS[formationKey];
  if (!preset) return;

  // Move each player to the corresponding coordinate in the preset
  startingXI.forEach((player, i) => {
    if (preset[i]) {
      player.x = preset[i].x;
      player.y = preset[i].y;
      player.pos = preset[i].pos; // updates tactical position (e.g., CB, ST)
      player.role = preset[i].role;
    }
  });

  // Re-render pitch and sidebars
  renderPitchPlayers();
  renderStartingRosterList();
}

// ------------------------------------------------------------------------------
// 6. ROSTER & SUBSTITUTES BENCH MANAGEMENT
// ------------------------------------------------------------------------------

/**
 * Renders the compact Starting XI list in the right sidebar
 */
function renderStartingRosterList() {
  const list = document.getElementById("startingRosterList");
  list.innerHTML = "";

  startingXI.forEach((player, index) => {
    const item = document.createElement("div");
    item.className = "roster-item";
    item.title = "Click to edit player";
    item.innerHTML = `
      <div class="roster-left">
        <span class="roster-number">${player.num}</span>
        <span class="roster-name">${player.name} ${player.isCaptain ? "©" : ""}</span>
      </div>
      <span class="roster-pos">${player.pos}</span>
    `;

    // Clicking a player in the list also opens the edit modal
    item.addEventListener("click", () => openPlayerEditModal(index, "pitch"));
    list.appendChild(item);
  });
}

/**
 * Renders the Substitutes Bench list in the right sidebar
 */
function renderBenchRosterList() {
  const list = document.getElementById("benchRosterList");
  const countBadge = document.getElementById("benchCount");
  list.innerHTML = "";

  countBadge.textContent = `${substitutes.length} Subs`;

  substitutes.forEach((sub, subIndex) => {
    const item = document.createElement("div");
    item.className = "bench-card-item";
    item.innerHTML = `
      <div class="roster-left">
        <span class="roster-number">${sub.num}</span>
        <div>
          <div class="roster-name">${sub.name}</div>
          <span style="font-size: 10px; color: #94a3b8;">${sub.role || 'Standard'}</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="roster-pos">${sub.pos}</span>
        <button class="bench-sub-btn" data-sub-index="${subIndex}" title="Swap this substitute onto the pitch">Sub ⇄</button>
      </div>
    `;

    // Clicking "Sub ⇄" opens the modal pre-configured for a quick swap
    const subBtn = item.querySelector(".bench-sub-btn");
    subBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openPlayerEditModal(subIndex, "bench");
    });

    list.appendChild(item);
  });
}

/**
 * Form to add a new custom substitute to the bench
 */
function setupAddSubstituteForm() {
  const addBtn = document.getElementById("addNewSubBtn");
  const nameInput = document.getElementById("newSubName");
  const numberInput = document.getElementById("newSubNumber");
  const posSelect = document.getElementById("newSubPos");

  addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const number = parseInt(numberInput.value, 10);
    const pos = posSelect.value;

    if (!name) {
      alert("Please enter a player name.");
      return;
    }

    if (isNaN(number) || number < 1 || number > 99) {
      alert("Please enter a valid jersey number (1-99).");
      return;
    }

    // Add to substitutes list
    substitutes.push({
      id: Date.now(),
      name: name,
      num: number,
      pos: pos,
      role: "Standard"
    });

    // Reset input fields
    nameInput.value = "";
    numberInput.value = Math.floor(Math.random() * 80) + 12;

    // Refresh bench display
    renderBenchRosterList();
    showToast(`Added ${name} to the substitutes bench!`);
  });
}

// ------------------------------------------------------------------------------
// 7. PLAYER EDIT MODAL & SUBSTITUTION LOGIC
// ------------------------------------------------------------------------------
function setupModalEvents() {
  const modal = document.getElementById("playerModal");
  const closeBtn = document.getElementById("modalCloseBtn");
  const cancelBtn = document.getElementById("modalCancelBtn");
  const saveBtn = document.getElementById("modalSaveBtn");

  // Close modal when clicking close or cancel buttons
  closeBtn.addEventListener("click", () => closeModal());
  cancelBtn.addEventListener("click", () => closeModal());

  // Close modal when clicking backdrop outside the box
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Save changes
  saveBtn.addEventListener("click", savePlayerChanges);
}

function openPlayerEditModal(index, source) {
  activeEditingIndex = index;
  activeEditingSource = source; // "pitch" or "bench"

  const modal = document.getElementById("playerModal");
  const title = document.getElementById("modalPlayerTitle");
  const subtitle = document.getElementById("modalPlayerRoleSubtitle");
  const jerseyPreview = document.getElementById("modalJerseyPreview");
  const quickSubGroup = document.getElementById("quickSubGroup");
  const swapSelect = document.getElementById("swapWithSubSelect");

  const nameInput = document.getElementById("editPlayerName");
  const numberInput = document.getElementById("editPlayerNumber");
  const posSelect = document.getElementById("editPlayerPosition");
  const roleSelect = document.getElementById("editPlayerRole");
  const captainCheck = document.getElementById("editPlayerCaptain");

  let player = source === "pitch" ? startingXI[index] : substitutes[index];

  // Populate inputs with current player info
  title.textContent = source === "pitch" ? `Edit ${player.name}` : `Substitute: ${player.name}`;
  subtitle.textContent = source === "pitch" ? `Starting Lineup • Position ${player.pos}` : `Bench Reserve`;
  jerseyPreview.textContent = player.num;
  jerseyPreview.style.background = player.pos === "GK" ? gkKitColor : outfieldKitColor;

  nameInput.value = player.name;
  numberInput.value = player.num;
  posSelect.value = player.pos;
  roleSelect.value = player.role || "Standard";
  captainCheck.checked = !!player.isCaptain;

  // Populate the Swap Dropdown
  swapSelect.innerHTML = '<option value="">-- No Substitution --</option>';

  if (source === "pitch") {
    // If editing a pitch player, show all available bench players to sub in
    quickSubGroup.style.display = "block";
    substitutes.forEach((sub, subIdx) => {
      const opt = document.createElement("option");
      opt.value = subIdx;
      opt.textContent = `⇄ Sub In: #${sub.num} ${sub.name} (${sub.pos})`;
      swapSelect.appendChild(opt);
    });
  } else {
    // If editing a bench player, show all pitch players to replace
    quickSubGroup.style.display = "block";
    quickSubGroup.querySelector("label").textContent = "Swap onto pitch for starting player:";
    startingXI.forEach((pitchPlayer, pIdx) => {
      const opt = document.createElement("option");
      opt.value = pIdx;
      opt.textContent = `⇄ Replace: #${pitchPlayer.num} ${pitchPlayer.name} (${pitchPlayer.pos})`;
      swapSelect.appendChild(opt);
    });
  }

  // Show modal
  modal.classList.add("active");
}

function closeModal() {
  const modal = document.getElementById("playerModal");
  modal.classList.remove("active");
}

function savePlayerChanges() {
  const nameInput = document.getElementById("editPlayerName");
  const numberInput = document.getElementById("editPlayerNumber");
  const posSelect = document.getElementById("editPlayerPosition");
  const roleSelect = document.getElementById("editPlayerRole");
  const captainCheck = document.getElementById("editPlayerCaptain");
  const swapSelect = document.getElementById("swapWithSubSelect");

  const newName = nameInput.value.trim();
  const newNum = parseInt(numberInput.value, 10);
  const newPos = posSelect.value;
  const newRole = roleSelect.value;
  const isCap = captainCheck.checked;

  if (!newName) {
    alert("Player name cannot be empty.");
    return;
  }

  // Check if a substitution swap was requested
  const swapTargetIndex = swapSelect.value;
  if (swapTargetIndex !== "") {
    performSubstitution(activeEditingSource, activeEditingIndex, parseInt(swapTargetIndex, 10));
    closeModal();
    return;
  }

  // Otherwise, update existing player details
  if (activeEditingSource === "pitch") {
    const player = startingXI[activeEditingIndex];
    player.name = newName;
    player.num = isNaN(newNum) ? player.num : newNum;
    player.pos = newPos;
    player.role = newRole;

    // If this player is set as captain, remove captain status from everyone else
    if (isCap) {
      startingXI.forEach((p) => (p.isCaptain = false));
      player.isCaptain = true;
    } else {
      player.isCaptain = false;
    }
  } else {
    // Editing a bench player
    const sub = substitutes[activeEditingIndex];
    sub.name = newName;
    sub.num = isNaN(newNum) ? sub.num : newNum;
    sub.pos = newPos;
    sub.role = newRole;
  }

  // Update both views
  renderPitchPlayers();
  renderStartingRosterList();
  renderBenchRosterList();
  closeModal();

  showToast("Player details updated successfully!");
}

/**
 * Swaps a bench player with a pitch player
 */
function performSubstitution(source, sourceIndex, targetIndex) {
  let pitchPlayerIndex, benchPlayerIndex;

  if (source === "pitch") {
    pitchPlayerIndex = sourceIndex;
    benchPlayerIndex = targetIndex;
  } else {
    pitchPlayerIndex = targetIndex;
    benchPlayerIndex = sourceIndex;
  }

  const pitchPlayer = startingXI[pitchPlayerIndex];
  const benchPlayer = substitutes[benchPlayerIndex];

  // Preserve pitch coordinates and captaincy rules
  const currentX = pitchPlayer.x;
  const currentY = pitchPlayer.y;
  const wasCaptain = pitchPlayer.isCaptain;

  // Create swapped objects
  const newPitchPlayer = {
    name: benchPlayer.name,
    num: benchPlayer.num,
    pos: benchPlayer.pos,
    role: benchPlayer.role || "Standard",
    x: currentX,
    y: currentY,
    isCaptain: wasCaptain
  };

  const newBenchPlayer = {
    id: Date.now(),
    name: pitchPlayer.name,
    num: pitchPlayer.num,
    pos: pitchPlayer.pos,
    role: pitchPlayer.role
  };

  // Replace in arrays
  startingXI[pitchPlayerIndex] = newPitchPlayer;
  substitutes[benchPlayerIndex] = newBenchPlayer;

  // Refresh UI
  renderPitchPlayers();
  renderStartingRosterList();
  renderBenchRosterList();

  showToast(`Substituted: ${benchPlayer.name} IN ⇄ ${pitchPlayer.name} OUT`);
}

// ------------------------------------------------------------------------------
// 8. TACTICAL SETTINGS & COLOR CUSTOMIZATION
// ------------------------------------------------------------------------------
function setupKitColorPickers() {
  const outfieldPicker = document.getElementById("jerseyColorPicker");
  const gkPicker = document.getElementById("gkColorPicker");
  const teamBadge = document.getElementById("teamBadge");

  outfieldPicker.addEventListener("input", (e) => {
    outfieldKitColor = e.target.value;
    document.documentElement.style.setProperty("--kit-outfield", outfieldKitColor);
    teamBadge.style.background = `linear-gradient(135deg, ${outfieldKitColor}, #1d4ed8)`;
    renderPitchPlayers();
  });

  gkPicker.addEventListener("input", (e) => {
    gkKitColor = e.target.value;
    document.documentElement.style.setProperty("--kit-gk", gkKitColor);
    renderPitchPlayers();
  });
}

function setupMentalitySelector() {
  const buttons = document.querySelectorAll(".mentality-btn");
  const slider = document.getElementById("lineHeightSlider");
  const label = document.getElementById("lineHeightVal");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const mentality = btn.dataset.mentality;
      if (mentality === "defensive") {
        slider.value = 1;
        label.textContent = "Deep Block";
        shiftDefensiveLine(6); // Push defenders back slightly
      } else if (mentality === "balanced") {
        slider.value = 2;
        label.textContent = "Standard";
        applyFormation(currentFormation); // Reset to base formation
      } else if (mentality === "attacking") {
        slider.value = 3;
        label.textContent = "High Press Line";
        shiftDefensiveLine(-6); // Push defenders higher up the pitch
      }
    });
  });

  slider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10);
    if (val === 1) {
      label.textContent = "Deep Block";
      shiftDefensiveLine(6);
    } else if (val === 2) {
      label.textContent = "Standard";
      applyFormation(currentFormation);
    } else {
      label.textContent = "High Press Line";
      shiftDefensiveLine(-6);
    }
  });
}

/**
 * Shifts outfield players up or down according to the defensive line slider
 */
function shiftDefensiveLine(offsetY) {
  startingXI.forEach((player) => {
    if (player.pos !== "GK") {
      player.y = Math.max(10, Math.min(84, player.y + offsetY));
    }
  });
  renderPitchPlayers();
}

// ------------------------------------------------------------------------------
// 9. EXPORT LINEUP & RESET BUTTONS
// ------------------------------------------------------------------------------
function setupExportAndResetButtons() {
  const resetBtn = document.getElementById("resetFormationBtn");
  const exportBtn = document.getElementById("exportBtn");
  const exportModal = document.getElementById("exportModal");
  const closeExport1 = document.getElementById("exportCloseBtn");
  const closeExport2 = document.getElementById("exportCloseBtn2");

  // Reset to default positions for current formation
  resetBtn.addEventListener("click", () => {
    applyFormation(currentFormation);
    showToast(`Reset to default ${currentFormation} positions!`);
  });

  // Open Export Modal
  exportBtn.addEventListener("click", () => {
    const reportBox = document.getElementById("exportReportContent");
    const teamName = document.getElementById("teamNameInput").value || "Tactix Pro FC";

    let startingHtml = startingXI.map((p) => `
      <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <span><strong>#${p.num}</strong> ${p.name} ${p.isCaptain ? "<em>(Captain)</em>" : ""}</span>
        <span style="color: #00e676; font-weight: 700;">${p.pos} (${p.role || "Standard"})</span>
      </div>
    `).join("");

    let benchHtml = substitutes.map((s) => `
      <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <span>#${s.num} ${s.name}</span>
        <span style="color: #94a3b8;">${s.pos}</span>
      </div>
    `).join("");

    reportBox.innerHTML = `
      <div class="export-report">
        <h2 style="color: #fff; font-size: 18px; margin-bottom: 4px;">${teamName}</h2>
        <p style="color: #94a3b8; font-size: 12px; margin-bottom: 14px;">Formation: <strong>${currentFormation}</strong> | Date: ${new Date().toLocaleDateString()}</p>
        
        <div class="export-section-title">Starting Lineup (11 Players)</div>
        ${startingHtml}

        <div class="export-section-title">Substitutes Bench (${substitutes.length} Reserves)</div>
        ${benchHtml}
      </div>
    `;

    exportModal.classList.add("active");
  });

  closeExport1.addEventListener("click", () => exportModal.classList.remove("active"));
  closeExport2.addEventListener("click", () => exportModal.classList.remove("active"));
  exportModal.addEventListener("click", (e) => {
    if (e.target === exportModal) exportModal.classList.remove("active");
  });
}

// ------------------------------------------------------------------------------
// 10. HELPER UTILITY: Toast Notification
// ------------------------------------------------------------------------------
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById("toastMessage");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}
