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
import Checker from "./Checker.js";
import Impuestos from "./Impuestos"
export default (props) => {
    const {c} = props
    const {classes, classesM} = c.props
    const {nombre, openDash, CBG, zona, openZona, tc, openTC, 
           CTA, Y, totalN} = c.state

    return(
        <div id='bodyOrden' >
        <div className={classes.searchWrapper}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                    formControlProps={{
                        className: classes.margin + " " + classes.search 
                    }}
                    id='CTANM'
                    inputProps={{
                        placeholder: "CTA O NOMBRE",
                        type: 'text',
                        onKeyUp: c.handleUpper,
                        //value: idUsuario,
                        
                        inputProps: {
                        "aria-label": "Search"
                        }
                    }}
                    />
                    <Button color="white" onClick={c.handleClickDash} aria-label="edit"
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
                        classNames({ [classesM.popperClose]: !openDash }) +
                        " " +
                        classesM.popperNav
                    }
                    style={{zIndex: 9999}}
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
                                <MenuItem key={'cuenta'}
                                    className={classesM.dropdownItem}
                                    onClick={c.buscarCTA(0)}
                                >
                                    Por CTA. 
                                </MenuItem>
                                <MenuItem key={'nombre'}
                                    className={classesM.dropdownItem}
                                    onClick={c.buscarCTA(1)}
                                >
                                    Por nombre 
                                </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                    </Poppers>
                </GridItem>
                <GridContainer>

                    <Checker
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    strs={['URBANO','RUSTICO']}
                    ids={['check','check']}
                    />

                </GridContainer>
            </GridContainer>
        </div>
        <div>
            <GridContainer>                  
                <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                        labelText="NOMBRE O RAZON SOCIAL:"
                        id="nombre"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps = {{
                        type: 'text',
                        //defaultValue: ' '
                        value: nombre,
                        onKeyDown: c.handleNombre,
                        onKeyUp: c.handleNombreUp
                        /* onClick: getinfoReg,
                        onChange: getinfoReg*/
                        }}
                    />
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                    labelText="CALLE:"
                    id="calle"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps = {{
                        type: 'text',
                        defaultValue: '\0',
                        //style: {"textTransform": "uppercase"}
                        onKeyUp: c.handleUpper,
                        onBlur: c.blurCalle,
                    }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                    labelText="NUMERO:"
                    id="numCalle"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps = {{
                        type: 'number', 
                        defaultValue: 0
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
                    inputProps = {{
                        type: 'text',
                        defaultValue: '\0',
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
                    inputProps = {{
                        type: 'number',
                        defaultValue: 0
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
                    inputProps = {{
                        type: 'text',
                        defaultValue: '\0',
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
                    inputProps = {{
                        type: 'text',
                        defaultValue: '\0',
                        onKeyUp: c.handleUpper
                    }}
                    />
                </GridItem>
            </GridContainer>
            <GridContainer >
                        
                <Checker
                    checkedIndexes={[]}
                    tasksIndexes={[0]}
                    strs={['CALCULAR BASE GRAVABLE']}
                    ids={['cbg']}
                    fa = {c.calcB}
                />
                         
            </GridContainer>
                 
            <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                labelText="TERRENO (METROS CUADRADOS):"
                id="m1"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps = {{
                    type: 'number',
                    defaultValue: 0,
                    onChange: (e)=>{ c.setZona(document.getElementById('zona').value) },
                    disabled: CBG
                }}
                />
            </GridItem>
            
            <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                labelText="CONSTRUCCION (METROS CUADRADOS):"
                id="m2"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps = {{
                    type: 'number',
                    defaultValue: 0,
                    onChange: (e)=>{ c.setZona(document.getElementById('zona').value) },
                    disabled: CBG
                }}
                />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                labelText="TIPO DE CONSTRUCCION:"
                id="tc"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps = {{
                    type: 'number', 
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
                style={{zIndex: 9999}}
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
                            <MenuItem key={'tc1'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(1)}
                            >
                                1: HABITACIONAL, PRECARIA (HAB)
                            </MenuItem>
                            <MenuItem key={'tc2'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(2)}
                            >
                                2: HABITACIONAL, ECONOMICA (HBB)
                            </MenuItem>
                            <MenuItem key={'tc3'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(2.5)}
                            >
                                2.5: HABITACIONAL, INTERES SOCIAL (HCB)
                            </MenuItem>
                            <MenuItem key={'tc4'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(3)}
                            >
                                3: HABITACIONAL, REGULAR (HDB)
                            </MenuItem>
                            <MenuItem key={'tc5'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(4)}
                            >
                                4: HABITACIONAL, INTERES MEDIO (HEB)
                            </MenuItem>
                            <MenuItem key={'tc6'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(5)}
                            >
                                5: HABITACIONAL, BUENA (HFB)
                            </MenuItem>
                            <MenuItem key={'tc7'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(6.5)}
                            >
                                6.5: HABITACIONAL, MUY BUENA (HGB)
                            </MenuItem>
                            <MenuItem key={'tc8'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(37.5)}
                            >
                                37.5: COMERCIAL, ECONOMICA (CAB)
                            </MenuItem>
                            <MenuItem key={'tc9'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(40)}
                            >
                                40: COMERCIAL, REGULAR (CBB)
                            </MenuItem>
                            <MenuItem key={'tc10'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(43.5)}
                            >
                                43.5: COMERCIAL, BUENA (CCB)
                            </MenuItem>
                            <MenuItem key={'tc11'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(44)}
                            >
                                44: COMERCIAL, MUY BUENA (CDB)
                            </MenuItem>
                            <MenuItem key={'tc12'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(51)}
                            >
                                51: COMERCIAL, CENTRO COMERCIAL (CEB)
                            </MenuItem>
                            <MenuItem key={'tc13'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(54.5)}
                            >
                                54.5: COMERCIAL, TIENDA DE AUTOSERVICIO (CFB)
                            </MenuItem>
                            <MenuItem key={'tc14'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(63)}
                            >
                                63: COMERCIAL, TIENDA DEPARTAMENTAL (CGB)
                            </MenuItem>
                            <MenuItem key={'tc15'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(8)}
                            >
                                8: INDUSTRIAL, ECONOMICA (IAB)
                            </MenuItem>
                            <MenuItem key={'tc16'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(9.5)}
                            >
                                9.5: INDUSTRIAL, LIGERA (IBB)
                            </MenuItem>
                            <MenuItem key={'tc17'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(14)}
                            >
                                14: INDUSTRIAL, MEDIANA (ICB)
                            </MenuItem>
                            <MenuItem key={'tc18'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(2)}
                            >
                                2: EDIFICIOS DE OFICINA, REGULAR (OAB)
                            </MenuItem>
                            <MenuItem key={'tc19'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(2)}
                            >
                                2: EDIFICIOS DE OFICINA, BUENA (OBB)
                            </MenuItem>
                            <MenuItem key={'tc20'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(3)}
                            >
                                3: EDIFICIOS DE OFICINA, MUY BUENA (OCB)
                            </MenuItem>
                            <MenuItem key={'tc21'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(12)}
                            >
                                12: INSTALACIONES ESPECIALES, CISTERNAS (EAB)
                            </MenuItem>
                            <MenuItem key={'tc22'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(47)}
                            >
                                47: INSTALACIONES ESPECIALES, ELEVADORES (EBB)
                            </MenuItem>
                            <MenuItem key={'tc23'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(2)}
                            >
                                2: O. COMPLEMENTARIAS, ESTACIONAMIENTO DESCUBIERTO (FAB)
                            </MenuItem>
                            <MenuItem key={'tc24'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(5)}
                            >
                                5: O. COMPLEMENTARIAS, ESTACIONAMIENTO CUBIERTO (FBB)
                            </MenuItem>
                            <MenuItem key={'tc25'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(4)}
                            >
                                4: O. COMPLEMENTARIAS, ALBERCA (FCB)
                            </MenuItem>
                            <MenuItem key={'tc26'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(1)}
                            >
                                1: O. COMPLEMENTARIAS, CANCHA DE FUTBOL (FDB)
                            </MenuItem>
                            <MenuItem key={'tc27'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(1)}
                            >
                                1: O. COMPLEMENTARIAS, CANCHA DE BASQUETBOL (FEB)
                            </MenuItem>
                            <MenuItem key={'tc28'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(2)}
                            >
                                2: O. COMPLEMENTARIAS, BARDAS DE TABIQUE (FIB)
                            </MenuItem>
                            <MenuItem key={'tc29'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(2)}
                            >
                                2: O. COMPLEMENTARIAS, AREAS JARDINADAS (FJB)
                            </MenuItem>
                            <MenuItem key={'tc30'}
                                className={classesM.dropdownItem}
                                onClick={c.tcHandle(2)}
                            >
                                2: O. COMPLEMENTARIAS, VIALIDADES, ANDADORES Y BANQUETAS (FLB)
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
                inputProps = {{
                    type: 'number', 
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
                style={{zIndex: 9999}}
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
                        <ClickAwayListener onClickAway={c.handleCloseZona}>
                            <MenuList role="menu">
                            <MenuItem key={'zona1-1'}
                                className={classesM.dropdownItem}
                                onClick={c.zonaHandle(3)}
                            >
                                3 (Zona 1) 
                            </MenuItem>
                            <MenuItem key={'zona1-2'}
                                className={classesM.dropdownItem}
                                onClick={c.zonaHandle(2.5)}
                            >
                                2.5 (Zona 1)
                            </MenuItem>
                            <MenuItem key={'zona2'}
                                className={classesM.dropdownItem}
                                onClick={c.zonaHandle(2)}
                            >
                                2 (Zona 2)
                            </MenuItem>
                            <MenuItem key={'zona3'}
                                className={classesM.dropdownItem}
                                onClick={c.zonaHandle(1.5)}
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
                inputProps = {{
                    type: 'number',
                    defaultValue: 0,
                    onChange: c.setBg,
                    onBlur: c.setBg
                }}
                />
            </GridItem>
            
            <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                labelText="NUMERO DE CUENTA:"
                id="CTA"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps = {{
                    type: 'number',
                    value: CTA
                /* onClick: getinfoReg,
                    onChange: getinfoReg*/
                }}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                labelText="PERIODO DE PAGO:"
                id="periodo"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps = {{
                    type: 'text',
                    defaultValue: Y
                /* onClick: getinfoReg,
                    onChange: getinfoReg*/
                }}
                />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                labelText="PAGUESE LA CANTIDAD DE:"
                id="cantidadPago"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps = {{
                    type: 'number',
                    value: totalN
                }}
                />
            </GridItem>    

            </GridContainer>
        </div>
        <div style={{height: 40}} />
  
        <Impuestos classes={classes} fa={c.addImpuesto} />

        <div style={{height: 40}} />

        <div>
            <GridContainer>
                    
                <Button id = 'regB'
                color="success"
                style = {
                    {
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center'
                    }
                }
                onClick = {c.registrarO}
                >
                GENERAR ORDEN DE PAGO
                </Button>
                                
            </GridContainer>
        </div>
        </div>
    )
}