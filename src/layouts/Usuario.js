import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/NavbarUser.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/SidebarUsuario.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routesUser.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-5.jpg";
import logo from "@material-ui/icons/Home.js";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/usuario") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/" to="/usuario/padron" />
  </Switch>
);

const useStyles = makeStyles(styles);

const Usuario=({ ...rest }) => {
  let bandFadeSide = [true]
  let posMain = ''
  let leftMain = 0
  if(window.innerWidth>=960){
    posMain='absolute'
    leftMain=260
  }
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    const sideBtn = document.getElementById("sideBtn")
  
    if (window.innerWidth >= 960) {
      sideBtn.style.display='block'
      if(bandFadeSide[0]){
        sideBtn.nextSibling.nextSibling.style.left='260px'
        sideBtn.nextSibling.nextSibling.style.width=(window.innerWidth-260)+'px'
        sideBtn.style.zIndex=0
      }else{
        sideBtn.style.zIndex=9999
      }
     
      setMobileOpen(false);
    }else{
      sideBtn.style.display='none'
      sideBtn.style.zIndex=0
      sideBtn.nextSibling.nextSibling.style.left='0'
      sideBtn.nextSibling.nextSibling.style.width='100%'
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Bienvenido"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        bandFadeSide={bandFadeSide}
        {...rest}
      />
      <div className={classes.mainPanel} style={{position: posMain, left:leftMain}} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
    </div>
  );
}
export { Usuario };
