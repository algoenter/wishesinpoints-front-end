import React, {useState,useEffect} from 'react';
import { MdStars,MdDelete } from 'react-icons/md';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import '../config';
var baseUrl = global.config.wishes.inPoints.url;


const imguRL = 'https://wishesinpointsbucket.s3.amazonaws.com/';

var token = localStorage.getItem('token');
var regaloid = "";
var regalonombre = "";
var regalofecha = "";
var regaloImg = "";
var regalopuntos = "";

var campananombre = "";
var campanainicio="";
var campanafin ="";

var numNotificaciones = 0;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const FragmentHomeUser = () =>{
    var id_usuario = localStorage.getItem('id_usuario');
    var username = localStorage.getItem('username');

    const [list, setList] = useState([]);
    const [listCampanas, setListCampanas] = useState([]); 
    const [listRegalos, setListRegalos] = useState([]); 
    const [listNotificaciones, setlistNotificaciones] = useState([]); 


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);  

    const openCampana = () => {
        var elemento1 = document.getElementById('campanas');
        var elemento2 = document.getElementById('regalos');
        var elemento3 = document.getElementById('puntos');
        elemento1.style.display = "block";
        elemento2.style.display = "none";
        elemento3.style.display = "none";
    }
    const openRegalo = () => {
        var elemento1 = document.getElementById('campanas');
        var elemento2 = document.getElementById('regalos');
        var elemento3 = document.getElementById('puntos');
        elemento1.style.display = "none";
        elemento2.style.display = "block";
        elemento3.style.display = "none";
    }
    const openPuntos = () => {
        var elemento1 = document.getElementById('campanas');
        var elemento2 = document.getElementById('regalos');
        var elemento3 = document.getElementById('puntos');
        elemento1.style.display = "none";
        elemento2.style.display = "none";
        elemento3.style.display = "block";
    }

    function methodName(id,nombre,fecha_entrega,imagen,puntos) {
        regaloid = id;
        regalonombre = nombre;
        regalofecha = fecha_entrega;
        regaloImg = imagen;
        regalopuntos = puntos;
        handleShow1();
      }

      function methodName2(nombre,inicio,fin) {
        campananombre = nombre;
        campanainicio = inicio;
        campanafin = fin;
        handleShow();
      }
    


    useEffect(() =>{  
        try {
          axios.get(baseUrl+'/users/api/user_datas/'+username+'/',{ headers })
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

      useEffect(() =>{  
        try {
          axios.get(baseUrl+'/inbox/api/notifications/'+id_usuario+'/',{ headers })
          .then((response) => {
              console.log(response.data);
            numNotificaciones = response.data[1][0]["unread_notifications: "];
            setlistNotificaciones(response.data[0])
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setlistNotificaciones])

      useEffect(() =>{  
        try {
          axios.get(baseUrl+'/usercampaigns/api/customercampaign/'+id_usuario+'/',{ headers })
          .then((response) => {
            //console.log(response)
            if(response.status === 204){


            }else{
              setListCampanas(response.data[1]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setListCampanas])

      useEffect(() =>{  
        try {
          axios.get(baseUrl+'/orders/api/get_index_customer/'+id_usuario+'/',{ headers })
          .then((response) => {
            //console.log(response)
            setListRegalos(response.data[3]);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setListRegalos])


    const bodyCampana=(
        <div>
            <h3 style={{fontWeight:300}}>Detalles</h3>
            <h2 >Campañas</h2><br/>
                <div className="container" style={{width:"80%", float:"right"}}>
                    <p style={{fontWeight:"bold"}}>Nombre de la campaña</p>
                    <p>{campananombre}</p>

                    <p style={{fontWeight:"bold"}}>Inicio de la campaña</p>
                    <p>{campanainicio}</p>

                    <p style={{fontWeight:"bold"}}>Fin de la campaña</p>
                    <p>{campanafin}</p>
                </div>
        </div>
    )

    const bodyRegalos=(
        <div>
            <h3 style={{fontWeight:300}}>Regalos</h3>
            <h2 >Canjeados</h2><br/>
            <div style={{textAlign:"center"}} className="container">
                <img alt="" style={{width:"50%"}} src={ imguRL + regaloImg }></img><br/><br/>
            </div>
                <div className="container" style={{width:"80%", float:"right"}}>
                    <p style={{fontWeight:"bold"}}>Regalo #{regaloid}</p>
                    <p style={{fontWeight:"bold"}}>Nombre del producto</p>
                    <p>{regalonombre}</p>

                    <p style={{fontWeight:"bold"}}>Fecha de canjeo</p>
                    <p>{regalofecha}</p>

                    <p style={{fontWeight:"bold"}}>Puntos</p>
                    <p><MdStars style={{color:"#7B3E90"}}/>{regalopuntos}</p>

                </div>
        </div>
    )

    function delNotificacion(id) {
        console.log(id);
        try {
            axios.delete(baseUrl+'/inbox/api/delete_notifications/'+id+'/',{ headers })
            .then((response) => {
              ActualizarNotificaciones();
            })
            .catch((error) => {
              console.log(error);
            });
      
          } catch (error) {
            console.log(' . ', error);
          }// eslint-disable-next-line react-hooks/exhaustive-deps
      }

      function ActualizarNotificaciones() {
        axios.get(baseUrl+'/inbox/api/notifications/'+id_usuario+'/',{ headers })
          .then((response) => {
            numNotificaciones = response.data[1][0]["unread_notifications: "];
            setlistNotificaciones(response.data[0])
          })
          .catch((error) => {
            console.log(error);
          });
    }

    function readNotificacion(id,idorder){
        console.log(id)
        axios.put(baseUrl+'/inbox/api/mark_read_notifications/'+id+'/')
            .then((response) => {
                window.location.href = '/detallescanje/'+idorder
            })
            .catch((error) => {
            console.log(error.response);
            });
}
    

    return(    
        <>
        <div className="l-navbar" id="nav-bar">
        <nav className="nav">
            <div>
                <div className="nav_list">
                    <a href="/home" style={{color:"blueviolet"}} className="nav_link"> <i className='bx bx-home bx-tada nav_icon'></i></a>
                    <a href="/misregalos" className="nav_link"> <i className='bx bx-gift nav_icon'></i></a> 
                    <a href="/miperfil" className="nav_link"> <i className='bx bx-user nav_icon'></i></a> 
                    <a href="/misdirecciones" className="nav_link"> <i className='bx bx-directions nav_icon' ></i> </a> 
                    <a href="/logout" className="nav_link"> <i className='bx bx-log-out-circle nav_icon'></i></a>
                </div>
            </div>
        </nav>
    </div>
    <div className="height-100">
        <div className="container">
                <div>
                    <h4 style={{fontWeight: 300,paddingTop:15}}>¡Hola!</h4>
                    <div className="row">
                        <div className="col">
                            <h3 style={{fontSize:34, fontWeight:"bold"}}>{list.first_name}</h3>    
                        </div>
                        <div className="col" style={{textAlign:"end"}}>
                        <div className="dropdown">
                            <button style={{backgroundColor:"#7B3E90",color:"white"}} className="btn btn-secondary dropdown-toggle position-relative" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Notificaciones
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {numNotificaciones}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {listNotificaciones.map((item,index) => (
                                    <div key={index}>
                                        {
                                        item.unread === true
                                        ? <div>
                                                <div className='row'>
                                                    <div className='col-10'>
                                                        <button style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}} className="btn dropdown-item" onClick = {() => { readNotificacion(item.id,item.actor_object_id)} }>{item.description}</button>
                                                    </div>
                                                    <div className='col-2'>
                                                        <button className='btn'  onClick = {() => { delNotificacion(item.id)} }><MdDelete className='btnDel' style={{width:"100%",fontSize:24}}></MdDelete></button>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        : <div style={{backgroundColor:"beige"}} >
                                                <div className='row'>
                                                    <div className='col-10'>
                                                        <button style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}} className="btn dropdown-item" onClick = {() => { readNotificacion(item.id,item.actor_object_id)} }>{item.description}</button>
                                                    </div>
                                                    <div className='col-2'>
                                                        <button className='btn'  onClick = {() => { delNotificacion(item.id)} }><MdDelete className='btnDel' style={{width:"100%",fontSize:24}}></MdDelete></button>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                        </div>
                    </div>
                    
                     
                </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card bgcampana">
                        <button className="bt-cards" onClick={openCampana}>
                            <div className="card-body" style={{height:"100%"}}>
                            <h5 className="card-title" style={{position: "absolute"}}>Numero de campañas</h5>
                            <p className="card-text" style={{fontSize: "32px", fontWeight: "bold",textAlign:"right"}}>{list.campaigns}</p>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card bgregalos">
                    <button className="bt-cards" onClick={openRegalo}>
                        <div className="card-body" style={{height:"100%"}}> 
                            <h5 className="card-title" style={{position: "absolute"}}>Regalos canjeados</h5>
                            <p className="card-text" style={{fontSize: "32px", fontWeight: "bold",textAlign:"right"}}>{list.redeemed}</p>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card bgpuntos">
                    <button className="bt-cards" onClick={openPuntos}>
                            <div className="card-body" style={{height:"100%"}}>
                            <h5 className="card-title" style={{position: "absolute"}}>Puntos restantes</h5>
                            <p className="card-text" style={{fontSize: "32px", fontWeight: "bold",textAlign:"right"}}>{list.points}</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <hr style={{height: 9}}></hr>

            <div id='campanas' className="container" style={{backgroundColor: "#BEEAEF", paddingBottom:30,display:"block"}}>
                <div style={{padding: 16}}>
                    <h4 style={{fontWeight: 300}}>Mis</h4>
                    <h3 style={{fontSize:34, fontWeight:"bold"}}>Campañas</h3>
                </div>
                <div className="row">
                  {listCampanas.map((item,index) => (
                        <div key={index} className="col-sm-3" style={{paddingBottom:20}}>
                            <div className="card" style={{height:"100%"}}>
                            <div className="card-body" style={{position:"relative",paddingBottom:40}}>
                                <h5 className="card-title">{item.campaign_name}</h5>
                                <p className="card-text">{item.slug}</p>
                                <button className="btn btn-danger" style={{position:"absolute",right:"3%",bottom:"5%",borderRadius:20}} onClick = {() => { methodName2(item.campaign_name,item.start_date,item.end_date);} }>Ver detalles</button>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id='regalos' className="container" style={{backgroundColor: "#F5BFC4", paddingBottom:30,display:"none"}}>
                <div style={{padding: 16}}>
                    <h4 style={{fontWeight: 300}}>Regalos</h4>
                    <h3 style={{fontSize:34, fontWeight:"bold"}}>canjeados</h3>
                </div>
                <div className="row">
                {listRegalos.map((item,index) => (
                    <div key={index} style={{paddingTop:10}} className="col-sm-3">
                        <div style={{height:"100%"}} className="card">
                        <div className="card-body">
                            <img alt="" style={{width:"100%"}} src={ imguRL + item.image }></img>
                        </div>
                        <div className="card-footer">
                            <h5 className="card-title">{item.product_name}</h5>
                            <p className="card-text"><MdStars style={{color:"#7B3E90"}}/>{item.points}</p>
                            <div style={{textAlign:"right"}} className="contianer">
                                <button className="btn btn-danger" style={{borderRadius:20}} onClick = {() => { methodName(item.id,item.product_name,item.created_at,item.image,item.points);} } >Ver detalles</button>
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>

            <div id='puntos' className="container" style={{backgroundColor: "#BFB3CF", paddingBottom:30,display:"none"}}>
                <div style={{padding: 16}}>
                    <h4 style={{fontWeight: 300}}>Puntos</h4>
                    <h3 style={{fontSize:34, fontWeight:"bold"}}>Restantes</h3>
                </div>
                <div className="container" style={{textAlign:"center"}}>
                     <h2 style={{fontSize:105}}><MdStars style={{fontSize:110,color:"#7B3E90"}}/> {list.points} </h2>
                </div>
            </div>



        
        </div>
    </div>
        
    <Modal  show={show} size="md" onHide={handleClose} >
        <Modal.Body style={{backgroundColor:"#BEEAEF"}}>
        {bodyCampana}
        </Modal.Body>
    </Modal>

    <Modal  show={show1} size="md" onHide={handleClose1} >
        <Modal.Body style={{backgroundColor:"#F5BFC4"}}>
        {bodyRegalos}
        </Modal.Body>
    </Modal>


        </>
    )

}
export default FragmentHomeUser;