class Model {
  constructor() {
    this.recipes = [...recipes];

    // add a search filter for title, description and ingredients
    // map this.recipes to get all distincts ingredients, appliances and tools

    this.ingredients = [];
    this.appliances = [];
    this.tools = [];

    this.filters = {
      global: [],
      ingredients: this.recipes.reduce(
        (acc, recipe) => [
          ...acc,
          ...recipe.ingredients.map((ingredient) => ingredient.ingredient),
        ],
        []
      ),
      appliances: this.recipes.map((recipe) => recipe.appliance),
      tools: this.recipes.map((recipe) => recipe.ustensils),
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

  getFilters() {
    return this.filters;
  }

  setFilter(type, value) {
    this.filters[type].push(value);
  }

  removeFilter(type, value) {
    console.log(`removing ${value} from ${type}`);
    // this.filters[type] = this.filters[type].filter((item) => item !== value);
  }
}
