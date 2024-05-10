import React, {useState,useEffect} from 'react';
import axios from 'axios';
import MenuAdmin from './MenuAdmin';
import '../config';

var baseUrl = global.config.wishes.inPoints.url;



var token = localStorage.getItem('tokenAdmin');
var id_usuarioAdmin = localStorage.getItem('id_usuarioAdmin');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const FragmentAdminListaProductos = () =>{
    const [list, setList] = useState([]);

      useEffect(() =>{  
        try {
          axios.post(baseUrl+'/products/api/all_products/'+id_usuarioAdmin+'/',{
            product_name:"",
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
            <h4 style={{fontWeight: 300}}>Lista de</h4>
            <h3 style={{fontSize:34, fontWeight:"bold"}}>Productos</h3>
        </div>
        <div className="container">
        <table className="table">
            <thead className="thead-dark" style={{backgroundColor: "#BFB3CF", color:"black"}}>
                <tr>
                <th scope="col">Imagen</th>
                <th scope="col">Nombre del producto</th>
                <th scope="col">Puntos</th>
                <th scope="col">Cantidad restante</th>
                <th scope="col">Campaña</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item,index) => (
                    <tr key={index}>
                        <td>
                            {
                                (item.image) === '' 
                                ? <img style={{width:50}} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                                : <img style={{width:50}} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/'+item.image}></img>
                            }
                            
                        </td>
                        <td>
                            {item.product_name}
                        </td>
                        <td>
                            {item.points}
                        </td>
                        <td>
                            {item.status}
                        </td>
                        <td>
                            {item.campaign_name}
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
export default FragmentAdminListaProductos;