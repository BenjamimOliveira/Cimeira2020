import { IonContent, IonPage, IonRow, IonCol, IonGrid, IonItem, IonImg, IonText, IonFooter, IonButton, IonLabel, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import "./Home.scss";
//{"id":"1","path":"http:\/\/app.cimeira.ipvc.pt\/files\/icon_programa.png","title":"PROGRAMA","type":"p"}
// http://app.cimeira.ipvc.pt/api/main/1

const URL = 'http://app.cimeira.ipvc.pt/api/main/';
const URLButMeio = "http://app.cimeira.ipvc.pt/api/programa/pdf";

const Home: React.FC<RouteComponentProps> = (props) => {
    
    var nomeUser = localStorage.getItem("UtilizadorLogin");
    if(nomeUser == null){
        nomeUser="À CIMEIRA";
    }
    // -- Menus principais
    var [menu1, setmenu1] = useState({id:null, path: "", title:"", type:""});
    var [menu2, setmenu2] = useState({id:null, path: "", title:"", type:""});
    var [menu3, setmenu3] = useState({id:null, path: "", title:"", type:""});
    var [menu4, setmenu4] = useState({id:null, path: "", title:"", type:""});
    // -- Menu secundario (Footer)    
    var [menu5, setmenu5] = useState({id:null, path: "", title:"", type:""});
    var [, setmenu6] = useState({id:null, path: "", title:"", type:""});
    var [menu7, setmenu7] = useState({id:null, path: "", title:"", type:""});
    // -- Botao meio
    var [butCentro, setButCentro] = useState("");

    var [possuiResultados_programa, setPossuiResultados_programa] = useState(false);

    var [] = useState("");

    //menu1 = {"id":"12","path":"http:\/\/app.cimeira.ipvc.pt\/files\/icon_programa.png","title":"PROGRAMA","type":"p"};
  

    
  

    function callAxios(){
        Promise.all([axios.get(URL+"1"), axios.get(URL+"2"), axios.get(URL+"3"), axios.get(URL+"4"), axios.get(URL+"5"), axios.get(URL+"6"), axios.get(URL+"7")])
        .then(([result1, result2, result3, result4, result5, result6, result7]) => {
            setmenu1(result1.data);
            setmenu2(result2.data);
            setmenu3(result3.data);
            setmenu4(result4.data);
            setmenu5(result5.data);
            setmenu6(result6.data);
            setmenu7(result7.data);
                            
            setPossuiResultados_programa(true);
        })
    }

    useIonViewDidEnter(() => {
        callAxios();

        axios({
            method: "get",
            url: URLButMeio
          }).then(resultado => {        
              setButCentro(resultado.data);
              console.log(resultado);
          }).catch(erro => {
              console.log("ERRO", erro);
          })
    });

    return (
        <IonPage>
            
            <IonContent no-padding no-margin margin-left class="grid-bottom" overflow-scroll="false">
                <div className="ecraGeral" style={{height:"20%"}}>
                <IonGrid class="ion-align-items-center dataTopo">
                    <IonCol size="12">
                        <IonRow>
                            <IonText color="light" class="boasvindas">BEM-VINDO</IonText>
                        </IonRow>
                        <IonRow>
                            <IonText color="light" class="pessoa">{nomeUser.toUpperCase()}</IonText>
                        </IonRow>
                    </IonCol>
                </IonGrid>
              
                <div style={{position: "relative", width: "100%"}}>
                <IonGrid no-padding no-margin class="grid">
                    <IonRow>

                        { possuiResultados_programa && 
                            <IonCol size="6" class="col">
                                <IonItem lines="none" onClick={() => props.history.push('/programa')} color="#FFFFFF" class="ion-text-center">
                                <IonGrid>
                                    <IonCol>
                                        <div><IonImg src={menu1.path} class="categoriasLogo menus" /></div>
                                        <div><IonText color="tertiary" >{menu1.title}</IonText></div>
                                        <div style={{}}></div>
                                    </IonCol>
                                </IonGrid> 
                                </IonItem>
                            </IonCol>
                        }

                        { possuiResultados_programa && 
                        <IonCol size="6" >
                            <IonItem lines="none" onClick={() => props.history.push('/empresas1')} color="#FFFFFF" class="ion-text-center">
                                <IonGrid>
                                    <IonCol>
                                        <div><IonImg src={menu2.path} class="categoriasLogo menus" /></div>
                                        <div><IonText color="tertiary" >{menu2.title}</IonText></div>
                                    </IonCol>
                                </IonGrid> 
                            </IonItem>
                        </IonCol>
                        }

                    </IonRow>

                    <IonRow>

                        { possuiResultados_programa && 
                        <IonCol size="6" style={{marginBottom:"4em"}}>
                            <IonItem lines="none" onClick={() => props.history.push('/feiraemprego')} color="#FFFFFF" class="ion-text-center">
                                <IonGrid>
                                    <IonCol>
                                        <div><IonImg src={menu3.path} class="categoriasLogo menus" /></div>
                                        <div><IonText color="tertiary" >{menu3.title}</IonText></div>
                                    </IonCol>
                                </IonGrid>                            
                            </IonItem>
                        </IonCol>
                        }

                        { possuiResultados_programa && 
                        <IonCol size="6">
                            <IonItem lines="none" onClick={() => props.history.push('/workshop')} color="#FFFFFF" class="ion-text-center">
                                <IonGrid>
                                    <IonCol>
                                        <div><IonImg src={menu4.path} class="categoriasLogo menus" /></div>
                                        <div><IonText color="tertiary" >{menu4.title}</IonText></div>
                                    </IonCol>
                                </IonGrid>
                            </IonItem>
                        </IonCol>
                            }
                    </IonRow>
                
                </IonGrid>
                { possuiResultados_programa && 
                <div style={{ position: "absolute", top: "30%", left: "35%", height: "25%", width: "30%", color: "#E2000F", }}>
                <IonButton strong href={butCentro} class="buttonCentro" color="tertiary" shape="round"><IonLabel color="primary">PROGRAMA<br/>CIMEIRA</IonLabel></IonButton>
                </div>
                }
                </div>
                </div>
                <IonFooter no-margin no-padding class="footer">
                    <IonGrid no-margin no-padding class="grid">
                    { possuiResultados_programa && 
                        <IonRow no-lines no-margin no-padding>
                            <IonCol no-lines no-margin no-padding size="6" class="col">
                                <IonItem lines="none" no-margin no-padding onClick={() => props.history.push('/myagenda')} color="#f" class="ion-text-center footerItems">
                                    <IonGrid> 
                                        <IonCol>
                                            <IonImg src={menu5.path} class="subcategoriasLogo" />
                                            <IonText color="medium" class="textFooter">{menu5.title}</IonText>
                                        </IonCol>
                                    </IonGrid>
                                </IonItem>
                            </IonCol>
                            {/*<IonCol size="4" class="col">
                                <IonItem lines="none" onClick={() => props.history.push('/myagenda')} color="#f" class="ion-text-center footerItems">
                                    <IonGrid>
                                        <IonCol>
                                            <IonImg src={menu6.path} class="subcategoriasLogo" />
                                            <IonText color="medium" class="textFooter">{menu6.title}</IonText>
                                        </IonCol>
                                    </IonGrid>
                                </IonItem>
                            </IonCol>*/}
                            <IonCol size="6" class="col">
                                <IonItem lines="none" onClick={() => props.history.push('/localizacao')} color="#f" class="ion-text-center footerItems">
                                    <IonGrid>
                                        <IonCol>
                                            <IonImg src={menu7.path} class="subcategoriasLogo" />
                                            <IonText color="medium" class="textFooter">{menu7.title}</IonText>
                                        </IonCol>
                                    </IonGrid>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        }
                    </IonGrid>
                </IonFooter>

            </IonContent>
        </IonPage>
    );
};

export default Home;