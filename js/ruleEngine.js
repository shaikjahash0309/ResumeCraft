// ruleEngine.js
// ─────────────────────────────────────────────
// STRICT RULE: Only formats and assembles user-supplied data.
// NEVER invents fake projects, experience, or achievements.
// Only auto-fills: Objective text and Declaration text.
// ─────────────────────────────────────────────

const RuleEngine = {
  OBJECTIVE_TEXT: "To work in a reputed organisation that provides a good work environment and opportunities to utilise my skills and knowledge effectively, and to contribute positively to the growth of the organisation.",

  DECLARATION_TEXT: "I hereby declare that the information provided above is true and correct to the best of my knowledge and belief.",

  process(state) {
    // Sort education reverse-chronologically by year
    const sortedEdu = [...(state.education || [])].sort(
      (a, b) => parseInt(b.year) - parseInt(a.year)
    );

    const roleLabel = RC_DATA.roles.find(r => r.id === state.role)?.label || state.role || "";

    return {
      // Personal
      name:         state.name?.trim() || "",
      email:        state.email?.trim() || "",
      phone:        state.phone?.trim() || "",
      fatherName:   state.fatherName?.trim() || "",
      dob:          state.dob?.trim() || "",
      address:      state.address?.trim() || "",
      gender:       state.gender || "",
      maritalStatus:state.maritalStatus || "",

      // Role & Template
      roleLabel,
      template:     state.template || "modern",

      // Education (sorted)
      education: sortedEdu,

      // Objective — fixed text only
      objective: this.OBJECTIVE_TEXT,

      // Skills — user selected only, no additions
      skills: state.skills || [],

      // Achievements — user filled or blank
      achievements: state.achievements?.trim() || "",

      // Hobbies — user selected or typed
      hobbies: state.hobbies || [],

      // Languages — user selected
      languages: state.languages || [],

      // Declaration — fixed text
      declaration: this.DECLARATION_TEXT,

      // Meta
      generatedAt: new Date().toLocaleDateString("en-IN", {
        day: "2-digit", month: "long", year: "numeric"
      }),
    };
  },
};
