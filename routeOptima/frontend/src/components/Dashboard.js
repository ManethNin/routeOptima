import '../styles/dashboard.css';
import { useState, useEffect } from 'react';
import { Route, Routes,Link } from 'react-router-dom';
import avatar from '../assets/twitter.png';
import { SideNavigation, TopBar } from './sideComps/dashBoardComps';
import { dashboardAdminData } from './_dashBoardData';

import Home from './Home';
// import AddDoctors from './AddDoctors';






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
                <SideNavigation data={dashboardAdminData} />

                <section id="content">
                    <TopBar avatar={avatar} />
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        {/* <Route path="/add-doctors" element={<AddDoctors/>} /> */}
                      
                       
                    </Routes>

                  

                </section>
            </div>

        </>
    )
}