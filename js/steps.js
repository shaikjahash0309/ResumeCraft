// steps.js — Renders each wizard step

const Steps = {
  // ── Step 0: Personal Info ─────────────────────
  step0(state) {
    return `
    <div class="step-wrap">
      <div class="step-header">
        <div class="step-eyebrow">Step 1 of 7</div>
        <h2 class="step-title">Personal Information</h2>
        <p class="step-sub">Your basic contact details. Only what matters.</p>
      </div>

      <div class="two-col">
        <div class="field">
          <label class="field-label">Full Name *</label>
          <input class="rc-input" id="f-name" type="text" placeholder="e.g. Arjun Sharma" value="${_esc(state.name || '')}" autocomplete="name" />
        </div>
        <div class="field">
          <label class="field-label">Father's Name</label>
          <input class="rc-input" id="f-father" type="text" placeholder="e.g. Ramesh Sharma" value="${_esc(state.fatherName || '')}" />
        </div>
      </div>

      <div class="two-col">
        <div class="field">
          <label class="field-label">Email *</label>
          <input class="rc-input" id="f-email" type="email" placeholder="you@email.com" value="${_esc(state.email || '')}" autocomplete="email" />
        </div>
        <div class="field">
          <label class="field-label">Phone *</label>
          <input class="rc-input" id="f-phone" type="tel" placeholder="+91 99999 99999" value="${_esc(state.phone || '')}" autocomplete="tel" />
        </div>
      </div>

      <div class="two-col">
        <div class="field">
          <label class="field-label">Date of Birth</label>
          <input class="rc-input" id="f-dob" type="text" placeholder="DD/MM/YYYY" value="${_esc(state.dob || '')}" />
        </div>
        <div class="field">
          <label class="field-label">Gender</label>
          <div class="option-chips" id="gender-chips">
            ${["Male","Female","Prefer not to say"].map(g =>
              `<button class="chip ${state.gender === g ? 'active' : ''}" data-gender="${g}">${g}</button>`
            ).join("")}
          </div>
        </div>
      </div>

      <div class="field">
        <label class="field-label">Address</label>
        <input class="rc-input" id="f-address" type="text" placeholder="City, State, Pincode" value="${_esc(state.address || '')}" />
      </div>
    </div>`;
  },

  bindStep0(state) {
    const bind = (id, key) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", e => { state[key] = e.target.value; App.validate(); });
    };
    bind("f-name",    "name");
    bind("f-father",  "fatherName");
    bind("f-email",   "email");
    bind("f-phone",   "phone");
    bind("f-dob",     "dob");
    bind("f-address", "address");

    document.querySelectorAll("#gender-chips .chip").forEach(btn => {
      btn.addEventListener("click", () => {
        state.gender = btn.dataset.gender;
        document.querySelectorAll("#gender-chips .chip").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  },

  // ── Step 1: Role & Template ───────────────────
  step1(state) {
    return `
    <div class="step-wrap">
      <div class="step-header">
        <div class="step-eyebrow">Step 2 of 7</div>
        <h2 class="step-title">Role & Template</h2>
        <p class="step-sub">Choose what describes you best, then pick a resume style.</p>
      </div>

      <div class="field">
        <label class="field-label">I am a…</label>
        <div class="role-grid" id="role-grid">
          ${RC_DATA.roles.map(r => `
            <button class="role-card ${state.role === r.id ? 'selected' : ''}" data-role="${r.id}">
              <span class="role-icon">${r.icon}</span>
              <span class="role-label">${r.label}</span>
            </button>`).join("")}
        </div>
      </div>

      <div class="divider"></div>

      <div class="field">
        <label class="field-label">Resume Template</label>
        <div class="two-col" id="template-grid">
          ${RC_DATA.templates.map(t => `
            <button class="select-card ${state.template === t.id ? 'selected' : ''}" data-tmpl="${t.id}">
              <span class="sc-icon">📄</span>
              ${t.label}
            </button>`).join("")}
        </div>
      </div>
    </div>`;
  },

  bindStep1(state) {
    document.querySelectorAll("#role-grid .role-card").forEach(btn => {
      btn.addEventListener("click", () => {
        state.role = btn.dataset.role;
        document.querySelectorAll("#role-grid .role-card").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        App.validate();
      });
    });
    document.querySelectorAll("#template-grid .select-card").forEach(btn => {
      btn.addEventListener("click", () => {
        state.template = btn.dataset.tmpl;
        document.querySelectorAll("#template-grid .select-card").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        App.validate();
      });
    });
  },

  // ── Step 2: Education ─────────────────────────
  step2(state) {
    if (!state.education || state.education.length === 0) {
      state.education = [{ degree: "", institute: "", year: "", percent: "" }];
    }
    return `
    <div class="step-wrap">
      <div class="step-header">
        <div class="step-eyebrow">Step 3 of 7</div>
        <h2 class="step-title">Education</h2>
        <p class="step-sub">Add your qualifications in reverse order. Include percentage or CGPA.</p>
      </div>

      <div class="edu-table-wrap">
  <table class="edu-input-table">
    <thead>
      <tr>
        <th>Degree</th>
        <th>Institute</th>
        <th>Year of Passing</th>
        <th>Percentage / CGPA</th>
      </tr>
    </thead>

    <tbody id="edu-tbody">
      ${state.education.map((row, i) => this._eduRow(row, i)).join("")}
    </tbody>
  </table>
</div>

<div class="edu-actions">
  <button type="button" id="btn-add-higher" class="btn-secondary">
    🎓 Add Higher Qualification
  </button>
</div>


      <p class="hint" style="margin-top:0.5rem;">Rows will be sorted by year automatically in the resume.</p>
    </div>`;
  },

 _eduRow(row, i) {
  return `
    <tr data-idx="${i}">
      <td>
        <input
          class="edu-inp"
          data-key="degree"
          value="${row.degree}"
        />
      </td>

      <td>
        <input
          class="edu-inp"
          data-key="institute"
          placeholder="School / College"
          value="${row.institute}"
        />
      </td>

      <td>
        <input
          class="edu-inp"
          data-key="year"
          placeholder="2025"
          value="${row.year}"
        />
      </td>

      <td>
        <input
          class="edu-inp"
          data-key="percent"
          placeholder="85% / 8.5 CGPA"
          value="${row.percent}"
        />
      </td>
    </tr>
  `;
},

  bindStep2(state) {
    const rebind = () => {
      document.querySelectorAll(".edu-inp").forEach(inp => {
        inp.addEventListener("input", e => {
          const tr   = e.target.closest("tr");
          const idx  = parseInt(tr.dataset.idx);
          const key  = e.target.dataset.key;
          state.education[idx][key] = e.target.value;
          App.validate();
        });
      });
      document.querySelectorAll(".btn-del-row").forEach(btn => {
        btn.addEventListener("click", e => {
          const idx = parseInt(e.target.dataset.idx);
          if (state.education.length > 1) {
            state.education.splice(idx, 1);
            this._reRenderEdu(state, rebind);
            App.validate();
          }
        });
      });
    };
    rebind();

    document.getElementById("btn-add-edu")?.addEventListener("click", () => {
      state.education.push({ degree: "", institute: "", year: "", percent: "" });
      this._reRenderEdu(state, rebind);
    });
    document.getElementById("btn-add-higher")?.addEventListener("click", () => {

  state.education.unshift({
    degree: "Post Graduation",
    institute: "",
    year: "",
    percent: ""
  });

  this._reRenderEdu(state, rebind);
  App.validate();
});
  },

  _reRenderEdu(state, rebind) {
    const tbody = document.getElementById("edu-tbody");
    if (!tbody) return;
    tbody.innerHTML = state.education.map((r, i) => this._eduRow(r, i)).join("");
    const rows = tbody.querySelectorAll("tr");
    rows.forEach(tr => tr.classList.add("new-row"));
    rebind();
  },

  // ── Step 3: Skills ────────────────────────────
  step3(state) {
    if (!state.skills) state.skills = [];
    return `
    <div class="step-wrap">
      <div class="step-header">
        <div class="step-eyebrow">Step 4 of 7</div>
        <h2 class="step-title">Skills</h2>
        <p class="step-sub">Type to search and add skills. Select at least 2.</p>
      </div>

      <div class="skill-search-wrap">
        <input class="rc-input" id="skill-search" type="text" placeholder="Type a skill — e.g. Python, Communication…" autocomplete="off" />
        <div class="skill-suggestions" id="skill-suggestions"></div>
      </div>

      <div class="chips-container" id="skill-chips">
        ${state.skills.map(s => this._skillChip(s)).join("")}
      </div>

      <p class="hint" style="margin-top:0.75rem;">${state.skills.length} skill${state.skills.length !== 1 ? "s" : ""} added</p>
    </div>`;
  },

  _skillChip(skill) {
    return `<span class="chip active">${_esc(skill)} <span class="chip-remove" data-skill="${_esc(skill)}">✕</span></span>`;
  },

  bindStep3(state) {
    const searchEl   = document.getElementById("skill-search");
    const suggestEl  = document.getElementById("skill-suggestions");
    const chipsEl    = document.getElementById("skill-chips");
    const hintEl     = document.querySelector(".hint");

    const updateHint = () => {
      if (hintEl) hintEl.textContent = `${state.skills.length} skill${state.skills.length !== 1 ? "s" : ""} added`;
    };

    const addSkill = (skill) => {
      if (!state.skills.includes(skill)) {
        state.skills.push(skill);
        chipsEl.innerHTML = state.skills.map(s => this._skillChip(s)).join("");
        bindRemove();
        updateHint();
        App.validate();
      }
      searchEl.value = "";
      suggestEl.innerHTML = "";
      suggestEl.classList.remove("open");
    };

    const bindRemove = () => {
      chipsEl.querySelectorAll(".chip-remove").forEach(btn => {
        btn.addEventListener("click", e => {
          const skill = e.target.dataset.skill;
          state.skills = state.skills.filter(s => s !== skill);
          chipsEl.innerHTML = state.skills.map(s => this._skillChip(s)).join("");
          bindRemove();
          updateHint();
          App.validate();
        });
      });
    };
    bindRemove();

    searchEl.addEventListener("input", () => {
      const q = searchEl.value.trim();
      if (!q) { suggestEl.innerHTML = ""; suggestEl.classList.remove("open"); return; }

      const matches = RC_DATA.skills.filter(s =>
        s.toLowerCase().startsWith(q.toLowerCase()) && !state.skills.includes(s)
      );

      if (matches.length === 0) {
        suggestEl.innerHTML = `<div class="suggestion-empty">No match — press Enter to add "${_esc(q)}"</div>`;
      } else {
        suggestEl.innerHTML = matches.slice(0, 8).map(m =>
          `<div class="suggestion-item" data-val="${_esc(m)}">${_esc(m)}</div>`
        ).join("");
        suggestEl.querySelectorAll(".suggestion-item").forEach(item => {
  item.addEventListener("click", () => {
    addSkill(item.dataset.val);
  });
});
      }
      suggestEl.classList.add("open");
    });

    searchEl.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        const q = searchEl.value.trim();
        if (q) addSkill(q);
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".skill-search-wrap")) {
        suggestEl.classList.remove("open");
      }
    });
  },

  // ── Step 4: Additional Personal Details ───────
  step4(state) {
    return `
    <div class="step-wrap">
      <div class="step-header">
        <div class="step-eyebrow">Step 5 of 7</div>
        <h2 class="step-title">Additional Details</h2>
        <p class="step-sub">Optional fields. Leave blank to skip.</p>
      </div>

      <div class="two-col">
        <div class="field">
          <label class="field-label">Marital Status</label>
          <div class="option-chips" id="marital-chips">
            ${RC_DATA.maritalStatus.map(m =>
              `<button class="chip ${state.maritalStatus === m ? 'active' : ''}" data-val="${m}">${m}</button>`
            ).join("")}
          </div>
        </div>
      </div>

      <div class="field">
        <label class="field-label">Languages Known</label>
        <div class="option-chips" id="lang-chips">
          ${RC_DATA.languages.map(l =>
            `<button class="chip ${(state.languages || []).includes(l) ? 'active' : ''}" data-lang="${l}">${l}</button>`
          ).join("")}
        </div>
      </div>
    </div>`;
  },

  bindStep4(state) {
    if (!state.languages) state.languages = [];

    document.querySelectorAll("#marital-chips .chip").forEach(btn => {
      btn.addEventListener("click", () => {
        state.maritalStatus = btn.dataset.val;
        document.querySelectorAll("#marital-chips .chip").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    document.querySelectorAll("#lang-chips .chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        if (state.languages.includes(lang)) {
          state.languages = state.languages.filter(l => l !== lang);
          btn.classList.remove("active");
        } else {
          state.languages.push(lang);
          btn.classList.add("active");
        }
      });
    });
  },

  // ── Step 5: Achievements & Hobbies ───────────
  step5(state) {
    return `
    <div class="step-wrap">
      <div class="step-header">
        <div class="step-eyebrow">Step 6 of 7</div>
        <h2 class="step-title">Achievements & Hobbies</h2>
        <p class="step-sub">Leave blank if you'd prefer not to include these.</p>
      </div>

      <div class="field">
        <label class="field-label">Achievements / Certifications</label>
        <textarea class="rc-textarea" id="f-achievements" placeholder="e.g.&#10;• Won 1st place in college hackathon 2023&#10;• Google Cloud Certified Associate&#10;• NSS Volunteer, 2022">${_esc(state.achievements || '')}</textarea>
        <p class="hint">Each on a new line, or separated by commas.</p>
      </div>

      <div class="field">
        <label class="field-label">Hobbies & Interests</label>
        <div class="option-chips" id="hobby-chips">
          ${RC_DATA.hobbies.map(h =>
            `<button class="chip ${(state.hobbies || []).includes(h) ? 'active' : ''}" data-hobby="${h}">${h}</button>`
          ).join("")}
        </div>
      </div>
    </div>`;
  },

  bindStep5(state) {
    if (!state.hobbies) state.hobbies = [];

    document.getElementById("f-achievements")?.addEventListener("input", e => {
      state.achievements = e.target.value;
    });

    document.querySelectorAll("#hobby-chips .chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const h = btn.dataset.hobby;
        if (state.hobbies.includes(h)) {
          state.hobbies = state.hobbies.filter(x => x !== h);
          btn.classList.remove("active");
        } else {
          state.hobbies.push(h);
          btn.classList.add("active");
        }
      });
    });
  },

  // ── Step 6: Confirm & Generate ────────────────
  step6(state) {
    const roleLabel = RC_DATA.roles.find(r => r.id === state.role)?.label || state.role || "—";
    return `
    <div class="step-wrap">
      <div class="step-header">
        <div class="step-eyebrow">Step 7 of 7</div>
        <h2 class="step-title">Review & Generate</h2>
        <p class="step-sub">Everything looks good? Hit Generate to build your resume.</p>
      </div>

      <div class="section-card">
        <div class="section-card-title">Summary</div>
        <div style="display:flex;flex-direction:column;gap:0.6rem;font-size:0.875rem;">
          <div style="display:flex;justify-content:space-between;">
            <span style="color:var(--text-3);">Name</span>
            <span style="font-weight:600;">${_esc(state.name || "—")}</span>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:var(--text-3);">Role</span>
            <span style="font-weight:600;">${_esc(roleLabel)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:var(--text-3);">Education</span>
            <span style="font-weight:600;">${state.education?.length || 0} entr${state.education?.length === 1 ? "y" : "ies"}</span>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:var(--text-3);">Skills</span>
            <span style="font-weight:600;">${state.skills?.length || 0} selected</span>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:var(--text-3);">Template</span>
            <span style="font-weight:600;">${_esc(RC_DATA.templates.find(t => t.id === state.template)?.label || "—")}</span>
          </div>
        </div>
      </div>

      <div class="section-card" style="background:rgba(200,169,110,0.06);border-color:rgba(200,169,110,0.2);">
        <div class="section-card-title">Auto-Added</div>
        <div style="font-size:0.82rem;color:var(--text-2);line-height:1.6;">
          ✓ Professional objective statement<br/>
          ✓ Declaration with your name<br/>
          ✓ Signature block with today's date
        </div>
      </div>
    </div>`;
  },

  bindStep6(_state) {
    // No interactive binds needed for confirmation step
  },
};

// Utility used by steps
function _esc(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
