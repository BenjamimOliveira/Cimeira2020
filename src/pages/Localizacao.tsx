import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

class Categoria {
  id: string;
  path: string;
  title: string;
  type: string;

  constructor(id: string, path: string, title: string, type: string){
    this.id = id;
    this.path = path;
    this.title = title;
    this.type = type;
  }
}

const Localizacao: React.FC = () => {
    const [data, setData] = useState({});
    var cat = new Categoria("a","a","a","a");
  	useEffect(() => {
      async function callAxios(){
        const result = await Axios(
          "http://app.cimeira.ipvc.pt/api/main/1"
        );
        cat = new Categoria(result.data.id, result.data.path, result.data.title, result.data.type);
        console.log(cat.title + "data ou o crlh");
        setData(result.data);  
      }
      callAxios();
    });
    
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Localizacao</IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref='/home'/>
            </IonButtons>      
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
          <h1>{cat.title}</h1>
        
      </IonContent>
    </IonPage>
  );
};

export default Localizacao;