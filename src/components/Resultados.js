import React from 'react';
import { Link } from "react-router-dom";
import { Col, Card } from 'react-bootstrap';

const Resultados = (resultado) => {
    const { popularity, name, poster_path, first_air_date, release_date, id, title } = resultado.resultado;


    return (

        <Col>
            <Card border="danger" id={id} style={{ width: '18rem' }} >
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />

                <Card.Body>
                    <Card.Title>{title}{name}</Card.Title>
                    <Card.Text>
                        
                        Popularidad: {popularity}
                        <br/>
                        {first_air_date}
                        <br/>
                       {release_date}
                    </Card.Text>
                    <Link to={`/details/${id}/${name ? name : `${title}` }`} > Ver Detalles
                    </Link>
                </Card.Body>
            </Card>
        </Col>

    );
}

export default Resultados;

