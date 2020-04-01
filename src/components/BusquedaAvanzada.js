import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Resultados from './Resultados'

import { Form, Container, Col, Row, Button, Alert } from 'react-bootstrap';



const BusquedaAvanzada = () => {

    const [tituloInput, setTituloInput] = useState('');
    const [anioInput, setAnioInput] = useState('');
    const [tipoInput, setTipoInput] = useState('movie');
    const [resultadoBusqAvanz, setResultadoBusqAvanz] = useState([]);
    const [error, setError] = useState(false);
    const [count, setCount] = useState(1)


    const APIKEY = '0bac155d195be367772d6c848cfd3529';

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
        consultarBusqueda();
        setTituloInput('');
        setAnioInput('');
    };

    const consultarBusqueda = async () => {

        if (anioInput <= 2020 && typeof anioInput === 'number' && anioInput !== "" && tituloInput !== "") {
            const solicitud = await fetch(
                `https://api.themoviedb.org/3/search/${tipoInput}?api_key=${APIKEY}&language=en-US&query=${tituloInput}&year=${anioInput}&page=${count}&include_adult=false`);
            const respuesta = await solicitud.json();
            console.log(respuesta)
            if (respuesta.total_results === 0 || respuesta.results === undefined) {
                setError(true);
                setTimeout(() => {
                    document.querySelector('.mensaje').remove();
                }, 2000);
            } else {
                setResultadoBusqAvanz(respuesta.results);
            }
        } else {
            setResultadoBusqAvanz([]);
            setError(true);
            setTimeout(() => {
                document.querySelector('.mensaje').remove();
                window.location.replace('');
            }, 2000);
        }
    };

    const consultarProgramas = async () => {
        console.log(tipoInput);
        const solicitud = await fetch(`
        https://api.themoviedb.org/3/trending/all/day?api_key=${APIKEY}&page=${count}`);
        const respuesta = await solicitud.json();
        console.log(respuesta)
        setResultadoBusqAvanz(respuesta.results);

    };


    useEffect(() => {
        consultarProgramas();
    }, [count])


    return (
        <Container>
            {
                error ?

                    <Alert className="mensaje text-center" variant="danger">
                        No hay resultados para su busqueda
                     </Alert>
                    : null
            }
            <Form.Row className="mt-4 ml-5 mb-5 pt-2" onSubmit={buscarResultados}>

                <Form.Group as={Col} controlId="">
                    <Form.Control type="text"
                        required
                        className="text-center"
                        style={{ height: '2.7rem' }}
                        onChange={handleTitleChange}
                        placeholder="title"
                        value={tituloInput} />
                </Form.Group>

                <Form.Group as={Col} controlId="" >
                    <Form.Control type="text"
                        required
                        className="text-center"
                        style={{ height: '2.7rem' }}
                        onChange={handleAnioChange}
                        placeholder="Year"
                        value={anioInput} />
                </Form.Group>

                <Form.Group as={Col} controlId="">
                    <Form.Control as="select"
                        style={{ height: '2.7rem' }}
                        onChange={handleTipoChange}>
                        <option value="Movie">movie</option>
                        <option value="Tv">tv</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="">
                    <Button variant="outline-success"
                        style={{ width: '10rem', height: '2.7rem' }}
                        onClick={buscarResultados}
                    >Search</Button>
                </Form.Group>
            </Form.Row>
            <Row>
                {
                    resultadoBusqAvanz.map((resultado) =>
                        <Resultados
                            key={resultado.id}
                            resultado={resultado}
                        />

                    )
                }
            </Row>
            <div className="mt-5">
                <Row>
                    <Button variant="outline-secondary" size="lg" className="ml-auto " disabled={count === 1} onClick={() => setCount(count - 1)} style={{ width: '10rem' }} >Back</Button>
                    <Button variant="outline-secondary" size="lg" className="mr-auto " onClick={() => setCount(count + 1)} style={{ width: '10rem' }}>Next
                </Button>
                </Row>

            </div>

        </Container>
    );
}

export default BusquedaAvanzada;

