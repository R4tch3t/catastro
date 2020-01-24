import React from "react";
import TablesRender from "./TablesRender.js";
import cookie from "react-cookies";
import CustomInput from "components/CustomInput/CustomInput.js";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Search from "@material-ui/icons/Search";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);
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
  var idUsuario = getParameterByName('idUsuario');
  var idQuincena = getParameterByName('idQuincena');
  if(cookie.load('idRol')==='0'){
    idUsuario = cookie.load('idUsuario')
  }
  const handleKup = (e) => {
    idUsuario = e.currentTarget.value
  }

  
 
  return (
   <TablesRender idUsuario={idUsuario} idQuincena={idQuincena}
                classes={classes} />
  );
}
