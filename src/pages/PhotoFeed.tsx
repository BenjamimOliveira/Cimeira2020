import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import React from 'react';

const PhotoFeed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Feed</IonTitle>
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

export default PhotoFeed;