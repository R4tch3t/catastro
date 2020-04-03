import ip from "variables/ip.js";
import genImp from "./genImp";
import genPredio from "./genPredio";

export default async (CTAnombre, c) => {
    try {
        const sendUri = ip('3028');
        c.idOrden = 0
        const bodyJSON = {
          idFolio: CTAnombre
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
            if(r.folio){
              const tp = r.folio.tp
              genPredio(r, tp, c)
              if(!r.contribuyente&&r.orden){
                let tzoffset = (new Date()).getTimezoneOffset() * 60000;
                const orden = r.orden[0]
                const total = orden.total
                const nombre = document.getElementById('nombre')
                const dateUp = document.getElementById('dateUp')
                dateUp.style.color='red'
                nombre.value = orden.nombre
                //dateUp.value = orden.dateUp.slice(0, -1)
                orden.dateUp = new Date(orden.dateUp)
                dateUp.value = new Date(orden.dateUp - tzoffset).toISOString().slice(0, -1)
                /*r.predial = [{
                  idImpuesto: 22,
                  val: parseInt(total) / 72
                }]*/
                if (r.formas){
                  genImp(r.formas, c);
                }
                c.idOrden = orden.idOrden
                c.setState({totalN: total});
              }
            }
            
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