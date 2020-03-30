import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Resultados from './Resultados'

import { Form, Container, Col, Row, Button } from 'react-bootstrap';



const BusquedaAvanzada = () => {

    const [tituloInput, setTituloInput] = useState('');
    const [anioInput, setAnioInput] = useState('');
    const [tipoInput, setTipoInput] = useState('');
    const [resultadoBusqAvanz, setResultadoBusqAvanz] = useState([]);

    const handleTitleChange = event => {

        setTituloInput(event.target.value);
    }

    const handleAnioChange = event => {
        setAnioInput(event.target.value);
    }

    const handleTipoChange = event => {
        setTipoInput(event.target.value);
    }
    const buscarResultados = e => {
        e.preventDefault();
        // alert(peliculaInput);
        llamarApi();
    }

    const llamarApi = async () => {
        console.log(tipoInput);
        const solicitud = await fetch(`http://www.omdbapi.com/?apikey=713f58a0&s=${tituloInput}&y=${anioInput}&type=${tipoInput}`);
        const respuesta = await solicitud.json();
        if (!respuesta.Search) {
            //esto ahora anda
            alert("ninguna coincidencia");
        } else {
            console.log(respuesta.Search);
            setResultadoBusqAvanz(respuesta.Search);
        }
    }
    return (
        <Container>
            <Form.Row onSubmit={buscarResultados}>

                <Form.Group as={Col} controlId="">
                    <Form.Control type="text"
                        onChange={handleTitleChange}
                        placeholder="title"
                        value={tituloInput} />
                </Form.Group>

                <Form.Group as={Col} controlId="">
                    <Form.Control type=""
                        onChange={handleAnioChange}
                        placeholder="Year"
                        value={anioInput} />
                </Form.Group>

                <Form.Group as={Col} controlId="">
                    <Form.Control as="select"  onChange={handleTipoChange}>
                       
                        <option value="movie">movie</option>
                        <option value="series">series</option>
                        <option value="game">game</option>
                        <option value="episode">episode</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="">
                    <Button variant="outline-success"
                        onClick={buscarResultados}>Search</Button>
                </Form.Group>
            </Form.Row>
            <Row>
            {
                resultadoBusqAvanz.map((resultado) =>
                    <Resultados
                        resultado={resultado}
                    />

                )
            }
            </Row>
        </Container>
    );
}

export default BusquedaAvanzada;

