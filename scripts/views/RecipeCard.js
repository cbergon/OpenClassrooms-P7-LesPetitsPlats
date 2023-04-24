class RecipeCard {
  parseUnit(unit) {
    switch (unit) {
      case "grammes":
        return "g";
      case "ml":
        return "mL";
      case "cl":
        return "cL";
      case "litre":
      case "litres":
        return "L";
      case "cuillère à soupe":
      case "cuillères à soupe":
        return " c. à soupe";
      case "cuillères à café":
        return " c. à café";
      default:
        return ` ${unit}`;
    }
  }

  constructor(recipe) {
    this.recipe = recipe;
  }

  render() {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("rounded", "w-[30%]");

    const recipeImage = this.createImage();

    const recipeDetails = document.createElement("div");
    recipeDetails.classList.add(
      "flex",
      "flex-col",
      "p-5",
      "h-48",
      "gap-5",
      "rounded-b",
      "bg-secondaryGrey"
    );

    const recipeTitle = this.createTitle();
    const recipeContent = this.createContent();

    // build details
    recipeDetails.appendChild(recipeTitle);
    recipeDetails.appendChild(recipeContent);

    // build card
    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(recipeDetails);

    return recipeCard;
  }

  createImage() {
    // const recipeImage = document.createElement("img");
    const recipeImage = document.createElement("div");
    recipeImage.classList.add(
      "w-full",
      "h-44",
      "bg-secondaryGreyDark",
      "rounded-t"
    );
    recipeImage.src = this.recipe.image;
    return recipeImage;
  }

  createTitle() {
    const recipeName = document.createElement("div");
    recipeName.classList.add("text-lg");
    recipeName.textContent = this.recipe.name;

    const recipeTime = document.createElement("div");
    recipeTime.classList.add("text-lg", "font-bold");
    recipeTime.textContent = `${this.recipe.time} min`;

    const recipeTitle = document.createElement("div");
    recipeTitle.classList.add("flex", "justify-between");

    recipeTitle.appendChild(recipeName);
    recipeTitle.appendChild(recipeTime);
    return recipeTitle;
  }

  createContent() {
    const recipeContent = document.createElement("div");
    recipeContent.classList.add("flex", "text-sm", "overflow-hidden");

    const recipeIngredients = document.createElement("div");
    recipeIngredients.classList.add("w-1/2");
    this.recipe.ingredients.map((ingredient) =>
      recipeIngredients.appendChild(this.createIngredient(ingredient))
    );

    const recipeDescription = document.createElement("p");
    recipeDescription.classList.add("line-clamp-5", "w-1/2");
    recipeDescription.textContent = this.recipe.description;

    recipeContent.appendChild(recipeIngredients);
    recipeContent.appendChild(recipeDescription);

    return recipeContent;
  }

  createIngredient(ingredient) {
    const ingredientElement = document.createElement("div");
    ingredientElement.classList.add("flex", "items-center");

    const ingredientName = document.createElement("span");
    ingredientName.classList.add("font-bold");
    ingredientName.textContent = ingredient.ingredient;
    ingredientElement.appendChild(ingredientName);

    if (ingredient.quantity) {
      const ingredientQuantity = document.createElement("span");
      ingredientQuantity.textContent = `: ${ingredient.quantity}`;
      if (ingredient.unit) {
        ingredientQuantity.textContent += this.parseUnit(
          ingredient.unit?.toLowerCase()
        );
      }
      ingredientElement.appendChild(ingredientQuantity);
    }

    return ingredientElement;
  }
}
