import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol, IonInput, IonItem, IonToast, IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle, IonCheckbox, IonLabel, IonRadioGroup, IonRadio } from '@ionic/react';
import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const Registo: React.FC = () => {

    const [check_aceite2, setCheck_aceite2] = useState("aceite");

    const [toast, setToast] = useState({ state: false, message: "Erro no login" });
    let history = useHistory();

    function submeterFormulario() {
        // -- verirficar checkbox     
             
        if(check_aceite2 == "aceite"){

            // -- verificar dados
            if(!localStorage.getItem("dados_registo")){
                // -- sem dados
                setToast({ state: true, message: "Informação em falta! Preencha todos os dados!" });
                history.replace("/registo");
                return;
            }
            let dados_registo = JSON.parse(localStorage.getItem("dados_registo") as string);

            if (!dados_registo.email || !dados_registo.password || !dados_registo.nome || !dados_registo.localidade) {
                setToast({ state: true, message: "Erro ao criar a conta: É necessário preencher todos os dados do formulário!" });
                history.replace("/registo");
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
                    history.replace("/login");
                    return;
                } else {
                    axios({
                        method: "post",
                        url: "http://app.cimeira.ipvc.pt/api/registo", // link validar key na db
                        data: {
                            email: dados_registo.email,
                            password: dados_registo.password,
                            nome: dados_registo.nome,
                            localidade: dados_registo.localidade,
                            perfil_1: dados_registo.perfil_1,
                            perfil_2: dados_registo.perfil_2,
                            perfil_3: dados_registo.perfil_3
                        }
                    }).then(resultado => {
                        if(resultado.data.status === true){
                            setToast({state: true, message: "É agora necessário validar a sua conta!"});
                            localStorage.setItem("email_validar_conta", dados_registo.email);
                            localStorage.removeItem("dados_registo");
                            history.replace("/validarregisto");
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
                        <IonButton expand="block" onClick={() => {history.replace("/login");}}>
                            <IonIcon slot="icon-only" name="close" />
                        </IonButton>
                    </IonButtons>
                    <IonTitle className="txtBranco">Aceitar RGPD</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="pagLogin bckImg">
                <IonToast isOpen={toast.state} onDidDismiss={() => setToast({ state: false, message: toast.message })} message={toast.message} duration={5000}></IonToast>
                <IonGrid>
                    <IonRow className="ion-justify-content-center ion-align-items-center">
                        <IonCol size-md="6" size-lg="5" size-xs="12" className="marginBottom60">
                            <form style={{textAlign: "center" as "center"}}>
                                <div className="formRGPD">
                                    <div className="ion-margin ion-text-center titulo txtBranco" style={{marginTop: "10%", fontWeight: "bold"}}>
                                        <p style={{textAlign: "justify", textJustify: "inter-word"}}>Os dados pessoais (nomeadamente nome, email e localidade) solicitados neste registo, serão apenas utilizados pelo Instituto Politécnico de Viana do Castelo para gerir a sua participação e proporcionar-lhe a melhor experiência no evento CIMEIRA IPVC 2020. No final do evento CIMEIRA IPVC 2020 estes dados serão utilizados para gerar os certificados de participação. Após o evento CIMEIRA IPVC 2020, os dados serão mantidos unicamente para fins de tratamento estatístico pelo Gabinete de Comunicação e Imagem do Instituto Politécnico de Viana do Castelo.</p>
                                    </div>
                                    <IonRadioGroup value={check_aceite2} onIonChange={(e) => {setCheck_aceite2(e.detail.value)}}>
                                        <IonItem className="semBackgroundforce" text-warp>
                                                <IonRadio className="checkAmarelo" value="aceite" style={{marginRight: "5px", minWidth: "20px"}}/>
                                                
                                                Sim, aceito os termos de utilização dos dados pessoais para os efeitos requeridos
                                        </IonItem>

                                        <IonItem className="semBackgroundforce" text-warp>
                                                <IonRadio className="checkAmarelo" value="nao" style={{marginRight: "5px", minWidth: "20px"}}/>
                                                
                                                Não, não aceito os termos de utilização dos dados pessoais para os efeitos requeridos
                                        </IonItem>
                                    </IonRadioGroup>

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
