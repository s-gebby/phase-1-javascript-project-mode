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

  // Check dark mode preference from local storage and apply it on page load
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "true") {
    document.body.classList.add("dark-mode");
  }
});

function fetchRecipe() {
  fetch("http://localhost:3000/recipes")
    .then((response) => response.json())
    .then((recipes) => {
      if (Array.isArray(recipes)) {
        displayRandomRecipe(recipes);
      } else {
        console.error("Invalid data structure:", recipes);
      }
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
    });
}

function displayRandomRecipe(recipes) {
  if (!Array.isArray(recipes)) {
    console.error("Invalid recipes array:", recipes);
    return;
  }

  const recipesContainer = document.getElementById("recipesContainer");
  recipesContainer.innerHTML = ""; // Clear the container

  // Select a random recipe
  const randomIndex = Math.floor(Math.random() * recipes.length);
  const recipe = recipes[randomIndex];

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

  // Event listener for increasing size on hover for the image
  const imgElement = recipeElement.querySelector("img");
  imgElement.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.05)"; // Increase size by 10%
  });
  imgElement.addEventListener("mouseout", function () {
    this.style.transform = "scale(1)"; // Revert to original size
  });

  // Event listener for increasing size on hover for the summary paragraph
  const summaryElement = recipeElement.querySelector(".summary");
  summaryElement.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.05)"; // Increase size by 10%
  });
  summaryElement.addEventListener("mouseout", function () {
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
