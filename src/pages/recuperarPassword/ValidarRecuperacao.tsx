import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol, IonInput, IonItem, IonToast, IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const ValidarRecuperacao: React.FC = () => {
    const [toast, setToast] = useState({state: false, message: "Erro no login"});
    const [ chave, setChave ] = useState();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    let history = useHistory();

    useIonViewWillEnter(() => {
        if(!localStorage.getItem("email_recuperar_conta") || localStorage.getItem("email_recuperar_conta") == "undefined"){
            setToast({state: true, message: "Erro ao iniciar a validação da recuperação de palavra-passe!"});
            history.push("/login");
            return; 
        }
    })

    function submeterFormulario(e: any) {
        let email = localStorage.getItem("email_recuperar_conta");

        if(!email || !password || !passwordConfirm){
            setToast({state: true, message: "Erro ao recuperar palavra-passe: Dados em falta!"});
            return;
        }

        // -- validar email
        // eslint-disable-next-line
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)) {
            setToast({state: true, message: "Erro a recuperar palavra-passe: O Endereço de Email não é válido!"});
            return;
        }

        if(!chave){
            setToast({state: true, message: "Erro a recuperar palavra-passe: É necessário introduzir a chave de recuperação!"});
            return;
        }

        if (password !== passwordConfirm) {
            setToast({ state: true, message: "Erro a recuperar palavra-passe: A nova palavra-passe e a confirmação da mesma não coincidem!" });
            return;
        }

        
        if (!(password.length > 5)) {
            setToast({ state: true, message: "Erro a recuperar palavra-passe: A nova palavra-passe deve ter, no mínimo, 6 carateres!" });
            return;
        }


        /*axios({
            method: "post",
            url: "http://app.cimeira.ipvc.pt/api/validar",
            data: {
                email: email,
                cod_validacao: chave
            }
        }).then(resultado => {
            if(resultado.data.status === true){
                // chave validada
                setToast({state: true, message: "A sua chave foi validada com sucesso! Realize agora o login"});
                
                history.push("/login");
            } else {
                setToast({state: true, message: "Chave de validação incorreta!"});
            }
            
        }).catch(erro => {
            console.log("ERRO", erro);
            setToast({state: true, message: "Ocorreu um erro a validar a conta. Por favor, tente mais tarde"});
        });*/

    } 

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar className="toolbar toolbarComTransparencia">
                    <IonButtons slot="start">
                        <IonButton expand="block" routerLink="/login" routerDirection="root">
                            <IonIcon slot="icon-only" name="close" />
                        </IonButton>
                    </IonButtons>

                    <IonTitle className="txtBranco">Recuperar Palavra-Passe</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="pagLogin bckImg">
                <IonToast isOpen={toast.state} onDidDismiss={() => setToast({state: false, message: toast.message})} message={toast.message} duration={3000}></IonToast>
                <IonGrid>
                    <IonRow className="ion-justify-content-center ion-align-items-center">
                        <IonCol size-md="6" size-lg="5" size-xs="12" className="marginBottom60">
                            <form method="POST" action="#">
                                <div className="loginForm">
                                    <div className="ion-margin ion-text-center titulo txtBranco">
                                        <p><b>Foi enviada uma chave de recuperação para o seu endereço de email. Por favor, introduza-a:</b></p>
                                    </div>
                                    <IonItem className="ion-margin">
                                        <IonInput autocomplete="off" required type="text" value={chave} onInput={(e) => setChave((e.target as HTMLInputElement).value)} placeholder="Chave de Recuperação" inputmode="text"></IonInput>
                                    </IonItem>

                                    <br></br>
                                    <div className="ion-margin ion-text-center titulo txtBranco">
                                        <p><b>Introduza a nova palavra-passe:</b></p>
                                    </div>
                                    <IonItem className="ion-margin">
                                        <IonInput autocomplete="off" required minlength={6} type="password" value={password} onInput={(e) => { setPassword((e.target as HTMLInputElement).value); }} placeholder="Palavra-Passe" pattern="password"></IonInput>
                                    </IonItem>

                                    <IonItem className="ion-margin">
                                        <IonInput autocomplete="off" required minlength={6} type="password" value={passwordConfirm} onInput={(e) => { setPasswordConfirm((e.target as HTMLInputElement).value); }} placeholder="Confirmar Palavra-Passe" pattern="password"></IonInput>
                                    </IonItem>
                                </div>

                                <div className="ion-margin btnLogin">
                                    <IonButton type="button" onClick={(e) => {submeterFormulario(e)}} size="large" expand="block">VALIDAR</IonButton>
                                </div>
                            </form>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ValidarRecuperacao;
