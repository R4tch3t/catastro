import React from 'react';
import cookie from "react-cookies";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
//import { makeStyles } from "@material-ui/core/styles";
//import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import LocalAtm from "@material-ui/icons/LocalAtm";
//import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
//import LocalOffer from "@material-ui/icons/LocalOffer";
//import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import Checker from "./Checker.js";
import Pdf from "./renderPDF.js";
//import Accessibility from "@material-ui/icons/Accessibility";
//import BugReport from "@material-ui/icons/BugReport";
//import Code from "@material-ui/icons/Code";
//import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import classNames from "classnames";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
//import Tasks from "components/Tasks/Tasks.js";
//import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import Poppers from "@material-ui/core/Popper";
import Impuestos from "./Impuestos"
//import { Crypt, RSA } from "hybrid-crypto-js";
import encrypt from "./encrypt";
import renderCI from "./renderCI";
//import { bugs, website, server } from "variables/general.js";
import {
  creditoFovisste,
  seguroFovisste
} from "variables/charts.js";


if (!String.prototype.splice) {
  /**
   * {JSDoc}
   *
   * The splice() method changes the content of a string by removing a range of
   * characters and/or adding new characters.
   *
   * @this {String}
   * @param {number} start Index at which to start changing the string.
   * @param {number} delCount An integer indicating the number of old chars to remove.
   * @param {string} newSubStr The String that is spliced in.
   * @return {string} A new string with the spliced substring.
   */
  String.prototype.splice = function (start, delCount, newSubStr) {
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
  };
}

export default class TableRender extends React.Component {
state={
    nombre: '',
    CTA: '',
    calle: '',
    tipoPredio: '',
    classes: null,
    openDash: null,
    openZona: null,
    lastD: null,
    Y: 0,
    totalN: 0,
    CBG: true,
    zona: 0
}

constructor(props){
    super(props);
    const date = new Date()
    
    this.state = {
        nombre: '',
        CTA: '',
        calle: '',
        tipoPredio: '',
        classes: props.classes,
        openDash: null,
        openZona: null,
        lastD: date,
        Y: date.getFullYear(),
        totalN: 0.0,
        CBG: true,
        zona: 0
    };
//    this.obtenerQ(this.state.idUsuario,this.state.idQuincena)
}

round = (num, decimales = 2)=>{
  var signo = (num >= 0 ? 1 : -1);
  num = num * signo;
  if (decimales === 0) //con 0 decimales
    return signo * Math.round(num);
  // round(x * 10 ^ decimales)
  num = num.toString().split('e');
  num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
  // x * 10 ^ (-decimales)
  num = num.toString().split('e');
  return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}

padrones=async(CTAnombre, tp, tipoB)=>{
    try {

       //const sendUri = "http://34.66.54.10:3015/";
        const sendUri = "http://localhost:3015/";
        //const sendUri = "http://192.168.1.74:3015/";
        const bodyJSON = {
          CTAnombre: CTAnombre,
          tp: tp,
          tipoB: tipoB
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

            if (r.contribuyente !== undefined) {
              const contribuyente = r.contribuyente[0]
              const ubicacion = r.ubicacion[0]
              const orden = r.orden
              const predial = r.predial
              
                this.setState({
                  nombre: contribuyente.contribuyente,
                  CTA: contribuyente.CTA
                })
                const nombre = document.getElementById('nombre');
                nombre.focus()
                const calle = document.getElementById('calle');
                const numCalle = document.getElementById('numCalle');
                const colonia = document.getElementById('colonia');
                const cp = document.getElementById('cp');
                const municipio = document.getElementById('municipio');
                const localidad = document.getElementById('localidad');
                const bg = document.getElementById('baseGravable');
                const m1 = document.getElementById('m1');
                const m2 = document.getElementById('m2');
                const periodo = document.getElementById('periodo');
                //const checkU = document.getElementById('check0');

                calle.value = ubicacion.calle;
                numCalle.value = ubicacion.numero;
                colonia.value = ubicacion.colonia;
                cp.value = ubicacion.cp;
                municipio.value = ubicacion.municipio;
                localidad.value = ubicacion.localidad;
                this.setState({tipoPredio: tp})
                if(!orden){
                  return false;
                }
                m1.value = orden.m1
                m2.value = orden.m2
                periodo.value = orden.periodo
                this.setState({zona: orden.zona});
                this.setState({totalN: orden.total});
                //if(checkU.checked){
                
                bg.value = orden.bg;
                //console.log(predial);
                let checkeds = []
                while(checkeds.length<14){
                  checkeds.push([])
                };

                predial.forEach(e => {
                  if (e.idImpuesto === 1) {
                    checkeds[0].push(0)
                    document.getElementById('0020401').value = e.val
                  }
                  if (e.idImpuesto === 2) {
                    checkeds[0].push(1)
                    document.getElementById('0020402').value = e.val
                  }
                  if (e.idImpuesto === 3) {
                    checkeds[1].push(0)
                    document.getElementById('0020403').value = e.val
                  }
                  if (e.idImpuesto === 4) {
                    checkeds[1].push(1)
                    document.getElementById('0020801').value = e.val
                  }
                  if (e.idImpuesto === 5) {
                    checkeds[2].push(0)
                    document.getElementById('0020802').value = e.val
                  }
                  if (e.idImpuesto === 6) {
                    checkeds[2].push(1)
                    document.getElementById('0020803').value = e.val
                  }
                  if (e.idImpuesto === 7) {
                    checkeds[3].push(0)
                    document.getElementById('0020804').value = e.val
                  }
                  if (e.idImpuesto === 8) {
                    checkeds[3].push(1)
                    document.getElementById('0030101').value = e.val
                  }
                  if (e.idImpuesto === 9) {
                    checkeds[4].push(0)
                    document.getElementById('0070101').value = e.val
                  }
                  if (e.idImpuesto === 10) {
                    checkeds[4].push(1)
                    document.getElementById('0070201').value = e.val
                  }
                  if (e.idImpuesto === 11) {
                    checkeds[5].push(0)
                    document.getElementById('0070202').value = e.val
                  }
                  if (e.idImpuesto === 12) {
                    checkeds[5].push(1)
                    document.getElementById('0070203').value = e.val
                  }
                  if (e.idImpuesto === 13) {
                    checkeds[6].push(0)
                    document.getElementById('0090101').value = e.val
                  }
                  if (e.idImpuesto === 14) {
                    checkeds[7].push(0)
                    document.getElementById('0090106').value = e.val
                  }
                  if (e.idImpuesto === 15) {
                    checkeds[7].push(1)
                    document.getElementById('0090107').value = e.val
                  }
                  if (e.idImpuesto === 16) {
                    checkeds[8].push(0)
                    document.getElementById('0090701').value = e.val
                  }
                  if (e.idImpuesto === 17) {
                    checkeds[8].push(1)
                    document.getElementById('0090702').value = e.val
                  }
                  if (e.idImpuesto === 18) {
                    checkeds[9].push(0)
                    document.getElementById('0090703').value = e.val
                  }
                  if (e.idImpuesto === 19) {
                    checkeds[9].push(1)
                    document.getElementById('0090704').value = e.val
                  }
                  if (e.idImpuesto === 20) {
                    checkeds[10].push(0)
                    document.getElementById('00913').value = e.val
                  }
                  if (e.idImpuesto === 21) {
                    checkeds[10].push(1)
                    document.getElementById('0091301').value = e.val
                  }
                  if (e.idImpuesto === 22) {
                    checkeds[11].push(0)
                    document.getElementById('0010804').value = e.val
                  }
                  if (e.idImpuesto === 23) {
                    checkeds[12].push(0)
                    document.getElementById('0010101').value = e.val
                  }
                  if (e.idImpuesto === 24) {
                    checkeds[13].push(0)
                    document.getElementById('21173001001').value = e.val
                  }
                });
                let task = [0,1]
                if (checkeds[0].length>0){
                  renderCI('subIm0', task, 6, checkeds[0], ['41121001', '41121001'],
                    ['URBANOS EDIFICADOS DESTINADOS A CASA HABITACION',
                      'SUB URBANOS EDIFICADOS DESTINADOS A CASA HABITACION'
                    ], ['0020401', '0020402'], this.addImpuesto);
                }
                if (checkeds[1].length > 0) {
                  renderCI('subIm1', task, 6, checkeds[1], ['41121001', '41121001'],
                    ['RUSTICOS EDIFICADOS DESTINADOS A CASA HABITACION',
                      'PENSIONADOS Y JUBILADOS'
                    ], ['0020403', '0020801'], this.addImpuesto);
                }
                if (checkeds[2].length > 0) {
                  renderCI('subIm2', task, 6, checkeds[2], ['41121001', '41121001'],
                    ['INSEN',
                      'PERSONAS DE CAPACIDADES DIFERENTES'
                    ], ['0020802', '0020803'], this.addImpuesto);
                }
                if (checkeds[3].length > 0) {
                  renderCI('subIm3', task, 6, checkeds[3], ['41121001','41131001'],
                    ['MADRES Y/O PADRES SOLTEROS JEFES DE FAMILIA',
                      'SOBRE ADQUISICIONES DE BIENES INMUEBLES'
                    ], ['0020804', '0030101'], this.addImpuesto);
                }
                if (checkeds[4].length > 0) {
                  renderCI('subAcc0', task, 6, checkeds[4], ['41171001','41171001'],
                    ['RECARGOS PREDIAL', '15% PRO EDUCACION Y ASISTENCIA SOCIAL'],
                    ['0070101','0070201'], this.addImpuesto);
                }
                if (checkeds[5].length > 0) {
                  renderCI('subAcc1', task, 6, checkeds[5], ['41171001','41171001'],
                    ['15% PRO CAMINOS', 'DESCUENTO PREDIAL DE NATURALEZA DEUDORA'],
                    ['0070202','0070203'], this.addImpuesto);
                }
                if (checkeds[6].length > 0) {
                  renderCI('subAcc2', [0], 6, checkeds[6], ['41191001'],
                    ['REZAGOS IMPUESTO PREDIAL'],
                    ['0090101'], this.addImpuesto);
                }
                if (checkeds[7].length > 0) {
                  renderCI('subDer0', task, 6, checkeds[7], ['41491004','41491004'],
                    ['POR LA AUTORIZACION PARA LA FUSION DE PREDIOS',
                      'POR LA AUTORIZACION PARA SUBDIVISION, LOTIFICACION Y RELOTIFICACION DE PREDIOS'
                    ],
                    ['0090106','0090107'], this.addImpuesto);
                }
                if (checkeds[8].length > 0) {
                  renderCI('subCop0', task, 6, checkeds[8], ['41491004','41491004'],
                    ['CONSTANCIAS',
                      'CERTIFICACIONES'
                    ],
                    ['0090701','0090702'], this.addImpuesto);
                }
                if (checkeds[9].length > 0) {
                  renderCI('subCop1', task, 6, checkeds[9], ['41491004','41491004'],
                    ['DUPLICADOS Y COPIAS',
                      'OTROS SERVICIOS'
                    ],
                    ['0090703','0090704'], this.addImpuesto);
                }
                if (checkeds[10].length > 0) {
                  renderCI('subCop2', task, 6, checkeds[10], ['41491004','41491004'],
                    ['PRO-BOMBEROS Y PROTECCION CIVIL',
                      'LICENCIAS PARA CONSTRUCCION DE EDIFICIOS O CASAS HABITACION, RESTAURACION O REPARACION, URBANIZACION, FRACCIONAMIENTO LORIFIACION, RELOTIFICACION, FUSION Y SUB-DIVISION'
                    ],
                    ['00913','0091301'], this.addImpuesto);
                }
                if (checkeds[11].length > 0) {
                  renderCI('subPro0', [0], 12, checkeds[11], ['41491005'],
                    ['VENTAS DE FORMAS IMPRESAS POR JUEGOS (FORMA 3DCC)'],
                    ['0010804'], this.addImpuesto);
                }
                if (checkeds[12].length > 0) {
                  renderCI('subApr0', [0], 12, checkeds[12], ['41621006'],
                    ['MULTAS FISCALES (FALTA DE CUMPLIMIENTO DE OBLIGACIONES FISCALES)'],
                    ['0010101'], this.addImpuesto);
                }
                if (checkeds[13].length > 0) {
                  renderCI('subDee0', [0], 12, checkeds[13], [''],
                    ['15% DE CONTRIBUCION ESTATAL (APLICADO POR AUTORIZACION DE FUSION Y SUBDIVISION DE PREDIOS)'],
                    ['21173001001'], this.addImpuesto);
                }
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

registrarO=async()=>{
    try {

       //const sendUri = "http://34.66.54.10:3015/";
        const sendUri = "http://localhost:3016/";
        //const sendUri = "http://192.168.1.74:3015/";
        const CTA = document.getElementById('CTA').value;
        const calle = document.getElementById('calle').value;
        const numCalle = document.getElementById('numCalle').value;
        const colonia = document.getElementById('colonia').value;
        const cp = document.getElementById('cp').value;
        const municipio = document.getElementById('municipio').value;
        const localidad = document.getElementById('localidad').value;
        const bg = document.getElementById('baseGravable').value;
        const periodo = document.getElementById('periodo').value;
        const {totalN} = this.state;
        const m1 = document.getElementById('m1').value;
        const m2 = document.getElementById('m2').value;
        const zona = document.getElementById('zona').value;
        const {tipoPredio} = this.state;
        const idImpuestos = [];
        const removI = [];
        
        let I0020401 = document.getElementById('I0020401').checked;
        let V0020401 = document.getElementById('0020401').value
        if (I0020401) {
          idImpuestos.push({id: 1, val: V0020401});
        }else{
          removI.push({id: 1});
        }
        let I0020402 = document.getElementById('I0020402').checked;
        let V0020402 = document.getElementById('0020402').value
        if(I0020402){
          idImpuestos.push({id: 2, val: V0020402});
        }else{
          removI.push({id: 2});
        }
        let I0020403 = document.getElementById('I0020403').checked;
        let V0020403 = document.getElementById('0020403').value;
        if (I0020403) {
          idImpuestos.push({id: 3, val: V0020403});
        }else{
          removI.push({id: 3});
        }
        let I0020801 = document.getElementById('I0020801').checked;
        let V0020801 = document.getElementById('0020801').value
        if (I0020801) {
          idImpuestos.push({id: 4, val: V0020801});
        }else{
          removI.push({id: 4});
        }
        let I0020802 = document.getElementById('I0020802').checked;
        let V0020802 = document.getElementById('0020802').value
        if (I0020802) {
          idImpuestos.push({id: 5, val: V0020802});
        }else{
          removI.push({id: 5});
        }
        let I0020803 = document.getElementById('I0020803').checked;
        let V0020803 = document.getElementById('0020803').value
        if (I0020803) {
          idImpuestos.push({id: 6, val: V0020803});
        }else{
          removI.push({id: 6});
        }
        let I0020804 = document.getElementById('I0020804').checked;
        let V0020804 = document.getElementById('0020804').value
        if(I0020804){
          idImpuestos.push({id: 7, val: V0020804});
        }else{
          removI.push({id: 7});
        }
        let I0030101 = document.getElementById('I0030101').checked;
        let V0030101 = document.getElementById('0030101').value
        if(I0030101){
          idImpuestos.push({id: 8, val: V0030101});
        }else{
          removI.push({id: 8});
        }
        let I0070101 = document.getElementById('I0070101').checked;
        let V0070101 = document.getElementById('0070101').value
        if(I0070101){
          idImpuestos.push({id: 9, val: V0070101});
        }else{
          removI.push({id: 9});
        }
        let I0070201 = document.getElementById('I0070201').checked;
        let V0070201 = document.getElementById('0070201').value
        if(I0070201){
          idImpuestos.push({id: 10, val: V0070201});
        }else{
          removI.push({id: 10});
        }
        let I0070202 = document.getElementById('I0070202').checked;
        let V0070202 = document.getElementById('0070202').value
        if(I0070202){
          idImpuestos.push({id: 11, val: V0070202});
        }else{
          removI.push({id: 11});
        }
        let I0070203 = document.getElementById('I0070203').checked;
        let V0070203 = document.getElementById('0070203').value
        if (I0070203) {
          idImpuestos.push({id: 12, val: V0070203});
        }else{
          removI.push({id: 12});
        }
        let I0090101 = document.getElementById('I0090101').checked;
        let V0090101 = document.getElementById('0090101').value
        if (I0090101) {
          idImpuestos.push({id: 13, val: V0090101});
        }else{
          removI.push({id: 13});
        }
        let I0090106 = document.getElementById('I0090106').checked;
        let V0090106 = document.getElementById('0090106').value
        if (I0090106) {
          idImpuestos.push({id: 14, val: V0090106});
        }else{
          removI.push({id: 14});
        }
        let I0090107 = document.getElementById('I0090107').checked;
        let V0090107 = document.getElementById('0090107').value
        if (I0090107) {
          idImpuestos.push({id: 15, val: V0090107});
        }else{
          removI.push({id: 15});
        }
        let I0090701 = document.getElementById('I0090701').checked;
        let V0090701 = document.getElementById('0090701').value
        if (I0090701) {
          idImpuestos.push({id: 16, val: V0090701});
        }else{
          removI.push({id: 16});
        }
        let I0090702 = document.getElementById('I0090702').checked;
        let V0090702 = document.getElementById('0090702').value
        if (I0090702) {
          idImpuestos.push({id: 17, val: V0090702});
        }else{
          removI.push({id: 17});
        }
        let I0090703 = document.getElementById('I0090703').checked;
        let V0090703 = document.getElementById('0090703').value
        if (I0090703) {
          idImpuestos.push({id: 18, val: V0090703});
        }else{
          removI.push({id: 18});
        }
        let I0090704 = document.getElementById('I0090704').checked;
        let V0090704 = document.getElementById('0090704').value
        if (I0090704) {
          idImpuestos.push({id: 19, val: V0090704});
        }else{
          removI.push({id: 19});
        }
        let I00913 = document.getElementById('I00913').checked;
        let V00913 = document.getElementById('00913').value
        if (I00913) {
          idImpuestos.push({id: 20, val: V00913});
        }else{
          removI.push({id: 20});
        }
        let I0091301 = document.getElementById('I0091301').checked;
        let V0091301 = document.getElementById('0091301').value
        if (I0091301) {
          idImpuestos.push({id: 21, val: V0091301});
        }else{
          removI.push({id: 21});
        }
        let I0010804 = document.getElementById('I0010804').checked;
        let V0010804 = document.getElementById('0010804').value
        if(I0010804){
          idImpuestos.push({id: 22, val: V0010804});
        }else{
          removI.push({id: 22});
        }
        let I0010101 = document.getElementById('I0010101').checked;
        let V0010101 = document.getElementById('0010101').value
        if(I0010101){
          idImpuestos.push({id: 23, val: V0010101});
        }else{
          removI.push({id: 23});
        }
        let I21173001001 = document.getElementById('I21173001001').checked;
        let V21173001001 = document.getElementById('21173001001').value
        if (I21173001001) {
          idImpuestos.push({id: 24, val: V21173001001});
        }else{
          removI.push({id: 24});
        }

        const bodyJSON = {
          CTA: CTA,
          calle: calle,
          numero: numCalle,
          colonia: colonia,
          cp: cp,
          municipio: municipio,
          localidad: localidad,
          periodo: periodo,
          m1: m1,
          m2: m2,
          zona: zona,
          bg: bg,
          total: totalN,
          tp: tipoPredio,
          idImpuestos: idImpuestos,
          removI: removI
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
              if(r.exito===0){
                //let pubKey = publicKey();
                
                
                
                // Generate RSA key pair, default key size is 4096 bit
               /* rsa.generateKeyPair(function(keyPair) {
                  // Callback function receives new key pair as a first argument
                  publicKey = keyPair.publicKey;
                  privateKey = keyPair.privateKey;
                  console.log(privateKey);
                  console.log(publicKey);
                  let encrypted = crypt.encrypt(publicKey, message);
                  console.log(encrypted);
                  //let encrypted ='';

                  // Decrypt encryped message with private RSA key
                  let decrypted = crypt.decrypt(privateKey, encrypted);

                  // Get decrypted message
                  message = decrypted.message;
                  console.log(decrypted.message);
                });*/

                
                const nombre = document.getElementById('nombre').value;
                const tipoP = tipoPredio === 'u' ? 'URBANO' : 'RUSTICO'
                let url = `#/admin/orden`
                let subUrl = `?bandPdf=1&CTA=${CTA}&nombre=${nombre}&calle=${calle}&numero=${numCalle}`
                subUrl += `&colonia=${colonia}&cp=${cp}&municipio=${municipio}&localidad=${localidad}&tipoP=${tipoP}`
                subUrl += `&bg=${bg}&total=${totalN}&periodo=${periodo}&V0020401=${V0020401}&V0020402=${V0020402}&V0020403=${V0020403}`
                subUrl += `&V0020801=${V0020801}&V0020802=${V0020802}&V0020803=${V0020803}&V0020804=${V0020804}&V0030101=${V0030101}`
                subUrl += `&V0070101=${V0070101}&V0070201=${V0070201}&V0070202=${V0070202}&V0070203=${V0070203}&V0090101=${V0090101}`
                subUrl += `&V0090106=${V0090106}&V0090107=${V0090107}&V0090701=${V0090701}&V0090702=${V0090702}&V0090703=${V0090703}`
                subUrl += `&V0090704=${V0090704}&V00913=${V00913}&V0091301=${V0091301}&V0010804=${V0010804}&V0010101=${V0010101}`
                subUrl += `&V21173001001=${V21173001001}`
                
                url += `?v=${encrypt(subUrl)}`;
                const win = window.open(url, '_blank');
                win.focus();
               // orden.style.display = 'none'
               // ReactDOM.render(<Pdf calle='11 Norte' />,document.getElementById("pdfView"))
              }             
            }
            
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}


getParameterByName=(name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
selectionStartNombre = 0
selectionEndNombre = 0
handleNombre = e => {
  this.selectionStartNombre=e.target.selectionStart
  this.selectionEndNombre=e.target.selectionEnd
  if(e.which>47||e.which===32){
    let c = null
    switch(e.which){
      case 192:
        c = 'Ñ'
        break;
      case 190:
        c = '.'
        break;
      case 189:
        c = '-'
      break;
      default: 
      c=String.fromCharCode(e.which);
      break;
    }
    const val = e.target.value.splice(this.selectionStartNombre, 0, c);
    this.setState({nombre: val})
  }else
  if(e.which===8){
    
    let val = ''
    if (this.selectionStartNombre === this.selectionEndNombre){
      this.selectionEndNombre-=1
      this.selectionStartNombre-=1
      val = e.target.value.slice(this.selectionStartNombre - this.selectionEndNombre, this.selectionStartNombre);
      val += e.target.value.slice(this.selectionStartNombre + 1);
    }else{
     // this.selectionStartNombre += 1
      val = e.target.value.slice(0, this.selectionStartNombre);
      val += e.target.value.slice(this.selectionEndNombre);
      this.selectionEndNombre = this.selectionStartNombre
    }
      this.setState({nombre: val})  
  }
  
}

handleNombreUp = e => {
  if (e.which > 47 || e.which === 32) {
    e.target.setSelectionRange(this.selectionStartNombre+1, this.selectionEndNombre+1);
  } else if (e.which === 8){
    e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
  }
}

//upBand = false
handleKup = event => {
  //console.log(event.which)
  if (event.which===13){
  //  this.upBand = true
    //this.setState({openDash: event.currentTarget});
  }
}

handleCloseDash = () => {
  this.setState({
    openDash: null
  })
};

changeDash = event => {
  const {openDash} = this.state;
  if (openDash && openDash.contains(event.target) ) {
    //setOpenDash(null);
    this.setState({openDash: null});
  } else {
    //setOpenDash(event.currentTarget);
    this.setState({openDash: event.currentTarget});
  }
}

handleClickDash = event => {
  this.changeDash(event);
};

handleCloseZona = () => {
  this.setState({
    openZona: null
  })
};

changeZona = event => {
  const {openZona} = this.state;
  if (openZona && openZona.contains(event.target)) {
    this.setState({openZona: null});
  } else {
    this.setState({openZona: event.currentTarget});
  }
}

handleClickZona = event => {
  if (this.state.CBG) {
    return false;
  }
  this.changeZona(event);
};

handleKeyZona = event => {
  if (this.state.CBG) {
    return false;
  }
  this.setState({openZona: event.currentTarget});
};

handleUpper = e => {
  e.target.value = e.target.value.toUpperCase()
}
blurCalle = e => {
  //console.log(e.target.value)
}

searchU = () => {
    //const idEmpleado = document.getElementById('idEmpleado').value
    const {idUsuario} = this.state
    if(idUsuario!==''){
      const idQuincena = this.getParameterByName('idQuincena');
      if(idQuincena!==''){
        window.history.pushState(null, 'Buscar usuario', `#/admin/creditos?idQuincena=${idQuincena}&idUsuario=${idUsuario}`)
      }else{
        window.history.pushState(null, 'Buscar usuario', `#/admin/creditos?idUsuario=${idUsuario}`)
      }
    }else{
      window.history.pushState(null, 'Buscar usuario', `#/admin/creditos`)
    }
    
    window.history.go()
}

buscarCTA = (key) => (event) => {
  const CTAnombre = document.getElementById('CTANM').value;
  const checkU = document.getElementById('check0');
  const checkR = document.getElementById('check1');
  
  //nombre.value = 'Victor'
  
  if (checkU.checked){
    if (CTAnombre!==''){
      this.padrones(CTAnombre,'u',key)
    }
  }else{
    if (CTAnombre!==''){
      this.padrones(CTAnombre,'r',key)
    }
  }
  //console.log(checkU.checked)
  //console.log(checkR.checked)
}

calcB = (e)=>{
  const cbg = document.getElementById('cbg0')
  const band = cbg.checked !== this.state.CBG ? cbg.checked : !cbg.checked
  this.setState({CBG: band}) 
}

zonaHandle = (n) => (e) => {
  this.setZona(n);
}

setZona = async(n) => {
  
  const checkU = document.getElementById('check0');
  const bg = document.getElementById('baseGravable');
  const m1 = document.getElementById('m1').value;
  const m2 = document.getElementById('m2').value;
  const prol1 = document.getElementById('0070201');
  const prol2 = document.getElementById('0070202');
  const task = [0, 1];
  const p1 = m1 * m2;
  let uma = 84.49 * n; 
  let subStr = uma.toString().split(".");
  uma = parseInt(subStr[0]);
  bg.value=p1*uma;
  subStr = bg.value.split(".");
  bg.value=parseInt(subStr[0]);
  let pb = bg.value * 0.004;
  subStr = pb.toString().split(".");
  pb = parseInt(subStr[0]);
  let pro1 = pb * 0.15;
  subStr = pro1.toString().split(".");
  pro1 = parseInt(subStr[0]);
  const pro2 = pro1;
  const t = pb + pro1 + pro2;
  
  if (checkU.checked){
    const urb = document.getElementById('0020401');
    const rus = document.getElementById('0020403');
  //  const subIm0 = document.getElementById('subIm0');
  //  const subIm1 = document.getElementById('subIm1');
    urb.value = pb;
    rus.value = 0
    renderCI('subIm0',task,6,[0],['41121001','41121001'],
              ['URBANOS EDIFICADOS DESTINADOS A CASA HABITACION',
               'SUB URBANOS EDIFICADOS DESTINADOS A CASA HABITACION'
              ],['0020401','0020402'],this.addImpuesto);
    renderCI('subIm1', task,6, [], ['41121001', '41121001'],
      ['RUSTICOS EDIFICADOS DESTINADOS A CASA HABITACION',
        'PENSIONADOS Y JUBILADOS'
      ], ['0020403', '0020801'], this.addImpuesto);

  }else{
    const rus = document.getElementById('0020403');
    const urb = document.getElementById('0020401');
    rus.value = pb;
    urb.value = 0;
    renderCI('subIm1', task, 6, [0], ['41121001', '41121001'],
      ['RUSTICOS EDIFICADOS DESTINADOS A CASA HABITACION',
        'PENSIONADOS Y JUBILADOS'
      ], ['0020403', '0020801'], this.addImpuesto);
    renderCI('subIm0', task, 6, [0], ['41121001', '41121001'],
      ['URBANOS EDIFICADOS DESTINADOS A CASA HABITACION',
        'SUB URBANOS EDIFICADOS DESTINADOS A CASA HABITACION'
      ], ['0020401', '0020402'], this.addImpuesto);
  }

  prol1.value = pro1;
  prol2.value = pro2;
  renderCI('subAcc0', task, 6, [1], ['41171001', '41171001'],
    ['RECARGOS PREDIAL',
      '15% PRO EDUCACION Y ASISTENCIA SOCIAL'
    ], ['0070101', '0070201'], this.addImpuesto);
  renderCI('subAcc1', task, 6, [0], ['41171001', '41171001'],
    ['15% PRO CAMINOS',
      'DESCUENTO PREDIAL DE NATURALEZA DEUDORA'
    ], ['0070202', '0070203'], this.addImpuesto);

  this.setState({zona: n, totalN: t})
}

addImpuesto = (id) => {
    //console.log(`id: ${id}`);
    if(id === '0070201'||id === '0070202'){
      const vi = document.getElementById(id);
      const bg = document.getElementById('baseGravable').value;
      let t = (bg * 0.004)*0.15;
      t = t.toString().split('.')[0]
      vi.value=t;
    }
    if (id === '0020401' || id === '0020402' || id === '0020403') {
        const {tipoPredio} = this.state;
        const bg = document.getElementById('baseGravable').value;
        let t = (bg * 0.004);
        t = t.toString().split('.')[0]
        const vi = document.getElementById(id);
        if (tipoPredio === 'u' && id !== '0020403') {
          vi.value = t;
        } else if (tipoPredio === 'r' && id !== '0020401' && id !== '0020402') {
          vi.value = t;
        }
    }
}

render() {
  const {bandPdf} = this.props
  const {classes} = this.props;
  const {classesM} = this.props;
  if(bandPdf==='1'){
    const {CTA} = this.props;
    const {nombre} = this.props;
    const {calle} = this.props;
    const {numero} = this.props;
    const {colonia} = this.props;
    const {cp} = this.props;
    const {municipio} = this.props;
    const {localidad} = this.props;
    const {tipoP} = this.props;
    const {bg} = this.props;
    const {periodo} = this.props;
    const {total} = this.props;
    const {V0020401,V0020402,V0020403,V0020801,V0020802,
           V0020803,V0020804,V0030101,V0070101,V0070201,
           V0070202,V0070203,V0090101,V0090106,V0090107,
           V0090701,V0090702,V0090703,V0090704,V00913,
           V0091301,V0010804,V0010101,V21173001001} = this.props;
    
     return(<Pdf classes={classes} CTA={CTA} nombre={nombre} 
                 calle={calle} numero={numero} colonia={colonia}
                 cp={cp} municipio={municipio} localidad={localidad}
                 tipoP={tipoP} bg={bg} periodo={periodo} total={total}
                 V0020401={V0020401} V0020402={V0020402} V0020403={V0020403}
                 V0020801={V0020801} V0020802={V0020802} V0020803={V0020803}
                 V0020804={V0020804} V0030101={V0030101} V0070101={V0070101}
                 V0070201={V0070201} V0070202={V0070202} V0070203={V0070203}
                 V0090101={V0090101} V0090106={V0090106} V0090107={V0090107} 
                 V0090701={V0090701} V0090702={V0090702} V0090703={V0090703}
                 V0090704={V0090704} V00913={V00913} V0091301={V0091301}
                 V0010804={V0010804} V0010101={V0010101} V21173001001={V21173001001} /> )
  }else
  if(bandPdf==='0'){
    const {CTA} = this.state
    const {nombre} = this.state
    const {calle} = this.state;
    const {openDash} = this.state;
    const {openZona} = this.state;
    const {lastD} = this.state;
    const {Y} = this.state;
    const {totalN} = this.state;
    const {CBG} = this.state;
    const {zona} = this.state;
    return (
      <CardIcon>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>PREDIAL</h4>
                <p className={classes.cardCategoryWhite}>
                  Orden de pago
                </p>
              </CardHeader>
              <CardBody>
                {/*<Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Salary", "Country"]}
                  tableData={[
                    r1
                  ]}
                />*/              
                }
                <div id='pdfView' />
                <div id='bodyOrden' >
                <div className={classes.searchWrapper}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        formControlProps={{
                          className: classes.margin + " " + classes.search 
                        }}
                        id='CTANM'
                        inputProps={{
                          placeholder: "Buscar propietario",
                          type: 'text',
                          onKeyUp: this.handleUpper,
                          //value: idUsuario,
                          
                          inputProps: {
                            "aria-label": "Search"
                          }
                        }}
                      />
                      <Button color="white" onClick={this.handleClickDash} aria-label="edit"
                      aria-owns={openDash ? "profile-menu-list-grow" : null}
                      aria-haspopup="true"
                      justIcon round>
                        <Search />
                      </Button>
                      
                      <Poppers
                        open={Boolean(openDash)}
                        anchorEl={openDash}
                        transition
                        disablePortal
                        className={
                          classNames({ [classesM.popperClose]: !openDash }) +
                          " " +
                          classesM.popperNav
                        }
                        style={{zIndex: 9999}}
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            id="profile-menu-list-grow"
                            style={{
                              transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom"
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={this.handleCloseDash}>
                                  <MenuList role="menu">
                                    <MenuItem key={'cuenta'}
                                      className={classesM.dropdownItem}
                                      onClick={this.buscarCTA(0)}
                                    >
                                      Por CTA. 
                                    </MenuItem>
                                    <MenuItem key={'nombre'}
                                      className={classesM.dropdownItem}
                                      onClick={this.buscarCTA(1)}
                                    >
                                      Por nombre 
                                    </MenuItem>
                                  </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Poppers>
                  </GridItem>
                  <GridContainer>

                      <Checker
                        checkedIndexes={[0]}
                        tasksIndexes={[0, 1]}
                        strs={['URBANO','RUSTICO']}
                        ids={['check','check']}
                      />

                  </GridContainer>
                  </GridContainer>
                </div>
                <div>
                  
                  <GridContainer>
                  
                    <GridItem xs={12} sm={12} md={5}>
                      
                    <CustomInput
                      labelText="NOMBRE O RAZON SOCIAL:"
                      id="nombre"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps = {{
                        type: 'text',
                        //defaultValue: ' '
                        value: nombre,
                        onKeyDown: this.handleNombre,
                        onKeyUp: this.handleNombreUp
                      /* onClick: getinfoReg,
                        onChange: getinfoReg*/
                      }}
                    />
                  </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="CALLE:"
                        id="calle"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'text',
                          defaultValue: '\0',
                          //style: {"textTransform": "uppercase"}
                          onKeyUp: this.handleUpper,
                          onBlur: this.blurCalle,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        labelText="NUMERO:"
                        id="numCalle"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'text', 
                          defaultValue: '\0'
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="COLONIA:"
                        id="colonia"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'text',
                          defaultValue: '\0',
                          onKeyUp: this.handleUpper
                        /* onClick: getinfoReg,
                          onChange: getinfoReg*/
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        labelText="C.P:"
                        id="cp"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'number',
                          defaultValue: 0
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="MUNICIPIO:"
                        id="municipio"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'text',
                          defaultValue: '\0',
                          onKeyUp: this.handleUpper
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="LOCALIDAD:"
                        id="localidad"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'text',
                          defaultValue: '\0',
                          onKeyUp: this.handleUpper
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  
                  <GridContainer >
                        
                        <Checker
                          checkedIndexes={[]}
                          tasksIndexes={[0]}
                          strs={['CALCULAR BASE GRAVABLE']}
                          ids={['cbg']}
                          fa = {this.calcB}
                        />
                         
                  </GridContainer>
                 
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="M1:"
                        id="m1"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'number',
                          defaultValue: 0,
                          onChange: (e)=>{ this.setZona(document.getElementById('zona').value) },
                          disabled: CBG
                        }}
                      />
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="M2:"
                        id="m2"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'number',
                          defaultValue: 0,
                          onChange: (e)=>{ this.setZona(document.getElementById('zona').value) },
                          disabled: CBG
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="ZONA:"
                        id="zona"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'number', 
                          onKeyUp: this.handleKeyZona,
                          onClick: this.handleClickZona,
                          value: zona,
                          disabled: CBG
                        }}
                      />

                      <Poppers
                        open={Boolean(openZona)}
                        anchorEl={openZona}
                        transition
                        disablePortal
                        className={
                          classNames({ [classesM.popperClose]: !openZona }) +
                          " " +
                          classesM.popperNav
                        }
                        style={{zIndex: 9999}}
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            id="profile-menu-list-grow"
                            style={{
                              transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom"
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={this.handleCloseZona}>
                                  <MenuList role="menu">
                                    <MenuItem key={'zona1-1'}
                                      className={classesM.dropdownItem}
                                      onClick={this.zonaHandle(3)}
                                    >
                                      3 (Zona 1) 
                                    </MenuItem>
                                    <MenuItem key={'zona1-2'}
                                      className={classesM.dropdownItem}
                                      onClick={this.zonaHandle(2.5)}
                                    >
                                      2.5 (Zona 1)
                                    </MenuItem>
                                    <MenuItem key={'zona2'}
                                      className={classesM.dropdownItem}
                                      onClick={this.zonaHandle(2)}
                                    >
                                      2 (Zona 2)
                                    </MenuItem>
                                    <MenuItem key={'zona3'}
                                      className={classesM.dropdownItem}
                                      onClick={this.zonaHandle(1.5)}
                                    >
                                      1.5 (Zona 3)
                                    </MenuItem>
                                  </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Poppers>

                    </GridItem>

                  </GridContainer>
                  <GridContainer>
            
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="BASE GRAVABLE:"
                        id="baseGravable"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'number',
                          defaultValue: 0
                        // onClick: getinfoReg,
                        //  onChange: getinfoReg
                        }}
                      />
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="NUMERO DE CUENTA:"
                        id="CTA"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'number',
                          value: CTA
                        /* onClick: getinfoReg,
                          onChange: getinfoReg*/
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="PERIODO DE PAGO:"
                        id="periodo"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'text',
                          defaultValue: Y
                        /* onClick: getinfoReg,
                          onChange: getinfoReg*/
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="PAGUESE LA CANTIDAD DE:"
                        id="cantidadPago"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'number',
                          value: totalN
                        }}
                      />
                    </GridItem>    

                  </GridContainer>
                </div>
                <div style={{height: 40}} />
  
                <Impuestos classes={classes} fa={this.addImpuesto} />

                <div style={{height: 40}} />

                <div>
                  <GridContainer>
                            
                      <Button id = 'regB'
                        color="success"
                        style = {
                          {
                            display: 'flex',
                            flex: 1,
                            alignItems: 'center'
                          }
                        }
                        onClick = {this.registrarO}
                        >
                        GENERAR ORDEN DE PAGO
                      </Button>
                                        
                  </GridContainer>
                </div>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          {/*<GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Used Space</p>
                <h3 className={classes.cardTitle}>
                  49/50 <small>GB</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>*/}
          
          <GridItem xs={12} sm={6} md={12}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <LocalAtm />
                </CardIcon>
                <p className={classes.cardCategory}>IMPORTE NETO: </p>
                <h3 className={classes.cardTitle}>{`$`}{totalN}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  {`Periodo ${Y}`}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          {/*
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <LocalAtm />
                </CardIcon>
                <p className={classes.cardCategory}>Seguro de daños FOVISSTE</p>
                <h3 className={classes.cardTitle}>{`TOTAL: $`}{totalS}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Últimos {lastD} meses
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Fixed Issues</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Followers</p>
                <h3 className={classes.cardTitle}>+245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          */}
          {/*
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={creditoFovisste.data}
                  type="Line"
                  options={creditoFovisste.options}
                  listener={creditoFovisste.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Credito FOVISSTE</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> {porcentajeC}%
                  </span>{" "}
                  créditos por quincena.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Créditos de 2019
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          </GridContainer>
          <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={seguroFovisste.data}
                  type="Bar"
                  options={seguroFovisste.options}
                  responsiveOptions={seguroFovisste.responsiveOptions}
                  listener={seguroFovisste.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Seguro de daños FOVISSTE</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> {porcentajeS}%
                  </span>{" "}
                  seguro por quincena.</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Seguros de 2019
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>Last Campaign Performance</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>*/
          }
        </GridContainer>
        
      </CardIcon>
    )
  }
}


}