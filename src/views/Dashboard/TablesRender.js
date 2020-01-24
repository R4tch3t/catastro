import React from 'react';
import cookie from "react-cookies";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
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
import Table from "components/Table/Table.js";
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
//import { bugs, website, server } from "variables/general.js";
import {
  creditoFovisste,
  seguroFovisste
} from "variables/charts.js";



export default class TableRender extends React.Component {
state={
    idUsuario: '',
    idQuincena: '',
    dataTable: [],
    classes: null,
    openDash: null,
    setOpenDash: null,
    lastD: 0.0,
    totalC: 0.0,
    totalS: 0.0,
    porcentajeC: 0,
    porcentajeS: 0
}
//[openDash, setOpenDash] = React.useState(null);
handleCloseDash = () => {
 // setOpenDash(null);
 //const {setOpenDash} = this.state
 this.setState({openDash: null})
};
constructor(props){
    super(props);
    const date = new Date()
    const lastD = date.getMonth()
    this.state = {
        idUsuario: props.idUsuario,
        idQuincena: props.idQuincena,
        dataTable: [],
        classes: props.classes,
        openDash: null,
        setOpenDash: null,
        lastD: lastD,
        totalC: 0.0,
        totalS: 0.0,
        porcentajeC: 0,
        porcentajeS: 0
    };
    this.obtenerQ(this.state.idUsuario,this.state.idQuincena)
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

obtenerQ=async(idUsuario,idQuincena)=>{
    try {

       const sendUri = "http://34.66.54.10:3015/";
       // const sendUri = "http://localhost:3015/";
        //const sendUri = "http://192.168.1.74:3015/";
        const bodyJSON = {
            idUsuario: idUsuario,
            idQuincena: idQuincena
        };
        var page = []
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

            if (r.quincenas !== undefined && r.quincenas.length > 0) {
              const data = {}
              data.labels = [
                "Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9","Q10","Q11","Q12",
                "Q13","Q14","Q15","Q16","Q17","Q18","Q19","Q20","Q21","Q22","Q23","Q24"
              ]
              data.series = [[]]
              
              var totalC = 0.0
              var totalS = 0.0
              var sumaQC = r.quincenas
              var sumaQS = []
              var cont = 0
              var cont2 = 0.0
              var porcentajeC = 0.0
              var porcentajeS = 0.0
              
              sumaQC.forEach(e1 => {
                e1.suma = 0.0
                sumaQS[cont] = 0.0 
                cont++
                /*if(cont===0){
                   cont2 = e1.idQuincena
                   
                }
                if(cont===1){
                  e1.idQuincena = cont2
                  cont=0
                }else{
                  cont++
                }*/
                
              });
              r.data.forEach(e => {
                totalC += parseFloat(e.desc_credito_fovisste.toString().replace('.', '').replace(',', '.'))
                totalS += parseFloat(e.desc_seguro_de_daños_fovisste.toString().replace('.', '').replace(',', '.'))
                cont = 0
                sumaQC.forEach(e1 => {
                  if (e1.idQuincena === e.idQuincena) {
                    e1.suma += parseFloat(e.desc_credito_fovisste.toString().replace('.', '').replace(',', '.'))
                    sumaQS[cont] += parseFloat(e.desc_seguro_de_daños_fovisste.toString().replace('.', '').replace(',', '.'))
                    if (cont2 < sumaQS[cont]){
                      cont2 = sumaQS[cont]
                    }
                  }
                  cont++
                });
              });
              data.series = [[]]
              cont = 0.0
              sumaQC.forEach(e1 => {
                if (cont < e1.suma){
                  cont = e1.suma
                }
                data.series[0].push(e1.suma)
              });
              porcentajeC = cont / totalC * 100
              porcentajeC=this.round(porcentajeC)
              porcentajeS = cont2 / totalS * 100
              porcentajeS = this.round(porcentajeS)
              totalC = totalC.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              totalS = totalS.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")

              creditoFovisste.data = data
              creditoFovisste.options.high = cont
              seguroFovisste.options.high = cont2
              seguroFovisste.data.series=[sumaQS]
              this.setState({totalC: totalC})
              this.setState({totalS: totalS})
              this.setState({porcentajeC: porcentajeC})
              this.setState({porcentajeS: porcentajeS})
              this.setState({dataTable: r.data})
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
        return page
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

searchU = () => {
    //const idEmpleado = document.getElementById('idEmpleado').value
    const {idUsuario} = this.state
    if(idUsuario!==''){
      const idQuincena = this.getParameterByName('idQuincena');
      if(idQuincena!==''){
        window.history.pushState(null, 'Buscar usuario', `#/admin/creditos?idQuincena=${idQuincena}&idUsuario=${idUsuario}`)
      }else{
        window.history.pushState(null, 'Buscar usuario', `#/admin/creditos?idUsuario=${idUsuario}`)
      }
    }else{
      window.history.pushState(null, 'Buscar usuario', `#/admin/creditos`)
    }
    window.history.go()
}

render() {
  const {dataTable} = this.state
  const {classes} = this.state;
  const {openDash} = this.state;
  //const {setOpenDash} = this.state;
  const {totalC} = this.state;
  const {totalS} = this.state;
  const {lastD} = this.state;
  const {porcentajeC} = this.state;
  const {porcentajeS} = this.state;
  const headCells = [
    { id: 'idEmpleado', numeric: true, disablePadding: true, label: 'CTE' },
    { id: 'NOMBRE', numeric: false, disablePadding: false, label: 'Nombre' },
    { id: 'descripcion', numeric: false, disablePadding: false, label: 'Quincena' },
    { id: 'desc_credito_fovisste', numeric: true, disablePadding: false, label: 'Crédito FOVISSTE' },
    { id: 'desc_seguro_de_daños_fovisste', numeric: true, disablePadding: false, label: 'Seguro de daños' },
  ]
  return (
    <CardIcon>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Impuesto predial</h4>
              <p className={classes.cardCategoryWhite}>
                Búsqueda de propietarios
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
              <div className={classes.searchWrapper}>
                <CustomInput
                  formControlProps={{
                    className: classes.margin + " " + classes.search
                  }}
                  id='idEmpleado'
                  inputProps={{
                    placeholder: "Buscar propietario",
                    type: 'text',
                    /*onKeyUp: this.handleKup,*/
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

              </div>
              <br />
              <br />
              <Table
                tableHeaderColor="warning"
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
        
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <LocalAtm />
              </CardIcon>
              <p className={classes.cardCategory}>Crédito FOVISSTE</p>
              <h3 className={classes.cardTitle}>{`TOTAL: $`}{totalC}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Últimos {lastD} meses
              </div>
            </CardFooter>
          </Card>
        </GridItem>
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
        {/*<GridItem xs={12} sm={6} md={3}>
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
        </GridItem>*/
        }
      </GridContainer>
      
    </CardIcon>
  )
}

}