import React from 'react';

const Summary = ({ summary }) => {
  return (
    <section className="mt-6" aria-label="Professional Summary">
      <h2 className="text-lg font-semibold tracking-tight text-gray-900">Professional Summary</h2>
      <p className="mt-2 text-gray-700 leading-relaxed">
        {summary}
      </p>
    </section>
  );
};

export default Summary;
