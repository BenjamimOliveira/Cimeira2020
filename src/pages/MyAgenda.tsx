import { IonContent, IonPage, IonImg, useIonViewDidEnter, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ItemMyAgenda from '../components/itemMyAgenda';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';

const MyAgenda: React.FC = () => {

  var [menu_1, setmenu1] = useState({descr:"", link: ""});
  var [menu_2, setmenu2] = useState({descr:"", link: ""});
  var [menu3, setmenu3] = useState({descr:"", link: ""});
  var [menu4, setmenu4] = useState({descr:"", link: ""});
  var [menu5, setmenu5] = useState({descr:"", link: ""});
  var [menu6, setmenu6] = useState({descr:"", link: ""});
  var [menu7, setmenu7] = useState({descr:"", link: ""});
  
  var [possuiResultados, setPossuiResultados ] = useState(false);

  
  const x_close = {
    width:"26px",
    marginTop: "24px",
    marginLeft: "16px"
  }

  const foto_perfil = {
    width: "120px",
    margin: "auto",
  }

  const menu = {
    marginLeft: "24px",
    marginTop: "48px"
  }

  const menu1 = {
    marginTop:"12px"
  }

  const menu2 = {
    marginTop:"100px"
  }

  useIonViewDidEnter(() => {
    // -- obter lista de categorias
    axios({
      method: "get",
      url: "http://app.cimeira.ipvc.pt/api/menu"
    }).then(resultado => {        
        setmenu1(resultado.data[0]);
        setmenu2(resultado.data[1]);
        setmenu3(resultado.data[2]);
        setmenu4(resultado.data[3]);
        setmenu5(resultado.data[4]);
        setmenu6(resultado.data[5]);
        setmenu7(resultado.data[6]);
        setPossuiResultados(true);
    }).catch(erro => {
        console.log("ERRO My Agenda", erro);
    });
  
  })
  let history = useHistory();
  function logout(){
    localStorage.setItem("UtilizadorLogin", '');
    localStorage.setItem("UtilizadorID", '');
    history.replace('/login');
  }

  return (
    <IonPage>
      
      <IonContent fullscreen className="backgroundVermelho">
            <div style={x_close}>
              <div>
                <IonImg onClick={() => {window.history.back()}} src="assets/resources/close.png"/>
              </div>
            </div>
              
            <div style={{width:"100%", marginTop:"24px"}}>
              <div style={foto_perfil}>
                <Link to={"/home"}>
                  <IonImg src="assets/resources/picture_IPVC.png"/>
                </Link>
              </div>
            </div> 
            { possuiResultados && 
            <div style={menu}>
              <div style={menu1}>
                <ItemMyAgenda texto={menu_1.descr} urlImagem={menu_1.link} pathTo="/perfil"/>                
                <ItemMyAgenda texto={menu_2.descr} urlImagem={menu_2.link} pathTo="/agenda"/>
                <ItemMyAgenda texto={menu4.descr} urlImagem={menu4.link} pathTo="/com_Organizador"/>
                <ItemMyAgenda texto={menu5.descr} urlImagem={menu5.link} pathTo="/home"/>
              </div>

              <div style={menu2}> 
                <div style={{height:"32px", marginBottom:"8px"}} onClick={() => {logout()}}>
                  <div>
                    <div style={{display: "table-row"}} id="test">                    
                      <div style={{display: "table-cell", verticalAlign:"middle", width:"46px" }}><IonImg style={{width:"28px"}} src={menu7.link}/></div>  
                      <div style={{display: "table-cell", verticalAlign:"middle", fontSize: "16px", color:"#fff", marginLeft:"20px"}}>{menu7.descr}</div>                  
                    </div>
                  </div>
                </div>
             </div>
            </div>
              }
            
      </IonContent>
    </IonPage>
  );
};

export default MyAgenda;