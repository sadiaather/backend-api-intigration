import Card from 'react-bootstrap/Card';

function CardComponent({id,title,developerName,des,hl}) {
  return (
    <Card style={{ width: '18rem' } } key={id} className='text-center'>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{developerName}</Card.Subtitle>
        <Card.Text>
         {des}
        </Card.Text>
        <Card.Link href="#">{hl}</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;