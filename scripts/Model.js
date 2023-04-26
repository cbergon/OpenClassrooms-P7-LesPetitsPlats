class Model {
  constructor() {
    this.recipes = [...recipes];

    // add a search filter for title, description and ingredients

    this.ingredients = [];
    this.appliances = [];
    this.tools = [];

    this.filters = {
      global: [],
      ingredients: [],
      appliances: [],
      tools: [],
    };

    this.availableFilters = {
      ingredients: Array.from(
        new Set(
          this.recipes.reduce(
            (acc, recipe) => [
              ...acc,
              ...recipe.ingredients.map((ingredient) =>
                this.capitalise(ingredient.ingredient)
              ),
            ],
            []
          )
        )
      ).sort(),
      appliances: Array.from(
        new Set(this.recipes.map((recipe) => this.capitalise(recipe.appliance)))
      ).sort(),
      tools: Array.from(
        new Set(
          this.recipes.flatMap((recipe) =>
            recipe.ustensils.map(this.capitalise)
          )
        )
      ).sort(),
    };
  }

  getFilteredRecipes() {
    return this.recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient
      );
      const appliances = [recipe.appliance];
      const tools = recipe.ustensils;

      const filters = [
        ...this.filters.ingredients,
        ...this.filters.appliances,
        ...this.filters.tools,
      ];

      return filters.every((filter) => {
        return (
          ingredients.includes(filter) ||
          appliances.includes(filter) ||
          tools.includes(filter)
        );
      });
    });
  }

  getAvailableFilters() {
    return this.availableFilters;
  }

  getFilters() {
    return this.filters;
  }

  setFilter(type, value) {
    if (!this.filters[type].includes(value)) {
      this.filters[type].push(value);
    }
  }

  removeFilter(type, value) {
    this.filters[type] = this.filters[type].filter((item) => item !== value);
  }

  capitalise(phrase) {
    return `${phrase.substring(0, 1).toUpperCase()}${phrase
      .substring(1)
      .toLowerCase()}`;
  }
}
