import React, {useState,useEffect} from 'react';
import { Form,Button,Row,Col,Modal } from 'react-bootstrap';
import axios from 'axios';
import { MdEdit,MdDelete,MdSearch } from 'react-icons/md';
import MenuSuperAdmin from './MenuSuperAdmin';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var token = localStorage.getItem('tokenSuperAdmin');
let idmarca ="";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const SuperAdminListaMarca = () =>{
    const [selectedFile, setSelectedFile] = useState("");
    const [list, setList] = useState([]);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);  

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);  

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    const [inputsMarca, setinputsMarca] = useState({
        brand_name: "", 
        description: "",
    })


    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/brands/api/get_list/',{
            brand_name:"",
          },{headers})
          .then((response) => {
              //console.log(response.data)
              setList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setList])

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        //console.log(name + value)
        setinputsMarca(values => ({ ...values, [name]: value }))
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
      }

    const submitMarca = (event) => {
        event.preventDefault()
        let formData = new FormData();
        console.log(selectedFile);
        console.log(formData.getAll('image'));
        
        formData.append('image', selectedFile)
        formData.append('brand_name', inputsMarca.brand_name)
        formData.append('description', inputsMarca.description)
        
        axios.post(baseUrl+'/brands/api/register/', 
        formData    
        ,{headers})
        .then((response) => {
            //console.log(response);
            window.location.href = "/superadmin/lista-Marcas/";

        })
        .catch(err => {
            if(err.response.status === 409){
                console.log(err.response.status)
                handleShow1();
            }else{
                console.log(err.response.status)
            }
        });
      }

      function BuscarPorNombre() {
        axios.post(baseUrl+'/brands/api/get_list/',{
            brand_name:document.getElementById("BuscarNombre").value,
          },{headers})
          .then((response) => {
              //console.log(response.data)
              setList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

      function methodModalDelMarca(id) {
        console.log(id);
        idmarca = id;

        handleShow();
      }

      function methodDelMarca() {
        axios.delete(baseUrl+'/brands/api/delete/'+idmarca+'/',{headers})
        .then((response) => {
            //console.log(response);
            window.location.href = "/superadmin/lista-Marcas/";
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function methodModalUpdateMarca(id) {
        idmarca = id
        try {
            axios.get(baseUrl+'/brands/api/specific/'+id+'/',{headers})
            .then((response) => {
                //console.log(response.data);
                setinputsMarca(response.data[0])
            })
            .catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(' . ', error);
        }
        handleShow2();
      }

      function methodUpdateMarca() {
          console.log(idmarca);
        let formData = new FormData();
        console.log(selectedFile);
        console.log(formData.getAll('image'));
        
        formData.append('image', selectedFile)
        formData.append('brand_name', inputsMarca.brand_name)
        formData.append('description', inputsMarca.description)

            axios.put(baseUrl+'/brands/api/update/'+idmarca+'/', 
            formData    
            ,{headers})
            .then((response) => {
                //console.log(response);
                window.location.href = "/superadmin/lista-Marcas/";
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
                        <h4 style={{fontWeight: 300,paddingTop:15}}>Listado de</h4>
                        <div className="row">
                                <div className="col-4">
                                    <h3 style={{fontSize:34, fontWeight:"bold"}}>Marcas</h3> 
                                    
                                </div>
                                <div style={{textAlign:"right"}} className="col-8">
                                    <div className='row'>
                                        <div className='col'>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id='BuscarNombre' placeholder='Buscar por nombre de marca'></input>
                                                <span className="input-group-btn">
                                                    <button className="btn" style={{backgroundColor:"#7B3E90"}} type="button"  onClick = {() => { BuscarPorNombre()}}> 
                                                        <MdSearch style={{color:"white"}} ></MdSearch>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <button className="btn" style={{backgroundColor:"#7B3E90",color:"white"}} type="button" onClick = {() => { handleShow1()} } > 
                                                Crear Marca
                                            </button>
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
                        <th scope="col">Descripcion</th>
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
                                            (item.image) === '' 
                                            ? <img style={{width:50}} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                                            : <img style={{width:50}} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/'+item.image}></img>
                                        }
                                        <img style={{width:60}} alt='' src=""></img>
                                    </td>
                                    <td>
                                        {item.brand_name}
                                    </td>
                                    <td>
                                        {item.description}
                                    </td>
                                    <td>
                                        <div className='container'>
                                            <MdEdit   className='btnPerfil' style={{fontSize:28,color:"#7B3E90"}}  onClick = {() => { methodModalUpdateMarca(item.id)} } />&ensp;
                                            <MdDelete className='btnPerfil' style={{fontSize:28,color:"#E75353"}}   onClick = {() => { methodModalDelMarca(item.id)} }  />  
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
                    <h3 style={{fontSize:34, fontWeight:"bold"}}>Marca</h3>
                    </div>
                    <h5 style={{textAlign:"center"}}>¿Seguro que quieres eliminar la marca #{idmarca}?</h5>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger"  onClick = {() => { methodDelMarca()} }>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={show1} size="md" onHide={handleClose1} >
        <Modal.Body style={{backgroundColor:"#FFF"}}>
            <div className="container">
                    <div>
                        <h4 style={{fontWeight: 300,paddingTop:15}}>Agregar</h4>
                        <div className="row">
                                <div className="col">
                                    <h3 style={{fontSize:34, fontWeight:"bold"}}>Nueva marca</h3> 
                                </div>
                            </div>
                    </div>
                    <hr style={{height: 9}}></hr>
            </div>
            <div>
                <Form onSubmit={submitMarca}>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                        <Form.Label>Nombre de la marca</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="brand_name"  onChange={handleChange}  />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Label>Image:</Form.Label>
                        <input type="file" onChange={handleFileSelect}/><br></br><br></br>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Descripcion:</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="description" onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Button style={{float:"right",borderRadius:15,backgroundColor:"#7B3E90",color:"white"}} type="button" onClick={submitMarca}>
                    Crear
                    </Button>
                </Form>  
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
                                <h3 style={{fontSize:34, fontWeight:"bold"}}>Marca</h3> 
                            </div>
                        </div>
                </div>
                <hr style={{height: 9}}></hr>
            </div>
            <div>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                        <Form.Label>Nombre de la marca</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="brand_name" value={inputsMarca.brand_name} onChange={handleChange}  />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Label>Image:</Form.Label>
                        <input type="file" onChange={handleFileSelect}/><br></br><br></br>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Descripcion:</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="description" value={inputsMarca.description} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                </Form>  
            </div>
        </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick = {() => { methodUpdateMarca()} }>
                    Editar
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )

}
export default SuperAdminListaMarca;