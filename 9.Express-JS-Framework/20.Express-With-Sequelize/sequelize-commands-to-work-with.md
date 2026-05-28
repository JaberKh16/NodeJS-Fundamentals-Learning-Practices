**✅ All Necessary Sequelize CLI Commands** (Updated for 2025)

### 1. **Installation**

```bash
# Install Sequelize CLI globally (recommended)
npm install -g sequelize-cli

# Or install locally in your project
npm install sequelize sequelize-cli
```

---

### 2. **Basic Setup Commands**

```bash
# Initialize Sequelize in your project (creates folders and config)
npx sequelize-cli init

# Or if installed globally
sequelize init
```

This creates:
- `config/config.json`
- `migrations/`
- `models/`
- `seeders/`

---

### 3. **Model Commands**

```bash
# Create a new model
npx sequelize-cli model:generate --name User --attributes name:string,email:string,age:integer

# Create model without migration
npx sequelize-cli model:generate --name Product --attributes name:string,price:decimal --no-migration
```

---

### 4. **Migration Commands**

```bash
# Create a new migration file
npx sequelize-cli migration:generate --name add-column-to-users

# Run all pending migrations
npx sequelize-cli db:migrate

# Run specific migration
npx sequelize-cli db:migrate --name 20250528123456-create-products.js

# Undo last migration
npx sequelize-cli db:migrate:undo

# Undo all migrations
npx sequelize-cli db:migrate:undo:all

# Re-run all migrations (drop and recreate)
npx sequelize-cli db:migrate:undo:all && npx sequelize-cli db:migrate
```

---

### 5. **Seeding Commands**

```bash
# Create a seeder
npx sequelize-cli seed:generate --name demo-users

# Run all seeders
npx sequelize-cli db:seed:all

# Run specific seeder
npx sequelize-cli db:seed --seed 20250528123456-demo-users.js

# Undo last seeder
npx sequelize-cli db:seed:undo

# Undo all seeders
npx sequelize-cli db:seed:undo:all
```

---

### 6. **Database Commands**

```bash
# Create database
npx sequelize-cli db:create

# Drop database
npx sequelize-cli db:drop

# Reset database (drop + create + migrate)
npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate
```

---

### 7. **Useful Commands**

```bash
# Check current status of migrations
npx sequelize-cli db:migrate:status

# Generate migration from existing model
npx sequelize-cli migration:generate --name update-users-table

# View help for any command
npx sequelize-cli --help
npx sequelize-cli db:migrate --help
```

---

### 8. **Common Workflow (Recommended)**

```bash
# 1. Create model + migration
npx sequelize-cli model:generate --name Category --attributes name:string

# 2. Run migration
npx sequelize-cli db:migrate

# 3. Create seeder (optional)
npx sequelize-cli seed:generate --name demo-categories

# 4. Run seeder
npx sequelize-cli db:seed:all
```

---

Would you like me to also give you the best **config.json** setup for development (with environment variables) and common practices?`
