import React, { useState, useEffect } from "react";
import * as reqSend from "../../global/reqSender";
import { motion } from 'framer-motion';
import { dashboardAdminOverview } from '../_dashBoardData';
import { Table } from "./dashBoardComps";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';



import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';



import { userRoles, storeData, personImages } from "../_dashBoardData";



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

    }, [isComponentChanged, props.start, props.status])

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
                                        <img src={personImages[index % personImages.length]} />
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



export function ViewProducts(props) {
    const [data, setData] = useState(null);
    const [isComponentChanged, setIsComponentChanged] = useState(false);

    const navigate = useNavigate()
    useEffect(() => {

        reqSend.defaultReq("GET", 'shop/getallproducts', {}, (response) => {
            const dataR = response.data

            setData(
                {
                    name: "",
                    heading: ["", "Name", "Volume", "Unit Price", "Stock Quntity", "View", "Edit", "Delete"],
                    body: dataR.map((row, index) => {

                        return (

                            <tr key={index}>
                                <td></td>
                                <td>{row.name}</td>
                                <td>{row.volume}</td>
                                <td>{row.unit_price}</td>
                                <td>{row.stock_quantity}</td>

                                {/* <td >
                                    <div className="d-flex justify-content-center">
                                        <img src={personImages[index % personImages.length]} />
                                        <p>{row.first_name}</p>
                                    </div>
                                </td> */}
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <motion.p
                                            whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status delivered" style={{ fontSize: '15px', minWidth: '100px' }}>View</motion.p>
                                    </div>
                                </td>

                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <motion.p
                                            onClick={() => { navigate('/dashboard/add-products', { state: { id: row.id, name: row.name, description: row.description, unit_price: row.unit_price, stock_quantity: row.stock_quantity, volume: row.volume } }) }}
                                            whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status pending" style={{ fontSize: '15px', minWidth: '100px' }}>Edit</motion.p>
                                    </div>
                                </td>


                                <td >
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <motion.p
                                            onClick={() => {
                                                reqSend.swalFireReq1("PUT", 'shop/deleteproduct/' + row.id, {},
                                                    "Successfully Removed", "Error While Removing.", (response) => {
                                                        setIsComponentChanged(!isComponentChanged)
                                                    }, "Error! Check Your Connection");
                                            }}
                                            whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status cancelled" style={{ fontSize: '15px' }}>Remove</motion.p>
                                    </div>

                                </td>
                            </tr>
                        )
                    })
                }

            )
        });
    }, [isComponentChanged])




    return (
        <>
            <main>

                <div className="head-title">
                    <div className="left">
                        <h1>View Products</h1>
                    </div>

                    <Link to={'/dashboard/add-products'} className="btn-download">
                        <i className='bx bxs-user-plus'></i>
                        <span className="text">Add Products</span>
                    </Link>

                </div>

                {data ? <Table data={data} /> : null}
            </main>
        </>
    )

}




export function AddProducts(props) {
    const location = useLocation();
    const stateParams = location.state;


    const [name, setName] = useState(stateParams ? stateParams.name : "");
    const [description, setDescription] = useState(stateParams ? stateParams.description : "");
    const [unitPrice, setUnitPrice] = useState(stateParams ? stateParams.unit_price : "")
    const [stockQuantity, setStockQuantity] = useState(stateParams ? stateParams.stock_quantity : "")
    const [volume, setVolume] = useState(stateParams ? stateParams.volume : "")


    const handelSubmit = (event) => {
        event.preventDefault();
        // console.log(parseFloat(unitPrice))
        if (name.trim() != "" && unitPrice != null && parseFloat(unitPrice) > 0 && parseInt(stockQuantity) > 0 && parseInt(volume) > 0) {
            const submitData = {
                name: name,
                description: description,
                unit_price: unitPrice,
                stock_quantity: stockQuantity,
                volume: volume,
                id: stateParams ? stateParams.id : null
            }
            reqSend.defaultReq("POST", 'shop/addproduct/', submitData, responce => {
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

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Add Products</h1>
                </div>

            </div>

            <div className="table-data " >
                <div className="order boxShadow1 " >
                    <div className="d-flex justify-content-center">
                        <h3 style={{ textAlign: 'center' }}>Add a Product</h3>
                    </div>

                    <div className='container mt-4'>
                        <form onSubmit={handelSubmit}>
                            <div className="row my-3">
                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' value={name} required onChange={(e) => { setName(e.target.value) }} name="name" label="Name" variant="outlined" fullWidth />

                                </div>
                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' value={volume} required onChange={(e) => { setVolume(e.target.value) }} name="name" label="Product Volume" variant="outlined" fullWidth />

                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-12 ">
                                    <TextField className='darkThemeText' rows={4} multiline value={description} onChange={(e) => { setDescription(e.target.value) }} name="name" label="Description" variant="outlined" fullWidth />

                                </div>

                            </div>

                            <div className="row my-3">
                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' value={unitPrice} required onChange={(e) => { setUnitPrice(e.target.value) }} name="name" label="Unit Price(Rs)" variant="outlined" fullWidth />

                                </div>
                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' value={stockQuantity} required onChange={(e) => { setStockQuantity(e.target.value) }} name="name" label="Stock Quntity" variant="outlined" fullWidth />

                                </div>
                            </div>



                            <div className='row justify-content-center my-5'>
                                <button
                                    type='submit'

                                    className='btn btn-md btn-primary' style={{ borderRadius: '50px', maxWidth: '250px',minHeight:'50px' }}>Save Product</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </main>
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
                                        <img src={personImages[index % personImages.length]} />
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

                                    className='btn btn-md btn-primary' style={{ borderRadius: '50px', maxWidth: '250px',minHeight:'50px' }}>Save Route</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    )
}














// delivery manager 

export function SeheduleTruck(props) {
    const location = useLocation();
    const stateParams = location.state;


    const [store, setStore] = useState(stateParams ? stateParams.store : "STOR_1");
    const [route, setRoute] = useState("default");
    const [routes, setRoutes] = useState(null);
    const [value, setValue] = useState(dayjs());
    const [selectingData, setSelectingData] = useState(null);
    const [trucks, setTrucks] = useState("default");
    const [drivers, setDrivers] = useState("default");
    const [assi, setAssi] = useState("default");

    useEffect(() => {
        getRoutes()
    }, [store])


    useEffect(() => {
        if (route == "default") {
            setSelectingData(null)
            setTrucks("default")
            setDrivers("default")
            setAssi("default")
            setValue(dayjs())

        }
    }, [route])



    const getRoutes = () => {

        reqSend.defaultReq("POST", 'control/schedule/route', { storeId: store }, (response) => {
            setRoutes(response.data.results)
        });
    }

    const handelSubmit = (event) => {
        event.preventDefault();
        if (route != "default" && trucks != "default" && assi != "default") {
            const submitData = {
                "date": value,
                "routeId": route,
                "truckId": trucks,
                "driverId": drivers,
                "assitantId": assi,
                "id": null
            }
            reqSend.defaultReq("POST", 'control/schedule', submitData, responce => {
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
            Swal.fire({ title: 'Error!', text: "Select All fields", icon: 'error', confirmButtonText: 'OK' })
        }
    }







    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Schedule Truck</h1>
                </div>

            </div>

            <div className="table-data " >
                <div className="order boxShadow1 " >
                    <div className="d-flex justify-content-center">
                        <h3 style={{ textAlign: 'center' }}>Schedule A Truck</h3>
                    </div>

                    <div className='container mt-4'>
                        <form onSubmit={handelSubmit}>
                            <div className="row my-3">
                                <div className="col col-md-6">
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select" value={store} label="Store" onChange={(e) => { setStore(e.target.value) }} fullWidth
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
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select" value={route} label="Store" onChange={(e) => { setRoute(e.target.value) }} fullWidth
                                    >
                                        <MenuItem value={"default"}>Select a Route</MenuItem>
                                        {routes && routes.map((val, index) => {
                                            return (
                                                <MenuItem key={index} value={val.id}>{val.name + " (max time - " + val.max_time + ")"}</MenuItem>
                                            )
                                        })}


                                    </Select>
                                </div>

                            </div>


                            <div className='my-5' style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
                                <div className="boxShadow1 p-4 " style={{ maxWidth: '500px', backgroundColor: 'white', borderRadius: '10px' }} >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <StaticDateTimePicker
                                            orientation="landscape"
                                            value={dayjs(value, 'YYYY.MM.DD HH:mm:ss')}
                                            onChange={(newTime) => {
                                                setValue(newTime.format("YYYY.MM.DD HH:mm:ss"))
                                                if (route && route != "default") {
                                                    reqSend.defaultReq("POST", 'control/schedule/truck', {
                                                        storeId: store,
                                                        routeId: route,
                                                        startTime: newTime.format("YYYY.MM.DD HH:mm:ss")
                                                    }, (response) => {

                                                        setSelectingData(response.data)
                                                    }
                                                    )
                                                }

                                            }

                                            }
                                            disabled={route == "default" ? "disabled" : ""}

                                        />
                                    </LocalizationProvider>
                                </div>

                            </div>



                            {

                                selectingData &&
                                <>
                                    <div className="row my-3">
                                        <div className="col col-md-6">
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select" value={trucks} label="Store" onChange={(e) => { setTrucks(e.target.value) }} fullWidth
                                            >
                                                <MenuItem value={"default"}>Select Truck</MenuItem>
                                                {selectingData.truckData.map((val, index) => {
                                                    return (
                                                        <MenuItem key={index} value={val.id}>{val.id + " (max Capacity - " + val.max_capacity + ")"}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </div>

                                    </div>


                                    <div className="row my-3">
                                        <div className="col col-md-6">
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select" value={drivers} label="Store" onChange={(e) => { setDrivers(e.target.value) }} fullWidth
                                            >
                                                <MenuItem value={"default"}>Select Driver</MenuItem>
                                                {selectingData.drivers.map((val, index) => {

                                                    return (
                                                        <MenuItem key={index} value={val.id}>{val.first_name + " " + val.last_name + " (Work hours - " + (val.work_hours ? val.work_hours : 0) + ")"}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                        <div className="col col-md-6">
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select" value={assi} label="Store" onChange={(e) => { setAssi(e.target.value) }} fullWidth
                                            >
                                                <MenuItem value={"default"}>Select Driver</MenuItem>
                                                {selectingData.assistant.map((val, index) => {

                                                    return (
                                                        <MenuItem key={index} value={val.id}>{val.first_name + " " + val.last_name + " (Work hours - " + (val.work_hours ? val.work_hours : 0) + ")"}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </div>

                                    </div>
                                </>
                            }

                            <div className='row justify-content-center my-5'>
                                <button
                                    type='submit'

                                    className='btn btn-md btn-primary' style={{ borderRadius: '50px', maxWidth: '250px',minHeight:'50px' }}>Save Route</button>
                            </div>
                        </form>
                    </div>




                </div>
            </div>
        </main>
    )
}



export function ViewSchedules(props) {

    const navigate = useNavigate()
    const [data, setData] = useState(null);
    const [isComponentChanged, setIsComponentChanged] = useState(false);
    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;


        reqSend.defaultReq("GET", 'control/schedule/' + formattedDate, {}, (response) => {
            const dataR = response.data.results

            setData(
                {
                    name: "Scheduled Trucks",
                    heading: ["", "Store", "Route", "Truck", "Date", "Time", "Add", "Remove"],
                    body: dataR.map((row, index) => {
                        return (

                            <tr key={index}>
                                <td></td>
                                <td >
                                    {storeData.find(entry => entry[0] === row.store_id)[1]}
                                </td>
                                <td>{row.name}</td>
                                <td>{row.truck_id}</td>
                                <td>{row.date}</td>
                                <td>{row.time_local}</td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <motion.p
                                            onClick={() => { navigate('/dashboard') }}
                                            whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status delivered" style={{ fontSize: '15px' }}>Add Deliveries</motion.p>
                                    </div>
                                </td>
                                <td >
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <motion.p
                                            onClick={() => {
                                                reqSend.swalFireReq1("DELETE", 'control/schedule', { id: row.id },
                                                    "Successfully Removed", "Error While Removing.", (response) => {
                                                        setIsComponentChanged(!isComponentChanged)
                                                    }, "Error! Check Your Connection");
                                            }}
                                            whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status cancelled" style={{ fontSize: '15px' }}>Remove </motion.p>
                                    </div>

                                </td>
                            </tr>
                        )
                    })
                }

            )
        });

    }, [isComponentChanged])

    return (
        <>
            <main>

                <div className="head-title">
                    <div className="left">
                        <h1>View Schedules</h1>
                    </div>

                </div>

                {data ? <Table data={data} /> : null}
            </main>
        </>
    )
}




