#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Color mappings from dark mode to light mode
const colorMap = {
  // Dark oklch values to light mode colors
  "oklch(0.52_0.17_155)": "emerald-500",
  "oklch(0.52_0.17_155/0.9)": "emerald-600",
  "oklch(0.52_0.17_155/0.8)": "emerald-500",
  "oklch(0.52_0.17_155/0.7)": "emerald-400",
  "oklch(0.52_0.17_155/0.6)": "emerald-400",
  "oklch(0.52_0.17_155/0.5)": "emerald-300",
  "oklch(0.52_0.17_155/0.4)": "emerald-300",
  "oklch(0.52_0.17_155/0.3)": "emerald-200",
  "oklch(0.52_0.17_155/0.2)": "emerald-100",
  "oklch(0.52_0.17_155/0.15)": "emerald-100",
  "oklch(0.72_0.14_75)": "amber-500",
  "oklch(0.72_0.14_75/0.4)": "amber-300",
  "oklch(0.72_0.14_75/0.3)": "amber-200",
  "oklch(0.72_0.14_75/0.2)": "amber-100",
  // Dark text/background combinations
  "text-white": "text-gray-900",
  "text-white/80": "text-gray-700",
  "text-white/70": "text-gray-700",
  "text-white/60": "text-gray-600",
  "text-white/50": "text-gray-600",
  "text-white/40": "text-gray-500",
  "text-white/30": "text-gray-400",
  "text-white/20": "text-gray-300",
  "text-white/10": "text-gray-200",
  "bg-white/5": "bg-white",
  "bg-white/10": "bg-gray-50",
  "bg-white/15": "bg-gray-100",
  "bg-white/20": "bg-gray-100",
  "border-white/10": "border-gray-200",
  "border-white/20": "border-gray-200",
  "shadow-2xl shadow-[oklch(0.22_0.09_152/0.3)]": "shadow-md",
};

function convertFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Apply color mappings
  for (const [oldColor, newColor] of Object.entries(colorMap)) {
    if (content.includes(oldColor)) {
      content = content.replaceAll(oldColor, newColor);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Converted ${filePath}`);
  }

  return modified;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !file.startsWith('.')) {
      walkDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      convertFile(fullPath);
    }
  });
}

// Start conversion
const componentsDir = path.join(__dirname, '..', 'components');
const appDir = path.join(__dirname, '..', 'app');

console.log('Converting to light theme...\n');
walkDir(componentsDir);
walkDir(appDir);
console.log('\n✓ Light theme conversion complete!');
