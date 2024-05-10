import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Form,Toast,ToastContainer } from 'react-bootstrap';
import MenuSuperAdmin from './MenuSuperAdmin';
import { MdOutlineLocalPolice,MdPerson } from 'react-icons/md';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var token = localStorage.getItem('tokenSuperAdmin');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};




const SuperAdminUserCampana = () =>{
    const [list, setList] = useState([]);
    const [listcampanas, setlistcampanas] = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);


    

      useEffect(() =>{  
        try {
          axios.post(baseUrl+'/usercampaigns/api/super-admin/all-campaigns/1/',{
            campaign_name:""
          },{ headers })
          .then((response) => {
              if(response.status === 204){
                  console.log('')
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
      

    function BuscarPorCampana(evt) {
        axios.get(baseUrl+'/usercampaigns/api/campaign-user-not-belong/'+document.getElementById('selectCategoriaBuscar').value+'/',{headers})
          .then((response) => {
              //console.log(response)
              setList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    function agregarTodos() {
        var checkboxes = document.getElementsByName('foo');
        for(var i=0, n=checkboxes.length;i<n;i++) {
            checkboxes[i].checked = document.getElementById('checkall').checked;
        }
    }

    function postAgregar() {
        console.log('----')

        var checkboxes = document.getElementsByName('foo');
        for(var i=0, n=checkboxes.length;i<n;i++) {
            if(checkboxes[i].checked === true){
                const myArray = checkboxes[i].value.split("-");
                let idUser = myArray[0];
                let staff = myArray[1];
                axios.post(baseUrl+'/usercampaigns/api/register/',{
                    campaigns:document.getElementById('selectCategoriaBuscar').value,
                    user:idUser,
                    is_administrator:staff
                },{headers})
                .then((response) => {
                    //console.log(response)
                    setShow(true)
                    
                })
                .catch((error) => {
                    setShow1(true)
                });
            } 
        }
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
                        <h4 style={{fontWeight: 300,paddingTop:15}}>Agregar</h4>
                        <div className="row">
                                <div className="col-4">
                                    <h3 style={{fontSize:34, fontWeight:"bold"}}>Usuarios a campañas</h3> 
                                    
                                </div>
                            </div>
                    </div>
                    <hr style={{height: 9}}></hr>
            </div>
            
            <div className="container">
                <p>- Selecciona la campaña a la que quieres agregar usuarios. a continuacion se mostraran los usuarios que no pertenecen a dicha campaña.</p>
                <p>- Selecciona los usuarios que decees agregar y presiona el boton de "agregar usuarios"</p>

                <Form.Select id='selectCategoriaBuscar' onChange={BuscarPorCampana}>
                    <option value="">Selecciona una campaña</option>
                    {listcampanas.map((item,index)=>(
                        <option key={index} value={item.id} >{item.campaign_name}</option>
                    ))}
                </Form.Select>
                <br></br>
                <ToastContainer position="bottom-center" className="p-3">
                    <Toast onClose={() => setShow(false)} show={show} delay={10000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">wishes in points</strong>
                        <small>Justo ahora</small>
                    </Toast.Header>
                    <Toast.Body>Usuarios agregados. Actualice la pagina para ver los cambios</Toast.Body>
                    </Toast>
                </ToastContainer>

                <ToastContainer position="bottom-center" className="p-3">
                    <Toast bg="danger" onClose1={() => setShow1(false)} show={show1} delay={10000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">wishes in points</strong>
                        <small>Justo ahora</small>
                    </Toast.Header>
                    <Toast.Body>Sucedio un error, intentalo mas tarde</Toast.Body>
                    </Toast>
                </ToastContainer>

                <table className="table">
                    <thead className="thead-dark" style={{backgroundColor: "#BFB3CF", color:"black"}}>
                        <tr>
                        <th scope="col"><input style={{fontSize:25}} className="form-check-input" id='checkall' type="checkbox" onClick = {() => { agregarTodos()}}  ></input> </th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Nombre completo</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item,index) => (
                                <tr key={index}>
                                    <td>
                                        <input style={{fontSize:25}} className="form-check-input" type="checkbox" value={item[0][0].id+"-"+item[0][0].is_staff} name='foo' ></input> 
                                    </td>
                                    <td>
                                        {
                                            (item[1][0].image) === '' 
                                            ? <img style={{width:50}} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                                            : <img style={{width:50}} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/'+item[1][0].image}></img>
                                        }
                                    </td>
                                    <td>
                                        {item[0][0].first_name + " "+item[0][0].last_name}
                                    </td>
                                    <td>
                                        {item[0][0].email}
                                    </td>
                                    <td>
                                        {item[1][0].phone}
                                    </td>
                                    <td>
                                    {
                                        (item[0][0].is_staff) === true 
                                        ? <MdOutlineLocalPolice style={{fontSize:32,color:"purple"}} />
                                        : <MdPerson style={{fontSize:32}} />
                                    }
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className='container' style={{textAlign:"right"}}>
                    <button className="btn" style={{backgroundColor:"#7B3E90",color:"white"}} type="button" onClick = {() => { postAgregar()}} > 
                        Agregar usuarios
                    </button>
                </div>
            </div>
        </div>
        
        </>
    )

}
export default SuperAdminUserCampana;