import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonImg } from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Perfil: React.FC = () => {
  var nome = localStorage.getItem("UtilizadorLogin");
  var email = localStorage.getItem("UtilizadorEmail");
  var localidade = localStorage.getItem("UtilizadorLocalidade");
  var perfil1 = localStorage.getItem("UtilizadorPerfil1") + "";
  var perfil2 = localStorage.getItem("UtilizadorPerfil2") + "";
  var perfil3 = localStorage.getItem("UtilizadorPerfil3") + "";
  var id = localStorage.getItem("UtilizadorID");

  function perfil() {
    /**{ id: 1, txt: "Aluno (a)", selecionado: false },
        { id: 2, txt: "Docente", selecionado: false },
        { id: 3, txt: "Empresa Inscrita", selecionado: false },
        { id: 4, txt: "Orador (a) / Palestrante", selecionado: false },
        { id: 5, txt: "Organização", selecionado: false },
        { id: 6, txt: "Visitante", selecionado: false, sub: [
            {id_sub: 61, txt: "Empresa", selecionado: false},
            {id_sub: 62, txt: "Pessoa Singular", selecionado: false}
        ]},

        { id: 7, txt: "Voluntário (a)", selecionado: false } */
    var perfis = ["Aluno(a)", "Docente", "Empresa", "Orador", "Organização", "Visitante", "Voluntário(a)"];
    var perf1 = "";
    var perf2 = "";
    var perf3 = "";



    var ini = -1;
    for (var i = 0; i < 7; i++) {
      if (parseInt(perfil1) - 1 == i || parseInt(perfil2) - 1 == i || parseInt(perfil3) - 1 == i) {
        ini++;
        if (ini == 0) {
          perf1 = perfis[i];
          ini++;
        }
        if (ini == 2) {
          perf2 = perfis[i];
          ini++;
        }
        if (ini == 4) {
          perf3 = perfis[i];
          ini++;
        }
      }

    }

    var string = "";

    string = perf1;
    if (perf2 != "") {
      string += ", " + perf2;
    }
    if (perf3 != "") {
      string += ", " + perf3;
    }



    return string;


  }

  const header = {
    backgroundColor: "#9B9B9B",
    height: "230px",
    marginBottom: "68px"
  }

  const style_nome = {
    marginTop: "12px",
    color: "white",
    textAlign: "center" as "center",
    fontSize: "24px"
  }

  const foto_perfil = {
    width: "110px",
    margin: "auto",
    paddingTop: "45px"

  }
  /**
   * localStorage.setItem("UtilizadorLogin", resultado.data.message.nome);
    localStorage.setItem("UtilizadorEmail", resultado.data.message.email);
     localStorage.setItem("UtilizadorLocalidade", resultado.data.message.localidade);
    
     localStorage.setItem("UtilizadorPerfil1", resultado.data.message.perfil_1);
     localStorage.setItem("UtilizadorPerfil2", resultado.data.message.perfil_2);
     localStorage.setItem("UtilizadorPerfil3", resultado.data.message.perfil_3);
    localStorage.setItem("UtilizadorID", resultado.data.message.id_user);
   */
  return (
    <IonPage>
      <IonHeader no-border>
        <IonToolbar color="dark" >
          <IonButtons slot="start" >
            <IonButton onClick={() => { window.history.back() }}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={header}>
          <div style={{ width: "100%" }}>
            <div style={foto_perfil}>
              <div>
                <IonImg src="assets/resources/user_.png" />
              </div>
            </div>
            <div style={style_nome}>{nome}</div>
          </div>
        </div>

        <div style={{ margin: "24px" }}>
          {/* EMAIL */}
          <div style={{ height: "50px", marginBottom: "24px" }}>
            <div style={{ float: "left", height: "50px", marginRight: "24px" }}><IonImg style={{ display: "block", marginTop: "14px", width: "22px" }} src="assets/resources/email_perfil.png" /></div>
            <div style={{ height: "40px" }}>
              <div style={{ fontSize: "18px", marginBottom: "8px", color: "#474747" }}>{email}</div>
              <div style={{ fontSize: "16px", color: "#757575" }}>E-mail</div>
            </div>
          </div>

          {/** LOCALIDADE */}
          <div style={{ height: "50px", marginBottom: "24px" }}>
            <div style={{ float: "left", height: "50px", marginRight: "24px" }}><IonImg style={{ display: "block", marginTop: "14px", width: "18px", marginRight:"2px", marginLeft:"2zpx" }} src="assets/resources/localizacao_perfil.png" /></div>
            <div style={{ height: "40px" }}>
              <div style={{ fontSize: "18px", marginBottom: "8px", color: "#474747" }}>{localidade}</div>
              <div style={{ fontSize: "16px", color: "#757575" }}>Localidade</div>
            </div>
          </div>

          {/** Perfis */}
          <div style={{ height: "50px" }}>
            <div style={{ float: "left", height: "50px", marginRight: "24px" }}><IonImg style={{ display: "block", marginTop: "14px", width: "22px"}} src="assets/resources/utilizador_perfil.png" /></div>
            <div style={{ height: "40px" }}>
              <div style={{ fontSize: "18px", marginBottom: "8px", color: "#474747" }}>{perfil()}</div>
              <div style={{ fontSize: "16px", color: "#757575" }}>Perfil Utilizador</div>
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
