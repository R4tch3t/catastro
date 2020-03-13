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
  const { tasksIndexes, ids, md, c } = props;

  const handleToggle = (value,id) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    
    if (currentIndex === -1) {
      newChecked.push(value);
     // console.log(fa)
      if (c) {
        c.showMap()
        //fa(id);
      }
    } else {
      c.hideMap()
      newChecked.splice(currentIndex, 1);
      
    }
    setChecked(newChecked);
  };
  
  return (
    <>
      {tasksIndexes.map(value => (        
            <GridItem key={value} xs={12} sm={12} md={md}>
              <div style={{cursor: 'pointer'}} onMouseUp={() => handleToggle(value,ids[value])}   >
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
            </GridItem>    
        ))}
    </>
  )
  };

