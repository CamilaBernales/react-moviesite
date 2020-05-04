import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Resultados from './Resultados'
import { Form, Container, FormControl, Button, Row, Alert } from 'react-bootstrap';



const BuscadorPeliculas = () => {

    const [peliculaInput, setPeliculaInput] = useState('');
    const [peliculas, setPeliculas] = useState([]);
    const [count, setCount] = useState(1);
    const APIKEY = '0bac155d195be367772d6c848cfd3529';
    const [error, setError] = useState(false);
    const [total, setTotal] = useState(false);


    const registrarCambiosBuscadorTexto = event => {
        setPeliculaInput(event.target.value);
    }

    const buscarPelicula = e => {
        e.preventDefault();
        consultarPelicula();
    //    setPeliculaInput('');    
    }

    const consultarPelicula = async () => {
        const solicitud = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&include_adult=false&query=${peliculaInput}&page=${count}`);
        const respuesta = await solicitud.json();
        // console.log(respuesta);
        if (respuesta.total_results === 0 || respuesta.results === undefined) {
            setPeliculas([]);
            setError(true);
            setTimeout(() => {
                document.querySelector('.mensaje').remove();
                window.location.replace('');
              }, 2000);
        } else {
            setPeliculas(respuesta.results);
           //console.log(respuesta.total_pages)
           setTotal(respuesta.total_pages);
        }
    };

    const obtenerPeliculas = async () => {
        const solicitud = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US&page=${count}`);
        const respuesta = await solicitud.json();
        setPeliculas(respuesta.results);
        setTotal(respuesta.total_pages);
    };

    useEffect(() => {
        if(peliculaInput !== ""){
            consultarPelicula();
        }else{
            obtenerPeliculas();
        }
        // eslint-disable-next-line
    }, [count]);
   

    return (
        <Container>
            {
                error ?

                <Alert className="mensaje text-center" variant="danger">
                        No hay resultados para su busqueda
                </Alert>
                    : null
            }
            <Form className=" formpadre mt-4 mb-5 pt-2 " inline onSubmit={buscarPelicula}>

                <FormControl
                    className="formbusqueda text-center"
                    style={{ width: '55rem', height: '2.7rem' }}
                    required
                    onChange={registrarCambiosBuscadorTexto}
                    type="text"
                    placeholder="Buscar Pelicula"
                    value={peliculaInput}
                    id="input"
                />

                <Button
                    style={{ width: '10rem', height: '2.7rem' }}
                    variant="outline-success"
                    onClick={buscarPelicula}
                >Search</Button>
            </Form>

            <Row>   {
                

                peliculas.map((resultado) =>
                    <Resultados
                        key={resultado.id}
                        resultado={resultado}
                    />)
                    }

            </Row>

            <div className="mt-5">
                <Row>
                    <Button variant="outline-secondary" size="lg" className="ml-auto " disabled={count === 1} onClick={() => setCount(count - 1)} style={{ width: '10rem' }} >Back</Button>
                    <Button variant="outline-secondary" size="lg" className="mr-auto "  disabled={count === total} onClick={() => setCount(count + 1)} style={{ width: '10rem' }}>Next
                </Button>
                </Row>
            </div>

        </Container>

    )
}

export default BuscadorPeliculas;