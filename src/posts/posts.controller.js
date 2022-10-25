const Posts= require("../models/post.models")
const uuid = require("uuid")
const Users=require("../models/users.models")
const Categories = require("../models/categories.models")

const getAllPosts = async(offset,limit) => {
    //* ahora vamos a usar Joins en findAll
    const data= await Posts.findAll({
        offset,
        limit,
        attributes:{
            exclude:["userId","categoryId","createdAt","updateAt"]
        },
        include:[
            // ? model -> tabla a usar RF   
            {
                model:Users,
                as:"user",
                //* asi es como se llamara en el join
                // include:
                attributes:["password","createdAt","updatedAt"]
            },
            {
                model:Categories,
                as:"category",  
                attributes:{   //! para quitar columnas en el Join
                    exclude:["id"]
                }
                // attributes:["id"] asi solo muestra id    
            }
        ],
        attributes:{
            exclude:["createdAt","updateAt","categoryId"]
        }
    }) 
    return data
} 
// post1.findAll({
//     include[{
//         model:postCategories1,
//         iclude[{
//             model:categories1
//         }]
//     }]
// })

// ? Esto es para relacionar la tabla post1 con categories1
// ?teniendo solo postCatagories1 la llaves forarena de ambas,Esto ayuda a relacionar estas 2 tablas no relacionadas

 const getPostById = async (id) =>{
    const data  = await Posts.findOne({
        where:{
            id
        },
        attributes:{
            exclude:["userId","categoryId","createdAt","updateAt"]
        },
        include:[
            {
                model:Users,
                as:"user",
                attributes:["id","firstName","lastName","email"]
            },
            {
                model:Categories,
                as:"category"
            }
        ]
    })
    return data
}

const createPost = async (data) =>{
    const response = await Posts.create({
        id:uuid.v4(),
        title:data.title,
        content:data.content,
        // createdBy:data.createdBy, //*userID es token
        createdBy:data.userId, //! userId es mas legible
        userId:data.userId
    })
    return response
}
//  aunque se llamara este controller en la ruta category se pone aca porque mostraremos todos los post de esa categoria
// si se usa el controller en post el services tambien va en post
const getPostByCategory = async(categoryId) => {
    const data = await Posts.findAll({
        where:{
            categoryId
        }
    })
    return data
}

module.exports={
    getAllPosts,
    getPostById,
    createPost,
    getPostByCategory
}