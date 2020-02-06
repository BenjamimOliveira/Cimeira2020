import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonBackButton, IonText, useIonViewWillEnter } from '@ionic/react';
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

  useIonViewWillEnter(() => {
    // -- obter lista de categorias
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/atividade_detalhes/" + match.params.id
    }).then(resultado => {        
        setPossuiResultados(true);
        if(resultado.data.moderador == null)
          resultado.data.moderador = "";
        setAtividade(resultado.data);
        setTxtTitulo((resultado.data.categoria.categoria).toLowerCase().charAt(0).toUpperCase() + (resultado.data.categoria.categoria).toLowerCase().slice(1));
        //console.log(resultado)
    }).catch(erro => {
        console.log("ERRO", erro);
    })
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbarSemTransparencia">
          <IonButtons slot="start" >
            <IonBackButton defaultHref="/programa" className="txtBranco"/>
          </IonButtons>
          <IonTitle>{txtTitulo}</IonTitle>
        </IonToolbar>
      </IonHeader>

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
              <IonText style={{fontSize: "12px", color: "#757575", marginTop: "-100px", paddingTop: 0}}><p>Moderador: {atividade.moderador}</p></IonText>
              <div style={styl_infoHorario}>
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Início: </p>
                  <div style={stly_hora}>{(atividade.hora as string).slice(0, -3)}</div>
                </div>
                
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Duração: </p>
                  <div style={stly_hora}>{(atividade.duracao as string).slice(0, -3)}</div>
                </div>
              </div>
            </div>
            <div style={styl_areaDescricao}>
              <p>{atividade.descricao}</p>
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

export default Atividade;
