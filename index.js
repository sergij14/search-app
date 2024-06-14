const express = require("express");
const SearchService = require("./src/SearchService");

const data = require("./data.json");

const app = express();
const port = 3000;

const searchService = new SearchService(data, {
  fields: ["title", "text"],
});

app.use(express.static("public"));

app.get("/search", (req, res) => {
  const { query } = req;
  res.send({ data: searchService.search(query.term) });
});

app.get("/data", (req, res) => {
  res.send({ data });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
