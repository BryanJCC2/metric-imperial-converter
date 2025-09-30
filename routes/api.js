const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  try {
    const input = req.query.input;
    
    if (!input) {
      return res.status(400).json({ error: 'No input provided' });
    }

    const result = convertHandler.convertAll(input);
    
    if (result.error) {
      if (result.error === 'invalid number and unit') {
        return res.json({ error: 'invalid number and unit' });
      } else if (result.error === 'invalid number') {
        return res.json({ error: 'invalid number' });
      } else if (result.error === 'invalid unit') {
        return res.json({ error: 'invalid unit' });
      } else {
        return res.status(400).json({ error: result.error });
      }
    }

    res.json(result);
    
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Metric-Imperial Converter API!' });
});

module.exports = router;