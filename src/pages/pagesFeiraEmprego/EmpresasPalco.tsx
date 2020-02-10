import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, useIonViewWillEnter, IonText, IonButton, IonIcon, IonSearchbar } from '@ionic/react';
import React, { useState } from 'react';
import Axios from 'axios';
import ItemListagemEmpresas from "../../components/itemListagemEmpresas";

const Empresas: React.FC = () => {

  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ empresas, setEmpresas ] = useState([]);
  const [ empresasMostrar, setEmpresasMostrar ] = useState([]);
  const [ mostraBarraPesquisa, setMostraBarraPesquisa ] = useState(false);

  function procura(valor: string) {
    setEmpresasMostrar(empresas.filter(function(empresa){
      return (empresa['nome'] as string).toLowerCase().includes(valor.toLowerCase());
    }));
  }

  useIonViewWillEnter(() => {
    // -- obter lista de categorias
    Axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/empresas/palco"
    }).then(resultado => {        
        setPossuiResultados(true);
        setEmpresas(resultado.data);
        setEmpresasMostrar(resultado.data);
    }).catch(erro => {
        console.log("ERRO", erro);
    })
  });

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
          <IonTitle>Palco Central</IonTitle>
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
        <IonText className="txtCentroCultural">TENDA MULTIUSOS</IonText>
        {/*-- List of Text Items --*/}
        { possuiResultados === true && empresasMostrar.map(function(empresa) {
            return <ItemListagemEmpresas texto={empresa['nome']} urlImagem={empresa['logo']} idEmpresa={empresa['id']} key={empresa['id']}></ItemListagemEmpresas>
        })
        }
        
      </IonContent>
    </IonPage>
  );
};

export default Empresas;
