#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Comprehensive color mapping from dark mode oklch to light mode Tailwind
const replacements = [
  // Dark section backgrounds
  { from: /bg-\[oklch\(0\.15_0\.04_240\)\]/g, to: 'bg-white' },
  { from: /bg-\[oklch\(0\.13_0\.03_240\)\]/g, to: 'bg-gray-50' },
  { from: /bg-\[oklch\(0\.16_0\.03_240\)\]/g, to: 'bg-white' },
  { from: /bg-\[oklch\(0\.18_0\.02_240\)\]/g, to: 'bg-gray-50' },
  
  // Dark text colors
  { from: /text-white(?![\w/-])/g, to: 'text-gray-900' },
  { from: /text-white\/90/g, to: 'text-gray-900' },
  { from: /text-white\/80/g, to: 'text-gray-700' },
  { from: /text-white\/70/g, to: 'text-gray-700' },
  { from: /text-white\/60/g, to: 'text-gray-600' },
  { from: /text-white\/50/g, to: 'text-gray-600' },
  { from: /text-white\/40/g, to: 'text-gray-500' },
  { from: /text-white\/30/g, to: 'text-gray-400' },
  { from: /text-white\/20/g, to: 'text-gray-300' },
  { from: /text-white\/10/g, to: 'text-gray-200' },
  
  // Dark backgrounds with opacity
  { from: /bg-white\/20/g, to: 'bg-gray-100' },
  { from: /bg-white\/15/g, to: 'bg-gray-100' },
  { from: /bg-white\/10/g, to: 'bg-gray-50' },
  { from: /bg-white\/5/g, to: 'bg-white' },
  
  // Dark borders
  { from: /border-white\/40/g, to: 'border-gray-300' },
  { from: /border-white\/20/g, to: 'border-gray-200' },
  { from: /border-white\/10/g, to: 'border-gray-200' },
  
  // Emerald/primary oklch colors
  { from: /bg-\[oklch\(0\.52_0\.17_155\/0\.4\)\]/g, to: 'bg-emerald-200' },
  { from: /bg-\[oklch\(0\.52_0\.17_155\/0\.3\)\]/g, to: 'bg-emerald-200' },
  { from: /bg-\[oklch\(0\.52_0\.17_155\/0\.2\)\]/g, to: 'bg-emerald-100' },
  { from: /bg-\[oklch\(0\.52_0\.17_155\/0\.15\)\]/g, to: 'bg-emerald-100' },
  { from: /text-\[oklch\(0\.52_0\.17_155\)\]/g, to: 'text-emerald-600' },
  { from: /border-\[oklch\(0\.52_0\.17_155\)\]/g, to: 'border-emerald-500' },
  { from: /border-\[oklch\(0\.52_0\.17_155\/0\.3\)\]/g, to: 'border-emerald-200' },
  { from: /shadow-\[oklch\(0\.52_0\.17_155\/0\.3\)\]/g, to: 'shadow-emerald-200' },
  
  // Amber/accent oklch colors  
  { from: /bg-\[oklch\(0\.72_0\.14_75\/0\.4\)\]/g, to: 'bg-amber-200' },
  { from: /bg-\[oklch\(0\.72_0\.14_75\/0\.3\)\]/g, to: 'bg-amber-200' },
  { from: /bg-\[oklch\(0\.72_0\.14_75\/0\.2\)\]/g, to: 'bg-amber-100' },
  { from: /text-\[oklch\(0\.72_0\.14_75\)\]/g, to: 'text-amber-600' },
  { from: /border-\[oklch\(0\.72_0\.14_75\/0\.3\)\]/g, to: 'border-amber-300' },
  { from: /shadow-\[oklch\(0\.72_0\.14_75\/0\.4\)\]/g, to: 'shadow-amber-200' },
];

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    
    replacements.forEach(({ from, to }) => {
      content = content.replace(from, to);
    });
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
    return false;
  }
}

function walk(dir) {
  let count = 0;
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        count += walk(fullPath);
      } else if (file.match(/\.(tsx?|jsx?)$/)) {
        if (processFile(fullPath)) {
          console.log(`✓ ${path.relative('/vercel/share/v0-project', fullPath)}`);
          count++;
        }
      }
    });
  } catch (err) {
    console.error(`Error in directory ${dir}:`, err.message);
  }
  return count;
}

console.log('Converting all files to light theme...\n');
const count = walk('/vercel/share/v0-project');
console.log(`\n✓ Converted ${count} files`);
