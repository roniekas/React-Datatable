import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import React from "react";
import Fallback from "./pages/fallback";
import DataTable from "./pages/dataTable/DataTable";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Fallback />
  },
  {
    path: "/data-table",
    element: <DataTable />,
  },
  {
    path: "/fallback",
    element: <Fallback />,
  },
]);