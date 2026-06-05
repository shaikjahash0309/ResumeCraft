// resumeRenderer.js — Builds the resume HTML string

const ResumeRenderer = {
  render(data) {
    const tmplCls = RC_DATA.templates.find(t => t.id === data.template)?.cls || "tmpl-modern";

    const section = (title, content) => `
      <div class="rp-section">
        <div class="rp-section-title">${title}</div>
        <div class="rp-rule"></div>
        ${content}
      </div>`;

    // Personal details rows
    const personalRows = [
      data.fatherName   ? ["Father's Name", data.fatherName]   : null,
      data.dob          ? ["Date of Birth",  data.dob]          : null,
      data.gender       ? ["Gender",         data.gender]        : null,
      data.maritalStatus? ["Marital Status", data.maritalStatus] : null,
      data.email        ? ["Email",          data.email]         : null,
      data.phone        ? ["Mobile",         data.phone]         : null,
      data.address      ? ["Address",        data.address]       : null,
    ].filter(Boolean);

    const personalHTML = `<div class="rp-personal-grid">
      ${personalRows.map(([k, v]) => `
        <div class="rp-detail-row">
          <span class="rp-detail-key">${k}</span>
          <span class="rp-detail-val">${this._esc(v)}</span>
        </div>`).join("")}
    </div>`;

    // Education
    const sortedEducation = [...data.education].sort(
  (a, b) => Number(b.year) - Number(a.year)
);
    const eduHTML = `
<table class="rp-edu-table">
  <thead>
    <tr>
      <th>S.No</th>
      <th>Degree</th>
      <th>Institute</th>
      <th>Year</th>
      <th>Percentage</th>
    </tr>
  </thead>
  <tbody>
    ${data.education.map((row, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${this._esc(row.degree)}</td>
        <td>${this._esc(row.institute)}</td>
        <td>${this._esc(row.year)}</td>
        <td>${this._esc(row.percent)}</td>
      </tr>
    `).join("")}
  </tbody>
</table>
`;

    // Skills
    const skillsHTML = `<div class="rp-skills-wrap">
      ${data.skills.map(s => `<span class="rp-skill">${this._esc(s)}</span>`).join("")}
    </div>`;

    // Hobbies
    const hobbiesHTML = data.hobbies.length
      ? `<div class="rp-lang-list">${data.hobbies.map(h => `<span>${this._esc(h)}</span>`).join(" · ")}</div>`
      : `<div class="rp-text-block">—</div>`;

    // Languages
    const langHTML = data.languages.length
      ? `<div class="rp-lang-list">${data.languages.map(l => `<span>${this._esc(l)}</span>`).join(" · ")}</div>`
      : `<div class="rp-text-block">—</div>`;

    // Achievements
    const achHTML = data.achievements
      ? `<div class="rp-text-block" style="white-space:pre-line;">${this._esc(data.achievements)}</div>`
      : `<div class="rp-text-block" style="color:#aaa;">—</div>`;

    return `
    <div class="resume-paper ${tmplCls}" id="resume-paper-inner">

      <!-- Header -->
      <div class="rp-header">
        <div class="rp-name">${this._esc(data.name)}</div>
        <div class="rp-role">${this._esc(data.roleLabel)}</div>
        <div class="rp-contact">
          ${data.email ? `<span>✉ ${this._esc(data.email)}</span>` : ""}
          ${data.phone ? `<span>📞 ${this._esc(data.phone)}</span>` : ""}
          ${data.address ? `<span>📍 ${this._esc(data.address)}</span>` : ""}
        </div>
      </div>

      ${personalRows.length ? section("Personal Details", personalHTML) : ""}

      ${section("Education", eduHTML)}

      ${section("Objective", `<div class="rp-objective">${this._esc(data.objective)}</div>`)}

      ${data.skills.length ? section("Skills", skillsHTML) : ""}

      ${section("Achievements", achHTML)}

      ${section("Hobbies & Interests", hobbiesHTML)}

      ${section("Languages Known", langHTML)}

      ${section("Declaration", `<div class="rp-declaration">${this._esc(data.declaration)}</div>`)}

      <!-- Signature -->
      <div class="rp-signature">
        <div class="rp-sig-left">
          <span>Place: ________________</span>
          <span>Date: ${this._esc(data.generatedAt)}</span>
        </div>
        <div class="rp-sig-right">
          <div class="rp-sig-name">${this._esc(data.name)}</div>
          <div style="font-size:7.5pt;color:#999;">Signature</div>
        </div>
      </div>

    </div>`;
  },

  _esc(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  },
};
