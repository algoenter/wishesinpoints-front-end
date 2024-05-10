import React from 'react';

import { OverlayTrigger,Tooltip } from 'react-bootstrap';

import { ReactComponent as IconInicio } from '../images/iconos/inicio.svg';
import { ReactComponent as IconRegalos } from '../images/iconos/regalos.svg';


import { ReactComponent as IconAdminPerfiles } from '../images/iconos/administrarperfiles.svg';
import { ReactComponent as IconListaProducto } from '../images/iconos/listaproductos.svg';
import { ReactComponent as IconSalir } from '../images/iconos/CerrarSesion.svg';

const MenuAdmin = () =>{
    


    return(    
        <>
            <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Inicio</Tooltip>}>
                <span className="d-inline-block">
                    <a href="/admin/home/" className="nav_link"> <IconInicio style={{width:26,height:"100%"}}/></a>
                </span>
            </OverlayTrigger>
            <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Pedidos</Tooltip>}>
                <span className="d-inline-block">
                    <a href="/admin/regalos/" className="nav_link"> <IconRegalos style={{width:26,height:"100%"}}/></a> 
                </span>
            </OverlayTrigger>
            <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Perfiles</Tooltip>}>
                <span className="d-inline-block">
                    <a href="/admin/administrarperfiles/" className="nav_link"><IconAdminPerfiles style={{width:26,height:"100%"}}/></a> 
                </span>
            </OverlayTrigger>
            <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Productos</Tooltip>}>
                <span className="d-inline-block">
                    <a href="/admin/listaproducto/" className="nav_link"><IconListaProducto style={{width:26,height:"100%"}}/></a> 
                </span>
            </OverlayTrigger>
            <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Salir</Tooltip>}>
                <span className="d-inline-block">
                    <a href="/admin/salir/" className="nav_link"><IconSalir style={{width:26,height:"100%"}}/></a> 
                </span>
            </OverlayTrigger>
            
            
            
            
            
            
            
        
        </>
    )

}
export default MenuAdmin;