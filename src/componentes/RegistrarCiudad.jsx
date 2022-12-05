import {FaSave} from 'react-icons/fa';
import {  FaBeer} from 'react-icons/fa';
import React,{useEffect, useState} from 'react';
import Axios from 'axios'
import Swal from 'sweetalert2'

export default function RegistrarCiudad() {

  const [nombre, setNombre ]= useState('')
  const [correo,setCorreo ]= useState('')
  const [contrasena, setContrasena]= useState('')

  const salir =() =>{ 
    sessionStorage.clear()
    window.location.href="/"
  }

  const registro= async(e)=>{
    e.preventDefault();

    const usuario = {nombre,correo,contrasena}
    const respuesta = await Axios.post('./ciudad/crear/',usuario)
       //headers:{'autorizacion':token}

       console.log(respuesta)
       const mensaje= respuesta.data.mensaje

       if(mensaje!=='Bienvenido'){
        Swal.fire({ 
          icon:'error',
          title: mensaje,
          showConfirmButton:false,
          timer:1500
        })  
       }  

       else {
        
        const token = respuesta.data.token
        const nombre = respuesta.data.nombre
        const idUsuario = respuesta.data.id
    //parte del navegador donde se almacena la informacion
        sessionStorage.setItem('token',token)
        sessionStorage.setItem('nombre',nombre)
        sessionStorage.setItem('idUsuaro',idUsuario)

        Swal.fire({ 
          icon:'success',
          title: mensaje,
          showConfirmButton:false,
          timer:1500
        }) 
       //window.location.href='/index'
       setTimeout(()=>{
        window.location.href='/'
      },1600) 
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
                 <h4>Registrar Ciudad </h4>
                   </div>
                  <div className="card-body">
                  <form onSubmit={registro}>  
                    <div className="row">
        
                    <div className="form-group">
                    <label> Nombre</label>
                    <input type="text" className='form-control required'onChange={(e)=>setNombre(e.target.value)}/>
                    </div>
                    <div className="form-group">
                    <label>contrasena</label>
                    <input type="text" className='form-control required'onChange={(e)=>setContrasena(e.target.value)}/>
                    </div>
                    <div className="form-group">
                    <label>Correo </label>
                    <input type="text" className='form-control required'onChange={(e)=>setCorreo(e.target.value)}/>
                    </div>
                    </div>
                    <br/>
                    <button type='submit' clas="btn btn-outline-info">
                    <span clas="fa fa-save"></span><FaSave /> Almacenar 
                    </button>
                    <p/>
                    <button onClick={()=>salir()} to="/"> < FaBeer/> Regresar </button>
                  </form>
        
                  </div>
                 </div>
                </div>
             </div>
            </div>
          )
        }
/*
import * as React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';

export default function RegistrarCiudad() {
    const defaultMaterialTheme = createTheme();

    return(
        <div style={{ width: '100%', height: '100%' }}>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                    columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Surname', field: 'surname' },
                    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                    { title: 'Birth City', field: 'birthCity', lookup: { 1: 'Linz', 2: 'Vöcklabruck', 3: 'Salzburg' } }
                    ]}
                    data={[
                        { name: 'Max', surname: 'Mustermann', birthYear: 1987, birthCity: 1 },
                        { name: 'Cindy', surname: 'Musterfrau', birthYear: 1995, birthCity: 2 }
                    ]}
                    title="Personen"
                />
            </ThemeProvider>
        </div>
    );
}
*/

//export default RegistrarCiudad