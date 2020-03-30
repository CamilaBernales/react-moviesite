import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Resultados from './Resultados'
import { Form, Container, FormControl, Button, Row } from 'react-bootstrap';



const BuscadorPeliculas = () => {
    
    const [peliculaInput, setPeliculaInput] = useState('all');
    const [peliculas, setPeliculas] = useState([]);
    const[count, setCount] = useState(1);
 

    const registrarCambiosBuscadorTexto = event => {
        setPeliculaInput(event.target.value);
    }

    const buscarPelicula = e => {
        e.preventDefault();
        // alert(peliculaInput);
        llamarApi();
    }
    
    const llamarApi = async () => {
        const solicitud = await fetch(`https://www.omdbapi.com/?apikey=713f58a0&s=${peliculaInput}&page=5`);
        const respuesta = await solicitud.json();
        console.log(respuesta);
        if(!respuesta.Search){
            //esto ahora anda
            console.log("ninguna coincidencia");
        }else{
            console.log(respuesta);
        setPeliculas(respuesta.Search);
        }
    };
    useEffect(()=>{
        llamarApi();
    },[])

    return (
        <Container>
            <Form inline onSubmit={buscarPelicula}>
                <FormControl
                    onChange={registrarCambiosBuscadorTexto}
                    type="text"
                    placeholder="Buscar Pelicula"
                    className="mr-sm-2"
                    value={peliculaInput}
                    id="input"
                />
                <Button
                    variant="outline-success"
                    onClick={buscarPelicula}
                >Search</Button>
            </Form>
            
                <Row>   {
                    peliculas.map((resultado) =>
                        <Resultados
                            resultado={resultado}
                        />)
                }
            
                </Row>
        </Container>

    )
}

export default BuscadorPeliculas