const express = require("express");
const app = express();
const Game = require("./Game");
const User = require("./User");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecret = "kdfkjsadjkjksdabbjksadbjkdabkmnk";

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function auth(req, res, next){
  const authToken = req.headers['authorization'];

  if(authToken != undefined){
    const bearer = authToken.split(' ');
    var token = bearer[1];

    jwt.verify(token, JWTSecret, (err, data) => {
      if(err){
        res.status(401);
        res.json({err: "Token inválido!"});
      }else{
        req.token = token;
        req.loggedUser = {id: data.id, email: data.email};
        next();
      }
    })
  }else{
    res.status(401);
    res.json({err:"Token inválido!"});
  }
}

app.get("/games", auth, (req, res) => {
  res.statusCode = 200;
  Game.findAll().then(games => {
    res.json(games);
  });
});

app.get("/game/:id", auth, (req, res) => {
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

app.post("/game", auth, (req, res) => {
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

app.delete("/game/:id", auth, (req, res) => {
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

app.put("/game/:id", auth, (req, res) => {
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

app.get("/users", auth, (req, res) => {
  User.findAll().then( users => {
    res.json(users);
  });
});

app.post("/users/create", auth, (req, res) => {
  var { name, email, password } = req.body;

  User.findOne({where:{email: email}}).then( user => {
    if(user == undefined){
      User.create({
        name: name,
        email: email,
        password: password
      }).then(() => {
        res.sendStatus(200);
      }).catch(() => {
        res.sendStatus(400);
      });
    }else{
      res.sendStatus(404);
    }
  });
});

app.post("/auth", auth, (req, res) => {
  var { email, password } = req.body;

  if(email != undefined){
    User.findOne({ where: {
      email: email
    }}).then(user=>{
      if(user != undefined){
        if(user.password == password){

          jwt.sign({id: user.id, email: user.email},JWTSecret,{expiresIn:'48h'},(err, token) => {
            if(err){
              res.status(400);
              res.json({err: "Falha interna"});
            }else{
              res.status(200);
              res.json({token: token});
            }
          });
        }else{
          res.status(401);
          res.json({ err: "Credenciais inválidas!"});
        }
      }else{
        res.status(404);
        res.json({ err: "O E-mail enviado não existe na base de dados!"});
      }
  });
  }else{
    res.status(400);
    res.json({ err: "O E-mail enviado é inválido"});
  }
});

app.listen(45678, () => {
  console.log("API RODANDO!");
});