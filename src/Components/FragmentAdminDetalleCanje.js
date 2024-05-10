import { MdStars } from 'react-icons/md';
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuAdmin from './MenuAdmin';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

const imguRL = 'https://wishesinpointsbucket.s3.amazonaws.com/';


var token = localStorage.getItem('tokenAdmin');


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const FragmentAdminDetalleCanje = () =>{
    var { idorder } = useParams(); // params
    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);
    const [listUser, setlistUser] = useState([]);


    useEffect(() =>{  
        try {
          axios.get(baseUrl+'/orders/api/specific/'+idorder+'/',{ headers })
          .then((response) => {
            setList2(response.data[0][0][0]);
            setList(response.data[0][2][0]);
            setlistUser(response.data[0][3][0])
            
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setList],[setList2],[setlistUser])

    return(    
        <>
        <div className="l-navbar" style={{padding:"1rem 0rem 0 0"}} id="nav-bar">
            <nav className="nav">
                <div>
                    <div className="nav_list">
                        <MenuAdmin></MenuAdmin>            
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
            <p style={{fontSize:"1.5rem", fontWeight: 300,paddingTop:15}}><b style={{fontWeight: 700}}>Canjeado por: </b>{listUser.first_name + ' '+listUser.last_name}</p>
                <p style={{fontSize:"1.5rem", fontWeight: 300,paddingTop:15}}><b style={{fontWeight: 700}}>Fecha de canje: </b>{list2.order_date}</p>
                <p style={{fontSize:"1.5rem", fontWeight: 300,paddingTop:15}}><b style={{fontWeight: 700}}>Fecha de entrega: </b>{list2.date_delivery}</p>
                <p style={{fontSize:"1.5rem", fontWeight: 300,paddingTop:15}}><b style={{fontWeight: 700}}>Status: </b>{list2.status}</p>
            </div>
            <hr style={{height: 9}}></hr>
        </div>
        </>
    )

}
export default FragmentAdminDetalleCanje;