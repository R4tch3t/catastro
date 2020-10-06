import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import {isMobile} from "react-device-detect";
import Checker from './Checker';
import Poppers from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import stylesM from "assets/jss/material-dashboard-react/components/listItemStyle.js";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
//import setTCG from "../Dasboard/setTC";

const useStylesM = makeStyles(stylesM);
export default (props) => {
    const {c} = props;
    let selectionStartNombre = null;
    let selectionEndNombre = null;
   // let [tc, setTC] = React.useState(0);
    //let [zona, setZona] = React.useState(0);
    const d = new Date()
    const Y = d.getFullYear()
    const [openTC, setOpenTC] = React.useState(false);
    const [openZona, setOpenZona] = React.useState(false);
    const classesM = useStylesM();

    const handleUpper = e => {
        noDisabled(e)
        if ((e.which === 32 || e.which > 39) && !isMobile) {
            selectionStartNombre = e.target.selectionStart
            selectionEndNombre = e.target.selectionEnd
            e.target.value = e.target.value.toUpperCase()
            e.target.setSelectionRange(selectionStartNombre, selectionEndNombre);
        }
    }
    const padrones=()=>{
        const checkU = document.getElementById('check0');
        const tp = checkU.checked ? 'u' : 'r'
        c.padrones(tp)
    }

    const noDisabled=e=>{
        c.setState({
            disabledReg: false
        })
      //  handleUpper(e)
    }

    const handleKUpper = e => {
        noDisabled(e)
        if(props.a){
            padrones()
        }
    }
    const handleMUpper = e => {
        noDisabled(e)
        if (props.a) {
            padrones()
        }
    }

    const changeTC = event => {
       // const {openTC} = this.state;
        if (openTC && openTC.contains(event.target)) {
            //this.setState({openTC: null});
            setOpenTC(null);
        } else {
            //this.setState({openTC: event.currentTarget});
            setOpenTC(event.currentTarget);
        }
    }

    const handleClickTC = event => {
        /*if (this.state.CBG) {
            return false;
        }*/
        changeTC(event);
    };

    const handleKeyTC = event => {
        /*if (this.state.CBG) {
            return false;
        }
        this.setState({
            openTC: event.currentTarget
        });*/
        setOpenTC(event.currentTarget);
    };

    const handleCloseTC = () => {
        setOpenTC(null);
    };

    const tcHandle = (tc) => (e) => {
        //setTC(tc)
        document.getElementById('tc').value=tc;
        handleCloseTC();
        const zona = document.getElementById('zona').value
        calcBG(tc,zona);
    }

    const calcBG = async (tc = document.getElementById('tc').value, zona = document.getElementById('zona').value) => {
        if (!zona) {
            zona = 0 
        }
        if (!tc) {
            tc = 0
        }
        const bg = document.getElementById('baseGravable');
        const m1 = document.getElementById('m1').value;
        const m2 = document.getElementById('m2').value;
        let p1 = m1;
        let p2 = m2;
        let umaZ = 86.88 * zona;
        let umaC = 86.88 * tc;
        p1 = p1 * umaZ
        p2 = p2 * umaC

        bg.value = p1 + p2;
        bg.value = Math.round(bg.value)
        c.setState({disabledReg: false})
        
    }

    const zonaHandle = (zona) => (e) => {
        //setZona(zona)
        document.getElementById('zona').value=zona
        handleCloseZona();
        const tc = document.getElementById('tc').value
        calcBG(tc, zona);
    }

    const handleCloseZona = () => {
        setOpenZona(null)
    };

    const changeZona = event => {
        //const {openZona} = this.state;
        if (openZona && openZona.contains(event.target)) {
            setOpenZona(null)
        } else {
            setOpenZona(event.currentTarget)
        }
    }

    const handleClickZona = event => {
        changeZona(event);
    };

    const handleKeyZona = event => {
        /*this.setState({
            openZona: event.currentTarget
        });*/
        setOpenZona(event.currentTarget)
    };
return(
    <>
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
                defaultValue: c.dValInt,
                onKeyUp: handleKUpper,
                onMouseUp: handleMUpper
            }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
            <CustomInput
            labelText="NOMBRE"
            id="nombre"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
            defaultValue: c.dValue,
            onKeyUp: handleUpper,
            onMouseUp: handleUpper
            }}
            />
        </GridItem>
        <GridContainer>
        <Checker
            checkedIndexes={[0]}
            tasksIndexes={[0, 1]}
            strs={["URBANO", "RUSTICO"]}
            ids={["check", "check"]}
            fa={props.fa}
        />
        </GridContainer>
    </GridContainer>
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
                defaultValue: c.dValue,
                //style: {"textTransform": "uppercase"}
                onKeyUp: handleUpper
            }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={2}>
            <CustomInput
            labelText="NUMERO EXT:"
            id="numCalle"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "text",
                defaultValue: c.dValInt
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
                defaultValue: c.dValue,
                onKeyUp: handleUpper
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
                defaultValue: c.dValue,
                onKeyUp: handleUpper
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
                defaultValue: c.dValue,
                onKeyUp: handleUpper
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
                defaultValue: 'CHILAPA DE ÁLVAREZ',
                onKeyUp: handleUpper
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
                defaultValue: 'CHILAPA DE ÁLVAREZ',
                onKeyUp: handleUpper
            }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
            <CustomInput
            labelText="PERIODO:"
            id="periodo"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "text",
                defaultValue: Y
            }}
            />
        </GridItem>
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
                    calcBG()
                },
                onMouseUp: e => {
                    calcBG()
                },
                onKeyUp: e => {
                    calcBG()
                }
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
                    calcBG()
                },
                onMouseUp: e => {
                    calcBG()
                },
                onKeyUp: e => {
                    calcBG()
                }
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
                onKeyUp: handleKeyTC,
                onClick: handleClickTC,
                defaultValue: 0,
              //  disabled: CBG
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
                    <ClickAwayListener onClickAway={handleCloseTC}>
                    <MenuList role="menu">
                        <MenuItem
                        key={"tc1"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(1)}
                        >
                        1: HABITACIONAL, PRECARIA (HAB)
                        </MenuItem>
                        <MenuItem
                        key={"tc2"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(2)}
                        >
                        2: HABITACIONAL, ECONOMICA (HBB)
                        </MenuItem>
                        <MenuItem
                        key={"tc3"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(2.5)}
                        >
                        2.5: HABITACIONAL, INTERES SOCIAL (HCB)
                        </MenuItem>
                        <MenuItem
                        key={"tc4"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(3)}
                        >
                        3: HABITACIONAL, REGULAR (HDB)
                        </MenuItem>
                        <MenuItem
                        key={"tc5"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(4)}
                        >
                        4: HABITACIONAL, INTERES MEDIO (HEB)
                        </MenuItem>
                        <MenuItem
                        key={"tc6"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(5)}
                        >
                        5: HABITACIONAL, BUENA (HFB)
                        </MenuItem>
                        <MenuItem
                        key={"tc7"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(6.5)}
                        >
                        6.5: HABITACIONAL, MUY BUENA (HGB)
                        </MenuItem>
                        <MenuItem
                        key={"tc8"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(37.5)}
                        >
                        37.5: COMERCIAL, ECONOMICA (CAB)
                        </MenuItem>
                        <MenuItem
                        key={"tc9"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(40)}
                        >
                        40: COMERCIAL, REGULAR (CBB)
                        </MenuItem>
                        <MenuItem
                        key={"tc10"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(43.5)}
                        >
                        43.5: COMERCIAL, BUENA (CCB)
                        </MenuItem>
                        <MenuItem
                        key={"tc11"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(44)}
                        >
                        44: COMERCIAL, MUY BUENA (CDB)
                        </MenuItem>
                        <MenuItem
                        key={"tc12"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(51)}
                        >
                        51: COMERCIAL, CENTRO COMERCIAL (CEB)
                        </MenuItem>
                        <MenuItem
                        key={"tc13"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(54.5)}
                        >
                        54.5: COMERCIAL, TIENDA DE AUTOSERVICIO (CFB)
                        </MenuItem>
                        <MenuItem
                        key={"tc14"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(63)}
                        >
                        63: COMERCIAL, TIENDA DEPARTAMENTAL (CGB)
                        </MenuItem>
                        <MenuItem
                        key={"tc15"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(8)}
                        >
                        8: INDUSTRIAL, ECONOMICA (IAB)
                        </MenuItem>
                        <MenuItem
                        key={"tc16"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(9.5)}
                        >
                        9.5: INDUSTRIAL, LIGERA (IBB)
                        </MenuItem>
                        <MenuItem
                        key={"tc17"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(14)}
                        >
                        14: INDUSTRIAL, MEDIANA (ICB)
                        </MenuItem>
                        <MenuItem
                        key={"tc18"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(2)}
                        >
                        2: EDIFICIOS DE OFICINA, REGULAR (OAB)
                        </MenuItem>
                        <MenuItem
                        key={"tc19"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(2)}
                        >
                        2: EDIFICIOS DE OFICINA, BUENA (OBB)
                        </MenuItem>
                        <MenuItem
                        key={"tc20"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(3)}
                        >
                        3: EDIFICIOS DE OFICINA, MUY BUENA (OCB)
                        </MenuItem>
                        <MenuItem
                        key={"tc21"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(12)}
                        >
                        12: INSTALACIONES ESPECIALES, CISTERNAS (EAB)
                        </MenuItem>
                        <MenuItem
                        key={"tc22"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(47)}
                        >
                        47: INSTALACIONES ESPECIALES, ELEVADORES (EBB)
                        </MenuItem>
                        <MenuItem
                        key={"tc23"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(2)}
                        >
                        2: O. COMPLEMENTARIAS, ESTACIONAMIENTO DESCUBIERTO
                        (FAB)
                        </MenuItem>
                        <MenuItem
                        key={"tc24"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(5)}
                        >
                        5: O. COMPLEMENTARIAS, ESTACIONAMIENTO CUBIERTO
                        (FBB)
                        </MenuItem>
                        <MenuItem
                        key={"tc25"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(4)}
                        >
                        4: O. COMPLEMENTARIAS, ALBERCA (FCB)
                        </MenuItem>
                        <MenuItem
                        key={"tc26"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(1)}
                        >
                        1: O. COMPLEMENTARIAS, CANCHA DE FUTBOL (FDB)
                        </MenuItem>
                        <MenuItem
                        key={"tc27"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(1)}
                        >
                        1: O. COMPLEMENTARIAS, CANCHA DE BASQUETBOL (FEB)
                        </MenuItem>
                        <MenuItem
                        key={"tc28"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(2)}
                        >
                        2: O. COMPLEMENTARIAS, BARDAS DE TABIQUE (FIB)
                        </MenuItem>
                        <MenuItem
                        key={"tc29"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(2)}
                        >
                        2: O. COMPLEMENTARIAS, AREAS JARDINADAS (FJB)
                        </MenuItem>
                        <MenuItem
                        key={"tc30"}
                        className={classesM.dropdownItem}
                        onClick={tcHandle(2)}
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
                onKeyUp: handleKeyZona,
                onClick: handleClickZona,
                defaultValue: 0,
             //   disabled: CBG
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
                    <ClickAwayListener onClickAway={handleCloseZona}>
                    <MenuList role="menu">
                        <MenuItem
                        key={"zona1-1"}
                        className={classesM.dropdownItem}
                        onClick={zonaHandle(3)}
                        >
                        3 (Zona 1)
                        </MenuItem>
                        <MenuItem
                        key={"zona1-2"}
                        className={classesM.dropdownItem}
                        onClick={zonaHandle(2.5)}
                        >
                        2.5 (Zona 1)
                        </MenuItem>
                        <MenuItem
                        key={"zona2"}
                        className={classesM.dropdownItem}
                        onClick={zonaHandle(2)}
                        >
                        2 (Zona 2)
                        </MenuItem>
                        <MenuItem
                        key={"zona3"}
                        className={classesM.dropdownItem}
                        onClick={zonaHandle(1.5)}
                        >
                        1.5 (Zona 3)
                        </MenuItem>
                    </MenuList>
                    </ClickAwayListener>
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
    </GridContainer>        
    </>
)
}