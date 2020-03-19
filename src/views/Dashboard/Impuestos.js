import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import clearCheck from "./clearCheck";

export default class Impuestos extends React.Component {
constructor(props){
    super(props)
}

fa = (id) =>{
   const {fa} = this.props;
   fa(id); 
}

componentDidMount(){
   const {c} = this.props;
   clearCheck(c)
}
render(){
    const {classes, c} = this.props
    const {readOnly} = c.state
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
                              readOnly: readOnly
                            }}
                          />
                        </GridItem>
                      </GridContainer>

                      <GridContainer>
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