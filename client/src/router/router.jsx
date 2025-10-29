import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AdminLayout from "../RootLayout/AdminLayout";
import AdminHome from "../AdminPages/AdminHome/AdminHome";
import SubAdminHome from "../AdminPages/SubAdminHome/SubAdminHome";
import Master from "../AdminPages/Master/Master";
import Agent from "../AdminPages/Agent/Agent";
import SubAgent from "../AdminPages/SubAgent/SubAgent";
import Users from "../AdminPages/Users/Users";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path:"login",
        element:<Login></Login>
      },{
        path:"register",
        element:<Register></Register>
      }
    ],
  },
  {
    path:"ma",
    element:<AdminLayout></AdminLayout>,
    children:[
      {
        path:"mother-admin",
        element:<AdminHome></AdminHome>
      },
      {
        path:"sub-admin",
        element:<SubAdminHome></SubAdminHome>
      },{
        path:"master",
        element:<Master></Master>
      },
      {
        path:"agent",
        element:<Agent></Agent>
      },
      {
        path:"sub-agent",
        element:<SubAgent></SubAgent>
      },
      {
        path:"users",
        element:<Users></Users>
      }
        ]
  }
]);
