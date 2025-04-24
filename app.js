const express = require("express");
const { PORT } = require("./config/server.config");

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.status(200);
});

app.listen(PORT, () => console.log(`Server is running on port ${3000}`));
