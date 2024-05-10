import React, { useState, useEffect } from 'react';
import { MdStars } from 'react-icons/md';
import axios from 'axios';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import '../config';

var baseUrl = global.config.wishes.inPoints.url;


//const imguRL = 'https://wishesinpointsbucket.s3.amazonaws.com/';

var token = localStorage.getItem('token');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const FragmentPerfilUpdate = () => {
    var username = localStorage.getItem('username');
    let history = useHistory();
    const [listName, setListName] = useState([]);
    const [listImg, setListImg] = useState([]);
    const [inputs1, setInputs1] = useState({
        phone: "", //This field can be left empty
    })
    const [inputs2, setInputs2] = useState({
        email: "", //This field can be left empty
    })
    const [inputs3, setInputs3] = useState({
        old_password: "", //This field can be left empty
        new_password: "",
        new_password1: "",
    })


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    useEffect(() => {
        try {
            axios.get(baseUrl+'/users/api/profile/' + username + '/', { headers })
                .then((response) => {
                    setListName(response.data[0][0]);
                    setListImg(response.data[1][0]);
                    setInputs2(response.data[0][0]);
                    setInputs1(response.data[1][0]);


                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setListName], [setListImg])


    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs1(values => ({ ...values, [name]: value }))
        setInputs2(values => ({ ...values, [name]: value }))
        setInputs3(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        axios.put(baseUrl+'/users/api/update_email_phone/' + username + '/', {
            phone: inputs1.phone,
            email: inputs2.email
        }, {
            headers: {
                "Authorization": "Token " + token
            }
        })
            .then((response) => {
                //console.log(response);
                window.location.href = "/miperfil";
            })
            .catch(err => console.log(err));

        return false;
    }

    const handleSubmitPassword = (event) => {
        if (inputs3.new_password === inputs3.new_password1) {
            axios.put(baseUrl+'/password_reset/api/change-password/' + username + "/", {
                old_password: inputs3.old_password,
                new_password: inputs3.new_password
            }, {
                headers: {
                    "Authorization": "Token " + token
                }
            })
                .then((response) => {
                    //console.log(response);
                    handleShow();
                    localStorage.clear();
                    //window.location.href = "/miperfil";w
                })
                .catch(err => handleShow1());
        }
        return false;
    }



    return (
        <>
            <div className="l-navbar" id="nav-bar">
                <nav className="nav">
                    <div>
                        <div className="nav_list">
                            <a href="/home/" className="nav_link"> <i className='bx bx-home nav_icon'></i></a>
                            <a href="/misregalos/" className="nav_link"> <i className='bx bx-gift nav_icon'></i></a>
                            <a href="/miperfil/" style={{ color: "blueviolet" }} className="nav_link"> <i className='bx bx-user bx-tada nav_icon'></i></a>
                            <a href="/misdirecciones/" className="nav_link"> <i className='bx bx-directions nav_icon' ></i> </a>
                            <a href="/logout/" className="nav_link"> <i className='bx bx-log-out-circle nav_icon'></i></a>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="height-100">
                <div className="container">
                    <div>
                        <h4 style={{ fontWeight: 300, paddingTop: 15 }}>Actualizar</h4>
                        <h3 style={{ fontSize: 34, fontWeight: "bold" }}>Perfil</h3>
                    </div>
                </div>
                <div className="container" style={{ backgroundColor: "#BFB3CF" }}>
                    <div className="row">
                        <div style={{ position: "relative" }} className="col-sm">
                            {
                                (listImg.image) === ''
                                    ? <img style={{ width: "80%" }} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                                    : <img style={{ width: "80%" }} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/' + listImg.image}></img>
                            }

                        </div>
                        <div style={{ paddingTop: 10, paddingBottom: 10, textAlign: "center", alignSelf: "center" }} className="col-sm">
                            <h3 style={{ fontSize: 34, fontWeight: "bold" }}>{listName.first_name + " " + listName.last_name}</h3>
                        </div>
                        <div style={{ paddingTop: 10, paddingBottom: 10, textAlign: "right" }} className="col-sm">
                            <h4 style={{ fontSize: 34, fontWeight: "bold" }}><MdStars style={{ color: "#7B3E90" }} />{listImg.points + " pts"}</h4>
                        </div>
                    </div>
                </div>
                <div className="container"><br></br>

                    <Form style={{ width: "50%" }}>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} disabled={true} required type="text" value={listName.first_name} name="street" />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} disabled={true} required type="text" value={listName.last_name} name="first_name" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required type="number" name="phone" value={inputs1.phone} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Email</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required type="text" name="email" value={inputs2.email} onChange={handleChange} />
                            </Form.Group>


                        </Row>

                        <div style={{ textAlign: "right" }}>
                            <Button onClick={() => history.goBack()} variant="secondary">
                                Regresar
                            </Button>
                            <Button style={{ marginLeft: 10, background: "#7B3E90", borderColor: "white" }} type="button" onClick={handleSubmit} >
                                Editar
                            </Button>

                        </div>
                    </Form>


                    <hr style={{ height: 9 }}></hr>
                </div>

                <div className="container">
                    <div>
                        <h4 style={{ fontWeight: 300, paddingTop: 15 }}>Cambiar</h4>
                        <h3 style={{ fontSize: 34, fontWeight: "bold" }}>Contraseña</h3>
                        <p style={{ fontSize: 24, fontWeight: 300 }}>Por tu seguridad introduce tu contraseña</p>
                        <p style={{ fontSize: 18, fontWeight: 300 }}>* Al cambiar tu contraseña deberas iniciar sesion *</p>
                        <br></br>
                    </div>

                    <Form style={{ width: "50%" }}>
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Actual contraseña</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required type="password" name="old_password" value={inputs3.old_password} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">


                            <Form.Group as={Col} >
                                <Form.Label>Nueva contraseña</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required type="password" name="new_password" value={inputs3.new_password} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Repetir nueva contraseña</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required type="password" name="new_password1" value={inputs3.new_password1} onChange={handleChange} />
                            </Form.Group>
                        </Row>


                        <div style={{ textAlign: "right" }}>
                            <Button onClick={() => history.goBack()} variant="secondary">
                                Regresar
                            </Button>
                            <Button style={{ marginLeft: 10, background: "#7B3E90", borderColor: "white" }} type="button" onClick={handleSubmitPassword} >
                                Editar
                            </Button>

                        </div>
                    </Form>
                    <br></br>
                </div>
            </div>



            <Modal show={show} size="md" >
                <Modal.Body style={{ backgroundColor: "#FFF" }}>
                    <div>
                        <div>
                            <h4 style={{ fontWeight: 300, paddingTop: 15 }}>Cambio de</h4>
                            <h3 style={{ fontSize: 34, fontWeight: "bold" }}>Contraseña</h3>
                            <p style={{ fontSize: 24, fontWeight: 300 }}>Tu contraseña ha sido cambiada con exito</p>
                        </div>
                        <div className="container" style={{ textAlign: "center" }}>
                            <button style={{ borderRadius: 15, backgroundColor: "#7B3E90", color: "white" }} className="btn" onClick={event => window.location.href = '/login'} >Volver</button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={show1} size="md" onHide={handleClose1} >
                <Modal.Body style={{ backgroundColor: "#FFF" }}>
                    <div>
                        <div>
                            <h4 style={{ fontWeight: 300, paddingTop: 15 }}>Error</h4>
                            <h3 style={{ fontSize: 34, fontWeight: "bold" }}>Upsss...</h3>
                            <p style={{ fontSize: 24, fontWeight: 300 }}>Ha ocurrido un error, intentalo mas tarde</p>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )

}
export default FragmentPerfilUpdate;