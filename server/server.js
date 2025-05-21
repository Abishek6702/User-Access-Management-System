const { AppDataSource } = require("./data-source");
const app = require("./app");
const PORT = process.env.PORT
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to PostgreSQL DB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
