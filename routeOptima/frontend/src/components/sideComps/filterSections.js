import * as reqSend from "../../global/reqSender";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

import doc1 from '../../assets/doctors/doctor1.jpg';
import doc2 from '../../assets/doctors/doctor2.jpg';
import doc3 from '../../assets/doctors/doctor3.jpg';
import doc4 from '../../assets/doctors/doctor4.jpg';
import doc5 from '../../assets/doctors/doctor5.jpg';
import doc6 from '../../assets/doctors/doctor6.jpg';


const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true, })

export function FilterSectionMainPage(props) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        handelSearch();
    }, [])


    const handelSearch = () => {
        reqSend.defaultReq("POST", 'appointment/doctors', { name: name, date: date }, (response) => {
            props.setDoctorFilter(response.data.results)
        });
    }


    return (
        <div className="container availability-form mb-5" data-aos="fade-up">
            <div className="row" >
                <div className="col-lg-12 bg-white shadow p-4">
                    <h5 className="mb-4">Check Doctor Availability</h5>
                    <div className="row align-items-end">
                        <div className="col-lg-4 mb-3">
                            <label className="form-label" style={{ fontWeight: '500' }}>Doctor Name</label>
                            <input onChange={(e) => { setName(e.target.value) }} id="docterName" type="text" className="form-control" placeholder="Enter Name" />
                        </div>

                        <div className="col-lg-4 mb-3">
                            <label className="form-label" style={{ fontWeight: '500' }}>Check-in-Date</label>
                            <input onChange={(e) => { setDate(e.target.value) }} id="checkIn" type="date" className="form-control shadow-none" />
                        </div>
                        <div className="col-lg-2 mb-3">
                            <button onClick={handelSearch} className="btn text-white shadow-none custom-bg"
                            >Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}






const doctorImages = [doc1, doc2, doc3, doc4, doc5, doc6]

export function DoctorSectionDefault(props) {

    const navigate = useNavigate();


    return (
        <div className="container" style={{ marginBottom: '150px' }}>
            <h2>{props.text ? props.text : "Available Doctors"}</h2>
            <div className="row">
                {props.doctorFilter && props.doctorFilter.map((doctor, index) => {

                    const rating = Math.floor(Math.random() * 5) + 1;
                    const image = doctorImages[index % doctorImages.length];
                    return (
                        <motion.div whileHover={{ scale: 1.1 }} key={index} className="col-lg-4 col-md-4 d-flex justify-content-center fadeInAnimation" style={{ marginTop: '30px' }}>
                            <div className="boxShadow1 card border-0" style={{ width: '20rem' }}>

                                <img src={image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <label>
                                        <h5>Dr.{doctor.name}</h5>
                                    </label>
                                    <br />
                                    <hr />
                                    <h6 className="mb-4 fw-normal">Place:&nbsp;&nbsp; {doctor.place}</h6>
                                    <h6 className="mb-4 fw-normal">Email:&nbsp;&nbsp;{doctor.email} </h6>

                                    <div className="d-flex justify-content-center my-3">
                                        <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
                                    </div>


                                    <motion.div whileHover={{ scale: 1.2 }} className="d-flex justify-content-evenly">
                                        {/* setLoginPop */}
                                        <button
                                            onClick={() => {
                                                if (!localStorage.getItem('token')) {
                                                    props.setLoginPop(true);
                                                } else {
                                                    navigate('/appointment', { state: { doctor: doctor, rating: rating, image: image, id: null, date: "", time: "" } });
                                                }
                                            }}
                                            className="btn btn-sm text-white custom-bg shadow-none">Place Appointment</button>

                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                    )
                })}
            </div>
        </div>
    )
}







// filter doctorpage 


export function FilterSectionDoctorPage(props) {

    const [name, setName] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        handelSearch();
    }, [])


    const handelSearch = () => {
        reqSend.defaultReq("POST", 'appointment/doctors', { name: name, date: date }, (response) => {
            props.setDoctorFilter(response.data.results)
        });
    }


    return (
        <div class="col-lg-3 col-md-12 mb-lg-0 px-lg-0 boxShadow1">
            <div class="bg-white  p-4 border-top border-4 border-dark">
                <div class="bg-white p-4">
                    <h4>FILTERS</h4>
                </div>

                <div class="border bg-light p-3 mb-3">
                    <h5 class="mb-3" style={{ fontSize: '18px' }}>Name of Doctor</h5>
                    <div class="d-flex">
                        <div class="me-3">
                            <input onChange={(e) => { setName(e.target.value) }} placeholder="Enter Name" id="docterName" type="text" class="form-control" />
                        </div>

                    </div>
                </div>


                <div class="border bg-light p-3 mb-3 m-auto">
                    <h5 class="mb-3" style={{ fontSize: '18px' }}>CHECK AVAILABILITY</h5>
                    <label class="form-label">Check-in</label>
                    <input onChange={(e) => { setDate(e.target.value) }} type="date" id="checkIn" class="form-control shadow-none mb-3" />
                </div>


                <div class="border bg-light p-3 mb-3 m-auto text-center">
                    <button onClick={handelSearch} class="btn text-white shadow-none custom-bg" onclick="findDoctors('doctorFilterDoctorPage');">Submit</button>
                </div>
            </div>
        </div>
    )
}




export function DoctorSectionDoctorPage(props) {

    const navigate = useNavigate();

    
    return (
        <div class="col-lg-9 col-md-12 px-4" >
            {props.doctorFilter && props.doctorFilter.map((doctor, index) => {

                const rating = Math.floor(Math.random() * 5) + 1;
                const image = doctorImages[index % doctorImages.length];

                return (
                    <motion.div whileHover={{ scale: 1.04 }} key={index} class="card mb-4 border-0 fadeInAnimation">
                        <div class="row g-0 p-3 align-item-center boxShadow1" >
                            <div class="col-md-5 mb-lg-0 mb-md-0 mb-3">
                                <img src={image} class="img-fluid rounded-start" alt="..." />
                            </div>
                            <div class="col-md-7 px-lg-5 px-md-3 px-0 ">
                                <div className="row">
                                    <h3>Dr.{doctor.name}</h3>
                                </div>
                                <hr />
                                <div>
                                    <h6>Place:&nbsp;{doctor.place} </h6>

                                </div>
                                <div>
                                    <h6>Email: &nbsp;{doctor.email}</h6>
                                </div>

                                <hr />
                                <div className="d-flex justify-content-center my-3">
                                    <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
                                </div>
                                <motion.div whileHover={{ scale: 1.2 }} className="d-flex justify-content-center">
                                    <button style={{ maxWidth: '350px' }}
                                        onClick={() => {
                                            if (!localStorage.getItem('token')) {
                                                props.setLoginPop(true);
                                            } else {
                                                navigate('/appointment', { state: { doctor: doctor, rating: rating, image: image, id: null, date: "", time: "" } });
                                            }
                                        }}
                                        class="btn btn-sm w-100 text-white custom-bg shadow-none mb-2">Place Appointment </button>
                                </motion.div>

                            </div>

                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
