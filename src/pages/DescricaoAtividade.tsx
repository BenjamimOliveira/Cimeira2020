import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonBackButton, IonText, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';

interface UserDetailPageProps extends RouteComponentProps<{
  id: string;
}> {}

const Atividade: React.FC<UserDetailPageProps> = ({match}) => {

  const [ possuiResultados, setPossuiResultados ] = useState(false);
  const [atividade, setAtividade ] = useState({atividade: "", categoria: {}, categoria_id: null, descricao: "", duracao: "", hora: "", id: null, local: "", moderador: null});
  const [ txtTitulo, setTxtTitulo ] = useState("A carregar atividade...");

  useIonViewWillEnter(() => {
    // -- obter lista de categorias
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/atividade_detalhes/" + match.params.id
    }).then(resultado => {        
        setPossuiResultados(true);
        setAtividade(resultado.data);
        setTxtTitulo((resultado.data.categoria.categoria).toLowerCase().charAt(0).toUpperCase() + (resultado.data.categoria.categoria).toLowerCase().slice(1));
        console.log(resultado)
    }).catch(erro => {
        console.log("ERRO", erro);
    })
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbarSemTransparencia">
          <IonButtons slot="start" >
            <IonBackButton defaultHref="/programa" className="txtBranco"/>
          </IonButtons>
          <IonTitle>{txtTitulo}</IonTitle>
          <IonButtons slot="end">
            <IonButton expand="block">
              <IonIcon slot="icon-only"className="txtBranco shareIcon"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="backgroundBranco">
        { possuiResultados &&
          <IonText className="txtCentroCultural">{atividade.local.toUpperCase()}</IonText>
        }
        { !possuiResultados &&
          <div style={{height: "95%", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", color: "#9b9b9b"}}>
            <IonText>A carregar informações da atividade</IonText>
          </div>
        }
        { possuiResultados === true &&
          <div className="areaInformacao" style={{padding: "8px 16px", marginTop: "10px"}}>
            <div>
              <IonText style={{fontSize: "26px", color: "#4a4a4a", fontWeight: "bold", marginBottom: 0, paddingBottom: 0, lineHeight: "0px"}}><p>{atividade.atividade}</p></IonText>
              <IonText style={{fontSize: "12px", color: "#757575", marginTop: 0, paddingTop: 0}}><p>{atividade.atividade}</p></IonText>
            </div>

          </div>
        }
      </IonContent>
    </IonPage>
  );
};

export default Atividade;
