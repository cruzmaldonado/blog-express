const Categories =require("../models/categories.models")

const getAllCAtegories=async ()=>{
    const data =await Categories.findAll()
    return data
}

const getAllCAtegoriesById = async (id) => {
    const data = await Categories.findOne({
        where:{
            id
        }
    })
    return data

}

const createCategory= async (name) => {
    const data = await Categories.create({name})
    return data
}

module.exports={
    createCategory,
    getAllCAtegories,
    getAllCAtegoriesById
}