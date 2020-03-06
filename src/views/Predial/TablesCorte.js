import React from 'react';
import cookie from "react-cookies";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import Pdf from "./renderPDF";
// @material-ui/core
//import { makeStyles } from "@material-ui/core/styles";
//import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import LocalAtm from "@material-ui/icons/LocalAtm";
//import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
//import LocalOffer from "@material-ui/icons/LocalOffer";
//import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
//import Accessibility from "@material-ui/icons/Accessibility";
//import BugReport from "@material-ui/icons/BugReport";
//import Code from "@material-ui/icons/Code";
//import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/TableCorte.js";
import classNames from "classnames";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
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
import Search from "@material-ui/icons/Search";
import Poppers from "@material-ui/core/Popper";
import Calendar from "react-calendar";
import ip from "variables/ip.js";
//import { bugs, website, server } from "variables/general.js";
import {
  corte,
 // corte
} from "variables/charts.js";
import encrypt from 'views/Dashboard/encrypt';



export default class TablesCorte extends React.Component {
state={
    dataTable: [],
    classes: null,
    openDash: null,
    setOpenDash: null,
    dateSI: null,
    dateSF: null,
    total: 0,
    porcentaje: 0
}
//[openDash, setOpenDash] = React.useState(null);
handleCloseDash = () => {
 // setOpenDash(null);
 //const {setOpenDash} = this.state
 this.setState({openDash: null})
};
constructor(props){
    super(props);
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const date = new Date(Date.now() - tzoffset)
    let dateSI = new Date(Date.now() - tzoffset)
    let dateSF = new Date(Date.now() - tzoffset)
    const lastD = date.getMonth()
    dateSI.setHours(0,0,0,0)
    dateSF.setHours(0,0,0,0)
    corte.options.high = 1000000
    corte.data.labels = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]
    corte.data.series = [[]]
    this.state = {
      dataTable: [],
      classes: props.classes,
      openDash: null,
      setOpenDash: null,
      lastD: lastD,
      dateSI: dateSI,
      dateSF: dateSF,
      total: 0,
      porcentaje: 0
    };
    
    //this.obtenerQ(this.state.idUsuario,this.state.idQuincena)
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
mes = (i) => {
  switch(i){
    case 0:
      return 'ENERO'
    case 1:
      return 'FEBRERO'
    case 2:
      return 'MARZO'
    case 3:
      return 'ABRIL'
    case 4:
      return 'MAYO'
    case 5:
      return 'JUNIO'
    case 6:
      return 'JULIO'
    case 7:
      return 'AGOSTO'
    case 8:
      return 'SEPTIEMBRE'
    case 9:
      return 'OCTUBRE'
    case 10:
      return 'NOVIEMBRE'
    default:
      return 'DICIEMBRE'
  }
}
obtenerOF=async(fi,ff)=>{
    try {
        const sendUri = ip("3014");
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        fi = (new Date(fi - tzoffset))//.toISOString()//.slice(0, -1);
       // tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        ff = (new Date(ff - tzoffset))//.toISOString().slice(0, -1);
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
              let porcentaje=0;
              data.objects = {}
              data.labels = []
              data.totales = []
              //dateSI.toLocaleDateString()
              const {dateSI} = this.state
              let dateLabel = dateSI
              let dateLast = ''
              
              r.ordenesu.forEach(e => { 
                e.dateUp = new Date(e.dateUp)
                e.dateUp = new Date(e.dateUp-tzoffset)
                data.push({
                  key: `${e.CTA}${i}u`,
                  cta: e.CTA,
                  NOMBRE: e.contribuyente,
                  tp: 'URBANO',
                  fecha: e.dateUp.toISOString().slice(0, -1),
                  total: e.total,
                  terreno: e.m1,
                  construccion: e.m2
                })
                i++
                if ((dateLast!==''&&e.dateUp.toLocaleDateString() !== dateLast) || i === r.ordenesu.length) {
                  if (i === r.ordenesu.length) {
                    totalD += parseInt(e.total);
                  }
                  
                  //dateLabel = e.dateUp
                  
                  data.objects[`${dateLast}`] = totalD
                  totalD=0
                }
                dateLast = e.dateUp.toLocaleDateString()
                total += parseInt(e.total); 
                totalD += parseInt(e.total);
              });

              i=0
              dateLabel = dateSI
              totalD=0
              dateLast = ''
              r.ordenesr.forEach(e => {
                e.dateUp = new Date(e.dateUp)
                e.dateUp = new Date(e.dateUp - tzoffset)
                data.push({
                  key: `${e.CTA}${i}r`,
                  cta: e.CTA,
                  NOMBRE: e.contribuyente,
                  tp: 'RUSTICO',
                  fecha: e.dateUp.toISOString().slice(0, -1),
                  total: e.total,
                  terreno: e.m1,
                  construccion: e.m2
                })
                //data.labels.push(`D${data.labels.length+1}`)
                //data.labels.push(`${dateLabel.toLocaleDateString()}`)
                //dateLabel.setDate(dateLabel.getDate() + 1);
                i++
                if ((dateLast !== '' && e.dateUp.toLocaleDateString() !== dateLast) || i === r.ordenesr.length) {
                  if (i === r.ordenesr.length){
                    totalD += parseInt(e.total);
                  }
                 // dateLabel = e.dateUp
                  
                  if (data.objects[`${dateLast}`]) {
                    data.objects[`${dateLast}`] += totalD
                  }else{
                    data.objects[`${dateLast}`] = totalD
                  }
                  totalD = 0
                }
                dateLast = e.dateUp.toLocaleDateString()
               // data.totales.push(e.total)
                total += parseInt(e.total); 
                totalD += parseInt(e.total);
              });
              const objects = Object.entries(data.objects).sort();
              if (objects.length<16){
                for (let [key, value] of objects) {
                  data.labels.push(key)
                  data.totales.push(value)
                  if(value>high){
                    high=value
                  }
                  porcentaje++
                }
              }else if(objects.length<30&&objects.length>15){
                dateLabel = new Date(dateSI)
                dateLabel.setDate(dateLabel+7)
                totalD = 0
                i=0
                for (let [key, value] of objects) {
                  
                  i++
                  if(new Date(key)>dateLabel||i===objects.length){
                    if (i === objects.length){
                      totalD += value
                      if (totalD > high) {
                        high = totalD
                      }
                      data.labels.push(`SEM ${i}`)
                      data.totales.push(totalD)
                      totalD=0
                      dateLabel = new Date(key)
                      dateLabel.setDate(dateLabel + 7)
                    }

                    porcentaje++
                  }
                  totalD+=value
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

              
              porcentaje = ((total/(porcentaje))/total)*100
              if (isNaN(porcentaje)){
                porcentaje = 0
                data.totales = [1]
              }else{
                porcentaje = this.round(porcentaje)
              }
              corte.options.high = high
              corte.data.labels = data.labels
              corte.data.series = [data.totales]
              
              //porcentaje = isNaN(porcentaje) ? 0:this.round(porcentaje)
              this.setState({dataTable: data, total: total, porcentaje});
              
              
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

getParameterByName=(name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
//upBand = false
handleKup = event => {
  //console.log(event.which)
  if (event.which===13){
  //  this.upBand = true
    //this.setState({openDash: event.currentTarget});
  }
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


onChangeDI = date => {
  const {dateSF} = this.state
  let dateNSF = new Date(dateSF)
  dateNSF.setDate(dateSF.getDate() + 1);
  this.obtenerOF(date, dateNSF)
  this.setState({ dateSI: date })
}
onChangeDF = date => {
  const {dateSI} = this.state
  let dateNSF = new Date(date);
  dateNSF.setDate(date.getDate() + 1);
  this.obtenerOF(dateSI, dateNSF);
  this.setState({ dateSF: date })
}

recorte = () => {
  const {dateSF} = this.state
  const {dateSI} = this.state
  let dateNSF = new Date(dateSF);
  dateNSF.setDate(dateSF.getDate() + 1);
  this.obtenerOF(dateSI, dateNSF);
}

informe = () => {
  let tzoffset = (new Date()).getTimezoneOffset() * 60000;
  let {dateSF} = this.state
  let {dateSI} = this.state
  let dateNSF = new Date(dateSF);
  dateNSF.setDate(dateSF.getDate() + 1);
  dateSI = new Date(dateSI - tzoffset).toISOString().slice(0, -1)
  dateNSF = new Date(dateNSF - tzoffset).toISOString().slice(0, -1)
  let subUrl = `?bandInfo=1&dateSI=${dateSI}&dateSF=${dateNSF}`
  let url = `#/admin/corte`
  url += `?v=${encrypt(subUrl)}`;
  const win = window.open(url, '_blank');
  win.focus();
}

render() {
  const {bandInfo} = this.props
  const {classes} = this.state;
  if(bandInfo==='1'){
    const {dateSI, dateSF} = this.props;
    return(<Pdf classes={classes}
            dateSI={dateSI} dateSF={dateSF} /> )
  }else{
  const {dataTable} = this.state
  const {dateSI, dateSF} = this.state;
  //const {setOpenDash} = this.state;
  const {total} = this.state;
  const {porcentaje} = this.state;
  const headCells = [
    { id: 'cta', numeric: true, disablePadding: true, label: 'CTA' },
    { id: 'NOMBRE', numeric: false, disablePadding: false, label: 'Nombre' },
    { id: 'tp', numeric: false, disablePadding: false, label: 'Tipo' },
    { id: 'fecha', numeric: false, disablePadding: false, label: 'Fecha y hora' },
    { id: 'total', numeric: false, disablePadding: false, label: 'Total' },
    { id: 'terreno', numeric: true, disablePadding: false, label: 'Terreno' },
    { id: 'construccion', numeric: true, disablePadding: false, label: 'Construcción' },
  ]

  return (
    <CardIcon>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>PREDIAL</h4>
              <p className={classes.cardCategoryWhite}>
                Corte de caja por fechas
              </p>
            </CardHeader>
            <CardBody>
              {/*<Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  r1
                ]}
              />*/}
              <div className={classes.searchWrapper}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <h4 className={classes.cardTitleBlack}>
                      Fecha de corte inicial:
                    </h4>
                    <Calendar onChange={this.onChangeDI} value={dateSI} />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <h4 className={classes.cardTitleBlack}>
                      Fecha de corte final:
                    </h4>
                    <Calendar onChange={this.onChangeDF} value={dateSF} />
                  </GridItem>
                </GridContainer>
                <div style={{height: 30}} />
                <GridContainer>
                  <Button
                    id="infoB"
                    color="primary"
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center"
                    }}
                    onClick={this.informe}
                  >
                    GNERAR INFORME
                  </Button>
                </GridContainer>
                <GridContainer>
                  <Button
                    id="regB"
                    color="success"
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center"
                    }}
                    onClick={this.recorte}
                  >
                    GENERAR RECORTE
                  </Button>
                  </GridContainer>
                {/*
                <CustomInput
                  formControlProps={{
                    className: classes.margin + " " + classes.search
                  }}
                  id='idEmpleado'
                  inputProps={{
                    placeholder: "CTA O NOMBRE",
                    type: 'text',
                    //onKeyUp: this.handleKup,
                    //value: idUsuario,
                    inputProps: {
                      "aria-label": "Search"
                    }
                  }}
                />
                <Button color="white" onClick={this.handleClickDash} aria-label="edit"
                aria-owns={openDash ? "profile-menu-list-grow" : null}
                aria-haspopup="true"
                justIcon round>
                  <Search />
                </Button>
                
                <Poppers
                  open={Boolean(openDash)}
                  anchorEl={openDash}
                  transition
                  disablePortal
                  className={
                    classNames({ [classes.popperClose]: !openDash }) +
                    " " +
                    classes.popperNav
                  }
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="profile-menu-list-grow"
                      style={{
                        transformOrigin:
                          placement === "bottom" ? "center top" : "center bottom"
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={this.handleCloseDash}>
                            <MenuList role="menu">
                              <MenuItem key={'cuenta'}
                                className={classes.dropdownItem}
                                //onClick={this.irA(key)}
                              >
                                Por CTE. 
                              </MenuItem>
                              <MenuItem key={'nombre'}
                                className={classes.dropdownItem}
                                //onClick={this.irA(key)}
                              >
                                Por nombre 
                              </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Poppers>
                */}
              </div>

              <Table
                tableHeaderColor="info"
                tableHead={headCells}
                tableData={dataTable}
              />
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
              <p className={classes.cardCategory}>SUMA TOTAL DEL CORTE: </p>
              <h3 className={classes.cardTitle}>{`$`}{total}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {`Periodo del ${dateSI.toLocaleDateString()} al ${dateSF.toLocaleDateString()}`}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        {/*<GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <LocalAtm />
              </CardIcon>
              <p className={classes.cardCategory}>Seguro de daños FOVISSTE</p>
              <h3 className={classes.cardTitle}>
                {`TOTAL: $`}
                {totalS}
              </h3>
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
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={corte.data}
                type="Bar"
                options={corte.options}
                listener={corte.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Gráfica de TOTALES</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} />{" "}
                  {porcentaje}%
                </span>{" "}
                total por día.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> {`Periodo del ${dateSI.toLocaleDateString()} al ${dateSF.toLocaleDateString()}`}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
{/*
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
                  <ArrowUpward className={classes.upArrowCardCategory} />{" "}
                  {porcentajeS}%
                </span>{" "}
                seguro por quincena.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Seguros de 2019
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        {/*<GridItem xs={12} sm={12} md={4}>
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
        </GridItem>//
      </GridContainer>*/}
    </CardIcon>
  );
  }
}

}