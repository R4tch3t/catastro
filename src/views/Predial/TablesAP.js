import React from 'react';
// react plugin for creating charts
import WN from "@material-ui/icons/Warning"
import E from "@material-ui/icons/Error"
import CheckCircle from "@material-ui/icons/CheckCircle"
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Tasks from "components/Tasks/Tasks.js";
//import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import ip from 'variables/ip';

import Snackbar from 'components/Snackbar/Snackbar';
import FormRegistro from './FormRegistro';



export default class TableRender extends React.Component {
state={
    tr: false,
    trE: false,
    classes: null,
}
//dValue = "\0"
dValue = "\0"
dValInt = 0
constructor(props){
    super(props);
    this.state = {
        tr: false,
        trE: false,
        trE2: false,
        trA: false,
        classes: props.classes,
        classesM: props.classesM,
        disabledReg: false
    };
    
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

validarDatos = () => {
  const CTA = document.getElementById('CTA')
  const nombre = document.getElementById('nombre')
  
  if (CTA.value === '') {
      this.showNotification("tr")
      CTA.focus()
      return false
  }

  if (nombre.value === '' || nombre.value === ' ' || nombre.value === '\0') {
    this.showNotification("tr")
    nombre.focus()
    return false
  }

  this.actualizarC()
}

padrones=async(tp)=>{
  try {
    let CTAnombre = document.getElementById('CTA');
    const nombre = document.getElementById('nombre')
    const calle = document.getElementById('calle')
    let lote = document.getElementById('lote')
    let manzana = document.getElementById('manzana')
    let numCalle = document.getElementById('numCalle')
    const colonia = document.getElementById('colonia')
    let cp = document.getElementById('cp')
    const municipio = document.getElementById('municipio')
    const localidad = document.getElementById('localidad')
    const m1 = document.getElementById('m1')
    const m2 = document.getElementById('m2')
    const tc = document.getElementById('tc')
    const zona = document.getElementById('zona')
    const bg = document.getElementById('baseGravable');
    const sendUri = ip('3015');
    const bodyJSON = {
      CTAnombre: CTAnombre.value,
      tp: tp,
      tipoB: 0,
      dateUp: ''
    }
    const response = await fetch(sendUri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyJSON)
    });

    nombre.value='';
    calle.value = '';
    lote.value = '';
    manzana.value = '';
    numCalle.value = 0;
    colonia.value = '';
    cp.value = 41100;
    municipio.value = 'CHILAPA DE ÁLVAREZ'
    localidad.value = 'CHILAPA DE ÁLVAREZ'
    m1.value = 0
    m2.value = 0
    tc.value = 0
    zona.value = 0
    bg.value = 0
    const responseJson = await response.json().then(r => {
      //console.log(`Response1: ${r}`)

      if (r.contribuyente) {
        const contribuyente = r.contribuyente[0]
        const ubicacion = r.ubicacion[0]
        nombre.value = contribuyente.contribuyente
      
        if(ubicacion){
          calle.value = ubicacion.calle;
          lote.value = ubicacion.lote;
          manzana.value = ubicacion.manzana;
          numCalle.value = ubicacion.numero;
          colonia.value = ubicacion.colonia;
          cp.value = ubicacion.cp === 0 ? 41100 : ubicacion.cp;
          municipio.value = ubicacion.municipio === '' ? 'CHILAPA DE ÁLVAREZ' : ubicacion.municipio;
          localidad.value = ubicacion.localidad === '' ? 'CHILAPA DE ÁLVAREZ' : ubicacion.localidad;
        }
        if(calle.value === ''){
          calle.value = contribuyente.ubicacion
        }
        m1.value = contribuyente.m1
        m2.value = contribuyente.m2
        tc.value = contribuyente.tc ? contribuyente.tc:0
        zona.value = contribuyente.zona ? contribuyente.zona:0
        bg.value = contribuyente.bg ? contribuyente.bg : 0
        cp.value = cp.value === '' ? 0 : cp.value
        numCalle.value = numCalle.value === '' ? 0 : numCalle.value
        manzana.value = manzana.value === '' ? 0 : manzana.value
        lote.value = lote.value === '' ? 0 : lote.value
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

actualizarC=async()=>{
    try {
       this.setState({disabledReg: true})
       const sendUri = ip("3026");
       const CTA = document.getElementById('CTA').value
       const nombre = document.getElementById('nombre').value.toUpperCase()
       const calle = document.getElementById('calle').value.toUpperCase()
       let lote = document.getElementById('lote').value.toUpperCase()
       lote = lote === '' ? 0 : lote
       let manzana = document.getElementById('manzana').value.toUpperCase()
       manzana = manzana === '' ? 0 : manzana
       let numCalle = document.getElementById('numCalle').value.toUpperCase()
       numCalle = numCalle === ''? 0:numCalle
       const colonia = document.getElementById('colonia').value.toUpperCase()
       let cp = document.getElementById('cp').value
       cp = cp === ''? 0:cp
       const municipio = document.getElementById('municipio').value.toUpperCase()
       const localidad = document.getElementById('localidad').value.toUpperCase()
       const m1 = document.getElementById('m1').value
       const m2 = document.getElementById('m2').value
       const tc = document.getElementById('tc').value
       const zona = document.getElementById('zona').value
       const bg = document.getElementById('baseGravable').value;
       const check0 = document.getElementById('check0')
       const tp = check0.checked ? 'u':'r'
       const periodo = document.getElementById('periodo').value
       // const sendUri = "http://localhost:3015/";
        //const sendUri = "http://192.168.1.74:3015/";
       const bodyJSON = {
         CTA: CTA,
         nombre: nombre,
         calle: calle,
         lote: lote,
         manzana: manzana,
         numCalle: numCalle,
         colonia: colonia,
         cp: cp,
         municipio: municipio,
         localidad: localidad,
         tp: tp,
         m1: m1,
         m2: m2,
         tc: tc,
         zona: zona,
         bg: bg,
         periodo: periodo
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
            //  console.log(`Response1: ${r}`)
            if (r.contribuyente) {
              //if(CAT===r.contribuyente[0].CTA)
              this.showNotification("trA")
            }else
              if (r.error) {
                if (r.error.name === "error01") {
                  this.showNotification("trE")
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
        this.showNotification("trE2")
        this.setState({disabledReg: false})
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


showNotification = place => {
  const {tr,trE,trE2,trA} = this.state
    switch (place) {
      case "tr":
        if (!tr) {
          this.setState({tr: true})
          setTimeout(() => {
            this.setState({tr: false})
          }, 6000);
        }
        break;
        case "trE":
        if (!trE) {
          this.setState({trE: true})
          setTimeout(() => {
            this.setState({trE: false})
          }, 6000);
        }
        break;
        case "trE2":
        if (!trE2) {
          this.setState({trE2: true})
          setTimeout(() => {
            this.setState({trE2: false})
          }, 6000);
        }
        break;
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

render() {
  const {
    tr, trE, trE2, trA,
    classes,
    classesM,
    disabledReg
  } = this.state;
 
  return (
    <CardIcon>
      <GridContainer>
        <Snackbar
          place="tr"
          color="warning"
          icon={WN}
          message='Advertencia, rellenar todos los campos'
          open={tr}
          closeNotification={() => this.setState({tr: false})}
          close
        />
        <Snackbar
          place="tr"
          color="danger"
          icon={E}
          message='Error, el número de cuenta NO éxiste'
          open={trE}
          closeNotification={() => this.setState({trE: false})}
          close
        />
        <Snackbar
          place="tr"
          color="danger"
          icon={E}
          message='Error en la conexión'
          open={trE2}
          closeNotification={() => this.setState({trE2: false})}
          close
        />
        <Snackbar
          place="tr"
          color="success"
          icon={CheckCircle}
          message='El Contribuyente se actualizó con éxito'
          open={trA}
          closeNotification={() => this.setState({trA: false})}
          close
        />
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>PADRON</h4>
              <p className={classes.cardCategoryWhite}>
                Actualizar Contribuyente
              </p>
            </CardHeader>
            <CardBody>
              <FormRegistro c={this} a={true} fa={this.padrones} />
              <CardFooter>
              <Button id = 'regP'
                color="success"  
                style={{
                  display: 'flex',
                  flex: 1, 
                  alignItems: 'center'
                }}
                onClick = {this.validarDatos}
                disabled={disabledReg}
                >
                Actualizar Contribuyente
              </Button>
            </CardFooter>

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        
      </GridContainer>
      
    </CardIcon>
  )
}

}