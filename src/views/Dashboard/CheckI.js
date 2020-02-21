import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import GridItem from "components/Grid/GridItem.js";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);
export default (props)=>{
  const classes = useStyles()
  const [checked, setChecked] = React.useState([...props.checkedIndexes]);
  const { tasksIndexes, strsa, strsb, ids, md, c } = props;

  const handleToggle = (value,id) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    
    if (currentIndex === -1) {
      newChecked.push(value);
      const i = document.getElementById(id);
      i.focus();
     // console.log(fa)
      if (c) {
        c.addImpuesto(id)
        //fa(id);
      }
    } else {
      newChecked.splice(currentIndex, 1);
      
      c.setZero(id);
    }
    setChecked(newChecked);
  };
  
  return (
    <>
      {tasksIndexes.map(value => (        
            <GridItem key={value} xs={12} sm={12} md={md}>
              <div style={{cursor: 'pointer'}} onMouseUp={() => handleToggle(value,ids[value])}   >
              <Checkbox
                  id={`I${ids[value]}`}
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.root
                  }}
              />
              
                {strsa[value]} <b> {ids[value]} </b> {strsb[value]}
              
              </div>
            </GridItem>    
        ))}
    </>
  )
  };

