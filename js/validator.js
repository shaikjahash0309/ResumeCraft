// validator.js — Step Validators

const Validator = {
  // Returns { valid: bool, message: string }
  steps: [
    // Step 0 — Personal Info
   (state) => {
  if (!state.name?.trim())
    return { valid: false, message: "Full name is required." };

  if (state.name.trim().length < 3)
    return { valid: false, message: "Name must be at least 3 characters." };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!state.email?.trim())
    return { valid: false, message: "Email is required." };

  if (!emailRegex.test(state.email))
    return { valid: false, message: "Enter a valid email address." };

  const phone = state.phone?.replace(/\D/g, "");

  if (!phone)
    return { valid: false, message: "Phone number is required." };

  if (phone.length !== 10)
    return { valid: false, message: "Phone number must be 10 digits." };

  return { valid: true };
},
    // Step 1 — Role & Template
    (state) => {
      if (!state.role)     return { valid: false, message: "Please select a role." };
      if (!state.template) return { valid: false, message: "Please select a template." };
      return { valid: true };
    },
    // Step 2 — Education
    (state) => {

  if (!state.education || state.education.length === 0)
    return { valid: false, message: "Education details are required." };

  const currentYear = new Date().getFullYear();

  for (const row of state.education) {

    if (
      !row.degree?.trim() ||
      !row.institute?.trim() ||
      !row.year?.trim() ||
      !row.percent?.trim()
    ) {
      return {
        valid: false,
        message: "Fill all fields in education."
      };
    }

    const year = Number(row.year);

    if (
      isNaN(year) ||
      year < 1950 ||
      year > currentYear + 5
    ) {
      return {
        valid: false,
        message: "Enter a valid passing year."
      };
    }
  }

  return { valid: true };
},
    // Step 3 — Skills
    (state) => {

  if (!state.skills || state.skills.length < 3) {
    return {
      valid: false,
      message: "Select at least 3 skills."
    };
  }

  return { valid: true };
},
    // Step 4 — Additional (optional fields, always valid)
    (_state) => ({ valid: true }),
    // Step 5 — Extras (achievements, hobbies, languages)
    (_state) => ({ valid: true }),
    // Step 6 — Additional Details (declaration — always valid)
    (_state) => ({ valid: true }),
  ],

  check(stepIndex, state) {
    const fn = this.steps[stepIndex];
    return fn ? fn(state) : { valid: true };
  },
};
