document
  .getElementById("fetchRecipesBtn")
  .addEventListener("click", fetchRecipes);

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
    recipesContainer.appendChild(recipeElement);
  });
}
