const express = require('express');
const cors = require('cors');
const farmAdvisor = require('../agents/farmAdvisor'); // ✅ adjusted path

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.post('/api/farm-advice', (req, res) => {
  const { crop, phase } = req.body;
  const advice = farmAdvisor(crop, phase);
  res.json({ advice });
});

app.listen(PORT, () => {
  console.log(`🌿 Farm Advisor API running at http://localhost:${PORT}`);
});
