const express = require("express");
const cors = require("cors");
const farmAdvisor = require("./agents/farmAdvisor");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/advise", (req, res) => {
  const { crop, phase } = req.body;
  const advice = farmAdvisor(crop, phase);
  res.json({ advice });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Farm Advisor API running on port ${PORT}`));
