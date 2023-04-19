class Controller {
  constructor() {
    this.model = new Model();
  }

  async displayIndex() {
    this.model.init();
    const recipes = this.model.getRecipes();
    const recipesView = new RecipesView();
    recipesView.render(recipes);
  }
}
