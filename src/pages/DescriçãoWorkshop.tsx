import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonText, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';

interface UserDetailPageProps extends RouteComponentProps<{
  id: string;
}> {}

const Workshops: React.FC<UserDetailPageProps> = ({match}) => {

    const [possuiResultados, setPossuiResultados ] = useState(false);
    const [workshop, setWorkshop] = useState({id: "", titulo: "", hora: "", moderador: "", duracao: "", local: "", descricao: ""});
    const [toast, setToast] = useState({state: false, message: "Erro na inscrição"});
 
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
    
      const stly_hora = {
        background: "#9b9b9b",
        padding: "2px 15px",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "center",
        color: "white",
        fontSize: "14px"
      }
    
      // padding: "2px 15px",
      const styl_areaDescricao = {
        textAlign: "justify" as "justify",        
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
          url: "http://app.cimeira.ipvc.pt/api/workshop/" + match.params.id
        }).then(resultado => {        
            setPossuiResultados(true);
            setWorkshop(resultado.data[0]);
            console.log(resultado)
        }).catch(erro => {
            console.log("ERRO", erro);
        })
      });

      function inscricaoWorkshop(e: any) {
       

        axios({
            method: "post",
            url: "http://app.cimeira.ipvc.pt/api/workshop/"+match.params.id,
            data: {
                id_utilizador: localStorage.getItem("UtilizadorID")
            }
        }).then(resultado => {
            console.log(resultado);
            if(resultado.data.status == false){              
                setToast({state: true, message: "Ocorreu um erro!"});
            } 
        }).catch(erro => {
            console.log("ERRO", erro);
            setToast({state: true, message: "Ocorreu um erro a realizar a inscrição!"});
        }); 
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
          <IonTitle>Workshops</IonTitle>          
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="backgroundBranco">
        { possuiResultados &&
          <IonText className="txtCentroCultural">{workshop.local.toUpperCase()}</IonText>
        }
        { !possuiResultados &&
          <div style={{height: "95%", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", color: "#9b9b9b"}}>
            <IonText>A carregar informações da atividade</IonText>
          </div>
        }
        { possuiResultados === true &&
          <div className="areaInformacao" style={{padding: "8px 16px", marginTop: "0px"}}>
            <div>
              <IonText style={{fontSize: "26px", color: "#4a4a4a", fontWeight: "bold", marginBottom: 0, paddingBottom: 0, lineHeight: "28px"}}><p>{workshop.titulo.toUpperCase()}</p></IonText>
              <IonText style={{fontSize: "12px", color: "#757575", marginTop: 0, paddingTop: 0}}><p>Moderador: {workshop.moderador}</p></IonText>
              <div style={styl_infoHorario}>
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Início: </p>
                  <div style={stly_hora}>{(workshop.hora as string).slice(0, -3)}</div>
                </div>
                
                <div style={styl_infoHorario_dentro}>
                  <p style={{marginRight: "5px"}}>Duração: </p>
                  <div style={stly_hora}>{(workshop.duracao as string).slice(0, -3)}</div>
                </div>
              </div>
            </div>
            <div style={styl_areaDescricao}>
              <p>{workshop.descricao}</p>
            </div>

            <div className="ion-margin btnAmarelo">
                <IonButton type="button" style={styl_btnAdicionar}  onClick={(e) => {inscricaoWorkshop(e)}} size="large" expand="block">PARTICIPAR</IonButton>
            </div>
          </div>
        }
      </IonContent>
    </IonPage>
  );
};

export default Workshops;
