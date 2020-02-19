import React, { useState } from 'react';
import '../theme.css';
import { IonIcon, IonImg, IonText } from '@ionic/react';
import Axios from 'axios';

interface ITeste {
    hora: String,
    titulo: String,
    tipo: String,
    desc: String
}


const ItemAgenda: React.FC<ITeste> = (props) => {
    const rect = {
        width: "80px"
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
        <div className="timeline-item" style={{marginTop: "20px"}}> 
            <div className="timeline-info">
                <div style={{display: "flex", justifyContent: "start", alignItems: "center"}}>
                    <div style={rect}>
                        <div style={stly_hora}>{props.hora}</div>
                    </div>
                    <IonText style={{fontFamily: "Roboto, Helvetica Neue, sans-serif", fontSize: "20px", color: "#4a4a4a", marginLeft: "15px", marginTop: 0, marginBottom: 0, paddingBottom: 0}}>{props.titulo}</IonText>
                </div>
            </div>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
                <div style={{display: "flex", justifyContent: "start", alignItems: "flex-start", marginTop: "4px"}}>
                    <div style={{minWidth: "80px", maxWidth: "80px", width: "80px", color: "#8c8c8c", fontWeight: "bold", fontSize: "13px", textAlign: "center"}}>
                        {props.tipo}
                    </div>
                    <div style={{marginLeft: "15px", color: "#4a4a4a"}}>
                        {props.desc}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ItemAgenda;