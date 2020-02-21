import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonAlert } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


import Home from './pages/Home';
import Login from './pages/Login';
import SelecaoTipoPerfil from './pages/SelecaoTipoPerfil';
import Registo from './pages/Registo';
import RegistoRGPD from './pages/Registo_RGPD';
import ValidarRegisto from "./pages/ValidarRegisto";
import Programa from "./pages/Programa";
import DescricaoAtividade from "./pages/DescricaoAtividade";
import Workshops from './pages/Workshops';
import Oradores from './pages/Oradores';
import Palestra from './pages/Palestra';
import FeiraEmprego from './pages/FeiraEmprego';
import MyAgenda from './pages/MyAgenda';
import PhotoFeed from './pages/PhotoFeed';
import Localizacao from './pages/Localizacao';
import DescricaoWorkshop from "./pages/DescriçãoWorkshop";
import Recrutamento from "./pages/pagesFeiraEmprego/Recrutamento";
import Empresas1 from './pages/Empresas1';
import Stands from './pages/pagesFeiraEmprego/Stands';
import FeiraVirtual from './pages/pagesFeiraEmprego/FeiraVirtual';
import Pitch from './pages/pagesFeiraEmprego/Pitchs';
import VianaLinkMoments from './pages/pagesFeiraEmprego/VianaLinkMoments';
import EmpresasPalco from './pages/pagesFeiraEmprego/EmpresasPalco';
import DescricaoEmpresa from './pages/pagesFeiraEmprego/DescricaoEmpresa';
import DescricaoEmpresaPalco from './pages/pagesFeiraEmprego/DescricaoPalcoCentral';
import PitchsInscricao from './pages/pagesFeiraEmprego/PitchsInscricao';
import Agenda from './pages/Agenda';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';

import './theme/teste.css';

import axios from 'axios';


const App: React.FC = () => {
  
  const [mostrarAlertaSemLigacao, setErroSemLigacao] = useState(false);


  useEffect(() => {
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/",
    }).catch(erro => {
        if(erro.message == "Network Error"){
            setErroSemLigacao(true);
        }
    }); 
  })

  return (
    <IonApp>
      <IonAlert
        isOpen={mostrarAlertaSemLigacao}
        onDidDismiss={() => setErroSemLigacao(false)}
        header={''}
        subHeader={'Atenção'}
        message={'É necessária uma ligação à internet para utilizar esta aplicação!'}
        buttons={['OK']}
        />
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact={true} />
          <Route path="/workshop" component={Workshops}/>        
          <Route path="/programa" component={Programa}/>     
          <Route path="/oradores" component={Oradores}/> 
          <Route path="/palestra/:id" component={Palestra} />             
          <Route path="/myagenda" component={MyAgenda}/>                       
          <Route path="/photofeed" component={PhotoFeed}/>           
          <Route path="/feiraemprego" component={FeiraEmprego}/>               
          <Route path="/localizacao" component={Localizacao}/>
          <Route path="/atividade/:id" component={DescricaoAtividade} />        
          <Route path="/descrWorkshop/:id" component={DescricaoWorkshop} />
          <Route path="/validarregisto" component={ValidarRegisto} exact={true} />
          <Route path="/registo" component={Registo} exact={true} />
          <Route path="/registo_aceitar_rgpd" component={RegistoRGPD} exact={true} />
          <Route path="/stands" component={Stands}/>
          <Route path="/descricao_empresa/:id" component={DescricaoEmpresa}/>
          <Route path="/descricao_empresa_palco/:id" component={DescricaoEmpresaPalco}/>
          <Route path="/empresas1" component={Empresas1}/>

          <Route path="/recrutamento" component={Recrutamento} exact={true} />
          <Route path="/empresas_palco" component={EmpresasPalco} exact={true} />        
          <Route path="/feiraVirtual" component={FeiraVirtual} exact={true} />
          <Route path="/pitchs" component={Pitch} exact={true} />
          <Route path="/vianalinkmoments" component={VianaLinkMoments} />
          <Route path="/pitchInscricao" component={PitchsInscricao}/>

          <Route path="/login" component={Login} exact={true} />
          <Route path="/selecionar_perfis_conta" component={SelecaoTipoPerfil} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/login" />} />

          
          <Route path="/agenda" component={Agenda} exact={true} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};


{/* <Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/> */}

export default App;
