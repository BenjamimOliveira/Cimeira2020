import { IonContent, IonPage, IonRow, IonCol, IonGrid, IonItem, IonImg, IonText, IonFooter, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import "./Home.scss";
//{"id":"1","path":"http:\/\/app.cimeira.ipvc.pt\/files\/icon_programa.png","title":"PROGRAMA","type":"p"}
// http://app.cimeira.ipvc.pt/api/main/1

const URL = 'http://app.cimeira.ipvc.pt/api/main/';

const Home: React.FC<RouteComponentProps> = (props) => {
    // -- Menus principais
    var [menu1, setmenu1] = useState({id:null, path: "", title:"", type:""});
    var [menu2, setmenu2] = useState({id:null, path: "", title:"", type:""});
    var [menu3, setmenu3] = useState({id:null, path: "", title:"", type:""});
    var [menu4, setmenu4] = useState({id:null, path: "", title:"", type:""});
    // -- Menu secundario (Footer)    
    var [menu5, setmenu5] = useState({id:null, path: "", title:"", type:""});
    var [menu6, setmenu6] = useState({id:null, path: "", title:"", type:""});
    var [menu7, setmenu7] = useState({id:null, path: "", title:"", type:""});

    var [possuiResultados_programa, setPossuiResultados_programa] = useState(false);

    var [tituloPrograma, setTituloPrograma] = useState("");

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

    useIonViewWillEnter(() => {
        callAxios();
    });

    return (
        <IonPage>
            <IonContent no-padding no-margin margin-left class="grid-bottom">
                <IonGrid class="ion-align-items-center">
                    <IonCol size="12">
                        <IonRow>
                            <IonText color="light" class=" boasvindas">BEM-VINDA</IonText>
                        </IonRow>
                        <IonRow>
                            <IonText color="light" class="pessoa">PESSOA</IonText>
                        </IonRow>
                    </IonCol>
                </IonGrid>

                <IonGrid no-padding no-margin class="grid">
                    <IonRow>
                        { possuiResultados_programa && 
                            <IonCol size="6" class="col">
                                <IonItem onClick={() => props.history.push('/programa')} color="#FFFFFF" class="ion-text-center">
                                <IonGrid>
                                    <IonCol>
                                        <div><IonImg src={menu3.path} class="categoriasLogo menus" /></div>
                                        <div><IonText color="tertiary" >{menu3.title}</IonText></div>
                                    </IonCol>
                                </IonGrid> 
                                </IonItem>
                            </IonCol>
                        }

                        <IonCol size="6" >
                            <IonItem onClick={() => props.history.push('/oradores')} color="#FFFFFF" class="ion-text-center">
                                <IonGrid>
                                    <IonCol>
                                        <div><IonImg src={menu2.path} class="categoriasLogo menus" /></div>
                                        <div><IonText color="tertiary" >{menu2.title}</IonText></div>
                                    </IonCol>
                                </IonGrid> 
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">
                            <IonItem onClick={() => props.history.push('/feiraemprego')} color="#FFFFFF" class="ion-text-center">
                                <IonGrid>
                                    <IonCol>
                                        <div><IonImg src={menu3.path} class="categoriasLogo menus" /></div>
                                        <div><IonText color="tertiary" >{menu3.title}</IonText></div>
                                    </IonCol>
                                </IonGrid>                            
                            </IonItem>
                        </IonCol>

                        <IonCol size="6" >
                            <IonItem onClick={() => props.history.push('/workshop')} color="#FFFFFF" class="ion-text-center">
                                <IonGrid>
                                    <IonCol>
                                        <div><IonImg src={menu4.path} class="categoriasLogo menus" /></div>
                                        <div><IonText color="tertiary" >{menu4.title}</IonText></div>
                                    </IonCol>
                                </IonGrid>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                </IonGrid>

                <IonFooter no-margin no-padding class="footer">
                    <IonGrid no-margin no-padding class="grid">
                        <IonRow no-margin no-padding>
                            <IonCol no-margin no-padding size="4" class="col">
                                <IonItem no-margin no-padding onClick={() => props.history.push('/myagenda')} color="#f" class="ion-text-center footerItems">
                                    <IonGrid>
                                        <IonCol>
                                            <IonImg src={menu5.path} class="subcategoriasLogo" />
                                            <IonText color="medium" class="textFooter">{menu5.title}</IonText>
                                        </IonCol>
                                    </IonGrid>
                                </IonItem>
                            </IonCol>
                            <IonCol size="4" class="col">
                                <IonItem onClick={() => props.history.push('/myagenda')} color="#f" class="ion-text-center footerItems">
                                    <IonGrid>
                                        <IonCol>
                                            <IonImg src={menu6.path} class="subcategoriasLogo" />
                                            <IonText color="medium" class="textFooter">{menu6.title}</IonText>
                                        </IonCol>
                                    </IonGrid>
                                </IonItem>
                            </IonCol>
                            <IonCol size="4" class="col">
                                <IonItem onClick={() => props.history.push('/myagenda')} color="#f" class="ion-text-center footerItems">
                                    <IonGrid>
                                        <IonCol>
                                            <IonImg src={menu7.path} class="subcategoriasLogo" />
                                            <IonText color="medium" class="textFooter">{menu7.title}</IonText>
                                        </IonCol>
                                    </IonGrid>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonFooter>

            </IonContent>
        </IonPage>
    );
};

export default Home;