import React, { useState } from 'react';
import '../theme.css';
import { IonIcon, IonImg } from '@ionic/react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

interface ITeste {
    texto: string;
    idCategoria: string;
    urlImagem: string;
}


const ItemFeiraEmprego: React.FC<ITeste> = (props) => {

    const rect = {
        minWidth: "40px",
        minHeight: "40px"
    };
    
    return (
        <div> 
            <div tabIndex={0}>
                <div style={{ display: "flex", padding: "10px", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={rect}>
                        <IonImg src={props.urlImagem} />
                    </div>
                    <div style={{ marginLeft: "10px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #dfdfdf", textDecoration: "none" }}>
                        <p style={{ marginRight: "auto", color: "#4b4b4b", fontWeight: "bold" }}>{props.texto}</p>
                        
                        <div>
                        <IonIcon className="arrowFoward" style={{ backgroundColor: "#4b4b4b", fontSize: "24px", minWidth: "24px" }}></IonIcon>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );

}

export default ItemFeiraEmprego;