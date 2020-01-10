import { IonContent, IonPage, IonRow, IonCol, IonGrid, IonItem, IonImg, IonText, IonFooter, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
//{"id":"1","path":"http:\/\/app.cimeira.ipvc.pt\/files\/icon_programa.png","title":"PROGRAMA","type":"p"}
// http://app.cimeira.ipvc.pt/api/main/1

const URL = 'http://app.cimeira.ipvc.pt/api/main/1';

const Home: React.FC<RouteComponentProps> = (props) => {
    var [opcoes, setOpcoes] = useState({id:null, path: "", title:""});

    var [possuiResultados_programa, setPossuiResultados_programa] = useState(false);

    // eslint-disable-next-line
    var [tituloPrograma, setTituloPrograma] = useState("");

    //opcoes = {"id":"12","path":"http:\/\/app.cimeira.ipvc.pt\/files\/icon_programa.png","title":"PROGRAMA","type":"p"};

    useIonViewWillEnter(() => {
        axios({
            method: "get",
            url: URL
        }).then(resultado => {
            console.log(resultado);
            setOpcoes(resultado.data);
            setTituloPrograma(resultado.data.title);
            setPossuiResultados_programa(true);
        }).catch(erro => {
            console.log("ERRO => ", erro);
        })
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

                <IonGrid class="grid">
                    <IonRow>
                        { possuiResultados_programa && 
                            <IonCol size="6" class="col">
                                <IonItem onClick={() => props.history.push('/programa')} color="#FFFFFF" class="ion-text-center menus">
                                    <div>
                                        <IonImg src='http:\/\/app.cimeira.ipvc.pt\/files\/icon_programa.png' class="categoriasLogo menus" />
                                        <IonText color="tertiary">{opcoes.title}</IonText>
                                        {/* <IonText color="tertiary">{tituloPrograma}</IonText> */}
                                    </div>
                                </IonItem>
                            </IonCol>
                        }

                        <IonCol size="6" >
                            <IonItem onClick={() => props.history.push('/oradores')} color="#FFFFFF" class="ion-text-center">
                                <div>
                                    <IonImg src='http:\/\/app.cimeira.ipvc.pt\/files\/icon_oradores.png' class="categoriasLogo" />
                                    <IonText color="tertiary">ORADORES</IonText>
                                </div>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">
                            <IonItem onClick={() => props.history.push('/feiraemprego')} color="#FFFFFF" class="ion-text-center menus">
                                <div>
                                    <IonImg src='http:\/\/app.cimeira.ipvc.pt\/files\/icon_workshops.png' class="categoriasLogo" />
                                    <IonText color="tertiary">FEIRA EMPREGO</IonText>
                                </div>
                            </IonItem>
                        </IonCol>

                        <IonCol size="6" >
                            <IonItem onClick={() => props.history.push('/workshop')} color="#FFFFFF" class="ion-text-center">
                                <div>
                                    <IonImg src='http:\/\/app.cimeira.ipvc.pt\/files\/logo_Cimeira.png' class="categoriasLogo" />
                                    <IonText color="tertiary">WORKSHOPS</IonText>
                                </div>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                </IonGrid>

                <IonFooter class="footer">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="4" class="col">
                                <IonItem onClick={() => props.history.push('/myagenda')} color="#f" class="ion-text-center footerItems">
                                    <IonGrid>
                                        <IonCol>
                                            <IonImg src='https://image.flaticon.com/icons/png/512/2312/2312137.png' class="subcategoriasLogo" />
                                            <IonText color="medium">MyAgea</IonText>
                                        </IonCol>
                                    </IonGrid>
                                </IonItem>
                            </IonCol>
                            <IonCol size="4" class="col">
                                <IonItem onClick={() => props.history.push('/myagenda')} color="#f" class="ion-text-center footerItems">
                                    <IonGrid>
                                        <IonCol>
                                            <IonImg src='https://image.flaticon.com/icons/png/512/2312/2312137.png' class="subcategoriasLogo" />
                                            <IonText color="medium">MyAgea</IonText>
                                        </IonCol>
                                    </IonGrid>
                                </IonItem>
                            </IonCol>
                            <IonCol size="4" class="col">
                                <IonItem onClick={() => props.history.push('/myagenda')} color="#f" class="ion-text-center footerItems">
                                    <IonGrid>
                                        <IonCol>
                                            <IonImg src='https://image.flaticon.com/icons/png/512/2312/2312137.png' class="subcategoriasLogo" />
                                            <IonText color="medium">MyAgea</IonText>
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