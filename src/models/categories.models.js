const db =require("../utils/database")

const {DataTypes}=require("sequelize")

const Categories=db.define("categories",{
// serial en sequelize no existe usaremos autoincre
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
        
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    // !para configraciones
    timestamps:false 
    // este es por defecto true y agrega la colunmas de createAt y updateAt si fuera true
})

module.exports=Categories   