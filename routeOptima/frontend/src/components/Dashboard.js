import '../styles/dashboard.css';
import '../styles/style.css';
import { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import avatar from '../assets/twitter.png';
import { SideNavigation, TopBar } from './sideComps/dashBoardComps';
import {
    dashboardAdminData,
    dashboardAdminOverview,

    dashboardDeliveryManagerData,
    dashboardDeliveryManagerOverview,

    dashboardStoreManagerData,
    dashboardStoreManagerOverview,

    dashboardProductManagerData,
    dashboardProductManagerOverview,

    dashboardRouteManagerData,
    dashboardRouteManagerOverview,


} from './_dashBoardData';

import Home from './Home';
import { ProcessedOrders,ViewProducts,AddProducts,SentToDilivery, AddRoute,ViewUsers,SeheduleTruck,ViewSchedules } from './sideComps/SideBarPages';
// import AddDoctors from './AddDoctors';



const dataAll = {
    'admin': [dashboardAdminData, dashboardAdminOverview],
    '1': [dashboardStoreManagerData, dashboardStoreManagerOverview],
    '2':[dashboardDeliveryManagerData,dashboardDeliveryManagerOverview],
    '3': [dashboardRouteManagerData, dashboardRouteManagerOverview],
    '4': [dashboardProductManagerData, dashboardProductManagerOverview],

}


export default function Dashboard() {


    const addJs = () => {
        const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

        allSideMenu.forEach(item => {
            const li = item.parentElement;

            item.addEventListener('click', function () {
                allSideMenu.forEach(i => {
                    i.parentElement.classList.remove('active');
                })
                li.classList.add('active');
            })
        });

        // TOGGLE SIDEBAR
        const menuBar = document.querySelector('#content nav .bx.bx-menu');
        const sidebar = document.getElementById('sidebar');

        menuBar.addEventListener('click', function () {
            sidebar.classList.toggle('hideSidebar');
        })


        const switchMode = document.getElementById('switch-mode');
        const wrapper = document.getElementById('dashboardWrapper');


        switchMode.addEventListener('change', function () {
            if (this.checked) {
                wrapper.classList.add('dark');
            } else {
                wrapper.classList.remove('dark');
            }
        })



    }

    useEffect(() => {
        addJs()
    }, [])



    return (
        <>
            <div id="dashboardWrapper">

                <SideNavigation data={dataAll[localStorage.getItem('role')][0]} />

                <section id="content">
                    <TopBar avatar={avatar} />
                    <Routes>
                        {/* admin  */}
                        <Route path="/view-customers" element={<ViewUsers status="0" start="0" end="0"  title="All Customers"/>} />
                        <Route path="/view-users" element={<ViewUsers status="1" start="1" end="6"  title="All Users"/>} />


                        {/* product manager  */}
                        <Route path="/" element={<Home data={dataAll[localStorage.getItem('role')][1]} />} />
                        <Route path="/add-products" element={<AddProducts />} />
                        <Route path="/view-products" element={<ViewProducts />} />
                        <Route path="/processed" element={<ProcessedOrders />} />

                        {/* store manager  */}
                        <Route path="/added-to-store" element={<SentToDilivery completed="0" />} />
                        <Route path="/store-completed" element={<SentToDilivery completed="1" />} />


                        {/* route manager  */}
                        <Route path="/add-route" element={<AddRoute />} />


                        {/* delivery manager  */}
                        <Route path="/schedule-trucks" element={<SeheduleTruck />} />
                        <Route path="/view-schedules" element={<ViewSchedules />} />


                    </Routes>



                </section>
            </div>

        </>
    )
}