const express = require("express");
const app = express();
const Game = require("./Game");
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/games", (req, res) => {
  res.statusCode = 200;
  Game.findAll().then(games => {
    res.json(games);
  });
});

app.get("/game/:id", (req, res) => {
  if(isNaN(req.params.id)){
    res.sendStatus(400);
  }else{
    var id = parseInt(req.params.id);
    Game.findByPk(id).then(game => {
      if(game != undefined) {
            res.statusCode = 200;
            res.json(game);
      }else{
        res.sendStatus(404);
      }
    }).catch(err => {
      res.sendStatus(404);
    });
  }
});

app.post("/game", (req, res) => {
  var { title, price, year } = req.body; 

  Game.create({
    title,
    price,
    year
  }).then(() => {
    res.sendStatus(200);
  }).catch(() => {
    res.sendStatus(404);
  });
});

app.delete("/game/:id", (req, res) => {
  if(isNaN(req.params.id)){
    res.sendStatus(400);
  }else{
    var id = parseInt(req.params.id);
    Game.findByPk(id).then(game => {
      if(game != undefined) {
        Game.destroy({
          where: { id: id }
        }).then(() => {
          res.sendStatus(200);
        });
      }else{
        res.sendStatus(404);
      }
    }).catch(err => {
      res.sendStatus(404);
    });
  }
}); 

app.put("/game/:id", (req, res) => {
  if(isNaN(req.params.id)){
    res.sendStatus(400);
  }else{
    var id = parseInt(req.params.id);
    Game.findByPk(id).then(game => {
      if(game != undefined) {
        var { title, price, year } = req.body;  
          
          Game.update({ title: title, price: price, year: year }, {
            where: { id: id }
          }).then(() => {
            res.sendStatus(200);
          }).catch(err => {
            res.sendStatus(404);
          } );
      }else{
        res.sendStatus(404);
      }
    }).catch(err => {
      res.sendStatus(404);
    });
  }
});

app.listen(45678, () => {
  console.log("API RODANDO!");
});