import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, useIonViewWillEnter, IonButton, IonIcon, IonSearchbar, IonText, IonLabel, IonImg, IonItem } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import ItemFeiraEmprego from '../components/itemFeiraEmprego';
import { Link } from 'react-router-dom';

const URL = 'app.cimeira.ipvc.pt/api/feira_emprego/';

const FeiraEmprego: React.FC = () => {
  
  var [menu1, setmenu1] = useState({id:"", nome: "", foto:""});
  var [menu2, setmenu2] = useState({id:"", nome: "", foto:""});
  var [menu3, setmenu3] = useState({id:"", nome: "", foto:""});
  var [menu4, setmenu4] = useState({id:"", nome: "", foto:""}); 
  var [feiraVirtual, setFeiraVirtual] = useState({link:""});
  var [possuiResultados, setPossuiResultados ] = useState(false);

 /* function callAxios(){
    Promise.all([axios.get(URL+"1"), axios.get(URL+"2"), axios.get(URL+"3"), axios.get(URL+"4"), axios.get(URL+"5")])
    .then(([result1, result2, result3, result4, result5]) => {
        setmenu1(result1.data);
        setmenu2(result2.data);
        setmenu3(result3.data);
        setmenu4(result4.data);
        setmenu5(result5.data);
        setPossuiResultados(true);
        console.log(menu1);
    })
  }
*/


  useIonViewWillEnter(() => {
    // -- obter lista de categorias
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/feira_emprego"
    }).then(resultado => {        
        setmenu1(resultado.data[0]);
        setmenu2(resultado.data[1]);
        setmenu3(resultado.data[2]);
        setmenu4(resultado.data[3]);
    }).catch(erro => {
        console.log("ERRO feira emprego", erro);
    });

      // -- obter lista de categorias
      axios({
        method: "get",
        url: "http://app.cimeira.ipvc.pt/api/feira_virtual"
      }).then(resultado => {        
          setFeiraVirtual(resultado.data[0]);
          console.log(resultado)
      }).catch(erro => {
          console.log("ERRO", erro);
      })
  });

    const rect = {
      minWidth: "50px",
      minHeight: "40px"
  };
/*
  useIonViewWillEnter(() => {
    callAxios();
  });
*/

  return (
    <IonPage>

      <IonHeader>   
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonBackButton defaultHref="/home" className="txtBranco"/>
          </IonButtons>
          <IonTitle>Feira Emprego</IonTitle>
        </IonToolbar>      
      </IonHeader>

      <IonContent class="ion-content-workshop"> 
        <IonLabel><IonText class="linha-topo">TENDA MULTIUSOS</IonText></IonLabel>
       
        <ItemFeiraEmprego texto={menu1.nome} idCategoria={menu1.id} urlImagem={menu1.foto} pathTo="/recrutamento"/>          
        <div> 
            <div tabIndex={0}>
                <div style={{ display: "flex", padding: "10px", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={rect}>
                        <IonImg src={menu2.foto} />
                    </div>
                    <div style={{ marginLeft: "10px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #dfdfdf" }}>
                        <p style={{ marginRight: "auto", color: "#4b4b4b", fontWeight: "bold" }}>{menu2.nome}</p>
                        <IonButton href={feiraVirtual.link} fill="clear" slot="end" style={{width:"24px"}} >
                          <IonIcon name="arrow-forward" style={{ color: "#4b4b4b", fontSize: "24px", minWidth: "24px" }}></IonIcon>
                        </IonButton>
                
                    </div>
                </div>
                
            </div>
        </div>
        <ItemFeiraEmprego texto={menu3.nome} idCategoria={menu3.id} urlImagem={menu3.foto} pathTo="/pitchs"/> 
        <ItemFeiraEmprego texto={menu4.nome} idCategoria={menu4.id} urlImagem={menu4.foto} pathTo="/vianalinkmoments"/> 
        
        { console.log(menu1.nome + menu2.nome + menu3.nome) }
      </IonContent>

    </IonPage>
  );
};

export default FeiraEmprego;