import React from "react";
import FormOrden from "./FormOrden.js";
import cookie from "react-cookies";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import stylesM from "assets/jss/material-dashboard-react/components/listItemStyle.js";
import decrypt from "./decrypt";

const useStyles = makeStyles(styles);
const useStylesM = makeStyles(stylesM);

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  //url = url.split('orden');
  //url = url[1];
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
  let bandPdf = getParameterByName('bandPdf', urlDec);
  let bandCTA = getParameterByName('bandCTA', urlDec);
  let genCTA = getParameterByName('genCTA', urlDec);
  let tp = getParameterByName('tp', urlDec);
  let dateUp = getParameterByName('dateUp', urlDec);
  let idOrden = getParameterByName('idOrden', urlDec);
  bandPdf=bandPdf === '' ? '0' : bandPdf
  let CTA = getParameterByName('CTA', urlDec);
  let folio = getParameterByName('folio', urlDec);
  let nombre = getParameterByName('nombre', urlDec);
  let calle = getParameterByName('calle', urlDec);
  let lote = getParameterByName('lote', urlDec);
  let manzana = getParameterByName('manzana', urlDec);
  let numero = getParameterByName('numero', urlDec);
  let colonia = getParameterByName('colonia', urlDec);
  let cp = getParameterByName('cp', urlDec);
  let municipio = getParameterByName('municipio', urlDec);
  let localidad = getParameterByName('localidad', urlDec);
  let tipoP = getParameterByName('tipoP', urlDec);
  let bg = getParameterByName('bg', urlDec);
  let periodo = getParameterByName('periodo', urlDec);
  let total = getParameterByName('total', urlDec);
  let V0020401 = getParameterByName('V0020401', urlDec);
  let V0020402 = getParameterByName('V0020402', urlDec);
  let V0020403 = getParameterByName('V0020403', urlDec);
  let V0020801 = getParameterByName('V0020801', urlDec);
  let V0020802 = getParameterByName('V0020802', urlDec);
  let V0020803 = getParameterByName('V0020803', urlDec);
  let V0020804 = getParameterByName('V0020804', urlDec);
  let V0030101 = getParameterByName('V0030101', urlDec);
  let V0070101 = getParameterByName('V0070101', urlDec);
  let V0070201 = getParameterByName('V0070201', urlDec);
  let V0070202 = getParameterByName('V0070202', urlDec);
  let V0070203 = getParameterByName('V0070203', urlDec);
  let V0090101 = getParameterByName('V0090101', urlDec);
  let V0090106 = getParameterByName('V0090106', urlDec);
  let V0090107 = getParameterByName('V0090107', urlDec);
  let V0090701 = getParameterByName('V0090701', urlDec);
  let V0090702 = getParameterByName('V0090702', urlDec);
  let V0090703 = getParameterByName('V0090703', urlDec);
  let V0090704 = getParameterByName('V0090704', urlDec);
  let V00913 = getParameterByName('V00913', urlDec);
  let V0091301 = getParameterByName('V0091301', urlDec);
  let V0010804 = getParameterByName('V0010804', urlDec);
  let V0010101 = getParameterByName('V0010101', urlDec);
  let V21173001001 = getParameterByName('V21173001001', urlDec);
  let otroservicio = getParameterByName('otroservicio', urlDec);
  let servQ = getParameterByName('servQ', urlDec);
  let constaQ = getParameterByName('constaQ', urlDec);
  let constaL = getParameterByName('constaL', urlDec);
  let certiQ = getParameterByName('certiQ', urlDec);
  const idRol = cookie.load('idRol')
  const idUsuario = cookie.load('idUsuario')

  return (
   <FormOrden classes={classes} classesM={classesM} 
          idRol={idRol}
          idUsuario={idUsuario}
          bandPdf={bandPdf} 
          bandCTA={bandCTA}
          genCTA={genCTA}
          tp={tp}
          dateUp={dateUp}
          idOrden={idOrden}
          CTA={CTA}
          folio={folio} 
          nombre={nombre} 
          calle={calle}
          lote={lote}
          manzana={manzana}
          numero={numero}
          colonia={colonia}
          cp={cp}
          municipio={municipio}
          localidad={localidad}
          tipoP={tipoP}
          bg={bg}
          periodo={periodo}
          total={total}
          V0020401={V0020401} V0020402={V0020402} V0020403={V0020403} 
          V0020801={V0020801} V0020802={V0020802} V0020803={V0020803}
          V0020804={V0020804} V0030101={V0030101} V0070101={V0070101}
          V0070201={V0070201} V0070202={V0070202} V0070203={V0070203}
          V0090101={V0090101} V0090106={V0090106} V0090107={V0090107}
          V0090701={V0090701} V0090702={V0090702} V0090703={V0090703}
          V0090704={V0090704} V00913={V00913} V0091301={V0091301}
          V0010804={V0010804} V0010101={V0010101} V21173001001={V21173001001}
          otroservicio={otroservicio} servQ={servQ} constaQ={constaQ} 
          constaL={constaL} certiQ={certiQ}
           />
  );
}
