import React, { useState } from 'react';
import '../theme.css';
import { IonIcon, IonImg } from '@ionic/react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

interface ITeste {
    texto: string;
    urlImagem: string;
    pathTo: string;
}


const ItemMyAgenda: React.FC<ITeste> = (props) => {

    const elementoMenu = {
        display: "table-row"
      }
    
      const textoElemento = {
        display: "table-cell",
        verticalAlign:"middle",        
        fontSize: "16px",
        color:"#fff",
        marginLeft:"20px"
    
      }
    
      const texto = {
        fontSize: "18px",
        color:"#fff",
        marginLeft:"20px"
      }
    
      const imagemElemento = {
        display: "table-cell",
        verticalAlign:"middle",
        width:"46px"
      }
    return (
        <div style={{height:"32px", marginBottom:"8px"}}>
            <Link to={props.pathTo}>
                <div style={elementoMenu} id="test">                    
                    <div style={imagemElemento}><IonImg style={{width:"28px"}} src={props.urlImagem}/></div>  
                    <div style={textoElemento}>{props.texto}</div>                  
                </div>
            </Link>
        </div>
    );

}

export default ItemMyAgenda;