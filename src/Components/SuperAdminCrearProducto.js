import React, {useState,useEffect} from 'react';
import { Form,Button,Row,Col,Modal } from 'react-bootstrap';
import axios from 'axios';
import MenuSuperAdmin from './MenuSuperAdmin';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var token = localStorage.getItem('tokenSuperAdmin');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const SuperAdminCrearProducto = () =>{
    const [selectedFile, setSelectedFile] = useState("");
    const [listCategoria, setlistCategoria] = useState([]);
    const [listcampanas, setlistcampanas] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [listUserErr, setlistUserErr] = useState([]);

    const [inputs, setInputs] = useState({
        product_name:"",
        description:"",
        points:0,
        amount:0,
        status:0,
    })

    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0])
    }


    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

      useEffect(() =>{  
        try {
          axios.post(baseUrl+'/categories/api/get_list/',{
            category_name:""
          },{ headers })
          .then((response) => {
            setlistCategoria(response.data);
            //console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setlistCategoria])

      useEffect(() =>{  
        try {
          axios.post(baseUrl+'/usercampaigns/api/super-admin/all-campaigns/1/',{
            campaign_name:""
          },{ headers })
          .then((response) => {
            if(response.status === 204){
              //console.log(response.data);
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


    const handleSubmit = (event) => {
      let text = document.getElementById('selectCampana').value;
      const myArray = text.split("/");
      let word = myArray[1];
      let word2 = myArray[0];
      
        if(document.getElementById("file").value === ""){
            document.getElementById('labelImg').style.color="red";
        }else{
            document.getElementById('labelImg').style.color="blue";

            let formData = new FormData();
            formData.append('image', selectedFile)
            formData.append('brands', word)
            formData.append('campaigns', word2)
            formData.append('categories', document.getElementById('selectCategoria').value)
            formData.append('product_name', inputs.product_name)
            formData.append('description', inputs.description)
            formData.append('points', inputs.points)
            formData.append('amount', inputs.amount)
            formData.append('status', inputs.amount)

            axios.post(baseUrl+'/products/api/register/', 
            formData    
            ,{headers})
            .then((response) => {
                //console.log(response);
                window.location.href = "/superadmin/lista-productos/";
            })
            .catch(err => {
                console.log(err);
            });
        
        }

        

    }

    const handleSubmitExcel = (event) => {
      event.preventDefault()
      let formData = new FormData();
      formData.append('pathfile', selectedFile)

      axios.post(baseUrl+'/uploadfiles/api/upload-products/', 
      formData    
      ,{headers})
      .then((response) => {
          //console.log(response);
          window.location.href = "/superadmin/lista-Productos/";

      }).catch(err => {
        console.log(err.response)
          setlistUserErr(err.response.data[1])
          document.getElementById("mensaje").style.display = "block"
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
                        <h4 style={{fontWeight: 300,paddingTop:15}}>Agregar</h4>
                        <div className="row">
                                <div className="col">
                                    <h3 style={{fontSize:34, fontWeight:"bold"}}>Productos</h3> 
                                </div>
                                <div style={{textAlign:"right"}} className="col">
                                  <Button style={{backgroundColor:"#7B3E90",borderColor:"#7B3E90"}} onClick = {() => { handleShow()} }>Subir por excel</Button>
                                </div>
                            </div>
                    </div>
                    <hr style={{height: 9}}></hr>
            </div>

            <div className="container">
            <Form onSubmit={handleSubmit}>
                    <label htmlFor="file" id='labelImg'>Selecciona una imagen *</label><br></br>
                    <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" onChange={handleFileSelect}/>
                    <Row className="mb-3" style={{marginTop: 15}}>
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Nombre del producto *</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="product_name" value={inputs.product_name} onChange={handleChange}/>
                        </Form.Group>

                    </Row>
                    <Row className="mb-3">
                        
                      <Form.Group as={Col} controlId="">
                        <Form.Label>Selecciona una categoria</Form.Label>
                        <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} aria-label="Default select example" id='selectCategoria'>
                        {listCategoria.map((item,index)=>(
                            <option key={index} value={item.id}>{item.category_name}</option>
                        ))}
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Selecciona una campaña</Form.Label>
                        <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} aria-label="Default select example" id='selectCampana'>
                        {listcampanas.map((item,index)=>(
                            <option key={index} value={item.id+"/"+item.brands_id}>{item.campaign_name}</option>
                        ))}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3" style={{marginTop: 15}}>
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Costo en Puntos *</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="number" name="points" value={inputs.points} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Cantidad *</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="number" name="amount" value={inputs.amount} onChange={handleChange}/>
                        </Form.Group>
                    </Row>
                    <Form.Group as={Col} controlId="" style={{marginBottom:15}}>
                        <Form.Label>Descripcion del producto *</Form.Label>
                        <Form.Control style={{backgroundColor:"#BFBFBF",borderRadius:20}} required type="text" name="description" value={inputs.description} onChange={handleChange}/>
                    </Form.Group>
                    <p id='msgerror' style={{color:"red",display:"none"}}>Error, verifica que los campos no esten vacios o intentalo mas tarde.</p>
                    <div className='container' style={{textAlign:"right"}}>
                    <Button style={{background:"#7B3E90",borderColor:"white"}} type="button" onClick={handleSubmit}>
                        Agregar
                    </Button>
                    </div>
                    </Form>    
            </div>
            
        </div>

        <Modal  show={show} size="md" onHide={handleClose} >
            <Modal.Body style={{margin:20}}>
            <div>
                <h4>Subir productos por excel</h4>
                <form onSubmit={handleSubmitExcel}>
                <input type="file" onChange={handleFileSelect} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" /><br></br><br></br>
                <Button type="submit" value="Upload File" style={{backgroundColor:"#7B3E90",borderColor:"#7B3E90"}}>Cargar</Button>
                </form>

                <div>
                    <p id="mensaje" style={{display:"none"}}>Hubo unos errores al subir estos productos, verifica sus datos:</p>
                    {listUserErr.map((item,index)=>(
                        <li key={index} style={{color:"red"}}>{item.product_name}</li>
                    ))}
                </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    )

}
export default SuperAdminCrearProducto;