import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router";
import { Container, Card} from 'react-bootstrap';


const Details = () => {

    const [details, setDetails] = useState([]);
    const APIKEY = '0bac155d195be367772d6c848cfd3529';
    let { id, titulo } = useParams();
    let solicitud;
    let respuesta;
    const encontrarID = async () => {

        solicitud = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${APIKEY}&language=en-US&append_to_response=${titulo}`)
        respuesta = await solicitud.json();
        if (solicitud.status === 404) {
            solicitud = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US&append_to_response=${titulo}`)
            respuesta = await solicitud.json();
            setDetails(respuesta);
        } else {
            setDetails(respuesta);
        }
    };

    useEffect(() => {
        encontrarID();
        // eslint-disable-next-line
    }, [id, titulo]);

    const { original_title, overview, name, poster_path, tagline } = details;

    return (
        <Container>
            <Card>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${poster_path}`} />
                <Card.Body>
                    <br />
                    <Card.Title><h1>{original_title}{name}</h1></Card.Title>
                    <Card.Text>
                        <strong> {tagline}</strong>
                        <br />
                        {overview}
                    </Card.Text>
                </Card.Body>

            </Card>
        </Container>
    );
}

export default Details;