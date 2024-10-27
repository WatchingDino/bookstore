import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

import "./index.css";
import { ToastContainer } from "react-toastify";

import { NextUIProvider } from "@nextui-org/react";
import 'primeicons/primeicons.css';

// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
);
