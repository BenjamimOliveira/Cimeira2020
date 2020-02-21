import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonContent } from '@ionic/react';
import React from 'react';

const Perfil: React.FC = () => {
  var nome = localStorage.getItem("UtilizadorLogin"); 
  var email = localStorage.getItem("UtilizadorEmail");
  var localidade = localStorage.getItem("UtilizadorLocalidade");
  var perfil1 = localStorage.getItem("UtilizadorPerfil1");
  var perfil2 = localStorage.getItem("UtilizadorPerfil2");
  var perfil3 = localStorage.getItem("UtilizadorPerfil3");
  
  var id = localStorage.getItem("UtilizadorID");
  console.log(email+" => local");
/**
 * localStorage.setItem("UtilizadorLogin", resultado.data.message.nome);
  localStorage.setItem("UtilizadorEmail", resultado.data.message.email);
   localStorage.setItem("UtilizadorLocalidade", resultado.data.message.localidade);
  
   localStorage.setItem("UtilizadorPerfil1", resultado.data.message.perfil_1);
   localStorage.setItem("UtilizadorPerfil2", resultado.data.message.perfil_2);
   localStorage.setItem("UtilizadorPerfil3", resultado.data.message.perfil_3);
  localStorage.setItem("UtilizadorID", resultado.data.message.id_user);
 */
  return (
    <IonPage>
      <IonHeader>   
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonButton onClick={() => {window.history.back()}}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>      
      </IonHeader>
      <IonContent>        
        <div>{nome}</div>
        <div>{email}</div>
        <div>{localidade}</div>
        <div>{id}</div>
        <div>{perfil2}</div>        
        <div>{perfil3}</div>
      </IonContent>
    </IonPage>
  );
}; 

export default Perfil;
