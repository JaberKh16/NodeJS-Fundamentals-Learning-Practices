**✅ Complete Guide: Sequelize Model Associations**

Sequelize supports **four main types** of associations between models:

---

### 1. **One-to-One** Association

**Use Case**: One user has one profile.

```javascript
// User Model
const User = sequelize.define('User', { name: DataTypes.STRING });

// Profile Model
const Profile = sequelize.define('Profile', { bio: DataTypes.TEXT });

// Association
User.hasOne(Profile);           // UserId will be added to Profile
Profile.belongsTo(User);        // Profile belongs to User
```

**With custom foreign key and alias:**

```javascript
User.hasOne(Profile, {
    foreignKey: 'user_id',
    as: 'profile'
});

Profile.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});
```

---

### 2. **One-to-Many** Association (Most Common)

**Use Case**: One Category has many Products.

```javascript
// Category Model
const Category = sequelize.define('Category', {
    name: DataTypes.STRING
});

// Product Model
const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL
});

// === Define Associations ===
Category.hasMany(Product, {
    foreignKey: 'categoryId',
    as: 'products'           // alias (important!)
});

Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});
```

---

### 3. **Many-to-Many** Association

**Use Case**: One Product can belong to many Tags, and one Tag can have many Products.

```javascript
const Product = sequelize.define('Product', {...});
const Tag = sequelize.define('Tag', {...});

// Many-to-Many
Product.belongsToMany(Tag, {
    through: 'ProductTags',     // Junction table name
    foreignKey: 'productId',
    otherKey: 'tagId',
    as: 'tags'
});

Tag.belongsToMany(Product, {
    through: 'ProductTags',
    foreignKey: 'tagId',
    otherKey: 'productId',
    as: 'products'
});
```

---

### 4. **How to Use Associations in Queries**

```javascript
// Get all products with their category
const products = await Product.findAll({
    include: [
        {
            model: Category,
            as: 'category',
            attributes: ['id', 'name']
        }
    ]
});

// Get one category with all its products
const category = await Category.findByPk(1, {
    include: [{
        model: Product,
        as: 'products'
    }]
});
```

---

### Important Points

| Association   | Method Used            | Foreign Key Added In |
| ------------- | ---------------------- | -------------------- |
| HasOne        | `A.hasOne(B)`        | B table              |
| BelongsTo     | `B.belongsTo(A)`     | B table              |
| HasMany       | `A.hasMany(B)`       | B table              |
| BelongsToMany | `A.belongsToMany(B)` | Junction Table       |

---

### Best Practices

1. **Always define both sides** of the relationship.
2. **Use `as:` alias** – it makes queries cleaner and avoids conflicts.
3. Put associations in a separate file (recommended):

```javascript
// associations.js
const associateModels = (models) => {
    const { Category, Product } = models;

    Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
    Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
};

module.exports = associateModels;
```

Then call it after importing all models:

```javascript
const models = require('./models');
associateModels(models);
```

---

a **complete working example** with your `Product` and `Category` models including:

- Model definitions
- Associations
- How to use in controllers


**✅ Complete Working Example: Product & Category Models with Associations**

Here’s a clean, professional setup for your **Product** and **Category** models with proper associations.

---

### 1. **Category Model** (`models/category.model.js`)

```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'categories',
    timestamps: true
});

module.exports = Category;
```

---

### 2. **Product Model** (`models/products.model.js`)

```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        }
    }
}, {
    tableName: 'products',
    timestamps: true
});

module.exports = Product;
```

---

### 3. **Associations** (`models/index.js` or `associations.js`)

**Recommended:** Create a new file `models/associations.js`

```javascript
// models/associations.js
const associateModels = (models) => {
    const { Category, Product } = models;

    // One-to-Many: Category has many Products
    Category.hasMany(Product, {
        foreignKey: 'categoryId',
        as: 'products',           // Important alias
        onDelete: 'SET NULL',     // Optional: what happens when category is deleted
        onUpdate: 'CASCADE'
    });

    // Many-to-One: Product belongs to Category
    Product.belongsTo(Category, {
        foreignKey: 'categoryId',
        as: 'category'            // Important alias
    });
};

module.exports = associateModels;
```

---

### 4. **Load Models & Associations** (`models/index.js`)

```javascript
// models/index.js
const sequelize = require('../config/database');
const Category = require('./category.model');
const Product = require('./products.model');

const models = {
    Category,
    Product
};

// Apply associations
const associateModels = require('./associations');
associateModels(models);

module.exports = models;
```

---

### 5. **Updated Controller** (`controllers/product.controller.js`)

```javascript
const { Product, Category } = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        return res.status(201).json({ data: newProduct });
    } catch (error) {
        console.error(error);

        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: 'Validation Error',
                details: {
                    field: error.errors[0].path,
                    message: error.errors[0].message
                }
            });
        }

        if (error instanceof UniqueConstraintError) {
            return res.status(409).json({
                error: 'Duplicate Entry',
                details: error.errors.map(e => ({
                    field: e.path,
                    message: e.message
                }))
            });
        }

        return res.status(500).json({ message: 'Something went wrong' });
    }
};

const listProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            }],
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: products.length ? 'Data found' : 'No products found',
            data: products
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            }]
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ data: product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = await product.update(req.body);
        return res.status(200).json({ data: updatedProduct });
    } catch (error) {
        console.error(error);
        // ... same error handling as createProduct
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    createProduct,
    listProducts,
    getProduct,
    updateProduct,
    deleteProduct
};
```

---

Seen the setup here:

- The `config/database.js` file?
- Migration commands for these models?


**✅ Here’s what you requested:**

### 1. **Database Configuration** (`config/database.js`)

```javascript
// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();   // Make sure to install dotenv: npm install dotenv

const sequelize = new Sequelize(
    process.env.DB_NAME,      // Database name
    process.env.DB_USER,      // Database username
    process.env.DB_PASSWORD,  // Database password
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',         // Change to 'postgres' if using PostgreSQL
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = sequelize;
```

---

### 2. **Environment Variables** (`.env` file)

Create a `.env` file in your project root:

```env
DB_NAME=your_database_name
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
NODE_ENV=development
```

---

### 3. **Migration Commands for Product & Category**

#### Step-by-step Migration Process:

```bash
# 1. Create Migration for Category
npx sequelize-cli migration:generate --name create-categories

# 2. Create Migration for Product
npx sequelize-cli migration:generate --name create-products
```

---

### 4. **Migration Files Content**

**A. `migrations/xxxx-create-categories.js`**

```javascript
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('categories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('categories');
    }
};
```

**B. `migrations/xxxx-create-products.js`**

```javascript
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            stock: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'categories',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('products');
    }
};
```

---

### 5. **Run Migrations**

```bash
# Create database (if not exists)
npx sequelize-cli db:create

# Run all migrations
npx sequelize-cli db:migrate

# If you make changes and want to reset
npx sequelize-cli db:migrate:undo:all && npx sequelize-cli db:migrate
```

---

Would you like me to also provide:

- Route setup (`routes/product.routes.js`)
- How to import models correctly in `app.js`
- Validation using Joi or express-validator?
