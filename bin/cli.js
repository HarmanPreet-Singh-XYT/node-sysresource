#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create a readline interface to ask the user for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt the user for folder name and API key
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Function to copy template files and folders recursively
function copyTemplateFiles(templateDir, targetDir) {
  fs.readdirSync(templateDir).forEach(file => {
    const source = path.join(templateDir, file);
    const destination = path.join(targetDir, file);

    // If it's a directory, create it and copy contents recursively
    if (fs.lstatSync(source).isDirectory()) {
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
      }
      copyTemplateFiles(source, destination); // Recursive copy for directories
    } else {
      fs.copyFileSync(source, destination); // Copy files
    }
  });
}

// Function to create .env file with the provided API key
function createEnvFile(apiKey, targetDir) {
  const envContent = `SYSRESOURCE_API_KEY='${apiKey}'\n`;
  fs.writeFileSync(path.join(targetDir, '.env'), envContent, 'utf-8');
}

// Main script logic
async function init() {
  // Step 1: Ask for the folder name
  const folderName = await askQuestion('Enter the folder name: ') || 'node-sysresource';
  const projectPath = path.join(process.cwd(), folderName);
  
  // Step 2: Ask for the API key
  const apiKey = await askQuestion('Enter your API_KEY: ');
  
  rl.close(); // Close the readline interface
  
  // Step 3: Create the folder if it doesn't exist
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
    console.log(`Created folder: ${folderName}`);
  } else {
    console.error(`Folder ${folderName} already exists!`);
    process.exit(1);
  }

  // Step 4: Copy template files (including components and .gitignore) into the folder
  const templateDir = path.join(__dirname, '../template');
  copyTemplateFiles(templateDir, projectPath);
  
  // Step 5: Create .env file with the API key
  createEnvFile(apiKey, projectPath);
  console.log(`Created .env file with API_KEY in ${folderName}`);
  
  // Step 6: Install npm dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { cwd: projectPath, stdio: 'inherit' });

  // Step 7: Run npm start
  console.log(`cd ./${folderName} && npm start`);
}

init();
