import React from "react";
import ReactDOM from "react-dom";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CheckI from "./CheckI.js";

export default class Impuestos extends React.Component {
constructor(props){
    super(props)
}

fa = (id) =>{
   const {fa} = this.props;
   fa(id); 
}

componentDidMount(){
   const subIm0 = document.getElementById('subIm0');
   const subIm1 = document.getElementById('subIm1');
   const subIm2 = document.getElementById('subIm2');
   const subIm3 = document.getElementById('subIm3');
   const subAcc0 = document.getElementById('subAcc0');
   const subAcc1 = document.getElementById('subAcc1');
   const subAcc2 = document.getElementById('subAcc2');
   const subDer0 = document.getElementById('subDer0');
   const subCop0 = document.getElementById('subCop0');
   const subCop1 = document.getElementById('subCop1');
   const subCop2 = document.getElementById('subCop2');
   const subPro0 = document.getElementById('subPro0');
   const subApr0 = document.getElementById('subApr0');
   const subDee0 = document.getElementById('subDee0');
   const {fa} = this.props;
   // console.log(fa);
   ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        tasksIndexes={[0,1]}
        md={6}
        strsa={['41121001','41121001']}
        strsb={['URBANOS EDIFICADOS DESTINADOS A CASA HABITACION',
                'SUB URBANOS EDIFICADOS DESTINADOS A CASA HABITACION']}
        ids={['0020401','0020402']}
        fa = {fa}
    />,
    subIm0
  )
  ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        md={6}
        tasksIndexes={[0,1]}
        strsa={['41121001','41121001']}
        strsb={['RUSTICOS EDIFICADOS DESTINADOS A CASA HABITACION',
                'PENSIONADOS Y JUBILADOS']}
        ids={['0020403','0020801']}
        fa = {fa}
    /> ,
    subIm1
  )
  ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        md={6}
        tasksIndexes={[0,1]}
        strsa={['41121001','41121001']}
        strsb={['INSEN','PERSONAS DE CAPACIDADES DIFERENTES']}
        ids={['0020802','0020803']}
        fa = {fa}
    /> ,
    subIm2
  )
  ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        tasksIndexes={[0,1]}
        md={6}
        strsa={['41121001','41131001']}
        strsb = {
            ['MADRES Y/O PADRES SOLTEROS JEFES DE FAMILIA', 
            'SOBRE ADQUISICIONES DE BIENES INMUEBLES']
        }
        ids={['0020804','0030101']}
        fa = {fa}
    /> ,
    subIm3
  )
  ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        tasksIndexes={[0,1]}
        md={6}
        strsa={['41171001','41171001']}
        strsb = {
            ['RECARGOS PREDIAL', '15% PRO EDUCACION Y ASISTENCIA SOCIAL']
        }
        ids={['0070101','0070201']}
        fa = {fa}
    /> ,
    subAcc0
  )
  ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        tasksIndexes={[0,1]}
        md={6}
        strsa={['41171001','41171001']}
        strsb = {
            ['15% PRO CAMINOS', 'DESCUENTO PREDIAL DE NATURALEZA DEUDORA']
        }
        ids={['0070202','0070203']}
        fa = {fa}
    /> ,
    subAcc1
  )
  ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        tasksIndexes={[0]}
        md={6}
        strsa={['41191001']}
        strsb = {
            ['REZAGOS IMPUESTO PREDIAL']
        }
        ids={['0090101']}
        fa = {fa}
    /> ,
    subAcc2
  )
  ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        tasksIndexes={[0,1]}
        md={6}
        strsa={['41491004','41491004']}
        strsb = {
            ['POR LA AUTORIZACION PARA LA FUSION DE PREDIOS', 
            'POR LA AUTORIZACION PARA SUBDIVISION, LOTIFICACION Y RELOTIFICACION DE PREDIOS']
        }
        ids={['0090106','0090107']}
        fa = {fa}
    /> ,
    subDer0
  )

  ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        tasksIndexes={[0,1]}
        md={6}
        strsa={['41491004','41491004']}
        strsb = {
            ['CONSTANCIAS',
            'CERTIFICACIONES']
        }
        ids={['0090701','0090702']}
        fa = {fa}
    /> ,
    subCop0
  )

  ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        tasksIndexes={[0,1]}
        md={6}
        strsa={['41491004','41491004']}
        strsb = {
            ['DUPLICADOS Y COPIAS',
            'OTROS SERVICIOS']
        }
        ids={['0090703','0090704']}
        fa = {fa}
    /> ,
    subCop1
  )

  ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        tasksIndexes={[0,1]}
        md={6}
        strsa={['41491004','41491004']}
        strsb = {
            ['PRO-BOMBEROS Y PROTECCION CIVIL',
            'LICENCIAS PARA CONSTRUCCION DE EDIFICIOS O CASAS HABITACION, RESTAURACION O REPARACION, URBANIZACION, FRACCIONAMIENTO LORIFIACION, RELOTIFICACION, FUSION Y SUB-DIVISION']
        }
        ids={['00913','0091301']}
        fa = {fa}
    /> ,
    subCop2
  )

  ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        tasksIndexes={[0]}
        md={12}
        strsa={['41491005']}
        strsb = {
            ['VENTAS DE FORMAS IMPRESAS POR JUEGOS (FORMA 3DCC)']
        }
        ids={['0010804']}
        fa = {fa}
    /> ,
    subPro0
  )

  ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        tasksIndexes={[0]}
        md={12}
        strsa={['41621006']}
        strsb = {
            ['MULTAS FISCALES (FALTA DE CUMPLIMIENTO DE OBLIGACIONES FISCALES)']
        }
        ids={['0010101']}
        fa = {fa}
    /> ,
    subApr0
  )

  ReactDOM.render(
    <CheckI
        checkedIndexes={[]}
        tasksIndexes={[0]}
        strsa={['']}
        md={12}
        strsb = {
            ['15% DE CONTRIBUCION ESTATAL (APLICADO POR AUTORIZACION DE FUSION Y SUBDIVISION DE PREDIOS)']
        }
        ids={['21173001001']}
        fa = {fa}
    /> ,
    subDee0
  )
  
}
render(){
    const {classes} = this.props
    
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
                             defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                              defaultValue: 0
                              
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
                              defaultValue: 0
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
                              defaultValue: 0
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
                          defaultValue: 0
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
                          defaultValue: 0
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
                          defaultValue: 0
                        }}
                      />
                    </GridItem>                      
                  </GridContainer>
                  
                </div>
        </>
    )
}
}