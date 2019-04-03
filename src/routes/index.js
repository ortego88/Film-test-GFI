import Main from "../Components/Ventanas/index";
import Films from '../Components/Ventanas/Films';
import Login from '../Components/Ventanas/Login';
import withAuth from "../withAuth";

const indexRoutes = [
  
  {
    path: "/films",
    sidebarName: "Films",
    navbarName: "Films",
    component: withAuth(Films)
  },
  {
    path: "/login",
    sidebarName: "Login",
    navbarName: "Login",
    component: Login
  },
  {
    path: "/",
    sidebarName: "Main",
    navbarName: "Main",
    component: Main
  },
];

export default indexRoutes;
