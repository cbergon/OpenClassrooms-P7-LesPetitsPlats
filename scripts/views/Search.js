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
    const globalSearchBar = this.genGlobalSearchInput();
    // #endregion

    // #region active filters tags wrapper
    this.filterTagsWrapper = document.createElement("div");
    this.filterTagsWrapper.classList.add("flex", "gap-2", "py-2");
    this.filterTagsWrapper.setAttribute("id", "tags-wrapper");
    // #endregion

    // #region filters wrapper
    this.filterInputsWrapper = document.createElement("div");
    this.filterInputsWrapper.classList.add("flex", "gap-2", "items-center");
    this.filterTagsWrapper.setAttribute("id", "filters-wrapper");

    const ingredientsFilter = this.genFilter("ingredients");
    const appliancesFilter = this.genFilter("appliances");
    const toolsFilter = this.genFilter("tools");

    this.filterInputsWrapper.append(
      ...ingredientsFilter,
      ...appliancesFilter,
      ...toolsFilter
    );
    // #endregion

    this.searchContainer.appendChild(globalSearchBar);
    this.searchContainer.appendChild(this.filterTagsWrapper);
    this.searchContainer.appendChild(this.filterInputsWrapper);
  }

  render(availableFilters, filters) {
    // #region updating available filters
    this.availableFilters = availableFilters;
    // #endregion

    // #region rendering active filter tags
    const filterTags = Object.keys(filters).reduce((acc, filterType) => {
      const tags = filters[filterType].map((filter) =>
        this.genFilterTag(filterType, filter)
      );
      return [...acc, ...tags];
    }, []);
    this.filterTagsWrapper.innerHTML = "";
    this.filterTagsWrapper.append(...filterTags);
    // #endregion

    // #region updating filters datalist options
    this.updateDataList("ingredients");
    this.updateDataList("appliances");
    this.updateDataList("tools");
    // #endregion
  }

  // generates global search input
  genGlobalSearchInput() {
    const searchBarWrapper = document.createElement("div");
    searchBarWrapper.classList.add("flex", "justify-center", "w-full");
    const globalSearchInput = document.createElement("input");
    globalSearchInput.classList.add(
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
    globalSearchInput.placeholder = "Rechercher une recette";
    globalSearchInput.addEventListener("input", (event) => {
      let value = "";
      if (event.target.value.length > 2) {
        value = Utils.normalize(event.target.value);
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

    searchBarWrapper.appendChild(globalSearchInput);

    return searchBarWrapper;
  }

  // generates tag displaying active filters
  genFilterTag(type, filter) {
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
    tag.textContent = Utils.capitalize(filter);

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
  genFilterButton(type) {
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
    button.textContent = Utils.capitalize(this.translations[type]);

    const icon = document.createElement("img");
    icon.classList.add("w-4");
    icon.setAttribute("src", "assets/down-arrow-svgrepo-com.svg");
    icon.setAttribute("type", "image/svg");
    icon.setAttribute("alt", "dropdown-arrow");

    button.appendChild(icon);

    return button;
  }

  // generates an input activated by a button and displaying a datalist
  genFilterInput(type) {
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
    // dispatches a custom event to trigger autocomplete
    input.addEventListener("input", (event) => {
      const value = Utils.normalize(event.target.value);
      document.dispatchEvent(
        new CustomEvent("filter-suggest", {
          detail: {
            filterType: type,
            filterValue: value,
          },
        })
      );
    });
    // dispatches a custom event to apply chosen filter
    input.addEventListener("change", (event) => {
      const value = Utils.normalize(event.target.value);
      if (
        this.availableFilters[type]
          .map((iter) => Utils.normalize(iter))
          .includes(value)
      ) {
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

  // generates filter options
  genFilterOptions(type, ft) {
    const option = document.createElement("option");
    option.classList.add(
      this.getColor(type),
      "text-white",
      "min-w-40",
      "cursor-pointer"
    );
    option.setAttribute("value", ft);
    option.textContent = ft;
    // dispatches a custom event to apply chosen filter
    option.addEventListener("click", () => {
      document.dispatchEvent(
        new CustomEvent("filter-select", {
          detail: {
            filterType: type,
            filterValue: Utils.normalize(ft),
          },
        })
      );
    });
    return option;
  }

  // generates a datalist with the different options from each filter list
  genFilterDataList(type) {
    const width = type === "ingredients" ? "w-[1000px]" : "w-96";

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
      this.getColor(type)
    );

    const options = this.availableFilters[type].map((ft) =>
      this.genFilterOptions(type, ft)
    );
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
    const button = this.genFilterButton(type);
    const input = this.genFilterInput(type);
    const dataList = this.genFilterDataList(type);

    button.addEventListener("click", () => {
      this.toggleFilter(false, type);
    });

    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("relative", "w-max");
    inputWrapper.append(input, dataList);

    return [button, inputWrapper];
  }

  // updates the filter's datalist
  updateDataList(type) {
    const dataList = document.querySelector(`#datalist-${type}`);
    dataList.innerHTML = "";
    const options = this.availableFilters[type].map((ft) =>
      this.genFilterOptions(type, ft)
    );
    dataList.append(...options);
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
