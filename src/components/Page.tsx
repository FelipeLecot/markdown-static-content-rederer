import React from 'react';

interface PageProps {
  content: string;
}

export const Page: React.FC<PageProps> = ({ content }) => {
  const [state, setState] = React.useState(0);
  return (
    <div>
      <h1>SSR Pages</h1>
      <p>{state}</p>
      <button onClick={() => setState(state + 1)}>Click me</button>
      <div id='content' dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
