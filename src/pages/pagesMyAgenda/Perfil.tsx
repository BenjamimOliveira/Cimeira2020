import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonImg } from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Perfil: React.FC = () => {
  var nome = localStorage.getItem("UtilizadorLogin"); 
  var email = localStorage.getItem("UtilizadorEmail");
  var localidade = localStorage.getItem("UtilizadorLocalidade");
  var perfil1 = localStorage.getItem("UtilizadorPerfil1");
  var perfil2 = localStorage.getItem("UtilizadorPerfil2");
  var perfil3 = localStorage.getItem("UtilizadorPerfil3");  
  var id = localStorage.getItem("UtilizadorID");

  const header = {
    backgroundColor:"#9B9B9B", 
    height:"230px"
  }

  const style_nome = {
    marginTop:"12px",
    color: "white",
    textAlign: "center" as "center",
    fontSize: "24px"
  }

  const foto_perfil = {
    width: "110px",
    margin: "auto",
    paddingTop:"45px"
    
  }
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
      <IonHeader no-border>   
        <IonToolbar color="dark" >
          <IonButtons slot="start" >
            <IonButton onClick={() => {window.history.back()}}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>      
      </IonHeader>
      <IonContent>        
        <div style={header}>
          <div style={{width:"100%"}}>
              <div style={foto_perfil}>
                <div>
                  <IonImg src="assets/resources/picture_IPVC.png"/>
                </div>                
              </div>
              <div style={style_nome}>{nome}</div>
            </div> 
        </div>
        
        {/* EMAIL */}
        <div style={{height:"40px"}}>
          <div style={{float:"left", backgroundColor:"#9b9b9b", height:"40px"}}>jjjjjjjj</div>
          <div>
            <div>texto1</div>
            <div>texto2</div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}; 

export default Perfil;
