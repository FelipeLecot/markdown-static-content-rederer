# Features of the Application
This application is a full-stack JavaScript application that returns pages based on URLs that match the paths of the folders and sub-folders in the `src/content` folder. The content of these pages comes from a combination of the template HTML file and a markdown `index.md` file contained in the directory requested. E.g. if the requested path is `/home/about` there must be a `src/content/home/about/index.md` file to be rendered.

Features:
- React on the front-end.
- Express server for handling HTTP requests.
- Markdown files to store content.
- HTML template files to contain the markdown content.
- XML sitemap generator based on the valid paths in the `content` folder.
- Tests to verify that requests to valid URLs return a 200 HTTP status code, that requests to valid URLs return a body that contains the HTML generated from the relevant `index.md` markdown file, and that requests to URLs that do not match content folders return a 404 HTTP status code.

# How to Run, Build, Test, and Collaborate on the Application
## Downloading dependencies
To run, build and test the application you first need to download it's dependencies, navigate to the root directory of the project and run the following command:

```bash
npm i
```

## Running the Application
To run the application, navigate to the root directory of the project and run the following command:

```bash
npm run dev
```

This will start the development server (webpack and express) which updates automatically on changes. The application will be available at `http://localhost:3001`.

## Building the Application
To build the application, navigate to the root directory of the project and run the following command:

```bash
npm run build-client
npm run build-server
```

This will build the application and create a `dist` folder that contains the compiled code.

## Testing the Application
To test the application, navigate to the root directory of the project and run the following commands:

```bash
npm test
```

This will run the tests and display the results.

```bash
npm lint
```

This will run the linter and display the results.

## Collaborating on the Application
# Branch Protection
The main branch of the repository is protected, meaning that changes cannot be pushed directly to it. To make changes to the main branch, create a pull request and have it pass the checks and be reviewed and approved by at least one other developer.

- All changes must be made through a pull request and reviewed by at least one other developer before being merged into the main branch.
- The pull request must include a clear description of the changes being made.
- The pull request must pass all checks, including tests and linting.

# Backlog 
1. [x] Create Express + React app: Create a basic Express server that serves a React app.
2. [x] Support for markdown files: Add support for reading markdown files and rendering them as HTML inside the tempale file.
3. [x] Style Markdown Content: Style the generated HTML page in a pleasing way.
4. [x] XML sitemap generator: Add a sitemap generator that generates a sitemap based on the valid paths in the `content` folder.
5. [ ] Navbar: Add a navbar to the application to provide easy navigation between pages.
6. [ ] Use React Router on internal links: Use React Router to handle internal links to prevent browser refreshes and improve performance.
7. [ ] Add other error pages: Add error pages for other HTTP status codes, such as 500 Internal Server Error.
8. [ ] Add user authentication: Add restricted folder for authenticated users only.
9. [ ] Add support for accessibility features: Add support for accessibility features, such as screen readers, labels, high contrast mode, dark mode and tab indexes to make the application more accessible to users.
10. [ ] Add support for multiple languages: Add support for multiple languages by using a translation library.