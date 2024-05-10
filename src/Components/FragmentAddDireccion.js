import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import '../config';
var baseUrl = global.config.wishes.inPoints.url;


var id_usuario = localStorage.getItem('id_usuario');

const FragmentAddDireccion = () => {
    let history = useHistory();
    const [inputs, setInputs] = useState({
        user: 2, // int
        first_name: "", //This field can be left empty
        last_name: "",  //This field can be left empty
        street: "",
        neighborhood: "",
        street_number: "",
        apartment_number: "",
        postal_code: 0, // int
        city: "",
        state: "",
        phone: "", //This field can be left empty
        references: "",
        email: "", //This field can be left empty
    })


    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    const handleSubmit = (event) => {
        axios.post(baseUrl+'/useraddresses/api/register/', {
            user: id_usuario,
            first_name: inputs.avenida,
            last_name: "",
            street: inputs.street,
            neighborhood: inputs.neighborhood,
            street_number: "1",
            apartment_number: "1",
            postal_code: inputs.postal_code,
            city: inputs.city,
            state: inputs.state,
            phone: inputs.phone,
            references: inputs.references,
            email: inputs.email
        })
            .then((response) => {
                //console.log(response);
                window.location.href = "/misdirecciones/";
            })
            .catch(err => console.log(err));

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
                            <a href="/miperfil/" className="nav_link"> <i className='bx bx-user nav_icon'></i></a>
                            <a href="/misdirecciones/" style={{ color: "blueviolet" }} className="nav_link"> <i className='bx bx-directions bx-tada nav_icon' ></i> </a>
                            <a href="/logout/" className="nav_link"> <i className='bx bx-log-out-circle nav_icon'></i></a>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="height-100">
                <div className="container">
                    <div>
                        <h4 style={{ fontWeight: 300, paddingTop: 15 }}>Agregar</h4>
                        <div className="row">
                            <div className="col">
                                <h3 style={{ fontSize: 34, fontWeight: "bold" }}>Direccion</h3>
                            </div>
                        </div>
                    </div>
                    <hr style={{ height: 9 }}></hr>
                </div>

                <div className="container">
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Calle</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required type="text" name="street" value={inputs.street} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="">
                                <Form.Label>Avenida</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required type="text" name="avenida" value={inputs.avenida} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="">
                                <Form.Label>Barrio/Colonia</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required type="text" name="neighborhood" value={inputs.neighborhood} onChange={handleChange} />
                            </Form.Group>


                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required type="text" name="city" value={inputs.city} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required type="text" name="state" value={inputs.state} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Codigo Postal (CP)</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required type="number" name="postal_code" value={inputs.postal_code} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="">
                                <Form.Label>Num. exterior</Form.Label>
                                <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required type="number" name="phone" value={inputs.phone} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Email</Form.Label>
                            <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required name="email" value={inputs.email} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Informacion adicional</Form.Label>
                            <Form.Control style={{ backgroundColor: "#BFBFBF", borderRadius: 20 }} required name="references" value={inputs.references} onChange={handleChange} />
                        </Form.Group>
                        <Button style={{ background: "#7B3E90", borderColor: "white" }} type="button" onClick={handleSubmit}>
                            Agregar
                        </Button>
                        <Button style={{ marginLeft: 10 }} onClick={() => history.goBack()} variant="secondary">
                            Regresar
                        </Button>
                    </Form>
                </div>

            </div>
        </>
    )

}
export default FragmentAddDireccion;