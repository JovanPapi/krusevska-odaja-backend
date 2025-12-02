import { ProductCategory } from "../enum/ProductCategory";
import { Admin, AdminCreationAttributes } from "../models/Admin";
import { Ingredient, IngredientCreationAttributes } from "../models/Ingredient";
import { Product } from "../models/Product";
import { Waiter, WaiterCreationAttributes } from "../models/Waiter";

/**
 * Service function responsible for populating the database with hard coded data
 * It populates with Ingredients, Waiters and Products and their relations
 */
export async function populateDatabase() {
  const listOfIngredients: IngredientCreationAttributes[] = [
    { name: "Cabbage", nameTranslated: "Зелка" },
    { name: "Tomato", nameTranslated: "Tomato" },
    { name: "Cucumber", nameTranslated: "Краставица" },
    { name: "Beets", nameTranslated: "Цвекло" },
    { name: "Carrots", nameTranslated: "Моркови" },
    { name: "Onion", nameTranslated: "Кромид" },
    { name: "Cheese", nameTranslated: "Сирење" },
    { name: "Pepper", nameTranslated: "Бибер" },
    { name: "Olives", nameTranslated: "Маслинки" },
    { name: "Lettuce", nameTranslated: "Марула" },
    { name: "Egg", nameTranslated: "Јајце" },
    { name: "Sour cream", nameTranslated: "Павлака" },
    { name: "Walnut", nameTranslated: "Орев" },
    { name: "Yellow cheese", nameTranslated: "Кашкавал" },
    { name: "Sour peppers", nameTranslated: "Кисели пиперки" },
    { name: "Curd", nameTranslated: "Урда" },
    { name: "Sour cauliflower", nameTranslated: "Кисело карфиол" },
    { name: "Pickles", nameTranslated: "Кисели краставички" },
    { name: "Contempt", nameTranslated: "Презир" },
    { name: "Chicken", nameTranslated: "Пилешко" },
    { name: "Flour", nameTranslated: "Брашно" },
    { name: "Breaded yellow cheese", nameTranslated: "Похован кашкавал" },
    { name: "Zucchini", nameTranslated: "Тиквички" },
    { name: "Cream cheese", nameTranslated: "Крем сирење" },
    { name: "Hard cheese", nameTranslated: "Тврдо сирење" },
    { name: "Pie", nameTranslated: "Пита" },
    { name: "Pork", nameTranslated: "Свинско месо" },
    { name: "Beef meat", nameTranslated: "Говедско месо" },
    { name: "Garlic", nameTranslated: "Лук" },
    { name: "Pork meat", nameTranslated: "Свинско месо" },
    { name: "Leek", nameTranslated: "Празот" },
    { name: "Mushroom sauce", nameTranslated: "Сос од печурки" },
    { name: "Sauce", nameTranslated: "Сос" },
    { name: "Minced meat", nameTranslated: "Мелено месо" },
    { name: "Pork createet", nameTranslated: "Свинско филе" },
    { name: "Vegetables", nameTranslated: "Зеленчук" },
    { name: "Mushrooms", nameTranslated: "Печурки" },
    { name: "Steak", nameTranslated: "Стек" },
    { name: "Sausage", nameTranslated: "Колбас" },
    { name: "Roasted lamb", nameTranslated: "Јагнешко печено" },
    { name: "Lamb meat", nameTranslated: "Јагнешко месо" },
    { name: "Sliced pork meat", nameTranslated: "Исечено свинско месо" },
    {
      name: "Boneless bullocks meat",
      nameTranslated: "Месо од бикови без коски",
    },
    { name: "Bread crumps", nameTranslated: "Трошки од леб" },
    { name: "Okra", nameTranslated: "Бамја" },
    { name: "Potato", nameTranslated: "Компир" },
    { name: "Mashed potatoes", nameTranslated: "Пире од компири" },
    { name: "Pea", nameTranslated: "Грашок" },
    { name: "Celery", nameTranslated: "Целер" },
    { name: "Parsnip", nameTranslated: "Пашканат" },
    { name: "Accessories", nameTranslated: "Додатоци" },
    { name: "Dry pepper", nameTranslated: "Сува пиперка" },
  ];

  await Ingredient.truncate().catch((error) => console.log("Error truncating ingredients:", error));

  await Ingredient.bulkCreate(listOfIngredients).catch((error) =>
    console.log("Error saving ingredients:", error)
  ); // Save ingredients first to avoid foreign key constraint issues

  const ingredientsFromDB: Ingredient[] = await Ingredient.findAll();

  await createSalads(ingredientsFromDB);
  await createGarnishAndExtras();
  await createAppetizers(ingredientsFromDB);
  await createGrill(ingredientsFromDB);
  await createDishesToOrder(ingredientsFromDB);
  await createSpecialitiesOfHouse(ingredientsFromDB);
  await createCookedDishes(ingredientsFromDB);
  await createDesertsAndSnacks();
  await createDrinks();

  const listOfAdmins: AdminCreationAttributes[] = [
    {
      firstName: "Vladko",
      lastName: "Papalazoski",
      username: "vladko.papalazoski",
      password: "admin",
    },
    {
      firstName: "Jovan",
      lastName: "Papalazoski",
      username: "jovan.papalazoski",
      password: "waiter",
    },
    {
      firstName: "Mihail",
      lastName: "Papalazoski",
      username: "mihail.papalazoski",
      password: "kitchen",
    },
  ];

  await Admin.bulkCreate(listOfAdmins);

  const listOfWaiters: WaiterCreationAttributes[] = [
    {
      firstName: "Jovan",
      lastName: "Papalazoski",
      code: 1,
    },
  ];

  await Waiter.bulkCreate(listOfWaiters);
}

async function createSalads(ingredientsFromDB: Ingredient[]) {
  const productsData = [
    {
      name: "Season",
      nameTranslated: "Сезонска",
      price: 160,
      productCategory: ProductCategory.SALADS,
      description: "",
      ingredients: ["cabbage", "tomato", "cucumber", "beets", "carrots"],
    },
    {
      name: "Shopska",
      nameTranslated: "Шопска",
      price: 160,
      productCategory: ProductCategory.SALADS,
      description: "",
      ingredients: ["cucumber", "tomato", "onion", "cheese"],
    },
    {
      name: "Macedonian",
      nameTranslated: "Македонска",
      price: 160,
      productCategory: ProductCategory.SALADS,
      description: "",
      ingredients: ["cabbage", "onion", "pepper"],
    },
    {
      name: "Egejska",
      nameTranslated: "Егејска",
      price: 160,
      productCategory: ProductCategory.SALADS,
      description: "",
      ingredients: ["tomato", "cucumber", "cheese", "olives"],
    },
    {
      name: "Tarator",
      nameTranslated: "Таратор",
      price: 160,
      productCategory: ProductCategory.SALADS,
      description: "",
      ingredients: ["cucumber", "sour", "walnut"],
    },
    {
      name: "Ovcharska",
      nameTranslated: "Овчарска",
      price: 160,
      productCategory: ProductCategory.SALADS,
      description: "",
      ingredients: ["cucumber", "tomato", "yellow cheese", "cheese", "egg"],
    },
    {
      name: "Ovchavina",
      nameTranslated: "Овчавина",
      price: 160,
      productCategory: ProductCategory.SALADS,
      description: "",
      ingredients: ["sour peppers", "curd", "sour cream"],
    },
    {
      name: "Turshija",
      nameTranslated: "Туршија",
      price: 160,
      productCategory: ProductCategory.SALADS,
      description: "",
      ingredients: ["sour cauliflower", "cabbage", "carrots", "pickles"],
    },
  ];

  for (const prod of productsData) {
    const product = await Product.create({
      name: prod.name,
      nameTranslated: prod.nameTranslated,
      price: prod.price,
      productCategory: prod.productCategory,
      description: prod.description,
    });

    if (prod.ingredients && prod.ingredients.length > 0) {
      const ingredientsToAdd = splitIngredients(ingredientsFromDB, prod.ingredients);
      +(
        //TODO: Research for better way for populating many-to-many junction table!
        // I had to implement it this way, BECAUSE TYPESCRIPT DOESNT SUGGEST addListOfIngredients auto generated method from Sequilize.
        (await (product as any).addListOfIngredients(ingredientsToAdd))
      );
    }
  }
}

async function createGarnishAndExtras() {
  const garnishProductsData = [
    {
      name: "Garnish",
      nameTranslated: "Гарнир",
      price: 40,
      productCategory: ProductCategory.GARNISH_AND_EXTRA,
      description: "",
    },
    {
      name: "Roast Bread",
      nameTranslated: "Нафора",
      price: 80,
      productCategory: ProductCategory.GARNISH_AND_EXTRA,
      description: "",
    },
    {
      name: "Roast Bread With Cheese",
      nameTranslated: "Нафора со сирење",
      price: 100,
      productCategory: ProductCategory.GARNISH_AND_EXTRA,
      description: "",
    },
    {
      name: "French Fries",
      nameTranslated: "Помфрит",
      price: 90,
      productCategory: ProductCategory.GARNISH_AND_EXTRA,
      description: "small",
    },
    {
      name: "French Fries",
      nameTranslated: "Помфрит",
      price: 150,
      productCategory: ProductCategory.GARNISH_AND_EXTRA,
      description: "large",
    },
    {
      name: "Fries With Cheese",
      nameTranslated: "Помфрит со сирење",
      price: 120,
      productCategory: ProductCategory.GARNISH_AND_EXTRA,
      description: "small",
    },
    {
      name: "Fries With Cheese",
      nameTranslated: "Помфрит со сирење",
      price: 180,
      productCategory: ProductCategory.GARNISH_AND_EXTRA,
      description: "large",
    },
    {
      name: "Bread Piece",
      nameTranslated: "Леб",
      price: 20,
      productCategory: ProductCategory.GARNISH_AND_EXTRA,
      description: "",
    },
    {
      name: "Lepinja Bread",
      nameTranslated: "Лепиња",
      price: 30,
      productCategory: ProductCategory.GARNISH_AND_EXTRA,
      description: "",
    },
    {
      name: "Hot Pepper",
      nameTranslated: "Луто пиперче",
      price: 20,
      productCategory: ProductCategory.GARNISH_AND_EXTRA,
      description: "",
    },
  ];

  for (const prod of garnishProductsData) {
    await Product.create({
      name: prod.name,
      nameTranslated: prod.nameTranslated,
      price: prod.price,
      productCategory: prod.productCategory,
      description: prod.description,
    });
  }
}

async function createAppetizers(ingredientsFromDB: Ingredient[]) {
  const appetizersProductsData = [
    {
      name: "Sheep cheese",
      nameTranslated: "Овчо сирење",
      price: 170,
      productCategory: ProductCategory.APPETIZERS,
      description: "100g",
    },
    {
      name: "Hard cheese",
      nameTranslated: "Биено сирење",
      price: 160,
      productCategory: ProductCategory.APPETIZERS,
      description: "100g",
    },
    {
      name: "Goat cheese",
      nameTranslated: "Козјо сирење",
      price: 170,
      productCategory: ProductCategory.APPETIZERS,
      description: "100g",
    },
    {
      name: "Yellow cheese",
      nameTranslated: "Кашкавал",
      price: 140,
      productCategory: ProductCategory.APPETIZERS,
      description: "100g",
    },
    {
      name: "Breaded yellow cheese",
      nameTranslated: "Похован кашкавал",
      price: 160,
      productCategory: ProductCategory.APPETIZERS,
      description: "100g",
      ingredients: ["yellow cheese", "curd", "egg"],
    },
    {
      name: "Omlette",
      nameTranslated: "Омлет",
      price: 130,
      productCategory: ProductCategory.APPETIZERS,
      description: "3 eggs",
    },
    {
      name: "Scrambled eggs",
      nameTranslated: "Кајгана",
      price: 100,
      productCategory: ProductCategory.APPETIZERS,
      description: "3 eggs",
    },
    {
      name: "Chicken fingers",
      nameTranslated: "Пилешки прсти",
      price: 240,
      productCategory: ProductCategory.APPETIZERS,
      description: "250g",
      ingredients: ["chicken", "flour", "curd", "egg"],
    },
    {
      name: "Olives",
      nameTranslated: "Маслинки",
      price: 120,
      productCategory: ProductCategory.APPETIZERS,
      description: "150g",
    },
    {
      name: "Pindzur",
      nameTranslated: "Толчени пиперки",
      price: 150,
      productCategory: ProductCategory.APPETIZERS,
      description: "",
    },
    {
      name: "Ajvar",
      nameTranslated: "Ајвар",
      price: 150,
      productCategory: ProductCategory.APPETIZERS,
      description: "",
    },
    {
      name: "Makalo",
      nameTranslated: "Макало",
      price: 150,
      productCategory: ProductCategory.APPETIZERS,
      description: "",
      ingredients: ["mashed potatoes", "dry pepper"],
    },
    {
      name: "Lutica",
      nameTranslated: "Лутица",
      price: 150,
      productCategory: ProductCategory.APPETIZERS,
      description: "",
    },
    {
      name: "Maznik Pie",
      nameTranslated: "Мазник",
      price: 140,
      productCategory: ProductCategory.APPETIZERS,
      description: "one piece",
    },
    {
      name: "Meat Jelly",
      nameTranslated: "Пифтија",
      price: 180,
      productCategory: ProductCategory.APPETIZERS,
      description: "",
    },
    {
      name: "Pitulici with garlic",
      nameTranslated: "Питулици со лук",
      price: 100,
      productCategory: ProductCategory.APPETIZERS,
      description: "one piece",
    },
    {
      name: "Pie with leek",
      nameTranslated: "Пита со спанаќ",
      price: 180,
      productCategory: ProductCategory.APPETIZERS,
      description: "one piece",
    },
    {
      name: "Pie with spinach",
      nameTranslated: "Пита со праз",
      price: 180,
      productCategory: ProductCategory.APPETIZERS,
      description: "one piece",
    },
    {
      name: "Grilled mushrooms",
      nameTranslated: "Печурки на скара",
      price: 150,
      productCategory: ProductCategory.APPETIZERS,
      description: "200g",
    },
    {
      name: "Boletus portion",
      nameTranslated: "Вргањ порција",
      price: 350,
      productCategory: ProductCategory.APPETIZERS,
      description: "200g",
    },
  ];

  for (const prod of appetizersProductsData) {
    const product = await Product.create({
      name: prod.name,
      nameTranslated: prod.nameTranslated,
      price: prod.price,
      productCategory: prod.productCategory,
      description: prod.description,
    });
    if (prod.ingredients && prod.ingredients.length > 0) {
      const ingredientsToAdd = splitIngredients(ingredientsFromDB, prod.ingredients);
      await (product as any).addListOfIngredients(ingredientsToAdd);
    }
  }
}

async function createGrill(ingredientsFromDB: Ingredient[]) {
  const grillsProductsData = [
    {
      name: "Kebap",
      nameTranslated: "Кебап",
      price: 30,
      productCategory: ProductCategory.GRILL,
      description: "40g beef/pork",
      ingredients: ["beef meat", "pork"],
    },
    {
      name: "Burger",
      nameTranslated: "Плескавица",
      price: 130,
      productCategory: ProductCategory.GRILL,
      description: "200g",
      ingredients: ["pork", "beef meat"],
    },
    {
      name: "Burger Lovecka small",
      nameTranslated: "Ловечка плескавица мала",
      price: 200,
      productCategory: ProductCategory.GRILL,
      description: "250g",
      ingredients: ["pork", "beef meat", "yellow cheese"],
    },
    {
      name: "Burger Lovecka large",
      nameTranslated: "Ловечка плескавица голема",
      price: 250,
      productCategory: ProductCategory.GRILL,
      description: "350g",
      ingredients: ["pork", "beef meat", "yellow cheese"],
    },
    {
      name: "Makedonka small",
      nameTranslated: "Македонка мала",
      price: 250,
      productCategory: ProductCategory.GRILL,
      description: "250g",
      ingredients: ["pork", "beef meat", "yellow cheese"],
    },
    {
      name: "Makedonka large",
      nameTranslated: "Македонка голема",
      price: 300,
      productCategory: ProductCategory.GRILL,
      description: "350g",
      ingredients: ["pork", "beef meat", "yellow cheese"],
    },
    {
      name: "Fritters",
      nameTranslated: "Уштипец",
      price: 200,
      productCategory: ProductCategory.GRILL,
      description: "250g",
      ingredients: ["pork", "beef meat", "yellow cheese", "garlic"],
    },
    {
      name: "Fritters",
      nameTranslated: "Уштипец",
      price: 200,
      productCategory: ProductCategory.GRILL,
      description: "350g",
      ingredients: ["pork", "neef meat", "yellow cheese", "garlic"],
    },
    {
      name: "Pork rib",
      nameTranslated: "Ребро",
      price: 210,
      productCategory: ProductCategory.GRILL,
      description: "300g",
    },
    {
      name: "Pork chop",
      nameTranslated: "Кременадла",
      price: 210,
      productCategory: ProductCategory.GRILL,
      description: "220g",
    },
    {
      name: "Ramsteak",
      nameTranslated: "Вешалица",
      price: 230,
      productCategory: ProductCategory.GRILL,
      description: "200g",
    },
    {
      name: "Smoked bacon",
      nameTranslated: "Чадена сланина",
      price: 240,
      productCategory: ProductCategory.GRILL,
      description: "200g",
    },
    {
      name: "Trout Fish",
      nameTranslated: "Риба пастрмка",
      price: 370,
      productCategory: ProductCategory.GRILL,
      description: "300g",
    },
    {
      name: "Pork Kabobs",
      nameTranslated: "Свински ражнич",
      price: 210,
      productCategory: ProductCategory.GRILL,
      description: "200g",
    },
    {
      name: "Chicken kabobs",
      nameTranslated: "Пилешки ражнич",
      price: 210,
      productCategory: ProductCategory.GRILL,
      description: "200g",
    },
    {
      name: "Wrapped pork meat",
      nameTranslated: "Свински увијач",
      price: 250,
      productCategory: ProductCategory.GRILL,
      description: "240g",
      ingredients: ["pork meat", "yellow cheese"],
    },
    {
      name: "Wrapped chicken meat",
      nameTranslated: "Пилешки увијач",
      price: 250,
      productCategory: ProductCategory.GRILL,
      description: "240g",
      ingredients: ["chicken", "yellow cheese"],
    },
    {
      name: "Krusevski Sausage",
      nameTranslated: "Крушевски колбас",
      price: 210,
      productCategory: ProductCategory.GRILL,
      description: "200g",
      ingredients: ["pork meat", "leek"],
    },
    {
      name: "Chicken Steak",
      nameTranslated: "Пилешки стек",
      price: 180,
      productCategory: ProductCategory.GRILL,
      description: "200g",
    },
    {
      name: "Chicken Steak in mushroom sauce",
      nameTranslated: "Пилешки стек во сос",
      price: 230,
      productCategory: ProductCategory.GRILL,
      description: "200g",
      ingredients: ["chicken", "mushroom sauce"],
    },
    {
      name: "Natur Escalope",
      nameTranslated: "Натур шницла",
      price: 350,
      productCategory: ProductCategory.GRILL,
      description: "200g",
      ingredients: ["boneless bullocks meat", "sauce"],
    },
    {
      name: "Wiener schnitzel",
      nameTranslated: "Бечка шницла",
      price: 260,
      productCategory: ProductCategory.GRILL,
      description: "200g",
      ingredients: ["boneless bullocks meat", "flour", "bread crumbs", "egg"],
    },
  ];

  for (const prod of grillsProductsData) {
    const product = await Product.create({
      name: prod.name,
      nameTranslated: prod.nameTranslated,
      price: prod.price,
      productCategory: prod.productCategory,
      description: prod.description,
    });

    if (prod.ingredients && prod.ingredients.length > 0) {
      const ingredientsToAdd = splitIngredients(ingredientsFromDB, prod.ingredients);
      await (product as any).addListOfIngredients(ingredientsToAdd);
    }
  }
}

async function createDishesToOrder(ingredientsFromDB: Ingredient[]) {
  const dishesToOrderData = [
    {
      name: "Krusevski Kukuruz Odaja",
      nameTranslated: "Крушевски Кукуриз Одаја",
      price: 1000,
      productCategory: ProductCategory.DISHES_TO_ORDER,
      description: "pan for 4 people",
    },
    {
      name: "Lamb Shirden Odaja",
      nameTranslated: "Јагнешки Ширден Одаја",
      price: 430,
      productCategory: ProductCategory.DISHES_TO_ORDER,
      description: "",
      ingredients: ["pork meat", "lamb meat", "vegetables"],
    },
    {
      name: "Bean Soup With Veal",
      nameTranslated: "Грав со пастрма",
      price: 1000,
      productCategory: ProductCategory.DISHES_TO_ORDER,
      description: "pan for 4 people",
    },
    {
      name: "Lamb Pot Odaja",
      nameTranslated: "Јагнешка Тава Одаја",
      price: 2000,
      productCategory: ProductCategory.DISHES_TO_ORDER,
      description: "",
      ingredients: ["roasted lamb", "sour cream", "egg"],
    },
    {
      name: "Sarma Odaja",
      nameTranslated: "Сарма Одаја",
      price: 1000,
      productCategory: ProductCategory.DISHES_TO_ORDER,
      description: "pan for 4 people",
      ingredients: ["sliced pork meat", "vegetables"],
    },
    {
      name: "Traditional Pan Odaja",
      nameTranslated: "Селска Тава Одаја",
      price: 1300,
      productCategory: ProductCategory.DISHES_TO_ORDER,
      description: "pan for 4 people",
      ingredients: ["pork meat", "minced meat", "mushrooms", "vegetables"],
    },
  ];

  for (const prod of dishesToOrderData) {
    const product = await Product.create({
      name: prod.name,
      nameTranslated: prod.nameTranslated,
      price: prod.price,
      productCategory: prod.productCategory,
      description: prod.description,
    });

    if (prod.ingredients && prod.ingredients.length > 0) {
      const ingredientsToAdd = splitIngredients(ingredientsFromDB, prod.ingredients);
      await (product as any).addListOfIngredients(ingredientsToAdd);
    }
  }
}

async function createSpecialitiesOfHouse(ingredientsFromDB: Ingredient[]) {
  const specialitiesData = [
    {
      name: "Krusevska sabja",
      nameTranslated: "Крушевска сабја",
      price: 360,
      productCategory: ProductCategory.SPECIALITIES,
      description: "300g",
      ingredients: ["pork", "chicken", "minced meat", "vegetables"],
    },
    {
      name: "Stuffed pork fillet",
      nameTranslated: "Полнето свинско месо",
      price: 450,
      productCategory: ProductCategory.SPECIALITIES,
      description: "350g",
      ingredients: ["pork fillet", "yellow cheese", "mushrooms"],
    },
    {
      name: "Grilled salt pork",
      nameTranslated: "Солено свинско на скара",
      price: 250,
      productCategory: ProductCategory.SPECIALITIES,
      description: "280g",
    },
    {
      name: "Rib in the oven",
      nameTranslated: "Ребро во фурна",
      price: 430,
      productCategory: ProductCategory.SPECIALITIES,
      description: "500g",
    },
    {
      name: "Pork knuckle",
      nameTranslated: "Свинска коленица",
      price: 450,
      productCategory: ProductCategory.SPECIALITIES,
      description: "",
    },
    {
      name: "Roasted lamb",
      nameTranslated: "Јагнешко печење",
      price: 2600,
      productCategory: ProductCategory.SPECIALITIES,
      description: "1kg",
    },
  ];

  for (const prod of specialitiesData) {
    const product = await Product.create({
      name: prod.name,
      nameTranslated: prod.nameTranslated,
      price: prod.price,
      productCategory: prod.productCategory,
      description: prod.description,
    });

    if (prod.ingredients && prod.ingredients.length > 0) {
      const ingredientsToAdd = splitIngredients(ingredientsFromDB, prod.ingredients);
      await (product as any).addListOfIngredients(ingredientsToAdd);
    }
  }
}

async function createCookedDishes(ingredientsFromDB: Ingredient[]) {
  const cookedDishesData = [
    {
      name: "Macedonian pan",
      nameTranslated: "Македонска тава",
      price: 330,
      productCategory: ProductCategory.COOKED_DISHES,
      description: "300g",
      ingredients: ["pork", "steak", "sausage", "vegetables"],
    },
    {
      name: "Traditional meat",
      nameTranslated: "Селско месо",
      price: 330,
      productCategory: ProductCategory.COOKED_DISHES,
      description: "300g",
      ingredients: ["pork", "minced meat", "mushrooms", "vegetables"],
    },
    {
      name: "Veal muscle in boletus sauce",
      nameTranslated: "Телешки мускул во сос од вргањ",
      price: 500,
      productCategory: ProductCategory.COOKED_DISHES,
      description: "300g",
    },
    {
      name: "Baked beans",
      nameTranslated: "Тавче гравче",
      price: 150,
      productCategory: ProductCategory.COOKED_DISHES,
      description: "250g",
    },
    {
      name: "Turlitava",
      nameTranslated: "Турлитава",
      price: 220,
      productCategory: ProductCategory.COOKED_DISHES,
      description: "250g",
      ingredients: ["tomato", "okra", "zucchini", "peppers", "potato", "carrots", "pea"],
    },
    {
      name: "Lean sarma",
      nameTranslated: "Посна сарма",
      price: 80,
      productCategory: ProductCategory.COOKED_DISHES,
      description: "1 piece",
    },
    {
      name: "Sarma with meat",
      nameTranslated: "Сарма со месо",
      price: 100,
      productCategory: ProductCategory.COOKED_DISHES,
      description: "1 piece",
    },
    {
      name: "Lean portion",
      nameTranslated: "Посна порција",
      price: 230,
      productCategory: ProductCategory.COOKED_DISHES,
      description: "250g",
      ingredients: ["mushrooms", "zucchini", "carrots", "peppers", "olives", "tomato"],
    },
    {
      name: "Broth",
      nameTranslated: "Чорба",
      price: 330,
      productCategory: ProductCategory.COOKED_DISHES,
      description: "",
      ingredients: ["beef", "carrots", "celery", "parsnip", "onion", "accessories"],
    },
    {
      name: "Veal medallions",
      nameTranslated: "Телешки медаљони",
      price: 850,
      productCategory: ProductCategory.COOKED_DISHES,
      description: "250g",
      ingredients: ["beef", "carrots", "celery", "parsnip", "onion", "accessories"],
    },
  ];

  for (const prod of cookedDishesData) {
    const product = await Product.create({
      name: prod.name,
      nameTranslated: prod.nameTranslated,
      price: prod.price,
      productCategory: prod.productCategory,
      description: prod.description,
    });

    if (prod.ingredients && prod.ingredients.length > 0) {
      const ingredientsToAdd = splitIngredients(ingredientsFromDB, prod.ingredients);
      await (product as any).addListOfIngredients(ingredientsToAdd);
    }
  }
}

async function createDesertsAndSnacks() {
  const dessertsAndSnacksData = [
    {
      name: "Pancake",
      nameTranslated: "Палачинка",
      price: 80,
      productCategory: ProductCategory.DESSERTS,
      description: "",
    },
    {
      name: "Ice cream",
      nameTranslated: "Сладолед",
      price: 160,
      productCategory: ProductCategory.DESSERTS,
      description: "",
    },
    {
      name: "Gurabija (muffin)",
      nameTranslated: "Гурабија",
      price: 100,
      productCategory: ProductCategory.DESSERTS,
      description: "",
    },
    {
      name: "Peanuts",
      nameTranslated: "Кикирики",
      price: 100,
      productCategory: ProductCategory.SNACKS,
      description: "100g",
    },
    {
      name: "Almond",
      nameTranslated: "Бадеми",
      price: 150,
      productCategory: ProductCategory.SNACKS,
      description: "80g",
    },
    {
      name: "Pistachio",
      nameTranslated: "Ф'стаци",
      price: 150,
      productCategory: ProductCategory.SNACKS,
      description: "80g",
    },
    {
      name: "Hazelnut",
      nameTranslated: "Лешници",
      price: 150,
      productCategory: ProductCategory.SNACKS,
      description: "80g",
    },
  ];

  for (const prod of dessertsAndSnacksData) {
    await Product.create({
      name: prod.name,
      nameTranslated: prod.nameTranslated,
      price: prod.price,
      productCategory: prod.productCategory,
      description: prod.description,
    });
  }
}

async function createDrinks() {
  const drinks = [
    {
      name: "Brandy traditional tikvesh",
      nameTranslated: "Тиквешка жолта",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Brandy very special traditional tikvesh",
      nameTranslated: "Тиквешка жолта VS",
      price: 100,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Brandy traditional tikvesh white",
      nameTranslated: "Тиквешка бела",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Brandy tikvesh bottle",
      nameTranslated: "Ракија тиквеш шише",
      price: 350,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Brandy Saint Trifun",
      nameTranslated: "Ракија Свети Трифун",
      price: 150,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Brandy Alphabet",
      nameTranslated: "Ракија Азбука",
      price: 100,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Brandy Alphabet bottle",
      nameTranslated: "Ракија Азбука шише",
      price: 500,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Cognac",
      nameTranslated: "Коњак",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Gin",
      nameTranslated: "Џин",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Gordon's gin",
      nameTranslated: "Гордонс џин",
      price: 180,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Bickens gin",
      nameTranslated: "Бикенс џин",
      price: 180,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Beefeater gin",
      nameTranslated: "Бифитер џин",
      price: 100,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Finlandia",
      nameTranslated: "Финландиа",
      price: 180,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Skyy vodka",
      nameTranslated: "Водка Скај",
      price: 120,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Vodka",
      nameTranslated: "Водка",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Smirnoff",
      nameTranslated: "Смирноф",
      price: 120,
      productCategory: ProductCategory.DRINKS,
      description: "0.04ml",
    },
    {
      name: "Ouzo",
      nameTranslated: "Узо",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Ouzo Plumari",
      nameTranslated: "Узо Плумари",
      price: 120,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Ouzo Plumari bottle",
      nameTranslated: "Узо плумари шише",
      price: 550,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Mastika",
      nameTranslated: "Мастика",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Stock",
      nameTranslated: "Шток",
      price: 120,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "The Famous Grouse",
      nameTranslated: "Фејмос Граус виски",
      price: 140,
      productCategory: ProductCategory.DRINKS,
      description: "0.05ml",
    },
    {
      name: "Johnnie Walker",
      nameTranslated: "Џони Вокер",
      price: 180,
      productCategory: ProductCategory.DRINKS,
      description: "0.04ml",
    },
    {
      name: "Jameson",
      nameTranslated: "Џејмесон",
      price: 180,
      productCategory: ProductCategory.DRINKS,
      description: "0.04ml",
    },
    {
      name: "Jim Beam (JB)",
      nameTranslated: "Џим Бим",
      price: 180,
      productCategory: ProductCategory.DRINKS,
      description: "0.04ml",
    },
    {
      name: "Baileys",
      nameTranslated: "Бејлис",
      price: 200,
      productCategory: ProductCategory.DRINKS,
      description: "0.04ml",
    },
    {
      name: "Martini",
      nameTranslated: "Мартини",
      price: 100,
      productCategory: ProductCategory.DRINKS,
      description: "0.04ml",
    },
    {
      name: "Pelinkovac",
      nameTranslated: "Пелинковац",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.04ml",
    },
    {
      name: "Stomaklija",
      nameTranslated: "Стомаклија",
      price: 70,
      productCategory: ProductCategory.DRINKS,
      description: "0.04ml",
    },
    {
      name: "Jager",
      nameTranslated: "Јегер",
      price: 120,
      productCategory: ProductCategory.DRINKS,
      description: "0.04ml",
    },
    {
      name: "Jager Meister",
      nameTranslated: "Јегер Маистер",
      price: 180,
      productCategory: ProductCategory.DRINKS,
      description: "0.04ml",
    },
    {
      name: "Rum",
      nameTranslated: "Рум",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.04ml",
    },
    {
      name: "Smederevka",
      nameTranslated: "Смедеревка",
      price: 360,
      productCategory: ProductCategory.DRINKS,
      description: "1L",
    },
    {
      name: "Kavadarka",
      nameTranslated: "Кавадарка",
      price: 360,
      productCategory: ProductCategory.DRINKS,
      description: "1L",
    },
    {
      name: "Vitac",
      nameTranslated: "Витач",
      price: 360,
      productCategory: ProductCategory.DRINKS,
      description: "1L",
    },
    {
      name: "Vranec",
      nameTranslated: "Вранец",
      price: 360,
      productCategory: ProductCategory.DRINKS,
      description: "1L",
    },
    {
      name: "Rose",
      nameTranslated: "Розе",
      price: 360,
      productCategory: ProductCategory.DRINKS,
      description: "1L",
    },
    {
      name: "A well",
      nameTranslated: "Бунар",
      price: 400,
      productCategory: ProductCategory.DRINKS,
      description: "",
    },
    {
      name: "Glass of wine",
      nameTranslated: "Чаша вино",
      price: 100,
      productCategory: ProductCategory.DRINKS,
      description: "",
    },
    {
      name: "Alexandria white",
      nameTranslated: "Александрија бело големо",
      price: 650,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Alexandria red",
      nameTranslated: "Александрија црвено големо",
      price: 650,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Traminec",
      nameTranslated: "Траминец големо",
      price: 650,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Temjanika",
      nameTranslated: "Темјаника големо",
      price: 650,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "T'ga",
      nameTranslated: "Т'га",
      price: 650,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Rose",
      nameTranslated: "Розе",
      price: 650,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Alexandria white",
      nameTranslated: "Александрија бело",
      price: 200,
      productCategory: ProductCategory.DRINKS,
      description: "0.187L",
    },
    {
      name: "Alexandria red",
      nameTranslated: "Александрија црвено",
      price: 200,
      productCategory: ProductCategory.DRINKS,
      description: "0.187L",
    },
    {
      name: "Traminec",
      nameTranslated: "Траминец",
      price: 200,
      productCategory: ProductCategory.DRINKS,
      description: "0.187L",
    },
    {
      name: "Temjanika",
      nameTranslated: "Темјаника",
      price: 200,
      productCategory: ProductCategory.DRINKS,
      description: "0.187L",
    },
    {
      name: "T'ga",
      nameTranslated: "Т'га",
      price: 200,
      productCategory: ProductCategory.DRINKS,
      description: "0.187L",
    },
    {
      name: "Alexandria Kuve white",
      nameTranslated: "Александија Куве бело",
      price: 1000,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Alexandria Kuve red",
      nameTranslated: "Александрија Куве црвено",
      price: 1000,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Cabernet Sabignon",
      nameTranslated: "Каберне Совињон",
      price: 1000,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Sauvignon Blanc",
      nameTranslated: "Совињон Бланк",
      price: 1000,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "R'katzateli",
      nameTranslated: "Р'кацатели",
      price: 1000,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "White Water wine white",
      nameTranslated: "Бела Вода вино бело",
      price: 3800,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "White Water wine red",
      nameTranslated: "Бела Вода вино црвено",
      price: 3800,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Barovo wine white",
      nameTranslated: "Барово вино бело",
      price: 3800,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Barovo wine red",
      nameTranslated: "Барово вино црвено",
      price: 3800,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Lepovo",
      nameTranslated: "Лепово",
      price: 4000,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Skopsko beer",
      nameTranslated: "Скопско пиво",
      price: 100,
      productCategory: ProductCategory.DRINKS,
      description: "0.5L",
    },
    {
      name: "Skopsko smooth beer",
      nameTranslated: "Скопско смут пиво",
      price: 100,
      productCategory: ProductCategory.DRINKS,
      description: "0.5L",
    },
    {
      name: "Skopsko Radler beer",
      nameTranslated: "Скопско радлер пиво",
      price: 100,
      productCategory: ProductCategory.DRINKS,
      description: "0.5L",
    },
    {
      name: "Lashko beer",
      nameTranslated: "Лашко пиво",
      price: 100,
      productCategory: ProductCategory.DRINKS,
      description: "0.5L",
    },
    {
      name: "Amstel beer",
      nameTranslated: "Амстел пиво",
      price: 120,
      productCategory: ProductCategory.DRINKS,
      description: "0.33L",
    },
    {
      name: "Heineken beer",
      nameTranslated: "Хајнекен пиво",
      price: 150,
      productCategory: ProductCategory.DRINKS,
      description: "0.33L",
    },
    {
      name: "Heineken 0.0 caffe",
      nameTranslated: "Хајнекен 0.0 пиво",
      price: 150,
      productCategory: ProductCategory.DRINKS,
      description: "",
    },
    {
      name: "Macedonian caffe",
      nameTranslated: "Македонско кафе",
      price: 50,
      productCategory: ProductCategory.DRINKS,
      description: "",
    },
    {
      name: "Machiato caffe",
      nameTranslated: "Макијато кафе",
      price: 60,
      productCategory: ProductCategory.DRINKS,
      description: "",
    },
    {
      name: "Nescafe",
      nameTranslated: "Нес кафе",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "",
    },
    {
      name: "Cappuccino",
      nameTranslated: "Капучино",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "",
    },
    {
      name: "Tea",
      nameTranslated: "Чај",
      price: 60,
      productCategory: ProductCategory.DRINKS,
      description: "150g",
    },
    {
      name: "Espresso",
      nameTranslated: "Еспресо",
      price: 50,
      productCategory: ProductCategory.DRINKS,
      description: "150g",
    },
    {
      name: "Coca Cola",
      nameTranslated: "Кока Кола",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.25L",
    },
    {
      name: "Coca Cola zero",
      nameTranslated: "Кока Кола зеро",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.25L",
    },
    {
      name: "Fanta",
      nameTranslated: "Фанта",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.25L",
    },
    {
      name: "Schweppes",
      nameTranslated: "Швепс",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.25L",
    },
    {
      name: "Tonic",
      nameTranslated: "Тоник",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.25L",
    },
    {
      name: "Sprite",
      nameTranslated: "Спрајт",
      price: 80,
      productCategory: ProductCategory.DRINKS,
      description: "0.25L",
    },
    {
      name: "Thick juices",
      nameTranslated: "Густи сок",
      price: 70,
      productCategory: ProductCategory.DRINKS,
      description: "0.2L",
    },
    {
      name: "Pelisterka sparkling small",
      nameTranslated: "Пелистерка газирана мала",
      price: 40,
      productCategory: ProductCategory.DRINKS,
      description: "0.25L",
    },
    {
      name: "Pelisterka still small",
      nameTranslated: "Пелистерна негазирана мала",
      price: 40,
      productCategory: ProductCategory.DRINKS,
      description: "0.25L",
    },
    {
      name: "Pelisterka sparkling big",
      nameTranslated: "Пелистерка газирана голема",
      price: 60,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Pelisterka still big",
      nameTranslated: "Пелистерка негазирана мала",
      price: 60,
      productCategory: ProductCategory.DRINKS,
      description: "0.7L",
    },
    {
      name: "Pelisterka large",
      nameTranslated: "Пелистерка голема",
      price: 60,
      productCategory: ProductCategory.DRINKS,
      description: "1L",
    },
  ];

  for (const prod of drinks) {
    await Product.create({
      name: prod.name,
      nameTranslated: prod.nameTranslated,
      price: prod.price,
      productCategory: prod.productCategory,
      description: prod.description,
    });
  }
}

function splitIngredients(ingredientsFromDB: Ingredient[], names: string[]): Ingredient[] {
  const result: Ingredient[] = [];
  for (const ingredient of ingredientsFromDB) {
    if (names.includes(ingredient.name.toLowerCase())) {
      result.push(ingredient);
    }
  }

  return result;
}
