const express=require("express");


const accountRouter= express.Router()

const {accountModel} =require("../models/account.model")

accountRouter.post("/openAccount",async(req,res)=>{
    const payload=req.body
    const check=await accountModel.find({email:payload.email})
    if(check.length!==0){
        res.send({"msg":"account already exists"})
    }else{
        const post = new accountModel(payload)
        await post.save()
        res.send({"msg":"account opened successfully"})
    }
   

})

accountRouter.patch("/updateKYC/:id", async(req,res)=>{
    const payload = req.body
    const id = req.params.id
      
    try{

   await accountModel.findByIdAndUpdate({"_id":id},payload)
           res.send(" account Updated ")
   
    
    }catch(err){
       console.log(err)
       res.send({"msg":"Something went wrong","err":err.message})
    }
    
   })

   accountRouter.delete("/closeAccount/:id", async(req,res)=>{
    
    const id = req.params.id
    try{
    
           await accountModel.findByIdAndDelete({"_id":id})
           res.send(" account deleted ")

    }catch(err){
       console.log(err)
       res.send({"msg":"Something went wrong"})
    }
    
})
accountRouter.post("/depositMoney/:id",async(req,res)=>{
    const payload = req.body
    const id = req.params.id

    const post = await accountModel.findById({"_id":id})
    post.statement.push(payload)
    post.initialBalance=post.initialBalance+payload.amount
    post.save()
    res.send(post)

})

accountRouter.post("/withdrawMoney/:id",async(req,res)=>{
    const payload = req.body
    const id = req.params.id

    const post = await accountModel.findById({"_id":id})
    post.statement.push(payload)
    if( post.initialBalance>payload.amount ){
        post.initialBalance=post.initialBalance-payload.amount
        post.save()
        res.send(post)
    }
    else{
        res.send({"msg":"Insufficient Balance"})
    }

})

accountRouter.post("/transferMoney/:id",async(req,res)=>{
    const payload = req.body
    const {type,toemail,toPanNumber,amount}=payload
    const id = req.params.id
    const sender = await accountModel.findById({"_id":id})
    const recieve = await accountModel.find({"email":payload.toemail})
    const reciever = await accountModel.findById({"_id":recieve[0]._id})  
    console.log(reciever)

    if( sender.initialBalance>=payload.amount){
        sender.initialBalance=sender.initialBalance-payload.amount
        reciever.initialBalance=reciever.initialBalance+payload.amount        
        sender.statement.push(payload)        
        reciever.statement.push({type:"recive",fromemail:toemail,frompanNo:toPanNumber,amount})
        sender.save()
        reciever.save()
        res.send(reciever)   
    }  
    else{
        res.send({"msg":"Insufficient Balance"})
    }
   

}
)

accountRouter.get("/printStatement/:id",async(req,res)=>{
    const id = req.params.id
    const account=await accountModel.findById({"_id":id})

    res.send(account)
})

module.exports={accountRouter}