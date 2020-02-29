import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonText, IonToast, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import ItemPitch from '../../components/itemPitch';
import { useHistory } from "react-router-dom";
import Axios from 'axios';

const Pitch: React.FC = () => {
  let history = useHistory();
  const [ toast, setToast ] = useState({state: false, message: ""});
  
  var perfil1 = localStorage.getItem("UtilizadorPerfil1");
  var perfil2 = localStorage.getItem("UtilizadorPerfil2");
  var perfil3 = localStorage.getItem("UtilizadorPerfil3"); 
  /*
  perfil1="2";
  perfil2="2";
  perfil3="2";
  */
  var idUser = localStorage.getItem("UtilizadorID");

  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ pitches, setPitches ] = useState([]);
  const [ horario1, setHorario1] = useState();
  const [ horario2, setHorario2] = useState();
  const [ horarioSoma, setHorarioSoma] = useState();
  const [showBut, setShowBut] = useState(false);
  var [possuiResultados_programa, setPossuiResultados_programa] = useState(false);

  const descr = "Trata-se de um momento de aproximação dos estudantes/diplomados ao mercado de trabalho, "
              + "tendo como principal objetivo promover, através de um sistema de Pitchs, uma apresentação rápida do " 
              + "candidato às empresas. Estes momentos irão decorrer ao longo do evento, potenciando o contato entre empresas e candidatos."

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

  function showButton(){
    var verificacao = checkPerfil();
    if(perfil1=="1" || perfil2=="1" || perfil3=="1"){
      if(verificacao==0){
        //setShowBut(true);
        return true;
        console.log(verificacao + " verid");
      }else{
        //setShowBut(false);
        return false;
      }
    }
  }
  
    
  function inscricaoPitch(e: any) {
    // -- Verifica se a conta não tem nenhum pitch associado
    var verificacao = checkPerfil();
    // -- Verifica se a conta tem perfil de aluno
    if(perfil1=="1" || perfil2=="1" || perfil3=="1"){
      // -- verificacao==0 implica que a conta ainda não submeteu pitch algum
      if(verificacao==0){
        history.push("/pitchInscricao");
      }else{
        setToast({state: true, message: "Cada aluno só pode submeter um pitch!"});
      }
      //Se a conta não tem perfil aluno passa para aqui
    }else {
      setToast({state: true, message: "Só contas com perfil de aluno podem submeter pitches!"});
    } 
    
  }

  function checkPerfil(){
    var i=0;
    console.log(pitches);
    pitches.map(function(pitches_){
      if(idUser == pitches_['id_utilizador']){
        i++;
      }
    });
    if(i!=0){
      return 1;
    }else {return 0}
    
  }

  useIonViewWillEnter(() => {
    showButton();
  });

  useIonViewDidEnter(() => {
    
    // -- obter lista de categorias
    Axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/pitchs"
    }).then(resultado => {        
        setPossuiResultados(true);
        setPitches(resultado.data);
        setPossuiResultados_programa(true);
    }).catch(erro => {
        console.log("ERRO wrkshps", erro);
    });

    Axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/pitchs/horarios"
    }).then(resultado => {
      console.log(resultado.data.inscritos_horario_1);
      setHorario1(resultado.data.inscritos_horario_1);
      setHorario2(resultado.data.inscritos_horario_2);
    }).catch(erro => {
      console.log("ERRO", erro);
    })
    setHorarioSoma(parseInt(horario1)+parseInt(horario2));
    console.log(horarioSoma + "Soma");
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
          <IonTitle>Pitchs</IonTitle>
        </IonToolbar>      
      </IonHeader>

      <IonContent class="ion-content-workshop">
      <IonToast isOpen={toast.state} onDidDismiss={() => setToast({ state: false, message: toast.message })} message={toast.message} duration={5000}></IonToast>
        <IonText hidden onChange={() => {showButton()}}>{possuiResultados}</IonText>
        <IonText className="local_atividade">TENDA MULTIUSOS</IonText>

        <div style={geral}>
          <div style={titulo}>Apresentação Pitchs*</div>
          <div style={styl_infoHorario}>
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Duração Pitch: </p>
                  <div style={stly_hora}>5 MIN.</div>
                </div>     

                <div style={{fontSize:"26px", lineHeight:"0.7", textAlign:"center"}}>
                <span style={{color:"#A61526"}}>{parseInt(horario1)+parseInt(horario2)}</span>/20<br/><span style={{fontSize:"12px", color:"#9B9B9B "}}>nº inscritos</span>
                </div>           
          </div>  

          <div style={textoDescr}>{descr}</div>    
          <div style={textoDescr}>*Limitado a 10 participantes em cada hórario</div>  

          <div style={pitchsText}>Pitchs  inscritos:</div>
          <div style={pitchs}>  
            { possuiResultados === true && pitches.map(function(pitch_) {
              return <ItemPitch texto={pitch_['titulo']} hora={pitch_['hora']}></ItemPitch> 
        })
        }     
          </div>

          
          {showButton() && possuiResultados_programa &&
          <div className="ion-margin btnAmarelo" style={{textAlign:"center"}}>
            <IonButton type="button" style={styl_btnAdicionar}  onClick={(e) => {inscricaoPitch(e)}} size="large" expand="block">SUBMETER PITCH</IonButton>
          </div>
          }
        </div>
        
      </IonContent>

    </IonPage>
  );
};

export default Pitch;
