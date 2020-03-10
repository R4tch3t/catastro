import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
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
  
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    //const checkU = document.getElementById('check0');
    const tp = value===0 ? 'u' : 'r'
    if (fa) {
      fa(tp)
    }
    if (currentIndex === -1) {
      newChecked.splice(currentIndex, 1);
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      if (value === 0) {
        newChecked.push(1);
      }else{
        newChecked.push(0);
      }
      
    }
    setChecked(newChecked);

    
  };
  const { tasksIndexes, strs, ids, fa } = props;
  return (
    <>
      {tasksIndexes.map(value => (        
            <GridItem key={value} xs={12} sm={12} md={5}>
              <div style={{cursor: 'pointer'}} onClick={() => handleToggle(value)}   >
              <Checkbox
                  id={`${ids[value]}${value}`}
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.root
                  }}
              />
              {strs[value]}
              </div>
            </GridItem>    
        ))}
    </>
  )
  };
/*
Checkboxc.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
  rtlActive: PropTypes.bool,
  checkedIndexes: PropTypes.array
};*/
