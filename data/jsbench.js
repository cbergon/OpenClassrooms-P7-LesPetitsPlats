const consultURL = "https://jsben.ch/HLbnU";

const globalSearch = "coco";

const recipes = [
  {
    id: 1,
    name: "Limonade de Coco",
    servings: 1,
    ingredients: [
      {
        ingredient: "Lait de coco",
        quantity: 400,
        unit: "ml",
      },
      {
        ingredient: "Jus de citron",
        quantity: 2,
      },
      {
        ingredient: "Crème de coco",
        quantity: 2,
        unit: "cuillères à soupe",
      },
      {
        ingredient: "Sucre",
        quantity: 30,
        unit: "grammes",
      },
      {
        ingredient: "Glaçons",
      },
    ],
    time: 10,
    description:
      "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée.",
    appliance: "Blender",
    ustensils: ["cuillère à Soupe", "verres", "presse citron"],
  },
  {
    id: 2,
    name: "Poisson Cru à la tahitienne",
    servings: 2,
    ingredients: [
      {
        ingredient: "Thon Rouge (ou blanc)",
        quantity: 200,
        unit: "grammes",
      },
      {
        ingredient: "Concombre",
        quantity: 1,
      },
      {
        ingredient: "Tomate",
        quantity: 2,
      },
      {
        ingredient: "Carotte",
        quantity: 1,
      },
      {
        ingredient: "Citron Vert",
        quantity: 5,
      },
      {
        ingredient: "Lait de Coco",
        quantity: 100,
        unit: "ml",
      },
    ],
    time: 60,
    description:
      "Découper le thon en dés, mettre dans un plat et recouvrir de jus de citron vert (mieux vaut prendre un plat large et peu profond). Laisser reposer au réfrigérateur au moins 2 heures. (Si possible faites-le le soir pour le lendemain. Après avoir laissé mariner le poisson, coupez le concombre en fines rondelles sans la peau et les tomates en prenant soin de retirer les pépins. Rayer la carotte. Ajouter les légumes au poissons avec le citron cette fois ci dans un Saladier. Ajouter le lait de coco. Pour ajouter un peu plus de saveur vous pouvez ajouter 1 à 2 cuillères à soupe de Crème de coco",
    appliance: "Saladier",
    ustensils: ["presse citron"],
  },
  {
    id: 3,
    name: "Poulet coco réunionnais",
    servings: 4,
    ingredients: [
      {
        ingredient: "Poulet",
        quantity: 1,
      },
      {
        ingredient: "Lait de coco",
        quantity: 400,
        unit: "ml",
      },
      {
        ingredient: "Coulis de tomate",
        quantity: 25,
        unit: "cl",
      },
      {
        ingredient: "Oignon",
        quantity: 1,
      },
      {
        ingredient: "Poivron rouge",
        quantity: 1,
      },
      {
        ingredient: "Huile d'olive",
        quantity: 1,
        unit: "cuillères à soupe",
      },
    ],
    time: 80,
    description:
      "Découper le poulet en morceaux, les faire dorer dans une cocotte avec de l'huile d'olive. Salez et poivrez. Une fois doré, laisser cuire en ajoutant de l'eau. Au bout de 30 minutes, ajouter le coulis de tomate, le lait de coco ainsi que le poivron et l'oignon découpés en morceaux. Laisser cuisiner 30 minutes de plus. Servir avec du riz",
    appliance: "Cocotte",
    ustensils: ["couteau"],
  },
  {
    id: 4,
    name: "Salade de riz",
    servings: 4,
    ingredients: [
      {
        ingredient: "Riz blanc",
        quantity: 500,
        unit: "grammes",
      },
      {
        ingredient: "Thon en miettes",
        quantity: 200,
        unit: "grammes",
      },
      {
        ingredient: "Tomate",
        quantity: 2,
      },
      {
        ingredient: "Oeuf dur",
        quantity: 2,
      },
      {
        ingredient: "Maïs",
        quantity: 300,
        unit: "grammes",
      },
      {
        ingredient: "Vinaigrette",
        quantity: 5,
        unit: "cl",
      },
    ],
    time: 50,
    description:
      "Faire cuire le riz. Une fois le riz cuit, le laisser refroidir. Couper les oeufs dur en quarts ou en lamelle au choix, coupez le tomates en dés, ajouter au riz les oeufs, les tomates, le poisson, le maïs et la vinaigrette. Ajouter au gout de chacun des corniches, olives etc..",
    appliance: "Cuiseur de riz",
    ustensils: ["saladier", "passoire"],
  },
  {
    id: 5,
    name: "Tarte au thon",
    servings: 4,
    ingredients: [
      {
        ingredient: "Pâte feuilletée",
        quantity: 1,
      },
      {
        ingredient: "Thon en miettes",
        quantity: 130,
        unit: "grammes",
      },
      {
        ingredient: "Tomate",
        quantity: 2,
      },
      {
        ingredient: "Crème fraîche",
        quantity: 2,
        unit: "cuillères à soupe",
      },
      {
        ingredient: "gruyère râpé",
        quantity: 100,
        unit: "grammes",
      },
      {
        ingredient: "Moutarde de Dijon",
        quantity: 1,
        unite: "cuillères à soupe",
      },
    ],
    time: 45,
    description:
      "Étaler la pâte feuilleté aux dimensions du moule, étaler la moutarde sur la pâte feuilleté, ajouter le thon. Découper les tomates en rondelles et les poser sur le poisson, ajouter un peu de crème fraîche sur toute la tarte et recouvrez de gruyère râpé. Cuire au four 30 minutes",
    appliance: "Four",
    ustensils: ["moule à tarte", "râpe à fromage", "couteau"],
  },
  {
    id: 6,
    name: "Tarte aux pommes",
    servings: 6,
    ingredients: [
      {
        ingredient: "Pâte brisée",
        quantity: 1,
      },
      {
        ingredient: "Pomme",
        quantity: 3,
      },
      {
        ingredient: "Oeuf",
        quantity: "2",
      },
      {
        ingredient: "Crème fraîche",
        quantity: 25,
        unit: "cl",
      },
      {
        ingredient: "Sucre en Poudre",
        quantity: 100,
        unit: "grammes",
      },
      {
        ingredient: "Sucre vanillé",
        quantity: 1,
        unit: "sachets",
      },
    ],
    time: 50,
    description:
      "Commencez par mélanger les oeufs le sucre et le sucre vanillé dans un saladier, découper les pommes en tranches, ajouter la crème fraîche aux oeufs. Une fois que tout est pret, étalez la tarte dans le moule. N'oubliez pas de piquer le fond avec une fourchette avant de positionner les pommes sur la tarte. Finalement verser la préparation à base d'oeufs et de crème fraîche. Laisser cuire au four pendant 30 minutes",
    appliance: "Four",
    ustensils: ["moule à tarte", "saladier", "fourchette"],
  },
  {
    id: 7,
    name: "Tartelettes au chocolat et aux fraises",
    servings: 6,
    ingredients: [
      {
        ingredient: "Pâte sablée",
        quantity: 1,
      },
      {
        ingredient: "Chocolat au lait",
        quantity: 300,
        unit: "grammes",
      },
      {
        ingredient: "Crème liquide",
        quantity: 80,
        unit: "cl",
      },
      {
        ingredient: "Beurre",
        quantity: "30",
        unit: "grammes",
      },
      {
        ingredient: "Fraise",
        quantity: 6,
      },
    ],
    time: 50,
    description:
      "Étaler la pate dans les moules à tartelette. Faire cuire la pate 30 minutes. Découper le chocolat en morceau et le faire chauffer, y ajouter la crème liquide, ajouter le beurre et remuer jusqu'à avoir une pâte homogène. Verser la pate sur les tartelettes. Couper les fraises en 2 et les positionner sur ",
    appliance: "Four",
    ustensils: ["moule à tartelettes (6)", "casserole"],
  },
  {
    id: 8,
    name: "Brownie",
    servings: 10,
    ingredients: [
      {
        ingredient: "Noix",
        quantity: "180",
        unit: "grammes",
      },
      {
        ingredient: "Chocolat noir",
        quantity: 150,
        unit: "grammes",
      },
      {
        ingredient: "Beurre",
        quantity: 120,
        unit: "grammes",
      },
      {
        ingredient: "Oeuf",
        quantity: 2,
      },
      {
        ingredient: "Sucre en Poudre",
        quantity: "110",
        unit: "grammes",
      },
      {
        ingredient: "farine",
        quantity: 90,
        unit: "grammes",
      },
    ],
    time: 60,
    description:
      "Hachez les noix grossièrement. Faire fondre le chocolat avec le beurre. Mélanger les oeufs et le sucre et mélanger au chocolat. Ajouter la farine. Mélanger afin d'avoir quelque chose d'homogène puis incorporer les noix. Verser la préparation dans un moule de préférence rectangulaire. Cuire 2O à 25 minutes à 180°. Sortez du four et attendez quelques minutes pour démouler. Servir avec une boule de glace pour plus de gourmandise.",
    appliance: "Four",
    ustensils: ["moule à gateaux", "casserole"],
  },
  {
    id: 9,
    name: "Salade Méditerannéene fraîche au chèvre",
    servings: 4,
    ingredients: [
      {
        ingredient: "Concombre",
        quantity: 1,
      },
      {
        ingredient: "Olives",
      },
      {
        ingredient: "Fromage de chèvre",
        quantity: 150,
        unit: "grammes",
      },
      {
        ingredient: "Vinaigre Balsamic",
      },
      {
        ingredient: "Huile d'olive",
      },
      {
        ingredient: "Basilic",
      },
    ],
    time: 15,
    description:
      "Peler le concombre le couper 2, retirer les pépins. Couper les olives en morceaux, ainsi que le fromage de chèvre. Ajouter le basilic ainsi que le vinaigre balsamic et l'huile d'olives à votre gout.",
    appliance: "Saladier",
    ustensils: ["cuillère en bois", "couteau"],
  },
  {
    id: 10,
    name: "Tartiflette",
    servings: 4,
    ingredients: [
      {
        ingredient: "Reblochon",
        quantity: "1",
      },
      {
        ingredient: "Pommes de terre",
        quantity: 4.5,
        unit: "kg",
      },
      {
        ingredient: "Jambon fumé",
        quantity: 2,
        unit: "tranches",
      },
      {
        ingredient: "Oignon",
        quantity: 300,
        unit: "grammes",
      },
      {
        ingredient: "Vin blanc sec",
        quantity: 30,
        unit: "cl",
      },
    ],
    time: 60,
    description:
      "Commencer par cuire les pommes de terre dans l'eau bouillante. Puis épluchez les et coupez les en rondelles. Émincer les oignons puis les faire dorer dans du beurre. Ajouter le jambon fumé coupé en en morceaux ainsi que les pommes de terres. Salez, poivrez à votre gout ( et celui de vos convives ) Laissez cuisiner durant environ 10 minutes puis ajouter le vin blanc. Après 5 minutes, mettre le tout dans un plat à gratin. Coupez le reblochon, soit en tranches, soit le couper en 2 dans le sens de l'épaisseur et recouvrir les pommes de terre. Cuire au four (environ 220°) durant 25 minutes. C'est prêt !",
    appliance: "Four",
    ustensils: ["plat à gratin", "couteau", "Économe"],
  },
];

class Utils {
  static capitalize(str) {
    return `${str.substring(0, 1).toUpperCase()}${str
      .substring(1)
      .toLowerCase()}`;
  }

  static normalize(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  }
}

function applyForSearch(recipes, globalSearch) {
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

  return newRecipes;
}

applyForSearch(recipes, globalSearch);

function applyFuncSearch(recipes, globalSearch) {
  const newRecipes = recipes.filter((recipe) => {
    const possibilities = [
      Utils.normalize(recipe.name),
      Utils.normalize(recipe.description),
      ...recipe.ingredients.map((ingredient) =>
        Utils.normalize(ingredient.ingredient)
      ),
    ];

    return possibilities.some(
      (possibility) => possibility.indexOf(globalSearch) !== -1
    );
  });

  return newRecipes;
}

applyFuncSearch(recipes, globalSearch);
