import React from 'react';
import '../theme.css';
import { IonIcon, IonImg, IonAvatar } from '@ionic/react';
import { Link } from 'react-router-dom';

interface ITeste {
    nome: string;
    cargo: number;
    urlImagem: string;
    hora: string;
    idOrador: number;
}

const ItemListagemOradores: React.FC<ITeste> = (props) => {
    const styl_avatar = {
        maxWidth: "85px", 
        minWidth: "85px", 
        height: "85px",  
        maxHeight: "85px", 
        padding: "5px"
    }

    const area_hora = {
        width: "50px",
        marginTop: "4px",
        marginBottom: "4px"
    };
    const stly_hora = {
        margin: "0px auto",
        marginBottom: "8px",
        background: "#9b9b9b",
        padding: "2px 4px",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "center",
        color: "white",
        fontSize: "14px"
    };
 
    return (
        <div> 
            <div  tabIndex={0}>
                <div style={{ display: "flex", padding: "10px", alignItems: "center", justifyContent: "space-between" }}>
                    <IonAvatar style={styl_avatar}>
                        <IonImg src={props.urlImagem} />
                    </IonAvatar>
                    <div style={{ marginLeft: "10px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #dfdfdf" }}>
                        <div>
                            <h6 style={{ marginRight: "auto", color: "#4b4b4b", fontWeight: "bold", marginBottom: "0px", paddingBottom: "0px" }}>{props.nome}</h6>
                            <p style={{ marginRight: "auto", color: "#9B9B9B", fontSize: "14px", marginTop: "0px", marginBottom: "8px" }}>{props.cargo}</p>
                            <div style={area_hora}>
                                <div style={stly_hora}>
                                    {props.hora}
                                </div>
                            </div>
                        </div>
                        <Link to={"/palestra/" + props.idOrador}>
                            <IonIcon className="arrowFoward" style={{ backgroundColor: "#4b4b4b", fontSize: "24px", minWidth: "24px" }}></IonIcon>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemListagemOradores;