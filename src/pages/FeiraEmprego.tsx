import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, useIonViewWillEnter, IonButton, IonIcon, IonSearchbar, IonText, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import ItemFeiraEmprego from '../components/itemFeiraEmprego';

const URL = 'app.cimeira.ipvc.pt/api/feira_emprego/';

const FeiraEmprego: React.FC = () => {
  
  var [menu1, setmenu1] = useState({id:"", nome: "", foto:""});
  var [menu2, setmenu2] = useState({id:"", nome: "", foto:""});
  var [menu3, setmenu3] = useState({id:"", nome: "", foto:""});
  var [menu4, setmenu4] = useState({id:"", nome: "", foto:""});
  var [menu5, setmenu5] = useState({id:"", nome: "", foto:""});

  function callAxios(){
    Promise.all([axios.get(URL+"1"), axios.get(URL+"2"), axios.get(URL+"3"), axios.get(URL+"4"), axios.get(URL+"5")])
    .then(([result1, result2, result3, result4, result5]) => {
        setmenu1(result1.data);
        setmenu2(result2.data);
        setmenu3(result3.data);
        setmenu4(result4.data);
        setmenu5(result5.data);
        console.log(menu1);
    })
  }

  useIonViewWillEnter(() => {
    // -- obter lista de categorias
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/feira_emprego"
    }).then(resultado => {        
        setmenu1(resultado.data[0]);
        setmenu2(resultado.data[1]);
        setmenu3(resultado.data[2]);
        setmenu4(resultado.data[3]);
        setmenu5(resultado.data[4]);
    }).catch(erro => {
        console.log("ERRO feira emprego", erro);
    })
  });

  useIonViewWillEnter(() => {
    callAxios();
  });

  return (
    <IonPage>

      <IonHeader>   
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonBackButton defaultHref="/home" className="txtBranco"/>
          </IonButtons>
          <IonTitle>Feira Emprego</IonTitle>
        </IonToolbar>      
      </IonHeader>

      <IonContent class="ion-content-workshop"> 
        <IonLabel><IonText class="linha-topo">TENDA MULTIUSOS</IonText></IonLabel>
      
        <ItemFeiraEmprego texto={menu1.nome} idCategoria={menu1.id} urlImagem="http://app.cimeira.ipvc.pt/files/icons_categorias/desporto.png" pathTo="/recrutamento"/>  
        <ItemFeiraEmprego texto={menu2.nome} idCategoria={menu2.id} urlImagem="http://app.cimeira.ipvc.pt/files/icons_categorias/desporto.png" pathTo="/empresas"/>        
        <ItemFeiraEmprego texto={menu3.nome} idCategoria={menu3.id} urlImagem="http://app.cimeira.ipvc.pt/files/icons_categorias/desporto.png" pathTo="/feiraVirtual"/> 
        <ItemFeiraEmprego texto={menu4.nome} idCategoria={menu4.id} urlImagem="http://app.cimeira.ipvc.pt/files/icons_categorias/desporto.png" pathTo="/pitchs"/> 
        <ItemFeiraEmprego texto={menu5.nome} idCategoria={menu5.id} urlImagem="http://app.cimeira.ipvc.pt/files/icons_categorias/desporto.png" pathTo="/home"/> 
      
      </IonContent>

    </IonPage>
  );
};

export default FeiraEmprego;