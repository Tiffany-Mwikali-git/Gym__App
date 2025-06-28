const workoutContainer = document.getElementById("workoutContainer");
const nutritionSelect = document.getElementById("nutritionCategory");
const nutritionContainer = document.getElementById("nutritionContainer");
const productList = document.getElementById("productList");
const productDetails = document.getElementById("productDetails");

// API base URL
const API_BASE = "https://gym-server-y6c1.onrender.com";

// Fetch all data initially
let workouts = [];
let nutrition = [];
let products = [];

async function fetchData() {
  try {
    const [workoutsRes, nutritionRes, productsRes] = await Promise.all([
      fetch(`${API_BASE}/workouts`),
      fetch(`${API_BASE}/nutrition`),
      fetch(`${API_BASE}/products`)
    ]);

    workouts = await workoutsRes.json();
    nutrition = await nutritionRes.json();
    products = await productsRes.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Event Listener 1: Show Beginner Workouts
document.getElementById("showBeginnerWorkouts").addEventListener("click", async () => {
  if (!workouts.length) await fetchData();

  const beginners = workouts.filter(w => w.difficulty === "Beginner");
  workoutContainer.innerHTML = "";

  beginners.forEach(workout => {
    const div = document.createElement("div");
    div.className = "workout";
    div.innerHTML = `
      <h3>${workout.name}</h3>
      <p>${workout.description}</p>
      <p><strong>Exercises:</strong></p>
      <ul>${workout.exercises.map(ex => `<li>${ex}</li>`).join("")}</ul>
    `;
    workoutContainer.appendChild(div);
  });
});

// Event Listener 2: Filter Nutrition by Category
nutritionSelect.addEventListener("change", async (e) => {
  if (!nutrition.length) await fetchData();

  const selected = e.target.value;
  const filteredMeals = nutrition.filter(n => n.category === selected);
  nutritionContainer.innerHTML = "";

  filteredMeals.forEach(meal => {
    const div = document.createElement("div");
    div.className = "nutrition";
    div.innerHTML = `
      <h4>${meal.name}</h4>
      <img src="${meal.image}" alt="${meal.name}" style="width: 100%; max-width: 300px;">
      <p><strong>Calories:</strong> ${meal.calories}</p>
      <p><strong>Macros:</strong> ${meal.macros}</p>
      <p><strong>Ingredients:</strong> ${meal.ingredients.join(", ")}</p>
    `;
    nutritionContainer.appendChild(div);
  });
});

// Event Listener 3: Show Product Details on Click
productList.addEventListener("click", async (e) => {
  const id = parseInt(e.target.dataset.id);
  if (!products.length) await fetchData();

  const product = products.find(p => p.id === id);
  if (product) {
    productDetails.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" alt="${product.name}" style="width: 100%; max-width: 300px;">
      <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Features:</strong> ${product.features.join(", ")}</p>
      <p><strong>Available Colors:</strong> ${product.colors.join(", ")}</p>
    `;
  }
});
