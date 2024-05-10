import { MdStars,MdCall,MdEmail,MdDateRange,MdDirections,MdGroups,MdWorkspaces,MdSentimentSatisfiedAlt,MdMode } from 'react-icons/md';
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuSuperAdmin from './MenuSuperAdmin';
import { Modal,Button } from 'react-bootstrap';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var token = localStorage.getItem('tokenSuperAdmin');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const SuperAdminDetallesCanje = () =>{
    var { idorder,iduser } = useParams(); // params
    const [listUserData, setlistUserData] = useState([]);
    const [listUserData1, setlistUserData1] = useState([]);
    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);
    const [list3, setList3] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true); 

    useEffect(() =>{  
        try {
          axios.get(baseUrl+'/superadministrator/api/get-user/'+iduser+'/',{ headers })
          .then((response) => {
            //console.log(response.data); 
            setlistUserData(response.data[0][0])
            setlistUserData1(response.data[1][0])
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setlistUserData],[setlistUserData1])

    useEffect(() =>{  
        try {
          axios.get(baseUrl+'/orders/api/specific/'+idorder+'/',{ headers })
          .then((response) => {
            setList2(response.data[0][0][0]);
            setList(response.data[0][2][0]);
            setList3(response.data[0][1][0]);
            if(response.data[0][0].status === 'Pendiente' ||  response.data[0][0].status === 'En camino'){
                document.getElementById('boton').style.display = "block"
            }else{
                document.getElementById('boton').style.display = "none"
            }
            
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setList],[setList2],[setList3])

      function methodName(id) {
        console.log(id);
        handleShow();
      }

      function methodCancelCanje() {
        axios.post(baseUrl+'/orders/api/cancel-an-order/'+idorder+'/',{
        },{headers})
        .then((response) => {
            //console.log(response);
            window.location.href = "/superadmin/lista-pedidos/";
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function setDateDelivery(){

        axios.put('baseUrl+/orders/api/change_status/'+idorder+'/',{
            date_delivery: document.getElementById('fechaEntrega').value+' 19:48:28.182647-05',
            status:document.getElementById('selectStatus').value
        },{headers})
        .then((response) => {
            //console.log(response);
            window.location.href = "/superadmin/detallescanje/"+idorder+'/'+iduser+'/';
        })
        .catch((error) => {
            console.log(error);
        });
        

        
    }

    function ModalDateDelivery(){
        handleShow2();
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

        <div>
            <div className="container">
                <br></br>
                <h4 style={{fontWeight: 300}}>Detalles del</h4>
                <h3 style={{fontSize:34, fontWeight:"bold"}}>Canje</h3>
            </div>
            <div className="container" style={{backgroundColor:"#BFB3CF"}}>
                <div className="row">
                    <div style={{paddingTop:10,paddingBottom:10}} className="col-3">
                        <img alt="" style={{width:"80%"}} src={ 'https://wishesinpointsbucket.s3.amazonaws.com/' + list.image}></img>
                    </div>
                    <div style={{paddingTop:10,paddingBottom:10,textAlign:"center", alignSelf:"center"}} className="col-5">
                        <h3 style={{fontSize:34, fontWeight:"bold"}}>{list.product_name}</h3> 
                    </div>
                    <div style={{position:"relative",paddingTop:10,paddingBottom:10,textAlign:"right"}} className="col-4">
                        <h4 style={{position:"absolute",right:"5%",top:"5%",fontSize:34, fontWeight:"bold"}}><MdStars style={{color:"#7B3E90"}}/>{list.points + " pts"}</h4>     
                        <button id="boton" style={{position:"absolute",right:"5%",bottom:"5%",borderRadius:15,backgroundColor:"#7B3E90",color:"white"}} className="btn" onClick = {() => { methodName(list2.id);} }>Cancelar canje</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div>
                <div className="row">
                    <div className="col-4">
                        <p>Datos del cliente:</p>
                        <p><span className="badge  bg-secondary" style={{display: "contents"}}><img alt="" style={{verticalAlign:"unset",width:"5%"}} src={ 'https://wishesinpointsbucket.s3.amazonaws.com/' + listUserData1.image }/></span>{" "+listUserData.first_name + " " + listUserData.last_name}</p>
    
                        <p><MdCall/> <b>Tel:</b> {" "+ listUserData1.phone + " "} </p>
                        <p><MdEmail/> <b>Email:</b> {" "+ listUserData.email}</p>
                     
                    </div>
                    <div className="col-8">
                        <p>Datos del pedido:</p>
                        <p><MdDateRange/> <b>Pedido Realizado:</b> {list2.order_date} &nbsp;&nbsp;&nbsp;</p>
                        {
                            (list2.date_delivery) === null
                            ? <p><MdDirections/> <b>Fecha de entrega: </b>&nbsp; Sin asignar <button onClick = {() => { ModalDateDelivery()} } style={{paddingLeft:0,paddingRight:0}} className='btn'><MdMode style={{fontSize:22}}/></button></p>
                            : <p><MdDirections/> <b>Fecha de entrega: </b>&nbsp; {list2.date_delivery} <button onClick = {() => { ModalDateDelivery()} } style={{paddingLeft:0,paddingRight:0}} className='btn'><MdMode style={{fontSize:22}}/></button></p>
                        }
                        <p><MdGroups/> <b>Producto de la campaña:</b> {list2.campaign}</p>
                        <p><MdWorkspaces/> <b>Cantidad: </b> {list3.amount} &nbsp;&nbsp;&nbsp;  <MdStars/> <b>Puntos gastados: </b>{list3.total_price}  </p>
                        <p></p>
                        <p><MdSentimentSatisfiedAlt/> <b>Estatus</b> {list2.status}</p>
                        
                    </div>
                </div>
            </div>
            <hr style={{height: 9}}></hr>
        </div>

        <Modal  show={show} size="md" onHide={handleClose} >
            <Modal.Body>
                <div>
                  <div className="container">
                  <h4 style={{fontWeight: 300}}>Cancelar</h4>
                  <h3 style={{fontSize:34, fontWeight:"bold"}}>Canje</h3>
                </div>
                <h5 style={{textAlign:"center"}}>¿Seguro que quieres cancelar el canje?</h5>
                            
                
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            <Button variant="danger"  onClick = {() => { methodCancelCanje()} }>Continuar</Button>
            </Modal.Footer>
        </Modal>

        <Modal  show={show2} size="md" onHide={handleClose2} >
            <Modal.Body>
                <div>
                  <div className="container">
                  <h4 style={{fontWeight: 300}}>Asignar</h4>
                  <h3 style={{fontSize:34, fontWeight:"bold"}}>Fecha de entrega</h3>
                </div>
                <h5 style={{textAlign:"center"}}>Feleccione una fecha para le entrega del pedido.</h5>
                <br></br>
                <p>Selecciona la fecha de entrega</p>
                <input type="date" id="fechaEntrega" min="2022-01-01" max="2024-12-31"/>
                <br></br><br></br>
                <p>Selecciona un estatus</p>
                <select id='selectStatus'>
                    <option value="En camino">En camino</option>
                    <option value="Entregado">Entregado</option>
                </select>
                
                            
                
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>Cerrar</Button>
            <Button variant="danger"  onClick = {() => { setDateDelivery()} }>Asignar</Button>
            </Modal.Footer>
        </Modal>
        
         


        </>
    )

}
export default SuperAdminDetallesCanje;