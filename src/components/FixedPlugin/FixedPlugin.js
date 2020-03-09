/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";

import imagine1 from "assets/img/sidebar-1.jpg";
import imagine2 from "assets/img/sidebar-2.jpg";
import imagine3 from "assets/img/sidebar-3.jpg";
import imagine4 from "assets/img/sidebar-4.jpg";
import imagine5 from "assets/img/sidebar-5.jpg";
import imagine6 from "assets/img/sidebar-6.jpg";


export default function FixedPlugin(props) {
  const [classes, setClasses] = React.useState("dropdown");
  const [bg_checked, setBg_checked] = React.useState(true);
  const [opacity, setOpacity] = React.useState(0.5);
  const [top, setTop] = React.useState("30%");
  const [bgImage, setBgImage] = React.useState(props.bgImage);
  const handleClick = () => {
    props.handleFixedClick();
  };
  const hoverFixed = e => {
    setOpacity(1)
  }
  const leaveFixed = e => {
    setOpacity(0.5)
  }
  return (
    <div
      onMouseEnter={hoverFixed}
      onMouseLeave={leaveFixed}
      style = {{opacity: opacity, top: top, cursor: 'pointer'}}
      className={classnames("fixed-plugin", {
        "rtl-fixed-plugin": props.rtlActive
      })}
    >
      <div id="fixedPluginClasses" className={props.fixedClasses}>
        <div onClick={handleClick}>
          <i className="fa fa-cog fa-2x" />
        </div>
        
        <ul className="dropdown-menu">
          <li className="header-title"><div onClick={handleClick} style={{textAlign: 'right', color: 'red'}} >x</div></li>
          <li className="header-title">FILTROS</li>
          <li className="adjustments-line">
            <a className="switch-trigger">
              <div>
                <span
                  className={
                    props.bgColor === "purple"
                      ? "badge filter badge-purple active"
                      : "badge filter badge-purple"
                  }
                  data-color="purple"
                  onClick={() => {
                    props.handleColorClick("purple");
                  }}
                />
                <span
                  className={
                    props.bgColor === "blue"
                      ? "badge filter badge-blue active"
                      : "badge filter badge-blue"
                  }
                  data-color="blue"
                  onClick={() => {
                    props.handleColorClick("blue");
                  }}
                />
                <span
                  className={
                    props.bgColor === "green"
                      ? "badge filter badge-green active"
                      : "badge filter badge-green"
                  }
                  data-color="green"
                  onClick={() => {
                    props.handleColorClick("green");
                  }}
                />
                <span
                  className={
                    props.bgColor === "red"
                      ? "badge filter badge-red active"
                      : "badge filter badge-red"
                  }
                  data-color="red"
                  onClick={() => {
                    props.handleColorClick("red");
                  }}
                />
                <span
                  className={
                    props.bgColor === "orange"
                      ? "badge filter badge-orange active"
                      : "badge filter badge-orange"
                  }
                  data-color="orange"
                  onClick={() => {
                    props.handleColorClick("orange");
                  }}
                />
              </div>
            </a>
          </li>
          <li className="header-title">Imagenes</li>
          <li className={bgImage === imagine1 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine1);
                props.handleImageClick(imagine1);
              }}
            >
              <img src={imagine1} alt="..." />
            </a>
          </li>
          <li className={bgImage === imagine2 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine2);
                props.handleImageClick(imagine2);
              }}
            >
              <img src={imagine2} alt="..." />
            </a>
          </li>
          <li className={bgImage === imagine3 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine3);
                props.handleImageClick(imagine3);
              }}
            >
              <img src={imagine3} alt="..." />
            </a>
          </li>
          <li className={bgImage === imagine4 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine4);
                props.handleImageClick(imagine4);
              }}
            >
              <img src={imagine4} alt="..." />
            </a>
          </li>
          <li className={bgImage === imagine5 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine5);
                props.handleImageClick(imagine5);
              }}
            >
              <img src={imagine5} alt="..." />
            </a>
          </li>
          <li className={bgImage === imagine6 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine6);
                props.handleImageClick(imagine6);
              }}
            >
              <img src={imagine6} alt="..." />
            </a>
          </li>

          
          <li className="adjustments-line" > <div onClick={handleClick} >Cerrar</div> </li>
        </ul>
      </div>
    </div>
  );
}

FixedPlugin.propTypes = {
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  rtlActive: PropTypes.bool,
  fixedClasses: PropTypes.string,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func
};
