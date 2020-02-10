import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonText, useIonViewWillEnter, IonAvatar, IonImg, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import { CallNumber } from "@ionic-native/call-number";

interface PageProps extends RouteComponentProps<{
  id: string;
}> {}

const DescricaoEmpresa: React.FC<PageProps> = ({match}) => {

  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [ empresa, setEmpresa ] = useState({id: 0, local: "", nome: "", logo: "", localizacao_empresa: "", area_empresa: "", representante_empresa: "", contacto_representante: "", palco_central: ""});
  const [ txtTitulo, setTxtTitulo ] = useState("A carregar informação...");

  useIonViewWillEnter(() => {
    // -- obter info empresa
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/empresa/" + match.params.id
    }).then(resultado => {        
        setPossuiResultados(true);
        setEmpresa(resultado.data[0]);
        setTxtTitulo(resultado.data[0].nome);
    }).catch(erro => {
        console.log("ERRO", erro);
    })
  });

  function Call() {
    CallNumber.callNumber(empresa.contacto_representante, true);
  }

  const stl_area_info = {
    backgroundColor: "#d5d5d5",
    padding: "30px 10px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column" as "column",
    alignItems: "center"

  }

  const styl_avatar = {
    maxWidth: "180px", 
    minWidth: "180px", 
    height: "180px",  
    maxHeight: "180px",
    margin: "15px 0"
  }

  const txt_nome = {
    fontWeight: "bold" as "bold",
    color: "#474747",
    margin: 0,
    marginBottom: "3px",
    fontSize: "20px"
  }

  const subLinha = {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "#6f6b66"
  }

  const linha_info = {
    margin: "20px 0",
    display: "flex",
    alignItems: "center",
    flexDirection: "column" as "column"
  }


  const linha_contacto = {
    margin: "20px 10px 0 10px",
    display: "flex",
    flexDirection: "column" as "column"
  }

  const txt_nome_representante = {
    color: "#474747",
    margin: 0,
    marginBottom: "3px",
    fontSize: "20px"
  }

  const icon = {
    minWidth: "24px", 
    minHeight: "24px", 
    cursor: "pointer",
    margin: "10px",
    backgroundColor: "#474747"
  }

  const placeholder_icon = {
    minWidth: "24px", 
    minHeight: "24px", 
    cursor: "pointer",
    margin: "10px",
    backgroundColor: "transparent"
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbarSemTransparencia">
          <IonButtons slot="start" >
            <IonButton onClick={() => {window.history.back()}}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>{txtTitulo}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="backgroundBranco">
        { !possuiResultados &&
          <div style={{height: "95%", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", color: "#9b9b9b"}}>
            <IonText>A carregar informações da empresa</IonText>
          </div>
        }
        { possuiResultados === true &&
        <div>
          <div className="areaInformacao" style={stl_area_info}>
            <IonAvatar style={styl_avatar}>
              <IonImg src={empresa.logo} />
            </IonAvatar>
            <div style={linha_info}>
              <p style={txt_nome}>{empresa.nome}</p>
              <div style={subLinha}>
                <IonIcon className="pinIcon" style={{ backgroundColor: "#A61526", fontSize: "24px", minWidth: "24px" }}></IonIcon>
                {empresa.localizacao_empresa}
              </div>
            </div>
            <div style={linha_info}>
              <p style={txt_nome}>ÁREA</p>
              <div style={subLinha}>
                {empresa.area_empresa}
              </div>
            </div>
          </div>

          <div style={linha_contacto}>
            <div style={{display: "flex", justifyContent: "space-beteen"}} onClick={() => Call()}>
              <p style={placeholder_icon}/>
              <div style={{marginLeft: "20px"}}>
                <p style={txt_nome_representante}>{empresa.representante_empresa}</p>
                <div style={subLinha}>Representante da Empresa</div>
              </div>
            </div>
          </div>
          <hr />
          <div style={linha_contacto}>
            <div style={{display: "flex", justifyContent: "space-between"}} onClick={() => Call()}>
              <div style={{display: "flex"}}>
                <IonIcon className="callIcon" style={icon}/>
                <div style={{marginLeft: "20px"}}>
                  <p style={txt_nome_representante}>{empresa.contacto_representante}</p>
                  <div style={subLinha}>Contacto</div>
                </div>
              </div>
              <IonIcon className="mailIcon" style={icon}/>
            </div>
          </div>
        </div>
          
        }
      </IonContent>
    </IonPage>
  );
};

export default DescricaoEmpresa;
