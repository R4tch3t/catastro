/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Home from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Apps from "@material-ui/icons/Apps"
// core components
import UserNavbarLinks from "components/Navbars/UserNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  const sideBar = React.createRef();
  const [showArrow, setShowArrow] = React.useState(0)
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, image, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                />
              )}
              <ListItemText
                primary={props.rtlActive ? prop.rtlName : prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
 var brand = (
    <>
    
    <div className={classes.logo} style={{color: 'white'}}>
      
      
        
        <div className={classes.logoImage} style={{display: 'inline-block', cursor: 'pointer'}} >
          <Home />
        </div>
        <div style={{position: 'absolute', top: 15, left: 93}} >
        {logoText}
        </div>
        {window.innerWidth>=960 && showArrow < 2 && <div className={classes.logoImage} style={{position: 'absolute',cursor: 'pointer', right: 0}}>
          <ArrowBack onClick={()=>{
            const nextsSider = sideBar.current.children[1].children[0].children[0];
            const bodySide = sideBar.current.nextSibling
            props.bandFadeSide[0] = false
            const sideBtn = document.getElementById("sideBtn") 
            sideBtn.style.display='block'
            sideBtn.style.zIndex=9999
           nextsSider.style.position='relative'
           sideBar.current.classList.toggle("fade-active")
           bodySide.style.position="absolute" 
           bodySide.style.left="0px"
           bodySide.style.width="100%"
           //bodySide.children[0].style.zIndex='0'

  }
    } />
        </div>
        
  }
      
    </div>
    </>
  );
  return (
    <>
    <div id='sideBtn' style={{position: 'absolute', display: 'none', left: 0, zIndex: 9999}}>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={()=>{
                const bodySide = sideBar.current.nextSibling
                //window.innerWidth
                bodySide.style.left="260px"
               // bodySide.style.width="calc(100% - 260px);"
                bodySide.style.width=window.innerWidth-260+"px"
                props.bandFadeSide[0] = true
                //bodySide.classList.toggle('sideIN')
                document.getElementById("sideBtn").style.display='none'
                sideBar.current.classList.toggle("fade-active")
                setShowArrow(showArrow===0?1:0)
              //  document.getElementById("headImg").style.width='80%'
               // document.getElementById("headImg").style.left='5%'
              }}

            
            >
              <Apps />
          </IconButton>
    </div>
    <div ref={sideBar} className="fadeIN" >
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <UserNavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
    </>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.any,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
