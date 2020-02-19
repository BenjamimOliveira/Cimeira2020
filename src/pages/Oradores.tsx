import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonSearchbar, IonText, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import axios from "axios";
import ItemListagemOradores from "../components/itemListagemOradores";

const Oradores: React.FC = () => {
  
  const [ mostraBarraPesquisa, setMostraBarraPesquisa ] = useState(false);
  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ oradores, setOradores ] = useState([]);
  const [ oradoresAMostrar, setOradoresAMostrar ] = useState([]);

  // -- obter listagem de oradores
  useIonViewDidEnter(() => {
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/oradores"
    }).then(resultado => {        
        setPossuiResultados(true);
        setOradores(resultado.data);
        setOradoresAMostrar(resultado.data);
    }).catch(erro => {
        console.log("ERRO", erro);
    })
  });

  // -- listrar oradores ao pesquisar
  function procura(valor: string) {
    setOradoresAMostrar(oradores.filter(function(orador){
      return (orador['nome'] as string).toLowerCase().includes(valor.toLowerCase());
    }));
  }


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
          <IonTitle>Oradores</IonTitle>
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
        <IonText className="local_atividade">GIL EANES</IonText>
        { possuiResultados === true && oradoresAMostrar.map(function(orador) {
            return <ItemListagemOradores key={orador['id']} nome={orador['nome']} cargo={orador['cargo']} urlImagem={orador['foto']} hora={(orador['hora'] as string).substr(0, (orador['hora'] as string).length - 3)} idOrador={orador['id']}></ItemListagemOradores>
        })
        }
        { possuiResultados === false &&
          <h6 style={{textAlign: "center", color: "#4b4b4b"}}>Não existem oradores a mostrar</h6>
        }
        { possuiResultados === true && oradoresAMostrar.length <= 0 &&
          <h6 style={{textAlign: "center", color: "#4b4b4b"}}><b>Não foi encontrado nenhum orador com o nome pesquisado</b></h6>
        }
      </IonContent>
    </IonPage>
  );
};

export default Oradores;