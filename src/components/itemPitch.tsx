import React, { useState } from 'react';
import '../theme.css';
import { IonIcon, IonImg } from '@ionic/react';
import Axios from 'axios';
import SubItemProgramaHorario from './subitemProgramaHorario';

interface IProps {
    texto: string;
    hora: string;
}
const ItemPitch: React.FC<IProps> = (props) => {
    
    const rect = {
        minWidth: "50px",
        margin: "0 auto"
    };
    const stly_hora = {
        margin: "0 auto",
        background: "#9b9b9b",
        padding: "2px",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "center",
        color: "white",
        fontSize: "14px"
    };
    return (
        <div style={{ display: "flex", padding: "0 10px", alignItems: "center", justifyContent: "space-between" }}>
            <div style={rect}>
                <div style={stly_hora}>
                    {props.hora}
                </div>
            </div>
            <div style={{ marginLeft: "15px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                <p style={{ marginRight: "auto", color: "#4b4b4b" }}>{props.texto}</p>
            </div>
        </div>
    );

}



export default ItemPitch;