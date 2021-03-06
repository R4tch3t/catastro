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
/*import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";*/
// core components/views for Admin layout
import Corte from "views/Predial/Corte.js";
import Padrones from "views/Predial/Padrones.js";
import Orden from "views/Dashboard/Orden.js";
import Editar from "views/UserProfile/Editar.js";
import Registro from "views/UserProfile/Registro.js";
import RegistrarP from "views/Predial/RegistrarP";
import ActualizarP from "views/Predial/ActualizarP";
/*import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";*/

const dashboardRoutes = [
  {
    path: "/orden",
    name: "Orden de pago",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Orden,
    layout: "/admin"
  },
  {
    path: "/padron",
    name: "Lista de Contribuyentes",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Padrones,
    layout: "/admin"
  },
  {
    path: "/corte",
    name: "Corte de caja",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Corte,
    layout: "/admin"
  },
  {
    path: "/registrarPredio",
    name: "Registrar Contribuyente",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: RegistrarP,
    layout: "/admin"
  },
  {
    path: "/actualizarPredio",
    name: "Actualizar Contribuyente",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ActualizarP,
    layout: "/admin"
  },
  {
    path: "/perfil",
    name: "Perfil de usuario",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Editar,
    layout: "/admin"
  }, {
    path: "/registrarse",
    name: "Registrar usuario",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Registro,
    layout: "/admin"
  }
  
];

export default dashboardRoutes;
