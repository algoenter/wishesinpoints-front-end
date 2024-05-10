import { MdStars } from 'react-icons/md';
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import MenuAdmin from './MenuAdmin';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

const imguRL = 'https://wishesinpointsbucket.s3.amazonaws.com/';

var token = localStorage.getItem('tokenAdmin');
var id_usuarioAdmin = localStorage.getItem('id_usuarioAdmin');
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const FragmentAdminRegalos = () =>{
    const [list, setList] = useState([]);
    

    function methodName(id) {
        window.location.href = "/admin/detallescanje/"+id;
    }

    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/orders/api/get_index_orders/'+id_usuarioAdmin+'/',{
              campaign_name:""
          },{ headers })
          .then((response) => {
            //console.log(response.data);
            setList(response.data);

          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setList])

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
    <div className="height-100">
        <div className="container">
            <br></br>
            <h4 style={{fontWeight: 300}}>Regalos</h4>
            <h3 style={{fontSize:34, fontWeight:"bold"}}>Canjeados</h3>
        </div>
        <div className="container">
        <table className="table">
            <thead className="thead-dark" style={{backgroundColor: "#BFB3CF", color:"black"}}>
                <tr>
                <th scope="col">Imagen</th>
                <th scope="col">Nombre del producto</th>
                <th scope="col">Fecha de canje</th>
                <th scope="col">Canjeado por</th>
                <th scope="col">Costo en puntos</th>
                <th scope="col">Campaña</th>
                <th scope="col">Estatus</th>
                <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item,index) => (
                    <tr key={index}>
                        <td>
                            <img style={{width:60}} alt='' src={imguRL + item[2][0]["image"]}></img>
                        </td>
                        <td>
                            {item[2][0]["product_name"]}
                        </td>
                        <td>
                            {item[0][0]["order_date"]}
                        </td>
                        <td>
                            {item[3][0]["first_name"]}
                        </td>
                        <td >
                            <MdStars style={{fontSize:28,color:"#7B3E90"}}/>{item[2][0]["points"]}
                        </td>
                        <td>
                            {item[0][0]["campaign"]}
                        </td>
                        <td>
                            {item[0][0]["order_status"]}
                        </td>
                        <td>
                            <button className="btn btn-danger" style={{borderRadius: 20,color:"white"}} onClick = {() => { methodName(item[1][0]["orders_id"]);} } >Ver detalle</button>
                        </td>

                    </tr>
                ))}
            
            </tbody>
        </table>

            

        </div>
    </div>
        
         


        </>
    )

}
export default FragmentAdminRegalos;