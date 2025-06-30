import React from 'react';

// --- Data (Can be moved to a separate file later) ---
const professionalSummary = "A highly motivated Computer Science student with a passion for web and iOS development. Experienced in creating user-centric applications and mentoring junior developers. Seeking to leverage my skills in a challenging and growth-oriented role.";

const workExperience = [
  {
    role: "Junior iOS Developer",
    company: "Apple Developer Academy",
    period: "2023 - Present",
    description: "Developed and maintained iOS applications, focusing on clean code and user experience. Collaborated with a team to deliver high-quality products on schedule."
  },
  {
    role: "Front-End Developer",
    company: "BNCC",
    period: "2022 - 2023",
    description: "Built responsive and performant web applications using modern front-end technologies. Also served as a mentor for new members."
  }
];

const skills = {
  "Languages": ["JavaScript", "TypeScript", "Swift", "Python"],
  "Frameworks": ["React", "Next.js", "SwiftUI", "Node.js"],
  "Tools": ["Git", "Docker", "Figma", "Xcode"]
};

const projects = [
  {
    title: "Project Alpha",
    description: "A full-stack web application for project management, built with Next.js and a Node.js backend.",
    link: "#"
  },
  {
    title: "iOS Fitness App",
    description: "A native iOS app to track fitness goals, developed with SwiftUI.",
    link: "#"
  }
];

const education = {
  degree: "Bachelor of Science in Computer Science",
  university: "BINUS University",
  period: "2021 - 2025"
};

// --- Helper Components ---
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">{title}</h2>
    {children}
  </section>
);

const SkillCategory: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map(item => <span key={item} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{item}</span>)}
    </div>
  </div>
);

// --- Main Component ---
export default function RecruiterView() {
  return (
    <div className="bg-white text-gray-900 font-sans p-8 md:p-12 lg:p-16">
      <div className="max-w-4xl mx-auto">
        
        {/* -- Header -- */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2">Vovo</h1>
          <p className="text-xl text-gray-600">Web & iOS Developer</p>
        </header>

        {/* -- Quick Info Bar -- */}
        <div className="flex justify-center gap-4 mb-12">
          <a href="#" className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">Download CV</a>
          <a href="#" className="text-gray-800 border border-gray-800 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors">LinkedIn</a>
          <a href="#" className="text-gray-800 border border-gray-800 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors">GitHub</a>
        </div>
        
        {/* -- Professional Summary -- */}
        <Section title="Professional Summary">
          <p className="text-lg text-gray-700 leading-relaxed">{professionalSummary}</p>
        </Section>
        
        {/* -- Work Experience -- */}
        <Section title="Work Experience">
          {workExperience.map(job => (
            <div key={job.company} className="mb-6">
              <h3 className="text-xl font-semibold">{job.role}</h3>
              <p className="text-md text-gray-600">{job.company} | {job.period}</p>
              <p className="mt-2 text-gray-700">{job.description}</p>
            </div>
          ))}
        </Section>
        
        {/* -- Skills -- */}
        <Section title="Skills">
          {Object.entries(skills).map(([category, items]) => (
            <SkillCategory key={category} title={category} items={items} />
          ))}
        </Section>
        
        {/* -- Projects -- */}
        <Section title="Projects">
          {projects.map(project => (
            <div key={project.title} className="mb-6">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-gray-700">{project.description}</p>
              <a href={project.link} className="text-blue-600 hover:underline">View Project</a>
            </div>
          ))}
        </Section>
        
        {/* -- Education -- */}
        <Section title="Education">
          <h3 className="text-xl font-semibold">{education.degree}</h3>
          <p className="text-md text-gray-600">{education.university} | {education.period}</p>
        </Section>

        {/* -- Back Button -- */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              localStorage.removeItem("userRole");
              window.location.reload();
            }}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Reset Choice
          </button>
        </div>
        
      </div>
    </div>
  );
} 