import React from 'react';

const Suggestions = ({ items = [] }) => {
  if (!items.length) return null;
  return (
    <section aria-label="Suggestions" className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">Suggestions to Improve</h2>
      <ul className="list-disc space-y-2 pl-5 text-gray-700 marker:text-gray-400">
        {items.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </section>
  );
};

export default Suggestions;
