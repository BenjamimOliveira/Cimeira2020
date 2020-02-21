import React, { useState } from 'react';
import '../theme.css';
import { IonIcon, IonImg, IonAvatar } from '@ionic/react';
import { Link } from 'react-router-dom';

interface ITeste {
    texto: string;
    idEmpresa: number;
    urlImagem: string;
}


const ItemListagemEmpresas: React.FC<ITeste> = (props) => {
    const background = {
        backgroundColor: "#ffffff"
    }

    const styl_avatar = {
        maxWidth: "70px", 
        minWidth: "70px", 
        height: "70px",  
        maxHeight: "70px"
    }

    return (
        <div> 
            <div style={background} tabIndex={0}>
                <div style={{ display: "flex", padding: "0 10px", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                        {/* <IonAvatar style={styl_avatar}> */}
                        <IonImg src={props.urlImagem} style={styl_avatar}/>
                        {/* </IonAvatar> */}
                    </div>
                    <div style={{ marginLeft: "10px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #dfdfdf" }}>
                        <Link to={"/descricao_empresa_palco/" + props.idEmpresa} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none" }}>
                            <p style={{ marginRight: "auto", color: "#4b4b4b", fontWeight: "bold" }}>{props.texto}</p>
                            <IonIcon className="arrowFoward" style={{ backgroundColor: "#4b4b4b", fontSize: "24px", minWidth: "24px" }} ></IonIcon>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ItemListagemEmpresas;