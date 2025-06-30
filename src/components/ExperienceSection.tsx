import React from 'react';

interface Experience {
  role: string;
  company: string;
  period: string;
}

export default function ExperienceSection({ workExperience }: { workExperience: Experience[] }) {
  return (
    <section>
      <h3 className="heading-font text-3xl font-bold text-white mb-6">Work Experience</h3>
      <div className="space-y-6 border-l-2 border-slate-800 pl-6">
        {workExperience.map(job => (
          <div key={job.company}>
            <h4 className="text-lg font-semibold text-white">{job.role}</h4>
            <p className="text-slate-400">{job.company} | {job.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 