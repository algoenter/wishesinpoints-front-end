import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdStars,MdDateRange,MdDirections,MdGroups,MdWorkspaces,MdSentimentSatisfiedAlt } from 'react-icons/md';
import '../config';

var baseUrl = global.config.wishes.inPoints.url;

const imguRL = 'https://wishesinpointsbucket.s3.amazonaws.com/';

var token = localStorage.getItem('token');


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const FragmentDetalleCanje = () =>{
    var { idproduct } = useParams(); // params
    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);
    const [list3, setList3] = useState([]);

    function methodName(id) {
        window.location.href = "/cancelarcanje/"+id;
      }

    useEffect(() =>{  
        try {
          axios.get(baseUrl+'/orders/api/specific/'+idproduct+'/',{ headers })
          .then((response) => {
            setList2(response.data[0][0]);
            setList(response.data[0][2][0]);
            setList3(response.data[0][1][0]);
            
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setList],[setList2],[setList3])

    return(    
        <>
        <div className="l-navbar" id="nav-bar">
        <nav className="nav">
            <div>
                <div className="nav_list">
                    <a href="/home/" className="nav_link"> <i className='bx bx-home nav_icon'></i></a>
                    <a href="/misregalos/" style={{color:"blueviolet"}} className="nav_link"> <i className='bx bx-gift bx-tada nav_icon'></i></a> 
                    <a href="/miperfil/" className="nav_link"> <i className='bx bx-user nav_icon'></i></a> 
                    <a href="/misdirecciones/" className="nav_link"> <i className='bx bx-directions nav_icon' ></i> </a> 
                    <a href="/logout/" className="nav_link"> <i className='bx bx-log-out-circle nav_icon'></i></a> 
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
                <div style={{paddingTop:10,paddingBottom:10}} className="col-4">
                    <img alt="" style={{width:"80%"}} src={ imguRL + list.image}></img>
                </div>
                <div style={{paddingTop:10,paddingBottom:10,textAlign:"center", alignSelf:"center"}} className="col-4">
                    <h3 style={{fontSize:34, fontWeight:"bold"}}>{list.product_name}</h3> 
                </div>
                <div style={{paddingTop:10,paddingBottom:10,textAlign:"right"}} className="col-4">
                    <h4 style={{fontSize:34, fontWeight:"bold"}}><MdStars style={{color:"#7B3E90"}}/>{list.points + " pts"}</h4>     
                </div>
            </div>
        </div>
    </div>
    <div className="container">
        <div>
            <p><b>Datos del pedido:</b></p>
            <p><MdDateRange/> <b>Pedido Realizado:</b> {list2.order_date} &nbsp;&nbsp;&nbsp;<MdDirections/> <b>Fecha de entrega: </b> {list2.date_delivery}  </p>
            <p><MdGroups/> <b>Producto de la campaña:</b> {list2.campaign}</p>
            <p><MdWorkspaces/> <b>Cantidad: </b>{list3.amount}  &nbsp;&nbsp;&nbsp;  <MdStars/> <b>Puntos gastados: </b>{list3.total_price}  </p>
            <p></p>
            <p><MdSentimentSatisfiedAlt/> <b>Estatus:</b> {list2.status}</p>
        

            <div className="row">
                <div className="col">
                </div>
                <div style={{textAlign:"right"}} className="col">
                    <button style={{borderRadius:15,backgroundColor:"#7B3E90",color:"white"}} className="btn" onClick = {() => { methodName(list2.id);} }>Cancelar canje</button>
                </div>
            </div>

        </div>
        <hr style={{height: 9}}></hr>
    </div>
        
         


        </>
    )

}
export default FragmentDetalleCanje;