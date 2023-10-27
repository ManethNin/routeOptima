
import { Link } from "react-router-dom"
// import doc1 from '../../assets/doctors/doctor1.jpg';
// import doc2 from '../../assets/doctors/doctor2.jpg';
// import doc3 from '../../assets/doctors/doctor3.jpg';
// import doc4 from '../../assets/doctors/doctor4.jpg';
// import doc5 from '../../assets/doctors/doctor5.jpg';
// import doc6 from '../../assets/doctors/doctor6.jpg';


import { useState, useEffect } from "react";
import * as reqSend from "../global/reqSender";
import { motion } from 'framer-motion';
import { dashboardAdminOverview } from './_dashBoardData';


const doctorImages = ["doc1", "doc2", "doc3", "doc4", "doc5", "doc6"]
const dataSelecter = { 'admin': dashboardAdminOverview, '0': dashboardAdminOverview }



export default function Home(props) {

    const [doctorData, setDoctorData] = useState(null);
    const [counts, setCounts] = useState([0, 0, 0]);
    const [isComponentChanged, setIsComponentChanged] = useState(false);



    useEffect(() => {
        reqSend.defaultReq("GET", 'admin/home', {}, (response) => {
            const data = response.data.results
            setDoctorData(data.doctorDetails);
            setCounts([data.doctors, data.users, data.appointments]);
        });


    }, [isComponentChanged])

    return (
        <main>

            <div className="head-title">
                <div className="left">
                    <h1>Dashboard</h1>
                </div>
                <Link to="/admin/add-doctors" className="btn-download">
                    <i className='bx bxs-user-plus'></i>
                    <span className="text">Add Doctors</span>
                </Link>
            </div>




            <ul className="box-info" style={{ paddingLeft: '0' }}>
            
                {dataSelecter[localStorage.getItem('role')].map((val, index) => {
                    return (
                        <li key={index} className="boxShadow1">
                            {val.icon}
                            <span className="text">

                                <h3>{counts[0]}</h3>
                                <p>{val.name}</p>
                            </span>
                        </li>
                    )
                })}




            </ul>



            {/* <div className="table-data " >
                <div className="order boxShadow1 ">
                    <div className="head">
                        <h3>Available Doctors</h3>
                       
                    </div>
                    <table>
                        <thead>
                            <tr style={{ color: 'balack' }}>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Place</th>
                                <th>Specialize</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctorData && doctorData.map((doctor, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td >
                                            <div className="d-flex">
                                                <img src={doctorImages[index % doctorImages.length]} />
                                                <p>{doctor.name}</p>
                                            </div>
                                        </td>
                                        <td>{doctor.email}</td>
                                        <td>{doctor.place}</td>
                                        <td>{doctor.specialize}</td>
                                        <td>
                                            <motion.p
                                                onClick={() => {
                                                    reqSend.swalFireReq1("DELETE", 'admin/home', { id: doctor.id },
                                                        "Appointment Calceled", "Error While Cancelling", (response) => {
                                                            setIsComponentChanged(!isComponentChanged)
                                                        }, "Error! Check Your Connection");
                                                }}
                                                whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status cancelled" style={{ color: '#b30021', fontSize: '15px' }}>Remove</motion.p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div> */}
        </main>
    )
}