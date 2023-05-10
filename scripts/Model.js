class Model {
  static prettyMap = new Map();

  static prettifyAndSave(str) {
    const pretty = Utils.normalize(str);
    Model.prettyMap.set(pretty, str);
    return pretty;
  }

  constructor() {
    this.recipes = recipes.map((recipe) => {
      const prettyRecipe = {
        ...recipe,
        name: Model.prettifyAndSave(recipe.name),
        description: Model.prettifyAndSave(recipe.description),
        appliance: Model.prettifyAndSave(recipe.appliance),
        ingredients: recipe.ingredients.map((ingredient) => ({
          ...ingredient,
          ingredient: Model.prettifyAndSave(ingredient.ingredient),
        })),
        ustensils: recipe.ustensils.map(Model.prettifyAndSave),
      };
      return prettyRecipe;
    });
    this.filteredRecipes = this.recipes;

    this.globalSearch = "";

    this.appliedFilters = {
      ingredients: [],
      appliances: [],
      tools: [],
    };
    this.fullFilters = {
      ingredients: Array.from(
        new Set(
          this.recipes.reduce(
            (acc, recipe) => [
              ...acc,
              ...recipe.ingredients.map((ingredient) =>
                Utils.capitalize(ingredient.ingredient)
              ),
            ],
            []
          )
        )
      ).sort(),
      appliances: Array.from(
        new Set(
          this.recipes.map((recipe) => Utils.capitalize(recipe.appliance))
        )
      ).sort(),
      tools: Array.from(
        new Set(
          this.recipes.flatMap((recipe) =>
            recipe.ustensils.map(Utils.capitalize)
          )
        )
      ).sort(),
    };
    this.availableFilters = this.fullFilters;
    this.suggestedFilters = {
      ingredients: "",
      appliances: "",
      tools: "",
    };
  }

  getAvailableFilters() {
    this.availableFilters = {
      ingredients: Array.from(
        new Set(
          this.filteredRecipes.reduce(
            (acc, recipe) => [
              ...acc,
              ...recipe.ingredients.map((ingredient) => ingredient.ingredient),
            ],
            []
          )
        )
      )
        .sort()
        .filter(
          (ingredient) =>
            this.suggestedFilters.ingredients === "" ||
            ingredient.includes(this.suggestedFilters.ingredients)
        ),
      appliances: Array.from(
        new Set(this.filteredRecipes.map((recipe) => recipe.appliance))
      )
        .sort()
        .filter(
          (appliance) =>
            this.suggestedFilters.appliances === "" ||
            appliance.includes(this.suggestedFilters.appliances)
        ),
      tools: Array.from(
        new Set(this.filteredRecipes.flatMap((recipe) => recipe.ustensils))
      )
        .sort()
        .filter(
          (tool) =>
            this.suggestedFilters.tools === "" ||
            tool.includes(this.suggestedFilters.tools)
        ),
    };
    return this.availableFilters;
  }

  getRecipes() {
    this.filteredRecipes = this.applyFilters();
    if (this.globalSearch.length > 2) {
      this.filteredRecipes = this.applySearch(
        this.filteredRecipes,
        this.globalSearch
      );
    }

    return this.filteredRecipes;
  }

  applySearch(recipes, globalSearch) {
    let newRecipes = [];

    for (let recipe of recipes) {
      let contains = false;
      contains |= recipe.name.includes(globalSearch);
      contains |= recipe.description.includes(globalSearch);
      for (let i = 0; !contains && i < recipe.ingredients.length; i++) {
        const { ingredient } = recipe.ingredients[i];
        contains |= ingredient.includes(globalSearch);
      }
      if (contains) {
        newRecipes.push(recipe);
      }
    }

    return newRecipes;
  }

  applyFilters() {
    return this.recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient
      );
      const appliances = [recipe.appliance];
      const tools = recipe.ustensils;

      return (
        this.appliedFilters.ingredients.every((ingredient) =>
          ingredients.includes(ingredient)
        ) &&
        this.appliedFilters.tools.every((tool) => tools.includes(tool)) &&
        this.appliedFilters.appliances.every((appliance) =>
          appliances.includes(appliance)
        )
      );
    });
  }

  suggestFilters(type, value) {
    this.suggestedFilters[type] = value;
  }

  setGlobalSearch(_, value) {
    this.globalSearch = value;
  }

  setFilter(type, value) {
    if (!this.appliedFilters[type].includes(value)) {
      this.appliedFilters[type].push(value);
      this.suggestedFilters[type] = "";
    }
  }

  removeFilter(type, value) {
    this.appliedFilters[type] = this.appliedFilters[type].filter(
      (item) => item !== value
    );
  }
}
