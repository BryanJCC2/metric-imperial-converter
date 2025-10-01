const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const input = req.query.input;
  if (!input) return res.json({ error: 'No input provided' });

  const result = convertHandler.convertAll(input);

  if (result.error) return res.json({ error: result.error });

  res.json(result);
});

module.exports = router;