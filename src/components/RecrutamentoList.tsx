import React, {Component} from "react"
import { IonItem, IonText, IonGrid, IonCol, IonRow, IonImg, IonIcon, IonAvatar } from "@ionic/react";
import { Link } from "react-router-dom";

/**
 * {
        "id": "1",
        "nome": "NQDA Agency",
        "representante": "Eng.º Ricardo Correia",
        "local": "TENDA MULTIUSOS",
        "stand": "Stand 1",
        "vagas": "2",
        "foto": "https://www.nqda.pt/design/logo_slider.svg"
    }
 */

interface Data {
    id: string;
    nome: string;
    representante: string;
    local: string;
    stand: string;
    vagas: string;
    foto: string;    
  }

const RecrutamentoList: React.FC<Data> = (props) => {
    const styl_avatar = {
        maxWidth: "85px", 
        minWidth: "85px", 
        height: "85px",  
        maxHeight: "85px", 
        padding: "5px"
    }

    const area_hora = {
        width: "100px",
        marginTop: "4px",
        marginBottom: "4px",
        paddingRight: "12px",
    };
    const stly_hora = {
        margin: "0px auto",
        marginBottom: "8px",
        padding: "2px 4px",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "center",
        color: "#A61526",
        fontSize: "20px"
    };

    const stly_vagas = {
        display: "flex",
        justifyContent: "center",
        fontSize: "12px",
        color: "#9B9B9B"
    };
 
    return (
        <div > 
            <div  tabIndex={0} style={{ borderBottom: "1px solid #dfdfdf"}}>
                <div style={{ display: "flex", padding: "10px", alignItems: "center", justifyContent: "space-between" }}>
                    <IonAvatar style={styl_avatar}>
                        <IonImg src={props.foto} />
                    </IonAvatar>
                    <div style={{ marginLeft: "10px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <div>
                            <h6 style={{ marginRight: "auto", color: "#4b4b4b", fontWeight: "bold", marginBottom: "0px", paddingBottom: "8px" }}>{props.nome}</h6>
                            <p style={{ marginRight: "auto", color: "#9B9B9B", fontSize: "14px", marginTop: "0px", marginBottom: "4px" }}>{props.representante}</p>
                            <p style={{ marginRight: "auto", color: "#9B9B9B", fontSize: "14px", marginTop: "0px", marginBottom: "8px" }}>{props.stand}</p>
                              
                        </div>
                    </div> 
                    <div style={area_hora}>
                        <div style={stly_hora}><strong>
                            {props.vagas}</strong>
                        </div>
                        <div style={stly_vagas}>
                            nº vagas
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecrutamentoList;