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
import ip from "variables/ip";
import Calendar from "react-calendar";
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
const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
class App extends React.Component {
 // state = { url: null , dia: null, mes: null, año: null, renderPDF: null};
  constructor(props){
    super(props);
    const d = new Date();
    this.state={
      url:null,
      date: d,
      dia: d.getDate(),
      mes: d.getMonth(),
      año: d.getFullYear(),
      urbanoI: 0,
      folio: "0000",
      CTA: props.CTA,
      nombre: props.nombre,
      secretario: "",
      ubi: props.ubi,
      tp: props.tp,
      localidad: props.localidad,
      bg: props.bg,
      añoI: props.añoI,
      añoF: props.añoF,
      totalA: spellNumber(parseInt(props.añoF) - parseInt(props.añoI)).replace('PESOS', '').replace('PESO', '')
    }
    
  }

  bandNew=true;
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
    this.genCerti(0);
  };
  
  handdleUp = (e) => {
    const localidad = document.getElementById('localidad').value
    const secretario = document.getElementById('secretario').value
    const bg = document.getElementById('bg').value
    //const totalA = spellNumber(parseInt(añoF) - parseInt(añoI)).replace('PESOS', '').replace('PESO', '')
    const ubi = document.getElementById('ubi').value

    this.setState({ubi, localidad, secretario, bg })
    if(this.bandNew){
      this.genCerti(1);
    }
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

  genCerti=async(op)=>{
    const sendUri = ip("2977");
    const {CTA} = this.state;
    const c = this;
   // const op = 0;
      const bodyJSON = {
        CTA,op
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
        const b1 = document.getElementById("btnCerti");
        if(r.folio){
          b1.innerHTML="Actualizar CERTIFICADO CATASTRAL"
          const {folio} = r
          this.bandNew=false;
          c.setState({folio});
        }else if(r.new){
          b1.innerHTML="Generar CERTIFICADO CATASTRAL"
          const folio = r.lastFolio
          this.bandNew=true
          c.setState({folio});

        }
      });
  }
  
  onChangeD = date => {
    //const {date} = this.state
    //let dateNSF = new Date(dateSF)
    //dateNSF.setDate(dateSF.getDate() + 1);
    //this.obtenerOF(date, dateNSF)
    const dia = date.getDate();
    const mes = date.getMonth();
    const año = date.getFullYear();
    this.setState({ date, dia, mes, año });
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
    const {dia,secretario, CTA, nombre, ubi, tp, localidad,bg, mes, año, folio, date} = this.state
    const nDoc = `CERTIFICADO_CATASTRAL_CTA_${CTA}_${dia}_${meses[mes]}_${año}`
    let bgL = bg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          if (bgL!=='0'&&bgL.toString().split('.').length === 1) {
            bgL = `${bgL}.00`
          } else if (bgL === '0') {
            bgL = ''
          }
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
                        labelText="LOCALIDAD:"
                        id="localidad"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          defaultValue: localidad,
                          onKeyUp: this.handleUpper,
                         // onMouseUp: this.handdleUp
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="BASE GRABABLE:"
                        id="bg"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          defaultValue: bg,
                          onKeyUp: this.handleUpperN,
                         // onMouseUp: this.handdleUp
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="SECRETARIO:"
                        id="secretario"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          defaultValue: secretario,
                          onKeyUp: this.handleUpper,
                         // onMouseUp: this.handdleUp
                        }}
                      />

                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                      <h4 className={classes.cardTitleBlack}>
                        Fecha de expedido:
                      </h4>
                      <Calendar onChange={this.onChangeD} value={date} />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <Button 
                    id="btnCerti"
                    color="success" 
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center"
                      }} 
                      onClick={this.handdleUp}
                      >
                        Generar CERTIFICADO CATASTRAL
                      </Button>
                  </GridContainer>
                  {/*<GridContainer>
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
                    </GridContainer>*/}  
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
                        <Text style={[this.styles.headO,{position: "relative", top: 70, fontSize: 14}]} >
                          H. AYUNTAMIENTO MUNICIPAL CONSTITUCIONAL
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", top: 70, fontSize: 14}]} >
                          CHILAPA DE ALVAREZ, GUERRERO
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", top: 70, fontSize: 14}]} >
                          DIRECCIÓN DE CATASTRO E IMPUESTO PREDIAL
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", top: 90, fontSize: 14}]} >
                          SECRETARÍA DE FINANZAS MUNICIPAL
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", top: 120, fontSize: 22}]} >
                          CERTIFICADO CATASTRAL
                        </Text>
                        
                      </View>
                      <View style={{position:'absolute', top: '110px', right: '40px'}} >
                        <Text style={[this.styles.labelR,{position: 'absolute', fontSize: 10, right: '100px'}]}>FOLIO </Text>
                        <Text style={[this.styles.labelR,{position: 'absolute', fontSize: 10, color: 'red', right: '50px'}]}>{folio}</Text>
                      </View>
                      <View style={{paddingLeft: 35,paddingRight: 35, textAlign: 'justify'}} >
                        
                        <View style={[{position: "relative", top: 120, fontSize: 11, width: '100%', textAlign: 'justify'}]} >
                          <Text style={[this.styles.headO,{position: "relative", top: 50, fontSize: 12}]} >
                            SE HACE CONSTAR QUE EL PREDIO
                            <Text style={[this.styles.headT,{position: "relative",textDecoration: "underline", top: 50, fontSize: 12}]} >
                               {"                  "}{tp}{"                  "}
                            </Text>
                            UBICADO EN 
                            <Text style={[this.styles.headT,{position: "relative",textDecoration: "underline", top: 50, fontSize: 12}]} >
                               {"             "}{ubi}{"             "}
                            </Text>
                            DE LA LOCALIDAD DE
                            <Text style={[this.styles.headT,{position: "relative",textDecoration: "underline", top: 50, fontSize: 12}]} >
                               {"                  "}{localidad}{"                  "}
                            </Text>
                            MUNICIPIO DE
                            <Text style={[this.styles.headT,{position: "relative",textDecoration: "underline", top: 50, fontSize: 12}]} >
                               {"                  "}{"CHILAPA DE ÁLVAREZ"}{"                  "}
                            </Text>
                            , DISTRITO DE
                            <Text style={[this.styles.headT,{position: "relative",textDecoration: "underline", top: 50, fontSize: 12}]} >
                               {"                  "}{"ÁLVAREZ"}{"                  "}
                            </Text>
                            , PROPIEDAD DE
                            <Text style={[this.styles.headT,{position: "relative",textDecoration: "underline", top: 50, fontSize: 12}]} >
                               {"                  "}{nombre}{"                  "}
                            </Text>
                            , QUEDÓ REGISTRADO EN EL PADRÓN CORRESPONDIENTE BAJO EL N°   
                            <Text style={[this.styles.headT,{position: "relative",textDecoration: "underline", top: 50, fontSize: 12}]} >
                               {"                  "}{CTA}/{tp}{"                  "}
                            </Text>
                            CORRESPONDIENDOLE UNA BASE GRAVABLE DE $
                            <Text style={[this.styles.headT,{position: "relative",textDecoration: "underline", top: 50, fontSize: 12}]} >
                               {"                  "}{bgL}{"                  "}
                            </Text>
                             {" "}
                             
                          </Text>

                          <Text style={[this.styles.headT,{position: "relative",textDecoration: "underline", top: 55,textAlign:"center", fontSize: 12}]} >
                               {"(                            "}{spellNumber(bg)+" 00/100 M.N."}{"                             )"}
                            </Text>
                        </View>
                        
                        <View style={[{position: "relative", top: 160, fontSize: 11, width: '100%', textAlign: 'justify'}]} >
                          
                          <Text style={[this.styles.headO,{position: "relative", top: 50, fontSize: 12}]} >
                            
                            SE EXPIDE LA PRESENTE PARA LOS FINES DE INSCRIPCIÓN CATASTRAL DEL INMUEBLE DE ANTECEDENTES, EN LA CIUDAD DE CHILAPA DE ÁLVAREZ, GUERRERO, A LOS
                            <Text style={[this.styles.headT,{position: "relative",textDecoration: "underline", top: 50, fontSize: 12}]} >
                               {"             "}{spellNumber(dia).replace("PESOS","")}{"             "}
                            </Text> 
                            DÍAS DEL MES DE 
                            <Text style={[this.styles.headT,{position: "relative",textDecoration: "underline", top: 50, fontSize: 12}]} >
                               {"                  "}{meses[mes]}{"                  "}
                            </Text>
                            DE 
                            <Text style={[this.styles.headT,{position: "relative",textDecoration: "underline", top: 50, fontSize: 12}]} >
                               {"                  "}{año}{"                  "}
                            </Text>
                            {" "}
                          </Text>
                        </View>

                      </View>
                      
                      <View style={{position: 'absolute', width: '100%', bottom: 250}} >
                        <Text style={[this.styles.headO,{margin: 'auto', fontSize: 10}]}>ATENTAMENTE</Text>        
                      </View>
                      <View style={{position: 'absolute', width: '100%', bottom: 230}} >
                        <Text style={[this.styles.headO,{margin: 'auto', fontSize: 10}]}>EL SECRETARIO DE FINANZAS</Text>        
                      </View>
                      <View style={{position: 'absolute', width: '100%', bottom: 180}} >
                        <Text style={[this.styles.headO,{margin: 'auto', fontSize: 10}]}>
                          {" "}
                          <Text style={[this.styles.headT,{position: "relative",textDecoration: "underline", top: 50, fontSize: 12}]} >
                               {"                                   "}{secretario}{"                                   "}
                          </Text>
                            {" "}
                        </Text>        
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