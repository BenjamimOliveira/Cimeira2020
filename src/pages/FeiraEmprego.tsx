import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonText, IonLabel, IonImg, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import ItemFeiraEmprego from '../components/itemFeiraEmprego';
import { Link } from 'react-router-dom';


const FeiraEmprego: React.FC = () => {

  var [menu1, setmenu1] = useState({ id: "", nome: "", foto: "" });
  var [menu2, setmenu2] = useState({ id: "", nome: "", foto: "" });
  var [menu3, setmenu3] = useState({ id: "", nome: "", foto: "" });
  var [menu4, setmenu4] = useState({ id: "", nome: "", foto: "" });
  var [feiraVirtual, setFeiraVirtual] = useState({ link: "" });
  const [possuiResultados, setPossuiResultados] = useState(false);
  var [] = useState(false);

  /* function callAxios(){
     Promise.all([axios.get(URL+"1"), axios.get(URL+"2"), axios.get(URL+"3"), axios.get(URL+"4"), axios.get(URL+"5")])
     .then(([result1, result2, result3, result4, result5]) => {
         setmenu1(result1.data);
         setmenu2(result2.data);
         setmenu3(result3.data);
         setmenu4(result4.data);
         setmenu5(result5.data);
         setPossuiResultados(true);
         console.log(menu1);
     })
   }
 */


  useIonViewDidEnter(() => {
    // -- obter lista de categorias
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/feira_emprego"
    }).then(resultado => {
      setmenu1(resultado.data[0]);
      setmenu2(resultado.data[1]);
      setmenu3(resultado.data[2]);
      setmenu4(resultado.data[3]);
      setPossuiResultados(true);

    }).catch(erro => {
      console.log("ERRO feira emprego", erro);
    });

    // -- obter lista de categorias
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/feira_virtual"
    }).then(resultado => {
      setFeiraVirtual(resultado.data[0]);
      console.log(resultado)
    }).catch(erro => {
      console.log("ERRO", erro);
    })
  });

  const rect = {
    minWidth: "40px",
    minHeight: "40px"
  };
  /*
    useIonViewDidEnter(() => {
      callAxios();
    });
  */

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar className="navbar">
          <IonButtons slot="start" >
            <IonButton onClick={() => { window.history.back() }}>
              <IonIcon slot="icon-only" className="arrowBack"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Feira Emprego</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-content-workshop">
        <IonLabel><IonText class="linha-topo">TENDA MULTIUSOS</IonText></IonLabel>
        { possuiResultados &&
          <Link to={"/recrutamento"} style={{ textDecoration: "none" }}><ItemFeiraEmprego texto={menu1.nome} idCategoria={menu1.id} urlImagem={menu1.foto} /></Link>
        }
        { possuiResultados &&
          <div>
            <div tabIndex={0}>
              <div style={{ display: "flex", padding: "10px", alignItems: "center", justifyContent: "space-between" }}>
                <div style={rect}>
                  <IonImg src={menu2.foto} />
                </div>
                <a href={feiraVirtual.link} style={{ marginLeft: "10px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #dfdfdf", textDecoration: "none" }}>
                  <p style={{ marginRight: "auto", color: "#4b4b4b", fontWeight: "bold" }}>{menu2.nome}</p>
                  <div slot="end" style={{ width: "24px" }} >
                    <IonIcon className="arrowFoward" style={{ backgroundColor: "#4b4b4b", fontSize: "24px", minWidth: "24px" }}></IonIcon>
                  </div>
                </a>
              </div>

            </div>
          </div>
        }
        { possuiResultados &&
          <Link to={"/pitchs"} style={{ textDecoration: "none" }}><ItemFeiraEmprego texto={menu3.nome} idCategoria={menu3.id} urlImagem={menu3.foto} /> </Link>
        }
        { possuiResultados &&
          <Link to={"/vianalinkmoments"} style={{ textDecoration: "none" }}><ItemFeiraEmprego texto={menu4.nome} idCategoria={menu4.id} urlImagem={menu4.foto} /> </Link>
        }
        {console.log(menu1.nome + menu2.nome + menu3.nome)}
      </IonContent>

    </IonPage>
  );
};

export default FeiraEmprego;