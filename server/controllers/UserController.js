
import chalk from "chalk";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const secret = process.env.secret


export const signup = async (req,res)=>{

  const {name,email,password}= req.body

if(!name || !email || !password){
  res.status(502).json({
    success :false,
    message:"data is missing"
  });
  return
}
try{
const hashedPassword = await bcrypt.hash(password, 10);

const result = await User.create({name,email,password: hashedPassword})


const token = await jwt.sign({
  userId:result._id},secret)
  res.status(200).json({
  success:true,
  message:" successful",
  token,  
})}
catch(error){
  console.error(chalk.red("Error during signup:", error));
return res.status(500).json({
      success: false,
      message: error.message,
    });
} 
}


// export const login = async (req,res)=>{
  
//  const {email,password} = req.body
//   try{
//    const user = await User.findOne({email})
//     if(!user)
// {
//   res.status(404).json({
//     success:false,
//     message:"user not found"
//   })
//   return
// }
// const isMatch = await bcrypt.compare(password,user.password)
// if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

// const token =jwt.sign({userId:user._id},secret)

// res.status(200).json({
//   success:true,
//   message:"login successful",
//   token, 
//   user,  
// })
//   } 
//   catch(error){
//     console.error(chalk.red("Error during login:", error));
//     res.status(500).json({ message: "Internal server error" });
//   }  
// }  
export const login = async (req, res) => {
  console.log("LOGIN CONTROLLER HIT");
  console.log("BODY:", req.body);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      secret
    );

    return res.status(200).json({
      success: true,
      message: "login successful",
      token,
      user,
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};