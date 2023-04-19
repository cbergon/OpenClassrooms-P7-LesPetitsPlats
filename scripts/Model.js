class Model {
  constructor() {
    this.data = null;
  }

  init() {
    this.data = [...recipes];
  }

  getRecipes() {
    return this.data;
  }
}
