class Controller {
  constructor() {
    this.model = new Model();

    this.globalSearch = "";
    this.filters = [];
    this.availableFilters = [];
    this.recipes = [];
  }

  // updates Controller data with Model data
  refreshData() {
    this.globalSearch = this.model.globalSearch;
    this.filters = this.model.appliedFilters;
    this.recipes = this.model.getRecipes();
    this.availableFilters = this.model.getAvailableFilters();
  }

  // applies the correct Model function call depending on the given action,
  // actions can be: "suggestFilter", "setFilter", "removeFilter" or "setGlobalSearch"
  // applies the action to the filterType to set or remove the filterValue
  // then refreshes Controller data to be able to render the new state
  filterHandler(action) {
    return (event) => {
      this.model[action](event.detail.filterType, event.detail.filterValue);
      this.refreshData();
      this.recipesView.render(
        this.recipes,
        this.availableFilters,
        this.filters
      );
    };
  }

  async displayIndex() {
    this.refreshData();
    this.recipesView = new RecipesView();
    this.recipesView.init(this.availableFilters, this.filters);
    this.recipesView.render(this.recipes, this.availableFilters, this.filters);

    document.addEventListener(
      "filter-suggest",
      this.filterHandler("suggestFilters")
    );

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
