const Users = require('./users.models')
const Posts = require('./post.models')
const Categories = require('./categories.models')

const initModels = () => {
    // * relacion 1 a muchos
    // * post le pertenece a User
    // * post FK users PK
    // !tenemos que hacer tanto belongsTo
    // !como hasMAny
    Posts.belongsTo(Users)
    Users.hasMany(Posts)

    Posts.belongsTo(Categories)
    Categories.hasMany(Posts)
}

         
module.exports = initModels

