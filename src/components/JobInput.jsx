import React from 'react';

const JobInput = ({ value, onChange }) => {
  return (
    <section aria-label="Job description input" className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">Target Job Description</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here to tailor your resume and improve keyword match."
        rows={10}
        className="w-full rounded-md border border-gray-300 p-3 font-mono text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <p className="text-xs text-gray-500">We extract keywords and responsibilities to compute match scores.</p>
    </section>
  );
};

export default JobInput;
