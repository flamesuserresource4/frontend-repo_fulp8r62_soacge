import React from 'react';

const SkillsEducation = ({ skills = {}, education = [] }) => {
  return (
    <section className="mt-6" aria-label="Skills and Education">
      <h2 className="text-lg font-semibold tracking-tight text-gray-900">Skills & Education</h2>

      <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-medium text-gray-900">Skills</h3>
          <div className="mt-2 space-y-3">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <p className="text-sm font-medium text-gray-700">{category}</p>
                <p className="text-gray-700">{Array.isArray(items) ? items.join(', ') : items}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900">Education</h3>
          <div className="mt-2 space-y-3">
            {education.map((edu, idx) => (
              <div key={idx} className="break-inside-avoid-page">
                <p className="font-medium text-gray-900">{edu.institution}</p>
                <p className="text-gray-700">{edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.start} — {edu.end}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsEducation;
