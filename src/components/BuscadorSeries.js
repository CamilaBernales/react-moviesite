import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Resultados from './Resultados'

import { Form, Container, FormControl, Button, Row, Alert } from 'react-bootstrap';



const BuscadorSeries = () => {

    const [serieInput, setSerieInput] = useState('');
    const [series, setSeries] = useState([]);
    const [count, setCount] = useState(1);
    const [error, setError] = useState(false);
    const [total, setTotal] = useState(false);
    const APItmdb = '0bac155d195be367772d6c848cfd3529';

    const handleInputChange = event => {
        setSerieInput(event.target.value);

    };

    const buscarSerie = event => {
        event.preventDefault();
        consultarSerie();
    };



    const consultarSerie = async () => {
        const solicitud = await fetch(`
        https://api.themoviedb.org/3/search/tv?api_key=${APItmdb}&language=en-US&page=1&include_adult=false&query=${serieInput}&page=${count}`);
        // https://www.omdbapi.com/?apikey=713f58a0&s=${peliculaInput}&type=movie&page=${count}
        const respuesta = await solicitud.json();
        console.log(respuesta);
        if (respuesta.total_results === 0 || respuesta.results === undefined) {
            setSeries([]);
            setError(true);
            setTimeout(() => {
                document.querySelector('.mensaje').remove();
                window.location.replace('');
            }, 2000);
        } else {
            setSeries(respuesta.results);
            setTotal(respuesta.total_pages);
        }
    };

    const obtenerSeries = async () => {

        const solicitud = await fetch(`
        https://api.themoviedb.org/3/tv/top_rated?api_key=${APItmdb}&language=en-US&page=${count}`);
        const respuesta = await solicitud.json();
        // console.log(respuesta);
        setSeries(respuesta.results);
        setTotal(respuesta.total_pages);
    };

    useEffect(() => {
        if (serieInput !== "") {
            consultarSerie();
        } else {
            obtenerSeries();
        }
        // eslint-disable-next-line
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
            <Form className="mt-4 mb-5 pt-2 " inline onSubmit={buscarSerie}>
                <FormControl
                    required
                    className="text-center"
                    style={{ width: '55rem', height: '2.7rem' }}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Buscar Serie"
                    value={serieInput}
                    id="input"
                />
                <Button
                    style={{ width: '10rem', height: '2.7rem' }}
                    variant="outline-success"
                    onClick={buscarSerie}
                >Search</Button>
            </Form>
            <Row>
                {
                    series.map((resultado) =>
                        <Resultados
                            key={resultado.id}
                            resultado={resultado}
                        />
                    )
                }
            </Row>

            <div className="mt-5">
                <Row>
                    <Button
                        disabled={count === 1}
                        variant="outline-secondary"
                        size="lg" className="ml-auto "
                        onClick={() => setCount(count - 1)}
                        style={{ width: '10rem' }} >
                        Back</Button>
                    <Button
                        variant="outline-secondary"
                        size="lg"
                        className="mr-auto "
                        disabled={count === total}
                        onClick={() => setCount(count + 1)} style={{ width: '10rem' }}>Next
                </Button>
                </Row>
            </div>


        </Container>
    );
}

export default BuscadorSeries;