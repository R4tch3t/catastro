import React from "react";
import ReactDOM from 'react-dom';
import {
  PDFViewer,
  Page,
  Text,
  Document,
  Font,
  StyleSheet,
  View,
  Image
} from "@react-pdf/renderer";
import {
  MobileView,
  isMobile
} from "react-device-detect";
import { MobilePDFReader } from "react-read-pdf";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import LogoD from "../Icons/LOGOD.jpeg";
import LogoI from "../Icons/LOGOI.jpeg";
import RobI from "../Typography/Roboto-Italic.ttf";
import RobB from "../Typography/Roboto-Bold.ttf";
import RobBI from "../Typography/Roboto-BoldItalic.ttf";
//import spellNumber from "./spellNumber";
import ip from "variables/ip";

Font.register({
  family: 'Roboto',
  fonts: [{
    src: RobI,
    fontStyle: 'italic',
    fontWeight: 50
  }, {
    src: RobB,
    fontWeight: 'bold'
  }, {
    src: RobBI,
    fontStyle: 'italic',
    fontWeight: 'bold'
  }]
  
});
const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
class App extends React.Component {
  state = { url: null , dia: null, mes: null, año: null};
  constructor(props){
    super(props);
    const d = new Date();
    this.state={
      url:null,
      dia: d.getDate(),
      mes: meses[d.getMonth()],
      año: d.getFullYear()
    }
  }

  informeM = async (fi, ff) => {
    try {
      const sendUri = ip("3025");
      let tzoffset = (new Date()).getTimezoneOffset() * 60000;
      const bodyJSON = {
        fi: fi,
        ff: ff
      };
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

        if (r.ordenesu || r.ordenesr) {
          let data = [];
          let total = 0;
          let totalD = 0;
          let i = 0;
          let high = 0;
          let porcentaje = 0;
          data.objects = {}
          data.labels = []
          data.totales = []
          //dateSI.toLocaleDateString()
          const {
            dateSI
          } = this.state
          let dateLabel = dateSI
          console.log(`dateSI: ${dateLabel}`)
          let dateLast = ''

          r.ordenesu.forEach(e => {
            // tzoffset = (new Date()).getTimezoneOffset() * 60000;
            // e.dateUp = new Date(e.dateUp) - tzoffset
            e.dateUp = new Date(e.dateUp)

            data.push({
              key: `${e.CTA}${i}u`,
              cta: e.CTA,
              NOMBRE: e.contribuyente,
              tp: 'URBANO',
              fecha: new Date(e.dateUp - tzoffset).toISOString().slice(0, -1),
              total: e.total,
              terreno: e.m1,
              construccion: e.m2
            })
            //data.labels.push(`D${data.labels.length+1}`)
            // data.labels.push(`${dateLabel.toLocaleDateString()}`)
            // dateLabel.setDate(dateLabel.getDate() + 1);
            i++
            console.log(e.dateUp)
            console.log(dateLabel)
            console.log(i)
            console.log(r.ordenesu.length)
            if ((dateLast !== '' && e.dateUp.toLocaleDateString() !== dateLast) || i === r.ordenesu.length) {
              if (i === r.ordenesu.length) {
                totalD += parseInt(e.total);
              }

              //dateLabel = e.dateUp

              data.objects[`${dateLast}`] = totalD
              totalD = 0
            }
            dateLast = e.dateUp.toLocaleDateString()
            total += parseInt(e.total);
            totalD += parseInt(e.total);
          });
          i = 0
          dateLabel = dateSI
          totalD = 0
          dateLast = ''
          r.ordenesr.forEach(e => {
            // tzoffset = (new Date()).getTimezoneOffset() * 60000;
            // e.dateUp = new Date(e.dateUp) - tzoffset
            e.dateUp = new Date(e.dateUp)

            data.push({
              key: `${e.CTA}${i}r`,
              cta: e.CTA,
              NOMBRE: e.contribuyente,
              tp: 'RUSTICO',
              fecha: new Date(e.dateUp - tzoffset).toISOString().slice(0, -1),
              total: e.total,
              terreno: e.m1,
              construccion: e.m2
            })
            //data.labels.push(`D${data.labels.length+1}`)
            //data.labels.push(`${dateLabel.toLocaleDateString()}`)
            //dateLabel.setDate(dateLabel.getDate() + 1);
            i++
            if ((dateLast !== '' && e.dateUp.toLocaleDateString() !== dateLast) || i === r.ordenesr.length) {
              if (i === r.ordenesr.length) {
                totalD += parseInt(e.total);
              }
              // dateLabel = e.dateUp

              if (data.objects[`${dateLabel.toLocaleDateString()}`]) {
                data.objects[`${dateLabel.toLocaleDateString()}`] += totalD
              } else {
                data.objects[`${dateLabel.toLocaleDateString()}`] = totalD
              }
              totalD = 0
            }
            dateLast = e.dateUp.toLocaleDateString()
            // data.totales.push(e.total)
            total += parseInt(e.total);
            totalD += parseInt(e.total);
          });
          console.log(data.objects)
          const objects = Object.entries(data.objects).sort();
          if (objects.length < 16) {
            for (let [key, value] of objects) {
              console.log(`key: ${key} e: ${value}`)
              data.labels.push(key)
              data.totales.push(value)
              if (value > high) {
                high = value
              }
              porcentaje++
            }
          } else if (objects.length < 30 && objects.length > 15) {
            dateLabel = new Date(dateSI)
            dateLabel.setDate(dateLabel + 7)
            totalD = 0
            i = 0
            for (let [key, value] of objects) {

              i++
              if (new Date(key) > dateLabel || i === objects.length) {
                if (i === objects.length) {
                  totalD += value
                  if (totalD > high) {
                    high = totalD
                  }
                  data.labels.push(`SEM ${i}`)
                  data.totales.push(totalD)
                  totalD = 0
                  dateLabel = new Date(key)
                  dateLabel.setDate(dateLabel + 7)
                }

                porcentaje++
              }
              totalD += value
              if (totalD > high) {
                high = totalD
              }

            }
          } else {
            dateLabel = new Date(dateSI)
            dateLabel.setMonth(dateLabel.getMonth() + 1)
            totalD = 0
            i = 0
            for (let [key, value] of objects) {

              i++
              if (new Date(key) > dateLabel || i === objects.length) {
                if (i === objects.length) {
                  totalD += value
                  if (totalD > high) {
                    high = totalD
                  }
                  data.labels.push(this.mes(dateLabel.getMonth()))
                  data.totales.push(totalD)
                  totalD = 0
                  dateLabel = new Date(key)
                  dateLabel.setMonth(dateLabel.getMonth() + 1)
                }

                porcentaje++
              }
              totalD += value
              if (totalD > high) {
                high = totalD
              }

            }
          }


          porcentaje = ((total / (porcentaje)) / total) * 100
          if (isNaN(porcentaje)) {
            porcentaje = 0
            data.totales = [1]
            console.log('nan')
          } else {
            porcentaje = this.round(porcentaje)
          }
          console.log(high)
          console.log(data.labels)
          console.log(data.totales)

          //porcentaje = isNaN(porcentaje) ? 0:this.round(porcentaje)
          this.setState({
            dataTable: data,
            total: total,
            porcentaje
          });

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

  onRender = ({ blob }) => {
    this.setState({ url: URL.createObjectURL(blob) });
    if (isMobile){
      const pdfview = document.getElementById("pdfView");
      const mobilePdf = document.getElementById('mobilePdf');
      const h = window.devicePixelRatio<2?960:360 //window.screen.availHeight;
      mobilePdf.style.height=`${h}px`;
      pdfview.style.display='none';
      ReactDOM.render(<MobilePDFReader url={this.state.url} />, mobilePdf);
    }
  };
  

  styles = StyleSheet.create({
    logoI: {
      position: "absolute",
      width: 125,
      height: 50,
      left: 15,
      top: 15
    },
    logoD: {
      position: "absolute",
      width: 125,
      height: 50,
      right: 15,
      top: 10
    },
    headV: {
      textAlign: 'center',
      margin: 20
    },
    headT: {
      fontFamily: "Roboto",
      fontStyle: 'italic',
      fontWeight: 50,
      fontSize: 15
    },
    headO: {
      fontFamily: "Roboto",
      fontWeight: 'bold',
    },
    labelR: {
      fontFamily: "Roboto",
      fontStyle: 'italic',
      fontWeight: 'bold'
    },
    table: { 
      position:'relative',
      display: "table", 
      width: "90%", 
      left: 30,
      top: 30,
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0 
    },
    tableRow: { 
      margin: "auto",
      height: 15, 
      flexDirection: "row" 
    }, 
    tableCol: { 
      width: "100%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    },
    tableCol2: {
      width: "50%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0
    },
    tableCol3: {
      width: "50%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0
    },
    tableCell: { 
      marginLeft: 0, 
      marginTop: 2,
      marginBottom: 1,
      fontSize: 9,
      textAlign: 'center'
    },
    tableCell2: { 
      marginLeft: 0, 
      marginTop: 2,
      marginBottom: 1,
      fontSize: 6,
      textAlign: 'center',
      paddingVertical: 1
    },
    subrayado:{
      position: 'absolute',
      top: 79,
      left: 140,
      width: '150px',
      borderStyle: "solid",
      borderBottomWidth: 1
    }

  });

  render() {
    const {classes} = this.props
    const {dia} = this.state
    const {mes} = this.state
    const {año} = this.state
    const {CTA} = this.props
    const {folio} = this.props
    const nDoc = `ORDEN_CTA_${CTA}_${dia}${mes}${año}`
    const {nombre} = this.props
    const {calle} = this.props
    const {lote} = this.props
    const {manzana} = this.props
    const {numero} = this.props
    const {colonia} = this.props
    const {cp} = this.props
    const {municipio} = this.props
    const {localidad} = this.props
    const {tipoP} = this.props
    const {bg} = this.props
    const {periodo} = this.props
    const {dateUp} = this.props
    const {total} = this.props
    const {V0020401,V0020402,V0020403,V0020801,V0020802,
           V0020803,V0020804,V0030101,V0070101,V0070201,
           V0070202,V0070203,V0090101,V0090106,V0090107,
           V0090701,V0090702,V0090703,V0090704,V00913,
           V0091301,V0010804,V0010101,V21173001001} = this.props;

    return (
      <CardIcon>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>CORTE</h4>
                <p className={classes.cardCategoryWhite}>
                  Informe predial
                </p>
              </CardHeader>
              <CardBody>

                <React.Fragment>
                  <GridContainer>  
                    <Button color="success" 
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center"
                    }} >
                      <a style={{color: 'white'}} href={this.state.url} download={`${nDoc}.pdf`}>
                        Descargar PDF
                      </a>
                    </Button>
                  </GridContainer>  
                  <MobileView>
                    <div id='mobilePdf' style={{ position: 'relative', top: 20, width: '100%' }} ></div>
                    
                  </MobileView>
                  <PDFViewer id='pdfView' style={{ width: '100%', height: 1180 }}  >
                  <Document shallow onRender={this.onRender} title={`${nDoc}.pdf`} >
                    <Page size="letter" wrap>
                      <Image src={LogoI} style={this.styles.logoI} />
                      <View style={this.styles.headV} >
                        <Text style={[this.styles.headO,{position: "relative", left: 150, fontSize: 8}]} >
                          SUBSECRETARÍA DE INGRESOS
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", left: 150, fontSize: 8}]} >
                          COORDINACIÓN GENERAL DE CATASTRO
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", top: 30, fontSize: 10}]} >
                          INFORME MENSUAL DE LA RECAUDACIÓN DEL IMPUESTO PREDIAL, AÑO {año}
                        </Text>
                        <View style={[this.styles.headT,{position: "relative", top: 40, fontSize: 10}]} >
                          <Text>H. AYUNTAMIENTO DE:<Text style={{textDecoration: "underline"}} >          CHILAPA DE ÁLVAREZ, GUERRERO          </Text>                                           MES <Text style={{textDecoration: "underline"}} >        {mes}  {año}       </Text> </Text>
                        </View>
                        
                      </View>
                      {/*<View style={{position:'absolute', top: '110px', right: '40px'}} >
                        <Text style={[this.styles.labelR,{position: 'absolute', fontSize: 10, right: '100px'}]}>FOLIO </Text>
                        <Text style={[this.styles.labelR,{position: 'absolute', fontSize: 10, color: 'red', right: '50px'}]}>{folio}</Text>
                      </View>*/}
                      <View style={this.styles.table}> 
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO]}>CONCEPTO</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '30%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO]}>NÚMERO DE CONTRIBUYENTES</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '35%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO]}>RECAUDACIÓN</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%',borderBottomWidth:0}]}>  
                            <Text style={this.styles.tableCell}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO]}>INGRESO CORRIENTE</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>URBANO(A)</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}>SUBURBANO(B)</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2,{fontSize: 5}]}>RÚSTICOS(C)</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2,{fontSize: 5,paddingVertical: 0}]}>TOTAL D=A+B+C</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>URBANAS(E)</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>SUBURBANAS(F)</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>RÚSTICOS(G)</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>TOTAL$ H=E+F+G</Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Impuesto</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Recargos</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Multas</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Gastos de ejecucion</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Intereses (no bancarios)</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Indemnización</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{textAlign: 'right',paddingRight:5}]}>SUBTOTAL</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO]}>INGRESO POR REZAGO</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Impuesto</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Recargos</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Multas</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Gastos de ejecucion</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Intereses (no bancarios)</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Indemnización</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{textAlign: 'right',paddingRight:5}]}>SUBTOTAL</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO]}>TOTAL</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{textAlign: 'left',fontSize: 8}]}>IMPUESTOS ADICIONALES</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Año corriente</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Años anteriores</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                      </View>

                      {/*<Text style={[this.styles.tableCell,this.styles.headO,{left: 30}]}>41121001  IMPUESTOS</Text> 
                      
                       <Text style={this.styles.table}> 
                        
                        {V0020401 !== '0' &&<View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411210010020401</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>URBANOS EDIFICADOS DESTINADOS A CASA HABITACIÓN</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0020401}</Text>
                          </View>
                        </View>
                        }
                        
                        {V0020402 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411210010020402</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>SUB URBANOS EDIFICADOS DESTINADOS A CASA HABITACIÓN</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0020402}</Text> 
                          </View>
                        </View>
                        }

                        {V0020403 !== '0' && <Text style={this.styles.tableRow}> 
                          <Text style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411210010020403</Text> 
                          </Text> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>RÚSTICOS EDIFICADOS DESTINADOS A CASA HABITACIÓN</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0020403}</Text>  
                          </View>
                        </Text>
                        }

                        {V0020801 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411210010020801</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>PENSIONADOS Y JUBILADOS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0020801}</Text>   
                          </View>
                        </View>}

                        {V0020802 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411210010020802</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>INSEN</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0020802}</Text>    
                          </View>
                        </View>
                        }

                        {V0020803 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411210010020803</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>PERSONAS DE CAPACIDADES DIFERENTES</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0020803}</Text>     
                          </View>
                        </View>
                        }

                        {V0020804 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411210010020804</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>MADRES Y/O PADRES SOLTEROS JEFES DE FAMILIA</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0020804}</Text> 
                          </View>
                        </View>
                        }

                        {V0030101 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411310010030101</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>SOBRE ADQUISICIONES DE BIENES INMUEBLES</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0030101}</Text>  
                          </View>
                        </View>
                        }
                        {(V0070101 !== '0' || V0070201 !== '0' || V0070202 !== '0' || V0070203 !== '0' || V0090101 !== '0' ) && 
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={[this.styles.tableCell,this.styles.headO]}>41171001007</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={[this.styles.tableCell,this.styles.headO]}>ACCESORIOS DE IMPUESTOS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={this.styles.tableCell}></Text> 
                          </View>
                        </View>}

                        {V0070101 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411710010070101</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>RECARGOS PREDIAL</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0070101}</Text>   
                          </View>
                        </View>
                        }

                        {V0070201 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411710010070201</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>15% PRO EDUCACIÓN Y ASISTENCIA SOCIAL</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0070201}</Text>    
                          </View>
                        </View>}

                        {V0070202 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411710010070202</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>15% PRO CAMINOS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0070202}</Text>     
                          </View>
                        </View>}                        
                        
                        {V0070203 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411710010070203</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>DESCUENTO DE IMPUESTO PREDIAL DE NATURALEZA DEUDORA</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0070203}</Text>      
                          </View>
                        </View>}

                        {V0090101 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411910010090101</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>REZAGOS IMPUESTO PREDIAL</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0090101}</Text>      
                          </View>
                        </View>}
                        {(V0090106 !== '0' || V0090107 !== '0') &&
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={[this.styles.tableCell,this.styles.headO]}>414</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={[this.styles.tableCell,this.styles.headO]}>DERECHOS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={this.styles.tableCell}></Text> 
                          </View>
                        </View>}

                        {V0090106 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>414910040090106</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>FUSIÓN DE PREDIOS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0090106}</Text>       
                          </View>
                        </View>}

                        {V0090107 !== '0' && <View style={[this.styles.tableRow,{height: 'auto'}]}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>414910040090107</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>SUBDIVISIÓN, LOTIFICACIÓN Y RELOTIFICACIÓN DE PREDIOS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0090107}</Text>        
                          </View>
                        </View>}

                        {(V0090701 !== '0' || V0090702 !== '0' || V0090703 !== '0' || V0090704 !== '0' || V00913 !== '0' || V0091301 !== '0' ) && 
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={[this.styles.tableCell,this.styles.headO]}>4149100400907</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={[this.styles.tableCell,this.styles.headO]}>DERECHOS POR COPIAS DE PLANOS, AVALÚOS Y SERVICIOS CATASTRALES</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={this.styles.tableCell}></Text> 
                          </View>
                        </View>}

                        {V0090701 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>414910040090701</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>CONSTANCIAS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0090701}</Text>         
                          </View>
                        </View>}

                        {V0090702 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>414910040090702</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>CERTIFICACIONES</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0090702}</Text>
                          </View>
                        </View>}

                        {V0090703 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>414910040090703</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>DUPLICADOS Y COPIAS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0090703}</Text> 
                          </View>
                        </View>}

                        {V0090704 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>414910040090704</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>OTROS SERVICIOS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0090704}</Text>  
                          </View>
                        </View>}

                        {V00913 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>4149100400913</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>PRO-BOMBEROS Y PROTECCIÓN CIVIL</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V00913}</Text>   
                          </View>
                        </View>}

                        {V0091301 !== '0' && <View style={[this.styles.tableRow, {height: 'auto'}]}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={[this.styles.tableCell,{top: 3}]}>414910040091301</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>LICENCIAS PARA CONSTRUCCIÓN DE EDIFICIOS O CASAS HABITACIÓN, RESTAURACIÓN O REPARACIÓN, URBANIZACIÓN, FRACCIONAMIENTO LOTIFICACIÓN, RELOTIFICACIÓN, FUSIÓN Y SUB-DIVISIÓN</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute', marginTop: 5}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0091301}</Text>   
                          </View>
                        </View>}
                        
                        {V0010804 !== '0' &&
                        <>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={[this.styles.tableCell,this.styles.headO]}>41591</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={[this.styles.tableCell,this.styles.headO]}>PRODUCTOS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={this.styles.tableCell}></Text> 
                          </View>
                        </View>

                         <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>415910050010804</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>VENTAS DE FORMAS IMPRESAS POR JUEGOS (FORMA 3DCC)</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0010804}</Text>   
                          </View>
                        </View>
                        </>}

                        {V0010101 !== '0' &&
                        <>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={[this.styles.tableCell,this.styles.headO]}>416</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={[this.styles.tableCell,this.styles.headO]}>APROVECHAMIENTO DE TIPO DE CORRIENTE</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={this.styles.tableCell}></Text> 
                          </View>
                        </View>

                         <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>416210060010101</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>MULTAS FISCALES (FALTA DE CUMPLIMIENTO DE OBLIGACIONES FISCALES)</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0010101}</Text>    
                          </View>
                        </View>
                        </>}
                        
                        {V21173001001 !== '0' &&
                        <>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={[this.styles.tableCell,this.styles.headO]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={[this.styles.tableCell,this.styles.headO]}>DERECHOS ESTATALES</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={this.styles.tableCell}></Text> 
                          </View>
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>21173001001</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>15% DE CONTRIBUCIÓN ESTATAL (FUSIÓN Y SUBDIVISIÓN DE PREDIOS)</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V21173001001}</Text>     
                          </View>
                        </View>
                        </>
                        }

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '60%'}]}> 
                            <Text style={this.styles.tableCell}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '21%'}]}> 
                            <Text style={[this.styles.tableCell, this.styles.headO, {margin: 'auto'}]}>IMPORTE NETO</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{total}</Text>      
                          </View>
                        </View>

                      </Text>/*}
                      
                      {/*<View>
                        <Text style={[this.styles.tableCell,{margin: 'auto',top: 1}]}>CANTIDAD CON LETRA:   (  <Text style={this.styles.labelR}>{spellNumber(total)}00/100 M.N.</Text>  )</Text>
                      </View>*/}

                      <View style={{position:'absolute', bottom: '60px', left: '20%'}} >
                      <View>
                        <Text style={[this.styles.tableCell,{margin: 'auto',top: 20}]}>CHILAPA DE ÁLVAREZ, GRO., A     <Text style={this.styles.labelR}>{dia}</Text>      DE          <Text style={this.styles.labelR}>{mes}</Text>          DEL          <Text style={this.styles.labelR}>{año}</Text></Text>
                      </View>
                      <View style={{top: 25}} >  
                        <Text style={[this.styles.tableCell,this.styles.headO,{margin: 'auto'}]}>AUTORIZÓ:</Text>
                        <Text style={[this.styles.tableCell,{margin: 'auto'}]}>DIRECTOR DE CATASTRO MUNICIPAL</Text>
                      </View>
                      <View style={{top: 40}} >  
                        <Text style={[this.styles.tableCell,{margin: 'auto'}]}>________________________________________________________________________</Text>
                        <Text style={[this.styles.tableCell,{margin: 'auto'}]}>NOMBRE, FIRMA Y SELLO</Text>
                      </View>
                      </View>

                    </Page>
                  </Document>
                  </PDFViewer>
                </React.Fragment>

              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </CardIcon>
    );
  }
}
export default App;