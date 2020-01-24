import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonImg, useIonViewWillEnter, IonText, IonLabel, IonButton, IonIcon, IonSearchbar } from '@ionic/react';
import React, { useState } from 'react';
import Axios from 'axios';

const FeiraVirtual: React.FC = () => {
    
  return (
    <IonPage>
      <IonHeader>   
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonBackButton defaultHref="/home" className="txtBranco"/>
          </IonButtons>
          <IonTitle>Feira Virtual</IonTitle>
        </IonToolbar>      
      </IonHeader>
    </IonPage>
  );
};

export default FeiraVirtual;
