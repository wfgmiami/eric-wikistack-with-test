const app = require('express').Router();
const db = require('../db');

module.exports = app;

app.get('/:name', (req, res, next)=> {
  db.models.User.findOne({ 
    where: { name: req.params.name },
    include: [ db.models.Story ]
  })
    .then( user => res.render('user', { user: user } ))
    .catch( e => next(e));
});
