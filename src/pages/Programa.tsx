import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonBackButton, IonSearchbar, IonText, useIonViewWillEnter, useIonViewDidLeave } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import ItemProgramaHorario from "../components/itemProgramaHorario"

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
        { possuiResultados === true && categoriasMostrar.map(function(categoria) {
            return <ItemProgramaHorario texto={categoria['categoria']} urlImagem={categoria['path']} idCategoria={categoria['id']} key={categoria['id']}></ItemProgramaHorario>
        })
        }
        
      </IonContent>
    </IonPage>
  );
};

export default Programa;
