import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonText } from '@ionic/react';
import React from 'react';

const ComOrganizador: React.FC = () => {
  const titulo = "O que é a CIMEIRA IPVC?";
    const texto1 = "A CIMEIRA do IPVC é um evento INOVADOR, anualmente realizado pelo IPVC, onde "
      + "essencialmente se promove a EDUCAÇÃO e o CONHECIMENTO. Trata-se de um espaço de NETWORKING "
      + "que proporciona a TODOS - estudantes, professores, empresas e empresários, familias - a "
      + "possibilidade de PARTILHA de experiências, saberes e de horizontes, assim como o contacto "
      + "com o tecido empresarial e novos projetos.";
    const frase1 = "É uma celebração GLOBAL, pensada e criada para SI.";
    const frase2 = "Contamos consigo!";

  const subTitulo1 = "Horário";
    const info1 = "Cimeira: das 10:00h às 17:00h";
    const info2 = "Feira de Emprego: das 10:00h às 20:30h";

  const subTitulo2 = "Organização";
    const info3 = "Instituto Politécnico de Viana do Castelo";
    const info4 = "Gabinete de Comunicação e Imagem";
    const info5 = "Serviços de Ação Social do IPVC";
    const info6 = "Federação Académica";

  const subTitulo3 = "Créditos";
    const info7 = "Design Digital APP: Tânia Araújo | GCI";
    const info8 = "Desenvolvimento APP: Henrique Sousa, Benjamim Oliveira, Vasco Alves | ESTG";
    const info9 = "Coordenação Técnica: Prof.ª Sara Paiva";

  // -- Estilos
  const styleGeral = {
    margin:"22px"
  }

  return (
    <IonPage>
      <IonHeader>   
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonButton onClick={() => {window.history.back()}}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Comissão Organizadora</IonTitle>
        </IonToolbar>      
      </IonHeader>
      <IonContent>
      <IonText className="txtCentroCultural">APRESENTAÇÃO</IonText>
        <div style={styleGeral}>

          <div style={{marginBottom:"24px", fontWeight:"bold", fontSize:"20px", color:"#5c5c5c"}}>{titulo}</div>
          <div style={{marginBottom:"18px", fontSize:"14px", color:"#525151"}}>{texto1}</div>
          <div style={{marginBottom:"18px", fontSize:"14px", color:"#525151"}}>{frase1}</div>
          <div style={{marginBottom:"24px", fontSize:"14px", color:"#525151"}}>{frase2}</div>

          <div style={{marginBottom:"6px", fontWeight:"bold", fontSize:"17px", color:"#5c5c5c"}}>{subTitulo1}</div>
          <div style={{marginBottom:"2px", fontSize:"14px", color:"#525151"}}>{info1}</div>
          <div style={{marginBottom:"18px", fontSize:"14px", color:"#525151"}}>{info2}</div>

          <div style={{marginBottom:"6px", fontWeight:"bold", fontSize:"17px", color:"#5c5c5c"}}>{subTitulo2}</div>
          <div style={{marginBottom:"2px", fontSize:"14px", color:"#525151"}}>{info3}</div>
          <div style={{marginBottom:"2px", fontSize:"14px", color:"#525151"}}>{info4}</div>
          <div style={{marginBottom:"2px", fontSize:"14px", color:"#525151"}}>{info5}</div>
          <div style={{marginBottom:"18px", fontSize:"14px", color:"#525151"}}>{info6}</div>

          <div style={{marginBottom:"6px", fontWeight:"bold", fontSize:"17px", color:"#5c5c5c"}}>{subTitulo3}</div>
          <div style={{marginBottom:"2px", fontSize:"14px", color:"#525151"}}>{info7}</div>
          <div style={{marginBottom:"2px", fontSize:"14px", color:"#525151"}}>{info8}</div>
          <div style={{marginBottom:"2px", fontSize:"14px", color:"#525151"}}>{info9}</div>

        </div>
        
      </IonContent>
    </IonPage>
  );
}; 

export default ComOrganizador;
