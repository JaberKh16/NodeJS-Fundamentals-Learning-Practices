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

| Association       | Method Used          | Foreign Key Added In     |
|-------------------|----------------------|---------------------------|
| HasOne            | `A.hasOne(B)`        | B table                   |
| BelongsTo         | `B.belongsTo(A)`     | B table                   |
| HasMany           | `A.hasMany(B)`       | B table                   |
| BelongsToMany     | `A.belongsToMany(B)` | Junction Table            |

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

Would you like me to show you a **complete working example** with your `Product` and `Category` models including:

- Model definitions
- Associations
- How to use in controllers

Just say yes and I’ll give you the full setup.
