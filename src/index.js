const workoutContainer = document.getElementById("workoutContainer");
const nutritionSelect = document.getElementById("nutritionCategory");
const nutritionContainer = document.getElementById("nutritionContainer");
const productList = document.getElementById("productList");
const productDetails = document.getElementById("productDetails");


const API_BASE = "https://gym-server-y6c1.onrender.com";


let workouts = [];
let nutrition = [];
let products = [];


async function fetchData() {
  try {
    const [workoutsRes, nutritionRes, productsRes] = await Promise.all([
      fetch(`${API_BASE}/workouts`),
      fetch(`${API_BASE}/nutrition`),
      fetch(`${API_BASE}/products`),
    ]);

    workouts = await workoutsRes.json();
    nutrition = await nutritionRes.json();
    products = await productsRes.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

// 1: Event Listener DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
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

// 2: Event Listener change
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

// 3: Event Listener click
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

  // Get form and elements
    const form = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    // Event listener for form submission
    form.addEventListener("submit", function(event) {
      event.preventDefault(); 

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      console.log("Form Submitted!");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);
      formStatus.style.display = "block";
      form.reset();
    })