import React from "react";
import GridItem from "components/Grid/GridItem.js";
import Poppers from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import GridContainer from "components/Grid/GridContainer.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import clearCheck from "./clearCheck";
import renderCI from "./renderCI";

export default class Impuestos extends React.Component {
  /*state={
    openConsta: null
  }*/
constructor(props){
    super(props)
    this.state={
      openConsta: null,
      openCerti: null
    }
}

fa = (id) =>{
   const {fa} = this.props;
   fa(id); 
}

changeConsta = event => {
  const {openConsta} = this.state;
  if (openConsta && openConsta.contains(event.target)) {
    //setOpenDash(null);
    this.setState({openConsta: null});
  } else {
    //setOpenDash(event.currentTarget);
    this.setState({openConsta: event.currentTarget});
  }
}

handleCloseConsta = () =>{
  this.setState({openConsta: null})
}

handleOpenConsta = event =>{
  this.changeConsta(event);
}

changeCerti = event => {
  const {openCerti} = this.state;
  if (openCerti && openCerti.contains(event.target)) {
    //setOpenDash(null);
    this.setState({openCerti: null});
  } else {
    //setOpenDash(event.currentTarget);
    this.setState({openCerti: event.currentTarget});
  }
}

handleCloseCerti = () =>{
  this.setState({openCerti: null})
}

handleOpenCerti = event =>{
  this.changeCerti(event);
}

constaHandle = (l,v) => (e) => {
  const {c} = this.props
  const V0090701 = document.getElementById('0090701')
  const I0090702 = document.getElementById('I0090702').checked
  c.setState({labelConsta: l})
  V0090701.value=v
  let task = [0]
  if (I0090702){
    task = [0,1]
  }
  renderCI('subCop0', [0,1], 6, task, ['41491004', '41491004'],
    ['CONSTANCIAS',
      'CERTIFICACIONES'
    ],
    ['0090701', '0090702'], this.props.c);
    c.sumaT()
  this.handleCloseConsta()
}

certiHandle = (l,v,op) => (e) => {
  const {c} = this.props
  const I0090701 = document.getElementById('I0090701').checked
  const vi = document.getElementById('0090702')
  c.setState({labelCerti: l})
  //V0090702.value=v
  let task = [1]
  if (I0090701){
    task = [0,1]
  }
  renderCI('subCop0', [0,1], 6, task, ['41491004', '41491004'],
    ['CONSTANCIAS',
      'CERTIFICACIONES'
    ],
    ['0090701', '0090702'], this.props.c);
    switch(op){
      case 0:

        const bg = document.getElementById('baseGravable');
       // const vi = document.getElementById(id);
    
        if(bg.value<10792){
          vi.value=193
        }
        if(bg.value>10791&&bg.value<21583){
          vi.value=483
        }
        if(bg.value>21582&&bg.value<43165){
          vi.value=964
        }
        if(bg.value>43164&&bg.value<86329){
          vi.value=1449
        }
        if(bg.value>86328){
          vi.value=1932
        }        
        break;
      case 1:
        //vi.value=257.50
        vi.value=198
        break
    }
    c.sumaT()
  this.handleCloseCerti()
}

componentDidMount(){
   const {c} = this.props;
   clearCheck(c)
}

render(){
    const {classes, classesM, c} = this.props
    const {readOnly, labelConsta, labelCerti} = c.state
    const {openConsta,openCerti} = this.state
    const fb = c.sumaT
    return (
        <>
            <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CardHeader color="success">
                          <h4 className={classes.cardTitleWhite}>IMPUESTOS</h4>
                          <p className={classes.cardCategoryWhite}>
                            41121001
                          </p>
                        </CardHeader>
                    </GridItem>
                  </GridContainer> 
                           
                      <GridContainer id='subIm0' >
                        
                      </GridContainer>
                      <GridContainer id='subIm1' >
                                
                      </GridContainer>
                      <GridContainer id='subIm2' >
                                               
                      </GridContainer>
                      <GridContainer id='subIm3' >
                                                 
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={2}/>  
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText="0020401:"
                            id="0020401"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0020402:"
                            id="0020402"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0020403:"
                            id="0020403"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0020801:"
                            id = "0020801"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={2}/>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0020802:"
                            id = "0020802"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0020803:"
                            id = "0020803"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0020804:"
                            id = "0020804"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0030101:"
                            id = "0030101"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                </div>

                <div style={{height: 40}} />

                <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CardHeader color="success">
                          <h4 className={classes.cardTitleWhite}>ACCESORIOS DE IMPUESTOS</h4>
                          <p className={classes.cardCategoryWhite}>
                            41171001007
                          </p>
                        </CardHeader>
                    </GridItem>
                  </GridContainer>    
                      <GridContainer id='subAcc0' >
                                               
                      </GridContainer>
                      <GridContainer id='subAcc1' >
                                 
                      </GridContainer>
                      <GridContainer id='subAcc2' >
                          
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={1}/>  
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText="0070101:"
                            id="0070101"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0070201:"
                            id="0070201"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0070202:"
                            id="0070202"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0070203:"
                            id = "0070203"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0090101:"
                            id = "0090101"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    
                </div>
                <div style={{height: 40}} />

                <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CardHeader color="success">
                          <h4 className={classes.cardTitleWhite}>DERECHOS</h4>
                          <p className={classes.cardCategoryWhite}>
                            414
                          </p>
                        </CardHeader>
                    </GridItem>
                  </GridContainer>    
                      <GridContainer id='subDer0' >                       
                        
                      </GridContainer>
                    
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={4}/>  
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText="0090106:"
                            id="0090106"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0090107:"
                            id="0090107"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        
                      </GridContainer>
                </div>
                <div style={{height: 40}} />
                
                <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CardHeader color="success">
                          <h4 className={classes.cardTitleWhite}>DERECHOS POR COPIAS DE PLANOS, AVALUOS Y SERVICIOS CATASTRALES</h4>
                          <p className={classes.cardCategoryWhite}>
                            4149100400907
                          </p>
                        </CardHeader>
                    </GridItem>
                  </GridContainer>    
                      <GridContainer id='subCop0' >                       
                        
                      </GridContainer>
                      <GridContainer id='subCop1' >                       
                        
                      </GridContainer>
                      <GridContainer id='subCop2' >                       
                        
                      </GridContainer>
                      <GridContainer> 
                      </GridContainer>
                      
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={1} />
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText = "CONSTANCIA:"
                            id = "constancia"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'text',
                              onClick: this.handleOpenConsta,
                              value: labelConsta,
                              
                            }}
                          />
                          <Poppers
                            open={Boolean(openConsta)}
                            anchorEl={openConsta}
                            transition
                            disablePortal
                            className={
                              classNames({ [classesM.popperClose]: !openConsta }) +
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
                                  <ClickAwayListener onClickAway={this.handleCloseConsta}>
                                    <MenuList role="menu">
                                      <MenuItem
                                        key={"consta1"}
                                        className={classesM.dropdownItem}
                                        onClick={this.constaHandle('NO ADEUDO DEL IMPUESTO PREDIAL',66)}
                                      >
                                        NO ADEUDO DEL IMPUESTO PREDIAL
                                      </MenuItem>
                                      <MenuItem
                                        key={"consta2"}
                                        className={classesM.dropdownItem}
                                        onClick={this.constaHandle('NO PROPIEDAD',112)}
                                      >
                                        NO PROPIEDAD
                                      </MenuItem>
                                      <MenuItem
                                        key={"consta3"}
                                        className={classesM.dropdownItem}
                                        onClick={this.constaHandle('NO AFECTACIÓN',225)}
                                      >
                                        NO AFECTACIÓN
                                      </MenuItem>
                                      <MenuItem
                                        key={"consta4"}
                                        className={classesM.dropdownItem}
                                        onClick={this.constaHandle('NO GRAVAMEN',218)}
                                      >
                                        NO GRAVAMEN
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
                            labelText = "OTRO SERVICIO:"
                            id = "otroservicio"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'text',
                              defaultValue: "\0"
                              
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText = "CERTIFICACIÓN:"
                            id = "certiI"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'text',
                              onClick: this.handleOpenCerti,
                              value: labelCerti,
                              
                            }}
                          />
                          <Poppers
                            open={Boolean(openCerti)}
                            anchorEl={openCerti}
                            transition
                            disablePortal
                            className={
                              classNames({ [classesM.popperClose]: !openCerti }) +
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
                                  <ClickAwayListener onClickAway={this.handleCloseCerti}>
                                    <MenuList role="menu">
                                      <MenuItem
                                        key={"consta1"}
                                        className={classesM.dropdownItem}
                                        onClick={this.certiHandle('CATASTRAL',66,0)}
                                      >
                                        CATASTRAL
                                      </MenuItem>
                                      <MenuItem
                                        key={"consta2"}
                                        className={classesM.dropdownItem}
                                        onClick={this.certiHandle('DE PLANOS',112,1)}
                                      >
                                        DE PLANOS
                                      </MenuItem>
                                      {/*<MenuItem
                                        key={"consta3"}
                                        className={classesM.dropdownItem}
                                        onClick={this.constaHandle('NO AFECTACIÓN',225)}
                                      >
                                        NO AFECTACIÓN
                                      </MenuItem>
                                      <MenuItem
                                        key={"consta4"}
                                        className={classesM.dropdownItem}
                                        onClick={this.constaHandle('NO GRAVAMEN',218)}
                                      >
                                        NO GRAVAMEN
                                      </MenuItem>*/}
                                    </MenuList>
                                  </ClickAwayListener>
                                </Paper>
                              </Grow>
                            )}
                          </Poppers>
                        </GridItem>
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={3}/>  
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText="0090701:"
                            id="0090701"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0090702:"
                            id="0090702"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0090703:"
                            id = "0090703"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={3}/>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0090704:"
                            id = "0090704"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                              
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "00913:"
                            id = "00913"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText = "0091301:"
                            id = "0091301"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps = {{
                              type: 'number',
                              defaultValue: 0,
                              onBlur: fb,
                              onKeyUp: c.handleImp,
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                </div>
                <div style={{height: 40}} />

                <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CardHeader color="success">
                          <h4 className={classes.cardTitleWhite}>PRODUCTOS</h4>
                          <p className={classes.cardCategoryWhite}>
                            41591
                          </p>
                        </CardHeader>
                    </GridItem>
                  </GridContainer>    
                  <GridContainer id='subPro0' >                       
                    
                  </GridContainer>
                    

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}/>  
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        labelText="0010804:"
                        id="0010804"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'number',
                          defaultValue: 0,
                          onChange: fb,
                          onBlur: fb
                        }}
                      />
                    </GridItem>                      
                  </GridContainer>
                </div>
                <div style={{height: 40}} />

                <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CardHeader color="success">
                          <h4 className={classes.cardTitleWhite}>APROVECHAMIENTOS DE TIPO CORRIENTE</h4>
                          <p className={classes.cardCategoryWhite}>
                            416
                          </p>
                        </CardHeader>
                    </GridItem>
                  </GridContainer>    
                  <GridContainer id='subApr0' >                       
                    
                  </GridContainer>
                    

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}/>  
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        labelText="0010101:"
                        id="0010101"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'number',
                          defaultValue: 0,
                          onBlur: fb,
                          onKeyUp: c.handleImp,
                          readOnly: readOnly
                        }}
                      />
                    </GridItem>                      
                  </GridContainer>
                </div>
                <div style={{height: 40}} />

                <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CardHeader color="success">
                          <h4 className={classes.cardTitleWhite}>DERECHOS ESTATALES</h4>
                          <p className={classes.cardCategoryWhite}>
                            211
                          </p>
                        </CardHeader>
                    </GridItem>
                  </GridContainer>    
                  <GridContainer id='subDee0' >                       
                    
                  </GridContainer>
                    

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}/>  
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        labelText="21173001001:"
                        id="21173001001"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps = {{
                          type: 'number',
                          defaultValue: 0,
                          onBlur: fb,
                          onKeyUp: c.handleImp,
                          readOnly: readOnly
                        }}
                      />
                    </GridItem>                      
                  </GridContainer>
                  
                </div>
        </>
    )
}
}