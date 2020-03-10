import ip from "variables/ip.js";
import encrypt from "./encrypt";
import getPredial from "./getPredial";
import clearCheck from './clearCheck.js';

export default async (CTAnombre, tp, tipoB, dateUp, c) => {
  const genCarta = (CTA, nombre, ubi, tp, añoI, añoF) => {
    const {
      idRol
    } = c.props
    let url = idRol === '1' ? `#/admin/padron` : `#/usuario/padron`
   // const y = new Date().getFullYear()
    let subUrl = `?bandCarta=1&genCTA=${CTA}&nombre=${nombre}&ubi=${ubi}&tp=${tp}`
    subUrl += `&añoI=${añoI}&añoF=${añoF}`
    url += `?v=${encrypt(subUrl)}`;
    const win = window.open(url, '_blank');
    win.focus();
  }
    try {
        const sendUri = ip('3015');
        const bodyJSON = {
          CTAnombre: CTAnombre,
          tp: tp,
          tipoB: tipoB,
          dateUp: dateUp
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

            if (r.contribuyente) {
              const contribuyente = r.contribuyente[0]
              const ubicacion = r.ubicacion[0]
              const orden = r.orden
              const {Y} = c.state
              //const predial = r.predial
              
                c.setState({
                 // nombre: contribuyente.contribuyente,
                  CTA: contribuyente.CTA
                })
                const sCarta = document.getElementById('sCarta');
                const nombre = document.getElementById('nombre');
                nombre.value = contribuyente.contribuyente;
                nombre.focus();
                const calle = document.getElementById('calle');
                const lote = document.getElementById('lote');
                const manzana = document.getElementById('manzana');
                const numCalle = document.getElementById('numCalle');
                const colonia = document.getElementById('colonia');
                const cp = document.getElementById('cp');
                const municipio = document.getElementById('municipio');
                const localidad = document.getElementById('localidad');
                const bg = document.getElementById('baseGravable');
                const m1 = document.getElementById('m1');
                const m2 = document.getElementById('m2');
                const periodo = document.getElementById('periodo');
                const dateUpL = document.getElementById('dateUp');
                const regB=document.getElementById('regB')
                regB.innerHTML = 'GENERAR ORDEN DE PAGO'
                dateUpL.style.color = 'red'
                //const checkU = document.getElementById('check0');

                calle.value = ubicacion.calle;
                lote.value = ubicacion.lote;
                manzana.value = ubicacion.manzana;
                numCalle.value = ubicacion.numero;
                colonia.value = ubicacion.colonia;
                cp.value = ubicacion.cp === 0 ? 41100 : ubicacion.cp;
                municipio.value = ubicacion.municipio === '' ? 'CHILAPA DE ÁLVAREZ' : ubicacion.municipio;
                localidad.value = ubicacion.localidad === '' ? 'CHILAPA DE ÁLVAREZ' : ubicacion.localidad;;
                const ctasIndexes = []
                while (ctasIndexes.length < r.contribuyente.length && ctasIndexes.length < 20) {
                  ctasIndexes.push(r.contribuyente[ctasIndexes.length])
                }
                c.setState({ctasIndexes: ctasIndexes, tipoPredio: tp})
                //else{
                //  this.setState({tipoPredio: tp})
                //}
                

                if(!orden){
                  if (calle.value===''){
                    calle.value = contribuyente.ubicacion
                  }
                  m1.value = 0
                  m2.value = 0
                  bg.value = 0;
                  clearCheck(c)
                  dateUpL.value = ''
                  c.setState({tc: 0, zona: 0, totalN: 0});

                  return false;
                }
                
                m1.value = orden.m1
                m2.value = orden.m2
                let tzoffset = (new Date()).getTimezoneOffset() * 60000;
                dateUp = new Date(orden.dateUp)-tzoffset
                dateUp = new Date(dateUp)
                if ((parseInt(Y)) > parseInt(dateUp.getFullYear())){
                 const añoI = dateUp.getFullYear()
                 const añoF = new Date().getFullYear()
                  if((añoF - añoI)>4 ){
                     sCarta.style.display = 'block'
                     let ubi = `${ubicacion.calle}`
                     if (ubicacion.numero !== 0 && ubicacion.numero !== '') {
                       ubi += `, No. ${ubicacion.numero}`
                     }
                     const predio = tp === 'r' ? 'RÚSTICO' : 'URBANO'

                     sCarta.onclick = () => {
                       genCarta(contribuyente.CTA,
                         contribuyente.contribuyente,
                         ubi, predio, añoI, añoF)
                     }
                  }
                }else{
                  dateUpL.value = dateUp.toISOString().slice(0, -1)
                  regB.innerHTML = 'ACTUALIZAR ORDEN DE PAGO'
                }

               
                periodo.value = orden.periodo
                c.setState({tc: orden.tc, zona: orden.zona, totalN: orden.total});
               // this.setState({totalN: orden.total});
                //if(checkU.checked){
                
                bg.value = orden.bg;
                getPredial(orden.idOrden,tp,c)
                //console.log(predial);
              //  genImp(predial,this);
                //if (parseInt(orden.zona) > 0) {
                 // this.setZona(orden.zona); 
                //}
                //else{
                  
                //}

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