const express=require("express")
const cors=require("cors")
const connection=require("./db")

const app=express()
app.use(cors())
app.use(express.json())
const {accountRouter}=require("./routes/accout.router")


require("dotenv").config


app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use("/",accountRouter)


app.listen(3030,async()=>{
    try{
        await connection
        console.log("db connceted to 3030")
    }
    catch(err){
        console.log(err)
    }
    console.log("on port 3030")
})