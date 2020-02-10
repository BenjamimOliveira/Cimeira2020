import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import React from 'react';

const Pitch: React.FC = () => {
    
  return (
    <IonPage>
      <IonHeader>   
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonButton onClick={() => {window.history.back()}}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Pitchs</IonTitle>
        </IonToolbar>      
      </IonHeader>
    </IonPage>
  );
};

export default Pitch;
