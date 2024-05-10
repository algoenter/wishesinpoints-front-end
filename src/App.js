import './App.css';
import React from "react";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


import FragmentReedem from './Components/FragmentReedem';
import FragmentCatalog from './Components/FragmentCatalog';
import FragmentProductSpecific from './Components/FragmentProductSpecific';
import FragmentHomeUser from './Components/FragmentHomeUser';
import FragmentRegalos from './Components/FragmentRegalos';
import FragmentLogin from './Components/FragmentLogin';
import FragmentPerfil from './Components/FragmentPerfil';
import FragmentDetalleCanje from './Components/FragmentDetalleCanje';
import FragmentCancelarCanje from './Components/FragmentCancelOrder';
import FragmentDirecciones from './Components/FragmentDirecciones';
import FragmentAddDirecciones from './Components/FragmentAddDireccion';
import FragmentUpdateDirecciones from './Components/FragmentUpdateDireccion';
import FragmentPerfilUpdate from './Components/FragmentPerfilUpdate';
import FragmentLogout from './Components/FragmentLogout';
import FragmentRegistro from './Components/FragmentRegister';
import ForgotPassword from './Components/ForgotPassword';
import RestorePassword from './Components/RestorePassword';


//Fragmentos de administrador
import FragmentAdminHome from './Components/FragmentAdminHome';
import FragmentAdminRegalos from './Components/FragmentAdminRegalos';
import FragmentAdminDetalleCanje from './Components/FragmentAdminDetalleCanje';
import FragmentAdminPerfiles from './Components/FragmentAdminPerfiles';
import FragmentAdminListaProducto from './Components/FragmentAdminListaProducto';
import FragmentAdminSalir from './Components/FragmentAdminSalir';

//Fragmentos de Super Admin
import SuperAdminHome from './Components/SuperAdminHome';
import SuperAdminRegalos from './Components/SuperAdminRegalos';
import SuperAdminCrearCampana from './Components/SuperAdminCampana';
import SuperAdminCrearProducto from './Components/SuperAdminCrearProducto';
import SuperAdminPerfiles from './Components/SuperAdminPerfiles';
import SuperAdminAddUser from './Components/SuperAdminAddUser';
import SuperAdminUserCampana from './Components/SuperAdminUserCampana';
import SuperAdminDelUserCampana from './Components/SuperAdminDelUserCampana';
import SuperAdminEnviarInvitacion from './Components/SuperAdminEnviarInvitacion';
import SuperAdminAddPlantilla from './Components/SuperAdminAddPlantilla';
import SuperAdminListaPlantilla from './Components/SuperAdminListaPlantillas';
import SuperAdminListaMarca from './Components/SuperAdminListaMarca';
import SuperAdminListaCategoria from './Components/SuperAdminListaCategoria';
import SuperAdminListCampaings from './Components/SuperAdminListCampaings';
import SuperAdminListaProductos from './Components/SuperAdminListaProductos';
import SuperAdminSalir from './Components/SuperAdminSalir';
import SuperAdminDetallesCanje from './Components/SuperAdminDetallesCanje';




var token = localStorage.getItem('token');

function App() {
  return (
    <div className="App" style={{width:"100%", height:"100vh"}}>
      <Router >        
        <Switch>
        <Route exact path="/">
          <FragmentLogin />
        </Route>


        <Route path="/Reedem/:uuid/:rtoken">
            <FragmentReedem></FragmentReedem>
        </Route>
        <Route path="/catalogo">
          <FragmentCatalog></FragmentCatalog>
        </Route>
        <Route path="/product/">
          <FragmentProductSpecific></FragmentProductSpecific>
        </Route>


        <Route path="/registrarse">
          <FragmentRegistro></FragmentRegistro>
        </Route>
        <Route path="/recover/password/">
          <ForgotPassword></ForgotPassword>
        </Route>
        <Route path="/password_reset/api/reset/:uuid/:rtoken">
            <RestorePassword></RestorePassword>
        </Route>

        <Route path="/login" render={() => {
          return token ? <Redirect to='/home'></Redirect> : <FragmentLogin></FragmentLogin>
        }}>
        </Route>
        <Route path="/home/" render={() => {
          return token ? <FragmentHomeUser></FragmentHomeUser> : <FragmentLogin></FragmentLogin>
        }}>
        </Route>
        <Route path="/misregalos" render={() => {
          return token ? <FragmentRegalos></FragmentRegalos> : <FragmentLogin></FragmentLogin>
        }}>
        </Route>
        <Route path="/miperfil" render={() => {
          return token ? <FragmentPerfil></FragmentPerfil> : <FragmentLogin></FragmentLogin>
        }}>
        </Route>
        <Route path="/actualizar-perfil" render={() => {
          return token ? <FragmentPerfilUpdate></FragmentPerfilUpdate> : <FragmentLogin></FragmentLogin>
        }}>
        </Route>

        <Route path="/misdirecciones" render={() => {
          return token ? <FragmentDirecciones></FragmentDirecciones> : <FragmentLogin></FragmentLogin>
        }}>
        </Route>
        <Route path="/add-direccion" render={() => {
          return token ? <FragmentAddDirecciones></FragmentAddDirecciones> : <FragmentLogin></FragmentLogin>
        }}>
        </Route>
        <Route path="/update-direccion/:iddireccion" render={() => {
          return token ? <FragmentUpdateDirecciones></FragmentUpdateDirecciones> : <FragmentLogin></FragmentLogin>
        }}>
        </Route>

        <Route path="/logout" render={() => {
          return token ? <FragmentLogout></FragmentLogout> : <FragmentLogin></FragmentLogin>
        }}>
        </Route>
        
        
        
        <Route path="/detallesCanje/:idproduct/">
            <FragmentDetalleCanje></FragmentDetalleCanje>
          </Route>
        <Route path="/cancelarCanje/:idorder/">
          <FragmentCancelarCanje></FragmentCancelarCanje>
        </Route>


        <Route path="/admin/home/">
          <FragmentAdminHome></FragmentAdminHome>
        </Route>
        <Route path="/admin/regalos/">
          <FragmentAdminRegalos></FragmentAdminRegalos>
        </Route>
        <Route path="/admin/detallesCanje/:idorder/">
          <FragmentAdminDetalleCanje></FragmentAdminDetalleCanje>
        </Route>
        <Route path="/admin/administrarperfiles/">
          <FragmentAdminPerfiles></FragmentAdminPerfiles>
        </Route>
        <Route path="/admin/listaproducto/">
          <FragmentAdminListaProducto></FragmentAdminListaProducto>
        </Route>
        <Route path="/admin/salir/">
          <FragmentAdminSalir></FragmentAdminSalir>
        </Route>


        <Route path="/superadmin/home/">
          <SuperAdminHome></SuperAdminHome>
        </Route>
        
        <Route path="/superadmin/lista-pedidos/">
          <SuperAdminRegalos></SuperAdminRegalos>
        </Route>
        <Route path="/superadmin/detallescanje/:idorder/:iduser">
          <SuperAdminDetallesCanje></SuperAdminDetallesCanje>
        </Route>

        <Route path="/superadmin/lista-Productos/">
          <SuperAdminListaProductos></SuperAdminListaProductos>
        </Route>

        <Route path="/superadmin/crearproducto/">
          <SuperAdminCrearProducto></SuperAdminCrearProducto>
        </Route>

        <Route path="/superadmin/administrarperfiles/">
          <SuperAdminPerfiles></SuperAdminPerfiles>
        </Route>
        <Route path="/superadmin/addUser/">
          <SuperAdminAddUser></SuperAdminAddUser>
        </Route>
        <Route path="/superadmin/AddUser-Campaña/">
          <SuperAdminUserCampana></SuperAdminUserCampana>
        </Route>
        <Route path="/superadmin/DelUser-Campaña/">
          <SuperAdminDelUserCampana></SuperAdminDelUserCampana>
        </Route>
        <Route path="/superadmin/enviar-Invitacion/">
          <SuperAdminEnviarInvitacion></SuperAdminEnviarInvitacion>
        </Route>

        <Route path="/superadmin/lista-Plantillas/">
          <SuperAdminListaPlantilla></SuperAdminListaPlantilla>
        </Route>
        <Route path="/superadmin/addPlantilla/">
          <SuperAdminAddPlantilla></SuperAdminAddPlantilla>
        </Route>

        <Route path="/superadmin/lista-Marcas/">
          <SuperAdminListaMarca></SuperAdminListaMarca>
        </Route>

        <Route path="/superadmin/lista-Categorias/">
          <SuperAdminListaCategoria></SuperAdminListaCategoria>
        </Route>

        <Route path="/superadmin/lista-Campañas/">
          <SuperAdminListCampaings></SuperAdminListCampaings>
        </Route>
        
        <Route path="/superadmin/AddCampaings/">
          <SuperAdminCrearCampana></SuperAdminCrearCampana>
        </Route>
        
        <Route path="/superadmin/salir/">
          <SuperAdminSalir></SuperAdminSalir>
        </Route>


        </Switch>
      </Router>
    </div>
  );
}

export default App;
