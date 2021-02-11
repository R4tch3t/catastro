import React from 'react';
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import Search from "@material-ui/icons/Search";
import Poppers from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";
import Grow from "@material-ui/core/Grow";
import WN from "@material-ui/icons/Warning"
import Calendar from "react-calendar";
//import Map from "./Map";
import Maps from "./Maps2";
import Checker from "./Checker.js";
import Impuestos from "./Impuestos"
import SnackbarContent from 'components/Snackbar/SnackbarContent';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
export default (props) => {
    const {c} = props
    const {classes, classesM} = c.props
    const {center, zoom, nombre, horas, minutos, segundos, openDash, openCalendar, CBG, zona, openZona, tc, openTC, 
           CTA, openCTA, ctasIndexes, Y, totalN, disabledReg, currentD} = c.state
    const controls = {
      backgroundColor: "#fff",
      borderRadius: "2px",
      border: "1px solid transparent",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
      boxSizing: "border-box",
      fontFamily: "Roboto",
      fontSize: "15px",
      fontWeight: 300,
      height: "29px",
      marginLeft: "17px",
      marginTop: "10px",
      outline: "none",
      padding: "0 11px 0 13px",
      textOverflow: "ellipsis",
    }
    let h = 0
    let m = 0
    let s = 0
    //const dateSI = new Date()
    const onChangeDI = (date) => {
      let tzoffset = (new Date()).getTimezoneOffset() * 60000;
      date.setHours(h)
      date.setMinutes(m)
      date.setSeconds(s)
      let newDate = new Date(date-tzoffset)
      c.setState({currentD: date, horas: h, minutos: m, segundos: s})
      const dateUpV = document.getElementById('dateUp')
      dateUpV.value = newDate.toISOString().slice(0, -1)
      c.handleCloseCalendar()
    }
    const valueH=(value)=>{
      h = value
      return `${value}`;
    }
    const valueM = (value) => {
      m = value
      return `${value}`;
    }
    const valueS = (value) => {
      s = value
      return `${value}`;
    }
    
    /*const valueLM = (e)=>{
      if (e.target.value !== undefined) {
        console.log(`v: ${e.target.value}`)
        c.setState({horas: e.target.value})
      }
    }*/
    
    return (
      <div id="bodyOrden">
        <div className={classes.searchWrapper}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                formControlProps={{
                  className: classes.margin + " " + classes.search
                }}
                id="CTANM"
                inputProps={{
                  placeholder: "CTA",
                  type: "text",
                  onKeyUp: c.handleUpper,
                  //value: idUsuario,

                  inputProps: {
                    "aria-label": "Search"
                  }
                }}
              />
              <Button
                color="white"
                onClick={c.handleClickDash}
                aria-label="edit"
                aria-owns={openDash ? "profile-menu-list-grow" : null}
                aria-haspopup="true"
                justIcon
                round
              >
                <Search />
              </Button>

              <Poppers
                open={Boolean(openDash)}
                anchorEl={openDash}
                transition
                disablePortal
                className={
                  classNames({ [classesM.popperClose]: !openDash }) +
                  " " +
                  classesM.popperNav
                }
                style={{ zIndex: 9999 }}
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
                      <ClickAwayListener onClickAway={c.handleCloseDash}>
                        <MenuList role="menu">
                          <MenuItem
                            key={"cuenta"}
                            className={classesM.dropdownItem}
                            onClick={c.buscarCTA(0)}
                          >
                            Por CTA.
                          </MenuItem>
                          <MenuItem
                            key={"nombre"}
                            className={classesM.dropdownItem}
                            onClick={c.buscarCTA(1)}
                          >
                            Por nombre
                          </MenuItem>
                          <MenuItem
                            key={"folio"}
                            className={classesM.dropdownItem}
                            onClick={c.buscarFolio()}
                          >
                            Por folio
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Poppers>
            </GridItem>
            <GridContainer id='checkerCP' >
              {/*<Checker
                checkedIndexes={[0]}
                tasksIndexes={[0, 1]}
                strs={["URBANO", "RUSTICO"]}
                ids={["check", "check"]}
              />*/}
            </GridContainer>
            
          </GridContainer>
        </div>
        <div>
          <GridContainer >
              <GridItem id='sCarta' onMouseEnter={e=>{e.target.style.cursor='pointer'}} 
              xs={12} sm={12} md={12} style={{display: 'none'}} >
              <SnackbarContent
                icon={WN}
                message={
                  '¡ADVERTENCIA! - Candidato a CARTA INVITACIÓN'
                }
                color="danger"
                
              />

              </GridItem>
          </GridContainer>
          <GridContainer id='checkerM' >

          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={5}>
              <CustomInput
                labelText="NOMBRE O RAZÓN SOCIAL:"
                id="nombre"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "\0",
                  //value: nombre,
                  //onKeyDown: c.handleNombre,
                  //onBlur: c.handleNombreUp,
                  onKeyUp: c.handleUpper
                  
                  /* onClick: getinfoReg,
                        onChange: getinfoReg*/
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="FECHA DE REGISTRO:"
                id="dateUp"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "\0",
                  onClick: c.handleClickCalendar,
                  readOnly: true,
                  
                }}
              />
               <Poppers
                open={Boolean(openCalendar)}
                anchorEl={openCalendar}
                transition
                disablePortal
                className={
                  classNames({ [classesM.popperClose]: !openCalendar }) +
                  " " +
                  classesM.popperNav
                }
                style={{ zIndex: 9999 }}
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
                      <ClickAwayListener onClickAway={c.handleCloseCalendar}>
                        <MenuList role="menu">
                          <MenuItem
                            key={"calendar"}
                            className={classesM.dropdownItem}
                            style={{color: 'black'}}
                            //onClick={c.handleCloseCalendar}
                          >
                            <Typography id="discrete-slider" gutterBottom>
                              HORAS
                            </Typography>  
                            <Slider
                              defaultValue={horas}
                              getAriaValueText={valueH}
                              //onMouseLeave={valueLM}
                              aria-labelledby="discrete-slider"
                              valueLabelDisplay="auto"
                              step={1}
                              marks
                              min={0}
                              max={23}
                            />
                            <Typography id="discrete-slider" gutterBottom>
                              MINUTOS
                            </Typography>  
                            <Slider
                              defaultValue={minutos}
                              getAriaValueText={valueM}
                              aria-labelledby="discrete-slider"
                              valueLabelDisplay="auto"
                              step={1}
                              marks
                              min={0}
                              max={59}
                            />
                            <Typography id="discrete-slider" gutterBottom>
                              SEGUNDOS
                            </Typography>  
                            <Slider
                              defaultValue={segundos}
                              getAriaValueText={valueS}
                              aria-labelledby="discrete-slider"
                              valueLabelDisplay="auto"
                              step={1}
                              marks
                              min={0}
                              max={59}
                            />
                            <Calendar onChange={onChangeDI} value={currentD} />
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Poppers>
            </GridItem>
            <GridItem id='checkerN' xs={12} sm={12} md={3}> </GridItem>
            
          </GridContainer>
          {/*<Map c={c} />*/}
          {/*<div><iframe frameBorder='0' height='450' src='https://www.mapdevelopers.com/area_calculator_adv.php?zoom=1&lat=40&lng=-73&height=450&width=500&button_color=eeeeee&text_color=000000&' width='500'></iframe><div style={{fontSize: 10}}><a href="https://www.mapdevelopers.com/area_finder.php">Area calculator</a> provided by <a href="https://www.mapdevelopers.com">Map Developers</a></div></div>*/}
            <div style={{display: 'none'}} id="infowindow-content">
              <span id="place-name" style={{fontWeight: 'bold'}}></span><br/>
              <span id="place-barr" ></span><br/>
              <span id="place-city" ></span><br/>
              <span id="place-country" ></span><br/>
              
            </div>
            <div style={{display: 'none'}}>
              <input id='su' type='text' style={controls}  defaultValue='Chilapa' />
              <button id='tbm' style={controls}  > TERRENO </button>
              <button id='cbm' style={controls}  > CONSTRUCCION </button>
              <button id='et' style={controls}  > ELIMINAR TRAZOS </button>  
            </div>
            <Maps c={c} />
            
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="CALLE:"
                id="calle"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "\0",
                  //style: {"textTransform": "uppercase"}
                  onKeyUp: c.handleUpper,
                  onBlur: c.blurCalle
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <CustomInput
                labelText="NÚMERO EXT:"
                id="numCalle"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: 0,
                  onKeyUp: c.handleUpper
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <CustomInput
              labelText="LOTE:"
              id="lote"
              formControlProps={{
                  fullWidth: true
              }}
              inputProps={{
                  defaultValue: "\0",
                  onKeyUp: c.handleUpper
              }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <CustomInput
              labelText="MANZANA:"
              id="manzana"
              formControlProps={{
                  fullWidth: true
              }}
              inputProps={{
                  type: "text",
                  defaultValue: "\0",
                  onKeyUp: c.handleUpper
              }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="COLONIA:"
                id="colonia"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "\0",
                  onKeyUp: c.handleUpper
                  /* onClick: getinfoReg,
                        onChange: getinfoReg*/
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <CustomInput
                labelText="C.P:"
                id="cp"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  defaultValue: 41100
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="MUNICIPIO:"
                id="municipio"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "CHILAPA DE ÁLVAREZ",
                  onKeyUp: c.handleUpper
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
                  type: "text",
                  defaultValue: "\0",
                  onKeyUp: c.handleUpper
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="OBSERVACIONES:"
                id="observaciones"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "\0",
                  onKeyUp: c.handleUpper
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <Checker
              checkedIndexes={[0]}
              tasksIndexes={[0]}
              strs={["CALCULAR BASE GRAVABLE"]}
              ids={["cbg"]}
              fa={c.calcB}
            />
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText = "TERRENO (M²):"
                id="m1"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  defaultValue: 0,
                  onBlur: e => {
                    c.setZona(document.getElementById("zona").value);
                  },/*
                  onMouseUp: e => {
                    c.setZona(document.getElementById("zona").value);
                  },*/
                  disabled: CBG
                }}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText = "CONSTRUCCIÓN (M²):"
                id="m2"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  defaultValue: 0,
                  onBlur: e => {
                    c.setZona(document.getElementById("zona").value);
                  },
                  disabled: CBG
                }}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="TIPO DE CONSTRUCCIÓN:"
                id="tc"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  onKeyUp: c.handleKeyTC,
                  onClick: c.handleClickTC,
                  value: tc,
                  disabled: CBG
                }}
              />

              <Poppers
                open={Boolean(openTC)}
                anchorEl={openTC}
                transition
                disablePortal
                className={
                  classNames({ [classesM.popperClose]: !openTC }) +
                  " " +
                  classesM.popperNav
                }
                style={{ zIndex: 9999 }}
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
                      <ClickAwayListener onClickAway={c.handleCloseTC}>
                        <MenuList role="menu">
                          <MenuItem
                            key={"tc1"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(1)}
                          >
                            1: HABITACIONAL, PRECARIA (HAB)
                          </MenuItem>
                          <MenuItem
                            key={"tc2"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(2)}
                          >
                            2: HABITACIONAL, ECONOMICA (HBB)
                          </MenuItem>
                          <MenuItem
                            key={"tc3"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(2.5)}
                          >
                            2.5: HABITACIONAL, INTERES SOCIAL (HCB)
                          </MenuItem>
                          <MenuItem
                            key={"tc4"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(3)}
                          >
                            3: HABITACIONAL, REGULAR (HDB)
                          </MenuItem>
                          <MenuItem
                            key={"tc5"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(4)}
                          >
                            4: HABITACIONAL, INTERES MEDIO (HEB)
                          </MenuItem>
                          <MenuItem
                            key={"tc6"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(5)}
                          >
                            5: HABITACIONAL, BUENA (HFB)
                          </MenuItem>
                          <MenuItem
                            key={"tc7"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(6.5)}
                          >
                            6.5: HABITACIONAL, MUY BUENA (HGB)
                          </MenuItem>
                          <MenuItem
                            key={"tc8"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(37.5)}
                          >
                            37.5: COMERCIAL, ECONOMICA (CAB)
                          </MenuItem>
                          <MenuItem
                            key={"tc9"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(40)}
                          >
                            40: COMERCIAL, REGULAR (CBB)
                          </MenuItem>
                          <MenuItem
                            key={"tc10"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(43.5)}
                          >
                            43.5: COMERCIAL, BUENA (CCB)
                          </MenuItem>
                          <MenuItem
                            key={"tc11"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(44)}
                          >
                            44: COMERCIAL, MUY BUENA (CDB)
                          </MenuItem>
                          <MenuItem
                            key={"tc12"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(51)}
                          >
                            51: COMERCIAL, CENTRO COMERCIAL (CEB)
                          </MenuItem>
                          <MenuItem
                            key={"tc13"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(54.5)}
                          >
                            54.5: COMERCIAL, TIENDA DE AUTOSERVICIO (CFB)
                          </MenuItem>
                          <MenuItem
                            key={"tc14"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(63)}
                          >
                            63: COMERCIAL, TIENDA DEPARTAMENTAL (CGB)
                          </MenuItem>
                          <MenuItem
                            key={"tc15"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(8)}
                          >
                            8: INDUSTRIAL, ECONOMICA (IAB)
                          </MenuItem>
                          <MenuItem
                            key={"tc16"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(9.5)}
                          >
                            9.5: INDUSTRIAL, LIGERA (IBB)
                          </MenuItem>
                          <MenuItem
                            key={"tc17"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(14)}
                          >
                            14: INDUSTRIAL, MEDIANA (ICB)
                          </MenuItem>
                          <MenuItem
                            key={"tc18"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(2)}
                          >
                            2: EDIFICIOS DE OFICINA, REGULAR (OAB)
                          </MenuItem>
                          <MenuItem
                            key={"tc19"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(2)}
                          >
                            2: EDIFICIOS DE OFICINA, BUENA (OBB)
                          </MenuItem>
                          <MenuItem
                            key={"tc20"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(3)}
                          >
                            3: EDIFICIOS DE OFICINA, MUY BUENA (OCB)
                          </MenuItem>
                          <MenuItem
                            key={"tc21"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(12)}
                          >
                            12: INSTALACIONES ESPECIALES, CISTERNAS (EAB)
                          </MenuItem>
                          <MenuItem
                            key={"tc22"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(47)}
                          >
                            47: INSTALACIONES ESPECIALES, ELEVADORES (EBB)
                          </MenuItem>
                          <MenuItem
                            key={"tc23"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(2)}
                          >
                            2: O. COMPLEMENTARIAS, ESTACIONAMIENTO DESCUBIERTO
                            (FAB)
                          </MenuItem>
                          <MenuItem
                            key={"tc24"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(5)}
                          >
                            5: O. COMPLEMENTARIAS, ESTACIONAMIENTO CUBIERTO
                            (FBB)
                          </MenuItem>
                          <MenuItem
                            key={"tc25"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(4)}
                          >
                            4: O. COMPLEMENTARIAS, ALBERCA (FCB)
                          </MenuItem>
                          <MenuItem
                            key={"tc26"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(1)}
                          >
                            1: O. COMPLEMENTARIAS, CANCHA DE FUTBOL (FDB)
                          </MenuItem>
                          <MenuItem
                            key={"tc27"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(1)}
                          >
                            1: O. COMPLEMENTARIAS, CANCHA DE BASQUETBOL (FEB)
                          </MenuItem>
                          <MenuItem
                            key={"tc28"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(2)}
                          >
                            2: O. COMPLEMENTARIAS, BARDAS DE TABIQUE (FIB)
                          </MenuItem>
                          <MenuItem
                            key={"tc29"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(2)}
                          >
                            2: O. COMPLEMENTARIAS, AREAS JARDINADAS (FJB)
                          </MenuItem>
                          <MenuItem
                            key={"tc30"}
                            className={classesM.dropdownItem}
                            onClick={c.tcHandle(2)}
                          >
                            2: O. COMPLEMENTARIAS, VIALIDADES, ANDADORES Y
                            BANQUETAS (FLB)
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Poppers>
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="ZONA:"
                id="zona"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  onKeyUp: c.handleKeyZona,
                  onClick: c.handleClickZona,
                  value: zona,
                  disabled: CBG
                }}
              />

              <Poppers
                open={Boolean(openZona)}
                anchorEl={openZona}
                transition
                disablePortal
                className={
                  classNames({ [classesM.popperClose]: !openZona }) +
                  " " +
                  classesM.popperNav
                }
                style={{ zIndex: 9999 }}
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
                      
                       {c.state.tipoPredio==="u" && 
                       <ClickAwayListener onClickAway={c.handleCloseZona}>
                        <MenuList role="menu">
                          <MenuItem
                            key={"zona1-1"}
                            className={classesM.dropdownItem}
                            onClick={c.zonaHandle(3)}
                          >
                            3 (Zona 1)
                          </MenuItem>
                          <MenuItem
                            key={"zona1-2"}
                            className={classesM.dropdownItem}
                            onClick={c.zonaHandle(2.5)}
                          >
                            2.5 (Zona 1)
                          </MenuItem>
                          <MenuItem
                            key={"zona2"}
                            className={classesM.dropdownItem}
                            onClick={c.zonaHandle(2)}
                          >
                            2 (Zona 2)
                          </MenuItem>
                          <MenuItem
                            key={"zona3"}
                            className={classesM.dropdownItem}
                            onClick={c.zonaHandle(1.5)}
                          >
                            1.5 (Zona 3)
                          </MenuItem>
                          
                        </MenuList>
                        </ClickAwayListener>
                      }

                      {c.state.tipoPredio==="r" && 
                      <ClickAwayListener onClickAway={c.handleCloseZona}>
                        <MenuList role="menu">
                          <MenuItem
                            key={"zona1"}
                            className={classesM.dropdownItem}
                            onClick={c.zonaHandle(473.5)}
                          >
                            473.5: Terrenos de Riego
                          </MenuItem>
                          <MenuItem
                            key={"zona2"}
                            className={classesM.dropdownItem}
                            onClick={c.zonaHandle(438)}
                          >
                            438: Terrenos de Humedad
                          </MenuItem>
                          <MenuItem
                            key={"zona3"}
                            className={classesM.dropdownItem}
                            onClick={c.zonaHandle(414)}
                          >
                            414: Terrenos de Temporal
                          </MenuItem>
                          <MenuItem
                            key={"zona4"}
                            className={classesM.dropdownItem}
                            onClick={c.zonaHandle(402.5)}
                          >
                            402.5: Terreno de Agostadero Laborable
                          </MenuItem>
                          <MenuItem
                            key={"zona5"}
                            className={classesM.dropdownItem}
                            onClick={c.zonaHandle(367)}
                          >
                            367: Terreno de Agostadero Cerril
                          </MenuItem>
                          <MenuItem
                            key={"zona6"}
                            className={classesM.dropdownItem}
                            onClick={c.zonaHandle(473)}
                          >
                            473: Terreno de monte alto susceptibles para explotación forestal
                          </MenuItem>
                          <MenuItem
                            key={"zona7"}
                            className={classesM.dropdownItem}
                            onClick={c.zonaHandle(1.5)}
                          >
                            1.5 (Zona 3)
                          </MenuItem>
                        </MenuList>
                        </ClickAwayListener>
                      }
                    </Paper>
                  </Grow>
                )}
              </Poppers>
            </GridItem>
          </GridContainer>
          
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="BASE GRAVABLE:"
                id="baseGravable"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  defaultValue: 0,
                  onKeyUp: c.KUEnter,
                  onBlur: c.setBg
                }}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="NÚMERO DE CUENTA:"
                id="CTA"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  value: CTA,
                  onKeyUp: c.handleKeyCTA,
                  onClick: c.handleClickCTA
                }}
              />
              <Poppers
                open={Boolean(openCTA)}
                anchorEl={openCTA}
                transition
                disablePortal
                className={
                  classNames({ [classesM.popperClose]: !openCTA }) +
                  " " +
                  classesM.popperNav
                }
                style={{ zIndex: 9999 }}
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
                      <ClickAwayListener onClickAway={c.handleCloseCTA}>
                        <MenuList role="menu">
                          {ctasIndexes.map(e => (
                            <MenuItem
                              key={e.CTA}
                              className={classesM.dropdownItem}
                              onClick={c.rebuscarCTA(0, e.CTA)}
                            >
                              {e.CTA}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Poppers>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="PERIODO DE PAGO:"
                id="periodo"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: Y,
                  onBlur: c.blurPeriodo,
                  onKeyUp: c.blurPeriodo
                }}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="PÁGUESE LA CANTIDAD DE:"
                id="cantidadPago"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  value: totalN
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div style={{ height: 40 }} />

        <Impuestos classes={classes} classesM={classesM} c={c} />

        <div style={{ height: 40 }} />

        <div>
          <GridContainer>
            <Button
              id="regB"
              color="success"
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center"
              }}
              onClick={c.registrarO}
              disabled={disabledReg}
            >
              GENERAR ORDEN DE PAGO
            </Button>
          </GridContainer>
        </div>
      </div>
    );
}