import React from 'react';
// react plugin for creating charts
// @material-ui/core
//import { makeStyles } from "@material-ui/core/styles";
//import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import LocalAtm from "@material-ui/icons/LocalAtm";
//import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import CheckCircle from "@material-ui/icons/CheckCircle"
//import LocalOffer from "@material-ui/icons/LocalOffer";
//import Update from "@material-ui/icons/Update";
import Pdf from "./renderPDF.js";
//import Accessibility from "@material-ui/icons/Accessibility";
//import BugReport from "@material-ui/icons/BugReport";
//import Code from "@material-ui/icons/Code";
//import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Snackbar from 'components/Snackbar/Snackbar';
//import Tasks from "components/Tasks/Tasks.js";
//import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ip from "variables/ip.js";
//import { Crypt, RSA } from "hybrid-crypto-js";
import encrypt from "./encrypt";
import setZona from "./setZona";
import saveDataL from "./saveDataL";
import setTC from "./setTC";
import setBg from "./setBg";
import GridsOrden from "./GridsOrden";

//import genImp from './genImp.js';
import getPredial from './getPredial';
import clearCheck from './clearCheck.js';
import sumaT from './sumaT.js';
import changeI from './changeI.js';
import rezago from './rezago.js';
import clearCheckCP from './clearCheckCP.js';


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
    center: {
      lat: 17.5949479040048,
      lng: -99.1806074659651
    },
    centerP: {
      lat: 17.5949479040048,
      lng: -99.1806074659651
    },
    zoom: 50,
    CTA: '',
    calle: '',
    tipoPredio: '',
    classes: null,
    openDash: null,
    openZona: null,
    openTC: null,
    openCTA: null,
    lastD: null,
    ctasIndexes: [],
    Y: 0,
    totalN: 0,
    CBG: true,
    zona: 0,
    tc: 0,
    readOnly: false,
    disabledReg: false,
    trA: false
}
map = null;
google = null;
markersC = [];
markersT = [];
markerInfo = null;
infoWindow=null;
polylines = [];
widthPol = [];
polygonC = null;
polygonT = null;
bandC = false;
bandT = false;
polyC=null;
polyT=null;
street = '';
barr = '';
saveZ = 0;
constructor(props){
    super(props);
    const date = new Date()
    this.state = {
      nombre: "",
      center: {
        lat: 17.594955957692278,
        lng: -99.18065842793638
      },
      centerP: {
        lat: 17.594955957692278,
        lng: -99.18065842793638
      },
      zoom: 19,
      CTA: "",
      calle: "",
      tipoPredio: "",
      classes: props.classes,
      openDash: null,
      openZona: null,
      openTC: null,
      openCTA: null,
      lastD: date,
      ctasIndexes: [],
      Y: date.getFullYear(),
      totalN: 0.0,
      CBG: true,
      zona: 0,
      tc: 0,
      readOnly: this.props.idRol==='0',
      disabledReg: false,
      trA: false
      /*
      checkeds: {
        I0020401: false,
        I0020402: false,
        I0020403: false,
        I0020801: false,
        I0020802: false,
        I0020803: false,
        I0020804: false,
        I0030101: false,
        I0070101: false,
        I0070201: false,
        I0070202: false,
        I0070203: false,
        I0090101: false,
        I0090106: false,
        I0090107: false,
        I0090701: false,
        I0090702: false,
        I0090703: false,
        I0090704: false,
        I00913: false,
        I0091301: false,
        I0010804: false,
        I0010101: false,
        I21173001001: false

      }*/
    };
//    this.obtenerQ(this.state.idUsuario,this.state.idQuincena)
}

deg2rad = (degrees) => {
        const pi = Math.PI;
        return degrees * (pi / 180);
    }
    calcP = (l) => {
        //if(l>0){
            console.log(this.markers[l-1].position.lat())
            console.log(this.markers)
            const rlat0 = this.deg2rad(this.markers[l - 1].position.lat());
            const rlng0 = this.deg2rad(this.markers[l - 1].position.lng());
            const rlat1 = this.deg2rad(this.markers[l].position.lat());
            const rlng1 = this.deg2rad(this.markers[l].position.lng());

            const latDelta = rlat1 - rlat0;
            const lonDelta = rlng1 - rlng0;
            
            const distance = (6371000 *
              Math.acos(
                Math.cos(rlat0) * Math.cos(rlat1) * Math.cos(lonDelta) +
                Math.sin(rlat0) * Math.sin(rlat1)
              )
            );
            const distance2 = 6371 * 2 * Math.asin(
              Math.sqrt(
                Math.cos(rlat0) * Math.cos(rlat1) * Math.pow(Math.sin(lonDelta / 2), 2) +
                Math.pow(Math.sin(latDelta / 2), 2)
              )
            );
            console.log(`distance: ${this.round(distance, 0)}`)
            console.log(`distance: ${distance2}`)
            return this.round(distance, 0);
        //}
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

padrones=async(CTAnombre, tp, tipoB, dateUp)=>{
    try {

       //const sendUri = "http://localhost:3015/";
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
              const {Y} = this.state
              //const predial = r.predial
              
                this.setState({
                 // nombre: contribuyente.contribuyente,
                  CTA: contribuyente.CTA
                })
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
                this.setState({ctasIndexes: ctasIndexes, tipoPredio: tp})
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
                  clearCheck(this)
                  dateUpL.value = ''
                  this.setState({tc: 0, zona: 0, totalN: 0});

                  return false;
                }
                m1.value = orden.m1
                m2.value = orden.m2
                let tzoffset = (new Date()).getTimezoneOffset() * 60000;
                dateUp = new Date(orden.dateUp)-tzoffset
                dateUp = new Date(dateUp)
                if ((parseInt(Y)) > parseInt(dateUp.getFullYear())){
                 // dateUp = new Date(Date.now() - tzoffset)
                }else{
                  dateUpL.value = dateUp.toISOString().slice(0, -1)
                  regB.innerHTML = 'ACTUALIZAR ORDEN DE PAGO'
                }
                periodo.value = orden.periodo
                this.setState({tc: orden.tc, zona: orden.zona, totalN: orden.total});
               // this.setState({totalN: orden.total});
                //if(checkU.checked){
                
                bg.value = orden.bg;
                getPredial(orden.idOrden,tp,this)
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

registrarO=async()=>{
    try {

        //const sendUri = "http://localhost:3016/";
        this.setState({disabledReg:true})
        const sendUri = ip('3016');
        const CTA = document.getElementById('CTA').value;
        const calle = document.getElementById('calle').value;
        let lote = document.getElementById('lote').value;
        let manzana = document.getElementById('manzana').value;
        let numCalle = document.getElementById('numCalle').value;
        const colonia = document.getElementById('colonia').value;
        let cp = document.getElementById('cp').value;
        const municipio = document.getElementById('municipio').value;
        const localidad = document.getElementById('localidad').value;
        const bg = document.getElementById('baseGravable').value;
        const periodo = document.getElementById('periodo').value;
        const dateUp = document.getElementById('dateUp');
        const {totalN} = this.state;
        const m1 = document.getElementById('m1').value;
        const m2 = document.getElementById('m2').value;
        const tc = document.getElementById('tc').value;
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
        if (I0020801 || V0020801 !== '0') {
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
          lote: lote,
          manzana: manzana,
          numero: numCalle,
          colonia: colonia,
          cp: cp,
          municipio: municipio,
          localidad: localidad,
          periodo: periodo,
          dateUp: dateUp.value,
          m1: m1,
          m2: m2,
          tc: tc,
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
            console.log(r)
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

                this.showNotification("trA")
                const nombre = document.getElementById('nombre').value;
                const tipoP = tipoPredio === 'u' ? 'URBANO' : 'RUSTICO'
                let url = `#/admin/orden`
                if(lote==='0'){
                  lote=''
                }
                if(manzana==='0'){
                  manzana=''
                }
                if(numCalle==='0'){
                  numCalle = ''
                }
                if(cp==='0'){
                  cp = ''
                }
                let folio = r.folio ? r.folio.toString():''
                while (folio.length<5){
                  folio = `0${folio}`
                }
                let tzoffset = (new Date()).getTimezoneOffset() * 60000; 
                let d = new Date(r.dateUp) - tzoffset
                d = new Date(d)
                dateUp.value = d.toISOString().slice(0, -1)
                let subUrl = `?bandPdf=1&CTA=${CTA}&folio=${folio}&nombre=${nombre}&calle=${calle}&lote=${lote}&manzana=${manzana}&numero=${numCalle}`
                subUrl += `&colonia=${colonia}&cp=${cp}&municipio=${municipio}&localidad=${localidad}&tipoP=${tipoP}`
                subUrl += `&bg=${bg}&total=${totalN}&periodo=${periodo}&dateUp=${dateUp.value}&V0020401=${V0020401}&V0020402=${V0020402}&V0020403=${V0020403}`
                subUrl += `&V0020801=${V0020801}&V0020802=${V0020802}&V0020803=${V0020803}&V0020804=${V0020804}&V0030101=${V0030101}`
                subUrl += `&V0070101=${V0070101}&V0070201=${V0070201}&V0070202=${V0070202}&V0070203=${V0070203}&V0090101=${V0090101}`
                subUrl += `&V0090106=${V0090106}&V0090107=${V0090107}&V0090701=${V0090701}&V0090702=${V0090702}&V0090703=${V0090703}`
                subUrl += `&V0090704=${V0090704}&V00913=${V00913}&V0091301=${V0091301}&V0010804=${V0010804}&V0010101=${V0010101}`
                subUrl += `&V21173001001=${V21173001001}`
                url += `?v=${encrypt(subUrl)}`;
                const win = window.open(url, '_blank');
                win.focus();
                saveDataL(CTA,this.street,this.barr,this.state.zona,tipoPredio,this)
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
  this.setState({nombre: e.target.value}) 
  /*
  if (e.which > 47 || e.which === 32) {
    e.target.setSelectionRange(this.selectionStartNombre+1, this.selectionEndNombre+1);
  } else if (e.which === 8){
    e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
  }*/
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

handleCloseTC = () => {
  this.setState({
    openTC: null
  })
};

changeTC = event => {
  const {openTC} = this.state;
  if (openTC && openTC.contains(event.target)) {
    this.setState({openTC: null});
  } else {
    this.setState({openTC: event.currentTarget});
  }
}

handleClickTC = event => {
  if (this.state.CBG) {
    return false;
  }
  this.changeTC(event);
};

handleKeyTC = event => {
  if (this.state.CBG) {
    return false;
  }
  this.setState({openTC: event.currentTarget});
};

handleCloseCTA = () => {
  this.setState({
    openCTA: null
  })
};

changeCTA = event => {
  const {openCTA} = this.state;
  if (openCTA && openCTA.contains(event.target)) {
    this.setState({openCTA: null});
  } else {
    this.setState({openCTA: event.currentTarget});
  }
}

handleClickCTA = event => {
  this.changeCTA(event);
};

handleKeyCTA = event => {
  this.setState({openCTA: event.currentTarget});
};

handleUpper = e => {
  if(e.which===32||e.which>39){
    this.selectionStartNombre = e.target.selectionStart
    this.selectionEndNombre = e.target.selectionEnd
    e.target.value = e.target.value.toUpperCase()
    e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
  }
}
blurCalle = e => {
  //console.log(e.target.value)
}

buscarCTA = (key) => (event) => {
  let CTAnombre = document.getElementById('CTANM');
  const checkU = document.getElementById('check0');
  CTAnombre.placeholder = key===0?'CTA':'NOMBRE'
  
  if (CTAnombre !== '') {
    if (checkU.checked){
        this.padrones(CTAnombre.value, 'u', key, '')
    }else{
        this.padrones(CTAnombre.value, 'r', key, '')
    }
  }
}

rebuscarCTA = (key, CTA) => (e) => {
  const checkU = document.getElementById('check0');
  this.handleCloseCTA()
  if (checkU.checked) {
    if (CTA !== '') {
      this.padrones(CTA, 'u', key)
    }
  } else {
    if (CTA !== '') {
      this.padrones(CTA, 'r', key)
    }
  }
}

calcB = (e)=>{
  const cbg = document.getElementById('cbg0')
  const band = cbg.checked !== this.state.CBG ? cbg.checked : !cbg.checked
  this.setState({CBG: band}) 
}

tcHandle = (n) => (e) => {
  this.setTC(n);
}

zonaHandle = (n) => (e) => {
  this.setZona(n);
}

setTC = async (n) => {
  this.handleCloseTC()
  setTC(n, this)
}

setZona = async(n) => {
  this.handleCloseZona()
  setZona(n,this)
}

setBg = async () => {
  setBg(this)
}

addImpuesto = (id) => {
    //console.log(`id: ${id}`);
    if(id === '0070201'||id === '0070202'){
      const vi = document.getElementById(id);
      const bg = document.getElementById('baseGravable').value;
      let t = (bg * 0.004)*0.15;
      t = Math.round(t)
      vi.value=t;
    }else
    if (id === '0020401' || id === '0020402' || id === '0020403') {
        const {tipoPredio} = this.state;
        const bg = document.getElementById('baseGravable').value;
        let t = (bg * 0.004);
        t = Math.round(t)
        const vi = document.getElementById(id);
        if (tipoPredio === 'u' && id !== '0020403') {
          vi.value = t;
        } else if (tipoPredio === 'r' && id !== '0020401' && id !== '0020402') {
          vi.value = t;
        }
    } else {
      changeI(id,this)
    } 
    sumaT(this)
}

sumaT=async()=>{
  sumaT(this);
}

setZero=async(id)=>{
  const i = document.getElementById(id);
  i.blur();
  i.value = 0;
  sumaT(this);
}

showNotification = place => {
const {trA} = this.state
  switch (place) {
      case "trA":
      if (!trA) {
        this.setState({trA: true})
        setTimeout(() => {
          this.setState({trA: false})
        }, 6000);
      }
      break;
    default:
      break;
  }
};

blurPeriodo=(e)=>{
  rezago(this,e.target.value)
  sumaT(this);
}

componentDidMount(){
  const {bandPdf,bandCTA,genCTA,tp,dateUp} = this.props
  const checks = tp === 'u' || tp === '' ? [0] : [1]
  if (bandPdf !== '1') {
    clearCheckCP(checks)
  }
  if (bandCTA==='1'){
    document.getElementById('CTANM').value=genCTA
    this.padrones(genCTA, tp, 0,dateUp)
    
  }
  
}

render() {
  const {bandPdf} = this.props
  const {classes} = this.props;
  if(bandPdf==='1'){
    const {CTA} = this.props;
    const {folio} = this.props;
    const {nombre} = this.props;
    const {calle} = this.props;
    const {lote} = this.props;
    const {manzana} = this.props;
    const {numero} = this.props;
    const {colonia} = this.props;
    const {cp} = this.props;
    const {municipio} = this.props;
    const {localidad} = this.props;
    const {tipoP} = this.props;
    const {bg} = this.props;
    const {periodo} = this.props;
    const {dateUp} = this.props;
    const {total} = this.props;
    const {V0020401,V0020402,V0020403,V0020801,V0020802,
           V0020803,V0020804,V0030101,V0070101,V0070201,
           V0070202,V0070203,V0090101,V0090106,V0090107,
           V0090701,V0090702,V0090703,V0090704,V00913,
           V0091301,V0010804,V0010101,V21173001001} = this.props;
    
     return(<Pdf classes={classes} CTA={CTA} folio={folio} nombre={nombre} 
                 calle={calle} lote={lote} manzana={manzana} numero={numero} colonia={colonia}
                 cp={cp} municipio={municipio} localidad={localidad}
                 tipoP={tipoP} bg={bg} periodo={periodo} dateUp={dateUp} total={total}
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
    const {Y, trA} = this.state;
    const {totalN} = this.state;
    return (
      <CardIcon>
        <Snackbar
          place="tr"
          color="success"
          icon={CheckCircle}
          message='Orden registrada con éxito'
          open={trA}
          closeNotification={() => this.setState({trA: false})}
          close
        />
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
                  
                  <GridsOrden c={this} />
                
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