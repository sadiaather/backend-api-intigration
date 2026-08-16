import Card from 'react-bootstrap/Card';
import "../App.css"
import axios from 'axios';
import { useState ,useEffect} from 'react';
import { Toast } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


function CardComponent({id,title,developerName,des,hl}) {    

  return (
    
    <div  className="my-card col-lg-4 col-md-6 col-sm-12 mb-4 ">
      <Card  key={id}  >
      <Card.Body  >
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{developerName}</Card.Subtitle>
        <Card.Text>
         {des}
        </Card.Text>
         
               <a
                    href={hl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project
                  </a>
       
      </Card.Body>
    </Card>
    </div>
  );
}

export default CardComponent;