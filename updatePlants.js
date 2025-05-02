const fs = require('fs');

// Read the existing plants.json
const plants = JSON.parse(fs.readFileSync('plants.json', 'utf8'));

// Define your mapping
const categoryMapping = {
    "Aloe Vera": ["skin care", "health care"],
    "Neem": ["acne", "skin care", "anti-pyretic"],
    "Tulsi": ["health care", "anti-pyretic", "diabetes"],
    "Ashwagandha": ["health care", "weight management"],
    "Brahmi": ["health care", "mental wellness"],
    "Amla": ["skin care", "health care", "weight management"],
    "Giloy": ["anti-pyretic", "health care"],
    "Fenugreek": ["diabetes", "weight management"],
    "Bitter Gourd": ["diabetes", "health care"],
    "Turmeric": ["skin care", "health care", "anti-pyretic"],
    "Curry Leaves": ["diabetes", "health care"],
    "Mint": ["skin care", "health care"],
    "Holy Basil": ["anti-pyretic", "health care", "diabetes"],
    "Ginger": ["health care", "anti-pyretic"],
    "Shatavari": ["health care", "women wellness"],
    "Guggul": ["weight management", "health care"],
    "Indian Gooseberry": ["skin care", "health care"],
    "Bael": ["diabetes", "health care"],
    "Manjistha": ["skin care", "blood purification"],
    "Licorice": ["skin care", "health care"],
    "Cinnamon": ["diabetes", "weight management"],
    "Gotu Kola": ["skin care", "mental wellness"],
    "Sarpagandha": ["blood pressure", "health care"],
    "Arjuna": ["heart health", "health care"],
    "Chirata": ["diabetes", "anti-pyretic"],
    "Kalmegh": ["liver health", "anti-pyretic"],
    "Senna": ["weight management", "health care"],
    "Bhringraj": ["hair care", "skin care"],
    "Punarnava": ["health care", "weight management"],
    "Guduchi": ["immune booster", "health care"]
  };
  

// Add categories to each plant
const updatedPlants = plants.map(plant => {
  const matchedCategories = categoryMapping[plant.name];
  plant.categories = matchedCategories || []; // Assign categories or empty
  return plant;
});

// Write back to file
fs.writeFileSync('plants.json', JSON.stringify(updatedPlants, null, 2));
console.log("✅ plants.json updated with categories!");
