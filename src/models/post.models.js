const db=require("../utils/database")
const {DataTypes}=require("sequelize")
const Users=require("./users.models")
const Categories = require("./categories.models")

//! String != TEXT ,=> TEXT no tiene limite de
// ! caracteres
const Post =db.define("post",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    createdBy:{
        type:DataTypes.UUID,
        allowNull:false,
        field:"create_by",
        // ?para llave foranea de Users
        references:{
            key:"id",  //nombre de la columna
            model:Users //Nombre tabla pricipal  
        }
    },
    // ?aunque type en category es serial aca es int
    categoryId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:"category_id",
        reference:{
            key:"id",
            model:Categories
        }
    }
    

})

module.exports=Post