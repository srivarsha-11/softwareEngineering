const { spawn } = require('child_process');
const path = require('path');

console.log('====================================================');
console.log(' Launching Digital Crime AI/ML Project Microservices');
console.log('====================================================');

const pythonExe = path.join(__dirname, 'venv', 'Scripts', 'python.exe');
const mlApp = path.join(__dirname, 'ml_service', 'app.py');
const serverApp = path.join(__dirname, 'server', 'server.js');

// 1. Python ML Microservice (Port 5000)
console.log('[1/3] Starting Python ML Microservice on http://localhost:5000...');
const mlProcess = spawn(pythonExe, [mlApp], { cwd: path.join(__dirname, 'ml_service'), stdio: 'inherit', shell: true });

// 2. Express API Gateway (Port 3001)
console.log('[2/3] Starting Node Express API Gateway on http://localhost:3001...');
const serverProcess = spawn('node', [serverApp], { cwd: path.join(__dirname, 'server'), stdio: 'inherit', shell: true });

// 3. React Vite Frontend Dashboard (Port 5173 / 3000)
console.log('[3/3] Starting React Vite Frontend Dashboard...');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const clientProcess = spawn(npmCmd, ['run', 'dev'], { cwd: path.join(__dirname, 'client'), stdio: 'inherit', shell: true });


process.on('SIGINT', () => {
  console.log('\nShutting down all microservices...');
  mlProcess.kill();
  serverProcess.kill();
  clientProcess.kill();
  process.exit(0);
});
