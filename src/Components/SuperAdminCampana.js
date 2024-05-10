import React, {useState,useEffect} from 'react';
import { Form,Button,Row,Col } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import MenuSuperAdmin from './MenuSuperAdmin';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var token = localStorage.getItem('tokenSuperAdmin');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const SuperAdminCrearCampana = () =>{
    let history = useHistory();
    const [listMarcas, setListMarcas] = useState([]);
    const [listPlantiallas, setlistPlantiallas] = useState([]);

    const [inputs, setInputs] = useState({
        campaign_name:"",
        points:0,
        slug: "",
    })


    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/brands/api/get_list/',{
            brand_name:""
          },{ headers })
          .then((response) => {
            setListMarcas(response.data);
            //console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setListMarcas])

      useEffect(() =>{  
        try {
          axios.post(baseUrl+'/plantillas/api/get_list/',{
            template_name:""
          },{ headers })
          .then((response) => {
            setlistPlantiallas(response.data);
            //console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setlistPlantiallas])



    const handleSubmit = (event) => {
        console.log(document.getElementById('fechaInicio').value);
        console.log(document.getElementById('fechaFin').value);
        console.log(document.getElementById('selectMarca').value);
        console.log(document.getElementById('selectPlantilla').value);
        console.log(document.getElementById('selectStatus').value);
        
        axios.post(baseUrl+"/campaigns/api/register/", {
            brands: document.getElementById('selectMarca').value,
            plantillas: document.getElementById('selectPlantilla').value,
            campaign_name: inputs.campaign_name,
            status: document.getElementById('selectStatus').value,
            slug: inputs.slug,
            start_date:document.getElementById('fechaInicio').value + ' 19:48:28.182647-05',
            end_date:document.getElementById('fechaFin').value+' 19:48:28.182647-05',
        },{headers})
        .then((response) => {
            //console.log(response);
            window.location.href = "/superadmin/lista-Campañas/";
        })
        .catch(err => console.log(err));

        return false;


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
                        <h4 style={{fontWeight: 300,paddingTop:15}}>Crear</h4>
                        <div className="row">
                                <div className="col">
                                    <h3 style={{fontSize:34, fontWeight:"bold"}}>Nueva campaña</h3> 
                                </div>
                            </div>
                    </div>
                    <hr style={{height: 9}}></hr>
            </div>

            <div className="container">
            <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Nombre de campaña</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="campaign_name" value={inputs.campaign_name} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Marca</Form.Label>
                        <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} id="selectMarca">
                        {listMarcas.map((item,index)=>(
                            <option key={index} value={item.id}>{item.brand_name}</option>
                        ))}
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Plantilla</Form.Label>
                        <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} id="selectPlantilla" >
                        {listPlantiallas.map((item,index)=>(
                            <option key={index} value={item.id}>{item.template_name}</option>
                        ))}
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Fecha de inicio de campaña</Form.Label><br></br>
                        <input type="date" id="fechaInicio"
                        min="2022-01-01" max="2024-12-31"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Fecha de fin de campaña</Form.Label><br></br>
                        <input type="date" id="fechaFin"
                        min="2022-01-01" max="2024-12-31"/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Status de la campaña</Form.Label>
                        <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} id='selectStatus'>
                        <option>Selecciona una opcion</option>
                        <option value="true">Activa</option>
                        <option value="false">Desactivada</option>
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Slug de campaña:</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="slug" value={inputs.slug} onChange={handleChange}/>
                        </Form.Group>
                    </Row>
                    <Button style={{background:"#7B3E90",borderColor:"white"}} type="button" onClick={handleSubmit}>
                        Agregar
                    </Button>
                    <Button style={{marginLeft:10}} onClick={() => history.goBack()} variant="secondary">
                        Regresar
                    </Button>
                    </Form>    
            </div>
            
        </div>
        </>
    )

}
export default SuperAdminCrearCampana;