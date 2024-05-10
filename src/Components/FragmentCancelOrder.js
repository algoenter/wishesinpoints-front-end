import React, {useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../config';

var baseUrl = global.config.wishes.inPoints.url;
var token = localStorage.getItem('token');
var id_usuario = localStorage.getItem('id_usuario');

const FragmentCancelOrder = () =>{
    var { idorder } = useParams(); // params
    const [inputs, setInputs] = useState({
        password: ""
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        axios.post(baseUrl+'/users/api/check_password/'+id_usuario+'/',{
            current_password: inputs.password
        },{
            headers:{
                "Authorization" : "Token "+token
            }
        })
        .then((response) => {
            console.log(response);
            axios.put(baseUrl+'/orders/api/cancel/'+idorder+'/',{
                '':''
            },{
                headers:{
                    "Authorization" : "Token "+token
                }
            })
            .then((response) => {
                //console.log(response);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
        return false;
    }




    return(    
        <>
        <div className="l-navbar" id="nav-bar">
        <nav className="nav">
            <div>
                <div className="nav_list">
                    <a href="/home/" className="nav_link"> <i className='bx bx-home nav_icon'></i></a>
                    <a href="/regalos/" style={{color:"blueviolet"}} className="nav_link"> <i className='bx bx-gift bx-tada nav_icon'></i></a> 
                    <a href="/miperfil/" className="nav_link"> <i className='bx bx-user nav_icon'></i></a> 
                    <a href="/misdirecciones/" className="nav_link"> <i className='bx bx-directions nav_icon' ></i> </a> 
                    <a href="/logout/" className="nav_link"> <i className='bx bx-log-out-circle nav_icon'></i></a> 
                </div>
            </div>
        </nav>
        </div>
        <div>
            <div className="container">
                <br></br>
                <h4 style={{fontWeight: 300}}>Detalles del</h4>
                <h3 style={{fontSize:34, fontWeight:"bold"}}>Canje</h3><br></br>
            </div>
            <div className="container" style={{backgroundColor:"#BFB3CF",contain:"content",paddingBottom:10}}>

                    <h3>¿Segur@ que quieres cancelar el canje de tu regalo?</h3>

                    <p>Por tu seguridad introduce tu contraseña para cancelar el canje</p>

                    <div style={{width:"50%"}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" style={{ backgroundColor: "#FFF", color: "#000", borderRadius: 20 }} required name="password" value={inputs.password} onChange={handleChange} />
                            </Form.Group>
                            <Button style={{float:"right",borderRadius:15}} variant="danger" type="button" onClick={handleSubmit}>Cancelar pedido</Button>
                            <Button style={{ marginRight:10,float:"right",borderRadius:15}} variant="primary" type="button" >Regresar</Button>
                        </Form>
                    </div>
                    
            </div>
            <hr style={{height: 9}}></hr>
        </div>
        
         


        </>
    )

}
export default FragmentCancelOrder;