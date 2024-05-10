import React from 'react';
import { Button } from 'react-bootstrap';
import MenuSuperAdmin from './MenuSuperAdmin';

const SuperAdminSalir = () =>{

    function methodName() {
        localStorage.clear();
        window.location.href = "/login";
      }

    return(    
        <>
        <div className="l-navbar" style={{padding:"1rem 0rem 0 0"}} id="nav-bar">
            <nav className="nav">
                <div>
                    <div className="nav_list">
                        <MenuSuperAdmin></MenuSuperAdmin>            
                    </div>
                </div>
            </nav>
        </div>
        <div className="height-100">
            <div className="container">
                <br></br>
                <h4 style={{fontWeight: 300}}>Cerrar</h4>
                <h3 style={{fontSize:34, fontWeight:"bold"}}>Sesion</h3>
            </div>
            <div className="container">
                <h2 style={{fontWeight: 300}}>¿Seguro que quieres cerrar sesion?</h2>
                <Button style={{borderRadius: 20}}  variant="secondary" onClick={event =>  window.location.href='/superadmin/home/'}>Regresar</Button>
                <Button style={{marginLeft:10,background:"#7B3E90",borderRadius: 20,borderColor:"white"}} type="button" onClick = {() => { methodName();} } >Cerrar Sesion</Button>
            
            </div>
        </div>
        
         


        </>
    )

}
export default SuperAdminSalir;