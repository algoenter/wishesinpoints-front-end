import { MdStars } from 'react-icons/md';
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import MenuSuperAdmin from './MenuSuperAdmin';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var token = localStorage.getItem('tokenSuperAdmin');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const SuperAdminRegalos = () =>{
    const [list, setList] = useState([]);
    const [listcampanas, setlistcampanas] = useState([]);
    

    function methodName(id,iduser) {
        console.log(id);
        window.location.href = "/superadmin/detallescanje/"+id+"/"+iduser;
    }

    

    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/usercampaigns/api/super-admin/all-campaigns/1/',{
            campaign_name:""
          },{ headers })
          .then((response) => {
            
            if(response.status === 204){
                console.log('No content')
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
          axios.post(baseUrl+'/orders/api/get_index_orders/1/',{
              campaign_name:""
          },{ headers })
          .then((response) => {
            console.log(response.data);
            setList(response.data);

          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setList])

      function BuscarPorCampana(evt) {
        
        axios.post(baseUrl+'/orders/api/get_index_orders/1/',{
            campaign_name:document.getElementById('selectCampanaBuscar').value
          },{headers})
          .then((response) => {
              //console.log(response.data);
              setList(response.data);
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
                    <h4 style={{fontWeight: 300,paddingTop:15}}>Lista de</h4>
                    <div className="row">
                        <div className="col-4">
                            <h3 style={{fontSize:34, fontWeight:"bold"}}>Regalos canjeados</h3> 
                        </div>
                        <div style={{textAlign:"right"}} className="col-8">
                            <div className='row'>
                                <div className='col'>
                                </div>
                                <div className='col'>
                                    <Form.Select id='selectCampanaBuscar' onChange={BuscarPorCampana}>
                                        <option value="">Buscar por campaña</option>
                                        {listcampanas.map((item,index)=>(
                                            <option key={index} value={item.campaign_name} >{item.campaign_name}</option>
                                        ))}
                                    </Form.Select>
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
                <th scope="col">Nombre del producto</th>
                <th scope="col">Costo en puntos</th>
                <th scope="col">Canjeado por</th>
                <th scope="col">Fecha de canje</th>
                <th scope="col">Campaña</th>
                <th scope="col">Estatus</th>
                <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item,index) => (
                    <tr key={index}>
                        <td>
                            <img style={{width:60}} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/' + item[2][0]["image"]}></img>
                        </td>
                        <td>
                            {item[2][0]["product_name"]}
                        </td>
                        
                        <td >
                            <MdStars style={{fontSize:28,color:"#7B3E90"}}/>{item[2][0]["points"]}
                        </td>
                        <td>
                            {item[3][0]["first_name"]}
                        </td>
                        <td>
                            {item[0][0]["order_date"]}
                        </td>
                        <td>
                            {item[0][0]["campaign"]}
                        </td>
                        <td>
                            {item[0][0]["order_status"]}
                        </td>
                        <td>
                            <button className="btn btn-danger" style={{borderRadius: 20,color:"white"}} onClick = {() => { methodName(item[1][0]["orders_id"],item[0][0]["user_id"]);} } >Ver detalle</button>
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
export default SuperAdminRegalos;