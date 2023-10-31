
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import * as reqSend from "../global/reqSender";
import { motion } from 'framer-motion';
import { storeData, userRoles } from './_dashBoardData';
import { Table } from "./sideComps/dashBoardComps";
import { useNavigate } from "react-router-dom";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { personImages } from "./_dashBoardData";

import Swal from "sweetalert2";


export default function Home(props) {


    const [counts, setCounts] = useState([0, 0, 0]);
    const [isComponentChanged, setIsComponentChanged] = useState(false);


    return (
        <main>

            <div className="head-title">
                <div className="left">
                    <h1>Dashboard</h1>
                </div>
                <Link to={props.data.btnLink} className="btn-download">
                    <i className='bx bxs-user-plus'></i>
                    <span className="text">{props.data.btnText}</span>
                </Link>
            </div>


            <ul className="box-info mb-5" style={{ paddingLeft: '0' }}>

                {props.data.summary.map((val, index) => {
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

            {(() => {
                if (localStorage.getItem('role') == 'admin') {
                    return <AdminHome isComponentChanged={isComponentChanged} setIsComponentChanged={setIsComponentChanged} />

                }
                else if (localStorage.getItem('role') == '4') {
                    return <ProductManagerHome isComponentChanged={isComponentChanged} setIsComponentChanged={setIsComponentChanged} />
                } else if (localStorage.getItem('role') == '1') {

                    return <StoreManagerHome isComponentChanged={isComponentChanged} setIsComponentChanged={setIsComponentChanged} />

                } else if (localStorage.getItem('role') == '2') {

                    return <DeliveryManagerHome isComponentChanged={isComponentChanged} setIsComponentChanged={setIsComponentChanged} />

                }

                else if (localStorage.getItem('role') == '3') {

                    return <RouteManagerHome isComponentChanged={isComponentChanged} setIsComponentChanged={setIsComponentChanged} />

                }
            })()}
        </main>
    )
}





function AdminHome(props) {
    const [data, setData] = useState(null);
    useEffect(() => {

        reqSend.defaultReq("POST", 'user/get-users', {
            status: 0,
            start: 1,
            end: 6
        }, (response) => {
            const dataR = response.data.results
            setData(
                {
                    name: "Pending To Approve",
                    heading: ["", "Name ", "Email",
                        //  "Address",
                        "Role", "Accept", "Reject"],
                    body: dataR.map((row, index) => {
                        return (

                            <tr key={index}>
                                <td></td>
                                <td >
                                    <div className="d-flex justify-content-center">
                                        <img src={personImages[index % personImages.length]} />
                                        <p>{row.first_name + " " + row.last_name}</p>
                                    </div>
                                </td>
                                <td>{row.email}</td>
                                {/* <td>{row.address}</td> */}
                                <td>{userRoles[parseInt(row.role)]}</td>





                                <td >
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <motion.p
                                            onClick={() => {
                                                reqSend.swalFireReq1("PATCH", 'user/users-pending', { id: row.id },
                                                    "User Added To system as " + userRoles[parseInt(row.role)], "Error While Adding.", (response) => {
                                                        props.setIsComponentChanged(!props.isComponentChanged)
                                                    }, "Error! Check Your Connection");
                                            }}
                                            whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status delivered" style={{ fontSize: '15px' }}>Accept User</motion.p>
                                    </div>

                                </td>

                                <td >
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <motion.p
                                            onClick={() => {
                                                reqSend.swalFireReq1("DELETE", 'user/users', { id: row.id },
                                                    "Successfully Removed", "Error While Removing.", (response) => {
                                                        props.setIsComponentChanged(!props.isComponentChanged)
                                                    }, "Error! Check Your Connection");
                                            }}
                                            whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status cancelled" style={{ fontSize: '15px' }}>Reject User</motion.p>
                                    </div>

                                </td>
                            </tr>
                        )
                    })
                }

            )
        });

    }, [props.isComponentChanged])

    return (
        <>
            {data ? <Table data={data} /> : null}
        </>
    )
}









function ProductManagerHome(props) {
    const [data, setData] = useState(null);

    useEffect(() => {

        reqSend.defaultReq("GET", 'control/order/0', {}, (response) => {
            const dataR = response.data.results
            setData(
                {
                    name: "Pending Orders",
                    heading: ["", "ID", "Quntity", "Distination", "Order Date", "Name", "Add to Train"],
                    body: dataR.map((row, index) => {
                        const onlyDate = new Date(row.order_date).toISOString().split('T')[0].replace(/-/g, '.')
                        return (

                            <tr key={index}>
                                <td></td>
                                <td>{row.product_id}</td>
                                <td>{row.quntity}</td>
                                <td>{row.distination}</td>
                                <td>{onlyDate}</td>

                                <td >
                                    <div className="d-flex justify-content-center">
                                        <img src={personImages[index % personImages.length]} />
                                        <p>{row.first_name}</p>
                                    </div>
                                </td>


                                <td >
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <motion.p
                                            onClick={() => {
                                                reqSend.swalFireReq1("POST", 'control/add-to-train/', { id: row.id, date: onlyDate, store_id: row.store_id },
                                                    "Oreder Added To Train", "Error While Adding.Train is Full", (response) => {
                                                        props.setIsComponentChanged(!props.isComponentChanged)
                                                    }, "Error! Check Your Connection");
                                            }}
                                            whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status delivered" style={{ fontSize: '15px' }}>Add To Dilivery</motion.p>
                                    </div>

                                </td>
                            </tr>
                        )
                    })
                }

            )
        });


    }, [props.isComponentChanged])



    return (
        <>
            {data ? <Table data={data} /> : null}
        </>
    )
}









function StoreManagerHome(props) {
    const [data, setData] = useState(null);

    useEffect(() => {

        reqSend.defaultReq("POST", 'control/order-by-store', {
            shipped: "0",
            store: localStorage.getItem('store'),
            completed: "0"
        }, (response) => {
            const dataR = response.data.results

            setData(
                {
                    name: "Pending Orders",
                    heading: ["", "ID", "Product Name", "Quntity", "Volume", "Order Date", "Name", "Add To Delivery", "Status"],
                    body: dataR.map((row, index) => {
                        const onlyDate = new Date(row.order_date).toISOString().split('T')[0].replace(/-/g, '.')
                        return (

                            <tr key={index}>
                                <td></td>
                                <td>{row.id}</td>
                                <td>{row.product_name}</td>
                                <td>{row.quntity}</td>
                                <td>{row.volume}</td>
                                <td>{onlyDate}</td>

                                <td >
                                    <div className="d-flex justify-content-center">
                                        <img src={personImages[index % personImages.length]} />
                                        <p>{row.first_name}</p>
                                    </div>
                                </td>


                                <td >
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <motion.p
                                            onClick={() => {
                                                reqSend.swalFireReq1("POST", 'control/mark-as-shipped', { id: row.id },
                                                    "Added To Dilivery.Mark As Shipped", "Error While Adding.", (response) => {
                                                        props.setIsComponentChanged(!props.isComponentChanged)
                                                    }, "Error! Check Your Connection");
                                            }}
                                            whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status delivered" style={{ fontSize: '15px' }}>Add To Dilivery</motion.p>
                                    </div>

                                </td>
                                <td >
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                                        <motion.p whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status cancelled" style={{ fontSize: '15px' }}>Not Recived</motion.p>
                                    </div>

                                </td>
                            </tr>

                        )
                    })
                }

            )
        });


    }, [props.isComponentChanged])
    return (
        <>
            {data ? <Table data={data} /> : null}
        </>
    )
}






function RouteManagerHome(props) {
    const navigate = useNavigate()
    const [data, setData] = useState(null);

    useEffect(() => {
        getData()

    }, [props.isComponentChanged])

    const getData = async () => {
        const arr = [];
        const getRequestData = (val) => {
            return new Promise((resolve, reject) => {
                reqSend.defaultReq("POST", 'control/get-route/', {
                    storeId: val[0]
                }, (response) => {
                    const dataR = response.data.results;
                    const Store = val;
                    arr.push([Store, dataR]);
                    resolve();
                });
            });
        };
        await Promise.all(storeData.map(val => getRequestData(val)));

        setData(arr)
    }


    return (
        <>
            <h3 style={{ textAlign: 'center', fontWeight: '600', marginTop: '70px' }}>Current Routs </h3>

            {data && data.map((row0, index0) => {
                if (row0[1].length > 0) {


                    const d = {
                        name: row0[0][1],
                        heading: ["", "Name", "Max Time(H:M)", "Edit", "Delete"],
                        body: row0[1].map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td></td>
                                    <td>{row.name}</td>
                                    <td>{row.max_time.slice(0, 5)}</td>

                                    <td >
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <motion.p
                                                onClick={() => {
                                                    navigate('/dashboard/add-route', { state: { id: row.id, name: row.name, maxTime: row.max_time.slice(0, 5), store: row0[0][0] } });
                                                }}
                                                whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status pending" style={{ fontSize: '15px' }}>Edit Route</motion.p>
                                        </div>
                                    </td>
                                    <td >
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <motion.p
                                                onClick={() => {
                                                    reqSend.swalFireReq1("DELETE", 'control/route/', { id: row.id },
                                                        "Successfully Removed", "Error While Removing.", (response) => {
                                                            props.setIsComponentChanged(!props.isComponentChanged)
                                                        }, "Error! Check Your Connection");
                                                }}
                                                whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status cancelled" style={{ fontSize: '15px' }}>Remove Route</motion.p>
                                        </div>

                                    </td>
                                </tr>

                            )
                        })
                    }

                    return (
                        d ? <Table key={index0} data={d} /> : null
                    )
                } else {
                    return null
                }
            })}



        </>
    )
}






function DeliveryManagerHome(props) {
    const [data, setData] = useState(null);
    const [schedule, setSchedule] = useState(null);

    


    useEffect(() => {

        reqSend.defaultReq("POST", 'control/peinding-delivery', {

        },  (response) => {
            const dataR = response.data.results
            const temp = {};
            dataR.forEach((row) => {
                temp[row.id] = "default";
            });
            setSchedule(temp)
            setData(dataR)

        });


    }, [props.isComponentChanged])
    return (
        <>
            <div className="table-data " >
            <div className="order boxShadow1 ">
                <div className="head">
                    <h3>Pending Delivery</h3>

                </div>
                <table>
                    <thead>
                        <tr style={{ color: 'balack' }}>
                            { ["", "ID", "Product Name", "Volume", "Order Date", "Name", "Select Scheduled Truck", "Status"].map((val,index)=>{
                                return(
                                    <th key={index}>{val}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                      {
                        data&& data.map((row, index) => {
                            const onlyDate = new Date(row.order_date).toISOString().split('T')[0].replace(/-/g, '.')
                            return (
    
                                <tr key={index}>
                                    <td></td>
                                    <td>{row.id}</td>
                                    <td>{row.product_name}</td>
                                  
                                    <td>{row.volume}</td>
                                    <td>{onlyDate}</td>
    
                                    <td >
                                        <div className="d-flex justify-content-center">
                                            <img src={personImages[index % personImages.length]} />
                                            <p>{row.first_name}</p>
                                        </div>
                                    </td>
                                    <td >
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                               
                                                <Select
                                                style={{width:'300px'}}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select" value={schedule?schedule[row.id]:"default"} label="Store" onChange={(e) => { setSchedule({ ...schedule, [row.id]: e.target.value }) }} 
                                                >
                                                    <MenuItem value={"default"}>Select Schedule</MenuItem>
                                                    {row.truck_schedules.map((val, index) => {
    
                                                        return (
                                                            <MenuItem key={index} value={val.id}>{val.truck_id + " ("+ val.current_capacity + " of " + val.max_capacity +") at "+val.time}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            
    
                                        </div>
    
                                    </td>
    
                                    <td >
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <motion.p
                                                onClick={() => {
                                                    if(schedule[row.id]!="default" && schedule!=null){
                                                        reqSend.swalFireReq1("POST", 'control/add-dilivery', { scheduleId:schedule[row.id], productId:row.id },
                                                        "Added To Dilivery Truck", "Error While Adding.", (response) => {
                                                            props.setIsComponentChanged(!props.isComponentChanged)
                                                        }, "Error! Check Your Connection");
                                                    }else{
                                                        Swal.fire({ title: 'Error!', text: "Please Select A Scheduled Truck", icon: 'error', confirmButtonText: 'OK' })
                                                    }
                                                   
                                                }}
                                                whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status delivered" style={{ fontSize: '15px' }}>Add To Dilivery</motion.p>
                                        </div>
    
                                    </td>
    
                                </tr>
    
                            )
                        })
                      }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}






