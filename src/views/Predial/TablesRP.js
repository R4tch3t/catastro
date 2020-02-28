import React from 'react';
import cookie from "react-cookies";
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
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import ip from 'variables/ip';
import Checker from './Checker'
import Snackbar from 'components/Snackbar/Snackbar';



export default class TableRender extends React.Component {
state={
    tr: false,
    trE: false,
    classes: null,
}

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

  if (nombre.value === '' || nombre.value === ' ') {
    this.showNotification("tr")
    nombre.focus()
    return false
  }
  

  this.registrarC()
}

registrarC=async()=>{
    try {

       //const sendUri = "http://34.66.54.10:3015/";
       this.setState({disabledReg: true})
       const sendUri = ip("3024");
       const CTA = document.getElementById('CTA').value
       const nombre = document.getElementById('nombre').value
       const check0 = document.getElementById('check0')
       const tp = check0.checked ? 'u':'r'
       // const sendUri = "http://localhost:3015/";
        //const sendUri = "http://192.168.1.74:3015/";
       const bodyJSON = {
         CTA: CTA,
         nombre: nombre,
         tp: tp
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
selectionStartNombre = null
selectionEndNombre = null
handleUpper = e => {
  if (e.which === 32 || e.which > 39) {
    this.selectionStartNombre = e.target.selectionStart
    this.selectionEndNombre = e.target.selectionEnd
    e.target.value = e.target.value.toUpperCase()
    e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
  }
}

handleMUpper = e => {
   this.setState({disabledReg: false})
}

buscarCTA = (key) => (event) => {
  const CTAnombre = document.getElementById('CTANM').value;
  //const checkU = document.getElementById('check0');
  this.tipoB = key
  const labelB = key===0?'CTA':'NOMBRE'
  this.setState({labelB})
  //if (CTAnombre !== '') {
  this.allPadrones(CTAnombre)    
 // }
}
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
          message='Error, el número de cuenta ya éxiste'
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
          message='Contribuyente registrado con éxito'
          open={trA}
          closeNotification={() => this.setState({trA: false})}
          close
        />
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Impuesto predial</h4>
              <p className={classes.cardCategoryWhite}>
                Registrar contribuyente
              </p>
            </CardHeader>
            <CardBody>
  
              <GridContainer>
                 
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    
                    labelText="CTA"
                    id="CTA"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps = {{
                      type: 'number',
                      //onClick: getinfoReg,
                      //onChange: getinfoReg
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Nombre"
                    id="nombre"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    onKeyUp: this.handleUpper,
                    onMouseUp: this.handleMUpper
                    }}
                  />
                </GridItem>
                <GridContainer>
                <Checker
                  checkedIndexes={[0]}
                  tasksIndexes={[0, 1]}
                  strs={["URBANO", "RUSTICO"]}
                  ids={["check", "check"]}
                />
              </GridContainer>
              </GridContainer>
              
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
                Registrar
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