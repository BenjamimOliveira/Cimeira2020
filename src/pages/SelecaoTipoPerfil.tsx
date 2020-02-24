import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol, IonItem, IonToast, IonCheckbox, IonLabel, IonList, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const SelecaoTipoPerfil: React.FC = () => {
    const perfis = [
        { id: 1, txt: "Aluno (a)", selecionado: false },
        { id: 2, txt: "Docente", selecionado: false },
        { id: 3, txt: "Empresa Inscrita", selecionado: false },
        { id: 4, txt: "Orador (a) / Palestrante", selecionado: false },
        { id: 5, txt: "Organização", selecionado: false },
        { id: 6, txt: "Visitante", selecionado: false, sub: [
            {id_sub: 61, txt: "Empresa", selecionado: false},
            {id_sub: 62, txt: "Pessoa Singular", selecionado: false}
        ]},
        { id: 7, txt: "Voluntário (a)", selecionado: false }
    ]

    let history = useHistory();
    const [toast, setToast] = useState({ state: false, message: "" });

    useIonViewWillEnter(() => {
        if(!localStorage.getItem("dados_registo") || localStorage.getItem("dados_registo") == "undefined"){
            history.replace("/login");
        }
    });

    function submeterFormulario() {
        let contagem = 0;
        let selecionados:any = [];
        perfis.forEach((perfil: any) => {
            if(perfil.selecionado){
                contagem++;
                selecionados.push(perfil.id);
            }
        });

        console.log(selecionados);
        

        let dados_registo = JSON.parse(localStorage.getItem("dados_registo") as string);

        if(contagem > 3) {
            setToast({ state: true, message: "Apenas pode selecionar 3 tipos de perfil diferentes!" });
            return;
        }

        if(contagem == 0){
            setToast({ state: true, message: "Deve selecionar pelo menos 1 tipo de perfil! Máximo: 3 tipos" });
            return;
        }

        if(selecionados[0] != "undefined"){
            dados_registo.perfil_1 = selecionados[0];
        }

        if(selecionados[1] != "undefined"){
            dados_registo.perfil_2 = selecionados[1];
        }

        if(selecionados[2] != "undefined"){
            dados_registo.perfil_3 = selecionados[2];
        }

        localStorage.setItem("dados_registo", JSON.stringify(dados_registo));
        history.push("/registo_aceitar_rgpd");
    }

    function alteraCheckPrincipal(perfil: any){
        document.getElementById("subarea_" + perfil.id)!.style.transition = "1s";
        if(perfil.selecionado)
            document.getElementById("subarea_" + perfil.id)!.style.display = "block";
        else
            document.getElementById("subarea_" + perfil.id)!.style.display = "none";
    }

    useIonViewDidEnter(() => {
    });

    return (
        <IonPage><IonToast isOpen={true} message="Selecione os perfis que pretende! Pode selecionar, no máximo, 3 tipos diferentes" duration={5000}></IonToast>
            <IonContent fullscreen className="pagLogin bckImg">
                <IonToast isOpen={toast.state} onDidDismiss={(e) => {setToast({ state: false, message: toast.message });}} message={toast.message} duration={5000}></IonToast>
                <IonGrid>
                    <IonRow className="ion-justify-content-center ion-align-items-center">
                        <IonCol size-md="6" size-lg="5" size-xs="12" className="marginBottom60">
                            <form style={{textAlign: "center" as "center"}}>
                                <div className="formRGPD">
                                    <div className="ion-margin ion-text-center titulo txtAmarelo" style={{fontSize: "20px", paddingTop: "20%"}}>
                                        <p style={{width: "70%", margin: "0 auto"}}>Selecione o seu perfil de utilizador:</p>
                                    </div>
                                    <IonList className="semBackgroundforce" style={{background: "transparent"}}>
                                        {perfis.map((perfil) => (
                                        <div key={perfil.txt}>
                                            <IonItem className="semBackgroundforce">
                                                <IonCheckbox className="checkAmarelo" value={perfil.txt} checked={perfil.selecionado} style={{marginRight: "5px"}} onIonChange={() => {perfil.selecionado = !perfil.selecionado; alteraCheckPrincipal(perfil)}}/>
                                                <IonLabel>{perfil.txt}</IonLabel>
                                            </IonItem>
                                            <div id={"subarea_" + perfil.id} style={{display: "none"}}>
                                                {perfil.sub && perfil.sub.map((subperfil) => (
                                                    <IonItem key={"sub" + perfil.txt + subperfil.txt} className="semBackgroundforce">
                                                        <IonCheckbox className="checkSub" value={"sub" + perfil.txt + subperfil.txt} checked={subperfil.selecionado} style={{marginRight: "5px"}} onIonChange={() => {subperfil.selecionado = !subperfil.selecionado}}/>
                                                        <IonLabel>{subperfil.txt}</IonLabel>
                                                    </IonItem>
                                                ))}
                                            </div>
                                        </div>
                                        ))}
                                    </IonList>
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

export default SelecaoTipoPerfil;
