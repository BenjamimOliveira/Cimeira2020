import React, {Component} from "react"
import { IonItem, IonText, IonGrid, IonCol, IonRow, IonImg } from "@ionic/react";
import "./WorkshopList.scss";

interface Data {
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

                <IonCol size="7" class="desc">                   
                    <IonText>{props.desc}</IonText>                
                </IonCol>

                <IonCol size="3">
                    <IonItem>
                        <IonImg slot="end" src="https://cdn2.iconfinder.com/data/icons/arrows-vol-1-1/32/right-512.png" class="img"/>
                    </IonItem>
                </IonCol>
            </IonRow>                      
        </IonGrid> 
    );
};

export default WorkshopList;