import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonText, useIonViewDidEnter, IonAlert, useIonViewWillEnter, IonGrid, IonRow, IonCol, IonItem, IonInput, IonToast } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import ItemCertificados from "../components/itemCertificados"

const Certificados: React.FC = () => {

  const [ msg, setMsg ] = useState("A obter dados...");
  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ respondeuInquerito, setRespondeuInquerito ] = useState(false);
  const [toast, setToast] = useState({state: false, message: ""});
  const [ codigo, setCodigo ] = useState("");
  const [ certificados, setCertificados ] = useState([]);
  const [ mostraAlert, setMostraAlert ] = useState(true);
  let somatorio = 0;
  let txt = "";

  useIonViewWillEnter(() => {
    if(localStorage.getItem("UtilizadorRespondeuInquerito") == "0"){
      setRespondeuInquerito(false);
    } else {
      setRespondeuInquerito(true);
    }
  })

  useIonViewDidEnter(() => {
    // -- obter lista de categorias
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/listagemcertificadosutilizador/" + localStorage.getItem("UtilizadorID")
    }).then(resultado => {  
        if(resultado.data.status){
            if(resultado.data.data.length > 0){
            setPossuiResultados(true);
            setCertificados(resultado.data.data);
          } else
            setMsg("Não possui certificados!")
        } else {
          if(resultado.data.cod == 1){
            setMsg("Ocorreu um erro a obter os seus certificados!")
          }
          if(resultado.data.cod == 2){
            setMsg("Os certificados vão poder ser descarregados aqui nos próximos dias");
          }
        }
    }).catch(erro => {
        console.log("ERRO", erro);
    })
  })

  function submeterFormulario(e:any) {
    if(codigo == "CIMEIRA2020"){
      setRespondeuInquerito(true);
      setToast({state: true, message: "Sucesso! Pode agora descarregar os seus certificados"});
      axios({
        method: "post",
        url: "http://app.cimeira.ipvc.pt/api/setRespostaInquerito",
        data: {
          id_utilizador: localStorage.getItem("UtilizadorID")
        }
      }).then(resultado => {

      }).catch(erro => {

      });
      localStorage.setItem("UtilizadorRespondeuInquerito", "1");
    } else {
      setToast({state: true, message: "Erro: Código Instroduzido não é Válido!"});
    }
  }

  return (
    <IonPage>
      {!respondeuInquerito && 
      <IonAlert
          isOpen={mostraAlert}
          onDidDismiss={() => setMostraAlert(false)}
          header={'Questionário'}
          message={'Para descarregar os certificados, é necessário responder a um questionário relativo à Cimeira. Após finalizar a resposta ao questionário, irá receber um código de acesso aos certificados'}
          buttons={[
            {
              text: 'Responder',
              handler: blah => {
                window.open("https://forms.gle/WcybGCRbjidpmuGi8");
              }
            }
          ]}></IonAlert>
        }

      <IonHeader>
        <IonToolbar className="toolbarSemTransparencia">
          <IonButtons slot="start" >
            <IonButton onClick={() => {window.history.back()}}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Certificados</IonTitle>
        </IonToolbar>
      </IonHeader>
        
      <IonToast isOpen={toast.state} onDidDismiss={() => setToast({state: false, message: toast.message})} message={toast.message} duration={3000}></IonToast>
      <IonContent fullscreen className="">
        { respondeuInquerito && possuiResultados === true && certificados.map(function(certificado : any) {
          if(certificado.tipo_certificado == "presenca")
            txt = "Presença: " + certificado.quem;
          
          if(certificado.tipo_certificado == "participacao"){
            if(certificado.tipo == "atividade")
              txt = "Atividade: " + certificado.titulo;
            if(certificado.tipo == "workshop")
              txt = "Workshop: " + certificado.titulo;
          }

          if(certificado.tipo_certificado == "pitch")
            txt = "Apresentação do Pitch: " + certificado.titulo;
          

          if(certificado.tipo_certificado == "palco")
            txt = "Palco: " + certificado.nome;
          

          if(certificado.tipo_certificado == "linkmoments")
            txt = "Partitipação no Viana Link Moments";

          return <ItemCertificados texto_apresentacao={txt} tipo_certificado={certificado['tipo_certificado']} nome={certificado['nome'] || localStorage.getItem("UtilizadorLogin") || ""} quem={certificado['quem'] || ""} titulo={certificado['titulo'] || ""} tipo={certificado['tipo'] || ""} key={somatorio++}></ItemCertificados>
        })
        }
        {respondeuInquerito && !possuiResultados && 
          <div style={{height: "95%", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", color: "#9b9b9b"}}>
            <IonText>{msg}</IonText>
          </div>
        }
        {!respondeuInquerito && 
          <div style={{display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", color: "#9b9b9b"}}>
            <IonGrid>
                    <IonRow className="ion-justify-content-center ion-align-items-center">
                        <IonCol size-md="6" size-lg="5" size-xs="12" className="marginBottom60">
                            <form method="POST" action="#">
                                <div className="loginForm">
                                    
                                    <div className="ion-margin ion-text-center titulo">
                                        <p><b>Introduza o código recebido no final do questionário</b></p>
                                    </div>
                                    <IonItem className="ion-margin">
                                        <IonInput autocomplete="off" required type="text" value={codigo} onInput={(e) => setCodigo((e.target as HTMLInputElement).value)} placeholder="Código de Validação" inputmode="text"></IonInput>
                                    </IonItem>
                                </div>

                                <div className="ion-margin btnLogin">
                                    <IonButton id="btnSubmeter" type="button" onClick={(e) => {submeterFormulario(e)}} size="large" expand="block">SUBMETER</IonButton>
                                </div>
                            </form>
                        </IonCol>
                    </IonRow>
                </IonGrid>
          </div>
        }
        
      </IonContent>
    </IonPage>
  );
};

export default Certificados;
