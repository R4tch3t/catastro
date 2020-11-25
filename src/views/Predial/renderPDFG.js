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
import LogoI from "../Icons/LOGOGI.jpg";
import RobI from "../Typography/Roboto-Italic.ttf";
import RobB from "../Typography/Roboto-Bold.ttf";
import RobBI from "../Typography/Roboto-BoldItalic.ttf";
//import spellNumber from "./spellNumber";
import InformeG from "./InformeG";
import spellNumber from "views/Dashboard/spellNumber";

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

class App extends React.Component {
  state = {
    url: null,
    diaLI: null,
    diaI: null,
    mesI: null,
    añoI: null,
    diaLF: null,
    diaF: null,
    mesF: null,
    añoF: null,
    urbanoI: 0,
    renderPDF: null,
    dataTable: null,
    totalS: null
  };
  constructor(props){
    super(props);
    const d = new Date();
    let data={}
    data.total = '0'
    this.state={
      url:null,
      diaLI: d.getDay(),
      diaI: d.getDate(),
      mesI: d.getMonth(),
      añoI: d.getFullYear(),
      diaLF: d.getDay(),
      diaF: d.getDate(),
      mesF: d.getMonth(),
      añoF: d.getFullYear(),
      urbanoI: 0,
      renderPDF: null,
      dataTable: data,
      totalS: ''
    }
    
  }


  onRender = ({ blob }) => {
    this.setState({ url: URL.createObjectURL(blob) });
    if (isMobile){
      const win = window.open(this.state.url, '_blank');
      win.focus();
      
      const pdfview = document.getElementById("pdfView");
      const mobilePdf = document.getElementById('mobilePdf');
      const h = window.devicePixelRatio<2?960:360 //window.screen.availHeight;
      mobilePdf.style.height=`${h}px`;
      pdfview.style.display='none';
      ReactDOM.render(<MobilePDFReader url={this.state.url} />, mobilePdf);
      
    }
  };
  
  componentDidMount(){
    InformeG(this.props.dateSI, this.props.dateSF, this)
  }

  styles = StyleSheet.create({
    logoI: {
      position: "absolute",
      width: 125,
      height: 50,
      left: 30,
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
      width: "95%", 
      left: 15,
      top: 30,
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0 
    },
    tableRow: { 
      margin: "auto",
      height: 30, 
      flexDirection: "row" 
    },
    tableCol: {
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0
    },
    tableColB: {
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      backgroundColor: 'green'
    },
    tableCell: { 
      marginLeft: 0, 
      marginTop: 2,
      marginBottom: 1,
      fontSize: 9,
      textAlign: 'center',
      paddingVertical: 4
    },
    tableCell2: { 
      marginLeft: 0, 
      marginTop: 5,
      marginBottom: 1,
      fontSize: 12,
      textAlign: 'center',
      paddingVertical: 3
    }

  });

  render() {
    const {classes} = this.props
    const {diaI, diaLI, mesI, añoI, diaF, diaLF, mesF, añoF, dataTable, totalS, renderPDF} = this.state
    const nDoc = `INFORME_GENERAL_${mesI}${añoI}`
    
    
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
              { renderPDF && <React.Fragment>
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
                  <MobileView>
                    <div id='mobilePdf' style={{ position: 'relative', top: 20, width: '100%' }} ></div>
                    
                  </MobileView>
                  <PDFViewer id='pdfView' style={{ width: '100%', height: 1180 }}  >
                  <Document shallow onRender={this.onRender} title={`${nDoc}.pdf`} >
                    <Page size="LETTER" wrap>
                      <Image src={LogoI} style={this.styles.logoI} />
                      <View style={this.styles.headV} >
                        <Text style={[this.styles.headO,{position: "relative", left: 150, fontSize: 8}]} >
                          SUBSECRETARÍA DE INGRESOS
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", left: 150, fontSize: 8}]} >
                          COORDINACIÓN GENERAL DE CATASTRO
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", top: 30, fontSize: 10}]} >
                          INFORME GENERAL DE LA RECAUDACIÓN DEL IMPUESTO PREDIAL, AÑO {añoI}
                        </Text>
                        {diaF !== diaI &&
                        <View style={[this.styles.headT,{position: "relative", top: 40, fontSize: 10}]} >
                          <Text>H. AYUNTAMIENTO DE:  <Text style={{textDecoration: "underline"}} >CHILAPA DE ÁLVAREZ, GUERRERO</Text>    <Text style={{textDecoration: "underline"}} >{diaLI} {diaI} de {mesI} del {añoI}</Text>  al  <Text style={{textDecoration: "underline"}} >{diaLF} {diaF} de {mesF} del {añoF}</Text></Text>
                        </View>}
                        {diaF === diaI &&
                        <View style={[this.styles.headT,{position: "relative", top: 40, fontSize: 10}]} >
                          <Text>H. AYUNTAMIENTO DE:  <Text style={{textDecoration: "underline"}} >CHILAPA DE ÁLVAREZ, GUERRERO</Text>                                                              <Text style={{textDecoration: "underline"}} >{diaLI} {diaI} de {mesI} del {añoI}</Text> </Text>
                        </View>}
                        
                      </View>
                      {/*<View style={{position:'absolute', top: '110px', right: '40px'}} >
                        <Text style={[this.styles.labelR,{position: 'absolute', fontSize: 10, right: '100px'}]}>FOLIO </Text>
                        <Text style={[this.styles.labelR,{position: 'absolute', fontSize: 10, color: 'red', right: '50px'}]}>{folio}</Text>
                      </View>*/}
                      <View style={this.styles.table}> 
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableColB,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell2,this.styles.headO,{paddingVertical: 2}]}>CONCEPTOS</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell2,this.styles.headO,{paddingVertical: 2}]}>TOTAL</Text> 
                          </View>
                          {/*<View style={[this.styles.tableColB,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell2,this.styles.headO,{paddingVertical: 2}]}>PORCENTAJE</Text> 
                          </View>*/} 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={this.styles.tableCell2}>PREDIAL URBANO</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.totalPU}</Text> 
                          </View>
                          {/*<View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.porcentajeU} %</Text> 
                          </View>*/}
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={this.styles.tableCell2}>PREDIAL RÚSTICO</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.totalPR}</Text> 
                          </View>
                          {/*<View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.porcentajeR} %</Text> 
                          </View>*/}
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={this.styles.tableCell2}>ALTAS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.totalA}</Text> 
                          </View>
                          {/*<View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>*/}
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={this.styles.tableCell2}>FORMAS Y CONSTANCIAS</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.totalF}</Text> 
                          </View>
                          {/*<View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>*/}
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={this.styles.tableCell2}>SUMA TOTAL</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.total}</Text> 
                          </View>
                          {/*<View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.porcentajeT} %</Text> 
                          </View>*/}
                        </View>
                      </View>
                      <View >
                        <Text style={[{margin: 'auto', top: '30', fontSize: 9}]} >CANTIDAD CON LETRA:   (  <Text style={[this.styles.labelR,{textDecoration: "underline"}]}>{totalS}00/100 M.N.</Text>  )</Text>
                      </View>
                      <View>
                        <Text style={[this.styles.headO,{margin: 'auto', top: '60', right: '185', fontSize: 10}]}>ELABORÓ</Text>        
                      </View>
                      <View>
                        <Text style={[{margin: 'auto',  top: '90', right: '185', fontSize: 10, textDecoration: "underline"}]}>LIC. AGUSTÍN RONDÍN JUÁREZ</Text>        
                      </View>
                      <View>
                        <Text style={[this.styles.headO,{margin: 'auto', top: '90', right: '185', fontSize: 10}]}>CARGO, NOMBRE Y FIRMA</Text>        
                      </View>
                      
                      <View>
                        <Text style={[this.styles.headO,{margin: 'auto', top: '20', left: '165', fontSize: 10}]}>Vo. Bo.</Text>        
                      </View>
                      <View>
                        <Text style={[{margin: 'auto', top: '50', left: '165', fontSize: 10, textDecoration: "underline"}]}>LIC. ALDY ESTEBAN ROMAN</Text>        
                      </View>
                      <View>
                        <Text style={[this.styles.headO,{margin: 'auto', top: '50', left: '165', fontSize: 10}]}>SECRETARIO DE FINANZAS MUNICIPAL</Text>        
                      </View>
                      <View>
                        <Text style={[{margin: 'auto', top: '60', left: '0', fontSize: 8}]}>Calle 13 Norte No. 1312, Esquina Avenida Constitución, C.P 41100, Correo Electrónico: catastro_301015@hotmail.com
                         <Text style={{textDecoration: "underline"}} >   TELEFONO DE OFICINA (756) 47 50268   </Text>  </Text>        
                      </View>

                    </Page>
                  </Document>
                  </PDFViewer>
                </React.Fragment>
              }

              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </CardIcon>
    );
  }
}
export default App;