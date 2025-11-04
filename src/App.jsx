import React, { useMemo } from 'react';
import Header from './components/Header.jsx';
import Summary from './components/Summary.jsx';
import Experience from './components/Experience.jsx';
import SkillsEducation from './components/SkillsEducation.jsx';

function App() {
  const resume = useMemo(() => ({
    name: 'Alex Johnson',
    title: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    website: 'https://alexjohnson.dev',
    linkedin: 'https://www.linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson',
    summary:
      'Results-driven software engineer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud-native architectures. Passionate about shipping accessible, performant, and maintainable products that drive business outcomes.',
    roles: [
      {
        title: 'Senior Frontend Engineer',
        company: 'Acme Corp',
        start: 'Jan 2022',
        end: 'Present',
        location: 'Remote',
        summary:
          'Lead development of a design system and modern frontend platform serving millions of users.',
        achievements: [
          'Owned migration from legacy stack to React + TypeScript, reducing bundle size by 42% and improving Core Web Vitals (LCP -30%).',
          'Built accessible UI components (WCAG 2.1 AA) increasing keyboard navigability and screen-reader coverage to 100%.',
          'Partnered with Design and Product to deliver 25+ features on time with 0 critical regressions.',
        ],
        tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Jest', 'Playwright'],
      },
      {
        title: 'Full-Stack Engineer',
        company: 'Nimbus Labs',
        start: 'Jun 2019',
        end: 'Dec 2021',
        location: 'San Francisco, CA',
        summary:
          'Developed end-to-end product features across API, data, and frontend layers for a SaaS analytics platform.',
        achievements: [
          'Designed and implemented a FastAPI microservice processing 50k+ events/min with MongoDB and Kafka.',
          'Introduced CI/CD pipelines and test automation, cutting release time by 60%.',
          'Collaborated with Data team to build interactive dashboards with charting and real-time updates.',
        ],
        tech: ['FastAPI', 'MongoDB', 'Docker', 'React', 'Chart.js', 'AWS'],
      },
      {
        title: 'Software Engineer',
        company: 'BrightApps',
        start: 'Aug 2016',
        end: 'May 2019',
        location: 'Austin, TX',
        summary:
          'Shipped customer-facing features and internal tooling to accelerate development workflows.',
        achievements: [
          'Built feature-flag framework enabling safe rollouts and A/B experiments across the product.',
          'Optimized critical APIs (Python) decreasing P95 latency from 900ms to 240ms.',
        ],
        tech: ['Python', 'Flask', 'PostgreSQL', 'Redis', 'React'],
      },
    ],
    skills: {
      Languages: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
      Frontend: ['React', 'Vite', 'Next.js', 'Tailwind', 'Redux', 'Jest'],
      Backend: ['FastAPI', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
      Cloud: ['AWS', 'Docker', 'CI/CD', 'Terraform'],
    },
    education: [
      {
        institution: 'University of Texas at Austin',
        degree: 'B.S. in Computer Science',
        start: '2012',
        end: '2016',
      },
    ],
  }), []);

  const printResume = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-10 print:p-0">
        {/* Print/Download button (hidden on print) */}
        <div className="sticky top-0 z-10 mb-6 flex justify-end bg-white/80 py-2 backdrop-blur print:hidden">
          <button
            onClick={printResume}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Download or print resume"
          >
            Download PDF
          </button>
        </div>

        {/* Main resume content */}
        <div className="mx-auto max-w-3xl print:max-w-none print:px-8 print:py-10">
          <Header
            name={resume.name}
            title={resume.title}
            location={resume.location}
            email={resume.email}
            phone={resume.phone}
            website={resume.website}
            linkedin={resume.linkedin}
            github={resume.github}
          />

          <Summary summary={resume.summary} />
          <Experience roles={resume.roles} />
          <SkillsEducation skills={resume.skills} education={resume.education} />
        </div>
      </div>

      {/* Print styles for ATS-friendly PDF */}
      <style>
        {`
          @media print {
            html, body { background: #ffffff !important; }
            * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            a { color: #111827 !important; text-decoration: none !important; }
            header, section, article { page-break-inside: avoid; }
          }
        `}
      </style>
    </div>
  );
}

export default App;
