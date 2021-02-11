import React from "react";
import TablesPadrones from "./TablesPadrones.js";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import stylesM from "assets/jss/material-dashboard-react/components/listItemStyle.js";
import decrypt from "views/Dashboard/decrypt.js";
import Pdf from "./renderCarta"
import PdfCert from "./renderCerti"

const useStyles = makeStyles(styles);
const useStylesM = makeStyles(stylesM);
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
export default () => {
  const classes = useStyles();
  const classesM = useStylesM();
  let urlDec = getParameterByName('v');
  urlDec = decrypt(urlDec);
  const bandCarta = getParameterByName('bandCarta', urlDec)
  const bandCerti = getParameterByName('bandCerti', urlDec)
  const genCTA = getParameterByName('genCTA', urlDec)
  const nombre = getParameterByName('nombre', urlDec)
  const ubi = getParameterByName('ubi', urlDec)
  const tp = getParameterByName('tp', urlDec)
  const localidad = getParameterByName('localidad', urlDec)
  const bg = getParameterByName('bg', urlDec)
  const añoI = getParameterByName('añoI', urlDec)
  const añoF = getParameterByName('añoF', urlDec)
  
  if (bandCarta==='1'){
    return (<Pdf classes={classes} CTA={genCTA} nombre={nombre}
                ubi={ubi} tp={tp} añoI={añoI} añoF={añoF}  />)
  }else if(bandCerti==="1"){
    return (<PdfCert classes={classes} CTA={genCTA} nombre={nombre}
                ubi={ubi} tp={tp} localidad={localidad} bg={bg} añoI={añoI} añoF={añoF}  />)
  }else{
    return (
    <TablesPadrones 
                  classes={classes} classesM={classesM} />
    );
  }
}
