import ip from "variables/ip.js";
export default async(CTA, street, barr, zona, tp, c) => {
    try {
        if(CTA===''){
            c.setState({disabledReg: false})
            return
        }
        const sendUri = ip('3021');
        let i = 0
        let path = c.polyC.getPath();
        let pc = []
        let pt = []
        let mInfo = []
        if(path){
            while(i<path.length){
                pc.push({lat: path.g[i].lat(), lng: path.g[i].lng()})
                i++
            }
        }
        path = c.polyT.getPath();
        i=0;
        if(path){
            while(i<path.length){
                pt.push({lat: path.g[i].lat(), lng: path.g[i].lng()})
                i++
            }
        }
        if (c.markerInfo.getPosition()) {
            mInfo.push({lat: c.markerInfo.getPosition().lat(), lng: c.markerInfo.getPosition().lng()})
        }
        
        const bodyJSON = {
            CTA: CTA,
            street: street,
            barr: barr,
            zona: zona,
            saveZ: c.saveZ,
            tp: tp,
            pc: pc,
            pt: pt,
            mInfo: mInfo            
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

            if (r.exito !== undefined) {
              //  console.log('exito')
            }
             c.setState({disabledReg: false})
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