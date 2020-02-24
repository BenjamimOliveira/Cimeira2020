import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonText, IonToast, IonAvatar, IonImg, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';

interface UserDetailPageProps extends RouteComponentProps<{
  id: string;
}> {}

const Atividade: React.FC<UserDetailPageProps> = ({match}) => {

  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ empresa, setEmpresa ] = useState({id: 0, local: "", nome: "", logo: "", localizacao_empresa: "", area_empresa: "", representante_empresa: "", contacto_representante: "", palco_central: "", hora: "", duracao: "", descricao: ""});
  const [ txtTitulo, setTxtTitulo ] = useState("A carregar informação...");

  const [ toast, setToast ] = useState({state: false, message: ""});

  useIonViewDidEnter(() => {
    // -- obter info empresa
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/empresa/" + match.params.id
    }).then(resultado => {        
        setPossuiResultados(true);
        setEmpresa(resultado.data[0]);
        setTxtTitulo(resultado.data[0].nome);
    }).catch(erro => {
        console.log("ERRO", erro);
    })
  });

  function inscreverPalco() {
    if(!localStorage.getItem("UtilizadorID")){
      console.log("Utilizador ID não existe!")
      setToast({state: true, message: "Ocorreu um erro ao realizar a inscrição!"});
      return;
    }
    if(possuiResultados){
      axios({
        method: "post",
        url: "http://app.cimeira.ipvc.pt/api/empresas/palco/" + empresa.id,
        data: {
          id_utilizador: localStorage.getItem("UtilizadorID")
        }
      }).then(resultado => {
        console.log(resultado);
           
          if(resultado.data.status){
            setToast({state: true, message: "Foi inscrito com sucesso!"});
          } else {
            setToast({state: true, message: "Já se encontra inscrito!"});
          }
      }).catch(erro => {
          console.log("ERRO", erro);
          setToast({state: true, message: "Ocorreu um erro ao realizar a inscrição!"});
      });
    } else {

    }
  }

  const styl_infoHorario = {
    display: "flex",  
    alignItems: "center", 
    justifyContent: "space-between",
    padding: "8px 0",
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
    padding: "2px 0",
    color: "#4a4a4a"
  }

  const styl_btnAdicionar = {
    color: "#A61526",
    background: "#FFEC00",
    backgroundColor: "#FFEC00",
    marginTop: "50px"
  }

  const styl_avatar = {
    maxWidth: "180px", 
    minWidth: "180px", 
    height: "180px",  
    maxHeight: "180px",
    margin: "15px 0",
    boxShadow: "rgba(0,0,0,0.3) 0 0 20px"
  }

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
      <IonToast isOpen={toast.state} onDidDismiss={() => setToast({state: false, message: toast.message})} message={toast.message} duration={3000}></IonToast>
      <IonContent fullscreen className="backgroundBranco">
        { !possuiResultados &&
          <div style={{height: "95%", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", color: "#9b9b9b"}}>
            <IonText>A carregar informações da empresa</IonText>
          </div>
        }
        { possuiResultados === true &&
          <div className="areaInformacao" style={{padding: "8px 16px", marginTop: "10px"}}>
            <div>
              <div style={{display: "flex",justifyContent: "center"}}>
                <IonAvatar style={styl_avatar}>
                  <IonImg src={empresa.logo}/>
                </IonAvatar>
              </div>
              <div style={styl_infoHorario}>
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Início: </p>
                  <div style={stly_hora}>{(empresa.hora as string).slice(0, -3)}</div>
                </div>
                
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Duração: </p>
                  <div style={stly_hora}>{(empresa.duracao as string).slice(0, -3)}</div>
                </div>
              </div>
            </div>
            <div style={styl_areaDescricao}>
              <p>{empresa.descricao}</p>
            </div>

            <div className="ion-margin btnAmarelo">
                <IonButton type="button" style={styl_btnAdicionar}  onClick={() => { inscreverPalco() }} size="large" expand="block">PARTICIPAR</IonButton>
            </div>
          </div>
        }
      </IonContent>
    </IonPage>
  );
};

export default Atividade;
