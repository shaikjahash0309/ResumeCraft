// data.js — Static Data Layer

const RC_DATA = {

 roles: [

  // Students & Freshers
  { id: "student", label: "Student", icon: "🎓" },
  { id: "fresher", label: "Fresher", icon: "🌱" },
  { id: "intern", label: "Intern", icon: "📚" },

  // Software & IT
  { id: "software_engineer", label: "Software Engineer", icon: "💻" },
  { id: "web_developer", label: "Web Developer", icon: "🌐" },
  { id: "frontend_developer", label: "Frontend Developer", icon: "🖥️" },
  { id: "backend_developer", label: "Backend Developer", icon: "⚙️" },
  { id: "fullstack_developer", label: "Full Stack Developer", icon: "🚀" },
  { id: "mobile_developer", label: "Mobile Developer", icon: "📱" },
  { id: "android_developer", label: "Android Developer", icon: "🤖" },
  { id: "ios_developer", label: "iOS Developer", icon: "🍎" },
  { id: "uiux_designer", label: "UI/UX Designer", icon: "🎨" },
  { id: "graphic_designer", label: "Graphic Designer", icon: "🖌️" },
  { id: "data_analyst", label: "Data Analyst", icon: "📊" },
  { id: "data_scientist", label: "Data Scientist", icon: "📈" },
  { id: "machine_learning", label: "ML Engineer", icon: "🤖" },
  { id: "devops", label: "DevOps Engineer", icon: "☁️" },
  { id: "cybersecurity", label: "Cyber Security", icon: "🔒" },
  { id: "qa_tester", label: "QA Tester", icon: "✅" },
  { id: "database_admin", label: "Database Administrator", icon: "🗄️" },

  // Engineering
  { id: "mechanical", label: "Mechanical Engineer", icon: "⚙️" },
  { id: "civil", label: "Civil Engineer", icon: "🏗️" },
  { id: "electrical", label: "Electrical Engineer", icon: "⚡" },
  { id: "electronics", label: "Electronics Engineer", icon: "🔌" },
  { id: "automobile", label: "Automobile Engineer", icon: "🚗" },
  { id: "chemical", label: "Chemical Engineer", icon: "🧪" },
  { id: "aerospace", label: "Aerospace Engineer", icon: "✈️" },

  // Commerce & Business
  { id: "accountant", label: "Accountant", icon: "📑" },
  { id: "finance", label: "Finance Executive", icon: "💰" },
  { id: "banking", label: "Banking Professional", icon: "🏦" },
  { id: "sales", label: "Sales Executive", icon: "📈" },
  { id: "marketing", label: "Marketing Executive", icon: "📢" },
  { id: "digital_marketing", label: "Digital Marketer", icon: "📱" },
  { id: "business_analyst", label: "Business Analyst", icon: "📋" },
  { id: "hr", label: "HR Executive", icon: "🤝" },

  // Healthcare
  { id: "doctor", label: "Doctor", icon: "🩺" },
  { id: "nurse", label: "Nurse", icon: "🏥" },
  { id: "pharmacist", label: "Pharmacist", icon: "💊" },
  { id: "lab_technician", label: "Lab Technician", icon: "🧫" },

  // Education
  { id: "teacher", label: "Teacher", icon: "📖" },
  { id: "lecturer", label: "Lecturer", icon: "🏫" },
  { id: "professor", label: "Professor", icon: "🎓" },

  // Creative
  { id: "content_writer", label: "Content Writer", icon: "✍️" },
  { id: "copywriter", label: "Copywriter", icon: "📝" },
  { id: "video_editor", label: "Video Editor", icon: "🎬" },
  { id: "photographer", label: "Photographer", icon: "📷" },
  { id: "animator", label: "Animator", icon: "🎞️" },

  // Operations & Admin
  { id: "admin", label: "Administrator", icon: "📂" },
  { id: "office_assistant", label: "Office Assistant", icon: "🗂️" },
  { id: "customer_support", label: "Customer Support", icon: "☎️" },
  { id: "operations", label: "Operations Executive", icon: "📦" },

  // Government & Public Sector
  { id: "government", label: "Government Job Aspirant", icon: "🏛️" },
  { id: "police", label: "Police", icon: "👮" },
  { id: "army", label: "Army", icon: "🎖️" },

  // Skilled Trades
  { id: "electrician", label: "Electrician", icon: "🔧" },
  { id: "plumber", label: "Plumber", icon: "🚰" },
  { id: "technician", label: "Technician", icon: "🛠️" },

  // General
  { id: "other", label: "Other Profession", icon: "📄" }

],
  templates: [
    { id: "modern",    label: "Modern",    cls: "tmpl-modern" },
    { id: "minimal",   label: "Minimal",   cls: "tmpl-minimal" },
    { id: "corporate", label: "Corporate", cls: "tmpl-corporate" },
    { id: "student",   label: "Student",   cls: "tmpl-student" },
  ],

  languages: [
    "English", "Telugu", "Hindi", "Tamil", "Kannada",
    "Malayalam", "Marathi", "Bengali", "Urdu", "Odia",
    "Punjabi", "Gujarati", "Sanskrit", "French", "German",
  ],

  hobbies: [
    "Reading", "Cricket", "Chess", "Music", "Painting",
    "Photography", "Gardening", "Cooking", "Travelling", "Yoga",
    "Football", "Badminton", "Gaming", "Dancing", "Writing",
    "Cycling", "Volunteering", "Swimming",
  ],

  maritalStatus: ["Single", "Married", "Divorced", "Widowed"],

  // Global skill dictionary — used for autocomplete
  skills: [
    // Languages
    "C", "C++", "C#", "Java", "Python", "JavaScript", "TypeScript",
    "PHP", "Ruby", "Kotlin", "Swift", "Go", "Rust", "Scala", "MATLAB",
    "R", "Perl", "Shell Scripting", "Dart", "VB.NET",
    // Web
    "HTML", "CSS", "React", "Angular", "Vue.js", "Node.js", "Express.js",
    "Next.js", "jQuery", "Bootstrap", "Tailwind CSS", "WordPress",
    "REST API", "GraphQL", "WebSocket",
    // DB
    "SQL", "MySQL", "PostgreSQL", "MongoDB", "Firebase", "SQLite",
    "Oracle", "Redis", "Cassandra",
    // Tools / Cloud
    "Git", "GitHub", "Docker", "Kubernetes", "AWS", "Azure", "GCP",
    "Jenkins", "Linux", "Postman", "Jira", "Figma", "Adobe XD",
    "Photoshop", "Illustrator", "Canva",
    // Data
    "Data Analysis", "Machine Learning", "Deep Learning", "TensorFlow",
    "Pandas", "NumPy", "Power BI", "Tableau", "Excel", "SPSS",
    "Hadoop", "Spark",
    // Domain
    "Tally", "SAP", "GST", "Taxation", "Payroll", "Accounting",
    "Financial Reporting", "Auditing", "Tally ERP9",
    // Soft
    "Communication Skills", "Leadership", "Teamwork", "Problem Solving",
    "Critical Thinking", "Time Management", "Presentation Skills",
    "Customer Handling", "Negotiation", "Adaptability",
    "Project Management", "Attention to Detail",
    // Other
    "AutoCAD", "MATLAB", "SolidWorks", "Revit", "STAAD Pro",
    "CRM Tools", "Lead Generation", "B2B Sales", "MS Office",
    "Cyber Security", "Cloud Computing", "Networking", "SEO",
    "Content Writing", "Copywriting", "Research",
  ],
};
