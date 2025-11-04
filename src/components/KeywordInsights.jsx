import React from 'react';

const Pill = ({ children, ok }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${ok ? 'bg-green-50 text-green-700 ring-1 ring-green-200' : 'bg-red-50 text-red-700 ring-1 ring-red-200'}`}>
    {children}
  </span>
);

const KeywordInsights = ({ matched = [], missing = [] }) => {
  return (
    <section aria-label="Keyword insights" className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">Keyword Match</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="mb-2 text-sm font-medium text-gray-700">Matched</p>
          <div className="flex flex-wrap gap-2">
            {matched.length === 0 && <p className="text-sm text-gray-500">No matches yet.</p>}
            {matched.map((k) => (
              <Pill key={k} ok>
                {k}
              </Pill>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="mb-2 text-sm font-medium text-gray-700">Missing</p>
          <div className="flex flex-wrap gap-2">
            {missing.length === 0 && <p className="text-sm text-gray-500">Great! Nothing critical missing.</p>}
            {missing.map((k) => (
              <Pill key={k} ok={false}>
                {k}
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeywordInsights;
