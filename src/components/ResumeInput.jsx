import React from 'react';

const ACCEPTED = ['text/plain'];

const ResumeInput = ({ value, onChange }) => {
  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      alert('Please upload a .txt file. For PDF/DOCX, paste the text into the box.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result?.toString() || '');
    reader.readAsText(file);
  };

  return (
    <section aria-label="Resume input" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Your Resume</h2>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
          Upload .txt
          <input type="file" accept=".txt,text/plain" className="hidden" onChange={handleFile} />
        </label>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your resume text here (name, contact, summary, experience, skills, education)."
        rows={12}
        className="w-full rounded-md border border-gray-300 p-3 font-mono text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <p className="text-xs text-gray-500">Tip: Export your resume to .txt and upload it, or copy/paste from your editor.</p>
    </section>
  );
};

export default ResumeInput;
