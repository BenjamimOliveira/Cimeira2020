import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol, IonInput, IonItem, IonToast, IonRouterLink, useIonViewDidEnter, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import crypto from 'crypto';
import axios from "axios";
import { useHistory } from "react-router-dom";


const Login: React.FC = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [toast, setToast] = useState({state: false, message: "Erro no login"});
    let history = useHistory();

    
    const [mostrarAlertaSemLigacao, setErroSemLigacao] = useState(false);

    useIonViewDidEnter(() => {
        if(localStorage.getItem("email_validar_conta") != null){
            setEmail(localStorage.getItem("email_validar_conta") as string);
            localStorage.removeItem("email_validar_conta")
        }

        if(localStorage.getItem("UtilizadorID") && localStorage.getItem("UtilizadorLogin") && localStorage.getItem("UtilizadorID") != "undefined" && localStorage.getItem("UtilizadorLogin") != "undefined"){
            // login feito -- redirecionar para home
            history.replace("/home");
        } else {
            localStorage.removeItem("UtilizadorID")
            localStorage.removeItem("UtilizadorLogin")
        }
    });

    function submeterFormulario(e: any) {
        if(!email || !password){
            setToast({state: true, message: "Erro a realizar o login: Endereço de Email e/ou Palavra-Passe em falta!"});
            return;
        }

        // -- validar email
        // eslint-disable-next-line
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)) {
            setToast({state: true, message: "Erro a realizar o login: O Endereço de Email não é válido!"});
            return;
        }

        // -- validar password (tamanho minimo)
        if(!(password.length >= 6)) {
            setToast({state: true, message: "Erro a realizar o login: A palavra-passe dada é muito curta! São necessários no mínimo 6 catacteres!"});
            return;
        }

        const hash = crypto.createHash('sha256');
        let strSalt = "CIMEIRAIPVC2020"; // devia de ser colocado na base de dados
        hash.update(strSalt + password);

        axios({
            method: "post",
            url: "http://app.cimeira.ipvc.pt/api/login",
            data: {
                password: hash.digest("hex"),
                email: email
            }
        }).then(resultado => {
            console.log(resultado);
            if(resultado.data.cod === 6){
                setToast({state: true, message: "Login realizado com sucesso!"});
                localStorage.setItem("UtilizadorLogin", resultado.data.message.nome);
                localStorage.setItem("UtilizadorID", resultado.data.message.id);

                // -- VERIFICAR PERFIS

                history.replace("/home");
            } else if(resultado.data.cod === 4){
                setToast({state: true, message: "Ainda é necessário validar esta conta! Obtenha a chave de validação no seu email."});
                localStorage.setItem("email_validar_conta", email);
                history.push("/validarregisto");
            } else {
                setToast({state: true, message: "A combinação email/palavra-passe não existe!"});
            }
        }).catch(erro => {
            console.log("ERRO", JSON.stringify(erro), erro.message);
            if(erro.message == "Network Error"){
                setErroSemLigacao(true);
            }
            setToast({state: true, message: "Ocorreu um erro a realizar o login!"});
        }); 
    }

    return (
        <IonPage>
            <IonAlert
                isOpen={mostrarAlertaSemLigacao}
                onDidDismiss={() => setErroSemLigacao(false)}
                header={''}
                subHeader={'Atenção'}
                message={'É necessária uma ligação à internet para utilizar esta aplicação!'}
                buttons={['OK']}
                />
            <IonContent fullscreen className="pagLogin bckImg_force">
                <IonToast isOpen={toast.state} onDidDismiss={() => setToast({state: false, message: toast.message})} message={toast.message} duration={3000}></IonToast>
                <IonGrid>
                    <IonRow className="ion-justify-content-center ion-align-items-center">
                        <IonCol size-md="6" size-lg="5" size-xs="12">
                            <div className="ion-text-center titulo txtBranco marginBottom100px">
                                <h1><b>BEM-VINDO</b></h1>
                                <h5><b>À CIMEIRA IPVC</b></h5>
                            </div>
                            <form method="POST" action="#">
                                <div className="loginForm">
                                    <IonItem className="ion-margin">
                                        <IonInput autocomplete="off" required type="email" value={email} onInput={(e) => setEmail((e.target as HTMLInputElement).value)} placeholder="Endereço de email" pattern="email" inputmode="email"></IonInput>
                                    </IonItem>

                                    <IonItem className="ion-margin">
                                        <IonInput autocomplete="off" required minlength={6} type="password" value={password} onInput={(e) => setPassword((e.target as HTMLInputElement).value)} placeholder="Palavra-Passe" pattern="password"></IonInput>
                                    </IonItem>
                                </div>

                                <div className="ion-margin btnLogin">
                                    <IonButton type="button" onClick={(e) => {submeterFormulario(e)}} size="large" expand="block">Login</IonButton>
                                </div>
                            </form>
                            <div className="ion-margin ion-text-center titulo txtBranco">
                                <IonRouterLink routerLink="/recuperar_pass_email" routerDirection="root" className="txtBranco">
                                    <p><b>Esqueceu-se da Password?</b></p>
                                </IonRouterLink>
                            </div>

                            <div className="marginTop200px ion-text-center titulo">
                                <IonRouterLink routerLink="/registo" routerDirection="root" className="txtAmarelo">
                                    <p><b>Ainda não tem conta criada?</b></p>
                                </IonRouterLink>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;
