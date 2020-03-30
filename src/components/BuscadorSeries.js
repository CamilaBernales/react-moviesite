import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Resultados from './Resultados'

import { Form, Container, FormControl, Button, Row } from 'react-bootstrap';



const BuscadorSeries = () => {

    const [serieInput, setSerieInput] = useState('');
    const [series, setSeries] = useState([]);

    const handleInputChange = event => {
        setSerieInput(event.target.value);
    }

    const buscarSerie = event => {

        consultarAPI();
    }



    const consultarAPI = async () => {
        const solicitud = await fetch(`http://www.omdbapi.com/?apikey=713f58a0&type=series&s=?${serieInput}`);
        const respuesta = await solicitud.json();
        if (!respuesta.Search) {
            //esto ahora anda
            alert("ninguna coincidencia");
        } else {
            console.log(respuesta.Search);
            setSeries(respuesta.Search);
        }
    }

    return (
        <Container>
            <Form inline onSubmit={buscarSerie}>
                <FormControl
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Buscar Serie"
                    className="mr-sm-2"
                    value={serieInput}
                    id="input"
                />
                <Button
                    variant="outline-success"
                    onClick={buscarSerie}
                >Search</Button>
            </Form>
            <Row>
                {
                    series.map((resultado) =>
                        <Resultados
                            resultado={resultado}
                        />
                    )
                }
            </Row>
        </Container>
    );
}

export default BuscadorSeries;