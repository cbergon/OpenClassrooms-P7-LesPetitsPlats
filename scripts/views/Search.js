class Search {
  constructor() {
    this.searchContainer = document.querySelector("#search");
    this.model = new Model();
  }

  render(filters) {
    this.searchContainer.classList.add(
      "flex",
      "flex-col",
      "gap-5",
      "w-full",
      "bg-primaryBlue"
    );

    // #region search bar
    const searchBarContainer = document.createElement("div");
    searchBarContainer.classList.add("flex", "justify-center", "w-full");

    const searchInput = document.createElement("input");
    searchInput.classList.add("w-max", "h-10", "px-4", "rounded", "w-full");
    searchInput.placeholder = "Rechercher une recette";
    searchBarContainer.appendChild(searchInput);
    // #endregion

    // #region filters tags
    const filterTagsWrapper = document.createElement("div");
    filterTagsWrapper.classList.add("flex", "gap-2", "items-center", "p-2");

    const filterTags = Object.keys(filters).reduce((acc, filterType) => {
      const tags = filters[filterType].map((filter) => {
        const tag = document.createElement("div");
        const color = `bg-${this.getColor(filterType)}`;
        tag.classList.add(
          "flex",
          "items-center",
          "gap-2",
          "px-4",
          "py-2",
          "rounded",
          "text-white",
          color
        );
        tag.textContent = filter;

        const closeButton = document.createElement("button");
        closeButton.onclick = () => this.model.removeFilter(filterType, filter);
        closeButton.textContent = "X";

        tag.appendChild(closeButton);
        return tag;
      });
      return [...acc, ...tags];
    }, []);
    filterTagsWrapper.append(...filterTags);
    // #endregion

    // #region filters inputs
    const filterInputsWrapper = document.createElement("div");
    filterInputsWrapper.classList.add("flex", "gap-2", "items-center");
    const ingredientsInput = document.createElement("input");
    ingredientsInput.list = model.ingredients;

    const appliancesInput = document.createElement("input");
    appliancesInput.list = model.appliances;

    const toolsInput = document.createElement("input");
    toolsInput.list = model.tools;

    filterInputsWrapper.append(ingredientsInput, appliancesInput, toolsInput);
    // #endregion

    this.searchContainer.appendChild(searchBarContainer);
    this.searchContainer.appendChild(filterTagsWrapper);
    this.searchContainer.appendChild(filterInputsWrapper);
  }

  getColor(type) {
    switch (type) {
      case "ingredients":
        return "secondaryBlue";
      case "appliances":
        return "secondaryGreen";
      case "tools":
        return "secondaryOrange";
      default:
        return "secondaryGrey";
    }
  }
}
