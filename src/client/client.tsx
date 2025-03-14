import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Page } from '../components/Page';
import { BrowserRouter } from 'react-router-dom';
import "../styles/content.css"

const content = document.getElementById('content')?.innerHTML || '';

const rootElement = document.getElementById('root');
if (rootElement) {
  hydrateRoot(
    rootElement,
    <BrowserRouter>
      <Page content={content} />
    </BrowserRouter>
  );
}
