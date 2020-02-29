import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Checker from './Checker'
export default (props) => {
    const {c} = props
    let selectionStartNombre = null
    let selectionEndNombre = null
    const handleUpper = e => {
        if (e.which === 32 || e.which > 39) {
            selectionStartNombre = e.target.selectionStart
            selectionEndNombre = e.target.selectionEnd
            e.target.value = e.target.value.toUpperCase()
            e.target.setSelectionRange(selectionStartNombre, selectionEndNombre);
        }
    }

    const handleMUpper = e => {
        c.setState({
            disabledReg: false
        })
    }
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
            onKeyUp: handleUpper,
            onMouseUp: handleMUpper
            }}
            />
        </GridItem>
        <GridContainer>
        <Checker
            checkedIndexes={[0]}
            tasksIndexes={[0, 1]}
            strs={["URBANO", "RUSTICO"]}
            ids={["check", "check"]}
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
                labelText="NUMERO O LOTE:"
                id="numCalle"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  defaultValue: c.dValInt
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
                  defaultValue: c.dValue,
                  onKeyUp: handleUpper
                }}
              />
            </GridItem>
          </GridContainer>        
    </>
)
}