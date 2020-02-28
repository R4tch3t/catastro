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
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import Orden from "views/Dashboard/Orden.js";
import Editar from "views/UserProfile/Editar.js";
import Padrones from "views/Predial/Padrones";
import Corte from "views/Predial/Corte";
import RegistrarP from "views/Predial/RegistrarP";

const dashboardRoutes = [
  {
    path: "/orden",
    name: "Orden de pago",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Orden,
    layout: "/usuario"
  },
  {
    path: "/padron",
    name: "Lista de contribuyentes",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Padrones,
    layout: "/usuario"
  },
 /* {
    path: "/corte",
    name: "Corte de caja",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Corte,
    layout: "/usuario"
  },
  {
    path: "/registrarPredio",
    name: "Registrar contribuyente",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: RegistrarP,
    layout: "/usuario"
  },*/
  {
    path: "/perfil",
    name: "Perfil de usuario",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Editar,
    layout: "/usuario"
  }
];

export default dashboardRoutes;
