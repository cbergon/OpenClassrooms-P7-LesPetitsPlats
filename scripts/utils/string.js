function capitalise(str) {
  return `${str.substring(0, 1).toUpperCase()}${str
    .substring(1)
    .toLowerCase()}`;
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}
