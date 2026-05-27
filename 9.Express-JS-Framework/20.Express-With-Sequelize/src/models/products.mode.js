const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");
const CategoryModel = require('./category.model')

const ProductModel = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      defaultValue: '',
      allowNull: false,

    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2)
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Price is required'
        },
        notNull: {
          msg: 'Price is required'
        },
        isDecimal: {
          msg: 'Price must be a valid decimal number'
        },
        min: {
          args: [0],
          msg: 'Price can not be negative'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Quantity can not be null'
        },
        min: {
          args: [0],
          msg: 'Quantity can not be negative'
        },
        isInt: {
          msg: 'Quantity must be a valid integer'
        }
      }
    },
    currency: {
      type: DataTypes.STRING(3),
      defaultValue: 'USD',
      allowNull: false,
      validate: {
        isIn: {
          args: [['USD', ['BRL', 'INR', 'BDT']]],
          msg: 'Currency must be in USD, BRL, INR or BDT'
        },
        notNull: {
          msg: 'Currency can not be null'
        }
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Active can not be null'
        },
        isBoolean: {
          msg: 'Active must be a valid boolean value'
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CategoryModel,
        key: 'id'
      },
      validate: {
        notEmpty: {
          msg: 'Category ID is required'
        },
        notNull: {
          msg: 'Category ID is required'
        },
      }
    }
  },
  {
    tableName: "products",
    timestamps: true,
    underscored: true,
  },
);

module.exports = ProductModel;
