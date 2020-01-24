import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Registo from './pages/Registo';
import ValidarRegisto from "./pages/ValidarRegisto";
import Programa from "./pages/Programa";
import DescricaoAtividade from "./pages/DescricaoAtividade";

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

import Workshops from './pages/Workshops';
import Oradores from './pages/Oradores';
import Palestra from './pages/Palestra';
import FeiraEmprego from './pages/FeiraEmprego';
import MyAgenda from './pages/MyAgenda';
import PhotoFeed from './pages/PhotoFeed';
import Localizacao from './pages/Localizacao';
import './theme/teste.css';
const App: React.FC = () => (
  
  <IonApp>
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
        <Route path="/validarregisto" component={ValidarRegisto} exact={true} />
        <Route path="/registo" component={Registo} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/login" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);


{/* <Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/> */}

export default App;
