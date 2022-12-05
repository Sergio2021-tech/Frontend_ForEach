/*import MaterialTable from 'material-table';*/
import { ThemeProvider, createTheme } from '@mui/material';
import React,{useEffect, useState} from 'react';
import Axios from 'axios'
import Swal from 'sweetalert2'
import {Modal, Button, Table, Container, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'react-bootstrap'
import {FaSave } from 'react-icons/fa';


function BasicSearch() {
  const defaultMaterialTheme = createTheme();
  const [ciudads, setCiudad ]= useState([])
  const [idCiudad, setidCiudad ]= useState('')
  const [nombre, setNombres ]= useState('')
  const [correo, setcorreo ]= useState('')
  const [contrasena, setcontrasena]= useState('')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(()=>{
    obtenerciudads2()
  },[]) 

  const  obtenerciudads2 = async()=>{
  
     const id = sessionStorage.getItem('idUsuario')
     const token = sessionStorage.getItem('token')
     const respuesta = await Axios.get('/persona/listarPersonasCiudad2/'+id,{
       headers:{'autorizacion':token}
     })
     console.log(respuesta)
     setCiudad(respuesta.data)

  }

  const  obtenerciudad = async(idParametro)=>{
       setShow(true)
       const id = idParametro
       const token = sessionStorage.getItem('token')
       const respuesta = await Axios.get('/persona/listar2/'+id.toString(),{
        headers:{'autorizacion':token}
     })
     console.log(respuesta.data)
     setidCiudad(respuesta.data._id)
     setNombres(respuesta.data.nombre)
     setcorreo(respuesta.data.correo)
     setcontrasena(respuesta.data.contrasena)
    }

     const actaulizar= async (e)=>{
     e.preventDefault();
     const id = idCiudad
     const token = sessionStorage.getItem('token')
     const ciudad = {
        nombre,
        correo,
        contrasena
     }
     const respuesta = await Axios.put('persona/actualizar2/'+id,ciudad,{
        headers:{'autorizacion': token}
    })
    
    const mensaje = respuesta.data.mensaje
    obtenerciudad()

   Swal.fire({ 
     icon:'success',
     title: mensaje,
     showConfirmButton:false,
     timer:1500
   }) 

   setShow(false);
   window.location.reload('/Verciudad')

 }
 const eliminar = async (id)=>{
  
   const token = sessionStorage.getItem('token')
   const respuesta = await Axios.delete('/persona/eliminar2/'+id,{
    headers:{'autorizacion':token}
  })
    
  const mensaje = respuesta.data.mensaje

    Swal.fire({ 
    icon:'success',
    title: mensaje,
    showConfirmButton:false,
    timer:1500
  }) 

  window.location.reload('/Verciudad')
}
  const data =
    ciudads.map((ciudad)=>({
      id:ciudad._id,
      nombre:ciudad.nombre,
      correo:ciudad.correo,
      contrasena:ciudad.contrasena,
  }
  )  
  )

  return(
    <div style={{ width: '100%', height: '100%' }}>
    <Container >
     <Button color="success">Insertar registro</Button>
       <Table>
         <thead><tr><th>Id</th>
         <th>Nombre</th>
         <th>Correo</th>
         <th></th></tr></thead>
         <tbody>
          { ciudads.map((ciudad)=>(
           <tr>
           <td>{ciudad._id}</td>
           <td>{ciudad.nombre}</td>
           <td>{ciudad.correo}</td>
           <td><Button color="Dark" className="btn btn-dark">Editar</Button>{" "}
           <Button color="Danger" className="btn btn-danger">Eliminar</Button></td>

           </tr>
          ))}
         </tbody>
       </Table>
     </Container>
     
          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Editar Ciudad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="container mt-4">
        <div className="row">
          <div className="col-md-7 mx-auto">
            <div className="card">
              <div className="container text-center fa-5x">
                <i className="fas fa-user-plus"></i>
            </div>
         <div className="card-header bg-info text-center">
         <h4>Editar </h4>
           </div>
          <div className="card-body">
          <form onSubmit={'guardar'}>  
            <div className="row">
            <div className="col-md-6">
            <label> Nombre </label>
            <input type="text" className='form-control required'
            onChange={(e)=>setNombres(e.target.value)} value={nombre}/>
            </div>
            <div className="col-md-6">
            <label> Correo </label>
            <input type="text" className='form-control required'
            onChange={(e)=>setcorreo(e.target.value)} value={correo}/>
            </div>
            <div className="col-md-6">
            <label> Contraseña </label>
            <input type="text" className='form-control required'
            onChange={(e)=>setcontrasena(e.target.value)} value={contrasena}/>

            </div>
             </div>
            <br/>
            </form>
          </div>
         </div>
        </div>
     </div>
    </div>
              </Modal.Body>
             <Modal.Footer>
             <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={actaulizar}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      </div>
  );
}


export default BasicSearch 