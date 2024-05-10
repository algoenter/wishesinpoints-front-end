import React, {useState,useEffect} from 'react';
import { Modal,Button,Row,Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Prosa1 from '../images/Prosa.png';
import Pmorado1 from '../images/Pmorado.png';
import Pazul1 from '../images/Pazul.png';
import Pregalo from '../images/Pregalo1.png';
import Pliston from '../images/Pliston.png';

import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var bolean = false;

const headers = {
    'Content-Type': 'application/json',
};



const FragmentReedem = () =>{
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  
  const [list, setList] = useState([]); 
  const [listproducts, setlistproducts] = useState([]); 
  const [listplantilla, setlistplantilla] = useState([]); 

  var { uuid } = useParams(); // params
  var { rtoken } = useParams(); // params 
  useEffect(() =>{  
    try {
      axios.get(baseUrl+'/products/gift/' + uuid + '/' + rtoken + '/', { headers })
      .then((response) => {
          if(response.status === 204){
            bolean = true;
            document.getElementById('valido').style.display="block"
            document.getElementById('btnOK').style.display="none"

          }
        localStorage.clear();
        localStorage.setItem('uuid',uuid);
        localStorage.setItem('rtoken',rtoken);
        setList(response.data[0][0]);
        localStorage.setItem('id_user_invitacion',response.data[0][0]["id"]);
        setlistproducts(response.data[3][0]);
        setlistplantilla(response.data[4][0]);
        
      })
      .catch((error) => {
        console.log(error);
      });

    } catch (error) {
      console.log(' . ', error);
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[setList],[setlistproducts],[setlistplantilla]);


  function methodName() {
    console.log(listproducts.id);
    localStorage.setItem('producto', listproducts.id);
    window.location.href = "/product/"+listproducts.id;
}

    return(
      
        <>

          
              <div className="navbar navbar-expand-lg navbar-light navContainer" style={{color:"white",backgroundColor:listplantilla.color_header,justifyContent: "space-around"}}>
                  <h3>Hola {list.first_name}</h3>
                  <h2>{listproducts.campaign_name}</h2>
                  <h4>{list.points} pts</h4>
                  <h3 id="valido" style={{color:"black",display:"none"}}>Invitacion expirada</h3>
              </div>
              
              {
                    (bolean) === false
                        ?   <div>
                                <img alt="" src={Prosa1} style={{filter:"invert(98%) sepia(32%) saturate(4864%) hue-rotate(287deg) brightness(92%) contrast(94%)",width:"100%",height:"90vh",position:"absolute"}}></img>
                                <img alt="" src={Pmorado1} style={{filter:"invert(34%) sepia(48%) saturate(437%) hue-rotate(226deg) brightness(100%) contrast(90%)",width:"100%",height:"90vh",position:"absolute"}}></img>
                                <img alt="" src={Pazul1} style={{filter:"invert(89%) sepia(12%) saturate(818%) hue-rotate(142deg) brightness(92%) contrast(89%)",width:"100%",height:"90vh",position:"absolute"}}></img>
                                <img alt="" src={Pregalo} style={{filter:"invert(29%) sepia(12%) saturate(7496%) hue-rotate(240deg) brightness(96%) contrast(90%)",width:"100%",height:"90vh",position:"absolute"}}></img>
                                <img alt="" src={Pliston} style={{filter:"invert(100%) sepia(74%) saturate(1667%) hue-rotate(163deg) brightness(91%) contrast(91%)",width:"100%",height:"90vh",position:"absolute"}}></img>
                            </div>
                        : <div>
                            <img alt="" src={Prosa1} style={{filter:listplantilla.color_footer_filter,width:"100%",height:"90vh",position:"absolute"}}></img>
                            <img alt="" src={Pmorado1} style={{filter:listplantilla.color_header_filter,width:"100%",height:"90vh",position:"absolute"}}></img>
                            <img alt="" src={Pazul1} style={{filter:listplantilla.secondary_color_filter,width:"100%",height:"90vh",position:"absolute"}}></img>
                            <img alt="" src={Pregalo} style={{filter:listplantilla.primary_color_filter,width:"100%",height:"90vh",position:"absolute"}}></img>
                            <img alt="" src={Pliston} style={{filter:listplantilla.color_footer_filter,width:"100%",height:"90vh",position:"absolute"}}></img>
                          </div>
                }
    
              
              
            

              <button id="btnOK" className="btn" style={{display:"block",backgroundColor:listplantilla.secondary_color,position:"absolute", right:"5%",bottom:"5%", fontWeight:700,color:"white"}} onClick={handleShow} >Abrir</button>


          <Modal show={show} size="lg" onHide={handleClose}>
            <Modal.Body>
              <div>
                <h3 style={{textAlign:"center"}}>¡Has recibido un regalo!</h3>
              </div>
              <div className="container">
                <Row>
                  <Col>
                    <br/><br/><br/>
                    <h3>Hola {list.first_name}</h3>
                    <p style={{textAlign:"justify"}}>Ten un maravilloso día, puedes elejir este regalo clikeando en "Escoge este regalo" o selecciona otro de los productos de nuestro catalago <br/>Para ver otros regalos selecciona "Revisa otras opciones"</p><br/>
                    <p style={{margin:0}}>Tus amigos</p>
                    <p><b>{listproducts.campaign_name}</b></p>
                  </Col>
                  <Col>
                    <br/>
                    <p style={{textAlign:"center"}}>{listproducts.product_name}</p>
                    <div className="container" style={{textAlign:"center"}}>
                        {
                            (listproducts.image) === '' 
                            ? <img style={{width:"100%"}} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                            : <img style={{width:"100%"}} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/'+listproducts.image}></img>
                        }
                    </div>
                    
                  </Col>
                </Row>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick = {() => { methodName()} } >
                Escoge este regalo
              </Button>
              <Button variant="danger" onClick={event =>  window.location.href='/catalogo'}>
                Revisa otras opciones
              </Button>
            </Modal.Footer>
          </Modal>


        </>
    )

}
export default FragmentReedem;