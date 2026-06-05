// app.js — Main Application Controller

const App = {
  TOTAL_STEPS: 7,
  currentStep: 0,
  state: { education: [
    {
      degree: "Graduation",
      institute: "",
      year: "",
      percent: ""
    },
    {
      degree: "Intermediate / 12th",
      institute: "",
      year: "",
      percent: ""
    },
    {
      degree: "10th Standard",
      institute: "",
      year: "",
      percent: ""
    }
  ], skills: [], languages: [], hobbies: [] },

  // Step render/bind map
  stepMap: [
    { render: (s) => Steps.step0(s), bind: (s) => Steps.bindStep0(s) },
    { render: (s) => Steps.step1(s), bind: (s) => Steps.bindStep1(s) },
    { render: (s) => Steps.step2(s), bind: (s) => Steps.bindStep2(s) },
    { render: (s) => Steps.step3(s), bind: (s) => Steps.bindStep3(s) },
    { render: (s) => Steps.step4(s), bind: (s) => Steps.bindStep4(s) },
    { render: (s) => Steps.step5(s), bind: (s) => Steps.bindStep5(s) },
    { render: (s) => Steps.step6(s), bind: (s) => Steps.bindStep6(s) },
  ],

  init() {
    // Landing CTA
    document.getElementById("btn-start")?.addEventListener("click", () => {
      this.showScreen("screen-wizard");
      this.renderStep(0);
    });

    // Wizard nav
    document.getElementById("btn-next")?.addEventListener("click", () => this.next());
    document.getElementById("btn-back")?.addEventListener("click", () => this.back());

    // Result actions
    document.getElementById("btn-download")?.addEventListener("click",  () => this.download());
    document.getElementById("btn-download-2")?.addEventListener("click",() => this.download());
    document.getElementById("btn-restart")?.addEventListener("click",   () => this.restart());
    document.getElementById("btn-restart-2")?.addEventListener("click", () => this.restart());
  },

  showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => {
      s.classList.remove("active", "entering");
    });
    const el = document.getElementById(id);
    if (el) {
      el.classList.add("active", "entering");
      setTimeout(() => el.classList.remove("entering"), 400);
    }
  },

  renderStep(index) {
    this.currentStep = index;
    const container = document.getElementById("wizard-steps-container");
    if (!container) return;

    const step = this.stepMap[index];
    container.innerHTML = step.render(this.state);
    step.bind(this.state);

    // Progress bar
    const pct = Math.round((index / (this.TOTAL_STEPS - 1)) * 100);
    const fill = document.getElementById("progress-fill");
    const label = document.getElementById("progress-label");
    if (fill)  fill.style.width = `${pct}%`;
    if (label) label.textContent = `Step ${index + 1} of ${this.TOTAL_STEPS}`;

    // Back button visibility
    const backBtn = document.getElementById("btn-back");
    if (backBtn) backBtn.style.visibility = index === 0 ? "hidden" : "visible";

    // Next button label
    const nextBtn = document.getElementById("btn-next");
    if (nextBtn) nextBtn.textContent = index === this.TOTAL_STEPS - 1 ? "✨ Generate Resume" : "Continue →";

    this.validate();
  },

  validate() {
    const result = Validator.check(this.currentStep, this.state);
    const nextBtn = document.getElementById("btn-next");
    if (nextBtn) nextBtn.disabled = !result.valid;
  },

  next() {
    const result = Validator.check(this.currentStep, this.state);
    if (!result.valid) return;

    if (this.currentStep < this.TOTAL_STEPS - 1) {
      this.renderStep(this.currentStep + 1);
    } else {
      this.generate();
    }
  },

  back() {
    if (this.currentStep > 0) {
      this.renderStep(this.currentStep - 1);
    }
  },

  generate() {
    // Process state through rule engine
    const resumeData = RuleEngine.process(this.state);

    // Render resume HTML
    const html = ResumeRenderer.render(resumeData);
    document.getElementById("resume-output").innerHTML = html;

    // Populate sidebar meta
    const roleLabel = RC_DATA.roles.find(r => r.id === this.state.role)?.label || "";
    document.getElementById("result-name-display").textContent =
      `${resumeData.name} · ${roleLabel}`;

    document.getElementById("result-meta").innerHTML = `
      <div class="meta-row"><span class="meta-key">Template</span><span class="meta-val">${
        RC_DATA.templates.find(t => t.id === resumeData.template)?.label || ""}</span></div>
      <div class="meta-row"><span class="meta-key">Education</span><span class="meta-val">${
        resumeData.education.length} entr${resumeData.education.length === 1 ? "y" : "ies"}</span></div>
      <div class="meta-row"><span class="meta-key">Skills</span><span class="meta-val">${
        resumeData.skills.length} listed</span></div>
      <div class="meta-row"><span class="meta-key">Generated</span><span class="meta-val">${
        resumeData.generatedAt}</span></div>
    `;

    // Switch screen
    this.showScreen("screen-result");

    // Send to Sheets (fire and forget)
    SheetsConnector.send(resumeData);
  },

  download() {
    PDFExporter.export("resume-paper-inner", this.state.name || "resume");
  },

  restart() {
    this.state = { education: [], skills: [], languages: [], hobbies: [] };
    this.currentStep = 0;
    this.showScreen("screen-wizard");
    this.renderStep(0);
  },
};

// Boot
document.addEventListener("DOMContentLoaded", () => App.init());
