const db = require('./db');

const User = db.define('user', {
  name: {
    type: db.Sequelize.STRING,
    unique: true
  }
},{
  classMethods:{
    deleteWithStories: function(name){
      return this.findOne({ where: {name: name}})
        .then( user => db.models.story.destroy({ where: { userId: user.id }}))
        .then(() => db.models.user.destroy({ where: { name: name } }))
    },
  },
  hooks: {
    beforeDestroy: function(user){
      return db.models.story.destroy({ where: {userId: user.id }})
    }
  }
});


module.exports = User;
