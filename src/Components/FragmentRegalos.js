import { MdStars } from 'react-icons/md';
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;


const imguRL = 'https://wishesinpointsbucket.s3.amazonaws.com/';

var id_usuario = localStorage.getItem('id_usuario');

const FragmentProductDetails = () =>{
    const [list, setList] = useState([]);
    

    function methodName(id) {
        window.location.href = "/detallescanje/"+id;
    }

    useEffect(() =>{  
        try {
          axios.get(baseUrl+'/orders/api/get_index/'+id_usuario+'/')
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
        <div className="l-navbar" id="nav-bar">
        <nav className="nav">
            <div>
                <div className="nav_list">
                    <a href="/home" className="nav_link"> <i className='bx bx-home nav_icon'></i></a>
                    <a href="/misregalos" style={{color:"blueviolet"}} className="nav_link"> <i className='bx bx-gift bx-tada nav_icon'></i></a> 
                    <a href="/miperfil" className="nav_link"> <i className='bx bx-user nav_icon'></i></a> 
                    <a href="/misdirecciones" className="nav_link"> <i className='bx bx-directions nav_icon' ></i> </a> 
                    <a href="/logout" className="nav_link"> <i className='bx bx-log-out-circle nav_icon'></i></a> 
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
                <th scope="col">Puntos del producto</th>
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
                        <td >
                            <MdStars style={{fontSize:28,color:"#7B3E90"}}/>{item[2][0]["points"]}
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
export default FragmentProductDetails;