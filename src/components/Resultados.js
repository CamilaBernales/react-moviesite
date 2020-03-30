import React from 'react'
import { Col, Image, Card, Button, CardGroup } from 'react-bootstrap';


const Resultados = (resultado) => {

    const { Title,
        Year,
        imdbID,
        Type,
        Awards,
        Poster } = resultado.resultado;

    return (

        <Col md={4}>
            <Card>
                <div className="text-left m-2">
                    <Image src={Poster} alt=".." />
                    <h3>{Title}</h3>
                </div>
            </Card>
        </Col>

    );
}

export default Resultados;

