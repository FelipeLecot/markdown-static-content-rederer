import React from 'react';

interface PageProps {
  content: string;
}

export const Page: React.FC<PageProps> = ({ content }) => {
  return (
    <div>
      <h1>SSR Pages</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
