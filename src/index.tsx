import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import markdownIt from 'markdown-it';
import { Page } from './components/Page';
import { StaticRouter } from 'react-router-dom';

const app = express();
const md = new markdownIt();

app.use(express.static(path.join(__dirname, '/public')));

const PORT = 3001;

app.get('*', async (req: Request, res: Response): Promise<any> => {
  const pagePath = path.join(__dirname, '/content/', req.url || '');

  if (!fs.existsSync(pagePath)) {
    return res.status(404).send('Page not found');
  }

  const mdFilePath = path.join(pagePath, 'index.md');
  const templateFilePath = path.join(__dirname, '/template.html');

  if (!fs.existsSync(mdFilePath)) {
    return res.status(404).send('Content not found');
  }

  try {
    const content = fs.readFileSync(mdFilePath, 'utf-8');
    const htmlContent = md.render(content);
    
    const jsx = (
      <StaticRouter location={req.url}>
        <Page content={htmlContent} />
      </StaticRouter>
    );

    const reactHtml = ReactDOMServer.renderToString(jsx);
    
    const template = fs.readFileSync(templateFilePath, 'utf-8');
    const renderedPage = template.replace('{{content}}', reactHtml);

    res.status(200).send(renderedPage);
  } catch (error) {
    console.error('Error rendering page:', error);
    res.status(500).send('Internal Server Error');
  }
});

if (require.main === module) {
  // Only start the server if this file is run directly, not imported
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export { app };