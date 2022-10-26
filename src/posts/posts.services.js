const postController =require("./posts.controller")
const {host}=require("../config")

const getAllPosts = (req,res)=>{

    //*paginacion
    // !offset y limit
    //?localhost:9000/api/vi/posts?

    //? localhost:9000/api/v1/posts?offset=0&limit=20
    const offset=Number(req.query.offset) || 0
    const limit=Number(req.query.limit)|| 10
    
    const urlBase =`${host}/api/v1/posts`

    postController.getAllPosts(offset,limit)
    .then(data=>{
        const nextPage = data.count - offset >= limit ? `${urlBase}?offset=${offset + limit}&limit=${limit}` : null
        const prePage= offset- limit >=0 ? `${urlBase}?offset=${offset-limit}&limit=${limit}`:null
        res.status(200).json({
            next:nextPage,
            prev:prePage,
            items:data.count,
            urlBase, 
            offset, 
            limit,
            results:data.rows
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