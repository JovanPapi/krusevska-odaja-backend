import { DataTypes } from "sequelize";
import { PaymentMethod } from "../enum/PaymentMethod";
import { ProductCategory } from "../enum/ProductCategory";
import { ServingTableStatus } from "../enum/ServingTableStatus";
import { sequelize } from "../utils/db";
import { Admin } from "./Admin";
import { Ingredient } from "./Ingredient";
import { KitchenOrder } from "./KitchenOrder";
import { Order } from "./Order";
import { OrderProduct } from "./OrderProduct";
import { Payment } from "./Payment";
import { Product } from "./Product";
import { ServingTable } from "./ServingTable";
import { Waiter } from "./Waiter";

export function initializeModels() {
  Admin.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(50),
        field: "first_name",
        defaultValue: "",
      },
      lastName: {
        type: DataTypes.STRING(50),
        field: "last_name",
        defaultValue: "",
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        defaultValue: "",
      },
      password: {
        type: DataTypes.STRING(50),
        defaultValue: "",
      },
    },
    { sequelize, tableName: "admins", timestamps: false }
  );

  Ingredient.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        defaultValue: "",
      },
      nameTranslated: {
        type: DataTypes.STRING(50),
        field: "name_translated",
        defaultValue: "",
      },
    },
    {
      sequelize,
      tableName: "ingredients",
      timestamps: false,
    }
  );

  KitchenOrder.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      order_uuid: { type: DataTypes.UUID },
      waiter_uuid: { type: DataTypes.UUID },
      servingTable_uuid: {
        type: DataTypes.UUID,
      },
    },
    { sequelize, tableName: "kitchen_orders", timestamps: false }
  );

  Order.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        field: "total_price",
        defaultValue: 0,
      },
      creationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "creation_date",
      },
      waiter_uuid: {
        type: DataTypes.UUID,
      },
      servingTable_uuid: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      tableName: "orders",
      timestamps: false,
    }
  );

  OrderProduct.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      product_uuid: {
        type: DataTypes.UUID,
      },
      kitchenOrder_uuid: {
        type: DataTypes.UUID,
      },
      order_uuid: {
        type: DataTypes.UUID,
      },
    },
    { sequelize, tableName: "order_products", timestamps: false }
  );

  Payment.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      paymentDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "payment_date",
      },
      paymentMethod: {
        type: DataTypes.ENUM(...Object.values(PaymentMethod)),
        field: "payment_method",
        defaultValue: PaymentMethod.CASH,
      },
      amountPaid: {
        type: DataTypes.INTEGER,
        field: "amount_paid",
      },
      servingTable_uuid: {
        type: DataTypes.UUID,
      },
      waiter_uuid: {
        type: DataTypes.UUID,
      },
    },
    { sequelize, tableName: "payments", timestamps: false }
  );

  Product.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
      },
      nameTranslated: {
        type: DataTypes.STRING(50),
        field: "name_translated",
      },
      price: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING(50),
      },
      productCategory: {
        type: DataTypes.ENUM(...Object.values(ProductCategory)),
        field: "product_category",
      },
    },
    {
      sequelize,
      tableName: "products",
      timestamps: false,
    }
  );

  ServingTable.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.INTEGER,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        field: "total_price",
      },
      amountPaid: {
        type: DataTypes.INTEGER,
        field: "amount_paid",
      },
      remainingBalance: {
        type: DataTypes.INTEGER,
        field: "remaining_balance",
      },
      servingTableStatus: {
        type: DataTypes.ENUM(...Object.values(ServingTableStatus)),
        field: "serving_table_status",
      },
      waiter_uuid: {
        type: DataTypes.UUID,
      },
    },
    { sequelize, tableName: "serving_tables", timestamps: false }
  );

  Waiter.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.INTEGER,

        unique: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING(50),
        field: "last_name",
      },
    },
    { sequelize, tableName: "waiters", timestamps: false }
  );
}

export function defineAssociations() {
  // Define many-to-many association between Product and Ingredient
  Product.belongsToMany(Ingredient, {
    through: "product_ingredient",
    as: "listOfIngredients",
    foreignKey: "product_uuid",
    otherKey: "ingredient_uuid",
    timestamps: false,
  });
  Ingredient.belongsToMany(Product, {
    through: "product_ingredient",
    as: "listOfProducts",
    foreignKey: "ingredient_uuid",
    otherKey: "product_uuid",
  });

  // Define one-to-many association between Product and OrderProduct
  Product.hasMany(OrderProduct, {
    sourceKey: "uuid",
    foreignKey: "product_uuid",
    as: "listOfOrderProducts",
    onDelete: "CASCADE",
  });
  OrderProduct.belongsTo(Product, {
    targetKey: "uuid",
    foreignKey: "product_uuid",
    as: "product",
  });

  // Define one-to-many association between KitchenOrder and OrderProduct
  KitchenOrder.hasMany(OrderProduct, {
    sourceKey: "uuid",
    foreignKey: "kitchenOrder_uuid",
    as: "listOfOrderProducts",
    onDelete: "CASCADE",
  });
  OrderProduct.belongsTo(KitchenOrder, {
    targetKey: "uuid",
    foreignKey: "kitchenOrder_uuid",
    as: "kitchenOrder",
  });

  // Define one-to-many association between Order and OrderProduct
  Order.hasMany(OrderProduct, {
    sourceKey: "uuid", // поле во Order кое ќе се користи за join
    foreignKey: "order_uuid", // поле во OrderProduct кое ќе чува референца
    as: "listOfOrderProducts",
    onDelete: "CASCADE",
  });
  OrderProduct.belongsTo(Order, {
    targetKey: "uuid", // поле во Order кое ќе се користи за join
    foreignKey: "order_uuid", // поле во OrderProduct кое ја чува референцата
    as: "order",
  });

  // Define one-to-many association between ServingTable and Order
  ServingTable.hasMany(Order, {
    sourceKey: "uuid",
    foreignKey: "servingTable_uuid",
    as: "listOfOrders",
    onDelete: "CASCADE",
  });
  Order.belongsTo(ServingTable, {
    targetKey: "uuid",
    foreignKey: "servingTable_uuid",
    as: "servingTable",
  });

  // Define one-to-many association between Waiter and Order
  Waiter.hasMany(Order, {
    sourceKey: "uuid",
    foreignKey: "waiter_uuid",
    as: "listOfOrders",
    onDelete: "CASCADE",
  });
  Order.belongsTo(Waiter, {
    targetKey: "uuid",
    foreignKey: "waiter_uuid",
    as: "waiter",
  });

  // Define one-to-many association between Waiter and ServingTable
  Waiter.hasMany(ServingTable, {
    sourceKey: "uuid",
    foreignKey: "waiter_uuid",
    as: "listOfServingTables",
    onDelete: "CASCADE",
  });
  ServingTable.belongsTo(Waiter, {
    targetKey: "uuid",
    foreignKey: "waiter_uuid",
    as: "waiter",
  });

  // Define one-to-many association between Waiter and Payment
  Waiter.hasMany(Payment, {
    sourceKey: "uuid",
    foreignKey: "waiter_uuid",
    as: "listOfPayments",
    onDelete: "SET NULL",
  });
  Payment.belongsTo(Waiter, {
    targetKey: "uuid",
    foreignKey: "waiter_uuid",
    as: "waiter",
  });

  // Define one-to-many association between ServingTable and Payment
  ServingTable.hasMany(Payment, {
    sourceKey: "uuid",
    foreignKey: "servingTable_uuid",
    as: "listOfPayments",
    onDelete: "CASCADE",
  });
  Payment.belongsTo(ServingTable, {
    targetKey: "uuid",
    foreignKey: "servingTable_uuid",
    as: "servingTable",
  });

  // Define one to many assocication between Waiter and KitchenOrder
  Waiter.hasMany(KitchenOrder, {
    sourceKey: "uuid",
    foreignKey: "waiter_uud",
    as: "listOfKitchenOrders",
    onDelete: "SET NULL",
  });
  KitchenOrder.belongsTo(Waiter, {
    targetKey: "uuid",
    foreignKey: "waiter_uuid",
    as: "waiter",
  });

  // Define one to many association between ServingTable and Kitchenorder
  ServingTable.hasMany(KitchenOrder, {
    sourceKey: "uuid",
    foreignKey: "servingTable_uuid",
    as: "listOfKitchenOrders",
    onDelete: "SET NULL",
  });
  KitchenOrder.belongsTo(ServingTable, {
    targetKey: "uuid",
    foreignKey: "servingTable_uuid",
    as: "servingTable",
  });

  // Define one to many association between Order and Kitchenorder
  Order.hasMany(KitchenOrder, {
    sourceKey: "uuid",
    foreignKey: "order_uuid",
    as: "listOfKitchenOrders",
    onDelete: "SET NULL",
  });
  KitchenOrder.belongsTo(Order, {
    targetKey: "uuid",
    foreignKey: "order_uuid",
    as: "order",
  });
}
