import React, {useState,useEffect} from 'react';
import { MdStars } from 'react-icons/md';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import MenuSuperAdmin from './MenuSuperAdmin';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;


const imguRL = 'https://wishesinpointsbucket.s3.amazonaws.com/';
//npm i chart.js
//npm install --save react-chartjs-2 chart.js
//npm install react-color --save

var token = localStorage.getItem('tokenSuperAdmin');
var id_usuario = localStorage.getItem('id_usuarioSuperAdmin');
var username = localStorage.getItem('usernameSuperAdmin');

var regaloid = "";
var regalonombre = "";
var regalofecha = "";
var regaloImg = "";
var regalopuntos = "";
var cantidad = 0;
var total= 0;
var regaloscanjeados = 0;

var campananombre = "";
var campanainicio="";
var campanafin ="";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const SuperAdminHome = () =>{

    const [list, setList] = useState([]);
    const [listCampanas, setListCampanas] = useState([]); 
    const [listRegalos, setListRegalos] = useState([]); 



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

    function methodName(id,nombre,fecha_entrega,imagen,puntosTotales,cantidadpedido,precio) {
        regaloid = id;
        regalonombre = nombre;
        regalofecha = fecha_entrega;
        regaloImg = imagen;
        regalopuntos = precio;
        cantidad = cantidadpedido;
        total = puntosTotales;
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
              //console.log(response);
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
          axios.post(baseUrl+'/usercampaigns/api/super-admin/all-campaigns/'+id_usuario+'/',{
            campaign_name:""
          },{ headers })
          .then((response) => {
              //console.log(response)
              if(response.status === 204){
                  console.log('No content');

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
          axios.post(baseUrl+'/orders/api/get_index_orders/'+id_usuario+'/',{
              campaign_name:""
          },{ headers })
          .then((response) => {
              //console.log(response);
              regaloscanjeados = response.data.length;

            setListRegalos(response.data);
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

                    <p style={{fontWeight:"bold"}}><MdStars style={{color:"#7B3E90"}}/> Puntos gastados</p>
                    <p>{regalopuntos +" puntos * "+ cantidad +" productos = "+ total +" puntos"}</p>

                </div>
        </div>
    )
    

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
                    <h4 style={{fontWeight: 300,paddingTop:15}}>¡Hola!</h4>
                    <h3 style={{fontSize:34, fontWeight:"bold"}}>{list.first_name}</h3>     
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
                            <p className="card-text" style={{fontSize: "32px", fontWeight: "bold",textAlign:"right"}}>{regaloscanjeados}</p>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card bgpuntos">
                    <button className="bt-cards" onClick={openPuntos}>
                            <div className="card-body" style={{height:"100%"}}>
                            <h5 className="card-title" style={{position: "absolute"}}>Puntos por campaña</h5>
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
                        <div key={index} style={{paddingTop:10}} className="col-sm-3">
                            <div className="card" style={{height:"100%"}}>
                            <div className="card-body">
                                <h5 className="card-title">{item.campaign_name}</h5>
                                <p className="card-text">{item.slug}</p>
                            </div>
                            <div className="card-footer">
                                    <div style={{textAlign:"right"}} className="contianer">
                                    <button className="btn btn-danger" style={{borderRadius:20}} onClick = {() => { methodName2(item.campaign_name,item.start_date,item.end_date);} }>Ver detalles</button>
                                    </div>
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
                            <img alt="" style={{width:"100%"}} src={ imguRL + listRegalos[index][2][0]["image"] }></img>
                        </div>
                        <div className="card-footer">
                            <h5 className="card-title">{listRegalos[index][2][0]["product_name"]}</h5>
                            <p className="card-text">Campaña: {listRegalos[index][0][0]["campaign"]}</p>
                            <p className="card-text"><MdStars style={{color:"#7B3E90"}}/>{listRegalos[index][2][0]["points"]}</p>
                            <div style={{textAlign:"right"}} className="contianer">
                                <button className="btn btn-danger" style={{borderRadius:20}} onClick = {() => { methodName(listRegalos[index][0][0]["id"],listRegalos[index][2][0]["product_name"],listRegalos[index][0][0]["order_date"],listRegalos[index][2][0]["image"],listRegalos[index][1][0]["total_price"],listRegalos[index][1][0]["amount"],listRegalos[index][2][0]["points"]);} } >Ver detalles</button>
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
                    <h3 style={{fontSize:34, fontWeight:"bold"}}>por campaña</h3>
                </div>
                <div className="container" style={{textAlign:"center"}}>
                    
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
export default SuperAdminHome;