/*import MaterialTable from 'material-table';*/
import { ThemeProvider, createTheme } from '@mui/material';
import React,{useEffect, useState} from 'react';
import Axios from 'axios'
import Swal from 'sweetalert2'
import {Modal, Button, Table, Container, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'react-bootstrap'
import {FaSave } from 'react-icons/fa';


function BasicSearch() {
  const [personas, setPersonas ]= useState([])
  const [idPersona,setidPersona ]= useState('')
  const [nombres, setNombres ]= useState('')
  const [apellidos, setApellido ]= useState('')
  const [estadoVacuna, setestadoVacuna]= useState([])
  const [estadoVacunaSelect, setestadoVacunaSelect ]= useState([])
  const [dosisAplicadas, setdosisAplicadas]= useState([])
  const [dosisAplicadasSelect, setdosisAplicadasSelect]= useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(()=>{
    obtenerpersonas()
    setestadoVacuna(['No Vacunado','Vacunado','Primera Dosis'])
    setestadoVacunaSelect('No Vacunado')

    setdosisAplicadas(['Primera Dosis','Segunda Dosis','Esquema Completo','Ninguna'])
    setdosisAplicadasSelect('Ninguna')
  },[]) 

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 const obtenerpersonas = async()=>{
     const id = sessionStorage.getItem('idUsuario')
     const token = sessionStorage.getItem('token')
     const respuesta = await Axios.get('/persona/listarPersonasCiudad/'+id,{
      //const respuesta = await Axios.get('/persona/listarPersonasCiudad/'+id.toString(),{
        headers:{'autorizacion':token}
     })
     console.log(respuesta)
     setPersonas(respuesta.data)
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const obtenerpersona = async(idParametro)=>{
       setShow(true)
       const id = idParametro
       const token = sessionStorage.getItem('token')
       const respuesta = await Axios.get('/persona/listar/'+id.toString(),{
        //const respuesta = await Axios.get('/persona/listar/'+id.isValidObjectId(id)
      // const respuesta = await Axios.get('/persona/listar/'+id,{
       headers:{'autorizacion':token}
     })
     console.log(respuesta.data)
     setidPersona(respuesta.data._id)
     setNombres(respuesta.data.nombres)
     setApellido(respuesta.data.apellidos)
     estadoVacunaSelect(respuesta.data.estadoVacuna)
     dosisAplicadasSelect(respuesta.data.dosisAplicadas)
    }
     const actaulizar= async (e)=>{
      e.preventDefault();
      const id = idPersona
      const token = sessionStorage.getItem('token')
      const persona = {
        nombres,
        apellidos,
        estadoVacuna:estadoVacunaSelect,
        dosisAplicadas:dosisAplicadasSelect
     }
     const respuesta = await Axios.put('persona/actualizar/'+id,persona,{
        headers:{'autorizacion': token}
    })    
    const mensaje = respuesta.data.mensaje
    obtenerpersona()
   Swal.fire({ 
     icon:'success',
     title: mensaje,
     showConfirmButton:false,
     timer:1500
   }) 
   setShow(false);
   window.location.reload('/VerPersona')
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   const eliminar = async(id)=>{
   const token = sessionStorage.getItem('token')
   const respuesta = await Axios.delete('/persona/eliminar/'+id,{
   headers:{'autorizacion':token}
  })
    
  const mensaje = respuesta.data.mensaje

    Swal.fire({ 
    icon:'success',
    title: mensaje,
    showConfirmButton:false,
    timer:1500
  }) 
  window.location.reload('/VerPersona')
}

const guardar = async(e)=>{
  e.preventDefault()
  const persona = {
    nombres,
    apellidos,
    estadoVacuna:estadoVacunaSelect,
    dosisAplicadas:dosisAplicadasSelect,
    ciudad: sessionStorage.getItem('idUsuario'),
    ciudadNombre: sessionStorage.getItem('nombre')
  }}
  
const data =
  personas.map((persona)=>({
      id:persona._id,
      nombres:persona.nombres,
      apellidos:persona.apellidos,
      dosisAplicadas:persona.dosisAplicadas,
      estadoVacuna:persona.estadoVacuna,
   }
  )
) 
/*
const eliminar2 = (persona) => {
  var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+persona._id);
  if (opcion == true) {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (persona._id == registro.id) {
        arreglo.splice(contador, 1);
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  }
};*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return(
      <div style={{ width: '100%', height: '100%' }}>
       <Container >
    
          <Table >
            <thead><tr><th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Dosis Aplicadas</th>
            <th>Estado de Vacuna</th></tr></thead>
            <tbody>
            {personas.map((persona, i)=>(
              <tr key={i}>
              <td>{persona._id}</td>
              <td>{persona.nombres}</td>
              <td>{persona.apellidos}</td>
              <td>{persona.dosisAplicadas}</td>
              <td>{persona.estadoVacuna}</td>
              <td>{" "}
              <Button color="Dark"onClick={(personas)=>obtenerpersona(persona._id)}>Editar</Button>{" "}
              <Button color="danger" onClick={(personas)=>eliminar(persona._id)} className="btn btn-danger">Eliminar</Button> {" "}
              </td>
              </tr>
             ))}
            </tbody>    
                
          </Table>
        </Container>
        
        <Modal size="lg" show={show} onHide={handleClose}>
         <Modal.Header closeButton>
          <Modal.Title>Editar</Modal.Title>
           </Modal.Header>
            <Modal.Body>
              <div className="container mt-4"/>
               <div className="row"/>
                <div className="col-md-7 mx-auto">
                  <div className="card">
                   <div className="container text-center fa-5x">
                    <i className="fas fa-user-plus"></i>
                     </div>
                      <div className="card-header bg-info text-center">
                        <h4>Editar Persona</h4>
                          </div>
                            <div className="card-body">
                             <form onSubmit={guardar}>  
                              <div className="row">

            <div className="col-md-6">
            <label> Nombre </label>
            <input type="text" className='form-control required'
            onChange={(e)=>setNombres(e.target.value)} value={nombres}/>
            </div>
            <div className="col-md-6">
            <label> Apellidos </label>
            <input type="text" className='form-control required'
            onChange={(e)=>setApellido(e.target.value)} value={apellidos}/>
            </div>
            <div className="col-md-6">
            <label> Dosis Aplicadas </label>
            <select className='form-control'onChange={(e)=>setestadoVacunaSelect(e.target.value)}>
            {
              estadoVacuna.map(estadoVacuna => (
                <option key={estadoVacuna}>
                  {estadoVacuna}
                  </option>
              ))
            }
            </select>
            </div>

            <div className="col-md-6">
            <label> Estado de Vacuna </label>
            <select className='form-control'onChange={(e)=>setdosisAplicadasSelect(e.target.value)}>
            {
              dosisAplicadas.map(dosisAplicadas => (
                <option key={dosisAplicadas}>
                  {dosisAplicadas}
                  </option>
              ))
            }
            </select>
            </div>
              </div>
                <br/>
                 </form>
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

