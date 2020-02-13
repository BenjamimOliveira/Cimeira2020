import React from 'react';
import '../theme.css';
import { IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';

interface IProps {
    idAtividade: string;
    texto: string;
    hora: string;
}

const SubItemProgramaHorario: React.FC<IProps> = (props) => {
    const rect = {
        minWidth: "50px",
        margin: "0 auto"
    };
    const stly_hora = {
        margin: "0 auto",
        background: "#9b9b9b",
        padding: "2px",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "center",
        color: "white",
        fontSize: "14px"
    };
    return (
        <div style={{ display: "flex", padding: "0 10px", alignItems: "center", justifyContent: "space-between" }}>
            <div style={rect}>
                <div style={stly_hora}>
                    {props.hora}
                </div>
            </div>
            <div style={{ marginLeft: "15px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                <Link to={"/atividade/" + props.idAtividade} style={{ marginLeft: "15px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none"}}>
                    <p style={{ marginRight: "auto", color: "#4b4b4b" }}>{props.texto}</p>
                    <IonIcon className="arrowFoward" style={{ backgroundColor: "#4b4b4b", fontSize: "24px", minWidth: "24px" }} ></IonIcon>
                </Link>
            </div>
        </div>
    );

}

export default SubItemProgramaHorario;