import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { MdStars, MdAdd, MdRemove } from 'react-icons/md';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

const uuid = localStorage.getItem('uuid');
const rtoken = localStorage.getItem('rtoken');
const id_product = localStorage.getItem('producto');
var id_usuario = localStorage.getItem('id_user_invitacion');;




const headers = {
  'Content-Type': 'application/json',
};


var user_id = 0;
var user_address = 0;
var campana_id = 0;
var product_points = 0;
var product_id = 0;
var user_points = 0;

const FragmentProductSpecific = () => {
  const [amount, setAmount] = useState(1);
  const [showform, setshowform] = useState(false);

  const [inputs, setInputs] = useState({
    user: 0, // int
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

  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleOnAdd = () => {
    setAmount(amount + 1);
  };

  const handleOnRemove = index => {
    if (amount === 1) {
      console.log('No se puede restar mas')

    } else {
      setAmount(amount - 1);
    }

  };

  const showAddDireccion = () => {
    if (showform === false) {
      document.getElementById('ShowaddDireccion').style.display = "block"
      setshowform(!showform);
    } else {
      document.getElementById('ShowaddDireccion').style.display = "none"
      setshowform(!showform);
    }

  };

  useEffect(() => {
    axios.get(baseUrl + '/products/api/specific_product/' + id_product + '/', { headers })
      .then((response) => {
        product_id = response.data[0]["id"];
        campana_id = response.data[0]["campaigns_id"];
        product_points = response.data[0]["points"];
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [setList]);

  useEffect(() => {
    axios.get(baseUrl + '/products/gift/' + uuid + '/' + rtoken + '/', { headers })
      .then((response) => {
        user_id = response.data[0][0]["id"];
        user_points = response.data[0][0]["points"];
        setList2(response.data[1]);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [setList2]);

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
        window.location.href = "/product/" + id_product;
      })
      .catch(err => console.log(err));

    return false;
  }


  const postPedido = () => {
    var costo = amount * product_points;

    var checkboxes = document.getElementsByName('foo');
    for(var i=0, n=checkboxes.length;i<n;i++) {
      if(checkboxes[i].checked === true){
        user_address = checkboxes[i].value
      } 
    }

    if(user_address === 0){
      document.getElementById('alerta').style.display = 'block'
    }else{
      document.getElementById('alerta').style.display = 'none'
      if(costo <= user_points){
        document.getElementById('alertaCosto').style.display = 'none'
        axios.post(baseUrl+'/orders/api/order/', {
        user: user_id,
        useraddresses: user_address,
        campaigns: campana_id,
        date_delivery: "", // This field will be sent empty
        status: 'Pendiente', // The default value of this field is "Pendiente"
        products: product_id,
        amount: amount,
        gift_token: rtoken
      }, headers)
        .then((response) => {
          console.log('Status code: ' + response.status);
          handleShow();
          localStorage.clear();

        })
        .catch(err => handleShow1());

      }else{
        document.getElementById('alertaCosto').style.display = 'block'
      }
    }

  }









  return (

    <div>
      <div className="container" style={{ height: "100vh", position: "relative", paddingTop: 40, width: "85%" }}>
        <Row style={{ position: "absolute", top: "10%", transform: "translateY(-0%)" }}>

          <Col style={{ borderRight: "solid", borderWidth: 10, borderColor: "#E5E5E5" }}>
            {list.map((item) => (
              <div key={item.id} className="container" style={{ textAlign: "center" }}>
                <img className="imagentest" alt="" src={"https://wishesinpointsbucket.s3.amazonaws.com/" + item.image}></img>

                <h4>{item.product_name}</h4>
                <div className='row'>
                  <div className='col-8'>
                    <p style={{ textAlign: "justify" }}>{item.description}</p>
                  </div>
                  <div className='col-4'>
                    <p style={{ textAlign: "end" }}><MdStars style={{ fontSize: 28, color: "#7B3E90" }} />{item.points} puntos</p>
                  </div>
                </div>
              </div>

            ))}
          </Col>
          <Col>
            {list.map((item) => (
              <div key={item.id}>
                <div className="form-check">
                  <h4>{item.product_name}</h4>
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <h5><b>Cantidad: </b></h5>
                    <button style={{ marginRight: 10, fontSize: 25 }} onClick={handleOnRemove} className="btn"><MdRemove /></button>
                    <h4 style={{ marginRight: 10 }}>{amount}</h4>
                    <button style={{ marginRight: 10, fontSize: 25 }} onClick={handleOnAdd} className="btn"><MdAdd /></button>
                  </div>

                  <Row>
                    <Col>
                      <h5>Escoge direccion</h5>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <Button variant="danger" onClick={showAddDireccion}>Agregar direccion</Button>
                    </Col>
                  </Row>
                  <p id='alerta' style={{display:"none",color:"red"}}>Agrega o selecciona una direccion</p>
                  {list2.map((item) => (
                    <div key={item.id} style={{ paddingTop: 20 }}>
                      <input className="form-check-input" type="radio" name="foo"  value={item.id} ></input>
                      <label className="form-check-label" htmlFor="exampleRadios1">
                        <p>{item.id} {item.city} {item.state} {item.neighborhood} {item.street} {item.postal_code} {item.references}</p>
                      </label>
                    </div>
                  ))}
                  <Form onSubmit={handleSubmit} id="ShowaddDireccion" style={{ paddingTop: 30, display: "none" }}>
                    <Row className="mb-3" >
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
                    <div className='container' style={{ paddingRight: 0, textAlign: "right" }}>
                      <Button style={{ background: "#7B3E90", borderColor: "white" }} type="button" onClick={handleSubmit}>
                        Agregar
                      </Button>
                    </div>
                  </Form>

                </div>


                <div className="container" style={{ paddingRight: 0, textAlign: "right" }}>
                  <br></br>
                  <Button style={{ marginRight: 10 }} variant="secondary" onClick={event =>  window.location.href='/Reedem/'+uuid+'/'+rtoken}>Regresar</Button>
                  <Button variant="danger" onClick={postPedido}>Escoge este regalo</Button>
                  <p id='alertaCosto' style={{display:"none",color:"red"}}>No cuenta con los puntos suficientes</p>
                </div><br />

              </div>
            ))}
          </Col>
        </Row>
      </div>


      <Modal show={show} size="md" >
        <Modal.Body style={{ backgroundColor: "#FFF" }}>
          <div>
            <div>
              <h4 style={{ fontWeight: 300, paddingTop: 15 }}>Pedido realizado con exito</h4>
              <p style={{ fontSize: 24, fontWeight: 300 }}>Inicia sesion para poder ver tus pedidos</p>
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



    </div>

  )

}
export default FragmentProductSpecific;