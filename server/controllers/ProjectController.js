import chalk from "chalk";
import Project from "../models/ProjectModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const createProject = async (req,res)=> {
    console.log(req.body);
    
    const {developerName,title,description,hostedUrl}=req.body

    if(!developerName || !title || !description || !hostedUrl){
         res.status(502).json({
    success :false,
    message:"some thing is missing"
  });
  return
    }
    try{
    const result = await Project.create({
        developerName:developerName,
        description:description,
        title:title,
        hostedUrl:hostedUrl
    })
    res.status(200).json({
      success:true,
      message:"project add successfully",
      data:result
    });
}
    catch(error){
      console.error(chalk.red("Error during add project:", error));
    
    } 
}


export const allProjects =async (req,res)=>{
  
try{
    const project = await Project.find()
  console.log(project);
  
  if(project.length===0){
    res.status(404).json({
      success:false,
      message:"no projects "
    })
   
return;
  } 
  res.status(201).json({
    success:true,
    message:"fetch all projects successsfully",
    data :project
  })
}
catch(err){
  console.log(err.message);
  
    return res.status(500).json({
      success: false,
      message: "err.message",
    });
  }
}

                                            
 
  export const deleteProject = async (req,res)=>{
    const {id} = req.params  
        console.log(id);
  try{
               const result = await Project.findByIdAndDelete(id)
      console.log(result);

if(!result){
     return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

      res.status(200).json({        
       success:true,
       message:"project delete successfuly" ,    
        data :  result,
  })
  }
catch(error){
  console.log(error.message);
   res.status(500).json({
      success: false,
      message: error.message,
    });
  
}}

  export const updateProject = async (req,res)=>{
    const {id} = req.params  
        console.log(id);
        const {developerName,title,description,hostedUrl}=req.body    
try{
  
        const result = await Project.findByIdAndUpdate(id,{
          developerName:developerName,
          description:description,  
                title: title,
             hostedUrl:hostedUrl,
            
               },{
                 new: true
               })

         if(!result){
            return res.status(404).json({
        success: false,
        message: "Project not found"
      });
         }

    res.status(200).json({
      success:true,
      message:"project update successfully",
      data:result
    });
}
catch(error){
console.log(error.message);
  return res.status(500).json({
      success: false,
      message: error.message
    });

}
}

