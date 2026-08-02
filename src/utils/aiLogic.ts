const RESUME_KNOWLEDGE = {
  greetings: [
    "HELLO. I AM RISHABH'S DIGITAL ASSISTANT.",
    "SYSTEM READY. ASK ME ANYTHING ABOUT RISHABH.",
    "GREETINGS. WHAT DO YOU WANT TO KNOW?"
  ],
  experience: "Rishabh is an Information Science student and AI developer. He focuses on full-stack web development and AI/RAG integrations. He builds robust systems that solve real-world problems.",
  skills: "Core skills include: Python (90%), React (85%), FastAPI (85%), AI/RAG architectures (85%), JavaScript/TypeScript, and 3D web experiences.",
  hackathons: "Rishabh is a competitive developer. He has won multiple hackathons, showcasing his ability to rapidly prototype, innovate, and deliver high-performance solutions under extreme time pressure.",
  contact: "You can reach out at the contact form below, or find him on GitHub at @Rishabh-afk-beep.",
  hire: "You should absolutely hire Rishabh. He combines deep technical knowledge in AI and full-stack development with a strong sense of design and user experience. He ships code fast and builds things that scale.",
  projects: "His notable projects include 'Agentic Multimodal RAG' and 'CivicSim'. Scroll down to the 'SELECTED WORK' section to see the case studies.",
  default: [
    "I DO NOT HAVE DATA ON THAT. ASK ABOUT: SKILLS, EXPERIENCE, HACKATHONS, PROJECTS, OR HIRING.",
    "QUERY UNRECOGNIZED. TRY ASKING ABOUT MY SKILLS OR HACKATHONS.",
    "ERR_NO_MATCH. PLEASE REPHRASE YOUR QUESTION ABOUT RISHABH."
  ]
};

export async function simulateAIResponse(query: string): Promise<string> {
  // Simulate network delay for AI processing
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));

  const q = query.toLowerCase();

  if (q.match(/hello|hi|hey|greet/)) {
    return RESUME_KNOWLEDGE.greetings[Math.floor(Math.random() * RESUME_KNOWLEDGE.greetings.length)];
  }
  if (q.match(/experience|work|background|who are you/)) {
    return RESUME_KNOWLEDGE.experience;
  }
  if (q.match(/skill|tech|stack|language|framework/)) {
    return RESUME_KNOWLEDGE.skills;
  }
  if (q.match(/hackathon|win|competition/)) {
    return RESUME_KNOWLEDGE.hackathons;
  }
  if (q.match(/hire|job|work for|employ/)) {
    return RESUME_KNOWLEDGE.hire;
  }
  if (q.match(/project|build|made|create|portfolio/)) {
    return RESUME_KNOWLEDGE.projects;
  }
  if (q.match(/contact|email|reach|github/)) {
    return RESUME_KNOWLEDGE.contact;
  }
  
  return RESUME_KNOWLEDGE.default[Math.floor(Math.random() * RESUME_KNOWLEDGE.default.length)];
}
