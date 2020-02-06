import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonImg, useIonViewWillEnter, IonText, IonLabel, IonButton, IonIcon, IonSearchbar } from '@ionic/react';
import React, { useState } from 'react';
import Axios from 'axios';
import ItemEmpresas from '../components/itemEmpresas';
import axios from 'axios';

const Empresas1: React.FC = () => {
  // http://app.cimeira.ipvc.pt/api/empresas
  
  var [menu1, setmenu1] = useState({descr:"", link: ""});
  var [menu2, setmenu2] = useState({descr:"", link: ""});
  var [possuiResultados, setPossuiResultados ] = useState(false);

  useIonViewWillEnter(() => {
    // -- obter lista de categorias
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/empresas"
    }).then(resultado => {        
        setmenu1(resultado.data[0]);
        setmenu2(resultado.data[1]);
        setPossuiResultados(true);
        console.log(resultado.data);
    }).catch(erro => {
        console.log("ERRO Empresas1", erro);
    });
  
  })

  return (
    <IonPage>
      <IonHeader>   
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonBackButton defaultHref="/home" className="txtBranco"/>
          </IonButtons>
          <IonTitle>Empresas</IonTitle>
        </IonToolbar>      
      </IonHeader>
      <IonContent className="backgroundBranco">
        <IonText className="local_atividade">TENDA MULTIUSOS</IonText>
        
        <ItemEmpresas texto={menu1.descr} urlImagem={menu1.link} pathTo="/empresas_palco"/>
        <ItemEmpresas texto={menu2.descr} urlImagem={menu2.link} pathTo="/stands"/>
        
        
      </IonContent>
    </IonPage>
  );
};

export default Empresas1;
