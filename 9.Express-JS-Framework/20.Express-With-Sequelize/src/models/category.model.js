const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const CategoryModel = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: {
      msg: 'category name already exists.'
    },
    validate: {
      notEmpty: {
        msg: 'Name is required'
      },
      notNull: {
        msg: 'Name is required'
      }
    }

  }
}, {
  tableName: 'categories',
  timestamps: true,
  createdAt: 'created_at',
  updateddAt: 'updated_at',
  underscored: true // to ensure all field having two word have _
});

module.exports = CategoryModel;
