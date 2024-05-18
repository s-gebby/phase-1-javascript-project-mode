document.addEventListener("DOMContentLoaded", function () {
  // Ensure these IDs match the ones in your HTML
  const fetchRecipeBtn = document.getElementById("fetchRecipeBtn");
  const darkModeBtn = document.getElementById("darkModeBtn");
  const recipesContainer = document.getElementById("recipesContainer");

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
});

function fetchRecipe() {
  fetch("http://localhost:3000/recipes")
    .then((response) => response.json())
    .then((data) => {
      displayRandomRecipe(data);
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
    });
}

function displayRandomRecipe(recipes) {
  const recipesContainer = document.getElementById("recipesContainer");
  recipesContainer.innerHTML = ""; // Clear the container

  // Select a random recipe
  const randomIndex = Math.floor(Math.random() * recipes.length);
  const recipe = recipes[randomIndex];

  const recipeElement = document.createElement("div");
  recipeElement.classList.add("recipe");
  recipeElement.innerHTML = `
    <h2>${recipe.title}</h2>
    <p>${recipe.summary}</p>
    <img src="${recipe.image}" alt="${recipe.title}">
    <p><strong>Instructions:</strong> ${recipe.instructions}</p>
  `;

  // Event listener for increasing size on hover
  recipeElement.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.05)"; // Increase size by 10%
  });

  // Event listener for reverting size on mouseout
  recipeElement.addEventListener("mouseout", function () {
    this.style.transform = "scale(1)"; // Revert to original size
  });

  recipesContainer.appendChild(recipeElement);
}

function toggleDarkMode() {
  const body = document.body;
  const isDarkMode = body.classList.toggle("dark-mode");

  // Store dark mode preference in local storage
  localStorage.setItem("darkMode", isDarkMode);
}

// Check dark mode preference from local storage and apply it on page load
const darkMode = localStorage.getItem("darkMode");
if (darkMode === "true") {
  document.body.classList.add("dark-mode");
}
