import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonText, useIonViewDidEnter, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import ItemCertificados from "../components/itemCertificados"

const Certificados: React.FC = () => {

  const [ msg, setMsg ] = useState("A obter dados...");
  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ certificados, setCertificados ] = useState([]);
  const [ mostraAlert, setMostraAlert ] = useState(true);
  let somatorio = 0;
  let txt = "";

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

  return (
    <IonPage>
      <IonAlert
          isOpen={mostraAlert}
          onDidDismiss={() => setMostraAlert(false)}
          header={'Questionário'}
          message={'Antes de descarregar os certificados, gostaríamos de receber a sua opinião relativa à cimeira. Por favor responda a um pequeno questionário'}
          buttons={[
            {
              text: 'Responder',
              handler: blah => {
                window.open("https://forms.gle/WcybGCRbjidpmuGi8");
              }
            },
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary'
            }
          ]}></IonAlert>

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

      <IonContent fullscreen className="">
        { possuiResultados === true && certificados.map(function(certificado : any) {
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
        {!possuiResultados && 
          <div style={{height: "95%", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", color: "#9b9b9b"}}>
            <IonText>{msg}</IonText>
          </div>
        }
        
      </IonContent>
    </IonPage>
  );
};

export default Certificados;
