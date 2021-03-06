import Sequelize from "sequelize";

// const sequelize = new Sequelize(
//   "postgres://bryant@localhost:5432/graphql_postgres"
// );

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE_URL,
    {
      dialect: "postgres"
    }
  );
} else {
  sequelize = new Sequelize(process.env.DATABASE, {
    dialect: "postgres"
  });
}

const models = {
  User: sequelize.import("./user"),
  Workorder: sequelize.import("./workorder")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
