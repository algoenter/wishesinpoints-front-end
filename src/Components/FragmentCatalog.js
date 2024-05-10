import React, { Component } from 'react';
import axios from 'axios';
import { Button,Row,Col } from 'react-bootstrap';
import { MdStars } from 'react-icons/md';
import '../config';

var baseUrl = global.config.wishes.inPoints.url;
var id = localStorage.getItem('id_user_invitacion');

var uuid = localStorage.getItem('uuid');
var rtoken = localStorage.getItem('rtoken');



class FragmentCatalog extends Component {    
    state = {
        products: []
    }

    redirection = (parametro) => {
        localStorage.setItem('producto', parametro);

        window.location.href = "/product/"+parametro;
    }

    componentDidMount() {
        axios.post(baseUrl+'/products/api/get_catalog/'+id+"/",{
            product_name: '',
        })
            .then(res => {
                const products = res.data;
                this.setState({
                    products: products
                });
            })
    }

    render() {
        // Aws S3
        const imguRL = 'https://wishesinpointsbucket.s3.amazonaws.com/';

        return (
            <div>
            <div>

                <div className='row'>
                    <div className='col'>
                        <h3 style={{margin:40}}>Productos disponibles</h3>
                    </div>
                    <div className='col'>
                        <div style={{padding:40}}>
                            <button className='btn' style={{float:"right",backgroundColor:"#DC3545",color:"white"}} onClick={event =>  window.location.href='/Reedem/'+uuid+'/'+rtoken}>Volver</button>
                        </div>
                    </div>
                </div>

                <div style={{paddingBottom:40}}>
                    <div className="grid-container-products">
                        {this.state.products.map(p =>
                        <Button style={{backgroundColor:"transparent", borderColor:"black",color:"black"}} className="content-product card__content" onClick={() => this.redirection(p.id)}>
                            <div key={p.id}>
                            <div style={{textAlign:"center"}}>
                                <img style={{width:200, height:200}} src={ imguRL + p.image } alt="products"></img>
                            </div>
                            <div>
                                <Row>
                                    <Col md={6} style={{textAlign:"left"}}>
                                    <p>{p.product_name}</p>
                                    </Col>
                                    <Col md={6} style={{textAlign:"right"}}>
                                    <p><MdStars style={{fontSize:20,color:"#7B3E90"}}/>{p.points} pts</p>
                                    </Col>
                                </Row>
                            </div>
                            </div>
                        </Button>
                        )}
                    </div>
                </div>
            </div>

            
            </div>
            


        )
    }
}





export default FragmentCatalog;