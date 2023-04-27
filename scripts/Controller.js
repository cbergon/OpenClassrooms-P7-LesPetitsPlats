class Controller {
  constructor() {
    this.model = new Model();

    this.globalSearch = "";
    this.filters = [];
    this.availableFilters = [];
    this.recipes = [];
  }

  refreshData() {
    this.globalSearch = this.model.globalSearch;
    this.filters = this.model.filters;
    this.availableFilters = this.model.availableFilters;
    this.recipes = this.model.getRecipes();
  }

  filterHandler(action) {
    return (event) => {
      this.model[action](event.detail.filterType, event.detail.filterValue);
      this.refreshData();
      this.recipesView.render(this.recipes, this.filters);
    };
  }

  async displayIndex() {
    this.refreshData();
    this.recipesView = new RecipesView();
    this.recipesView.init(this.availableFilters, this.filters);
    this.recipesView.render(this.recipes, this.filters);

    document.addEventListener("filter-select", this.filterHandler("setFilter"));

    document.addEventListener(
      "filter-remove",
      this.filterHandler("removeFilter")
    );

    document.addEventListener(
      "global-search",
      this.filterHandler("setGlobalSearch")
    );
  }
}
