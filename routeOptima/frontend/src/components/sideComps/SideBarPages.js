import { useState, useEffect } from "react";
import * as reqSend from "../../global/reqSender";
import { motion } from 'framer-motion';
import { dashboardAdminOverview } from '../_dashBoardData';
import { Table } from "./dashBoardComps";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import Swal from "sweetalert2";


import { userRoles, storeData,personImages } from "../_dashBoardData";



// admin 
export function ViewUsers(props) {
    const [data, setData] = useState(null);
    const [isComponentChanged, setIsComponentChanged] = useState(false);
    useEffect(() => {

        reqSend.defaultReq("POST", 'user/get-users', {
            status: parseInt(props.status),
            start: parseInt(props.start),
            end: parseInt(props.end)
        }, (response) => {
            const dataR = response.data.results
            setData(
                {
                    name: "",
                    heading: ["", "Name ", "Email",
                        // "Address",
                        "Role", "Remove"],
                    body: dataR.map((row, index) => {
                        return (

                            <tr key={index}>
                                <td></td>
                                <td >
                                    <div className="d-flex justify-content-center">
                                        <img src={personImages[index%personImages.length]} />
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
                                                reqSend.swalFireReq1("DELETE", 'user/users', { id: row.id },
                                                    "Successfully Removed", "Error While Removing.", (response) => {
                                                        setIsComponentChanged(!isComponentChanged)
                                                    }, "Error! Check Your Connection");
                                            }}
                                            whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status cancelled" style={{ fontSize: '15px' }}>Remove User</motion.p>
                                    </div>

                                </td>
                            </tr>
                        )
                    })
                }

            )
        });

    }, [isComponentChanged,props.start,props.status])

    return (
        <>
            <main>

                <div className="head-title">
                    <div className="left">
                        <h1>{props.title}</h1>
                    </div>

                </div>

                {data ? <Table data={data} /> : null}
            </main>
        </>
    )
}



// product manager 
export function ProcessedOrders(props) {
    const [data, setData] = useState(null);


    useEffect(() => {

        reqSend.defaultReq("GET", 'control/order/1', {}, (response) => {
            const dataR = response.data.results
            setData(
                {
                    name: "",
                    heading: ["", "ID", "Quntity", "Distination", "Order Date", "Name", "Status"],
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
                                        <img src={personImages[index%personImages.length]} />
                                        <p>{row.first_name}</p>
                                    </div>
                                </td>


                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <motion.p
                                            transition={{ delay: 0, duration: 0.05 }} className={"status " + (parseInt(row.shipped) ? "delivered" : "pending")} style={{ fontSize: '15px' }}>{parseInt(row.shipped) ? "Completed" : "Pendging"}</motion.p>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }

            )
        });


    }, [])




    return (
        <>
            <main>

                <div className="head-title">
                    <div className="left">
                        <h1>Processed Orders</h1>
                    </div>

                </div>

                {data ? <Table data={data} /> : null}
            </main>
        </>
    )

}





// store manager 

export function SentToDilivery(props) {
    const [data, setData] = useState(null);


    useEffect(() => {

        reqSend.defaultReq("POST", 'control/order-by-store', {
            shipped: "1",
            store: localStorage.getItem('store'),
            completed: props.completed
        }, (response) => {
            const dataR = response.data.results

            setData(
                {
                    name: "Pending Orders",
                    heading: ["", "ID", "Product Name", "Quntity", "Volume", "Order Date", "Name", "Status"],
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
                                        <img src={personImages[index%personImages.length]} />
                                        <p>{row.first_name}</p>
                                    </div>
                                </td>

                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <motion.p
                                            transition={{ delay: 0, duration: 0.05 }} className={"status " + (parseInt(props.completed) ? "delivered" : "shipped")} style={{ fontSize: '15px' }}>{(parseInt(props.completed) ? "Order Completed" : "Pending Delivery")}</motion.p>
                                    </div>
                                </td>


                            </tr>

                        )
                    })
                }

            )
        });


    }, [props.completed])


    return (
        <>
            <main>

                <div className="head-title">
                    <div className="left">
                        <h1>Sent To Delivery</h1>
                    </div>

                </div>

                {data ? <Table data={data} /> : null}
            </main>
        </>
    )

}









// route manager 

export function AddRoute(props) {

    const location = useLocation();
    const stateParams = location.state;


    const [store, setStore] = useState(stateParams ? stateParams.store : "STOR_1");
    const [name, setName] = useState(stateParams ? stateParams.name : "");
    const [maxTime, setMaxTime] = useState(stateParams ? stateParams.maxTime : null)



    const handelSubmit = (event) => {
        event.preventDefault();
        if (name.trim() != "" && maxTime != null && maxTime != "Invalid Date") {
            const submitData = {
                name: name,
                storeId: store,
                maxTime: maxTime,
                startTime: '00:00',
                id: stateParams ? stateParams.id : null
            }
            reqSend.defaultReq("POST", 'control/add-route/', submitData, responce => {
                Swal.fire({ title: 'Success!', text: "Changes Applied", icon: 'success', confirmButtonText: 'OK' })
            },
                responce => {
                    Swal.fire({ title: 'Error!', text: responce.data.message, icon: 'error', confirmButtonText: 'OK' })
                },
                responce => {
                    Swal.fire({ title: 'Error!', text: "Something went Wrong", icon: 'error', confirmButtonText: 'OK' })
                }
            );
        } else {
            Swal.fire({ title: 'Error!', text: "Enter Valied Data", icon: 'error', confirmButtonText: 'OK' })
        }



    }


    function CustomTimePickerToolbar() {
        return null;
    }


    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Add Routes</h1>
                </div>

            </div>

            <div className="table-data " >
                <div className="order boxShadow1 " >
                    <div className="d-flex justify-content-center">
                        <h3 style={{ textAlign: 'center' }}>Add a Route</h3>
                    </div>

                    <div className='container mt-4'>
                        <form onSubmit={handelSubmit}>
                            <div className="row my-3">
                                <div className="col col-md-6">
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={store}
                                        label="Store"
                                        onChange={(e) => { setStore(e.target.value) }}
                                        fullWidth

                                    >
                                        <MenuItem value={'STOR_1'}>Colombo</MenuItem>
                                        <MenuItem value={'STOR_2'} >Negombo</MenuItem>
                                        <MenuItem value={'STOR_3'} >Galle</MenuItem>
                                        <MenuItem value={'STOR_4'} >Matara</MenuItem>
                                        <MenuItem value={'STOR_5'} >Jaffna</MenuItem>
                                        <MenuItem value={'STOR_6'} >Trinco</MenuItem>


                                    </Select>
                                </div>
                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' value={name} required onChange={(e) => { setName(e.target.value) }} name="name" label="Name" variant="outlined" fullWidth />
                                </div>
                            </div>

                            <div className='my-5' style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
                                <div className="boxShadow1 p-4 " style={{ maxWidth: '500px', backgroundColor: 'white', borderRadius: '10px' }} >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <StaticTimePicker
                                            orientation="landscape"
                                            ampm={false}

                                            value={dayjs(maxTime, 'HH:mm')}
                                            onChange={(newTime) => setMaxTime(newTime.format('HH:mm'))}
                                            toolbarTitle=""
                                        />
                                    </LocalizationProvider>
                                </div>

                            </div>


                            <div className='row justify-content-center my-5'>
                                <button
                                    type='submit'

                                    className='btn btn-md btn-primary' style={{ borderRadius: '50px', maxWidth: '250px' }}>Save Route</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    )
}
