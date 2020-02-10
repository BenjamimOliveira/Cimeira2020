import React, { useState } from 'react';
import '../theme.css';
import { IonIcon, IonImg } from '@ionic/react';
import Axios from 'axios';
import SubItemProgramaHorario from './subitemProgramaHorario';

interface ITeste {
    texto: string;
    idCategoria: number;
    urlImagem: string;
}


const ItemProgramaHorario: React.FC<ITeste> = (props) => {
    
    const [possuiResultados, setPossuiResultados] = useState(false);
    const [mostraSub, setMostraSub] = useState(false);
    const [subCategorias, setSubCategorias] = useState([]);
    const [cor, setCor] = useState("trasparent");

    function obtemDadosCategoria(idCategoria: number) {
        Axios({
            method: "get",
            url: "http://app.cimeira.ipvc.pt/api/programa/" + idCategoria + "/atividades"
        }).then(resultado => {
            if(resultado.data != "Sem ATIVIDADES associadas ao PROGRAMA."){
                setPossuiResultados(true);
                setSubCategorias(resultado.data);
                setMostraSub(true); 
                setCor("#d8d8d8");
            } else {
                setSubCategorias([]);
            }
        }).catch(erro => {
            console.log("ERRO", erro);
        })
    }

    function mostraSubCategorias(idCategoria: number) {
        if(mostraSub){
            setMostraSub(false);
            setCor("transparent")
        } else
            obtemDadosCategoria(idCategoria);
    }

    const escurece = {
        backgroundColor: cor
    }

    const rect = {
        minWidth: "40px",
        minHeight: "40px"
    };
    return (
        <div> 
            <div style={escurece} tabIndex={0}>
                <div style={{ display: "flex", padding: "10px", alignItems: "center", justifyContent: "space-between" }} onClick={() => {if(mostraSub){ setMostraSub(false); setCor("transparent");} else { setMostraSub(true); setCor("#d8d8d8"); mostraSubCategorias(props.idCategoria)}}}>
                    <div style={rect}>
                        <IonImg src={props.urlImagem} />
                    </div>
                    <div style={{ marginLeft: "10px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #dfdfdf" }}>
                        <p style={{ marginRight: "auto", color: "#4b4b4b", fontWeight: "bold" }}>{props.texto}</p>
                        <IonIcon className="arrowDown" style={{ backgroundColor: "#4b4b4b", fontSize: "24px", minWidth: "24px" }}></IonIcon>
                    </div>
                </div>
                <div>
                { possuiResultados && mostraSub === true && subCategorias.map(function(subcategoria) {
                    return <SubItemProgramaHorario texto={subcategoria['atividade']} hora={(subcategoria['hora'] as string).slice(0, -3)} idAtividade={subcategoria['id']} key={subcategoria['id']}></SubItemProgramaHorario>
                })
                }
                </div>
            </div>
        </div>
    );

}

export default ItemProgramaHorario;