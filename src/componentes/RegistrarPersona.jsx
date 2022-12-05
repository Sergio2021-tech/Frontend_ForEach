//import React from 'react';
import {FaSave } from 'react-icons/fa';
import React,{useEffect, useState} from 'react';
import Axios from 'axios'
import Swal from 'sweetalert2'

export default function RegistrarPersona() {
  const [nombres, setNombres ]= useState('')
  const [apellidos, setApellido ]= useState('')
  const [estadoVacuna, setestadoVacuna]= useState([])
  const [estadoVacunaSelect , setestadoVacunaSelect ]= useState([])
  const [dosisAplicadas, setdosisAplicadas]= useState([])
  const [dosisAplicadasSelect, setdosisAplicadasSelect]= useState([])

  useEffect(()=>{
    //obtenerpersonas()
    setestadoVacuna(['No Vacunado','Vacunado','Primera Dosis'])
    setestadoVacunaSelect('No Vacunado')

    setdosisAplicadas(['Primera Dosis','Segunda Dosis','Esquema Completo','Ninguna'])
    setdosisAplicadasSelect('Ninguna')
  },[]) 

  const guardar = async(e)=>{
    e.preventDefault()
    const usuario = {
      nombres,
      apellidos,
      estadoVacuna:estadoVacunaSelect,
      dosisAplicadas:dosisAplicadasSelect,
      ciudad: sessionStorage.getItem('idUsuario'),
      ciudadNombre: sessionStorage.getItem('nombre')
    }
    
    if(nombres===""){
      Swal.fire({ 
        icon:'success',
        title: "Debes escribir un nombre",
        showConfirmButton:false,
        timer:1500
      })  
     }  
    else if(apellidos===""){
      Swal.fire({ 
        icon:'success',
        title: "Debes escribir un apellido",
        showConfirmButton:false,
        timer:1500
      })  
     }  
     else {
       const token = sessionStorage.getItem('token')
       const respuesta = await Axios.post('/persona/crear',usuario,{
         headers:{'autorizacion': token}
       })
       
       const mensaje = respuesta.data.mensaje
       console.log(mensaje)


      Swal.fire({ 
        icon:'success',
        title: mensaje,
        showConfirmButton:false,
        timer:1500
      }) 

      e.target.reset();
      setNombres("");
      setApellido("")
     }
  }

     
  

   return (

<div className="container mt-4">
        <div className="row">
          <div className="col-md-7 mx-auto">
            <div className="card">
              <div className="container text-center fa-5x">
                <i className="fas fa-user-plus"></i>
            </div>
         <div className="card-header bg-info text-center">
         <h4>Editar Persona </h4>
           </div>
          <div className="card-body">
          <form onSubmit={guardar}>  
            <div className="row">

            <div className="col-md-6">
            <label> Nombre </label>
            <input type="text" className='form-control required'
            onChange={(e)=>setNombres(e.target.value)}/>
            </div>
            <div className="col-md-6">
            <label> Apellidos </label>
            <input type="text" className='form-control required'
            onChange={(e)=>setApellido(e.target.value)}/>
            </div>
            <div className="col-md-6">
            <label> Estado Vacuna </label>
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
            <label> Dosis Aplicadas </label>
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
            <button type='submit' clas="btn btn-outline-info">
            <span clas="fa fa-save"></span> <FaSave />Guardar 
            </button>
          </form>

          </div>
         </div>
        </div>
     </div>
    </div>
  )
}