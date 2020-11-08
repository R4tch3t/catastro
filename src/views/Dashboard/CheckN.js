import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import clearCheck from "./clearCheck";

const useStyles = makeStyles(styles);
export default (props)=>{
  const classes = useStyles()
  const [checked, setChecked] = React.useState([...props.checkedIndexes]);
  const { tasksIndexes, ids, md, c } = props;

  const handleToggle = (value,id) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    
    if (currentIndex === -1) {
      newChecked.push(value);
     // console.log(fa)
      if (c) {
        const dateUpL = document.getElementById('dateUp');
        const regB = document.getElementById('regB');
        const m1 = document.getElementById('m1');
        const m2 = document.getElementById('m2');
        const tc = document.getElementById('tc');
        const zona = document.getElementById('zona');
        const bg = document.getElementById('baseGravable');
      //  bg.value=0
        dateUpL.value='';
        regB.innerHTML = 'GENERAR ORDEN DE PAGO';
        c.idOrden = 0;
        m1.value = c.contribuyente.m1
        m2.value = c.contribuyente.m2
        tc.value = c.contribuyente.tc
        zona.value = c.contribuyente.zona
        bg.value = c.contribuyente.bg
        c.setState({tc: tc.value, zona: zona.value});
        c.state.currentD = new Date();
        clearCheck(c);
        //c.sumaT()
        c.setBg();
      }
    } else {
     // c.hideMap()
      newChecked.splice(currentIndex, 1);
      
    }
    setChecked(newChecked);
  };
  
  return (
    <>
      {tasksIndexes.map(value => (        
           
              <div key={value} style={{cursor: 'pointer'}} onMouseUp={() => handleToggle(value,ids[value])}   >
              <Checkbox
                  id={`${ids[value]}`}
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.root
                  }}
                  
              />
              
                {<b> {ids[value]} </b>}
              
              </div>    
        ))}
    </>
  )
  };

