import React from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

interface ContactSectionProps {
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export default function ContactSection({ email, githubUrl, linkedinUrl }: ContactSectionProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h3 className="heading-font text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 mb-4">Get In Touch</h3>
      <p className="text-slate-400 text-lg mb-8"> I'm currently open to new opportunities and collaborations. Feel free to reach out for a conversation about technology, projects, or just to say hello! </p>
      <a href={`mailto:${email}`} className="font-semibold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent text-2xl hover:opacity-80 transition-opacity inline-block mb-8"> {email} </a>
      <div className="flex justify-center gap-6 mt-8">
        {githubUrl && <a href={githubUrl} className="text-slate-500 hover:text-white transition-colors"><FiGithub size={28} /></a>}
        {linkedinUrl && <a href={linkedinUrl} className="text-slate-500 hover:text-white transition-colors"><FiLinkedin size={28} /></a>}
      </div>
    </div>
  );
} 