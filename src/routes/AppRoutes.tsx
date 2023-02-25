import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageSettings from "../components/settingsPage/SettingsPage";
import DefaultLayout from "../config/layout/Default";
import DefaultLayoutLogged from "../config/layout/LayoutDefaltLoged";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";
import Messages from "../pages/Messages";
import Saves from "../pages/Saves";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout page={<Login />} />,
  },
  {
    path: "/CreatAcoount",
    element: <DefaultLayout page={<CreateAccount />} />,
  },
  {
    path: "/Messages",
    element: <DefaultLayoutLogged page={<Messages />} />,
  },
  {
    path: "/Saves",
    element: <DefaultLayoutLogged page={<Saves />} />,
  },
  {
    path: "/Settings",
    element: <DefaultLayoutLogged page={<PageSettings />} />,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
