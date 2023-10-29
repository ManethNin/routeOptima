
export const storeData =[
    ["STOR_1", "Colombo"],
    ["STOR_2", "Negombo"],
    ["STOR_3", "Galle"],
    ["STOR_4", "Matara"],
    ["STOR_5", "Jaffna"],
    ["STOR_6", "Trinco"]
  ]
  


export const dashboardAdminData = [
    { name: "Dashboard", icon: <i className='bx bxs-dashboard' ></i>, active: true, to: '/dashboard' },
    { name: "View Users", icon: <i className='bx bxs-user-plus'></i>, active: false, to: '/dashboard/add-doctors' },
    // { name: "Message", icon:  <i className='bx bxs-message-dots' ></i>, active: false,to:'/dashboard/messsages' },
    // { name: "Analytics", icon:  <i className='bx bxs-doughnut-chart' ></i>, active: false,to:"/dashboard/analytics"},
]

export const dashboardAdminOverview = {
    "summary": [
        { name: "Total Customers", icon: <i className='bx bxs-group' ></i>, key: 'totalCustomers' },
        { name: "Total Store Managers", icon: <i className='bx bxs-group' ></i>, key: 'totalSmanagers' },
        { name: "Total Delevery Managers", icon: <i className='bx bxs-group' ></i>, key: 'totalDmanagers' },
        { name: "Total Route Managers", icon: <i className='bx bxs-group' ></i>, key: 'totalRmanagers' },
        { name: "Total Drivers", icon: <i className='bx bxs-group' ></i>, key: 'totalDrivers' },
        { name: "Total Driver Assistants", icon: <i className='bx bxs-group' ></i>, key: 'totalDassistants' },
    ]

}




export const dashboardProductManagerData = [
    { name: "Dashboard", icon: <i className='bx bxs-dashboard' ></i>, active: true, to: '/dashboard' },
    { name: "Processed Orders", icon: <i className='bx bx-task'></i>, active: false, to: '/dashboard/processed' },
]

export const dashboardProductManagerOverview = {
    "summary": [
        { name: "Pending Orders", icon: <i className='bx bxs-group' ></i>, key: 'pendingOrders' },
        { name: "Total Product Managers", icon: <i className='bx bxs-group' ></i>, key: 'totalSmanagers' },
        { name: "Total Delevery Managers", icon: <i className='bx bxs-group' ></i>, key: 'totalDmanagers' },

    ],
    "btnText": "View Processed Orders",
    "btnLink": "processed"
}



export const dashboardStoreManagerData = [
    { name: "Dashboard", icon: <i className='bx bxs-dashboard' ></i>, active: true, to: '/dashboard' },
    { name: "Sent To Delivery", icon: <i className='bx bx-task'></i>, active: false, to: '/dashboard/added-to-store' },
    { name: "Completed Orders", icon: <i className='bx bx-task'></i>, active: false, to: '/dashboard/store-completed' },
]

export const dashboardStoreManagerOverview = {
    "summary": [
        { name: "Pending Orders", icon: <i className='bx bxs-group' ></i>, key: 'pendingOrders' },
        { name: "Total Store Managers", icon: <i className='bx bxs-group' ></i>, key: 'totalSmanagers' },
        { name: "Total Delevery Managers", icon: <i className='bx bxs-group' ></i>, key: 'totalDmanagers' },

    ],
    "btnText": "Added To Delivery",
    "btnLink": "added-to-store"
}





// route manager 

export const dashboardRouteManagerData = [
    { name: "Dashboard", icon: <i className='bx bxs-dashboard' ></i>, active: true, to: '/dashboard' },
    { name: "Add Route", icon: <i className='bx bx-task'></i>, active: false, to: '/dashboard/add-route' },

]

export const dashboardRouteManagerOverview = {
    "summary": [
        { name: "All Routes", icon: <i className='bx bxs-group' ></i>, key: 'pendingOrders' },
        { name: "Total Route Managers", icon: <i className='bx bxs-group' ></i>, key: 'totalSmanagers' },
        { name: "Total Delevery Managers", icon: <i className='bx bxs-group' ></i>, key: 'totalDmanagers' },

    ],
    "btnText": "Add Route",
    "btnLink": "add-route"
}



