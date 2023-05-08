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
                Utils.capitalise(ingredient.ingredient)
              ),
            ],
            []
          )
        )
      ).sort(),
      appliances: Array.from(
        new Set(
          this.recipes.map((recipe) => Utils.capitalise(recipe.appliance))
        )
      ).sort(),
      tools: Array.from(
        new Set(
          this.recipes.flatMap((recipe) =>
            recipe.ustensils.map(Utils.capitalise)
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
                Utils.capitalise(ingredient.ingredient)
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
            ingredient.toLowerCase().includes(this.suggestedFilters.ingredients)
        ),
      appliances: Array.from(
        new Set(
          this.filteredRecipes.map((recipe) =>
            Utils.capitalise(recipe.appliance)
          )
        )
      )
        .sort()
        .filter(
          (appliance) =>
            this.suggestedFilters.appliances === "" ||
            appliance.toLowerCase().includes(this.suggestedFilters.appliances)
        ),
      tools: Array.from(
        new Set(
          this.filteredRecipes.flatMap((recipe) =>
            recipe.ustensils.map(Utils.capitalise)
          )
        )
      )
        .sort()
        .filter(
          (tool) =>
            this.suggestedFilters.tools === "" ||
            tool.toLowerCase().includes(this.suggestedFilters.tools)
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
        Utils.slugify(recipe.name),
        Utils.slugify(recipe.description),
        ...recipe.ingredients.map((ingredient) =>
          Utils.slugify(ingredient.ingredient)
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
    //     Utils.slugify(recipe.name),
    //     Utils.slugify(recipe.description),
    //     ...recipe.ingredients.map((ingredient) =>
    //       Utils.slugify(ingredient.ingredient)
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
    this.globalSearch = Utils.slugify(value);
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
