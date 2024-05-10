import { Form, Button,Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios'; // npm install axios
import imgLogin from '../images/loginimg.png';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var username = '';

const FragmentLogin = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        oldpassword:"",
        newpassword:"",
    })
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);  

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);  


    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    const handleSubmit = (event) => {
        axios.post(baseUrl+'/access/api/login/',{
            email: inputs.email,
            password: inputs.password
        })
            .then((response) => {
                //console.log(response);
                localStorage.clear();
                if(response.data.is_admin){
                    if(response.data.is_super){
                        localStorage.setItem('tokenSuperAdmin',response.data["token"]);
                        localStorage.setItem('id_usuarioSuperAdmin',response.data["pk"]);
                        localStorage.setItem('usernameSuperAdmin',response.data["username"]);
                        window.location.href = "/superadmin/home";

                    }else{
                        localStorage.setItem('tokenAdmin',response.data["token"]);
                        localStorage.setItem('id_usuarioAdmin',response.data["pk"]);
                        localStorage.setItem('usernameAdmin',response.data["username"]);
                        window.location.href = "/admin/home";
                    }
                    
                }else{
                    localStorage.setItem('token',response.data["token"]);
                    localStorage.setItem('id_usuario',response.data["pk"]);
                    localStorage.setItem('username',response.data["username"]);
                    window.location.href = "/home";
                }
                

            })
            .catch(err =>{
                if(err.response.status === 423){
                    username = err.response.data.username;
                    handleShow();

                }else{
                    handleShow1();
                }
            });
        return false;
    }

    
    const submitSetpassword = (event) => {
        axios.put(baseUrl+'/password_reset/api/change-password-ft/'+username+'/',{
            old_password: inputs.oldpassword,
            new_password: inputs.newpassword
        })
            .then((response) => {
                //console.log(response);
                window.location.href = "/login"

            })
            .catch(err =>console.log(err));
        return false;
    }


    return (
        <>
            <div className="container" style={{ paddingTop: 80, width: "70%" }}>
                <div style={{backgroundColor:"#C5C5C5",borderRadius:15}} className="card">
                    <div className="card-body">
                        <div className="grid-login">
                            <div style={{alignSelf:"center"}}>
                                <img alt="" style={{width:"80%"}} src={imgLogin}></img>
                            </div>
                            <div>
                                <br></br>
                                <h5 style={{fontSize:30,fontWeight:30}}>¡Bienvenido a</h5>
                                <h5 style={{fontSize:37,fontWeight:"bold"}}>Wishes in Points</h5><br></br>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control style={{ backgroundColor: "#FFF", color: "#000", borderRadius: 20 }} required name="email" value={inputs.email} onChange={handleChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control type="password" style={{ backgroundColor: "#FFF", color: "#000", borderRadius: 20 }} required name="password" value={inputs.password} onChange={handleChange} />
                                    </Form.Group>
                                    <div>
                                        <a href='/recover/password/'>¿Olvidaste tu contraseña?</a>
                                    </div>
                                    <div>
                                        <p>¿No tienes una cuenta? <a href='/registrarse'><b style={{color:"#614899",display:"inline-block"}}>Registrate</b></a></p>
                                    </div>                                    
                                    
                                    <Button style={{float:"right",borderRadius:15}} variant="danger" type="button" onClick={handleSubmit}>
                                        Entrar
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <Modal show={show1} size="md" onHide={handleClose1} >
        <Modal.Body style={{backgroundColor:"#FFF"}}>
        <div>
        <div>
            <h4 style={{fontWeight: 300,paddingTop:15}}>Error</h4>
            <h3 style={{fontSize:34, fontWeight:"bold"}}>Upsss...</h3> 
            <p style={{fontSize:24, fontWeight:300}}>Ha ocurrido un error, intentalo mas tarde</p>    
        </div>

        </div>
            </Modal.Body>
        </Modal>


        <Modal show={show} size="md" >
        <Modal.Body style={{backgroundColor:"#FFF"}}>
        <div>
        <div>
            <h4 style={{fontWeight: 300,paddingTop:15}}>¡Atencion!</h4>
            <h3 style={{fontSize:34, fontWeight:"bold"}}>Para continuar debes actualizar tu contraseña.</h3> 

            <Form onSubmit={submitSetpassword}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Contraseña actual:</Form.Label>
                    <Form.Control type="password" style={{ backgroundColor: "#FFF", color: "#000", borderRadius: 20 }} required name="oldpassword" value={inputs.oldpassword} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Nueva contraseña</Form.Label>
                    <Form.Control type="password" style={{ backgroundColor: "#FFF", color: "#000", borderRadius: 20 }} required name="newpassword" value={inputs.newpassword} onChange={handleChange} />
                </Form.Group>                               
                
                <Button style={{float:"right",borderRadius:15}} variant="danger" type="button" onClick={submitSetpassword}>
                    Entrar
                </Button>
            </Form>
            
        </div>

        </div>
            </Modal.Body>
        </Modal>
        </>
    )

}
export default FragmentLogin;