import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonGrid, IonButton, IonLabel, IonItem, IonImg } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { stringify } from 'querystring';

//{"id":"1","path":"http:\/\/app.cimeira.ipvc.pt\/files\/icon_programa.png","title":"PROGRAMA","type":"p"}
// http://app.cimeira.ipvc.pt/api/main/1

const URL = 'http://app.cimeira.ipvc.pt/api/main/1';
/*
const fetchAPI = () => {
  return axios({
    url: URL,
    method: 'get' 
  }).then(response =>{
    //console.log(response);
    return response.data;
  })
}*/

type categoria = {
  id: string;
  path: string;
  title: string;
  type: string;
}

class Categoria {
  id: string;
  path: string;
  title: string;
  type: string;

  constructor(id: string, path: string, title: string, type: string){
    this.id = id;
    this.path = path;
    this.title = title;
    this.type = type;
  }
}



const Home: React.FC<RouteComponentProps> = (props) => {
  /*const [result, setResult] = useState();
  const items: any[] = [];
  var a: any;
  useEffect(() => {
    console.log(fetchAPI());
  }, []);*/
  const [result, setResult] = useState<categoria>();
  var cat = new Categoria("","","t","");
  var a: string = "";
  var b;
  const request = async () => {
    const response = await fetch('http://app.cimeira.ipvc.pt/api/main/1');
    const json = await response.json();
    cat = new Categoria(json.id, json.path, json.title, json.type);
    a = cat.title;
    b = undefined;
    console.log(cat);

    
    return cat;
  }
  request();

  do{}while(a == "" || a == b);
  console.log(a);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Página Inicial</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid class="grid">     
          <IonRow>
            <IonCol size="6">
              <IonItem onClick={() => props.history.push('/programa')} color="danger" class="ion-text-center">
                <div>
                  <IonImg src='http:\/\/app.cimeira.ipvc.pt\/files\/logo_Cimeira.png' class="categoriasLogo"/>                  
                  <h3>{}</h3>
                </div>                
              </IonItem>
            </IonCol>

            <IonCol size="6" >
              <IonItem onClick={() => props.history.push('/oradores')} color="danger" class="ion-text-center">
                <div>
                  <IonImg src='http:\/\/app.cimeira.ipvc.pt\/files\/logo_Cimeira.png' class="categoriasLogo"/>                  
                  <h3>Oradores</h3>
                </div>    
              </IonItem>
            </IonCol>
          </IonRow>   

          <IonRow>
            <IonCol size="6">
              <IonItem onClick={() => props.history.push('/feiraemprego')} color="danger" class="ion-text-center">
                <div>
                  <IonImg src='http:\/\/app.cimeira.ipvc.pt\/files\/logo_Cimeira.png' class="categoriasLogo"/>                  
                  <h3>Feira de Emprego </h3>
                </div> 
              </IonItem>
            </IonCol>

            <IonCol size="6" >
              <IonItem onClick={() => props.history.push('/workshop')} color="danger" class="ion-text-center">
                <div>
                  <IonImg src='http:\/\/app.cimeira.ipvc.pt\/files\/logo_Cimeira.png' class="categoriasLogo"/>                  
                  <h3 >Workshops</h3>
                </div>
              </IonItem>
            </IonCol>
          </IonRow> 
          
          <IonRow class="subcategoriasLinha">
            <IonCol size="4" >
              <IonItem onClick={() => props.history.push('/myagenda')} color="danger" class="ion-text-center">
                <div>
                  <IonImg src='http:\/\/app.cimeira.ipvc.pt\/files\/logo_IPVC.png' class="subcategoriasLogo"/>                  
                  <label>MyAgenda</label>
                </div>
              </IonItem>
            </IonCol>

            <IonCol size="4" >
              <IonItem onClick={() => props.history.push('/photofeed')} color="danger" class="ion-text-center">
                <div>
                  <IonImg src='http:\/\/app.cimeira.ipvc.pt\/files\/logo_IPVC.png' class="subcategoriasLogo"/>                  
                  <label>PhotoFeed</label>
                </div>
              </IonItem>
            </IonCol>

            <IonCol size="4" >
              <IonItem onClick={() => props.history.push('/localizacao')} color="danger" class="ion-text-center">
                <div>
                  <IonImg src='http:\/\/app.cimeira.ipvc.pt\/files\/logo_IPVC.png' class="subcategoriasLogo"/>                  
                  <label>Localização</label>
                </div>
              </IonItem>
            </IonCol>

          </IonRow> 

        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
