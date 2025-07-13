const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

console.log('Starting Enhanced Farm Advisor...');

// Enhanced crop advice
const cropAdvice = {
  rice: {
    soilprep: "🌾 **Rice Soil Preparation:**\n• Plow the land and level it properly for uniform water distribution\n• Use organic compost (10-15 tons/hectare) if available\n• Prepare puddled fields for transplanting\n• Create proper bunds for water retention\n• Remove weeds and crop residues thoroughly",
    sowing: "🌱 **Rice Sowing Guidelines:**\n• Use high-quality, certified seeds at 20-25 kg/hectare\n• Ensure the soil is moist but not flooded during sowing\n• Plant seedlings 15-20 cm apart with proper spacing\n• Maintain 2-3 cm water depth after transplanting",
    irrigation: "💧 **Rice Water Management:**\n• Maintain 2-3 cm water level consistently\n• Avoid water stagnation for long periods\n• Drain water 15 days before harvest\n• Critical stages: tillering, flowering, grain filling",
    fertilizing: "🧪 **Rice Fertilization:**\n• Apply NPK 4:2:1 ratio (120:60:40 kg/hectare)\n• Split nitrogen application for better efficiency\n• Basal dose: 50% N + full P + full K\n• Top dressing at tillering and panicle stages",
    harvest: "✂️ **Rice Harvesting:**\n• Harvest when 80-85% grains turn golden yellow\n• Optimal moisture content: 20-22%\n• Use sharp sickles for clean cutting\n• Avoid over-drying to prevent grain breakage"
  },
  wheat: {
    soilprep: "🌾 **Wheat Field Preparation:**\n• Deep plowing followed by 2-3 harrowings\n• Apply farmyard manure @ 10-15 tons/hectare\n• Level the field properly for uniform irrigation\n• Ensure good drainage to prevent waterlogging",
    sowing: "🌱 **Wheat Sowing:**\n• Sow in November-December for optimal growth\n• Use certified seeds @ 100-125 kg/hectare\n• Maintain row spacing of 20-23 cm\n• Sowing depth should be 3-5 cm",
    irrigation: "💧 **Wheat Irrigation:**\n• First irrigation 20-25 days after sowing\n• Critical stages: tillering, flowering, grain filling\n• Apply 5-6 cm water at each irrigation\n• Avoid irrigation during grain maturity",
    fertilizing: "🧪 **Wheat Fertilization:**\n• Apply 120 kg N, 60 kg P2O5, 40 kg K2O per hectare\n• Split nitrogen in 3 doses throughout season\n• Basal application before sowing\n• Top dressing at tillering and booting stages",
    harvest: "✂️ **Wheat Harvesting:**\n• Harvest when moisture content is 20-25%\n• Grains should be hard and golden yellow\n• Use combine harvester for efficiency\n• Avoid over-delaying to prevent shattering"
  },
  maize: {
    soilprep: "🌽 **Maize Field Preparation:**\n• Prepare fine, well-pulverized seedbed\n• Apply 20-25 tons FYM/hectare\n• Ensure good drainage and aeration\n• Create ridges and furrows for water management",
    sowing: "🌱 **Maize Sowing:**\n• Sow during kharif (June-July) or rabi season\n• Maintain 60-75 cm row spacing\n• Use hybrid seeds for better yields\n• Sowing depth should be 3-5 cm",
    irrigation: "💧 **Maize Water Management:**\n• Critical stages: knee-high, tasseling, grain filling\n• Avoid water stress during flowering\n• Apply irrigation when 50% soil moisture depleted\n• Provide 4-5 irrigations during season",
    fertilizing: "🧪 **Maize Fertilization:**\n• Apply 150 kg N, 75 kg P2O5, 50 kg K2O per hectare\n• Split nitrogen: 50% basal, 25% knee-high, 25% tasseling\n• Apply micronutrients if soil is deficient\n• Side dressing improves grain yield",
    harvest: "✂️ **Maize Harvesting:**\n• Harvest when grain moisture is 15-20%\n• Grains should be hard and dented\n• Physiological maturity indicated by black layer\n• Proper drying before storage essential"
  }
};

// Default advice for other crops
const getDefaultAdvice = (crop, phase) => {
  return `🌱 **${crop} - ${phase}:**\nGeneral ${phase} advice for ${crop}. Please consult local agricultural extension services for specific recommendations in your area.`;
};

// Farm advice endpoint
app.post('/api/farm-advice', async (req, res) => {
  try {
    console.log('Received farm advice request:', req.body);
    
    const { crop, phase } = req.body;
    
    if (!crop || !phase) {
      return res.json({
        success: false,
        advice: "Please provide both crop and phase information."
      });
    }
    
    const lowerCrop = crop.toLowerCase();
    const lowerPhase = phase.toLowerCase();
    
    // Get advice
    let advice = cropAdvice[lowerCrop]?.[lowerPhase] || getDefaultAdvice(crop, phase);
    
    // Add contextual tips
    const tips = [
      "Monitor weather conditions regularly",
      "Keep detailed farming records",
      "Use certified seeds from reliable sources",
      "Practice integrated pest management",
      "Consider soil testing for precise nutrition"
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    advice += `\n\n💡 **Smart Tip:** ${randomTip}`;
    
    // Add timing context
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    advice += `\n\n🗓️ **Current Month (${currentMonth}):** Adjust practices based on local seasonal conditions.`;
    
    console.log('Sending advice response...');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    res.json({
      success: true,
      advice: advice,
      crop: crop,
      phase: phase,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in farm advice:', error);
    res.json({
      success: false,
      advice: "Sorry, unable to provide advice right now. Please try again."
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.json({
    status: '🤖 Enhanced Farm Advisor is running!',
    version: '2.0',
    timestamp: new Date().toISOString(),
    port: PORT,
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🌾 Enhanced Farm Advisor API',
    version: '2.0',
    endpoints: [
      'GET /api/health',
      'POST /api/farm-advice'
    ]
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🤖 Enhanced Farm Advisor API running on port ${PORT}`);
  console.log(`🌾 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🚀 Ready to provide enhanced farming advice!`);
});