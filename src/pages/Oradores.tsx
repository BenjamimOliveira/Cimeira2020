import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import React from 'react';

const Oradores: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Oradores</IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref='/home'/>
            </IonButtons>     
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
      </IonContent>
    </IonPage>
  );
};

export default Oradores;