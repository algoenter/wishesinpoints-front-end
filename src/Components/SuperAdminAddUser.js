import React, {useState} from 'react';
import { Form,Button,Row,Col,Modal } from 'react-bootstrap';
import axios from 'axios';
import MenuSuperAdmin from './MenuSuperAdmin';

import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var token = localStorage.getItem('tokenSuperAdmin');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const SuperAdminAddUser = () =>{
    const [selectedFile, setSelectedFile] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [listUserErr, setlistUserErr] = useState([]);

    const [inputs, setInputs] = useState({
      first_name:"",
      last_name:"",
      email:"",
      phone:0,
    })


    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    const handleSubmit = (event) => {
      axios.post(baseUrl+'/users/api/register-admin/win/',{
        first_name:inputs.first_name,
        last_name:inputs.last_name,
        email:inputs.email,
        phone:inputs.phone,
        typeofuser:document.getElementById('selectTipoUser').value,
      }    
      ,{headers})
      .then((response) => {
          //console.log(response);
          window.location.href = "/superadmin/administrarperfiles/"
      })
      .catch(err => {
          console.log(err);
      });
    
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
      }

    const handleSubmitExcel = (event) => {
        event.preventDefault()
        let formData = new FormData();
        formData.append('pathfile', selectedFile)

        axios.post(baseUrl+'/uploadfiles/api/upload-customer/', 
        formData    
        ,{headers})
        .then((response) => {
            //console.log(response);
            window.location.href = "/superadmin/administrarperfiles/";

        }).catch(err => {
            setlistUserErr(err.response.data[1])
            document.getElementById("mensaje").style.display = "block"
        });
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
                    <div>
                        <h4 style={{fontWeight: 300,paddingTop:15}}>Agregar</h4>
                        <div className="row">
                                <div className="col">
                                    <h3 style={{fontSize:34, fontWeight:"bold"}}>Usuario</h3> 
                                </div>
                                <div className="col" style={{textAlign:"right"}}>
                                <Button style={{backgroundColor:"#7B3E90",borderColor:"#7B3E90"}} onClick = {() => { handleShow()} }>Subir por excel</Button>
                                </div>
                            </div>
                    </div>
                    <hr style={{height: 9}}></hr>
            </div>

            <div className="container">
              <Form onSubmit={handleSubmit}>
                    <Row className="mb-3" style={{marginTop: 15}}>
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Nombre *</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="first_name" value={inputs.first_name} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Apellidos *</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="last_name" value={inputs.last_name} onChange={handleChange}/>
                        </Form.Group>

                    </Row>
                    <Row className="mb-3" style={{marginTop: 15}}>
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="email" value={inputs.email} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Telefono *</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="number" name="phone" value={inputs.phone} onChange={handleChange}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Tipo de usuario</Form.Label>
                        <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} aria-label="Default select example" id='selectTipoUser'>
                            <option value={1}>Administrador</option>
                            <option value={2}>Customer</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <p id='msgerror' style={{color:"red",display:"none"}}>Error, verifica que los campos no esten vacios o intentalo mas tarde.</p>
                    <div className='container' style={{textAlign:"right"}}>
                    <Button style={{background:"#7B3E90",borderColor:"white"}} type="button" onClick={handleSubmit}>
                        Agregar
                    </Button>
                    </div>
                    </Form>    
            </div>

            
            
        </div>

        <Modal  show={show} size="md" onHide={handleClose} >
            <Modal.Body style={{margin:20}}>
            <div>
                <h4>Subir usuarios por excel</h4>
                <form onSubmit={handleSubmitExcel}>
                <input type="file" onChange={handleFileSelect} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" /><br></br><br></br>
                <Button type="submit" value="Upload File" style={{backgroundColor:"#7B3E90",borderColor:"#7B3E90"}}>Cargar</Button>
                </form>

                <div>
                    <p id="mensaje" style={{display:"none"}}>Hubo unos errores al subir estos usuarios, verifica sus datos:</p>
                    {listUserErr.map((item,index)=>(
                        <li key={index} style={{color:"red"}}>{item.email}</li>
                    ))}
                </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    )

}
export default SuperAdminAddUser;