import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const FragmentLogout = () => {
    let history = useHistory();


    function methodName() {
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
        <>
            <div className="l-navbar" id="nav-bar">
                <nav className="nav">
                    <div>
                        <div className="nav_list">
                            <a href="/home/" className="nav_link"> <i className='bx bx-home nav_icon'></i></a>
                            <a href="/misregalos/" className="nav_link"> <i className='bx bx-gift nav_icon'></i></a>
                            <a href="/miperfil/" className="nav_link"> <i className='bx bx-user nav_icon'></i></a>
                            <a href="/misdirecciones/" className="nav_link"> <i className='bx bx-directions nav_icon' ></i> </a>
                            <a href="/logout/" style={{ color: "blueviolet" }} className="nav_link bx-tada"> <i className='bx bx-log-out-circle nav_icon'></i></a>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="height-100">
                <div className="container">
                    <br></br>
                    <h4 style={{ fontWeight: 300 }}>Cerrar</h4>
                    <h3 style={{ fontSize: 34, fontWeight: "bold" }}>Sesion</h3>
                </div>
                <div className="container">
                    <h2 style={{ fontWeight: 300 }}>¿Seguro que quieres cerrar sesion?</h2>
                    <Button style={{ borderRadius: 20 }} onClick={() => history.goBack()} variant="secondary">Regresar</Button>
                    <Button style={{ marginLeft: 10, background: "#7B3E90", borderRadius: 20, borderColor: "white" }} type="button" onClick={() => { methodName(); }} >Cerrar Sesion</Button>
                </div>
            </div>

        </>
    )

}
export default FragmentLogout;