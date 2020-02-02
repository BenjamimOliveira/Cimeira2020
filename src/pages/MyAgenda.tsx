import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import React from 'react';

const MyAgenda: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Agenda</IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref='/home'/>
            </IonButtons>      
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="backgroundVermelho">
        
      </IonContent>
    </IonPage>
  );
};

export default MyAgenda;