import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol, IonInput, IonItem, IonToast, IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle } from '@ionic/react';
import React, { useState } from 'react';
import crypto from 'crypto';
import axios from "axios";
import { useHistory } from "react-router-dom";

const Registo: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [localidade, setLocalidade] = useState("");
    const [nome, setNome] = useState("");

    const [toast, setToast] = useState({ state: false, message: "Erro no login" });
    let history = useHistory();

    function submeterFormulario() {
        if (password !== passwordConfirm) {
            setToast({ state: true, message: "Erro ao criar a conta: A palavra-passe e a confirmação da mesma não coincidem!" });
            return;
        }

        if (!email || !password || !nome || !passwordConfirm) {
            setToast({ state: true, message: "Erro ao criar a conta: É necessário preencher todos os dados do formulário!" });
            return;
        }

        if (!(password.length > 5)) {
            setToast({ state: true, message: "Erro ao criar a conta: A palavra-passe deve ter, no mínimo, 6 carateres!" });
            return;
        }

        // -- validar email
        // eslint-disable-next-line
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            setToast({ state: true, message: "Erro a realizar o login: O Endereço de Email não é válido!" });
            return;
        }

        // -- validar password (tamanho minimo)
        if (!(password.length >= 6)) {
            setToast({ state: true, message: "Erro a realizar o login: A palavra-passe dada é muito curta! São necessários no mínimo 6 catacteres!" });
            return;
        }

        const hash = crypto.createHash('sha256');
        let strSalt = "CIMEIRAIPVC2020"; // devia de ser colocado na base de dados
        hash.update(strSalt + password);

        axios({
            method: "post",
            url: "http://app.cimeira.ipvc.pt/api/email",
            data: {
                email: email
            }
        }).then(resultado => {
            if (resultado.data.status === true) {
                setToast({ state: true, message: "Já existe uma conta com esse email registado. Faça login ou recupere a palavra-passe" });
                history.replace("/login");
                return;
            } else {
                // -- passar para página aceitar rgpd
                setToast({state: true, message: "É agora necessário aceitar o RGPD! A sua conta apenas será registada após confirmar"});
                let dados_registo = {
                    email: email,
                    password: hash.digest("hex"),
                    nome: nome,
                    localidade: localidade
                }
                localStorage.setItem("dados_registo", JSON.stringify(dados_registo));

                history.replace("/selecionar_perfis_conta");
            }
        }).catch(erro => {
            console.log("ERRO", erro);
            setToast({ state: true, message: "Ocorreu um erro a verificar se já existe alguma conta com esse email. Por favor, tente registar-se mais tarde" });
            return;
        })

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
            <IonContent fullscreen className="pagLogin bckImg">
                <IonToast isOpen={toast.state} onDidDismiss={() => setToast({ state: false, message: toast.message })} message={toast.message} duration={5000}></IonToast>
                <IonGrid>
                    <IonRow className="ion-justify-content-center ion-align-items-center">
                        <IonCol size-md="6" size-lg="5" size-xs="12" className="marginBottom60">
                            <form method="POST" action="#">
                                <div className="loginForm">
                                    <IonItem className="ion-margin">
                                        <IonInput autocomplete="off" required type="text" value={nome} onInput={(e) => setNome((e.target as HTMLInputElement).value)} placeholder="Nome Completo" inputmode="text"></IonInput>
                                    </IonItem>

                                    <IonItem className="ion-margin">
                                        <IonInput autocomplete="off" required type="email" value={email} onInput={(e) => setEmail((e.target as HTMLInputElement).value)} placeholder="Endereço de email" pattern="email" inputmode="email"></IonInput>
                                    </IonItem>

                                    <IonItem className="ion-margin">
                                        <IonInput autocomplete="off" required type="text" value={localidade} onInput={(e) => setLocalidade((e.target as HTMLInputElement).value)} placeholder="Localidade" inputmode="text"></IonInput>
                                    </IonItem>

                                    <IonItem className="ion-margin">
                                        <IonInput autocomplete="off" required minlength={6} type="password" value={password} onInput={(e) => { setPassword((e.target as HTMLInputElement).value); }} placeholder="Palavra-Passe" pattern="password"></IonInput>
                                    </IonItem>

                                    <IonItem className="ion-margin">
                                        <IonInput autocomplete="off" required minlength={6} type="password" value={passwordConfirm} onInput={(e) => { setPasswordConfirm((e.target as HTMLInputElement).value); }} placeholder="Confirmar Palavra-Passe" pattern="password"></IonInput>
                                    </IonItem>
                                </div>

                                <div className="ion-margin btnLogin">
                                    <IonButton type="button" onClick={(e) => { submeterFormulario() }} size="large" expand="block">CRIAR CONTA</IonButton>
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

export default Registo;
