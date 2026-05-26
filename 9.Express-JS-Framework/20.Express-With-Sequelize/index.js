const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./configs/database");
const categoryRouter = require("./src/routes/category.route");

// setup dotenv
dotenv.config({ path: process.cwd() + "/.env" });
// dotenv.config({ path: process.cwd() + "/.env", quiet:true }); // to run dotenve sliently with no logs

const app = express();

// setup app configuration
app.use(express.json());
app.use(cors());
// app.use(express.urlencode({ }));
app.use(categoryRouter);

sequelize.sync().then(() => {
  console.log(`Database connected and synchronized.`);
}); // sync all depend on models definition

app.listen(process.env.APP_PORT || 4000, () => {
  console.log(`server running at http://localhost:${process.env.APP_PORT}`);
});
