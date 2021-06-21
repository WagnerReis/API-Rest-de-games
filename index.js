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

app.get("/game/:id", (req, res) => {
  if(isNaN(req.params.id)){
    res.sendStatus(400);
  }else{
    var id = parseInt(req.params.id);
    var game = DB.games.find(g => g.id == id);

    if(game != undefined){
      res.statusCode = 200;
      res.json(game);
    }else{
      res.sendStatus(404);
    }
  }
});

app.post("/game", (req, res) => {
  var { title, price, year } = req.body; 
  DB.games.push({
    id: 2323,
    title,
    price,
    year
  });
});

app.delete("/game/:id", (req, res) => {
  if(isNaN(req.params.id)){
    res.sendStatus(400);
  }else{
    var id = parseInt(req.params.id);
    var index = DB.games.findIndex(g => g.id == id);

    if(index == -1){
      res.sendStatus(404);
    }else{
      DB.games.splice(index,1);
      res.sendStatus(200);
    }
  }
}); 

app.listen(45678, () => {
  console.log("API RODANDO!");
})