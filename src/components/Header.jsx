import React from 'react';

const Header = ({ name, title, location, email, phone, website, linkedin, github }) => {
  return (
    <header className="w-full border-b border-gray-200 pb-4 print:border-none" aria-label="Resume header">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900">{name}</h1>
      <p className="mt-1 text-gray-700">{title}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
        {location && <span aria-label="Location">{location}</span>}
        {email && (
          <a href={`mailto:${email}`} className="hover:text-gray-900 underline underline-offset-4">
            {email}
          </a>
        )}
        {phone && <span>{phone}</span>}
        {website && (
          <a href={website} className="hover:text-gray-900 underline underline-offset-4" target="_blank" rel="noreferrer">
            {website.replace(/^https?:\/\//, '')}
          </a>
        )}
        {linkedin && (
          <a href={linkedin} className="hover:text-gray-900 underline underline-offset-4" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        )}
        {github && (
          <a href={github} className="hover:text-gray-900 underline underline-offset-4" target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
