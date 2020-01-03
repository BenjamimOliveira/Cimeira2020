import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterLink } from '@ionic/react';
import React from 'react';
import Hero from "../components/teste"

const Home: React.FC = () => {

  var teste= [
    "ola", "ola2", "ola3", "ola4"
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        The world is your oyster.
        <p>
          If you get lost, the{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/">
            docs
          </a>{' '}
          will be your guide.
          { localStorage.getItem("UtilizadorLogin") }
        </p>

        <div className="marginTop200px ion-text-center titulo">
            <IonRouterLink routerLink="/programa" routerDirection="root" className="txtAmarelo">
                <p><b>Programa >> </b></p>
            </IonRouterLink>
        </div>

        <Hero lbl="teste"></Hero>
        <Hero lbl="aaa"></Hero>
        <Hero lbl="bbb"></Hero>
        { teste.map(function (valor){
          return <Hero lbl={valor} key={valor}></Hero>
        }) }
        <Hero lbl="cccs" num={124}></Hero>

      </IonContent>
    </IonPage>
  );
};

export default Home;
