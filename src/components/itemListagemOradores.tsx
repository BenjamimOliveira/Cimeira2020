import React, { useState } from 'react';
import '../theme.css';
import { IonIcon, IonImg, IonAvatar } from '@ionic/react';
import Axios from 'axios';

interface ITeste {
    nome: string;
    cargo: number;
    urlImagem: string;
    hora: string;
    idOrador: number;
}


const ItemListagemOradores: React.FC<ITeste> = (props) => {
    
    const area_hora = {
        width: "50px",
        marginTop: "4px",
        marginBottom: "4px"
    };
    const stly_hora = {
        margin: "0px auto",
        background: "#9b9b9b",
        padding: "2px 4px",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "center",
        color: "white",
        fontSize: "14px"
    };
 

    return (
        <div> 
            <div  tabIndex={0}>
                <div style={{ display: "flex", padding: "10px", alignItems: "center", justifyContent: "space-between" }}>
                    <IonAvatar style={{maxWidth: "80px", minWidth: "80px", height: "80px",  maxHeight: "80px", padding: "5px"}}>
                        <IonImg src={props.urlImagem} />
                    </IonAvatar>
                    <div style={{ marginLeft: "10px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #dfdfdf" }}>
                        <div>
                            <h6 style={{ marginRight: "auto", color: "#4b4b4b", fontWeight: "bold", marginBottom: "0px", paddingBottom: "0px" }}>{props.nome}</h6>
                            <p style={{ marginRight: "auto", color: "#4b4b4b", fontSize: "14px", marginTop: "4px", marginBottom: "8px" }}>{props.cargo}</p>
                            <div style={area_hora}>
                                <div style={stly_hora}>
                                    {props.hora}
                                </div>
                            </div>
                        </div>
                        <IonIcon name="arrow-forward" style={{ color: "#4b4b4b", fontSize: "24px", minWidth: "24px" }}></IonIcon>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ItemListagemOradores;