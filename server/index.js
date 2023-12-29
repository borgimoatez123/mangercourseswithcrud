const express = require('express');
const cors =require('cors')
const mongoose=require('mongoose')
const app=express()
app.use(cors())
app.use(express.json())
const PORT=process.env.PORT|| 8080
//shema
const schemaData=mongoose.Schema({
    coursesname:String,
    price:String
},{
    timestamps:true
})
const courseModel=mongoose.model("course",schemaData)
//read 
//http://localhost:8080/
app.get("/",async(req,res)=>{
    const data =await courseModel.find({})
    res.json({success :true ,data:data})
})
//create courses
//http://localhost:8080/create
app.post("/create",async(req,res)=>{
console.log(req.body)
const data=new courseModel(req.body)
await data.save()
res.send({success:true,message: "data save successfully",data:data})
})
//upadate 
//http://localhost:8080/update
app.put('/update', async (req,res)=>{
    console.log(req.body)
    const { _id,...rest}=req.body
    console.log(rest)
    const data=await courseModel.updateOne({_id:_id},rest)
    res.send({success:true,message:"data is update",data:data})
})
//delete 
//http://localhost:8080/delete
app.delete('/delete/:id',async(req,res)=>{
const id =req.params.id
console.log(id)
const data= await courseModel.deleteOne({_id:id})
res.send({success:true,message:"data is deleted",data:data})
})




mongoose.connect("mongodb://127.0.01:27017/coursesmanger")
.then(()=>{
    console.log("data base conncect ")
    app.listen(PORT,()=>console.log("Server is running "))
})
.catch((err)=>console.log(err))
