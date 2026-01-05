const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FONT_DIR = path.join(__dirname, '../public/fonts');
// Using a User-Agent that requests woff2
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
// User requested: Headland One, Play, Raleway, Space Mono, Stalinist One, Press Start 2P
const CSS_URL = 'https://fonts.googleapis.com/css2?family=Headland+One&family=Play:wght@400;700&family=Press+Start+2P&family=Raleway:ital,wght@0,100..900;1,100..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Stalinist+One&display=swap';

if (!fs.existsSync(FONT_DIR)) {
  fs.mkdirSync(FONT_DIR, { recursive: true });
}

function fetchCSS(url) {
  try {
    // using curl to fetch CSS because it's proven to work in this environment
    return execSync(`curl -s -H "User-Agent: ${UA}" "${url}"`).toString();
  } catch (error) {
    console.error('Failed to fetch CSS via curl:', error.message);
    process.exit(1);
  }
}

function downloadFile(url, dest) {
  try {
    console.log(`Downloading to ${path.basename(dest)}...`);
    execSync(`curl -s -o "${dest}" "${url}"`);
  } catch (error) {
    console.error(`Failed to download ${url}:`, error.message);
  }
}

function main() {
  console.log('Fetching CSS...');
  const css = fetchCSS(CSS_URL);
  
  // Regex to match font-family, font-weight, and src url
  const fontFaceRegex = /@font-face\s*{[^}]*?font-family:\s*'([^']+)';[^}]*?font-weight:\s*(\d+);[^}]*?src:\s*url\(([^)]+)\)/g;
  
  let match;
  let count = 0;
  
  while ((match = fontFaceRegex.exec(css)) !== null) {
    const family = match[1].replace(/\s+/g, '-').toLowerCase();
    const weight = match[2];
    const url = match[3];
    const filename = `${family}-${weight}.woff2`;
    const dest = path.join(FONT_DIR, filename);
    
    downloadFile(url, dest);
    count++;
  }
  
  console.log(`Done! Downloaded ${count} font files to ${FONT_DIR}`);
}

main();
