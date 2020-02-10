import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import React from 'react';

const PhotoFeed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Feed</IonTitle>
            <IonButtons slot="start">
              <IonButton onClick={() => {window.history.back()}}>
                <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
              </IonButton>
            </IonButtons>      
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
      </IonContent>
    </IonPage>
  );
};

export default PhotoFeed;