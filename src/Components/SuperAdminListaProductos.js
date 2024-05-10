import React, {useState,useEffect} from 'react';
import { Modal,Button,Form,Col,Row } from 'react-bootstrap';
import axios from 'axios';
import { MdEdit,MdDelete,MdSearch } from 'react-icons/md';
import MenuSuperAdmin from './MenuSuperAdmin';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var token = localStorage.getItem('tokenSuperAdmin');
let imgProducto ="";
let idproducto ="";
let nombreProducto = "";
let categoria="";
let campana ="";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const SuperAdminListaProductos = () =>{

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

    const [selectedFile, setSelectedFile] = useState("");
    const [listCategoria, setlistCategoria] = useState([]);
    const [listcampanas, setlistcampanas] = useState([]);

    const [inputs, setInputs] = useState({
        product_name:"",
        description:"",
        points:0,
        amount:0,
        status:0,
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
      }

      useEffect(() =>{  
        try {
          axios.post(baseUrl+'/categories/api/get_list/',{
            category_name:""
          },{ headers })
          .then((response) => {
            setlistCategoria(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setlistCategoria])

      useEffect(() =>{  
        try {
          axios.post(baseUrl+'/usercampaigns/api/super-admin/all-campaigns/1/',{
            campaign_name:""
          },{ headers })
          .then((response) => {
              if(response.status === 204){
                  console.log('ok');
              }else{
                setlistcampanas(response.data[1]);
              }
            
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setlistcampanas])
      

    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/products/api/all_products/1/',{
            campaign_name:"",
            product_name:"",
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
        axios.post(baseUrl+'/products/api/all_products/1/',{
            product_name:document.getElementById("BuscarNombre").value,
            campaign_name:"",
          },{headers})
          .then((response) => {
              setList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    function BuscarPorCampana(evt) {
        
        axios.post(baseUrl+'/products/api/all_products/1/',{
            product_name:"",
            campaign_name:document.getElementById('selectCategoriaBuscar').value,
          },{headers})
          .then((response) => {
              setList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

      function methodModalDelProducto(id,img,name) {
        idproducto = id;
        imgProducto = img;
        nombreProducto = name;

        handleShow();
      }

      function methodDelProducto() {
        axios.delete(baseUrl+'/products/api/delete/'+idproducto+'/',{headers})
        .then((response) => {
            window.location.href = "/superadmin/lista-productos";
        })
        .catch((error) => {
            handleClose();
            handleShow1();
        });
    }

    function methodModalUpdateProducto(id,imagen) {
        idproducto = id;
        imgProducto = imagen;
        try {

            axios.get(baseUrl+'/products/api/specific_product/'+idproducto+'/',{headers})
            .then((response) => {
                
                setInputs(response.data[0])
                categoria =response.data[0].categories_id;
                campana = response.data[0].campaigns_id;
                handleShow2();
            })
            .catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(' . ', error);
        }

        
      }

      const handleSubmit = (event) => {
        let formData = new FormData();
        console.log(selectedFile);

        formData.append('image', selectedFile)
        formData.append('campaigns', document.getElementById('selectCampana').value)
        formData.append('categories', document.getElementById('selectCategoria').value)
        formData.append('product_name', inputs.product_name)
        formData.append('description', inputs.description)
        formData.append('points', inputs.points)
        formData.append('amount', inputs.amount)
        formData.append('status', inputs.amount)
        formData.append('brands', "3")
    

        axios.put(baseUrl+'/products/api/update/'+idproducto+'/', 
        formData    
        ,{headers})
        .then((response) => {
            console.log(response);
            window.location.href = "/superadmin/lista-productos/";
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
                            <h3 style={{fontSize:34, fontWeight:"bold"}}>Productos</h3> 
                        </div>
                        <div style={{textAlign:"right"}} className="col-8">
                            <div className='row'>
                                <div className='col'>
                                    <div className="input-group" style={{paddingBottom:10}}>
                                        <input type="text" className="form-control" id='BuscarNombre' placeholder='Buscar por nombre de producto'></input>
                                        <span className="input-group-btn">
                                            <button className="btn" style={{backgroundColor:"#7B3E90"}} type="button" onClick = {() => { BuscarPorNombre()}} > 
                                                <MdSearch style={{color:"white"}} ></MdSearch>
                                            </button>
                                        </span>
                                        
                                    </div>
                                    <Form.Select id='selectCategoriaBuscar' onChange={BuscarPorCampana}>
                                        <option value="">Buscar por campaña</option>
                                        {listcampanas.map((item,index)=>(
                                            <option key={index} value={item.campaign_name} >{item.campaign_name}</option>
                                        ))}
                                    </Form.Select>
                                </div>
                                <div className='col'>
                                    <button className="btn" style={{backgroundColor:"#7B3E90",color:"white"}} type="button" onClick={event =>  window.location.href='/superadmin/crearproducto/'} > 
                                        Crear producto
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
                        <th scope="col">Imagen</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Campaña</th>
                        <th scope="col">Puntos</th>
                        <th scope="col">Inventario</th>
                        <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item,index) => (
                                <tr key={index}>
                                    <td>
                                        {
                                            (item.image) === '' 
                                            ? <img style={{width:50}} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                                            : <img style={{width:50,height:50,objectFit:"cover"}} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/'+item.image}></img>
                                        }
                                    </td>
                                    <td>
                                        {item.product_name}
                                    </td>
                                    <td>
                                        {item.campaign_name}
                                    </td>
                                    <td>
                                        {item.points}
                                    </td>
                                    <td>
                                        {item.status +"/"+ item.amount}
                                    </td>
                                    <td>
                                        <div className='container'>
                                            <MdEdit   className='btnPerfil' style={{fontSize:28,color:"#7B3E90"}}  onClick = {() => { methodModalUpdateProducto(item.id,item.image)} }  />&ensp;
                                            <MdDelete className='btnPerfil' style={{fontSize:28,color:"#E75353"}}  onClick = {() => { methodModalDelProducto(item.id,item.imagen,item.product_name)} }  />  
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
                  <h3 style={{fontSize:34, fontWeight:"bold"}}>Producto</h3>
                </div>
                <div className='container' style={{textAlign:"center"}}>
                    {
                        (imgProducto) === '' 
                        ? <img style={{width:150}} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                        : <img style={{width:150}} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/'+imgProducto}></img>

                    }
                </div>
                <h5 style={{textAlign:"center"}}>¿Seguro que quieres eliminar el producto {nombreProducto}?</h5>
                            
                
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger"  onClick = {() => { methodDelProducto()} }>
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
            <p style={{fontSize:24, fontWeight:300}}>Ese producto esta en uso</p>    
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
                                <h3 style={{fontSize:34, fontWeight:"bold"}}>Producto</h3> 
                            </div>
                        </div>
                </div>
                <hr style={{height: 9}}></hr>
            </div>

            <div className='container' style={{width:"85%", marginTop:"10px"}}>
                <Form>

                    <div className='container' style={{textAlign:"center"}}>
                        {
                            (imgProducto) === '' 
                            ? <img style={{width:150}} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                            : <img style={{width:150}} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/'+imgProducto}></img>
                        }
                    </div>
                    <label htmlFor="file" id='labelImg'>Selecciona una imagen *</label><br></br>
                    <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" onChange={handleFileSelect}/>
                    <Row className="mb-3" style={{marginTop: 15}}>
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Nombre del producto *</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="product_name" value={inputs.product_name} onChange={handleChange}/>
                        </Form.Group>

                    </Row>
                    <Row className="mb-3">
                        
                      <Form.Group as={Col} controlId="">
                        <Form.Label>Selecciona una categoria</Form.Label>
                        <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} defaultValue={categoria} id='selectCategoria'>
                        {listCategoria.map((item,index)=>(
                            <option key={index} value={item.id}>{item.category_name}</option>
                        ))}
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Selecciona una campaña</Form.Label>
                        <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} defaultValue={campana} id='selectCampana'>
                        {listcampanas.map((item,index)=>(
                            <option key={index} value={item.id}>{item.campaign_name}</option>
                        ))}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3" style={{marginTop: 15}}>
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Costo en Puntos *</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="number" name="points" value={inputs.points} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Cantidad *</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="number" name="amount" value={inputs.amount} onChange={handleChange}/>
                        </Form.Group>
                    </Row>
                    <Form.Group as={Col} controlId="" style={{marginBottom:15}}>
                        <Form.Label>Descripcion del producto *</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="description" value={inputs.description} onChange={handleChange}/>
                    </Form.Group>
                    <p id='msgerror' style={{color:"red",display:"none"}}>Error, verifica que los campos no esten vacios o intentalo mas tarde.</p>
                    <div className='container' style={{textAlign:"right"}}>
                    <Button style={{background:"#7B3E90",borderColor:"white"}} type="button" onClick={handleSubmit}>
                        Editar
                    </Button>
                    </div>
                    </Form>  
            </div>
        </Modal.Body>
        </Modal>
        </>
    )

}
export default SuperAdminListaProductos;