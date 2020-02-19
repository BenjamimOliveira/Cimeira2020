import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonSearchbar, IonText, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import ItemAgenda from "../components/itemAgenda"
import '../theme/agenda_timeline.css';

const Programa: React.FC = () => {

  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ items, setItems ] = useState([{tipo: "Atividade", hora: "10:00:00", titulo: "Engenharias", descricao: "Descriçaõ teste"}, {tipo: "Atividade", hora: "10:00:00", titulo: "Engenharias", descricao: "Descriçaõ teste"}, {tipo: "Atividade", hora: "10:00:00", titulo: "Engenharias", descricao: "Descriçaõ teste"}]);
  const [ itemsMostrar, setItemsMostrar ] = useState([{tipo: "Atividade", hora: "10:00:00", titulo: "Engenharias", descricao: "Descriçaõ teste"}, {tipo: "Atividade", hora: "10:00:00", titulo: "Engenharias", descricao: "Descriçaõ teste"}, {tipo: "Atividade", hora: "10:00:00", titulo: "Engenharias", descricao: "Descriçaõ teste"}]);
  const [ mostraBarraPesquisa, setMostraBarraPesquisa ] = useState(false);

  function procura(valor: string) {
    setItemsMostrar(items.filter(function(items){
      return (items['titulo'] as string).toLowerCase().includes(valor.toLowerCase());
    }));
  }

  useIonViewDidEnter(() => {
    // -- obter lista de categorias
    /*axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/programa"
    }).then(resultado => {        */
        setPossuiResultados(true);
        //setItems(resultado.data);
        //setItemsMostrar(resultado.data);
    /*}).catch(erro => {
        console.log("ERRO", erro);
    })*/
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
              return <ItemAgenda hora={(item.hora as string).slice(0, -3)} titulo={item.titulo} desc={item.descricao} tipo={item.tipo} key={item['titulo']}></ItemAgenda>
          })
          }
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Programa;
