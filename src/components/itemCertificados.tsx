import React from 'react';
import '../theme.css';
import { IonIcon } from '@ionic/react';

interface ITeste {
    tipo_certificado: string;
    nome: string;
    quem?: string;
    titulo?: string;
    tipo?: string;
    texto_apresentacao: string;
}


const ItemCertificados: React.FC<ITeste> = (props) => {
    
    let linkcertificados = "http://app.cimeira.ipvc.pt/api/obtercertificado?nome=" + props.nome +  "&quem=" + props.quem + "&tipo=" + props.tipo + "&titulo=" + props.titulo + "&tipo_certificado=" + props.tipo_certificado;

    return (
        <div>
            <div>
                <a href={linkcertificados} style={{textDecoration: "none"}}>
                    <div style={{ display: "flex", padding: "5px", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ marginLeft: "10px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #dfdfdf" }}>
                            <p style={{ marginRight: "auto", color: "#4b4b4b"}}>{props.texto_apresentacao}</p>
                            <IonIcon className="download" style={{ backgroundColor: "#4b4b4b", fontSize: "24px", minWidth: "24px" }}></IonIcon>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );

}

export default ItemCertificados;