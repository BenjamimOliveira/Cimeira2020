import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonSearchbar, IonText, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import ItemProgramaHorario from "../components/itemProgramaHorario"
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
          <IonTitle>Programa</IonTitle>
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
        <div className="timeline timeline-split">
          { possuiResultados === true && itemsMostrar.map(function(item) {
              return <div className="timeline-item" key={item['titulo']}>
                    <div className="timeline-info">
                        <span>March 12, 2016</span>
                    </div>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                        <h3 className="timeline-title">Event Title</h3>
                        <p>Nullam vel sem. Nullam vel sem. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Donec vitae sapien ut libero venenatis faucibus. ullam dictum felis
                            eu pede mollis pretium. Pellentesque ut neque.</p>
                    </div>

              </div>
          })
          }
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Programa;
