import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true })





export function SideNavigation(props) {

    const navigate = useNavigate();
    const location = window.location.pathname

    useEffect(() => {
        if (!localStorage.getItem('token') || !localStorage.getItem('role')) {
            navigate('/login');
        }
    }, [])



    const handelLogout = () => {
        Swal.fire({
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
                localStorage.removeItem('role');

                navigate('/login');
                Toast.fire({ icon: 'success', title: 'You logged out!' });
            }
        })
    }

    return (
        <section id="sidebar">
            <Link to="" className="brand">
                <i className='bx bxs-smile'></i>
                <span className="text">RouteOptima</span>
            </Link>
            <ul className="side-menu top">
                {props.data && props.data.map((item, index) => {
                    return (
                        <li key={index} className={location == item.to ? "active" : ""}>
                            < Link to={item.to}>
                                {item.icon}
                                <span className="text">{item.name}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <ul className="side-menu">
                <li>
                    <Link to="#">
                        <i className='bx bxs-cog' ></i>
                        <span className="text">Settings</span>
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={handelLogout}
                        className="logout">
                        <i className='bx bxs-log-out-circle' ></i>
                        <span className="text">Logout</span>
                    </Link>
                </li>
            </ul>
        </section>
    )
}




export function TopBar(props) {
    return (
        <nav>
            <i className='bx bx-menu' ></i>
            {/* <a href="#" className="nav-link">Categories</a> */}
            <form action="#">
                {/* <div className="form-input">
                    <input type="search" placeholder="Search..." />
                    <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                </div> */}
            </form>
            <input type="checkbox" id="switch-mode" hidden />
            <label htmlFor="switch-mode" className="switch-mode"></label>
            <Link to="#" className="notification">
                <i className='bx bxs-bell' ></i>
                <span className="num">8</span>
            </Link>
            <Link to="#" className="profile">
                <img src={props.avatar} />
            </Link>
        </nav>
    )
}





export function Table(props) {
    return (
        <div className="table-data " >
            <div className="order boxShadow1 ">
                <div className="head">
                    <h3>{props.data.name}</h3>

                </div>
                <table>
                    <thead>
                        <tr style={{ color: 'balack' }}>
                            {props.data.heading.map((val,index)=>{
                                return(
                                    <th key={index}>{val}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                      {props.data.body}
                    </tbody>
                </table>
            </div>
        </div>
    )
}