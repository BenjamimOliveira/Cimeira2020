import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonText, IonInput, IonItem, IonCheckbox } from '@ionic/react';
import React from 'react';
import { useHistory } from "react-router-dom";

const PitchsInscricao: React.FC = () => {
    var check=false;
    let history = useHistory();

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

      const styl_infoHorario2 = {
        display: "flex",  
        alignItems: "center", 
        justifyContent: "space-between",
        color: "#4a4a4a",
        marginLeft:"36px"
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
        fontSize:"14px",
        marginBottom:"24px"
      }
    
      const styl_btnAdicionar = {
        color: "#A61526",
        background: "#FFEC00",
        backgroundColor: "#FFEC00",
        marginTop: "20px"
      }

      function inscricaoPitch(e: any) {
       
        history.goBack();
        
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
          <IonTitle>Submissão Pitch</IonTitle>
        </IonToolbar>      
      </IonHeader>

    <IonContent class="ion-content-workshop">
        <IonText className="local_atividade">TENDA MULTIUSOS</IonText>

        <div style={geral}>
            <div style={styl_infoHorario}>
                    <div style={styl_infoHorario_dentro}>
                        <p style={{marginRight: "5px"}}>Duração Pitch: </p>
                        <div style={stly_hora}>5 MIN.</div>
                    </div>     

                    <div style={{fontSize:"26px", lineHeight:"0.7", textAlign:"center"}}>
                    <span style={{color:"#A61526"}}>3</span>/10<br/><span style={{fontSize:"12px", color:"#9B9B9B "}}>nº inscritos</span>
                    </div>           
            </div>  

            <IonItem className="ion-margin" style={{marginBottom:"36px"}}>
                <IonInput placeholder="TITULO DA IDEIA"></IonInput>
            </IonItem>

            <div style={pitchsText}>Horários</div>
            <div style={styl_infoHorario2}>
                <div style={styl_infoHorario_dentro}>
                    <IonCheckbox style={{marginRight: "5px"}} color="warning" checked={check}/>
                    <div style={stly_hora}>11:30</div>
                </div>
                    
                <div style={styl_infoHorario_dentro}>
                    <IonCheckbox style={{marginRight: "5px"}} color="warning" checked={check}/>
                    <div style={stly_hora}>15:00</div>
                </div>
            </div>

            <div style={{fontSize:"14px", marginTop:"14px", textAlign:"center", color:"#797979"}}>*Limitado a 10 participantes em cada horário</div>
        
            <div className="ion-margin btnAmarelo" style={{textAlign:"center"}}>
                <IonButton type="button" style={styl_btnAdicionar}  onClick={(e) => {inscricaoPitch(e)}} size="large" expand="block">SUBMETER PITCH</IonButton>
            </div>
        </div>  

        
    </IonContent>

    </IonPage>
  );
};

export default PitchsInscricao;
