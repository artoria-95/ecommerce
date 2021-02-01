const server = require("express").Router();
const { User } = require("../db.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { isUser, isAdmin } = require('../middlewares/auth');
const { DB_SECRET } = process.env;
const secretGoogle = process.env.GOOGLE_CLIENT_SECRET;
const secretFacebook = process.env.FACEBOOK_CLIENT_SECRET;
const secretInstagram = process.env.INSTAGRAM_CLIENT_SECRET;

server.get("/me", isUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const result = await User.findByPk(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
});

// User log in route

server.post("/login", function (req, res, next) {
  //utilizamos el metodo de passport autenthicate
  //que recibe como primer argumento el tipo de estrategia a utilizar
  // como segundo argumento recibe una funcion autoejecutable la cual recibe: un err, user y un info
  passport.authenticate("local", function (err, user, info) {
    //si hay un error nos pasamos al siguiente midleware
    if (err) return next(err);
    //si no hay error nos fijamos si el usuario es nulo
    //si no esta bien autenticado arrojamos un 401(usuario no autorizado)
    //tambien podemos enviar un mensaje(optativo)
    else if (!user) {
      res.status(401).send(info);

    }
    //si todo esta correcto la respuesta va a ser un body(JWT)
    //vamos a firmar un token enviando el usuario y un secreto
    else return res.send({ token: jwt.sign(user, DB_SECRET), user });
  })(req, res, next);
});

// User log out route

server.get("/logout", function (req, res) {

  req.logOut();
  res.send('User logged out');
});

//------Promote turns user with ID: id to Admin.
server.put('/promote/:id', /* isAdmin, */ async function (req, res, next) {
  const { id } = req.params;
  try {
    const result = await User.findByPk(id);
    if (result) {
      result.update({
        isAdmin: true
      }); res.send('User role changed to Admin');
    }
  } catch (error) {
    next(error);
  }
});

//------DEGRADE ADMIN TO REGULAR USER

server.put('/degrade/:id',/*  isAdmin, */ async function (req, res, next) {
  const { id } = req.params;
  try {
    const result = await User.findByPk(id);
    if (result) {
      result.update({
        isAdmin: false
      }); res.send('User role is no longer admin');
    }
  } catch (error) {
    next(error);
  }
});

//-------------- Ban User
server.put('/:id/ban',/*  isAdmin, */ async (req, res, next) => {
  const { id } = req.params;
  try {
    const ban = await User.findByPk(id);
    ban.update({
      isBanned: true,
    }); res.send('User Banned');
  } catch (error) {
    next(error);
  }
});

server.get('/login/google',
  (passport.authenticate("google", {
    scope: ["profile", "email"],
  })
  ));

server.get("/login/google/callback", (req, res, next) => {
  passport.authorize('google', function (err, user) {
    if (err) return next(err);
    if (!user) {
      // Si no hay usuario redirecciona a la esa url
      res.redirect('http://localhost:5000/sign-in?error=401');
    } else {
      // en cambio si todo esta correcto la respuesta va a ser un body(JWT)
      // vamos a firmar un token con el id del usurio y el secreto y redirecciona
      const token = jwt.sign({ uid: user.id }, secretGoogle);
      res.redirect(`http://localhost:5000/sign-in?token=${token}`);
      console.log(token);
    }
  })(req, res, next);
});

server.get('/login/facebook', (passport.authenticate("facebook")));
server.get('/login/facebook/callback', function (req, res, next) {
  passport.authorize('facebook', function (err, user) {
    if (err) return next(err);
    if (!user) {
      res.redirect('http://localhost:5000/sign-in?error=401');
    } else {
      const token = jwt.sign({ uid: user.id }, secretFacebook);
      res.redirect(`http://localhost:5000/sign-in?token=${token}`);
    }
  })(req, res, next);
});

server.get('/login/instagram', (passport.authenticate('instagram')));
server.get('/login/instagram/callback', function (req, res, next) {
  passport.authorize('instagram', function (err, user) {
    if (err) return next(err);
    if (!user) {
      res.redirect('http://localhost:5000/sign-in?error=401');
    } else {
      const token = jwt.sign({ uid: user.id }, secretInstagram);
      res.redirect(`http://localhost:5000/sign-in?token=${token}`);
    }
  })(req, res, next);
});

module.exports = server;
