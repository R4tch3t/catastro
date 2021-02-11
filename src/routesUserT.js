/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout
import Orden from "views/Dashboard/Orden.js";
import RegistrarP from "views/Predial/RegistrarP";
import ActualizarP from "views/Predial/ActualizarP";

const dashboardRoutes = [
  {
    path: "/registrarPredio",
    name: "Registrar Contribuyente",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: RegistrarP,
    layout: "/usuario"
  }, 
  {
    path: "/actualizarPredio",
    name: "Actualizar Contribuyente",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ActualizarP,
    layout: "/usuario"
  }
];

export default dashboardRoutes;
