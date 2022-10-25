const postController =require("./posts.controller")
const {host}=require("../config")

const getAllPosts = (req,res)=>{

    //*paginacion
    // !offset y limit
    //?localhost:9000/api/vi/posts?

    //? localhost:9000/api/v1/posts?offset=0&limit=20
    const offset=req.query.offset || 0
    const limit=req.query.limit|| 0
    


    postController.getAllPosts(offset,limit)
    .then(data=>{
        res.status(200).json({
            offset,
            limit,
            result:data
        })
    })
    .catch(err=>{
        res.status(400).json({message:err.message})
    })
}

const createPost = (req,res) =>{
    //?Este el id del usuario loggeado
    const userId=req.user.id
    const { title,content,categoyId} =req.body
    if(title &&content && categoyId){
        postController.createPost({title,content,userId,categoyId})
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err=>{
            res.status(400).json(err.message)
        })
    }
    else{
        res.status(400).json({
            message:"Missing DATA",
            field:{
                tilte:"string",
                content:"string",
                categoyId:"uuid"
            }
        })
    }
}

const getPostsByCategory = (req,res) => {
    const categoryId= req.params.id
    postController.getPostByCategory(categoryId)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err=>{
        res.status(400).json({message : err.message})
    })
}

module.exports={
    createPost,
    getAllPosts,
    getPostsByCategory
    
}