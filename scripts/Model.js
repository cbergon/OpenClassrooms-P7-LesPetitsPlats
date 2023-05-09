class Model {
  constructor() {
    this.recipes = [...recipes];
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
              ...recipe.ingredients.map((ingredient) =>
                Utils.capitalize(ingredient.ingredient)
              ),
            ],
            []
          )
        )
      )
        .sort()
        .filter(
          (ingredient) =>
            this.suggestedFilters.ingredients === "" ||
            Utils.normalize(ingredient).includes(
              this.suggestedFilters.ingredients
            )
        ),
      appliances: Array.from(
        new Set(
          this.filteredRecipes.map((recipe) =>
            Utils.capitalize(recipe.appliance)
          )
        )
      )
        .sort()
        .filter(
          (appliance) =>
            this.suggestedFilters.appliances === "" ||
            Utils.normalize(appliance).includes(
              this.suggestedFilters.appliances
            )
        ),
      tools: Array.from(
        new Set(
          this.filteredRecipes.flatMap((recipe) =>
            recipe.ustensils.map(Utils.capitalize)
          )
        )
      )
        .sort()
        .filter(
          (tool) =>
            this.suggestedFilters.tools === "" ||
            Utils.normalize(tool).includes(this.suggestedFilters.tools)
        ),
    };

    // console.log("filteredRecipes", this.filteredRecipes);
    // console.log("availableFilters", this.availableFilters);

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
      const possibilities = [
        Utils.normalize(recipe.name),
        Utils.normalize(recipe.description),
        ...recipe.ingredients.map((ingredient) =>
          Utils.normalize(ingredient.ingredient)
        ),
      ];
      for (let possibility of possibilities) {
        if (possibility.indexOf(globalSearch) !== -1) {
          newRecipes.push(recipe);
          break;
        }
      }
    }

    // const newRecipes = recipes.filter((recipe) => {
    //   const possibilities = [
    //     Utils.normalize(recipe.name),
    //     Utils.normalize(recipe.description),
    //     ...recipe.ingredients.map((ingredient) =>
    //       Utils.normalize(ingredient.ingredient)
    //     ),
    //   ];

    //   return possibilities.some(
    //     (possibility) => possibility.indexOf(globalSearch) !== -1
    //   );
    // });

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
    this.suggestedFilters[type] = value.toLowerCase();
  }

  setGlobalSearch(_, value) {
    this.globalSearch = Utils.normalize(value);
  }

  setFilter(type, value) {
    if (!this.appliedFilters[type].includes(Utils.capitalize(value))) {
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
