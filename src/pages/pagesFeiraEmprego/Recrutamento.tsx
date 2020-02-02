import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonImg, useIonViewWillEnter, IonText, IonLabel, IonButton, IonIcon, IonSearchbar } from '@ionic/react';
import React, { useState } from 'react';
import Axios from 'axios';

const Recrutamento: React.FC = () => {
    
  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ recrutamento, setRecrutamento ] = useState([]);
  const [ recrutamentoMostrar, setRecrutamentoMostrar ] = useState([]);  
  const [ mostraBarraPesquisa, setMostraBarraPesquisa ] = useState(false);

  useIonViewWillEnter(() => {
    // -- obter lista de categorias
    Axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/recrutamento"
    }).then(resultado => {        
        setPossuiResultados(true);
        setRecrutamento(resultado.data);
        setRecrutamentoMostrar(resultado.data);
    }).catch(erro => {
        console.log("ERRO Recrutamento", erro);
    })
  });

  return (
    <IonPage>
      <IonHeader>   
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonBackButton defaultHref="/feiraemprego" className="txtBranco"/>
          </IonButtons>
          <IonTitle>Recrutamento</IonTitle>
        </IonToolbar>      
      </IonHeader>
    </IonPage>
  );
};

export default Recrutamento;
