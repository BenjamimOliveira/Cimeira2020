import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonText, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';

interface PropsInfoPalestra extends RouteComponentProps<{
  id: string;
}> {}

const Palestra: React.FC<PropsInfoPalestra> = ({match}) => {
  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ palestra, setPalestra ] = useState({nome: "", local_palestra: "", titulo: "", duracao: "", hora: "", id: 0, descricao: ""});
  const [ txtTitulo, setTxtTitulo ] = useState("A carregar informação...");

  const styl_infoHorario = {
    display: "flex",  
    alignItems: "center", 
    justifyContent: "space-between",
    padding: "8px 10px",
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

  const styl_areaDescricao = {
    textAlign: "justify" as "justify",
    padding: "2px 15px",
    color: "#4a4a4a"
  }

  const styl_btnAdicionar = {
    color: "#A61526",
    background: "#FFEC00",
    backgroundColor: "#FFEC00",
    marginTop: "50px"
  }

  useIonViewDidEnter(() => {
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/orador/" + match.params.id + "/palestra"
    }).then(resultado => {  
      console.log(resultado)      
        setPossuiResultados(true);
        setPalestra(resultado.data[0]);
        setTxtTitulo((resultado.data[0].nome));

    }).catch(erro => {
        console.log("ERRO", erro);
    })
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbarSemTransparencia">
          <IonButtons slot="start" >
            <IonButton onClick={() => {window.history.back()}}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>{txtTitulo}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="backgroundBranco">
        { possuiResultados &&
          <IonText className="local_atividade">{palestra.local_palestra.toUpperCase()}</IonText>
        }
        { !possuiResultados &&
          <div style={{height: "95%", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", color: "#9b9b9b"}}>
            <IonText>A carregar informações da palestra</IonText>
          </div>
        }
        { possuiResultados === true &&
          <div className="areaInformacao" style={{padding: "8px 16px", marginTop: "10px"}}>
            <div>
              <IonText style={{fontSize: "26px", color: "#4a4a4a", fontWeight: "bold", lineHeight: "28px"}}><p style={{marginBottom: "0px", paddingBottom: "0px"}}>{palestra.titulo}</p></IonText>
              <div style={styl_infoHorario}>
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Início: </p>
                  <div style={stly_hora}>{(palestra.hora as string).slice(0, -3)}</div>
                </div>
                
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Duração: </p>
                  <div style={stly_hora}>{(palestra.duracao as string).slice(0, -3)}</div>
                </div>
              </div>
            </div>
            <div style={styl_areaDescricao}>
              <p>{palestra.descricao}</p>
            </div>

            <div className="ion-margin btnAmarelo">
                <IonButton type="button" style={styl_btnAdicionar}  onClick={() => {}} size="large" expand="block">PARTICIPAR</IonButton>
            </div>
          </div>
        }
      </IonContent>
    </IonPage>
  );
};

export default Palestra;
