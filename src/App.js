import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { IntlProvider } from "react-intl";
import { useEffect, useState } from 'react';



function App() {
    const [locale, setLocale] = useState("fr");
    const [bodyTexts, setBodyTexts] = useState();

    function translatePage(value){
          setLocale(value)
  }


    useEffect(() => {
      import(`./locales/${locale}.json`).then((texts) => {
        setBodyTexts(texts)
      })
    }, [locale])
  return (
    <IntlProvider messages={bodyTexts} key={locale} locale={locale}>

    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login lang={locale} translatePage={translatePage} />} /> 
      <Route path='/register' element={<Register lang={locale} translatePage={translatePage} />} /> 
    </Routes>
    </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
