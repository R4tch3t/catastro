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
import {isMobile} from "react-device-detect";
//import { Crypt, RSA } from "hybrid-crypto-js";
import setZona from "./setZona";
import setTC from "./setTC";
import setBg from "./setBg";
import GridsOrden from "./GridsOrden";

//import genImp from './genImp.js';
import sumaT from './sumaT.js';
import changeI from './changeI.js';
import rezago from './rezago.js';
import clearCheckCP from './clearCheckCP.js';
import clearCheckM from './clearCheckM.js';
import registrarO from './registrarO.js';
import padrones from './padrones.js';
import registrarF from './registrarF.js';


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
    openCalendar: null,
    openZona: null,
    openTC: null,
    openCTA: null,
    lastD: null,
    currentD: null,
    ctasIndexes: [],
    Y: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
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
idOrden=0;
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
      openCalendar: null,
      openZona: null,
      openTC: null,
      openCTA: null,
      lastD: date,
      currentD: date,
      ctasIndexes: [],
      Y: date.getFullYear(),
      horas: date.getHours(),
      minutos: date.getUTCMinutes(),
      segundos: date.getSeconds(),
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



padrones=async(CTAnombre, tp, tipoB, idOrden)=>{
   padrones(CTAnombre, tp, tipoB, idOrden, this)
}

registrarO=async()=>{
  const CTA = document.getElementById('CTA').value;
  if(CTA!==''){
    registrarO(CTA,this)
  }else{

    registrarF(this)
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

handleCloseCalendar = () => {
  this.setState({
    openCalendar: null
  })
};

changeCalendar = event => {
  const {openCalendar} = this.state;
  if (openCalendar && openCalendar.contains(event.target) ) {
    //setOpenDash(null);
    this.setState({openCalendar: null});
  } else {
    //setOpenDash(event.currentTarget);
    this.setState({openCalendar: event.currentTarget});
  }
}

handleClickCalendar = event => {
  this.changeCalendar(event);
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
  if ((e.which === 32 || e.which > 39) && !isMobile) {
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
  const tp = checkU.checked?'u':'r'
  if (CTAnombre !== '') {
    this.padrones(CTAnombre.value, tp, key, '')
  }
}

rebuscarCTA = (key, CTA) => (e) => {
  const checkU = document.getElementById('check0');
  const tp = checkU.checked ? 'u' : 'r'
  this.handleCloseCTA()
  if (CTA !== '') {
    this.padrones(CTA, tp, key, '')
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
  const periodo = document.getElementById('periodo').value;
  rezago(this, periodo);
  setBg(this);
  sumaT(this);
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

showMap=()=>{
  const map=document.getElementById('rootMap')
  map.style.display='block'
}
hideMap = () => {
  const map = document.getElementById('rootMap')
  map.style.display = 'none'
}

blurPeriodo=(e)=>{
  rezago(this,e.target.value)
  sumaT(this);
}

componentDidMount(){
  const {bandPdf,bandCTA,genCTA,tp,idOrden} = this.props
  const checks = tp === 'u' || tp === '' ? [0] : [1]
  if (bandPdf !== '1') {
    clearCheckCP(checks)
    clearCheckM(this)
  }
  if (bandCTA==='1'){
    document.getElementById('CTANM').value=genCTA
    this.padrones(genCTA, tp, 0,idOrden)
    
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