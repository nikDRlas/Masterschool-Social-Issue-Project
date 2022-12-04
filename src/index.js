import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/main/main";
import AuthProvider from "./context/AuthContext";
import "./index.css";
import Signup from "./pages/signup/Signup";
import Signin from "./pages/signin/Signin";
import AddListing from "./pages/addilsting/AddListing";
import ShowListing from "./pages/showlisting/ShowListing";
import ShowAllListing from "./pages/showAllListing/ShowAllListing";
import ShowListingDyn from "./pages/showlisting/ShowListingDyn";
import { HostProvider } from "./context/HostContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/addListing",
    element: <AddListing />,
  },
  {
    path: "/showlisting",
    element: <ShowListing />,
  },
  {
    path: "/showAllListing",
    element: <ShowAllListing />,
  },
  {
    path: "/showListingDyn",
    element: <ShowListingDyn />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <HostProvider>
        <RouterProvider router={router} />
      </HostProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
