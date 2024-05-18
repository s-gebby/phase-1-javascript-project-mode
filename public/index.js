document.addEventListener("DOMContentLoaded", function () {
  // Event listener for the "Fetch Random Recipes" button
  document
    .getElementById("fetchRecipesBtn")
    .addEventListener("click", fetchRecipes);

  document
    .getElementById("darkModeBtn")
    .addEventListener("click", toggleDarkMode);
});

function fetchRecipes() {
  fetch("http://localhost:3000/recipes")
    .then((response) => response.json())
    .then((data) => {
      displayRecipes(data);
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
    });
}

function displayRecipes(recipes) {
  const recipesContainer = document.getElementById("recipesContainer");
  recipesContainer.innerHTML = "";

  recipes.forEach((recipe) => {
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
  });
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
