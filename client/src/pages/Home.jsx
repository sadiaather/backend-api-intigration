import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket.io.js";
import Card from "../component/CardComponent.jsx";
import { useParams } from "react-router-dom";

const Home = () => {
  const [project, setProject] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("projectCreated", (newProject) => {
      setProject((prev) => [...prev, newProject]);
    });
    const res = axios
      .get("http://localhost:5000/api/allprojects")
      .then((res) => {
        console.log(res.data);
        console.log(res.data.data);
        setProject(res.data.data);
      });
           
  

   
     return () => {
      socket.off("conpnsenect");
      socket.off("projectCreated");
    };
  }, []);
  console.log(project);


  return (
   <>

    
        <div className=" row d-flex gap-4 p-4 justify-content-center bg  ">
      {Array.isArray(project) &&
        project.map(({ title, description, hostedUrl, developerName, _id,  }) => (
           <Card
            key={_id}
            title={title}
            developerName={developerName}
            des={description}
            hl={hostedUrl}
          id={_id}
         
             
          />
          
          ))}
         
          </div>
  
  
    </>
  );
};

export default Home;
