import React from 'react';

const Bar = ({ value }) => (
  <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
    <div className="h-full rounded bg-blue-600" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
  </div>
);

const Row = ({ label, value }) => (
  <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-5">
    <div className="col-span-2 text-sm text-gray-700">{label}</div>
    <div className="col-span-2"><Bar value={value} /></div>
    <div className="text-right text-sm font-medium text-gray-900">{Math.round(value)}%</div>
  </div>
);

const ScoreBreakdown = ({ total, parts }) => {
  return (
    <section aria-label="ATS score" className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-gray-900">ATS Score</h2>
        <p className="text-2xl font-bold text-blue-700">{Math.round(total)}%</p>
      </div>
      <div className="space-y-3 rounded-lg border border-gray-200 p-4">
        {parts.map((p) => (
          <Row key={p.label} label={p.label} value={p.value} />
        ))}
      </div>
    </section>
  );
};

export default ScoreBreakdown;
