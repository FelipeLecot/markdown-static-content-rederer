import getValidPaths from "../utils/getValidPaths";
import path from "path";

const generateSitemap = async () => {
  const contentPath = path.join("src", "content");
  const paths = await getValidPaths(contentPath);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `<url>
  <loc>${path}</loc>
</url>`
  )
  .join("\n")}
</urlset>`;

  return sitemap;
};

export default generateSitemap;
