import React from 'react';

const Experience = ({ roles = [] }) => {
  return (
    <section className="mt-6" aria-label="Experience">
      <h2 className="text-lg font-semibold tracking-tight text-gray-900">Experience</h2>
      <div className="mt-3 space-y-6">
        {roles.map((role, idx) => (
          <article key={idx} className="break-inside-avoid-page">
            <header className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-medium text-gray-900">{role.title} · {role.company}</h3>
              <p className="text-sm text-gray-600">{role.start} — {role.end}</p>
            </header>
            {role.location && <p className="text-sm text-gray-600">{role.location}</p>}
            {role.summary && <p className="mt-2 text-gray-700">{role.summary}</p>}
            {Array.isArray(role.achievements) && role.achievements.length > 0 && (
              <ul className="mt-2 list-disc pl-5 text-gray-700 marker:text-gray-500">
                {role.achievements.map((a, i) => (
                  <li key={i} className="leading-relaxed">{a}</li>
                ))}
              </ul>
            )}
            {Array.isArray(role.tech) && role.tech.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-medium text-gray-700">Keywords:</span> {role.tech.join(', ')}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
