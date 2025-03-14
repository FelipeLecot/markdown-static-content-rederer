import fs from "fs-extra";
import path from "path";

async function getValidPaths(directory: string): Promise<string[]> {
  try {
    if (!(await fs.pathExists(directory))) {
      console.error(`Directory does not exist: ${directory}`);
      return [];
    }

    const validPaths: string[] = [];
    const files = await fs.readdir(directory, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(directory, file.name);
      if (file.isDirectory()) {
        const indexPath = path.join(fullPath, "index.md");
        if (await fs.pathExists(indexPath)) {
          validPaths.push(fullPath);
        }

        const subPaths = await getValidPaths(fullPath);
        validPaths.push(...subPaths);
      }
    }
    return validPaths;
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    return [];
  }
}

export default getValidPaths;
