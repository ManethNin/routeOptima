

import React, { useState } from 'react';
import './App.css';




import { Route, Routes } from 'react-router-dom';


import LoginNew from './components/login/LoginNew';
import RegisterNew from './components/login/RegisterNew';
import Topbar from './components/main/Topbar';
import Dashboard from './components/Dashboard';
import { Navigation } from './customer/components/Navigation/Navigation';
import { HomePage } from './customer/pages/HomePage/HomePage';
import { Shop } from './customer/pages/Shop/Shop';
import {Bag} from './customer/pages/Bag/Bag'
import {Paymentgateway}   from './customer/pages/Paymentgateway/Paymentgateway'

import { NextUIProvider } from '@nextui-org/react'

function App() {

    return (
        <div className="App">
            <React.Fragment>

                <Routes>
                    <Route path="/login" element={<LoginNew />} />
                    <Route path="/register" element={<RegisterNew />} />

                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="/*" element={
                        <>
                            <div>
                                {/* <Topbar /> */}

                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/store" element={<Shop />} />
                                  
                                    <Route path="/bag" element={<Bag />} />
                                    <Route path="/paymentgateway" element={<Paymentgateway />} />
                                </Routes>
                                {/* other elements goes here  */}
                            </div>
                        </>

                    } />
                </Routes>


            </React.Fragment>
        </div >
    );
}

export default App;
