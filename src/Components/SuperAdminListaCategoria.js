import React, {useState,useEffect} from 'react';
import { Form,Button,Row,Col,Modal } from 'react-bootstrap';
import axios from 'axios';
import { MdEdit,MdDelete } from 'react-icons/md';
import MenuSuperAdmin from './MenuSuperAdmin';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var token = localStorage.getItem('tokenSuperAdmin');
let idcategoria ="";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const SuperAdminListaCategoria = () =>{
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

    const [inputsCategoria, setinputsCategoria] = useState({
        category_name: "", 
        description: "",
    })


    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/categories/api/get_list/',{
            category_name:"",
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
        //console.log(name+': ' + value)
        setinputsCategoria(values => ({ ...values, [name]: value }))
    }

    function methodPostCategoria(){
        axios.post(baseUrl+'/categories/api/register/',{
            category_name:inputsCategoria.category_name,
            description:inputsCategoria.description
        },{headers})
        .then((response) => {
            //console.log(response);
            window.location.href = "/superadmin/lista-Categorias/";
        })
        .catch(err => {
            console.log(err);
        });
    }

    
      function methodModalDelCategoria(id) {
        console.log(id);
        idcategoria = id;
        handleShow();
      }


      function methodDelCategoria() {
        axios.delete(baseUrl+'/categories/api/delete/'+idcategoria+'/',{headers})
        .then((response) => {
            //console.log(response);
            window.location.href = "/superadmin/lista-Categorias/";
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function methodModalUpdateCategoria(id) {
        idcategoria = id
        try {
            axios.get(baseUrl+'/categories/api/specific/'+id+'/',{headers})
            .then((response) => {
                //console.log(response.data);
                setinputsCategoria(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(' . ', error);
        }
        handleShow2();
      }

      function methodUpdateCategoria() {
          axios.put(baseUrl+'/categories/api/update/'+idcategoria+'/',{
              category_name:inputsCategoria.category_name,
              description:inputsCategoria.description
          },{headers})
          .then((response) => {
              //console.log(response);
              window.location.href = "/superadmin/lista-Categorias/";
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
                                    <h3 style={{fontSize:34, fontWeight:"bold"}}>Categorias</h3> 
                                    
                                </div>
                                <div style={{textAlign:"right"}} className="col-8">
                                    <div className='row'>
                                        <div className='col'>
                                            
                                        </div>
                                        <div className='col'>
                                            <button className="btn" style={{backgroundColor:"#7B3E90",color:"white"}} type="button" onClick = {() => { handleShow1()} } > 
                                                Crear Categoria
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
                                        {item.category_name}
                                    </td>
                                    <td>
                                        {item.description}
                                    </td>
                                    <td>
                                        <div className='container'>
                                            <MdEdit   className='btnPerfil' style={{fontSize:28,color:"#7B3E90"}}  onClick = {() => { methodModalUpdateCategoria(item.id)} } />&ensp;
                                            <MdDelete className='btnPerfil' style={{fontSize:28,color:"#E75353"}}   onClick = {() => { methodModalDelCategoria(item.id)} }  />  
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
                    <h3 style={{fontSize:34, fontWeight:"bold"}}>Categoria</h3>
                    </div>
                    <h5 style={{textAlign:"center"}}>¿Seguro que quieres eliminar la categoria #{idcategoria}?</h5>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger"  onClick = {() => { methodDelCategoria()} }>
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
                                    <h3 style={{fontSize:34, fontWeight:"bold"}}>Nueva categoria</h3> 
                                </div>
                            </div>
                    </div>
                    <hr style={{height: 9}}></hr>
            </div>
            <div>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                        <Form.Label>Nombre de la categoria</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="category_name"  onChange={handleChange}  />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Descripcion:</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="description" onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Button style={{float:"right",borderRadius:15,backgroundColor:"#7B3E90",color:"white"}} type="button" onClick = {() => { methodPostCategoria()} }>
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
                                <h3 style={{fontSize:34, fontWeight:"bold"}}>Categoria</h3> 
                            </div>
                        </div>
                </div>
                <hr style={{height: 9}}></hr>
            </div>
            <div>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                        <Form.Label>Nombre de la categoria</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="category_name" value={inputsCategoria.category_name} onChange={handleChange}  />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Descripcion:</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="description" value={inputsCategoria.description} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                </Form>  
            </div>
        </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick = {() => { methodUpdateCategoria()} }>
                    Editar
                </Button>
            </Modal.Footer>
        </Modal>

        </>
    )

}
export default SuperAdminListaCategoria;