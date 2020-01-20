import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol, IonInput, IonItem, IonToast, IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle } from '@ionic/react';
import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const ValidarRegisto: React.FC = () => {
    const [toast, setToast] = useState({state: false, message: "Erro no login"});
    const [ chave, setChave ] = useState();
    let history = useHistory();

    function submeterFormulario(e: any) {
        let email = localStorage.getItem("email_validar_conta");

        if(!email){
            setToast({state: true, message: "Erro ao validar a conta: Dados em falta!"});
            return;
        }

        // -- validar email
        // eslint-disable-next-line
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)) {
            setToast({state: true, message: "Erro a validar conta: O Endereço de Email não é válido!"});
            return;
        }

        // -- validar password (tamanho minimo)
        if(!chave){
            setToast({state: true, message: "Erro a validar a conta: É necessário introduzir a chave de validação!"});
            return;
        }


        axios({
            method: "post",
            url: "http://app.cimeira.ipvc.pt/api/validar",
            data: {
                email: email,
                cod_validacao: chave
            }
        }).then(resultado => {
            if(resultado.data.status === true){
                // chave validada
                setToast({state: true, message: "A sua chave foi validada com sucesso! Realize agora login"});
                
                history.push("/login");
            } else {
                setToast({state: true, message: "Chave de validação incorreta!"});
            }
            
        }).catch(erro => {
            console.log("ERRO", erro);
            setToast({state: true, message: "Ocorreu um erro a validar a conta. Por favor, tente mais tarde"});
        });

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

                    <IonTitle className="txtBranco">Criar Conta</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="pagLogin">
                <IonToast isOpen={toast.state} onDidDismiss={() => setToast({state: false, message: toast.message})} message={toast.message} duration={3000}></IonToast>
                <IonGrid>
                    <IonRow className="ion-justify-content-center ion-align-items-center">
                        <IonCol size-md="6" size-lg="5" size-xs="12" className="marginBottom60">
                            <form method="POST" action="#">
                                <div className="loginForm">
                                    
                                    <div className="ion-margin ion-text-center titulo txtBranco">
                                        <p><b>Foi enviada uma chave de validação para o seu endereço de email. Por favor, introduza-a:</b></p>
                                    </div>
                                    <IonItem className="ion-margin">
                                        <IonInput autocomplete="off" required type="text" value={chave} onInput={(e) => setChave((e.target as HTMLInputElement).value)} placeholder="Chave de Validação" inputmode="text"></IonInput>
                                    </IonItem>
                                </div>

                                <div className="ion-margin btnLogin">
                                    <IonButton type="button" onClick={(e) => {submeterFormulario(e)}} size="large" expand="block">VALIDAR</IonButton>
                                </div>
                            </form>
                            <div className="ion-margin ion-text-center titulo txtBranco">
                                <p>Criando uma conta concorda com os Termos de Utilização.</p>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ValidarRegisto;
