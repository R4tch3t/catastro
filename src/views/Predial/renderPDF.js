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
import InformeM from "./InformeM";

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
  state = { url: null , dia: null, mes: null, año: null, renderPDF: null};
  constructor(props){
    super(props);
    const d = new Date();
    this.state={
      url:null,
      dia: d.getDate(),
      mes: d.getMonth(),
      año: d.getFullYear(),
      urbanoI: 0,
      renderPDF: null
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
    InformeM(this.props.dateSI, this.props.dateSF, this)
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
      height: 20, 
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
      paddingVertical: 3
    },
    tableCell2: { 
      marginLeft: 0, 
      marginTop: 2,
      marginBottom: 1,
      fontSize: 6,
      textAlign: 'center',
      paddingVertical: 3
    }

  });

  render() {
    const {classes} = this.props
    const {dia, mes, año, dataTable, renderPDF} = this.state
    const nDoc = `INFORME_MENSUAL_${mes}${año}`

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
                          <View style={[this.styles.tableColB,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>CONCEPTO</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '30%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>NÚMERO DE CONTRIBUYENTES</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '35%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>RECAUDACIÓN</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '15%',borderBottomWidth:0}]}>  
                            <Text style={this.styles.tableCell}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableColB,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>INGRESO CORRIENTE</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>URBANO(A)</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}>SUBURBANO(B)</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2,{fontSize: 5}]}>RÚSTICOS(C)</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2,{fontSize: 5,paddingVertical: 2}]}>TOTAL D=A+B+C</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>URBANAS(E)</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>SUBURBANAS(F)</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>RÚSTICOS(G)</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>TOTAL$ H=E+F+G</Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Impuesto</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.numU}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.numSub}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.numR}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.impuestoT}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.urbanoI}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.suburbanoI}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.rusticoI}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.totalI}</Text> 
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
                          <View style={[this.styles.tableColB,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,
                              {textAlign: 'right',paddingRight:5,paddingVertical: 2}]}>SUBTOTAL</Text> 
                          </View>
                         <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.numU}</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.numSub}</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.numR}</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.impuestoT}</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.urbanoI}</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.suburbanoI}</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.rusticoI}</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.totalI}</Text> 
                          </View>
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableColB,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>INGRESO POR REZAGO</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Impuesto</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.rezagosN}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.rezagosNR}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.rezagosN+dataTable.rezagosNR}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.rezagosI}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.rezagosIR}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.totalRezI}</Text> 
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
                          <View style={[this.styles.tableColB,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,
                              {textAlign: 'right',paddingRight:5,paddingVertical: 2}]}>SUBTOTAL</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.rezagosN}</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.rezagosNR}</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.rezagosN+dataTable.rezagosNR}</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.rezagosI}</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.rezagosIR}</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.totalRezI}</Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableColB,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>TOTAL</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.urbanoNT}</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.suburbanoNT}</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.rusticoNT}</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.totalN}</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.urbanoIT}</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.rusticoIT}</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.totalIT}</Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableColB,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{textAlign: 'left',fontSize: 8}]}>IMPUESTOS ADICIONALES</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Año corriente</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.numU}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.numSub}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.numR}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.impuestoT}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.urbanoA}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.suburbanoA}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.rusticoA}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.totalA}</Text> 
                          </View>  
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Años anteriores</Text> 
                          </View>
                           <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.rezagosN}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.rezagosNR}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.rezagosN+dataTable.rezagosNR}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.rezagosA}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.rezagosAR}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.totalRezA}</Text> 
                          </View>  
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableColB,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,
                              {textAlign: 'left',fontSize: 8}]}>VALORES VIRTUALES</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Impuesto</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.virtualN}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.virtualNR}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.virtualNT}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.virtualI}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.virtualIR}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.virtualIT}</Text> 
                          </View> 
                        </View>

                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,{textAlign: 'left'}]}>Adicionales</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.virtualN}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.virtualNR}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.virtualNT}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.virtualI2}</Text> 
                          </View> 
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.virtualIR2}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.virtualIT2}</Text> 
                          </View> 
                        </View>
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableColB,{width: '20%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{textAlign: 'left', fontSize: 6}]}>TOTAL DE CUENTAS REGISTRADAS</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.lengthU}</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '9%'}]}>  
                            <Text style={[this.styles.tableCell2]}></Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.lengthR}</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '7%'}]}>  
                            <Text style={[this.styles.tableCell2]}>{dataTable.lengthT}</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.padronU}</Text> 
                          </View> 
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}></Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '10%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.padronR}</Text> 
                          </View>
                          <View style={[this.styles.tableColB,{width: '15%'}]}>  
                            <Text style={this.styles.tableCell2}>{dataTable.padronT}</Text> 
                          </View> 
                        </View>
                        
                        <View style={[this.styles.tableRow,{height: 40}]}> 
                          <View style={[this.styles.tableCol,{width: '100%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,
                              {textAlign: 'left',fontSize: 8}]}>OBSERVACIONES</Text> 
                          </View>
                        </View>  
                        
                      </View>
                      
                      <View style={{position: 'absolute', width: '40%', bottom: 110}} >
                        <Text style={[this.styles.headO,{margin: 'auto', fontSize: 10}]}>ELABORÓ</Text>        
                      </View>
                      <View style={{position: 'absolute', width: '40%', bottom: 70}} >
                        <Text style={[{margin: 'auto', fontSize: 10, textDecoration: "underline"}]}>LIC. AGUSTÍN RONDÍN JUÁREZ</Text>        
                      </View>
                      <View style={{position: 'absolute', width: '40%', bottom: 55}} >
                        <Text style={[this.styles.headO,{margin: 'auto', fontSize: 10}]}>CARGO, NOMBRE Y FIRMA</Text>        
                      </View>
                      
                      <View style={{position: 'absolute', width: '150%', bottom: 110}} >
                        <Text style={[this.styles.headO,{margin: 'auto', fontSize: 10}]}>Vo. Bo.</Text>        
                      </View>
                      <View style={{position: 'absolute', width: '150%', bottom: 70}} >
                        <Text style={[{margin: 'auto', fontSize: 10, textDecoration: "underline"}]}>LIC. ALDY ESTEBAN ROMAN</Text>        
                      </View>
                      <View style={{position: 'absolute', width: '150%', bottom: 55}} >
                        <Text style={[this.styles.headO,{margin: 'auto', fontSize: 10}]}>EL TESORERO MUNICIPAL Y/O EQUIVALENTE</Text>        
                      </View>
                      <View style={{position: 'absolute', width: '100%', bottom: 30}} >
                        <Text style={[{margin: 'auto', fontSize: 8}]}>Edificio Juan Álvarez, 1er piso, Zaragoza esq. 16 de septiembre, col. Centro C.P. 3900, Chilpancingo, Gro. Tels. 47-1-91-15 y 47-1-39-32 fax </Text>        
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