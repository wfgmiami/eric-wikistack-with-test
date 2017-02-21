const db = require('./db');
const express = require('express');
const swig = require('swig');
swig.setDefaults({ cache: false });

const app = express();

module.exports = app;

app.use(require('body-parser').urlencoded({ extended: false }));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.get('/', (req, res, next)=> {
  db.models.Story.findAll({
    include: [ db.models.User ]
  })
    .then( stories => res.render('index', { stories }))
    .catch( e => next(e));
});


app.use('/stories', require('./routes/stories'));
app.use('/users', require('./routes/users'));


app.use(( err, req, res, next)=> {
  res.send(err);
});

