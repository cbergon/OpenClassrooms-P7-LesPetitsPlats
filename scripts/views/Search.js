class Search {
  constructor() {
    this.searchContainer = document.querySelector("#search");
    this.availableFilters = {};

    this.translations = {
      ingredients: "ingrédient",
      appliances: "appareil",
      tools: "ustensile",
    };
  }

  init(availableFilters) {
    this.availableFilters = availableFilters;
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
    searchInput.classList.add("h-10", "px-4", "rounded", "w-full");
    searchInput.placeholder = "Rechercher une recette";
    searchBarContainer.appendChild(searchInput);
    // #endregion

    // #region filter tags
    this.filterTagsWrapper = document.createElement("div");
    this.filterTagsWrapper.classList.add(
      "flex",
      "gap-2",
      "items-center",
      "p-2"
    );
    this.filterTagsWrapper.setAttribute("id", "tags-wrapper");
    // #endregion

    // #region filters inputs
    const filterInputsWrapper = document.createElement("div");
    filterInputsWrapper.classList.add("flex", "gap-2", "items-center");

    const ingredientsFilter = this.genFilter("ingredients");
    const appliancesFilter = this.genFilter("appliances");
    const toolsFilter = this.genFilter("tools");

    filterInputsWrapper.append(
      ...ingredientsFilter,
      ...appliancesFilter,
      ...toolsFilter
    );
    // #endregion

    this.searchContainer.appendChild(searchBarContainer);
    this.searchContainer.appendChild(this.filterTagsWrapper);
    this.searchContainer.appendChild(filterInputsWrapper);
  }

  render(filters) {
    // #region filters tags
    const filterTags = Object.keys(filters).reduce((acc, filterType) => {
      const tags = filters[filterType].map((filter) =>
        this.genTag(filterType, filter)
      );
      return [...acc, ...tags];
    }, []);
    this.filterTagsWrapper.innerHTML = "";
    this.filterTagsWrapper.append(...filterTags);
    // #endregion
  }

  genTag(type, filter) {
    const tag = document.createElement("div");
    const color = `bg-${this.getColor(type)}`;
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
    closeButton.onclick = () =>
      document.dispatchEvent(
        new CustomEvent("filter-remove", {
          detail: {
            filterType: type,
            filterValue: filter,
          },
        })
      );
    closeButton.textContent = "X";

    tag.appendChild(closeButton);
    return tag;
  }

  genInput(type) {
    const input = document.createElement("input");
    input.setAttribute("list", `${type}-filter`);
    input.classList.add("w-96", "rounded");
    input.placeholder = `Rechercher un ${this.translations[type]}`;
    input.addEventListener("change", (event) => {
      const value = event.target.value;
      if (this.availableFilters[type].includes(value)) {
        document.dispatchEvent(
          new CustomEvent("filter-select", {
            detail: {
              filterType: type,
              filterValue: value,
            },
          })
        );
        event.target.value = "";
      }
    });
    return input;
  }

  genDataList(type) {
    const dataList = document.createElement("datalist");
    dataList.setAttribute("id", `${type}-filter`);

    const options = this.availableFilters[type].map((ig) => {
      const option = document.createElement("option");
      option.setAttribute("value", ig);
      return option;
    });
    dataList.append(...options);
    return dataList;
  }

  genFilter(type) {
    return [this.genInput(type), this.genDataList(type)];
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
