import React, { useMemo, useState } from 'react';
import ResumeInput from './components/ResumeInput.jsx';
import JobInput from './components/JobInput.jsx';
import ScoreBreakdown from './components/ScoreBreakdown.jsx';
import KeywordInsights from './components/KeywordInsights.jsx';
import Suggestions from './components/Suggestions.jsx';

// Simple helpers
const STOP = new Set(['the','and','a','an','to','of','in','on','for','with','is','are','as','by','or','at','from','that','this','it','be','was','were','will','can','our','your','we','you']);
const tokenize = (text) => (text || '')
  .toLowerCase()
  .replace(/[^a-z0-9+.# ]+/g, ' ')
  .split(/\s+/)
  .filter(Boolean);
const keywordsFromText = (text) => {
  const words = tokenize(text).filter((w) => !STOP.has(w) && w.length > 2);
  const counts = new Map();
  for (const w of words) counts.set(w, (counts.get(w) || 0) + 1);
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([w]) => w);
  return ranked.slice(0, 40);
};
const unique = (arr) => [...new Set(arr)];

function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');

  const analysis = useMemo(() => {
    const resumeTokens = tokenize(resumeText);
    const resumeSet = new Set(resumeTokens);

    // Heuristic checks
    const hasEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(resumeText);
    const hasPhone = /\+?\d[\d\s().-]{7,}\d/.test(resumeText);
    const hasLinks = /(https?:\/\/|www\.)[\w.-]+/i.test(resumeText);
    const bullets = (resumeText.match(/\n\s*[•\-*]/g) || []).length;
    const words = resumeTokens.length;

    // Section presence (case-insensitive)
    const hasSections = (['summary','experience','education','skills']).map((s) => new RegExp(`\\b${s}\\b`, 'i').test(resumeText));
    const sectionScore = (hasSections.filter(Boolean).length / 4) * 100;

    // Contact score
    const contactScore = ((hasEmail ? 1 : 0) + (hasPhone ? 1 : 0) + (hasLinks ? 1 : 0)) / 3 * 100;

    // Structure score based on bullets and length
    const lengthOk = words >= 200 && words <= 1200; // rough heuristic
    const bulletOk = bullets >= 3;
    const structureScore = ((lengthOk ? 1 : 0) * 0.5 + (bulletOk ? 1 : 0) * 0.5) * 100;

    // Keyword match
    const jobKeywords = unique(keywordsFromText(jobText));
    const matched = jobKeywords.filter((k) => resumeSet.has(k));
    const missing = jobKeywords.filter((k) => !resumeSet.has(k));
    const keywordScore = jobKeywords.length ? (matched.length / jobKeywords.length) * 100 : 0;

    // Simpler readability: average word length
    const avgLen = resumeTokens.length ? resumeTokens.join('').length / resumeTokens.length : 0;
    const readabilityScore = Math.max(0, Math.min(100, 100 - Math.abs(5 - avgLen) * 20));

    // Total weighted score
    const total = (
      sectionScore * 0.2 +
      contactScore * 0.2 +
      structureScore * 0.2 +
      keywordScore * 0.3 +
      readabilityScore * 0.1
    );

    // Suggestions
    const suggestions = [];
    if (!hasEmail) suggestions.push('Add a professional email address near the top.');
    if (!hasPhone) suggestions.push('Include a reachable phone number with country/area code.');
    if (!hasLinks) suggestions.push('Add links (LinkedIn, portfolio, GitHub) in plain text URLs.');
    if (!hasSections[0]) suggestions.push('Include a concise Professional Summary section.');
    if (!hasSections[1]) suggestions.push('Add an Experience section with bullet points and results.');
    if (!hasSections[2]) suggestions.push('List your Education with degree, institution, and dates.');
    if (!hasSections[3]) suggestions.push('Include a Skills section with role-relevant keywords.');
    if (!bulletOk) suggestions.push('Use clear bullet points (•, -, *) to outline achievements.');
    if (!lengthOk) suggestions.push('Keep total length roughly 1–2 pages (200–1200 words for ATS parsing).');
    if (missing.length) suggestions.push('Incorporate missing job keywords naturally to improve match.');

    return {
      total,
      parts: [
        { label: 'Sections', value: sectionScore },
        { label: 'Contact', value: contactScore },
        { label: 'Structure', value: structureScore },
        { label: 'Keywords', value: keywordScore },
        { label: 'Readability', value: readabilityScore },
      ],
      matched,
      missing,
      jobKeywords,
      suggestions,
    };
  }, [resumeText, jobText]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">ATS Resume Scanner</h1>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.print(); }}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Print/Save PDF
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <ResumeInput value={resumeText} onChange={setResumeText} />
            <JobInput value={jobText} onChange={setJobText} />
          </div>

          <div className="space-y-8">
            <ScoreBreakdown total={analysis.total} parts={analysis.parts} />
            <KeywordInsights matched={analysis.matched} missing={analysis.missing} />
            <Suggestions items={analysis.suggestions} />
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white/50">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-gray-500">
          No data is uploaded; everything runs locally in your browser.
        </div>
      </footer>
    </div>
  );
}

export default App;
