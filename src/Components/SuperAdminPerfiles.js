import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Modal,Button,Col,Form,Row } from 'react-bootstrap';
import { MdStars,MdEdit,MdDelete,MdSearch } from 'react-icons/md';
import MenuSuperAdmin from './MenuSuperAdmin';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;


var token = localStorage.getItem('tokenSuperAdmin');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

let iduser = 0;
let imagenPerfil ="";
let boolean = false;
let varusernameUs = "";

const SuperAdminPerfiles = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);  
    const [list, setList] = useState([]);

    const [inputsUser, setinputsUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
    })
    const [inputsUser2, setinputsUser2] = useState({
        phone: 0,
        points: 0,
    })


    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setinputsUser(values => ({ ...values, [name]: value }))
        setinputsUser2(values => ({ ...values, [name]: value }))
    }

    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/users/api/get_list/',{
              full_name:"",
              is_staff: boolean
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
      
    function BuscarPorNombre() {
        axios.post(baseUrl+'/users/api/get_list/',{
              full_name:document.getElementById("BuscarNombre").value,
              is_staff: boolean
          },{headers})
          .then((response) => {
              //console.log(response.data)
              setList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    function MostrarCustomerAdmin() {
        boolean = !boolean;
        BuscarPorNombre();

    }

      
      function methodModalDelUser(id,img) {
        console.log(id);
        iduser = id;
        imagenPerfil = img;

        handleShow();
      }
      function methodModalUpdateUser(usernameUs) {
        varusernameUs = usernameUs

        try {

            axios.get(baseUrl+'/users/api/profile/'+usernameUs+'/',{headers})
            .then((response) => {
                //console.log(response.data);
                setinputsUser(response.data[0][0])
                setinputsUser2(response.data[1][0])
            })
            .catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(' . ', error);
        }

        handleShow2();
      }

      function methodUpdateUser() {
          console.log(document.getElementById('passwordInput').value);
          console.log(inputsUser.first_name +"-"+inputsUser.last_name+"-"+inputsUser.email+"-"+inputsUser2.phone+"-"+inputsUser2.points);
        axios.put(baseUrl+'/superadministrator/api/update-account/'+varusernameUs+'/',{
            first_name: inputsUser.first_name,
            last_name: inputsUser.last_name,
            email: inputsUser.email,
            phone: inputsUser2.phone,
            points: inputsUser2.points,
            password:document.getElementById('passwordInput').value
            },{headers})
            .then((response) => {
                window.location.href = "/superadmin/administrarperfiles";
                //console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

      function methodDelUser() {
          
          console.log(iduser);
          axios.delete(baseUrl+'/superadministrator/api/delete_userOradmin/'+iduser+'/',{headers})
          .then((response) => {
              //console.log(response);
              window.location.href = "/superadmin/administrarperfiles";
          })
          .catch((error) => {
            console.log(error);
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
                        <h4 style={{fontWeight: 300,paddingTop:15}}>Administrar</h4>
                        <div className="row">
                                <div className="col-4">
                                    <h3 style={{fontSize:34, fontWeight:"bold"}}>Perfiles</h3> 
                                    
                                </div>
                                <div style={{textAlign:"right"}} className="col-8">
                                    <div className='row'>
                                        <div className='col'>
                                            <div className="input-group">
                                            <input type="text" className="form-control" id='BuscarNombre' placeholder='Buscar por nombre'></input>
                                            <span className="input-group-btn">
                                                <button className="btn" style={{backgroundColor:"#7B3E90"}} onClick = {() => { BuscarPorNombre()}} type="button"> 
                                                    <MdSearch style={{color:"white"}} ></MdSearch>
                                                </button>
                                            </span>
                                            </div>
                                            <div style={{paddingTop:10}}>
                                                <span>Administradores </span><input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." onClick = {() => { MostrarCustomerAdmin()}}></input>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <button className="btn" style={{backgroundColor:"#7B3E90",color:"white"}} type="button" onClick={event =>  window.location.href='/superadmin/addUser/'} > 
                                                Agregar usuario
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <hr style={{height: 9}}></hr>
            </div>
            
            <div className="container">
                <table className="table">
                    <thead className="thead-dark" style={{backgroundColor: "#BFB3CF", color:"black"}}>
                        <tr>
                        <th scope="col">Imagen</th>
                        <th scope="col">Nombre completo</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Puntos</th>
                        <th scope="col">Campañas</th>
                        <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item,index) => (
                                <tr key={index}>
                                    <td>
                                        {
                                            (item[1][0].image) === '' 
                                            ? <img style={{width:50}} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                                            : <img style={{width:50,height:50,objectFit:"cover"}} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/'+item[1][0].image}></img>
                                        }
                                    </td>
                                    <td>
                                        {item[0][0].first_name + " "+item[0][0].last_name}
                                    </td>
                                    <td>
                                        {item[0][0].email}
                                    </td>
                                    <td>
                                        {item[1][0].phone}
                                    </td>
                                    <td>
                                        <MdStars style={{fontSize:28,color:"#7B3E90"}}/>{item[1][0].points}
                                    </td>
                                    <td>
                                        {(item[2]).map((data,index2) =>
                                            <li key={index2}>{data.campaign_name}</li>
                                         )}
                                    </td>
                                    <td>
                                        <div className='container'>
                                            <MdEdit   className='btnPerfil' style={{fontSize:28,color:"#7B3E90"}}   onClick = {() => { methodModalUpdateUser(item[0][0].username)}} />&ensp;
                                            <MdDelete className='btnPerfil' style={{fontSize:28,color:"#E75353"}}   onClick = {() => { methodModalDelUser(item[0][0].id,item[1][0].image)} }/>  
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
                  <h3 style={{fontSize:34, fontWeight:"bold"}}>Usuario</h3>
                </div>
                <div className='container' style={{textAlign:"center"}}>
                    {
                        (imagenPerfil) === '' 
                        ? <img style={{width:150}} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                        : <img style={{width:150}} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/'+imagenPerfil}></img>
                    }
                    <img style={{width:150}} alt='' src=""></img>
                </div>
                <h5 style={{textAlign:"center"}}>¿Seguro que quieres eliminar al usuario?</h5>
                            
                
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick = {() => { methodDelUser()} } >
            Eliminar
          </Button>
        </Modal.Footer>
        </Modal>


        <Modal  show={show2} size="md" onHide={handleClose2} >
            <Modal.Body style={{margin:20}}>
            <div className="container">
                <div>
                    <h4 style={{fontWeight: 300,paddingTop:15}}>Editar</h4>
                    <div className="row">
                            <div className="col">
                                <h3 style={{fontSize:34, fontWeight:"bold"}}>Perfil</h3> 
                            </div>
                        </div>
                </div>
                <hr style={{height: 9}}></hr>
            </div>
            <div>
                <Form >
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text" name="first_name" value={inputsUser.first_name} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text" name="last_name" value={inputsUser.last_name} onChange={handleChange}  />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Email</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text" name="email" value={inputsUser.email}  onChange={handleChange}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="passwordInput">
                        <Form.Label>Password</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text" name="password"/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="number" name="phone" value={inputsUser2.phone} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Puntos</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="number" name="points" value={inputsUser2.points} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <button className="btn" style={{marginLeft:10,float:"right",backgroundColor:"#7B3E90",color:"white"}} type="button"  onClick = {() => { methodUpdateUser()} }> 
                        Actualizar
                    </button>
                    <br></br>
                </Form>
                
                
            </div>
            </Modal.Body>
        </Modal>
        
        </>
    )

}
export default SuperAdminPerfiles;