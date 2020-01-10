import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonBackButton, IonSearchbar, IonText, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
//import ItemProgramaHorario from "../components/itemProgramaHorario"

const Programa: React.FC = () => {

  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ categorias, setCategorias ] = useState([]);
  const [ categoriasMostrar, setCategoriasMostrar ] = useState([]);
  const [ mostraBarraPesquisa, setMostraBarraPesquisa ] = useState(false);

  function procura(valor: string) {
    setCategoriasMostrar(categorias.filter(function(categoria){
      return (categoria['categoria'] as string).toLowerCase().includes(valor.toLowerCase());
    }));
  }

  useIonViewWillEnter(() => {
    // -- obter lista de categorias
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/programa"
    }).then(resultado => {        
        setPossuiResultados(true);
        setCategorias(resultado.data);
        setCategoriasMostrar(resultado.data);
    }).catch(erro => {
        console.log("ERRO", erro);
    })
  });

  return (
    <IonPage>
      <IonHeader>
      { !mostraBarraPesquisa  && 
        <IonToolbar className="toolbarSemTransparencia">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Programa</IonTitle>
          <IonButtons slot="end">
            <IonButton expand="block" onClick={() => {possuiResultados ? setMostraBarraPesquisa(true) : setMostraBarraPesquisa(false)}}>
              <IonIcon slot="icon-only" name="search" />
            </IonButton>
            <IonButton expand="block">
              <IonIcon slot="icon-only" name="more" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      }
      { mostraBarraPesquisa && possuiResultados &&
        <IonToolbar className="toolbarSemTransparencia">
          <IonSearchbar showCancelButton="always" placeholder="Pesquisar Categoria" onIonCancel={() => setMostraBarraPesquisa(false)} onIonChange={(e) => {procura((e.target as HTMLInputElement).value)}}></IonSearchbar>
        </IonToolbar>
      }
      </IonHeader>

    </IonPage> 
  );
};

export default Programa;
