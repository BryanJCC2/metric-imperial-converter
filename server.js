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
  const { exec } = require('child_process');
  
  exec('npm test', { env: { ...process.env, NODE_ENV: 'test' } }, (error, stdout, stderr) => {
    if (error && !stdout.includes('passing')) {
      console.error('Test execution error:', error);
      return res.json({ error: 'Failed to run tests', details: stderr });
    }
    
    // Parse the test results
    const passingMatch = stdout.match(/(\d+) passing/);
    const failingMatch = stdout.match(/(\d+) failing/);
    
    const passing = passingMatch ? parseInt(passingMatch[1]) : 0;
    const failing = failingMatch ? parseInt(failingMatch[1]) : 0;
    
    res.json({
      passed: passing,
      failed: failing,
      output: stdout
    });
  });
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const listener = app.listen(PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
  if (process.env.NODE_ENV !== 'test') {
    console.log('Ready for FreeCodeCamp validation!');
  }
});

module.exports = app;