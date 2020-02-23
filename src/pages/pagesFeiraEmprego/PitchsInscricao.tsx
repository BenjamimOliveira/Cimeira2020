import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonText, IonInput, IonItem, IonCheckbox, IonLabel, IonRadio, IonRadioGroup, IonListHeader, IonRow, IonCol, useIonViewWillEnter, useIonViewDidEnter, IonToast } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';

const PitchsInscricao: React.FC = () => {
  var [horario, setHorario] =  useState("2");
  var [titulo, setTitulo] = useState();
  var [vagasUm, setVagasUm] = useState("- ");
  var [vagasDois, setVagasDois] = useState();
  var [vagasWS, setVagasWS] = useState({ inscritos_horario_1: "", inscritos_horario_2: "" });
  var [vagas, setVagas] = useState("");
  const [toast, setToast] = useState({ state: false, message: "" });
  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [showBut, setShowBut] = useState(false);
  var idUser = localStorage.getItem("UtilizadorID");
  let history = useHistory();

  const geral = {
    marginLeft: "18px",
    marginRight: "18px",
    marginTop: "28px"
  }

  const stly_hora = {
    background: "#9b9b9b",
    padding: "2px 10px",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "center",
    color: "white",
    fontSize: "14px",
    maxWidth: "70px"
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

  const styl_btnAdicionar = {
    color: "#A61526",
    background: "#FFEC00",
    backgroundColor: "#FFEC00",
    marginTop: "20px"
  }

  function inscricaoPitch(e: any) {

    //
    if (titulo === undefined || titulo === "") {
      setToast({ state: true, message: "Todos os pitchs necessitam de um titulo!" });
    } else if (horario=="2"){
      setToast({ state: true, message: "Escolha um horário!"});
    }else{
      Axios({
        method: "post",
        url: "http://app.cimeira.ipvc.pt/api/pitch",
        data: {
            id_user: idUser,
            id_horario: horario,
            titulo: titulo
        }
    }).then(resultado => {
      console.log(resultado);
    }).catch(erro => {
      console.log(erro);

    }); 
    history.goBack();
    }

    console.log("horario=> " + horario);
    

  }

  function check1bool() {
    setHorario("1");
    setVagas(vagasUm);
    setShowBut(showBut1);
  }

  function showBut1(){
    if(parseInt(vagasUm)>=10){
      return false;
    } else {
      return true;
    }
  }

  function check2bool() {
    setHorario("2");
    setVagas(vagasDois);
    setShowBut(showBut2);
  }

  function showBut2(){
    if(parseInt(vagasDois)>=10){
      return false;
    } else {
      return true;
    }
  }

  

  useIonViewDidEnter(() => {

    Axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/pitchs/horarios"
    }).then(resultado => {
      console.log(resultado.data.inscritos_horario_1);
      setVagasWS(resultado.data);
      setVagasUm(resultado.data.inscritos_horario_1);
      setVagasDois(resultado.data.inscritos_horario_2);
      setPossuiResultados(true);
    }).catch(erro => {
      console.log("ERRO", erro);
    })
    setVagas(vagasUm);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonButton onClick={() => { window.history.back() }}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Submissão Pitch</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-content-workshop">
        <IonToast isOpen={toast.state} onDidDismiss={() => setToast({ state: false, message: toast.message })} message={toast.message} duration={5000}></IonToast>
        <IonText className="local_atividade">TENDA MULTIUSOS</IonText>

        <div style={geral}>
          <div style={styl_infoHorario}>
            <div style={styl_infoHorario_dentro}>
              <p style={{ marginRight: "5px" }}>Duração Pitch: </p>
              <div style={stly_hora}>5 MIN.</div>
            </div>

            <div style={{ fontSize: "26px", lineHeight: "0.7", textAlign: "center" }}>
              {possuiResultados &&
                <span style={{ color: "#A61526" }}>{vagas}</span>
              }     
              /10<br /><span style={{ fontSize: "12px", color: "#9B9B9B " }}>nº inscritos</span>
            </div>
          </div>

          <IonItem className="ion-margin" style={{ marginBottom: "36px" }}>
            <IonInput required placeholder="TITULO DA IDEIA" value={titulo} onInput={(e) => setTitulo((e.target as HTMLInputElement).value)}></IonInput>
          </IonItem>

          <IonRadioGroup>
            <IonListHeader>
              <IonLabel>Horários</IonLabel>
            </IonListHeader>
            <IonRow>
              <IonCol size="6">
                <IonItem>
                  <div style={stly_hora}>11:30</div>
                  <IonRadio slot="start" color="warning" value="um" onIonSelect={() => { check1bool()}}></IonRadio>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <div style={stly_hora}>15:00</div>
                  <IonRadio slot="start" color="warning" value="dois" onIonSelect={() => { check2bool()}}></IonRadio>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonRadioGroup>
          <div style={{ fontSize: "14px", marginTop: "14px", textAlign: "center", color: "#797979" }}>*Limitado a 10 participantes em cada horário</div>
          {showBut &&
          <div className="ion-margin btnAmarelo" style={{ textAlign: "center" }}>
            <IonButton type="button" style={styl_btnAdicionar} onClick={(e) => { inscricaoPitch(e) }} size="large" expand="block">SUBMETER PITCH</IonButton>
          </div>
          }
        </div>


      </IonContent>

    </IonPage>
  );
};

export default PitchsInscricao;
