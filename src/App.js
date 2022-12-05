import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Barra from './componentes/Barra';
import Login from './componentes/Login';
import Index from './componentes/Index';
import RegistrarPersona from './componentes/RegistrarPersona';
import VerPersona from './componentes/VerPersona';
import RegistrarCiudad from './componentes/RegistrarCiudad';
import Verciudad from './componentes/Verciudad';

function App() {
  return ( 
    <Router>
       <Barra/>
       <Route path='/' exact component={Login}/>
       <Route path='/index' exact component={Index}/>
       <Route path='/registrarPersona' exact component={RegistrarPersona}/>
       <Route path='/registrarCiudad' exact component={RegistrarCiudad}/>
       <Route path='/verPersonas' exact component={VerPersona}/>
       <Route path='/verCiudades' exact component={Verciudad}/>
    </Router>
  );
}
export default App;
/*

*/