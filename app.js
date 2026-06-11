const STORAGE_KEY = "intervenor-scheduler-v2";
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const shortDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const sampleState = {
  members: [
    {
      id: "m1",
      name: "Mary Mae Agustin",
      role: "Photojournalist",
      first: 12,
      second: 8,
      school: [
        { id: "s1", day: 1, start: "08:00", end: "10:00", subject: "Oral Communication" },
        { id: "s2", day: 3, start: "13:00", end: "15:00", subject: "Statistics" }
      ]
    },
    {
      id: "m2",
      name: "John Carl Balbuena",
      role: "Photojournalist",
      first: 12,
      second: 7,
      school: [
        { id: "s3", day: 2, start: "09:00", end: "12:00", subject: "Research" },
        { id: "s4", day: 5, start: "14:00", end: "16:00", subject: "PE" }
      ]
    },
    {
      id: "m3",
      name: "ArtNibeld Belisario",
      role: "Writer",
      first: 6,
      second: 6,
      school: [
        { id: "s5", day: 1, start: "10:30", end: "12:00", subject: "Philosophy" },
        { id: "s6", day: 4, start: "08:00", end: "11:00", subject: "Media class" }
      ]
    },
    {
      id: "m4",
      name: "Shakira Nicole Billones",
      role: "Layout Artist",
      first: 0,
      second: 6,
      school: [
        { id: "s7", day: 3, start: "07:30", end: "09:30", subject: "Creative Writing" }
      ]
    }
  ],
  events: [
    {
      id: "e1",
      title: "Flag ceremony coverage",
      date: todayValue(),
      start: "07:00",
      end: "08:30",
      needed: 2,
      assigned: [],
      semester: "both"
    }
  ]
};

let state = loadState();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const elements = {
  tabs: $$(".tab-button"),
  panels: $$(".tab-panel"),
  eventForm: $("#eventForm"),
  memberForm: $("#memberForm"),
  schoolForm: $("#schoolForm"),
  eventList: $("#eventList"),
  completedList: $("#completedList"),
  memberList: $("#memberList"),
  scheduleBoard: $("#scheduleBoard"),
  schoolMember: $("#schoolMember"),
  emptyTemplate: $("#emptyTemplate"),
  nextEventTitle: $("#nextEventTitle"),
  nextEventMeta: $("#nextEventMeta"),
  memberCount: $("#memberCount")
};

initialize();

function initialize() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    state = structuredClone(sampleState);
    autoAssignAll(false);
    saveState();
  }

  elements.tabs.forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tab));
  });

  elements.eventForm.addEventListener("submit", addEvent);
  elements.memberForm.addEventListener("submit", addMember);
  elements.schoolForm.addEventListener("submit", addSchoolBlock);
  $("#addManualButton").addEventListener("click", addEventManually);
  $("#autoAssignAllButton").addEventListener("click", () => {
    autoAssignAll();
    render();
  });
  $("#sortMembersButton").addEventListener("click", () => {
    state.members.sort((a, b) => totalOutputs(a) - totalOutputs(b) || a.name.localeCompare(b.name));
    saveState();
    render();
  });
  $("#sortMembersAlphaButton").addEventListener("click", () => {
    state.members.sort((a, b) => a.name.localeCompare(b.name));
    saveState();
    render();
  });
  $("#clearScheduleButton").addEventListener("click", clearAllSchedules);
  $("#memberRole").addEventListener("change", toggleCustomRole);

  registerServiceWorker();
  $("#eventDate").value = todayValue();
  toggleCustomRole();
  render();
}

function activateTab(tabName) {
  elements.tabs.forEach((button) => button.classList.toggle("active", button.dataset.tab === tabName));
  elements.panels.forEach((panel) => panel.classList.toggle("active", panel.id === `${tabName}Panel`));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || structuredClone(sampleState);
    saved.members ||= [];
    saved.events ||= [];
    saved.events.forEach((event) => {
      event.completed ||= false;
      event.assigned ||= [];
      event.semester ||= "both";
    });
    return saved;
  } catch {
    return structuredClone(sampleState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function todayValue() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function addEvent(event) {
  event.preventDefault();
  const newEvent = {
    id: uid("event"),
    title: $("#eventTitle").value.trim(),
    date: $("#eventDate").value,
    start: $("#eventStart").value,
    end: $("#eventEnd").value,
    needed: Math.max(1, Number($("#eventNeeded").value)),
    assigned: [],
    semester: $("#eventSemester").value
  };

  if (!isValidTimeRange(newEvent.start, newEvent.end)) {
    alert("Event end time must be after start time.");
    return;
  }

  state.events.unshift(newEvent);
  assignEvent(newEvent.id, true);
  event.target.reset();
  $("#eventDate").value = todayValue();
  $("#eventNeeded").value = 2;
  $("#eventStart").value = "09:00";
  $("#eventEnd").value = "11:00";
  $("#eventSemester").value = "both";
  saveState();
  render();
}

function addEventManually(event) {
  event.preventDefault();
  const newEvent = {
    id: uid("event"),
    title: $("#eventTitle").value.trim(),
    date: $("#eventDate").value,
    start: $("#eventStart").value,
    end: $("#eventEnd").value,
    needed: Math.max(1, Number($("#eventNeeded").value)),
    assigned: [],
    semester: $("#eventSemester").value
  };

  if (!isValidTimeRange(newEvent.start, newEvent.end)) {
    alert("Event end time must be after start time.");
    return;
  }

  state.events.unshift(newEvent);
  elements.eventForm.reset();
  $("#eventDate").value = todayValue();
  $("#eventNeeded").value = 2;
  $("#eventStart").value = "09:00";
  $("#eventEnd").value = "11:00";
  $("#eventSemester").value = "both";
  saveState();
  render();
  activateTab("events");
}

function addMember(event) {
  event.preventDefault();
  const name = $("#memberName").value.trim();
  const role = getSelectedRole();
  if (!name) return;
  if (!role) {
    alert("Please enter a custom role.");
    return;
  }

  state.members.push({
    id: uid("member"),
    name,
    role,
    first: Math.max(0, Number($("#memberFirst").value || 0)),
    second: Math.max(0, Number($("#memberSecond").value || 0)),
    school: []
  });

  event.target.reset();
  $("#memberFirst").value = 0;
  $("#memberSecond").value = 0;
  toggleCustomRole();
  saveState();
  render();
}

function getSelectedRole() {
  const selected = $("#memberRole").value;
  if (selected !== "custom") return selected;
  return $("#customRole").value.trim();
}

function toggleCustomRole() {
  const isCustom = $("#memberRole").value === "custom";
  $("#customRoleWrap").classList.toggle("active", isCustom);
  $("#customRole").required = isCustom;
  if (!isCustom) $("#customRole").value = "";
}

function addSchoolBlock(event) {
  event.preventDefault();
  const member = state.members.find((item) => item.id === $("#schoolMember").value);
  if (!member) {
    alert("Add a member first.");
    return;
  }

  const block = {
    id: uid("school"),
    day: Number($("#schoolDay").value),
    start: $("#schoolStart").value,
    end: $("#schoolEnd").value,
    subject: $("#schoolSubject").value.trim() || "School schedule"
  };

  if (!isValidTimeRange(block.start, block.end)) {
    alert("Schedule end time must be after start time.");
    return;
  }

  member.school.push(block);
  member.school.sort((a, b) => a.day - b.day || toMinutes(a.start) - toMinutes(b.start));
  event.target.reset();
  $("#schoolStart").value = "08:00";
  $("#schoolEnd").value = "10:00";
  saveState();
  render();
}

function assignEvent(eventId, incrementOutput = false) {
  const event = state.events.find((item) => item.id === eventId);
  if (!event) return;

  const candidates = state.members
    .filter((member) => !hasSchoolConflict(member, event) && !hasEventConflict(member, event))
    .sort((a, b) => totalOutputs(a) - totalOutputs(b) || a.name.localeCompare(b.name));

  const selected = candidates.slice(0, event.needed).map((member) => member.id);
  const added = selected.filter((id) => !event.assigned.includes(id));
  event.assigned = selected;

  if (incrementOutput) {
    added.forEach((id) => {
      const member = state.members.find((item) => item.id === id);
      if (member) member.second += 1;
    });
  }

  saveState();
}

function autoAssignAll(incrementOutput = false) {
  state.events.forEach((event) => assignEvent(event.id, incrementOutput));
  saveState();
}

function hasSchoolConflict(member, event) {
  const eventDay = new Date(`${event.date}T00:00:00`).getDay();
  return member.school.some((block) => {
    return block.day === eventDay && rangesOverlap(event.start, event.end, block.start, block.end);
  });
}

function hasEventConflict(member, event) {
  return state.events.some((other) => {
    if (other.id === event.id || !other.assigned.includes(member.id)) return false;
    return other.date === event.date && rangesOverlap(event.start, event.end, other.start, other.end);
  });
}

function rangesOverlap(startA, endA, startB, endB) {
  return toMinutes(startA) < toMinutes(endB) && toMinutes(startB) < toMinutes(endA);
}

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function isValidTimeRange(start, end) {
  return start && end && toMinutes(end) > toMinutes(start);
}

function totalOutputs(member) {
  return Number(member.first || 0) + Number(member.second || 0);
}

function render() {
  renderSummary();
  renderEvents();
  renderCompletedEvents();
  renderMembers();
  renderSchoolMemberOptions();
  renderSchedule();
}

function renderSummary() {
  elements.memberCount.textContent = state.members.length;
  const now = new Date();
  const next = [...state.events]
    .filter((event) => !event.completed && new Date(`${event.date}T${event.end}`) >= now)
    .sort((a, b) => `${a.date}T${a.start}`.localeCompare(`${b.date}T${b.start}`))[0];

  if (!next) {
    elements.nextEventTitle.textContent = "No upcoming event";
    elements.nextEventMeta.textContent = "Your event list is clear.";
    return;
  }

  const assignedNames = next.assigned.map(memberName).join(", ") || "Needs assignment";
  elements.nextEventTitle.textContent = next.title;
  elements.nextEventMeta.textContent = `${formatDate(next.date)} - ${formatTime(next.start)}-${formatTime(next.end)} - ${assignedNames}`;
}

function renderEvents() {
  const activeEvents = state.events.filter((event) => !event.completed);
  if (!activeEvents.length) {
    renderEmpty(elements.eventList);
    return;
  }

  elements.eventList.innerHTML = activeEvents.map((event) => renderEventCard(event, "active")).join("");
  bindEventActions(elements.eventList);
}

function renderCompletedEvents() {
  const completedEvents = state.events.filter((event) => event.completed);
  if (!completedEvents.length) {
    renderEmpty(elements.completedList);
    return;
  }

  elements.completedList.innerHTML = completedEvents.map((event) => renderEventCard(event, "completed")).join("");
  bindEventActions(elements.completedList);
}

function renderEventCard(event, mode) {
    const assigned = event.assigned.map(memberName);
    const missing = Math.max(0, event.needed - assigned.length);
  const statusClass = event.completed ? "ok" : missing === 0 ? "ok" : "warn";
  const statusText = event.completed ? "Done" : missing === 0 ? "Ready" : `${missing} needed`;
  const doneButton = event.completed
    ? `<button class="ghost-button" type="button" data-action="reopen-event" data-id="${event.id}">Reopen</button>`
    : `<button class="primary-button" type="button" data-action="complete-event" data-id="${event.id}">Mark done</button>`;
  const semesterLabel = event.semester === "both" ? "Both semesters" : event.semester === "1st" ? "1st Sem" : "2nd Sem";

    return `
      <article class="event-card">
        <div class="card-top">
          <div>
            <h3 class="card-title">${escapeHtml(event.title)}</h3>
            <p class="meta">${formatDate(event.date)} - ${formatTime(event.start)}-${formatTime(event.end)} - ${dayNames[new Date(`${event.date}T00:00:00`).getDay()]}</p>
            <p class="meta">${semesterLabel}</p>
          </div>
          <span class="badge ${statusClass}">${statusText}</span>
        </div>
        <div class="assigned-row">
          ${assigned.length ? assigned.map((name) => `<span class="assigned-chip">${escapeHtml(name)}</span>`).join("") : `<span class="badge bad">No available member yet</span>`}
        </div>
        <details class="assignment-editor">
          <summary class="assignment-toggle">Edit assignments</summary>
          <div class="assignment-grid">
            ${renderAssignmentControls(event)}
          </div>
        </details>
        <div class="event-actions">
          <button class="ghost-button" type="button" data-action="assign-event" data-id="${event.id}">Auto assign</button>
          ${doneButton}
          <button class="danger-button" type="button" data-action="delete-event" data-id="${event.id}">Delete</button>
        </div>
      </article>
    `;
}

function bindEventActions(container) {
  container.querySelectorAll("[data-action='assign-event']").forEach((button) => {
    button.addEventListener("click", () => {
      assignEvent(button.dataset.id);
      render();
    });
  });

  container.querySelectorAll("[data-action='transfer-event']").forEach((select) => {
    select.addEventListener("change", () => {
      transferEventSlot(select.dataset.id, Number(select.dataset.slot), select.value);
    });
  });

  container.querySelectorAll("[data-action='remove-assignment']").forEach((button) => {
    button.addEventListener("click", () => {
      removeEventAssignment(button.dataset.id, Number(button.dataset.slot));
    });
  });

  container.querySelectorAll("[data-action='add-assignment']").forEach((button) => {
    button.addEventListener("click", () => {
      addEventAssignmentSlot(button.dataset.id);
    });
  });

  container.querySelectorAll("[data-action='complete-event']").forEach((button) => {
    button.addEventListener("click", () => {
      setEventCompleted(button.dataset.id, true);
    });
  });

  container.querySelectorAll("[data-action='reopen-event']").forEach((button) => {
    button.addEventListener("click", () => {
      setEventCompleted(button.dataset.id, false);
    });
  });

  container.querySelectorAll("[data-action='delete-event']").forEach((button) => {
    button.addEventListener("click", () => {
      state.events = state.events.filter((event) => event.id !== button.dataset.id);
      saveState();
      render();
    });
  });
}

function renderAssignmentControls(event) {
  const slotCount = Math.max(event.needed, event.assigned.length || 1);
  return Array.from({ length: slotCount }, (_, slot) => {
    const selectedId = event.assigned[slot] || "";
    const options = [
      `<option value="">Unassigned</option>`,
      ...state.members.map((member) => {
        const conflict = member.id !== selectedId && memberHasConflictForTransfer(member, event);
        const duplicate = member.id !== selectedId && event.assigned.includes(member.id);
        const disabled = conflict || duplicate ? " disabled" : "";
        const note = conflict ? " - conflict" : duplicate ? " - already assigned" : "";
        const selected = member.id === selectedId ? " selected" : "";
        return `<option value="${member.id}"${selected}${disabled}>${escapeHtml(member.name)}${note}</option>`;
      })
    ].join("");

    return `
      <div style="display: grid; gap: 6px;">
        <label>
          Assignment ${slot + 1}
          <select data-action="transfer-event" data-id="${event.id}" data-slot="${slot}">
            ${options}
          </select>
        </label>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
          <button class="ghost-button" type="button" data-action="remove-assignment" data-id="${event.id}" data-slot="${slot}" style="font-size: 0.8rem; min-height: 36px;">Remove</button>
          ${slot === slotCount - 1 ? `<button class="ghost-button" type="button" data-action="add-assignment" data-id="${event.id}" style="font-size: 0.8rem; min-height: 36px;">+ Add</button>` : `<div></div>`}
        </div>
      </div>
    `;
  }).join("");
}

function renderMembers() {
  if (!state.members.length) {
    renderEmpty(elements.memberList);
    return;
  }

  elements.memberList.innerHTML = state.members.map((member) => `
    <article class="member-card">
      <div class="member-grid">
        <div>
          <h3 class="card-title">${escapeHtml(member.name)}</h3>
          <p class="meta">${escapeHtml(member.role)} - ${member.school.length} school block${member.school.length === 1 ? "" : "s"}</p>
        </div>
      </div>
      <div class="badge-row">
        <span class="badge">1st Sem: ${member.first}</span>
        <span class="badge">2nd Sem: ${member.second}</span>
        <span class="badge ok">Total: ${totalOutputs(member)}</span>
      </div>
      <div class="output-box" aria-label="Output counter">
        <div style="display: grid; gap: 8px; grid-template-columns: 1fr 1fr;">
          <div>
            <small style="color: #667085; font-weight: 800; display: block; margin-bottom: 4px;">1st Sem</small>
            <div style="display: grid; grid-template-columns: 40px minmax(56px, 72px) 40px; gap: 6px; align-items: center;">
              <button class="counter-button" type="button" data-action="minus-output-first" data-id="${member.id}" aria-label="Decrease 1st sem">-</button>
              <input class="output-input" type="number" min="0" value="${member.first}" data-action="edit-output-first" data-id="${member.id}" aria-label="1st sem outputs">
              <button class="counter-button" type="button" data-action="plus-output-first" data-id="${member.id}" aria-label="Increase 1st sem">+</button>
            </div>
          </div>
          <div>
            <small style="color: #667085; font-weight: 800; display: block; margin-bottom: 4px;">2nd Sem</small>
            <div style="display: grid; grid-template-columns: 40px minmax(56px, 72px) 40px; gap: 6px; align-items: center;">
              <button class="counter-button" type="button" data-action="minus-output-second" data-id="${member.id}" aria-label="Decrease 2nd sem">-</button>
              <input class="output-input" type="number" min="0" value="${member.second}" data-action="edit-output-second" data-id="${member.id}" aria-label="2nd sem outputs">
              <button class="counter-button" type="button" data-action="plus-output-second" data-id="${member.id}" aria-label="Increase 2nd sem">+</button>
            </div>
          </div>
        </div>
      </div>
      <div class="member-actions">
        <button class="danger-button" type="button" data-action="delete-member" data-id="${member.id}">Delete</button>
      </div>
    </article>
  `).join("");

  elements.memberList.querySelectorAll("[data-action='plus-output-first']").forEach((button) => {
    button.addEventListener("click", () => updateMemberOutput(button.dataset.id, 1, "first"));
  });
  elements.memberList.querySelectorAll("[data-action='minus-output-first']").forEach((button) => {
    button.addEventListener("click", () => updateMemberOutput(button.dataset.id, -1, "first"));
  });
  elements.memberList.querySelectorAll("[data-action='plus-output-second']").forEach((button) => {
    button.addEventListener("click", () => updateMemberOutput(button.dataset.id, 1, "second"));
  });
  elements.memberList.querySelectorAll("[data-action='minus-output-second']").forEach((button) => {
    button.addEventListener("click", () => updateMemberOutput(button.dataset.id, -1, "second"));
  });
  elements.memberList.querySelectorAll("[data-action='edit-output-first']").forEach((input) => {
    input.addEventListener("change", () => setMemberOutput(input.dataset.id, Number(input.value || 0), "first"));
  });
  elements.memberList.querySelectorAll("[data-action='edit-output-second']").forEach((input) => {
    input.addEventListener("change", () => setMemberOutput(input.dataset.id, Number(input.value || 0), "second"));
  });
  elements.memberList.querySelectorAll("[data-action='delete-member']").forEach((button) => {
    button.addEventListener("click", () => deleteMember(button.dataset.id));
  });
}

function renderSchoolMemberOptions() {
  elements.schoolMember.innerHTML = state.members.length
    ? state.members.map((member) => `<option value="${member.id}">${escapeHtml(member.name)}</option>`).join("")
    : `<option value="">Add member first</option>`;
}

function renderSchedule() {
  if (!state.members.some((member) => member.school.length)) {
    renderEmpty(elements.scheduleBoard);
    return;
  }

  const blocksByDay = dayNames.map((_, day) => {
    return state.members.flatMap((member) => {
      return member.school
        .filter((block) => block.day === day)
        .map((block) => ({ ...block, memberName: member.name, memberId: member.id }));
    }).sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
  });

  elements.scheduleBoard.innerHTML = blocksByDay.map((blocks, day) => `
    <section class="day-column">
      <div class="day-title">
        <span>${dayNames[day]}</span>
        <span class="badge">${blocks.length}</span>
      </div>
      ${blocks.length ? blocks.map((block) => `
        <div class="schedule-block">
          <strong>${escapeHtml(block.memberName)}</strong>
          <small>${formatTime(block.start)}-${formatTime(block.end)} - ${escapeHtml(block.subject)}</small>
          <button class="ghost-button" type="button" data-action="delete-school" data-member="${block.memberId}" data-id="${block.id}">Remove</button>
        </div>
      `).join("") : `<p class="meta">No classes on ${shortDayNames[day]}.</p>`}
    </section>
  `).join("");

  elements.scheduleBoard.querySelectorAll("[data-action='delete-school']").forEach((button) => {
    button.addEventListener("click", () => {
      const member = state.members.find((item) => item.id === button.dataset.member);
      if (member) {
        member.school = member.school.filter((block) => block.id !== button.dataset.id);
        saveState();
        render();
      }
    });
  });
}

function updateMemberOutput(memberId, delta, semester) {
  const member = state.members.find((item) => item.id === memberId);
  if (!member) return;
  if (semester === "first") {
    member.first = Math.max(0, Number(member.first || 0) + delta);
  } else if (semester === "second") {
    member.second = Math.max(0, Number(member.second || 0) + delta);
  }
  saveState();
  render();
}

function setMemberOutput(memberId, value, semester) {
  const member = state.members.find((item) => item.id === memberId);
  if (!member) return;
  if (semester === "first") {
    member.first = Math.max(0, value);
  } else if (semester === "second") {
    member.second = Math.max(0, value);
  }
  saveState();
  render();
}

function transferEventSlot(eventId, slot, memberId) {
  const event = state.events.find((item) => item.id === eventId);
  if (!event) return;

  if (!memberId) {
    event.assigned.splice(slot, 1);
    saveState();
    render();
    return;
  }

  const member = state.members.find((item) => item.id === memberId);
  if (!member) return;

  if (event.assigned.includes(memberId) && event.assigned[slot] !== memberId) {
    alert("That member is already assigned to this event.");
    render();
    return;
  }

  if (memberHasConflictForTransfer(member, event)) {
    alert(`${member.name} has a conflict during this event.`);
    render();
    return;
  }

  event.assigned[slot] = memberId;
  event.assigned = event.assigned.filter(Boolean).slice(0, Math.max(event.needed, event.assigned.length));
  saveState();
  render();
}

function removeEventAssignment(eventId, slot) {
  const event = state.events.find((item) => item.id === eventId);
  if (!event) return;

  if (event.assigned.length === 1) {
    event.assigned[slot] = "";
  } else {
    event.assigned.splice(slot, 1);
  }

  saveState();
  render();
}

function addEventAssignmentSlot(eventId) {
  const event = state.events.find((item) => item.id === eventId);
  if (!event) return;
  if (event.assigned.length < state.members.length) {
    event.assigned.push("");
    saveState();
    render();
  }
}

function setEventCompleted(eventId, completed) {
  const event = state.events.find((item) => item.id === eventId);
  if (!event) return;

  if (completed && event.assigned.length < event.needed) {
    alert("Assign all needed members before marking this event done.");
    return;
  }

  event.completed = completed;
  saveState();
  render();
}

function memberHasConflictForTransfer(member, event) {
  return hasSchoolConflict(member, event) || hasEventConflict(member, event);
}

function deleteMember(memberId) {
  const member = state.members.find((item) => item.id === memberId);
  if (!member) return;

  if (!confirm(`Are you sure you want to SaShey away ${escapeHtml(member.name)}?`)) {
    return;
  }

  state.members = state.members.filter((m) => m.id !== memberId);
  state.events.forEach((event) => {
    event.assigned = event.assigned.filter((id) => id !== memberId);
  });
  saveState();
  render();
}

function clearAllSchedules() {
  state.members.forEach((member) => {
    member.school = [];
  });
  saveState();
  render();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

function renderEmpty(container) {
  container.innerHTML = elements.emptyTemplate.innerHTML;
}

function memberName(id) {
  return state.members.find((member) => member.id === id)?.name || "Removed member";
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T00:00:00`));
}

function formatTime(value) {
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date(`2026-01-01T${value}`));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
