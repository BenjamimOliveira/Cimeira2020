import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonSearchbar, IonText, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import ItemAgenda from "../components/itemAgenda"
import '../theme/agenda_timeline.css';

const Agenda: React.FC = () => {

  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ items, setItems ] = useState([]);
  const [ itemsMostrar, setItemsMostrar ] = useState([]);
  const [ mostraBarraPesquisa, setMostraBarraPesquisa ] = useState(false);
  const [ mostraErro, setMostraErro ] = useState(false);

  function procura(valor: string) {
    setItemsMostrar(items.filter(function(items){
      return (items['titulo'] as string).toLowerCase().includes(valor.toLowerCase());
    }));
  }

  useIonViewDidEnter(() => {
    // -- obter lista de inscrições
    axios({
      method: "post",
      url: "http://app.cimeira.ipvc.pt/api/agenda",
      data: {
        id_utilizador: localStorage.getItem("UtilizadorID")
      }
    }).then((resultado) => {
        setItems(resultado.data[0]);
        setItemsMostrar(resultado.data[0]);
        
        setPossuiResultados(true);
    }).catch(erro => {
        console.log("ERRO", erro);
        setMostraErro(true);
    })
  })

  return (
    <IonPage>
      <IonHeader>
      { !mostraBarraPesquisa  && 
        <IonToolbar className="toolbarSemTransparencia">
          <IonButtons slot="start" >
            <IonButton onClick={() => {window.history.back()}}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Agenda</IonTitle>
          <IonButtons slot="end">
            <IonButton expand="block" onClick={() => {possuiResultados ? setMostraBarraPesquisa(true) : setMostraBarraPesquisa(false)}}>
              <IonIcon slot="icon-only" name="search" className="txtBranco"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      }
      { mostraBarraPesquisa && possuiResultados &&
        <IonToolbar className="toolbarSemTransparencia">
          <IonSearchbar showCancelButton="always" cancelButtonText="Cancelar" className="barraPesquisaTransparente" placeholder="Pesquisar Categoria" onIonBlur={() => setMostraBarraPesquisa(false)} onIonCancel={() => setMostraBarraPesquisa(false)} onIonChange={(e) => {procura((e.target as HTMLInputElement).value)}}></IonSearchbar>
        </IonToolbar>
      }
      </IonHeader>

      <IonContent fullscreen className="backgroundBranco">
        <IonText className="txtCentroCultural">CENTRO CULTURAL</IonText>
        {/*-- List of Text Items --*/}
        <div className="timeline timeline-split"  style={{marginTop: "10px"}}>
          { possuiResultados === true && itemsMostrar.map(function(item) {
              if(!item['hora'])
                (item['hora'] as any) = "00:00:00";
              return <ItemAgenda hora={(item['hora'] as string).slice(0, -3)} titulo={item['titulo']} desc={item['descricao']} tipo={item['tipo']} key={item['titulo']}></ItemAgenda>
          })
          }
        </div>

        { possuiResultados === true && itemsMostrar.length == 0 && items.length != 0 &&
          <div style={{height: "95%", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", color: "#9b9b9b"}}>
            <IonText>Não está inscrito a nenhuma atividade com essa designação</IonText>
          </div>
        }

        { possuiResultados === true && items.length == 0 &&
          <div style={{height: "95%", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", color: "#9b9b9b"}}>
            <IonText>Ainda não escolheu participar em nenhuma atividade</IonText>
          </div>
        }

        { !possuiResultados && !mostraErro &&
          <div style={{height: "95%", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", color: "#9b9b9b"}}>
            <IonText>A carregar dados...</IonText>
          </div>
        }

        { mostraErro &&
          <div style={{height: "95%", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", color: "#9b9b9b"}}>
            <IonText>Ocorreu um erro a carregar dados</IonText>
          </div>
        }
        
      </IonContent>
    </IonPage>
  );
};

export default Agenda;
