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
import LogoC from "../Icons/LOGOI.jpeg";
import marca from "../Icons/marcagua.png";
import LogoD from "../Icons/LOGOD.jpeg";
import cintillo from "../../assets/img/cintillo.jpeg";
import RobI from "../Typography/Roboto-Italic.ttf";
import RobB from "../Typography/Roboto-Bold.ttf";
import RobBI from "../Typography/Roboto-BoldItalic.ttf";
import CustomInput from "components/CustomInput/CustomInput";
import spellNumber from "views/Dashboard/spellNumber";
//import spellNumber from "./spellNumber";
//import InformeM from "./InformeM";

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
      CTA: props.CTA,
      nombre: props.nombre,
      ubi: props.ubi,
      tp: props.tp,
      añoI: props.añoI,
      añoF: props.añoF,
      totalA: spellNumber(parseInt(props.añoF) - parseInt(props.añoI)).replace('PESOS', '').replace('PESO', '')
    }
    
  }


  onRender = ({ blob }) => {
    this.setState({ url: URL.createObjectURL(blob) });
    if (isMobile){
      let pdfview = document.getElementById("pdfView");
      let mobilePdf = document.getElementById('mobilePdf');
      let h = window.devicePixelRatio<2?960:360 //window.screen.availHeight;
      mobilePdf.style.height=`${h}px`;
      pdfview.style.display='none';
      ReactDOM.unmountComponentAtNode(mobilePdf)
      ReactDOM.render(<MobilePDFReader url={this.state.url} />, mobilePdf);
    }
  };
  
  handdleUp = (e) => {
    const añoI = document.getElementById('añoI').value
    const añoF = document.getElementById('añoF').value
    const totalA = spellNumber(parseInt(añoF) - parseInt(añoI)).replace('PESOS', '').replace('PESO', '')
    const ubi = document.getElementById('ubi').value

    this.setState({ubi, añoI, añoF, totalA})
  }

  handdleU = (e) => {
    const ubi = document.getElementById('ubi').value
    this.setState({ubi})
  }

  handleUpper = e => {
    if (e.which === 32 || e.which > 39) {
      this.selectionStartNombre = e.target.selectionStart
      this.selectionEndNombre = e.target.selectionEnd
      e.target.value = e.target.value.toUpperCase()
      e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
    }else if(e.which===13){
      this.handdleUp()
    }
  }

  handleUpperN = e => {
    if (e.which === 13) {
      this.handdleUp()
    }
  }
  componentDidMount(){
   // InformeM(this.props.dateSI, this.props.dateSF, this)
  }

  styles = StyleSheet.create({
    logoI: {
      position: "absolute",
      width: 125,
      height: 50,
      left: 30,
      top: 30
    },
    logoC: {
      position: "absolute",
      width: 150,
      height: 50,
      left: 230,
      top: 40
    },
    logoD: {
      position: "absolute",
      width: 125,
      height: 50,
      right: 15,
      top: 30
    },
    logoB: {
      position: "absolute",
      width: 600,
      opacity: 0.7,
      height: 500,
      left: 40,
      top: 150
    },
    cintillo: {
      position: "absolute",
      width: '95%',
      height: 30,
      right: 15,
      left: 15,
      bottom: 60
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
    const {dia, CTA, nombre, ubi, tp, mes, año, añoI, añoF, totalA} = this.state
    const nDoc = `CARTA_INVITACION_CTA_${CTA}_${dia}_${mes}_${año}`

    return (
      <CardIcon>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>PREDIAL</h4>
                <p className={classes.cardCategoryWhite}>
                  Carta invitación
                </p>
              </CardHeader>
              <CardBody>
              <React.Fragment>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="UBICACIÓN:"
                        id="ubi"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          defaultValue: ubi,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="AÑO INICIAL:"
                        id="añoI"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          defaultValue: añoI,
                          onKeyUp: this.handleUpperN,
                         // onMouseUp: this.handdleUp
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="AÑO FINAL:"
                        id="añoF"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          defaultValue: añoF,
                          onKeyUp: this.handleUpperN,
                         // onMouseUp: this.handdleUp
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <Button color="primary" 
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center"
                      }} 
                      onClick={this.handdleUp}
                      >
                        Cargar DATOS
                      </Button>
                  </GridContainer>
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
                      <Image src={LogoC} style={this.styles.logoC} />
                      <Image src={LogoD} style={this.styles.logoD} />
                      <Image src={marca} style={this.styles.logoB} />
                      {/*<Image src={LogoC} style={this.styles.logoB} />*/}
                      <Image src={cintillo} style={this.styles.cintillo} />
                      <View style={this.styles.headV} >
                        <Text style={[this.styles.headO,{position: "relative", top: 70, fontSize: 10}]} >
                          H. AYUNTAMIENTO MUNICIPAL CONSTITUCIONAL
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", top: 70, fontSize: 10}]} >
                          CHILAPA DE ALVAREZ, GUERRERO
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", top: 70, fontSize: 10}]} >
                          DIRECCIÓN DE CATASTRO E IMPUESTO PREDIAL
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", top: 90, fontSize: 12}]} >
                          CARTA INVITACIÓN
                        </Text>
                        
                      </View>
                      <View style={{paddingLeft: 105,paddingRight: 105, textAlign: 'justify'}} >
                        <View style={[{position: "relative", top: 90, fontSize: 11}]} >
                            <Text><Text style={{textDecoration: "underline"}} >C. {nombre}</Text></Text>
                        </View>
                        <Text style={[this.styles.headO,{position: "relative", top: 100, fontSize: 12}]} >
                          P R E S E N T E
                        </Text>
                        <View style={[{position: "relative", top: 120, fontSize: 11, width: '100%', textAlign: 'justify'}]} >
                            <Text style={{textAlign: 'justify'}} >El Gobierno Municipal, representado por el Lic. Jesús Parra García, te hace la mas atenta
                            y cordial invitación para que te pongas al corriente en el pago del Impuesto Predial de tu o
                            tus predios, acude a la Dirección de Catastro Municipal, Ubicada en calle 13 Norte N°
                            1312, Esquina Avenida Constitucion y aprovecha las facilidades que te brinda esta Administración Municipal
                            para regulizarte: <Text style={this.styles.headO} >Condonación de 100% en multas y recargos.</Text></Text>
                        </View>
                        <View style={[{position: "relative", top: 150, fontSize: 11, width: '100%', textAlign: 'justify'}]} >
                            <Text style={this.styles.headO} >Predio, cuenta predial número: 
                            <Text style={{textDecoration: "underline"}} >  {CTA}/{tp},  </Text>  ubicado en 
                            <Text style={{textDecoration: "underline"}} >  {ubi},  </Text>  adeuda los años 
                            <Text style={{textDecoration: "underline"}} >  {añoI}  </Text>  al  
                            <Text style={{textDecoration: "underline"}} >  {añoF},  </Text>  con un total de   
                            <Text style={{textDecoration: "underline"}} >     {totalA}  </Text>  año(s).</Text>
                        </View>
                        <View style={[{position: "relative", top: 180, fontSize: 11, width: '100%', textAlign: 'justify'}]} >
                            <Text style={{textAlign: 'justify'}} >Tu pago se transforma en obras y servicios en beneficio de los ciudadanos
                            del Municipio de Chilapa de Álvarez, Gro., gracias por tu apoyo. </Text>
                        </View>
                      </View>
                      
                      <View style={{position: 'absolute', width: '100%', bottom: 300}} >
                        <Text style={[this.styles.headO,{margin: 'auto', fontSize: 10}]}>ATENTAMENTE</Text>        
                      </View>
                      <View style={{position: 'absolute', width: '100%', bottom: 290}} >
                        <Text style={[this.styles.headO,{margin: 'auto', fontSize: 10}]}>EL DIRECTOR DE CATASTRO MUNICIPAL</Text>        
                      </View>
                      <View style={{position: 'absolute', width: '100%', bottom: 240}} >
                        <Text style={[this.styles.headO,{margin: 'auto', fontSize: 10}]}>LIC. AGUSTÍN RONDÍN JUÁREZ</Text>        
                      </View>
                      <View style={{paddingLeft: 105, paddingRight: 105, position: 'absolute', width: '100%', bottom: 140}} >
                        <Text style={[this.styles.headO,{margin: 'auto', fontSize: 10}]}>Nota: el portador de la Carta Invitación, no tiene facultad
                        de hacer cobros y descuentos, únicamente la oficina receptora (CATASTRO).</Text>        
                      </View>

                      <View style={{position: 'absolute', width: '100%', bottom: 40}} >
                        <Text style={[{margin: 'auto', fontSize: 8}]}>Calle 13 Norte No. 1312, Esquina Avenida Constitución </Text>        
                      </View>
                      <View style={{position: 'absolute', width: '100%', bottom: 30}} >
                        <Text style={[{margin: 'auto', fontSize: 8}]}>C.P 41100, Correo Electrónico: catastro_301015@hotmail.com
                         <Text style={{textDecoration: "underline"}} >   TELEFONO DE OFICINA (756) 47 50268   </Text>   </Text>        
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