import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AdminLayout from "../RootLayout/AdminLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SuperAffiliate from "../AdminPages/SuperAffiliate/SuperAffiliate";
import MasterAffiliate from "../AdminPages/MasterAffiliate/MasterAffiliate";
import MasterPendingRequest from "../AdminPages/MasterPendingRequest/MasterPendingRequest";
import Profile from "../AdminPages/Profile/Profile";

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
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "affiliate",
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        path: "super",
        element: (
          <PrivateRoute>
            <SuperAffiliate></SuperAffiliate>
          </PrivateRoute>
        ),
      },
      {
        path: "master",
        element: (
          <PrivateRoute>
            <MasterAffiliate></MasterAffiliate>
          </PrivateRoute>
        ),
      },
      {
        path: "master-pending-request",
        element: (
          <PrivateRoute>
            <MasterPendingRequest></MasterPendingRequest>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
