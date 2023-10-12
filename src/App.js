/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { IntlProvider } from "react-intl";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Login from "pages/login/Login";
import Register from "pages/register/Register";
import { BrowserRouter } from "react-router-dom/dist";
import Dashboardd from "Dashboardd";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function App() {
  const [locale, setLocale] = useState("fr");
  const [bodyTexts, setBodyTexts] = useState();
  const navigate = useNavigate()

  function translatePage(value){
        setLocale(value)
  }


  useEffect(() => {
    import(`./locales/${locale}.json`).then((texts) => {
      setBodyTexts(texts)
    })
  }, [locale])

  const getRoutes = (allRoutes) =>
  allRoutes.map((route) => {
    if (route.collapse) {
      return getRoutes(route.collapse);
    }

    if (route.route) {
      return <Route exact path={route.route} element={route.component} key={route.key} />;
    }

    return null;
  });

  useEffect(() => {
    // let isLoggedIn = window.localStorage.getItem('ktwaIsLoggedIn');
    // if(isLoggedIn){
    //   console.log(isLoggedIn);
    //   if (isLoggedIn != true) {
        
    //     navigate('/login')
    //   }else{
    //     navigate('/account')
    //   }
    // }
  }, [])
  
  return (
    <IntlProvider messages={bodyTexts} key={locale} locale={locale}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ToastContainer />
       <Routes>
      <Route path='/login' index element={<Login lang={locale} translatePage={translatePage} />} /> 
      <Route path='/register' element={<Register lang={locale} translatePage={translatePage} />} /> 
    <Route path='account' element= {<Dashboardd/>} >
    {/* <Routes> */}
        {getRoutes(routes)}
        <Route path="account/*" element={<Navigate to="/" />} />
      {/* </Routes> */}
    </Route>
    </Routes>
    </LocalizationProvider>
  </IntlProvider>
  )
}
