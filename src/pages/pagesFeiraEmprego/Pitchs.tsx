import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonText } from '@ionic/react';
import React from 'react';
import ItemPitch from '../../components/itemPitch';
import { useHistory } from "react-router-dom";

const Pitch: React.FC = () => {
  let history = useHistory();


  const descr = "Trata-se de um momento de aproximação dos estudantes/diplomados ao mercado de trabalho, "
              + "tendo como principal objetivo promover, através de um sistema de Pitchs, uma apresentação rápida do " 
              + "candidato ás empresas. Estes momentos irão decorrer ao longo do evento, potenciando o contato entre empresas e candidatos."

  const geral = {
    marginLeft: "18px",
    marginRight: "18px",
    marginTop: "28px"
  }

  const titulo = {
    marginBottom: "16px",
    fontSize: "20px",
    color: "#4a4a4a",
    fontWeight:"bold" as "bold"
  }

  const stly_hora = {
    background: "#9b9b9b",
    padding: "2px 15px",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "center",
    color: "white",
    fontSize: "14px",
    maxWidth:"80px"
  }

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

  const textoDescr = {
    marginTop:"22px", 
    color: "#797979",
    lineHeight:"1.5",
    textAlign:"justify" as "justify",
    fontSize:"14px"
  }

  const pitchs = {
    maxHeight:"180px",
    overflow:"scroll"
  }

  const pitchsText = {
    marginTop:"24px",
    color: "#797979",
    lineHeight:"1.5",
    textAlign:"justify" as "justify",
    fontSize:"14px"
  }

  const styl_btnAdicionar = {
    color: "#A61526",
    background: "#FFEC00",
    backgroundColor: "#FFEC00",
    marginTop: "20px"
  }
    
  function inscricaoPitch(e: any) {
       
    history.push("/pitchInscricao");
    
  }

  return (
    <IonPage>
      <IonHeader>   
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonButton onClick={() => {window.history.back()}}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Pitchs</IonTitle>
        </IonToolbar>      
      </IonHeader>

      <IonContent class="ion-content-workshop">
        <IonText className="local_atividade">TENDA MULTIUSOS</IonText>

        <div style={geral}>
          <div style={titulo}>Apresentação Pitchs*</div>
          <div style={styl_infoHorario}>
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Duração Pitch: </p>
                  <div style={stly_hora}>5 MIN.</div>
                </div>     

                <div style={{fontSize:"26px", lineHeight:"0.7", textAlign:"center"}}>
                  <span style={{color:"#A61526"}}>3</span>/10<br/><span style={{fontSize:"12px", color:"#9B9B9B "}}>nº inscritos</span>
                </div>           
          </div>  

          <div style={textoDescr}>{descr}</div>    
          <div style={textoDescr}>*Limitado a 10 participantes em cada hórario</div>  

          <div style={pitchsText}>Pitchs  inscritos:</div>
          <div style={pitchs}>
            <ItemPitch texto="Titulo da ideia" hora="11:30"></ItemPitch>
            <ItemPitch texto="Titulo da ideia" hora="11:30"></ItemPitch>
            <ItemPitch texto="Titulo da ideia" hora="11:30"></ItemPitch>
            <ItemPitch texto="Titulo da ideia" hora="11:30"></ItemPitch>
            <ItemPitch texto="Titulo da ideia" hora="11:30"></ItemPitch>       
          </div>

          <div className="ion-margin btnAmarelo" style={{textAlign:"center"}}>
            <IonButton type="button" style={styl_btnAdicionar}  onClick={(e) => {inscricaoPitch(e)}} size="large" expand="block">SUBMETER PITCH</IonButton>
          </div>

        </div>
        
      </IonContent>

    </IonPage>
  );
};

export default Pitch;
