import React, {Component} from "react"
import { IonItem, IonText, IonGrid, IonCol, IonRow, IonImg, IonIcon } from "@ionic/react";
import "./WorkshopList.scss";
import { Link } from "react-router-dom";

interface Data {
    id: string;
    hora: string;
    desc: string;
  }

const WorkshopList: React.FC<Data> = (props) => {

    
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
        <Link to={"/descrWorkshop/" + props.id} style={{ marginLeft: "15px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none" }} >
            <p style={{ marginRight: "auto", color: "#4b4b4b" }}>{props.desc.toUpperCase()}</p>
            <div>
                <IonIcon className="arrowFoward" style={{ backgroundColor: "#4b4b4b", fontSize: "24px", minWidth: "24px", marginLeft: "10px"}} ></IonIcon>
            </div>
        </Link>
    </div>
        
    );
};

export default WorkshopList;