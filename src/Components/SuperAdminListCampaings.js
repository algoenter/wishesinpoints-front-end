import React, {useState,useEffect} from 'react';
import { Modal,Button,Form,Col,Row } from 'react-bootstrap';
import axios from 'axios';
import { MdEdit,MdDelete,MdSearch } from 'react-icons/md';
import MenuSuperAdmin from './MenuSuperAdmin';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var token = localStorage.getItem('tokenSuperAdmin');

let idCampana ="";
let nombreCampana = "";
let idmarca ="";
let idplantilla ="";
let fechaInicial ="";
let fechaFinal ="";
let status ="";
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const SuperAdminListCampaings = () =>{

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);  

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);  

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    const [list, setList] = useState([]);
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

    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/usercampaigns/api/super-admin/all-campaigns/1/',{
            campaign_name:"",
          },{headers})
          .then((response) => {
              if(response.status === 204){
                //console.log(response.statusText)
              }else{
                  setList(response.data[1])
              }
              
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setList])

      function BuscarPorNombre() {
        axios.post(baseUrl+'/usercampaigns/api/super-admin/all-campaigns/1/',{
            campaign_name:document.getElementById("BuscarNombre").value,
          },{headers})
          .then((response) => {
              //console.log(response);
              if(response.status === 204){
                //console.log(response.statusText)
              }else{
                  setList(response.data[1])
              }
              
          })
          .catch((error) => {
            console.log(error);
          });
    }

      function methodModalDelCampana(id,name) {
        console.log(id);
        idCampana = id;
        nombreCampana = name;
        handleShow();
      }

      function methodDelCampana() {
        axios.delete(baseUrl+'/campaigns/api/delete/'+idCampana+'/',{headers})
        .then((response) => {
            //console.log(response);
            window.location.href = "/superadmin/lista-campañas/";
        })
        .catch((error) => {
            handleClose();
            handleShow1();
        });
    }

    function methodModalUpdateCampana(id) {
        idCampana = id
        axios.get(baseUrl+'/campaigns/api/specific/'+idCampana+'/',{headers})
        .then((response) => {
            //console.log(response.data[0].status);
            idmarca = response.data[0].brands_id;
            idplantilla = response.data[0].plantillas_id;
            fechaInicial = response.data[0].start_date;
            fechaFinal = response.data[0].end_date;
            setInputs(response.data[0])
            status = (response.data[0].status);
            console.log(status);
            handleShow2();
        })
        .catch((error) => {
            console.log(error);
        });
        
      }

      function methodUpdateCampana() {

        axios.put(baseUrl+"/campaigns/api/update/"+idCampana+"/", {
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
                    <h4 style={{fontWeight: 300,paddingTop:15}}>Lista de</h4>
                    <div className="row">
                        <div className="col-4">
                            <h3 style={{fontSize:34, fontWeight:"bold"}}>Campañas</h3> 
                        </div>
                        <div style={{textAlign:"right"}} className="col-8">
                            <div className='row'>
                                <div className='col'>
                                    <div className="input-group">
                                        <input type="text" className="form-control" id='BuscarNombre' placeholder='Buscar por nombre de campaña'></input>
                                        <span className="input-group-btn">
                                            <button className="btn" style={{backgroundColor:"#7B3E90"}} type="button" onClick = {() => { BuscarPorNombre()}} > 
                                                <MdSearch style={{color:"white"}} ></MdSearch>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div className='col'>
                                    <button className="btn" style={{backgroundColor:"#7B3E90",color:"white"}} type="button" onClick={event =>  window.location.href='/superadmin/addCampaings/'} > 
                                        Crear Campaña
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{height: 9}}></hr>
            </div>

            <div className="container" style={{paddingBottom:80}}>
                <table className="table">
                    <thead className="thead-dark" style={{backgroundColor: "#BFB3CF", color:"black"}}>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Plantilla</th>
                        <th scope="col">slug</th>
                        <th scope="col">Fecha inicio</th>
                        <th scope="col">Fecha Fin</th>
                        <th scope="col">Estatus</th>
                        <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item,index) => (
                                <tr key={index}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.campaign_name}
                                    </td>
                                    <td>
                                        {item.brands_id}
                                    </td>
                                    <td>
                                        {item.plantillas_id}
                                    </td>
                                    <td>
                                        {item.slug}
                                    </td>
                                    <td>
                                        {item.start_date}
                                    </td>
                                    <td>
                                        {item.end_date}
                                    </td>
                                    <td>
                                        {item.status}
                                        {
                                            (item.status) === true 
                                            ? <p>Activa</p>
                                            : <p>Desactivada</p>
                                        }
                                    </td>
                                    <td>
                                        <div className='container'>
                                            <MdEdit   className='btnPerfil' style={{fontSize:28,color:"#7B3E90"}}  onClick = {() => { methodModalUpdateCampana(item.id)} }  />&ensp;
                                            <MdDelete className='btnPerfil' style={{fontSize:28,color:"#E75353"}}  onClick = {() => { methodModalDelCampana(item.id,item.campaign_name)} }  />  
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
            
        </div>

        <Modal  show={show} size="md" onHide={handleClose} >
        <Modal.Body>
                <div>
                  <div className="container">
                  <h4 style={{fontWeight: 300}}>Eliminar</h4>
                  <h3 style={{fontSize:34, fontWeight:"bold"}}>Campaña</h3>
                </div>
                <h5 style={{textAlign:"center"}}>¿Seguro que quieres eliminar la Campaña {nombreCampana}?</h5>
                            
                
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger"  onClick = {() => { methodDelCampana()} }>
            Eliminar
          </Button>
        </Modal.Footer>
        </Modal>

        <Modal show={show1} size="md" onHide={handleClose1} >
        <Modal.Body style={{backgroundColor:"#FFF"}}>
        <div>
        <div>
            <h4 style={{fontWeight: 300,paddingTop:15}}>Upsss...</h4>
            <h3 style={{fontSize:34, fontWeight:"bold"}}>Error</h3> 
            <p style={{fontSize:24, fontWeight:300}}>Esa plantilla esta en uso</p>    
        </div>

        </div>
            </Modal.Body>
        </Modal>


        <Modal show={show2} size="lg" onHide={handleClose2} >
        <Modal.Body style={{backgroundColor:"#FFF"}}>
        <div className="container">
            <div>
                <h4 style={{fontWeight: 300,paddingTop:15}}>Editar</h4>
                <div className="row">
                        <div className="col">
                            <h3 style={{fontSize:34, fontWeight:"bold"}}>Campaña</h3> 
                        </div>
                    </div>
            </div>
            <hr style={{height: 9}}></hr>
        </div>
        <div className="container">
            <div className='container' style={{width:"85%", marginTop:"10px"}}>
                <Form >
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Nombre de campaña</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="campaign_name" value={inputs.campaign_name} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Marca</Form.Label>
                        <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} id="selectMarca" defaultValue={idmarca}>
                        {listMarcas.map((item,index)=>(
                            <option key={index} value={item.id}>{item.brand_name}</option>
                        ))}
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Plantilla</Form.Label>
                        <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} id="selectPlantilla" defaultValue={idplantilla}>
                        {listPlantiallas.map((item,index)=>(
                            <option key={index} value={item.id}>{item.template_name}</option>
                        ))}
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Fecha de inicio de campaña</Form.Label><br></br>
                        <input type="date" id="fechaInicio" defaultValue={fechaInicial} min="2022-01-01" max="2024-12-31"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Fecha de fin de campaña</Form.Label><br></br>
                        <input type="date" id="fechaFin"  defaultValue={fechaFinal} min="2022-01-01" max="2024-12-31"/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Status de la campaña</Form.Label>
                        <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} id='selectStatus' defaultValue={status.toString()}>
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
                </Form>  
            </div>

            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Cancelar
          </Button>
          <Button variant="danger" onClick = {() => { methodUpdateCampana()} }>
            Editar
          </Button>
        </Modal.Footer>
        </Modal>
        </>
    )
}
export default SuperAdminListCampaings;