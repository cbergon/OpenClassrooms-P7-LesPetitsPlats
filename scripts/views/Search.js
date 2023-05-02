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
      "px-10"
    );

    // #region search bar
    const searchBarContainer = document.createElement("div");
    searchBarContainer.classList.add("flex", "justify-center", "w-full");

    const searchInput = document.createElement("input");
    searchInput.classList.add(
      "h-10",
      "p-6",
      "rounded",
      "w-full",
      "bg-secondaryGrey",
      "border-none",
      "text-black",
      "text-lg",
      "text-opacity-25"
    );
    searchInput.placeholder = "Rechercher une recette";
    searchInput.addEventListener("input", (event) => {
      let value = "";
      if (event.target.value.length > 2) {
        value = event.target.value;
      }
      document.dispatchEvent(
        new CustomEvent("global-search", {
          detail: {
            filterType: "global-search",
            filterValue: value,
          },
        })
      );
    });

    searchBarContainer.appendChild(searchInput);
    // #endregion

    // #region filter tags
    this.filterTagsWrapper = document.createElement("div");
    this.filterTagsWrapper.classList.add("flex", "gap-2", "py-2");
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

  // generates tag displaying active filters
  genTag(type, filter) {
    const tag = document.createElement("div");
    const bgColor = this.getColor(type);
    tag.classList.add(
      "flex",
      "items-center",
      "gap-2",
      "px-4",
      "py-2",
      "rounded",
      "text-white",
      bgColor
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

  // generates a button that activate the filter's input
  genButton(type) {
    const button = document.createElement("button");
    button.setAttribute("id", `filter-${type}`);
    button.classList.add(
      "text-white",
      "p-6",
      "rounded",
      "w-44",
      "flex",
      "justify-between",
      "items-center",
      this.getColor(type)
    );
    button.textContent = capitalise(this.translations[type]);

    const icon = document.createElement("img");
    icon.classList.add("w-4");
    icon.setAttribute("src", "assets/down-arrow-svgrepo-com.svg");
    icon.setAttribute("type", "image/svg");
    icon.setAttribute("alt", "dropdown-arrow");

    button.appendChild(icon);

    return button;
  }

  // generates an input activated by a button and displaying a datalist
  genInput(type) {
    const width = type === "ingredients" ? "w-[1000px]" : "w-96";
    const input = document.createElement("input");
    input.setAttribute("list", "");
    input.setAttribute("autocomplete", "off");
    input.classList.add(
      width,
      "rounded-t",
      "placeholder-white",
      "text-bold",
      "text-white",
      "p-6",
      "focus-visible:outline-none",
      this.getColor(type)
    );
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

    const icon = document.createElement("img");
    icon.classList.add(
      "w-4",
      "absolute",
      "z-10",
      "right-6",
      "top-6",
      "cursor-pointer"
    );
    icon.setAttribute("id", `close-${type}`);
    icon.setAttribute("src", "assets/up-arrow-svgrepo-com.svg");
    icon.setAttribute("type", "image/svg");
    icon.setAttribute("alt", "dropdown-arrow");
    icon.classList.add("absolute");
    icon.addEventListener("click", () => {
      this.toggleFilter(true, type);
    });

    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", `input-${type}`);
    wrapper.classList.add("hidden", "relative");
    wrapper.appendChild(input);
    wrapper.appendChild(icon);
    return wrapper;
  }

  // generates a datalist with the different options from each filter list
  genDataList(type) {
    const width = type === "ingredients" ? "w-[1000px]" : "w-96";
    const color = this.getColor(type);

    const dataList = document.createElement("datalist");
    dataList.setAttribute("id", `datalist-${type}`);
    dataList.classList.add(
      "hidden",
      "flex",
      "flex-col",
      "flex-wrap",
      "absolute",
      width,
      "max-h-[1050px]",
      "gap-y-2",
      "gap-x-4",
      "px-8",
      "pb-8",
      "top-18",
      "left-0",
      "rounded-b",
      color
    );

    const options = this.availableFilters[type].map((ig) => {
      const option = document.createElement("option");
      option.classList.add(color, "text-white", "min-w-40");
      option.setAttribute("value", ig);
      option.textContent = ig;
      return option;
    });
    dataList.append(...options);
    return dataList;
  }

  // opens dropdown to filter dataLists
  toggleFilter(isFilterOpened, type) {
    const button = document.querySelector(`#filter-${type}`);
    const input = document.querySelector(`#input-${type}`);
    const dataList = document.querySelector(`#datalist-${type}`);
    if (isFilterOpened) {
      button.style.display = "flex";
      input.style.display = "none";
      dataList.style.display = "none";
    } else {
      button.style.display = "none";
      input.style.display = "block";
      dataList.style.display = "flex";
    }
  }

  // put together the 3 different elements composing the filter feature
  genFilter(type) {
    const button = this.genButton(type);
    const input = this.genInput(type);
    const dataList = this.genDataList(type);

    button.addEventListener("click", () => {
      this.toggleFilter(false, type);
    });

    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("relative", "w-max");
    inputWrapper.append(input, dataList);

    return [button, inputWrapper];
  }

  // returns a background colour according the filter type
  getColor(type) {
    switch (type) {
      case "ingredients":
        return "bg-secondaryBlue";
      case "appliances":
        return "bg-secondaryGreen";
      case "tools":
        return "bg-secondaryOrange";
      default:
        return "bg-secondaryGrey";
    }
  }
}
