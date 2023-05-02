class Model {
  constructor() {
    this.recipes = [...recipes];

    this.globalSearch = "";

    this.ingredients = [];
    this.appliances = [];
    this.tools = [];

    this.filters = {
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
                capitalise(ingredient.ingredient)
              ),
            ],
            []
          )
        )
      ).sort(),
      appliances: Array.from(
        new Set(this.recipes.map((recipe) => capitalise(recipe.appliance)))
      ).sort(),
      tools: Array.from(
        new Set(
          this.recipes.flatMap((recipe) => recipe.ustensils.map(capitalise))
        )
      ).sort(),
    };
  }

  getRecipes() {
    if (this.globalSearch === "") {
      return this.applyFilters();
    }

    const filteredRecipes = this.applyFilters();

    const newRecipes = filteredRecipes.filter((recipe) => {
      const possibilities = [
        slugify(recipe.name),
        slugify(recipe.description),
        ...recipe.ingredients.map((ingredient) =>
          slugify(ingredient.ingredient)
        ),
      ];

      return possibilities.some(
        (possibility) => possibility.indexOf(this.globalSearch) !== -1
      );
    });

    // let newRecipes = [];

    // for (let recipe of filteredRecipes) {
    //   const possibilities = [
    //     slugify(recipe.name),
    //     slugify(recipe.description),
    //     ...recipe.ingredients.map((ingredient) =>
    //       slugify(ingredient.ingredient)
    //     ),
    //   ];
    //   for (let possibility of possibilities) {
    //     if (possibility.indexOf(this.globalSearch) !== -1) {
    //       newRecipes.push(recipe);
    //       break;
    //     }
    //   }
    // }

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
        this.filters.ingredients.every((ingredient) =>
          ingredients.includes(ingredient)
        ) &&
        this.filters.tools.every((tool) => tools.includes(tool)) &&
        this.filters.appliances.every((appliance) =>
          appliances.includes(appliance)
        )
      );
    });
  }

  setGlobalSearch(_, value) {
    this.globalSearch = slugify(value);
  }

  setFilter(type, value) {
    if (!this.filters[type].includes(value)) {
      this.filters[type].push(value);
    }
  }

  removeFilter(type, value) {
    this.filters[type] = this.filters[type].filter((item) => item !== value);
  }
}
