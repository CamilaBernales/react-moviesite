import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import {  Navbar, Nav} from 'react-bootstrap';

const Header = () =>{

    return(
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Link to="/buscadorseries" className="nav-link">Series</Link>
          <Nav.Link href="#pricing">Busqueda</Nav.Link>
        </Nav>
       
      </Navbar>
    );
}

export default Header; 