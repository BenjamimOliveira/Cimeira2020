import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, useIonViewWillEnter, IonText, IonButton, IonIcon, IonSearchbar } from '@ionic/react';
import React, { useState } from 'react';
import Axios from 'axios';
import RecrutamentoList from '../../components/RecrutamentoList';

const Recrutamento: React.FC = () => {
    
  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ recrutamento, setRecrutamento ] = useState([]);
  const [ recrutamentoMostrar, setRecrutamentoMostrar ] = useState([]);  
  const [ mostraBarraPesquisa, setMostraBarraPesquisa ] = useState(false);

  useIonViewWillEnter(() => {
    // -- obter lista de categorias
    Axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/recrutamento"
    }).then(resultado => {        
        setPossuiResultados(true);
        setRecrutamento(resultado.data);
        setRecrutamentoMostrar(resultado.data);
    }).catch(erro => {
        console.log("ERRO Recrutamento", erro);
    })
  });

  function procura(valor: string) {
    setRecrutamentoMostrar(recrutamento.filter(function(recruta){
      return (recruta['nome'] as string).toLowerCase().includes(valor.toLowerCase());
    }));
  }

  return (
    <IonPage>
      <IonHeader>   
        { !mostraBarraPesquisa  &&
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonButton onClick={() => {window.history.back()}}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Recrutamento</IonTitle>
          <IonButtons slot="end">
            <IonButton expand="block" onClick={() => {possuiResultados ? setMostraBarraPesquisa(true) : setMostraBarraPesquisa(false)}}>
              <IonIcon slot="icon-only" name="search" className="txtBranco"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      }
      { mostraBarraPesquisa && possuiResultados &&
        <IonToolbar class="navBarSearch">
          <IonSearchbar showCancelButton="always" cancelButtonText="Cancelar" className="navBarSearch " placeholder="Pesquisar Recrutamento" onIonBlur={() => setMostraBarraPesquisa(false)} onIonCancel={() => setMostraBarraPesquisa(false)} onIonChange={(e) => {procura((e.target as HTMLInputElement).value)}}></IonSearchbar>
        </IonToolbar>
      } 
      </IonHeader>
      <IonText className="txtCentroCultural">TENDA MULTIUSOS</IonText>
      <IonContent className="backgroundBranco">
        { possuiResultados === true && recrutamentoMostrar.map(function(recruta) {
            return <RecrutamentoList id={recruta['id']} nome={recruta['nome']} representante={recruta['representante']} local={recruta['local']} stand={recruta['stand']} vagas={recruta['vagas']} foto={recruta['foto']}/>
        
            
        })
        }
      </IonContent>  

    </IonPage>

    
  );
};

export default Recrutamento;
