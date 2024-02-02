const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailContent = document.querySelector(".recipe-details-content");
const closeBtn = document.querySelector(".recipe-close-btn");

const fetchRecipes = async (meal_name) => {
  recipeContainer.innerHTML = "<h1>Fetching Recipes...</h1>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal_name}`
    );
    const response = await data.json();
    recipeContainer.innerHTML = "";
    response.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
            <img src = "${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>${meal.strCategory}</p>
        `;

      const button = document.createElement("button");
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      //Adding EventListener to recipe
      button.addEventListener("click", () => {
        openRecipePopUp(meal);
      });

      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML = "<h1>No Recipes with that name found</h1>"
  }
};

closeBtn.addEventListener("click", () => {
  recipeDetailContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchRecipes(searchInput);
});

const fetchIngredients = (meal) => {
  console.log(meal);
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`] !== "") {
      ingredientsList += `<li>${meal[`strMeasure${i}`]} ${
        meal[`strIngredient${i}`]
      }</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

const openRecipePopUp = (meal) => {
  recipeDetailContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
        <h3>Instructions: </h3>
            <p>${meal.strInstructions}</p>
      </div>
    `;
  recipeDetailContent.parentElement.style.display = "block";
};

fetchRecipes("");