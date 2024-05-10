import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { MdStars,MdSearch } from 'react-icons/md';
import MenuAdmin from './MenuAdmin';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var token = localStorage.getItem('tokenAdmin');


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const FragmentAdminPerfiles = () =>{
    const [list, setList] = useState([]);
    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/usercampaigns/api/admin-campaign-users/',{
              full_name:""
          },{headers})
          .then((response) => {
              //console.log(response.data)
              if(response.status === 204){
                  //console.log(response.statusText);
              }else{
                setList(response.data);
              }
              
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setList])

      function BuscarPorNombre() {
        axios.post(baseUrl+'/usercampaigns/api/admin-campaign-users/',{
              full_name:document.getElementById("BuscarNombre").value,
          },{headers})
          .then((response) => {
              //console.log(response.data)
              if(response.status === 204){
                //console.log(response.statusText);
                }else{
                setList(response.data);
                }
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
                        <MenuAdmin></MenuAdmin>            
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
                                <h3 style={{fontSize:34, fontWeight:"bold"}}>Clientes</h3> 
                            </div>
                            <div style={{textAlign:"right"}} className="col-8">
                                <div className='row'>
                                    <div className='col'>
                                    </div>
                                    <div className='col'>
                                        <div className="input-group" style={{paddingBottom:10}}>
                                            <input type="text" className="form-control" id='BuscarNombre' placeholder='Buscar por nombre'></input>
                                            <span className="input-group-btn">
                                                <button className="btn" style={{backgroundColor:"#7B3E90"}} type="button" onClick = {() => { BuscarPorNombre()}} > 
                                                    <MdSearch style={{color:"white"}} ></MdSearch>
                                                </button>
                                            </span>
                                            
                                        </div>
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
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item,index) => (
                                <tr key={index}>
                                    <td>
                                        {
                                            (item[1][0].image) === '' 
                                            ? <img style={{width:50}} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                                            : <img style={{width:50}} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/'+item[1][0].image}></img>
                                        }
                                    </td>
                                    <td>
                                        {item[0][0].first_name+" "+item[0][0].last_name}
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
                                        {(list[index][2]).map((data,index2) =>
                                            <li key={index2}>{data.campaign_name}</li>
                                         )}
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
export default FragmentAdminPerfiles;