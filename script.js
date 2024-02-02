const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");

const fetchRecipes = async (meal_name) => {
  recipeContainer.innerHTML = "<h1>Fetching Recipes...</h1>";
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal_name}`
  );
  const response = await data.json();
  recipeContainer.innerHTML =""
  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
            <img src = "${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>${meal.strCategory}</p>
        `;
    recipeContainer.appendChild(recipeDiv);

    console.log(meal);
  });
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchRecipes(searchInput);
});
