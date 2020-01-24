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
    return (
        <IonGrid class="itemFora">
            <IonRow class="row">
                <IonCol size="2" class="hora ion-text-center">                   
                    <IonText class="ion-text-center"><div>{props.hora}</div></IonText>             
                </IonCol>

                <IonCol size="8" class="desc">                   
                    <IonText>{props.desc}</IonText>                
                </IonCol>

                <IonCol size="2">
                    <IonItem>
                        <Link to={"/descrWorkshop/" + props.id}>
                            <IonIcon name="arrow-forward" style={{ color: "#4b4b4b", fontSize: "24px", minWidth: "24px" }} ></IonIcon>
                        </Link>
                    </IonItem>
                </IonCol>
            </IonRow>                      
        </IonGrid> 
    );
};

export default WorkshopList;