import React from "react";
/*import ReactDOM from 'react-dom';
import {
  PDFViewer,
  Page,
  Text,
  Document,
  Font,
  StyleSheet,
  View,
  Image
} from "@react-pdf/renderer";*/
/*import {
  MobileView,
//  isMobile
} from "react-device-detect";
//import { MobilePDFReader } from "react-read-pdf";*/
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
import spellNumber from "./spellNumber";

  let PDFViewer=0;
  let Page=0;
  let Text=0;
  let Document=0;
  let Font=0;
  let StyleSheet=0;
  let View=0;
  let Image=0;
  let ReactDOM = 0
/*Font.register({
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
  
});*/

const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
class App extends React.Component {
  
  state = { url: null , dia: null, mes: null, año: null, loadvars: false};
  constructor(props){
    super(props);
    const d = new Date();
    this.state={
      url:null,
      dia: d.getDate(),
      mes: meses[d.getMonth()],
      año: d.getFullYear(),
      loadvars: false
    }
  }
  PDFViewer = null;
  Page = null;
  Text = null;
  Document = null;
  Font = null;
  StyleSheet = null;
  View = null;
  Image = null;
  onRender = ({ blob }) => {
    this.setState({ url: URL.createObjectURL(blob) });
    import("react-device-detect")
      .then(({ isMobile, MobileView }) => {
        // Use moduleA
        if (isMobile){
      //let myHeaders = new Headers();
      //myHeaders.set('Content-Disposition', 'inline');
      //myHeaders.append('Content-Type', 'application/pdf');
      //const nDoc = `ORDEN_CTA_`
      //myHeaders.set('filename', 'ORDEN_CTA_');
      /*let reader = new FileReader();
      let out = new Blob([blob], {
        type: 'application/pdf',
        
      });
      reader.onload = function (e) {
        //window.location.href = reader.result;
      }
      //reader.readAsDataURL(out);
      var blobURL = URL.createObjectURL(out);
      window.open(blobURL);
      const win = window.open(this.state.url, '_self');
      win.focus();
      */
      const mobileContainer = document.getElementById('mobileContainer');
      mobileContainer.innerHTML=""
      ReactDOM.render(<MobileView>
                      <div id='mobilePdf' style={{ position: 'relative', top: 20, width: '100%' }} ></div>
                    </MobileView>,mobileContainer)
      const pdfview = document.getElementById("pdfView");
      const mobilePdf = document.getElementById('mobilePdf');
      const h = window.devicePixelRatio<2?960:360 //window.screen.availHeight;
      mobilePdf.style.height=`${h}px`;
      pdfview.style.display='none';
      import("react-read-pdf")
      .then(({ MobilePDFReader }) => {
          ReactDOM.render(<MobilePDFReader url={this.state.url} />, mobilePdf);
      })
    }
      })
      .catch(err => {
        // Handle failure
      });
    
  };
  

  styles=null
  componentDidMount(){
    import("@react-pdf/renderer").then(({PDFViewer,Page,Text,Document,Font,StyleSheet,View,Image})=>{
      const obj = {}
      obj.PDFViewer=PDFViewer
      obj.Page=Page
      obj.Text=Text
      obj.Document=Document
      obj.Font=Font
      obj.StyleSheet=StyleSheet
      obj.View=View
      obj.Image=Image

        
        obj.Font.register({
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
this.styles = StyleSheet.create({
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
      display: "table", 
      width: "90%", 
      left: 30,
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
      marginLeft: 10, 
      marginTop: 2,
      marginBottom: 1,
      fontSize: 9,
      textAlign: 'left'
    }

  });
  import('react-dom').then(({ReactDOM})=>{
    obj.ReactDOM = ReactDOM 
    this.setVars(obj)
    this.setState({loadvars: true})
  });
      })
      
  }
  setVars = (obj) => {
    PDFViewer = obj.PDFViewer;
    Page = obj.Page;
    Text = obj.Text;
    Document = obj.Document;
    Font = obj.Font;
    StyleSheet = obj.StyleSheet;
    View = obj.View;
    Image = obj.Image;
  }
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
    let {total} = this.props
    const totalS = spellNumber(total)
    total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    total = `${total}.00`
    const {V0020401,V0020402,V0020403,V0020801,V0020802,
           V0020803,V0020804,V0030101,V0070101,V0070201,
           V0070202,V0070203,V0090101,V0090106,V0090107,
           V0090701,V0090702,V0090703,V0090704,V00913,
           V0091301,V0010804,V0010101,V21173001001,
           otroservicio,servQ,constaQ,constaL,certiL,certiQ} = this.props;
    let {loadvars} = this.state       
    //const valQ = V0090704 !== '0' ? V0090704*0.15:0
    if(!loadvars){
      
      return (<div></div>)
    }else{
    return (
      <CardIcon>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>PREDIAL</h4>
                <p className={classes.cardCategoryWhite}>
                  Orden de pago
                </p>
              </CardHeader>
              <CardBody>

                <React.Fragment>
                  <GridContainer>
                    <a style={{color: 'white',
                      display: "flex",
                      flex: 1,
                      alignItems: "center"}} href={this.state.url} download={`${nDoc}.pdf`}>  
                      <Button color="success" 
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center"
                      }} >
                        Descargar PDF
                      </Button>
                    </a>  
                  </GridContainer> 
                  <div id='mobileContainer' >
                    
                  </div>
                  

                  <PDFViewer id='pdfView' style={{ width: '100%', height: 1180 }}  >
                  <Document shallow onRender={this.onRender} title={`${nDoc}.pdf`} >
                    <Page size="LETTER" wrap>
                      <Image src={LogoI} style={this.styles.logoI} />
                      <Image src={LogoD} style={this.styles.logoD} />
                      <View style={this.styles.headV} >
                        <Text style={this.styles.headT} >
                          H. Ayuntamiento Municipal Constitucional
                        </Text>
                        <Text style={this.styles.headT} >
                          Chilapa de Álvarez, Gro.
                        </Text>
                        <Text style={this.styles.headT} >
                          2018-2021
                        </Text>
                        <Text style={[this.styles.headO,{fontSize: 15}]} >
                          ORDEN DE PAGO
                        </Text>
                        <Text style={{fontSize: 15}} >
                          DIRECCIÓN DE CATASTRO MUNICIPAL
                        </Text>
                      </View>
                      <View style={{position:'absolute', top: '110px', right: '40px'}} >
                        <Text style={[this.styles.labelR,{position: 'absolute', fontSize: 10, right: '100px'}]}>FOLIO </Text>
                        <Text style={[this.styles.labelR,{position: 'absolute', fontSize: 10, color: 'red', right: '50px'}]}>{folio}</Text>
                      </View>
                      <View style={this.styles.table}> 
                        <View style={this.styles.tableRow}> 
                          <View style={this.styles.tableCol}> 
                            <Text style={this.styles.tableCell}>NOMBRE O RAZÓN SOCIAL DEL CONTRIBUYENTE: <Text style={[this.styles.tableCell,this.styles.labelR]}>{nombre}</Text> </Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={this.styles.tableCol2}> 
                            <Text style={this.styles.tableCell}>CALLE: <Text style={[this.styles.tableCell,this.styles.labelR]}>{calle}</Text> </Text>
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell}>NÚM: <Text style={[this.styles.tableCell,this.styles.labelR]}>{numero}</Text></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={this.styles.tableCell}>LTE: <Text style={[this.styles.tableCell,this.styles.labelR]}>{lote}</Text></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell}>MZA: <Text style={[this.styles.tableCell,this.styles.labelR]}>{manzana}</Text></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '100%'}]}> 
                            <Text style={this.styles.tableCell}>COLONIA: <Text style={[this.styles.tableCell,this.styles.labelR]}>{colonia}</Text></Text>
                          </View>
                          {/*<View style={this.styles.tableCol3} >  
                              <Text style={this.styles.tableCell}>C.P: <Text style={[this.styles.tableCell,this.styles.labelR]}>{cp}</Text> </Text> 
                    </View>*/ }
                        </View> 

                        <View style={this.styles.tableRow}> 
                          <View style={this.styles.tableCol2}> 
                            <Text style={this.styles.tableCell}>MUNICIPIO: <Text style={[this.styles.tableCell,this.styles.labelR]}>{municipio}</Text> </Text>
                          </View>
                          <View style={this.styles.tableCol3} >  
                              <Text style={this.styles.tableCell}>LOCALIDAD: <Text style={[this.styles.tableCell,this.styles.labelR]}>{localidad}</Text> </Text> 
                            </View> 
                        </View> 

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol2, {width: '70%'}]}> 
                            <Text style={this.styles.tableCell}>PÁGUESE A LA SECRETARÍA DE FINANZAS MUNICIPAL LA CANTIDAD DE:</Text> 
                          </View> 
                          <View style={[this.styles.tableCol3, {width: '30%'}]} >  
                              <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{total}</Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={this.styles.tableCol}> 
                            <Text style={this.styles.tableCell}>BASE GRAVABLE: <Text style={[this.styles.tableCell,this.styles.labelR]}>{bg}</Text></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '30%'}]}> 
                            <Text style={this.styles.tableCell}>NÚMERO DE CUENTA:</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '20%'}]} >  
                              <Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{CTA}</Text>
                          </View> 
                          <View style={[this.styles.tableCol,{width: '20%'}]} >  
                              <Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{tipoP}</Text>
                          </View>
                          <View style={[this.styles.tableCol,{width: '30%'}]} >  
                              <Text style={this.styles.tableCell}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%'}]}> 
                            <Text style={this.styles.tableCell}>PERÍODO DE PAGO: <Text style={[this.styles.tableCell,this.styles.labelR]}>{periodo}</Text></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '50%'}]}> 
                            <Text style={this.styles.tableCell}>FECHA Y HORA DE REGISTRO: <Text style={[this.styles.tableCell,this.styles.labelR]}>{dateUp}</Text></Text> 
                          </View> 
                        </View>
                      </View>

                      <Text style={[this.styles.tableCell,this.styles.headO,{left: 30}]}>41121001  IMPUESTOS</Text> 
                      
                       <View style={this.styles.table}> 
                        
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

                        {V0020403 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411210010020403</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>RÚSTICOS EDIFICADOS DESTINADOS A CASA HABITACIÓN</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0020403}</Text>  
                          </View>
                        </View>
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
                            <Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0090106}</Text>       
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
                            <Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0090107}</Text>        
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

                        {V0090701 !== '0' && 
                        <>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>414910040090701</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>CONSTANCIA DE <Text style={this.styles.headO}>{constaL}</Text></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0090701}</Text>         
                          </View>
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411710010070201</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>15% PRO EDUCACIÓN Y ASISTENCIA SOCIAL</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{constaQ}</Text>    
                          </View>
                        </View>
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411710010070202</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>15% PRO CAMINOS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{constaQ}</Text>     
                          </View>
                        </View>
                        </>}

                        {V0090702 !== '0' && 
                        <>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>414910040090702</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>CERTIFICACIÓN {certiL}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0090702}</Text>
                          </View>
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411710010070201</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>15% PRO EDUCACIÓN Y ASISTENCIA SOCIAL</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{certiQ}</Text>    
                          </View>
                        </View>
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411710010070202</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>15% PRO CAMINOS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{certiQ}</Text>     
                          </View>
                        </View>
                        </>}

                        {V0090703 !== '0' && 
                        <>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>414910040090703</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>DUPLICADOS Y COPIAS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0090703}</Text> 
                          </View>
                        </View>
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411710010070201</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>15% PRO EDUCACIÓN Y ASISTENCIA SOCIAL</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{servQ}</Text>    
                          </View>
                        </View>
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411710010070202</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>15% PRO CAMINOS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{servQ}</Text>     
                          </View>
                        </View>

                        </>
                        }

                        {V0090704 !== '0' && 
                        <> 
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>414910040090704</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>OTROS SERVICIOS: <Text style={this.styles.headO}>{otroservicio}</Text></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0090704}</Text>  
                          </View>
                        </View>
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411710010070201</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>15% PRO EDUCACIÓN Y ASISTENCIA SOCIAL</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{servQ}</Text>    
                          </View>
                        </View>
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>411710010070202</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>15% PRO CAMINOS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,{position: 'absolute'}]}>$</Text><Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{servQ}</Text>     
                          </View>
                        </View>
                        </>}

                        {V00913 !== '0' && <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '16%'}]}> 
                            <Text style={this.styles.tableCell}>4149100400913</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '65%'}]}> 
                            <Text style={this.styles.tableCell}>PRO-BOMBEROS Y PROTECCIÓN CIVIL</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '19%'}]}> 
                            <Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V00913}</Text>   
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
                            <Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0091301}</Text>   
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
                            <Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0010804}</Text>   
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
                            <Text style={[this.styles.tableCell,this.styles.labelR,{margin: 'auto'}]}>{V0010101}</Text>    
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

                      </View>
                      
                      <View>
                        <Text style={[this.styles.tableCell,{margin: 'auto',top: 1}]}>CANTIDAD CON LETRA:   (  <Text style={[this.styles.labelR,{textDecoration: "underline"}]}>{totalS}00/100 M.N.</Text>  )</Text>
                      </View>

                      <View >
                      <View>
                        <Text style={[this.styles.tableCell,{margin: 'auto',top: 3}]}>CHILAPA DE ÁLVAREZ, GRO., A<Text style={[this.styles.labelR,{textDecoration: "underline"}]}>       {dia}        </Text>DE<Text style={[this.styles.labelR,{textDecoration: "underline"}]}>          {mes}          </Text>DEL<Text style={[this.styles.labelR,{textDecoration: "underline"}]}>        {año}        </Text>   </Text>
                      </View>
                      <View style={{top: 3}} >  
                        <Text style={[this.styles.tableCell,this.styles.headO,{margin: 'auto'}]}>AUTORIZÓ:</Text>
                        <Text style={[this.styles.tableCell,{margin: 'auto'}]}>DIRECTOR DE CATASTRO MUNICIPAL</Text>
                      </View>
                      <View style={{top: 5}} >  
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
}
export default App;