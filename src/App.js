import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BuscadorPelicula from './components/BuscadorPelicula'
import 'bootstrap/dist/css/bootstrap.min.css';
import BuscadorSeries from './components/BuscadorSeries';
import BusquedaAvanzada from './components/BusquedaAvanzada';
import { Navbar, Nav } from 'react-bootstrap';


function App() {
  return (
    <Router>
      <Navbar className="Navbar" bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/buscadorseries">Series</Nav.Link>
          <Nav.Link href="/busquedaavanzada">Busqueda Avanzada</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
          <Route exact path="/" component={BuscadorPelicula} />
          <Route exact path="/buscadorseries" component={BuscadorSeries} />
          <Route exact path="/busquedaAvanzada" component={BusquedaAvanzada} />
        </Switch>

    </Router>
  );
}

export default App;
