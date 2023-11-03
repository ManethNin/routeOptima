import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from 'react-router-dom';
import { ShopContextProvider } from './customer/context/shopContextProvider';
import { NextUIProvider } from "@nextui-org/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NextUIProvider>
    <ShopContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ShopContextProvider>
  </NextUIProvider>



);
reportWebVitals();
