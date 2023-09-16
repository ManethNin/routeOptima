import React, { useState } from 'react';
import './Topbar.css';
import { FaEnvelope } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


function Topbar() {
    const navigate=useNavigate();

   
   
    const Toast = Swal.mixin({ 
        toast: true, 
        position: 'top-end', 
        showConfirmButton: false, 
        timer: 2500, 
        timerProgressBar: true 
    })
    
    const logoutSure = () => {Swal.fire({
        title: 'Are you sure?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Log out!'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('token');
            navigate('/login');
            Toast.fire({ icon: 'success', title: 'You logged out!' });
        }
      })}


    return (
        <div>
            <div className="contact-bar">
                <p><FaPhone className='topbar-icon' />+94 7612345567</p>
                <p className="email"><FaEnvelope className='topbar-icon' />temp@routeoptima.com</p>

                <div className="login-register">
                    {(!localStorage.getItem('token')) ?
                        <>
                            <button onClick={()=>{navigate('/login')}}>Log in</button>
                            <button onClick={()=>{navigate('/register')}}>Register</button>
                        </> :
                        <button onClick={logoutSure} className='logout-btn'>Log out</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Topbar;
