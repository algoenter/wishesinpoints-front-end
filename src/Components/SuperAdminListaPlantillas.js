import React, {useState,useEffect} from 'react';
import { Modal,Button,Form,Col,Row } from 'react-bootstrap';
import axios from 'axios';
import { MdEdit,MdDelete,MdSearch } from 'react-icons/md';
import { PhotoshopPicker   } from 'react-color';
import MenuSuperAdmin from './MenuSuperAdmin';
import { hexToCSSFilter } from 'hex-to-css-filter';

import '../config';
var baseUrl = global.config.wishes.inPoints.url;


var token = localStorage.getItem('tokenSuperAdmin');
let avatar ="";
let idplantilla ="";
let nombrePlantilla = "";

var filter_primary_color = "";
var filter_secundary_color = "";
var filter_header_color = "";
var filter_footer_color = "";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const SuperAdminListaPlantillas = () =>{

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

    const [color, setColor] = useState('#ff0000');
    const [selectedFile, setSelectedFile] = useState("");

    const [inputsPlantilla, setinputsPlantilla] = useState({
        template_name: "", 
        primary_color: "",
        secondary_color: "",
        color_header: "",
        color_footer: "",
        description: "",
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setinputsPlantilla(values => ({ ...values, [name]: value }))
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
      }

      

    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/plantillas/api/get_list/',{
            template_name:"",
          },{headers})
          .then((response) => {
              setList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setList])

      function BuscarPorNombre() {
        axios.post(baseUrl+'/plantillas/api/get_list/',{
            template_name:document.getElementById("BuscarNombre").value,
          },{headers})
          .then((response) => {
              //console.log(response.data)
              setList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

      function methodModalDelPlantilla(id,img,name) {
        console.log(id);
        idplantilla = id;
        avatar = img;
        nombrePlantilla = name;

        handleShow();
      }

      function methodDelPlantilla() {
        axios.delete(baseUrl+'/plantillas/api/delete/'+idplantilla+'/',{headers})
        .then((response) => {
            //console.log(response);
            window.location.href = "/superadmin/lista-Plantillas/";
        })
        .catch((error) => {
            handleClose();
            handleShow1();
        });
    }

    function methodModalUpdatePlantilla(id) {
        idplantilla = id
        try {

            axios.get(baseUrl+'/plantillas/api/specific/'+idplantilla+'/',{headers})
            .then((response) => {
                //console.log(response.data);
                setinputsPlantilla(response.data[0])
            })
            .catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(' . ', error);
        }

        handleShow2();
      }

      function methodUpdatePlantilla() {
        let formData = new FormData();
        console.log(selectedFile);
        console.log(formData.getAll('image'));

        filter_primary_color = (hexToCSSFilter(inputsPlantilla.primary_color).filter)
        filter_primary_color = filter_primary_color.substring(0, filter_primary_color.length - 1).toString();

        filter_secundary_color = (hexToCSSFilter(inputsPlantilla.secondary_color).filter)
        filter_secundary_color = filter_secundary_color.substring(0, filter_secundary_color.length - 1).toString();

        filter_header_color = (hexToCSSFilter(inputsPlantilla.color_header).filter)
        filter_header_color = filter_header_color.substring(0, filter_header_color.length - 1).toString();
        
        filter_footer_color = (hexToCSSFilter(inputsPlantilla.color_footer).filter)
        filter_footer_color = filter_footer_color.substring(0, filter_footer_color.length - 1).toString();
        
        formData.append('avatar', selectedFile)
        formData.append('template_name', inputsPlantilla.template_name)
        formData.append('primary_color', inputsPlantilla.primary_color)
        formData.append('secondary_color', inputsPlantilla.secondary_color)
        formData.append('color_header', inputsPlantilla.color_header)
        formData.append('color_footer', inputsPlantilla.color_footer)

        formData.append('primary_color_filter', filter_primary_color)
        formData.append('secondary_color_filter', filter_secundary_color)
        formData.append('color_header_filter', filter_header_color)
        formData.append('color_footer_filter', filter_footer_color)

        formData.append('description', inputsPlantilla.description)

            axios.put(baseUrl+'/plantillas/api/update/'+idplantilla+'/', 
            formData    
            ,{headers})
            .then((response) => {
                //console.log(response);
                window.location.href = "/superadmin/lista-Plantillas/";
            })
            .catch(err => {
                console.log(err);
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
                    <h4 style={{fontWeight: 300,paddingTop:15}}>Lista de</h4>
                    <div className="row">
                        <div className="col-4">
                            <h3 style={{fontSize:34, fontWeight:"bold"}}>Plantillas</h3> 
                        </div>
                        <div style={{textAlign:"right"}} className="col-8">
                            <div className='row'>
                                <div className='col'>
                                    <div className="input-group">
                                        <input type="text" className="form-control" id='BuscarNombre' placeholder='Buscar por nombre de plantilla'></input>
                                        <span className="input-group-btn">
                                            <button className="btn" style={{backgroundColor:"#7B3E90"}} type="button" onClick = {() => { BuscarPorNombre()}} > 
                                                <MdSearch style={{color:"white"}} ></MdSearch>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div className='col'>
                                    <button className="btn" style={{backgroundColor:"#7B3E90",color:"white"}} type="button" onClick={event =>  window.location.href='/superadmin/addPlantilla/'} > 
                                        Crear plantilla
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
                        <th scope="col">Imagen</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Color de regalo</th>
                        <th scope="col">Color de boton</th>
                        <th scope="col">Color header</th>
                        <th scope="col">Color de liston</th>
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
                                        {
                                            (item.avatar) === '' 
                                            ? <img style={{width:50}} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                                            : <img style={{width:50}} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/'+item.avatar}></img>
                                        }
                                    </td>
                                    <td>
                                        {item.template_name}
                                    </td>
                                    <td>
                                        <span className="badge" style={{backgroundColor:item.primary_color}}>&ensp;</span>{item.primary_color}
                                    </td>
                                    <td>
                                        <span className="badge" style={{backgroundColor:item.secondary_color}}>&ensp;</span>{item.secondary_color}
                                    </td>
                                    <td>
                                        <span className="badge" style={{backgroundColor:item.color_header}}>&ensp;</span>{item.color_header}
                                    </td>
                                    <td>
                                        <span className="badge" style={{backgroundColor:item.color_footer}}>&ensp;</span>{item.color_footer}
                                    </td>
                                    <td>
                                        <div className='container'>
                                            <MdEdit   className='btnPerfil' style={{fontSize:28,color:"#7B3E90"}}  onClick = {() => { methodModalUpdatePlantilla(item.id)} }  />&ensp;
                                            <MdDelete className='btnPerfil' style={{fontSize:28,color:"#E75353"}}  onClick = {() => { methodModalDelPlantilla(item.id,item.avatar,item.template_name)} }  />  
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
                  <h3 style={{fontSize:34, fontWeight:"bold"}}>Plantilla</h3>
                </div>
                <div className='container' style={{textAlign:"center"}}>
                    {
                        (avatar) === '' 
                        ? <img style={{width:150}} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                        : <img style={{width:150}} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/'+avatar}></img>

                    }
                    <img style={{width:150}} alt='' src=""></img>
                </div>
                <h5 style={{textAlign:"center"}}>¿Seguro que quieres eliminar la plantilla {nombrePlantilla}?</h5>
                            
                
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger"  onClick = {() => { methodDelPlantilla()} }>
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
                            <h3 style={{fontSize:34, fontWeight:"bold"}}>Plantilla</h3> 
                        </div>
                    </div>
            </div>
            <hr style={{height: 9}}></hr>
        </div>
        <div className="container" style={{paddingBottom:80}}>
                <div className='container' style={{width:"85%",textAlign:"-webkit-center"}}>
                    <PhotoshopPicker    color={color} onChangeComplete={ (color) => {setColor(color.hex)} }/>
                </div>
                <div className='container' style={{textAlign:"-webkit-center",paddingTop:15}}>
                    <div className='col-4' style={{backgroundColor:color,display:"flex"}}>
                        <h4 style={{margin:"auto"}}>{color}</h4>
                    </div>
                </div>

            <div className='container' style={{width:"85%", marginTop:"10px"}}>
                <Form >
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Nombre de la plantilla</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="template_name" value={inputsPlantilla.template_name} onChange={handleChange}  />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Color de regalo:</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="primary_color" value={inputsPlantilla.primary_color} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Color de boton:</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="secondary_color" value={inputsPlantilla.secondary_color} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Color header:</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="color_header" value={inputsPlantilla.color_header} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Color de liston</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="color_footer" value={inputsPlantilla.color_footer} onChange={handleChange}/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Label>Avatar/Image:</Form.Label>
                        <input type="file" onChange={handleFileSelect}/><br></br><br></br>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Descripcion:</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="description" value={inputsPlantilla.description} onChange={handleChange} />
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
          <Button variant="danger" onClick = {() => { methodUpdatePlantilla()} }>
            Editar
          </Button>
        </Modal.Footer>
        </Modal>
        </>
    )

}
export default SuperAdminListaPlantillas;