import React from 'react';

interface PageProps {
  content: string;
}

export const Page: React.FC<PageProps> = ({ content }) => {
  return (
    <>
      <div id='content' dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};
