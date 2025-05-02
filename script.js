let plants = [];

// Fetch the plants.json data
fetch('plants.json')
  .then(res => res.json())
  .then(data => {
    plants = data;
    displayPlants(data);
    generateCategories(data);
  });

// Function to display plant cards
function displayPlants(list) {
  const container = document.getElementById('plantContainer');
  container.innerHTML = '';
  list.forEach(plant => {
    container.innerHTML += `
      <div class="plant-card">
        <img src="${plant.image}" alt="${plant.name}" />
        <h2>${plant.name}</h2>
        <button onclick='showPlant(${JSON.stringify(plant)})'>View More</button>
      </div>
    `;
  });
}

// Function to handle search input
document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const filtered = plants.filter(p =>
    p.name.toLowerCase().includes(searchTerm) ||
    (p.categories && p.categories.some(c => c.toLowerCase().includes(searchTerm)))
  );
  displayPlants(filtered);
});

// Function to save selected plant details and redirect
function showPlant(plant) {
  localStorage.setItem('selectedPlant', JSON.stringify(plant));
  window.location.href = 'plant.html';
}

// Function to generate dynamic category menu
function generateCategories(plants) {
  const allCategories = new Set();

  // Collect all unique categories
  plants.forEach(plant => {
    if (plant.categories) {
      plant.categories.forEach(category => allCategories.add(category));
    }
  });

  // Create category menu
  const menuContainer = document.createElement('div');
  menuContainer.id = 'categoryMenu';
  menuContainer.innerHTML = `<h3 style="font-size: 2rem; font-weight: bold; color:rgb(67, 74, 67);  margin-bottom: 20px; position: relative;">Categories:</h3>`;

  // Add "All Plants" button
  const allPlantsButton = document.createElement('button');
  allPlantsButton.textContent = 'All Plants';
  allPlantsButton.className = 'category-btn';
  allPlantsButton.addEventListener('click', () => displayPlants(plants));
  menuContainer.appendChild(allPlantsButton);

  // Add category buttons
  allCategories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category;
    button.className = 'category-btn';
    button.addEventListener('click', () => filterByCategory(category));
    menuContainer.appendChild(button);
  });

  // Add the menu to the page
  document.body.insertBefore(menuContainer, document.getElementById('plantContainer'));
}

// Function to filter plants by selected category
function filterByCategory(category) {
  const filtered = plants.filter(p =>
    p.categories && p.categories.includes(category)
  );
  displayPlants(filtered);
}
