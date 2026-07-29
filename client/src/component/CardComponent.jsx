import Card from 'react-bootstrap/Card';
import "../App.css"

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
        <Card.Link href="#">{hl}</Card.Link>
      </Card.Body>
    </Card>
    </div>
  );
}

export default CardComponent;