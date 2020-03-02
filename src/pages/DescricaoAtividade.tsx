import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonText, IonToast, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';

interface UserDetailPageProps extends RouteComponentProps<{
  id: string;
}> {}

const Atividade: React.FC<UserDetailPageProps> = ({match}) => {

  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [atividade, setAtividade ] = useState({atividade: "", categoria: {}, categoria_id: null, descricao: "", duracao: "", hora: "", id: null, local: "", moderador: null});
  const [ txtTitulo, setTxtTitulo ] = useState("A carregar atividade...");
  
  const [ toast, setToast ] = useState({state: false, message: ""});

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

  function inscreverAtividade() {
    if(!localStorage.getItem("UtilizadorID")){
      console.log("Utilizador ID não existe!")
      setToast({state: true, message: "Ocorreu um erro ao realizar a inscrição na atividade!"});
      return;
    }
    if(possuiResultados){
      axios({
        method: "post",
        url: "http://app.cimeira.ipvc.pt/api/atividade_detalhes/" + atividade.id,
        data: {
          id_utilizador: localStorage.getItem("UtilizadorID")
        }
      }).then(resultado => {       
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

  useIonViewDidEnter(() => {
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/atividade_detalhes/" + match.params.id
    }).then(resultado => {        
        setPossuiResultados(true);
        if(resultado.data.moderador == null)
          resultado.data.moderador = "";
        setAtividade(resultado.data);
        setTxtTitulo((resultado.data.categoria.categoria).toLowerCase().charAt(0).toUpperCase() + (resultado.data.categoria.categoria).toLowerCase().slice(1));
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
      <IonToast isOpen={toast.state} onDidDismiss={() => setToast({state: false, message: toast.message})} message={toast.message} duration={3000}></IonToast>
      <IonContent fullscreen className="backgroundBranco">
        { possuiResultados &&
          <IonText className="txtCentroCultural">{atividade.local.toUpperCase()}</IonText>
        }
        { !possuiResultados &&
          <div style={{height: "95%", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", color: "#9b9b9b"}}>
            <IonText>A carregar informações da atividade</IonText>
          </div>
        }
        { possuiResultados === true &&
          <div className="areaInformacao" style={{padding: "8px 16px", marginTop: "10px"}}>
            <div>
              <IonText style={{fontSize: "26px", color: "#4a4a4a", fontWeight: "bold", marginBottom: 0, paddingBottom: 0, lineHeight: "28px"}}><p>{atividade.atividade}</p></IonText>
              <div style={styl_infoHorario}>
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Início: </p>
                  <div style={stly_hora}>{(atividade.hora as string).slice(0, -3)}</div>
                </div>
                
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Duração: </p>
                  <div style={stly_hora}>{(atividade.duracao as string)}</div>
                </div>
              </div>
            </div>
            <div style={styl_areaDescricao}>
              <p>{atividade.descricao}</p>
            </div>

            <div className="ion-margin btnAmarelo">
                <IonButton type="button" style={styl_btnAdicionar}  onClick={() => { inscreverAtividade() }} size="large" expand="block">PARTICIPAR</IonButton>
            </div>
          </div>
        }
      </IonContent>
    </IonPage>
  );
};

export default Atividade;
