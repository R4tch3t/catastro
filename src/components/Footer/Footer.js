/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import cintillo from "assets/img/cintillo.jpeg";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#" className={classes.block}>
                Inicio
              </a>
            </ListItem>
           {/* <ListItem className={classes.inlineBlock}>
              <a href="https://www.uagro.mx/" target='_blank' className={classes.block}>
                UAGro
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="http://www.seguridadsocial.uagro.mx/" target='_blank' className={classes.block}>
                Seguridad Social
              </a>
            </ListItem>*/ }
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {new Date().getFullYear()}{" "}
            Dirección de Catastro e Impuesto Predial, Calle 13 Norte No. 1312, Esquina Avenida Constitución, Tel: (756) 47 50268
          </span>
        </p>
        <img style={{position: 'relative', width: '100%' }} src={cintillo} />
      </div>
    </footer>
  );
}
