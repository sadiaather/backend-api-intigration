import React from 'react'
import { useEffect,useState } from 'react'
import axios from "axios"
import socket from "../socket.io.js";
import Cards from "../component/Cards.jsx"


const Home = () =>   {

  


  const [project, setProject] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("projectCreated", (newProject) => {
      setProject((prev) => [...prev, newProject]);
    });
const res=  axios.get("http://localhost:5000/api/allprojects")
.then((res)=>{
  console.log(res.data);
  console.log(res.data.data);
  setProject(res.data.data)
  
})

  


    return () => {
      socket.off("connect");
      socket.off("projectCreated");
    };
  }, []);;
 console.log(project);

    return (
  // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6  ">
  //   {project?.map((item) => (
  //     <div
  //       key={item._id}
  //       className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition width-50px "
  //     >
  //       <h2 className="text-2xl font-bold">{item.title}</h2>

  //       <p className="text-gray-600 mt-2">
  //         <strong>Developer:</strong> {item.developerName}
  //       </p>

  //       <p className="mt-3">{item.description}</p>

  //       <a
  //         href={item.hostedUrl}
  //         target="_blank"
  //         rel="noreferrer"
  //         className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
  //       >
          
  //       </a>
      
  
<>
    {/* <Cards/>  */}
    
    {Array.isArray(project) &&
  project.map(({ title, description, hostedUrl, developerName, _id }) => (
    <div key={_id}>
      <h1>{title}</h1>
      <h2>{developerName}</h2>
      <p>{description}</p>
      <p>{hostedUrl}</p>
    </div>
  ))}
  </>
)}
  
  


export default Home

