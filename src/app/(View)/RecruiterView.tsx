import React, { useState } from 'react';
import { FiDownload, FiLinkedin, FiGithub, FiMail, FiPhone, FiArrowRight } from 'react-icons/fi';
import MatrixWaveBackground from '../../components/MatrixWaveBackground';

// --- Data (Keep as is) ---
const professionalSummary = "A dedicated developer crafting seamless and engaging user experiences for both web and iOS. I transform complex ideas into clean, efficient, and beautiful applications.";
const workExperience = [ { role: "Junior iOS Developer", company: "Apple Developer Academy", period: "2023 - Present" }, { role: "Front-End Developer", company: "BNCC", period: "2022 - 2023" } ];
const skills = { "Languages": ["JavaScript", "TypeScript", "Swift", "Python"], "Frameworks": ["React", "Next.js", "SwiftUI", "Node.js"], "Tools": ["Git", "Docker", "Figma", "Xcode"] };
const projects = [ { title: "Portfolio Website", description: "A dynamic, dual-view portfolio built with Next.js, featuring distinct, tailored experiences for different visitor types.", tech: ["Next.js", "TypeScript", "Tailwind CSS"], link: "#", image: "/gallery.png" }, { title: "iOS Fitness App", description: "A native iOS app designed to track fitness goals and workout progress, with a focus on a clean, user-friendly interface in SwiftUI.", tech: ["SwiftUI", "Combine", "CoreData"], link: "#", image: "/careless.png" }, { title: "iOS Fitness ", description: "A native iOS app designed to track fitness goals and workout progress, with a focus on a clean, user-friendly interface in SwiftUI.", tech: ["SwiftUI", "Combine", "CoreData"], link: "#", image: "/careless.png" },  ];
const education = { degree: "Bachelor of Science in Computer Science", university: "BINUS University", period: "2021 - 2025" };

// --- Reusable Components ---
const NavLink: React.FC<{onClick: () => void, isActive: boolean, children: React.ReactNode}> = ({ onClick, isActive, children }) => (
    <button onClick={onClick} className={`font-medium transition-colors relative group ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
        <span>{children}</span>
        <span className={`absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 transform transition-transform scale-x-0 group-hover:scale-x-100 ${isActive ? 'scale-x-100' : ''}`}></span>
    </button>
);

const ProjectCard: React.FC<{project: typeof projects[0]}> = ({ project }) => (
    <div className="group relative bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700/50 transition-all duration-300 hover:border-slate-600/50 hover:shadow-2xl">
        <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-violet-500 rounded-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-md"></div>
        <div className="relative">
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-6">
                <h3 className="heading-font text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => <span key={t} className="bg-slate-700 text-cyan-300 px-2 py-1 text-xs rounded-full font-medium">{t}</span>)}
                </div>
                <a href={project.link} className="inline-flex items-center font-semibold text-slate-300 hover:text-white transition-colors">
                    View Project <FiArrowRight className="ml-2" />
                </a>
            </div>
        </div>
    </div>
);

// --- View Components ---
const HomeView: React.FC<{onNavigate: (view: View) => void}> = ({ onNavigate }) => (
    <div className="animate-content-fade-in">
        <section className="w-full">
            <div className="grid md:grid-cols-2 gap-20 items-center min-h-[70vh]">
                {/* Left: Introduction */}
                <div className="flex flex-col justify-center h-full text-left md:pr-8">
                    <h1 className="heading-font text-5xl md:text-7xl font-extrabold text-white mb-2">Vovo</h1>
                    <h2 className="text-2xl md:text-3xl font-semibold text-slate-400 mb-8">Web & iOS Developer</h2>
                    <p className="max-w-xl text-lg md:text-xl text-slate-400 mb-8">{professionalSummary}</p>
                    <div className="flex gap-4">
                        <button onClick={() => onNavigate('work')} className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg">View My Work</button>
                        <button onClick={() => onNavigate('about')} className="bg-slate-800/50 text-slate-300 border border-slate-700 px-8 py-3 rounded-lg font-semibold hover:bg-slate-700/50 transition-colors">Contact</button>
                    </div>
                </div>
                {/* Right: Experience & Skills */}
                <div className="flex flex-col gap-12 md:pl-8">
                    <div>
                        <h3 className="heading-font text-3xl font-bold text-white mb-6">Work Experience</h3>
                        <div className="space-y-6 border-l-2 border-slate-800 pl-6">
                            {workExperience.map(job => (
                                <div key={job.company}>
                                    <h4 className="text-lg font-semibold text-white">{job.role}</h4>
                                    <p className="text-slate-400">{job.company} | {job.period}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pt-2">
                        <h3 className="heading-font text-3xl font-bold text-white mb-6">Core Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.values(skills).flat().map(skill => (
                                <span key={skill} className="bg-cyan-400/10 text-cyan-300 px-3 py-1 rounded-full font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

const WorkView: React.FC = () => (
    <div className="animate-content-fade-in">
        <h3 className="heading-font text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 mb-12">Featured Projects</h3>
        <div className="grid md:grid-cols-2 gap-8">
            {projects.map(p => <ProjectCard key={p.title} project={p} />)}
        </div>
    </div>
);

const AboutView: React.FC = () => (
    <div className="animate-content-fade-in py-16">
        <div className="text-center max-w-2xl mx-auto">
            <h3 className="heading-font text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 mb-4">Get In Touch</h3>
            <p className="text-slate-400 text-lg mb-8"> I'm currently open to new opportunities and collaborations. Feel free to reach out for a conversation about technology, projects, or just to say hello! </p>
            <a href="mailto:vovofirmanto@gmail.com" className="font-semibold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent text-2xl hover:opacity-80 transition-opacity inline-block mb-8"> vovofirmanto@gmail.com </a>
            <div className="flex justify-center gap-6 mt-8">
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><FiGithub size={28} /></a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><FiLinkedin size={28} /></a>
            </div>
        </div>
    </div>
);

type View = 'home' | 'work' | 'about';

export default function RecruiterView() {
    const [view, setView] = useState<View>('home');

    const renderView = () => {
        switch(view) {
            case 'home': return <HomeView onNavigate={setView} />;
            case 'work': return <WorkView />;
            case 'about': return <AboutView />;
            default: return <HomeView onNavigate={setView} />;
        }
    };

  return (
    <div className="flex flex-col min-h-screen animated-background text-slate-300 font-sans antialiased">
      <MatrixWaveBackground />
      <header className="sticky top-0 bg-slate-900/50 backdrop-blur-lg z-50 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => setView('home')} className="heading-font text-2xl font-bold text-white hover:opacity-80 transition-opacity">Logo</button>
          <nav className="hidden md:flex items-center gap-8">
            <NavLink onClick={() => setView('home')} isActive={view === 'home'}>Home</NavLink>
            <NavLink onClick={() => setView('work')} isActive={view === 'work'}>Work</NavLink>
            <NavLink onClick={() => setView('about')} isActive={view === 'about'}>Contact</NavLink>
          </nav>
          <a href="#" className="hidden md:inline-block bg-slate-800 text-slate-300 px-5 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors border border-slate-700">Download CV</a>
        </div>
      </header>

      <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-16">
        {renderView()}
      </main>

      <footer className="bg-slate-900/30 border-t border-slate-800 z-10">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
            <button onClick={() => { localStorage.removeItem("userRole"); window.location.reload(); }} className="text-slate-600 hover:text-slate-400 transition-colors text-xs">Reset Portfolio Choice</button>
        </div>
      </footer>
    </div>
  );
}