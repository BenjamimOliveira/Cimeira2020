import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonText, IonButton, IonIcon, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import ItemEmpresas from '../components/itemEmpresas';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Empresas1: React.FC = () => {
  // http://app.cimeira.ipvc.pt/api/empresas
  
  var [menu1, setmenu1] = useState({descr:"", link: ""});
  var [menu2, setmenu2] = useState({descr:"", link: ""});
  var [, setPossuiResultados ] = useState(false);

  useIonViewDidEnter(() => {
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
            <IonButton onClick={() => {window.history.back()}}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Empresas</IonTitle>
        </IonToolbar>      
      </IonHeader>
      <IonContent className="backgroundBranco">
        <IonText className="local_atividade">TENDA MULTIUSOS</IonText>
        
        <Link to={"/empresas_palco"} style={{textDecoration: "none"}}><ItemEmpresas texto={menu1.descr} urlImagem={menu1.link}/></Link>
        <Link to={"/stands"} style={{textDecoration: "none"}}><ItemEmpresas texto={menu2.descr} urlImagem={menu2.link}/></Link>
        
        
      </IonContent>
    </IonPage>
  );
};

export default Empresas1;
