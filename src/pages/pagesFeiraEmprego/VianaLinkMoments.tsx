import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, useIonViewWillEnter, IonText, IonButton, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';

const VianaLinkMoments: React.FC = () => {

  const [vlm, setVlm] = useState({id: "", local: "", valor: "", hora: "", duracao: "", descricao: "", link_inscricao: ""});
  
    const styl_infoHorario = {
        display: "flex",  
        alignItems: "center", 
        justifyContent: "space-between",
        color: "#4a4a4a"
      }
    
      const styl_infoHorario_dentro = {
        display: "flex",  
        alignItems: "center", 
        justifyContent: "flex-start",
        flexGrow: 1
      }
    
      const stly_hora = {
        background: "#9b9b9b",
        padding: "2px 15px",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "center",
        color: "white",
        fontSize: "14px"
      }
    
      // padding: "2px 15px",
      const styl_areaDescricao = {
        textAlign: "justify" as "justify",        
        color: "#4a4a4a",
        lineHeight: "26px",
        fontSize: "14px"
      }
    
      const styl_btnAdicionar = {
        color: "#A61526",
        background: "#FFEC00",
        backgroundColor: "#FFEC00",
        marginTop: "50px"
      }

  useIonViewWillEnter(() => {
    // -- obter lista de categorias
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/vlm"
    }).then(resultado => {        
        setVlm(resultado.data);
        console.log(resultado)
    }).catch(erro => {
        console.log("ERRO", erro);
    })
  });

  return (
    <IonPage>
      <IonHeader>   
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonButton onClick={() => {window.history.back()}}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Viana Link Moments</IonTitle>
        </IonToolbar>      
      </IonHeader>
      <IonContent className="backgroundBranco">
  <IonText className="txtCentroCultural">{vlm.local}</IonText>
        

          <div className="areaInformacao" style={{padding: "8px 16px", marginTop: "0px"}}>
            <div>
                <div style={{marginBottom: "40px"}}>
                    <IonText style={{fontSize: "18px", color: "#4a4a4a", marginBottom: 0  , paddingBottom: 0, lineHeight: "28px"}}><p>VIANA LINK MOMENTS</p></IonText>
                </div>
                <IonText style={{fontSize: "12px", color: "#757575", marginTop: 0, paddingTop: 0}}><p>Valor Almoço: {vlm.valor}€</p></IonText>
              <div style={styl_infoHorario}>
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Início: </p>
                  <div style={stly_hora}>{vlm.hora.slice(0, -3)}</div>
                </div>
                
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Duração: </p>
                  <div style={stly_hora}>{vlm.duracao.slice(0, -3)}</div>
                </div>
              </div>
            </div>
            <div style={styl_areaDescricao}>
              <p>{vlm.descricao}</p>
            </div>

            <div className="ion-margin btnAmarelo">
                <IonButton href={vlm.link_inscricao} type="button" style={styl_btnAdicionar} size="large" expand="block">INSCREVER</IonButton>
            </div>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default VianaLinkMoments;
