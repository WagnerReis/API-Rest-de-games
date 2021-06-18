const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var DB = {
  games: [
    {
      id: 23,
      title: "Call of duty MW",
      year: 2019,
      price: 60
    },
    {
      id: 65,
      title: "GTA V",
      year: 2013,
      price: 40
    },
    {
      id: 2,
      title: "Warface",
      year: 2013,
      price: 10
    }
  ]
}

app.get("/games", (req, res) => {
  res.statusCode = 200;
  res.json(DB.games);
});





app.listen(45678, () => {
  console.log("API RODANDO!");
})