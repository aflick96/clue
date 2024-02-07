const { execSync } = require('child_process');

const buildClient = () => {
  console.log('Building React app...');
  execSync('cd client && npm install && npm run build', { stdio: 'inherit' });
};

const setupServer = () => {
  console.log('Installing server dependencies...');
  execSync('cd server && npm install', { stdio: 'inherit' });
};

buildClient();
setupServer();
