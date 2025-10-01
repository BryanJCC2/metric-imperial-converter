require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const apiRoutes = require('./routes/api.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Test runner endpoint for FreeCodeCamp
app.get('/_api/get-tests', (req, res) => {
  console.log('Running tests for FreeCodeCamp...');
  const { spawn } = require('child_process');
  
  // Use spawn instead of exec to handle the running server
  const testProcess = spawn('npm', ['test'], {
    env: { ...process.env, NODE_ENV: 'test' },
    shell: true
  });
  
  let stdout = '';
  let stderr = '';
  
  testProcess.stdout.on('data', (data) => {
    stdout += data.toString();
  });
  
  testProcess.stderr.on('data', (data) => {
    stderr += data.toString();
  });
  
  testProcess.on('close', (code) => {
    // Parse the test results
    const passingMatch = stdout.match(/(\d+) passing/);
    const failingMatch = stdout.match(/(\d+) failing/);
    
    const passing = passingMatch ? parseInt(passingMatch[1]) : 0;
    const failing = failingMatch ? parseInt(failingMatch[1]) : 0;
    
    res.json({
      passed: passing,
      failed: failing,
      tests: passing + failing,
      output: stdout
    });
  });
  
  // Timeout after 30 seconds
  setTimeout(() => {
    testProcess.kill();
    if (!res.headersSent) {
      res.json({ error: 'Test execution timeout' });
    }
  }, 30000);
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Only start the server if not in test mode or if explicitly running
if (process.env.NODE_ENV !== 'test' || require.main === module) {
  const listener = app.listen(PORT, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
    console.log('Ready for FreeCodeCamp validation!');
  });
}

module.exports = app;