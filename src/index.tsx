import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import markdownIt from 'markdown-it';
import { Page } from './components/Page';
import { StaticRouter } from 'react-router-dom';
import generateSitemap from './utils/generateSitemap';

const app = express();
const md = new markdownIt();

app.use(express.static('./public'));

const PORT = process.env.PORT || 3001;

app.get("/sitemap.xml", async (req: Request, res: Response): Promise<void> => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
  res.status(200).send(await generateSitemap());
});

app.get("*", async (req: Request, res: Response): Promise<void> => {
  const pagePath = path.join(__dirname, '/content/', req.url || '');
  let err404 = false;
  if (!fs.existsSync(pagePath)) {
    err404 = true;
  }

  const mdFilePath = path.join(pagePath, 'index.md');
  const templateFilePath = path.join(__dirname, 'templates', '/template.html');
  const templateErrorPath = path.join(__dirname, 'templates', '/error.html');

  if (!fs.existsSync(mdFilePath)) {
    err404 = true;
  }

  if (err404) {
    const errorTemplate = fs.readFileSync(templateErrorPath, 'utf-8');
    const errorPage = errorTemplate.replace(/{{error}}/g, '404 Page not found');
    return res.status(404).send(errorPage);
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
    const renderedPage = template.replace('{{title}}', "Welcome to Acme").replace('{{content}}', reactHtml);

    res.status(200).send(renderedPage);
  } catch (error) {
    console.error('Error rendering page:', error);
    res.status(500).send('Internal Server Error');
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export { app };