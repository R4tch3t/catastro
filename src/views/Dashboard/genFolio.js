import ip from "variables/ip.js";
import encrypt from "./encrypt";
export default async(idFolio, url, subUrl, idOrden, tp) => {
    try {

        const sendUri = ip('3029');
        
        const bodyJSON = {
          idFolio: idFolio,
          idOrden: idOrden,
          tp: `${tp}${idFolio}`
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
            //console.log(r)
            if (r.idFolio !== undefined) {
              
              //if(r.idFolio===idFolio){
                //let url = idRol === '1' ? `#/admin/orden` : `#/usuario/orden`
                //url += `?v=${encrypt(subUrl)}`;
            //    const f = r.idFolio
            //    const sU = `${subUrl}&folio=${f}`
                //subUrl += `&folio=${f}`
          //      window.open(`${url}?v=${encrypt(sU)}`, '_blank');
                //win.focus();
              //  console.log(r)
              //}

            }
            
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}