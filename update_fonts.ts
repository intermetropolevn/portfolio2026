import * as fs from 'fs';
import * as path from 'path';

function replaceFonts(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Font links
  content = content.replace(
    /family=Syne[^&]*&|family=DM\+Sans[^&]*&/g,
    ''
  );
  
  content = content.replace(
    /family=Playfair\+Display[^&]*&family=Space\+Mono[^&]*&family=Work\+Sans[^&]*&display=swap/g,
    'family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap'
  );

  // Unify Google fonts link if it's the old one
  content = content.replace(
    /href="https:\/\/fonts\.googleapis\.com\/css2\?family=Syne:.*?" rel="stylesheet"/,
    'href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap" rel="stylesheet"'
  );

  // CSS mappings
  content = content.replace(/'DM Sans', sans-serif/g, "'Work Sans', sans-serif");
  content = content.replace(/'Syne', sans-serif/g, "'Playfair Display', serif");
  content = content.replace(/'Inter', sans-serif/g, "'Work Sans', sans-serif");
  content = content.replace(/font-family: monospace;/g, "font-family: 'Space Mono', monospace;");

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${filePath}`);
}

const filesToUpdate = [
  'src/about_page.html',
  'src/lab_page.html',
  'src/agentic_loop.html',
  'src/dashboard_content.html',
];

filesToUpdate.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    replaceFonts(fullPath);
  }
});
