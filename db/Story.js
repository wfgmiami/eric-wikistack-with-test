const db = require('./db');

const Story = db.define('story', {
  title: db.Sequelize.STRING,
  content: db.Sequelize.TEXT,
  tags: {
    type: db.Sequelize.ARRAY(db.Sequelize.STRING),
    defaultValue: []
  }
}, {
  getterMethods: {
    summary: function(){
      return this.content.slice(0, 4).toString() + '...';
    }
  },
  classMethods: {
    createWithUser: function(attr){
      return db.models.user.findOne({where: { name: attr.name }})
      .then( user => {
        if(user) return user;
        return db.models.user.create({ name: attr.name })
      })
      .then( user=> {
        return db.models.story.create({title: attr.title, content: attr.content, userId: user.id, tags: attr.tags })
      })
    }
  }
}

);

module.exports = Story;
