class RecipesView {
  constructor() {
    this.recipesContainer = document.querySelector("#results");
    this.recipesContainer.classList.add(
      "flex",
      "flex-wrap",
      "justify-center",
      "gap-10"
    );
  }

  render(recipes) {
    this.recipesContainer.innerHTML = "";
    recipes.forEach((recipe) => {
      const recipeCard = new RecipeCard(recipe);
      this.recipesContainer.appendChild(recipeCard.render());
    });
  }
}
