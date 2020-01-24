import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonImg, useIonViewWillEnter, IonText, IonLabel, IonButton, IonIcon, IonSearchbar } from '@ionic/react';
import React, { useState } from 'react';
import WorkshopList from "../components/WorkshopList";
import "./Workshop.scss";
import Axios from 'axios';

const Workshops: React.FC = () => {
  const hora = "10:00";
  const desc = "Ter sucesso numa entrevista de emprego";

  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ workshops, setWorkshops ] = useState([]);
  const [ workshopsMostrar, setWorkshopsMostrar ] = useState([]);  
  const [ mostraBarraPesquisa, setMostraBarraPesquisa ] = useState(false);

  function truncarHora(hora: string){
    var horaTemp = hora;
    horaTemp = horaTemp.slice(0, -3);
    return horaTemp;
  }
  
  useIonViewWillEnter(() => {
    // -- obter lista de categorias
    Axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/workshops"
    }).then(resultado => {        
        setPossuiResultados(true);
        setWorkshops(resultado.data);
        setWorkshopsMostrar(resultado.data);
    }).catch(erro => {
        console.log("ERRO wrkshps", erro);
    })
  });

  function procura(valor: string) {
    setWorkshopsMostrar(workshops.filter(function(workshop){
      return (workshop['titulo'] as string).toLowerCase().includes(valor.toLowerCase());
    }));
  }

  return (
    <IonPage>
      <IonHeader>
      { !mostraBarraPesquisa  && 
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonBackButton defaultHref="/home" className="txtBranco"/>
          </IonButtons>
          <IonTitle>Workshops</IonTitle>
          <IonButtons slot="end">
            <IonButton expand="block" onClick={() => {possuiResultados ? setMostraBarraPesquisa(true) : setMostraBarraPesquisa(false)}}>
              <IonIcon slot="icon-only" name="search" className="txtBranco"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      }
      { mostraBarraPesquisa && possuiResultados &&
        <IonToolbar class="navBarSearch">
          <IonSearchbar showCancelButton="always" cancelButtonText="Cancelar" className="navBarSearch " placeholder="Pesquisar Workshop" onIonBlur={() => setMostraBarraPesquisa(false)} onIonCancel={() => setMostraBarraPesquisa(false)} onIonChange={(e) => {procura((e.target as HTMLInputElement).value)}}></IonSearchbar>
        </IonToolbar>
      }
      </IonHeader>

      <IonContent class="ion-content-workshop"> 
      <IonLabel><IonText class="linha-topo">CENTRO CULTURAL</IonText></IonLabel>
      
      { possuiResultados === true && workshopsMostrar.map(function(work) {
            return <WorkshopList id={work['id']} hora={truncarHora(work['hora'])} desc={work['titulo']} key={work["id"]}/>
            
        })
        }
        
        
      </IonContent>
    </IonPage>
  );
};

export default Workshops;
