import React from 'react';

interface Skills {
  [category: string]: string[];
}

export default function SkillsSection({ skills }: { skills: Skills }) {
  return (
    <section className="pt-2">
      <h3 className="heading-font text-3xl font-bold text-white mb-6">Core Skills</h3>
      <div className="flex flex-wrap gap-2">
        {Object.values(skills).flat().map(skill => (
          <span key={skill} className="bg-cyan-400/10 text-cyan-300 px-3 py-1 rounded-full font-medium">{skill}</span>
        ))}
      </div>
    </section>
  );
} 