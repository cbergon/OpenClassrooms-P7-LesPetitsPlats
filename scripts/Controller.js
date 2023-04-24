class Controller {
  constructor() {
    this.model = new Model();
  }

  async displayIndex() {
    const filters = this.model.getFilters();
    const recipes = this.model.getFilteredRecipes();
    const recipesView = new RecipesView();
    recipesView.render(recipes, filters);
  }
}
