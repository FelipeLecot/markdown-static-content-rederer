import fs from 'fs-extra';
import path from 'path';
import request from 'supertest';
import markdownIt from 'markdown-it';
import { app } from '../index';
import getValidPaths from '../utils/getValidPaths';

const md = new markdownIt();

describe('Express Server Tests', () => {
  let validPaths: string[] = [];
  let contentBasePath: string = '';
  let server: any;

  beforeAll(async () => {
    try {
      const contentPath = path.join('src', 'content');
      
      validPaths = await getValidPaths(contentPath);
  
      server = app.listen(3001);
    } catch (error) {
      console.error('Error in test setup:', error);
    }
  });  

  afterAll((done) => {
    if (server) {
      server.close(() => {
        console.log('Test server closed successfully');
        done();
      });
    } else {
      done();
    }
  });

  test('should return 404 for random invalid URLs', async () => {
    const response = await request(app).get('/random-invalid-path');
    expect(response.status).toBe(404);
  });

  test('should return 200 for valid URLs', async () => {
    console.log(`Running URL tests with ${validPaths.length} paths`);
    if (validPaths.length === 0) {
      console.log('Skipping test - no valid paths found');
      return;
    }
    
    for (const validPath of validPaths) {
      const url = validPath.replace("src\\content\\", '/').replace(/\\/g, '/') || '/';
      const response = await request(app).get(url);
      expect(response.status).toBe(200);
    }
  });

  test('should return HTML for valid URLs', async () => {
    console.log(`Running HTML content tests with ${validPaths.length} paths`);
    if (validPaths.length === 0) {
      console.log('Skipping test - no valid paths found');
      return;
    }
    
    for (const validPath of validPaths) {
      const url = validPath.replace("src\\content\\", '/').replace(/\\/g, '/') || '/';
      const mdPath = path.join(validPath, 'index.md');

      try {
        if (await fs.pathExists(mdPath)) {
          const content = await fs.readFile(mdPath, 'utf-8');
          const htmlContent = md.render(content);

          const response = await request(app).get(url);
          expect(response.status).toBe(200);
          expect(response.text).toContain(htmlContent.trim());
        } else {
          console.log(`Skipping HTML check for ${validPath} - no index.md found`);
        }
      } catch (error) {
        console.error(`Error testing ${validPath}:`, error);
        throw error;
      }
    }
  });
});