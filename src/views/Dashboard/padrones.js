import ip from "variables/ip.js";
import encrypt from "./encrypt";

import genPredio from "./genPredio";

export default async (CTAnombre, tp, tipoB, idOrden, c) => {
  
    try {
        const sendUri = ip('3015');
        const bodyJSON = {
          CTAnombre: CTAnombre,
          tp: tp,
          tipoB: tipoB,
          idOrden: idOrden
        }
        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyJSON)
        });
        const responseJson = await response.json().then(r => {
            //console.log(`Response1: ${r}`)
            
            genPredio(r,tp,c)
            
            /*else if (r.error.name === "error01") {
                       this.removeCookies()
                       confirmAlert({
                         title: "¡Error!",
                         message: "La contraseña es incorrecta.",
                         buttons: [{
                           label: "Aceptar",
                           onClick: () => {
                             this.props.history.push("/entrar");
                           }
                         }]
                       });
                     }*/
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
   
}