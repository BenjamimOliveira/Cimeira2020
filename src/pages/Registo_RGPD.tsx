import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol, IonInput, IonItem, IonToast, IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle, IonCheckbox, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const Registo: React.FC = () => {

    const [check_aceite, setCheck_aceite] = useState(false);

    const [toast, setToast] = useState({ state: false, message: "Erro no login" });
    let history = useHistory();

    function submeterFormulario() {
        // -- verirficar checkbox        
        if(check_aceite){

            // -- verificar dados
            if(!localStorage.getItem("dados_registo")){
                // -- sem dados
                setToast({ state: true, message: "Informação em falta! Preencha todos os dados!" });
                history.push("/registo");
                return;
            }
            let dados_registo = JSON.parse(localStorage.getItem("dados_registo") as string);

            if (!dados_registo.email || !dados_registo.password || !dados_registo.nome || !dados_registo.localidade) {
                setToast({ state: true, message: "Erro ao criar a conta: É necessário preencher todos os dados do formulário!" });
                history.push("/registo");
                return;
            }

            axios({
                method: "post",
                url: "http://app.cimeira.ipvc.pt/api/email",
                data: {
                    email: dados_registo.email
                }
            }).then(resultado => {
                if (resultado.data.status === true) {
                    setToast({ state: true, message: "Já existe uma conta com esse email registado. Faça login ou recupere a palavra-passe" });
                    history.push("/login");
                    return;
                } else {
                    axios({
                        method: "post",
                        url: "http://app.cimeira.ipvc.pt/api/registo", // link validar key na db
                        data: {
                            email: dados_registo.email,
                            password: dados_registo.password,
                            nome: dados_registo.nome,
                            localidade: dados_registo.localidade
                        }
                    }).then(resultado => {
                        if(resultado.data.status === true){
                            setToast({state: true, message: "É agora necessário validar a sua conta!"});
                            localStorage.setItem("email_validar_conta", dados_registo.email);
                            history.push("/validarregisto");
                        }
                    }).catch(erro => {
                        console.log("ERRO", erro);
                        setToast({state: true, message: "Ocorreu um erro a confirmar o registo!"});
                    });
                    
                }

            }).catch(erro => {
                console.log("ERRO", erro);
                setToast({ state: true, message: "Ocorreu um erro a verificar se já existe alguma conta com esse email. Por favor, tente registar-se mais tarde" });
                return;
            })
        } else {
            setToast({ state: true, message: "É necessário aceitar o RGPD para continuar com o registo!" });
        }

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
                    <IonTitle className="txtBranco">Aceitar RGPD</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="pagLogin">
                <IonToast isOpen={toast.state} onDidDismiss={() => setToast({ state: false, message: toast.message })} message={toast.message} duration={5000}></IonToast>
                <IonGrid>
                    <IonRow className="ion-justify-content-center ion-align-items-center">
                        <IonCol size-md="6" size-lg="5" size-xs="12" className="marginBottom60">
                            <form style={{textAlign: "center" as "center"}}>
                                <div className="formRGPD">
                                    <div className="ion-margin ion-text-center titulo txtBranco">
                                        <p>TEXTO RGPD</p>
                                    </div>

                                    <IonItem key="Aceitar RGPD" className="semBackgroundforce">
                                        <IonCheckbox className="checkAmarelo" value="Aceitar RGPD" checked={check_aceite} style={{marginRight: "5px"}} onIonChange={(e) => setCheck_aceite(!check_aceite)}/>
                                        <IonLabel>Aceitar RGPD</IonLabel>
                                    </IonItem>
                                </div>

                                <div className="ion-margin btnLogin">
                                    <IonButton type="button" onClick={() => { submeterFormulario() }} size="large" expand="block">CONFIRMAR</IonButton>
                                </div>
                            </form>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Registo;
