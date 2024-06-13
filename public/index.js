document.addEventListener("DOMContentLoaded", function () {
  const fetchRecipeBtn = document.getElementById("fetchRecipeBtn");
  const darkModeBtn = document.getElementById("darkModeBtn");
  const recipesContainer = document.getElementById("recipesContainer");

  // Event listeners for buttons
  if (fetchRecipeBtn) {
    fetchRecipeBtn.addEventListener("click", fetchRecipe);
  } else {
    console.error("fetchRecipeBtn not found in the DOM.");
  }

  if (darkModeBtn) {
    darkModeBtn.addEventListener("click", toggleDarkMode);
  } else {
    console.error("darkModeBtn not found in the DOM.");
  }

  if (!recipesContainer) {
    console.error("recipesContainer not found in the DOM.");
  }

  // Check dark mode preference from local storage and apply it on page load
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "true") {
    document.body.classList.add("dark-mode");
  }
});

// Fetch recipes from the API or local server
function fetchRecipe() {
  fetch("http://localhost:3000/recipes")
    .then((response) => response.json())
    .then((recipes) => {
      if (Array.isArray(recipes)) {
        // Use filter to get only recipes with more than 3 instructions
        const filteredRecipes = recipes.filter(
          (recipe) => recipe.instructions.length > 3
        );
        displayRandomRecipe(filteredRecipes);
      } else {
        console.error("Invalid data structure:", recipes);
      }
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
    });
}

// Display a random recipe
function displayRandomRecipe(recipes) {
  if (!Array.isArray(recipes) || recipes.length === 0) {
    console.error("Invalid or empty recipes array:", recipes);
    return;
  }

  const recipesContainer = document.getElementById("recipesContainer");
  recipesContainer.innerHTML = ""; // Clear the container

  // Select a random recipe
  const randomIndex = Math.floor(Math.random() * recipes.length);
  const recipe = recipes[randomIndex];

  // Summarize the total number of instructions using reduce
  const totalInstructions = recipes.reduce(
    (total, recipe) => total + recipe.instructions.length,
    0
  );
  console.log(
    `Total number of instructions across all recipes: ${totalInstructions}`
  );

  const recipeElement = document.createElement("div");
  recipeElement.classList.add("recipe");
  recipeElement.innerHTML = `
    <h2>${recipe.title}</h2>
    <p class="summary">${recipe.summary}</p>
    <img src="${recipe.image}" alt="${recipe.title}">
    <div class="instructions-container">
      <p class="instructions-label">Instructions:</p>
      <ol>
        ${recipe.instructions
          .map((instruction) => `<li>${instruction}</li>`)
          .join("")}
      </ol>
    </div>
  `;

  // Event listeners for image and summary interactions
  const imgElement = recipeElement.querySelector("img");
  imgElement.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.05)";
  });
  imgElement.addEventListener("mouseout", function () {
    this.style.transform = "scale(1)";
  });

  const summaryElement = recipeElement.querySelector(".summary");
  summaryElement.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.05)";
  });
  summaryElement.addEventListener("mouseout", function () {
    this.style.transform = "scale(1)";
  });

  recipesContainer.appendChild(recipeElement);

  // Use forEach to log each instruction
  recipe.instructions.forEach((instruction, index) => {
    console.log(`Instruction ${index + 1}: ${instruction}`);
  });

  // Use some to check if any recipe has more than 5 instructions
  const hasComplexRecipes = recipes.some(
    (recipe) => recipe.instructions.length > 5
  );
  console.log(
    `Are there any complex recipes with more than 5 instructions? ${hasComplexRecipes}`
  );

  // Use every to check if all recipes have images
  const allHaveImages = recipes.every((recipe) => recipe.image !== "");
  console.log(`Do all recipes have images? ${allHaveImages}`);
}

// Toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  const isDarkMode = body.classList.toggle("dark-mode");

  // Store dark mode preference in local storage
  localStorage.setItem("darkMode", isDarkMode);
}
