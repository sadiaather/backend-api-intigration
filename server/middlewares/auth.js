import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { error } from "node:console";

dotenv.config()

const secret = process.env.secret




export const  authentication= async (req,res,next)=>{
try{
      console.log(req.headers.authorization)
    const result = req.headers.authorization

    if(! result){
      res.status(500).json({
        success:false,
        message : "plz login or signup"
      })
    }
    const token = result.split(" ")[1]
    console.log(token);

    
 const user = await jwt.verify(token,secret)

  if(!user){
      res.status(500).json({
        success:false,
        message : "invalid email or password"
      })
    }
next()
}catch(err){
  console.log(err.message);
  res.status(500).json({
    error:error
  })
  
}
    
  }