import { Navbar,Container,Offcanvas,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaLink, FaUserAlt} from 'react-icons/fa';
import { FaUserTimes } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import {FaAddressBook } from 'react-icons/fa'
import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

function Barra() {
    const [show, setShow] = useState(true)
    const [opcionRegistro, setOpcionRegistro] = useState(false) 
    const [menu, setMenu] = useState(false)
 
    useEffect(() =>{      
      if(sessionStorage.getItem('token')){
        setMenu(true)
        setShow(false)
        setOpcionRegistro(true)
      } 
         },[]);
 
     const salir =() =>{ 
       sessionStorage.clear()
       window.location.href="/"
     }

     const registrarte =() =>{ 
      sessionStorage.clear()
      window.location.href="/registrarCiudad"
    }
    return (
        <div>
    <Navbar bg="dark" variant="dark" expand={show} className="mb-3">
      <Container fluid>
      <Navbar.Toggle aria-controls="offcanvasNavbar"/>
      <Navbar.Brand hidden={show} href="#"><FaUserAlt />Bienvenido {sessionStorage.getItem('nombre')} </Navbar.Brand>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Link onClick={()=>registrarte()} hidden={opcionRegistro} style={{ color: '#FFF', textDecoration: 'none'}} 
        to="/registrarCiudad"> <i className='fas fa-user-plus'></i> <Navbar.Brand>
         Registrarse </Navbar.Brand> </Link>
        <Navbar.Brand hidden={show} href="#"  onClick={()=>salir()} to="/"> <FaUserTimes /> Cerrar sesion</Navbar.Brand>
                   
             <Navbar.Offcanvas
               id="offcanvasNavbar-expand"
               aria-labelledby="offcanvasNavbarLabel-expand"
               placement="start"
             >
               <Offcanvas.Header closeButton>
                 <Offcanvas.Title id="offcanvasNavbarLabel-expand">
                   Menu Principal
                 </Offcanvas.Title>
               </Offcanvas.Header>
               <Offcanvas.Body>
                 <Nav className="justify-content-end flex-grow-1 pe-3">
     
                       <NavDropdown hidden={show} title="Registros" id="offcanvasNavbarDropdown-expand">
                       <NavDropdown.Item href="/registrarPersona">< FaUserPlus/>Registrar Persona</NavDropdown.Item>
                       <NavDropdown.Item href="/registrarCiudad">< FaUserPlus/>Registrar Ciudad</NavDropdown.Item>
                   </NavDropdown>
     
                   <NavDropdown hidden={show} title="Reportes" id="offcanvasNavbarDropdown-expand">
                       <NavDropdown.Item href="/verPersonas"><FaAddressBook/>Ver Personas</NavDropdown.Item>
                       <NavDropdown.Item href="/verCiudades"><FaAddressBook/>Ver Ciudades</NavDropdown.Item>
                   </NavDropdown>
     
                 </Nav>
                 <Form hidden={show} className="d-flex">
                   <FormControl hidden={show}
                     type="search"
                     placeholder="Search"
                     className="me-2"
                     aria-label="Search"
                   />
                   <Button hidden={show} variant="outline-success">Buscar</Button>
                 </Form>
               </Offcanvas.Body>
             </Navbar.Offcanvas>
           </Container>
         </Navbar>
         </div>
  )
}

export default Barra