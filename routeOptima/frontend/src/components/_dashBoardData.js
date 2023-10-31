import per1 from '../assets/person/person (1).jpeg';
import per2 from '../assets/person/person (2).jpeg';
import per3 from '../assets/person/person (3).jpeg';
import per4 from '../assets/person/person (4).jpeg';
import per5 from '../assets/person/person (5).jpeg';
import per6 from '../assets/person/person (6).jpeg';
import per7 from '../assets/person/person (7).jpeg';
import per8 from '../assets/person/person (8).jpeg';


export const personImages=[per1,per2,per3,per4,per5,per6,per7,per8]


export const storeData =[
    ["STOR_1", "Colombo"],
    ["STOR_2", "Negombo"],
    ["STOR_3", "Galle"],
    ["STOR_4", "Matara"],
    ["STOR_5", "Jaffna"],
    ["STOR_6", "Trinco"]
  ]
  
export const userRoles = [
    "Customer",
    "Store Manager",
    "Delivery Manager",
    "Route Manager",
    "Product Manager",
    "Driver",
    "Driver Assistant"
  ];


export const dashboardAdminData = [
    { name: "Dashboard", icon: <i className='bx bxs-dashboard' ></i>, active: true, to: '/dashboard' },
    { name: "View Customers", icon: <i className='bx bxs-user-plus'></i>, active: false, to: '/dashboard/view-customers' },
    { name: "View Users", icon: <i className='bx bxs-doughnut-chart' ></i>, active: false, to: '/dashboard/view-users' },
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
    { name: "View Products", icon: <i className='bx bx-task'></i>, active: false, to: '/dashboard/view-products' },
    { name: "Add Products", icon: <i className='bx bx-task'></i>, active: false, to: '/dashboard/add-products' },
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





export const dashboardDeliveryManagerData = [
    { name: "Dashboard", icon: <i className='bx bxs-dashboard' ></i>, active: true, to: '/dashboard' },
    { name: "Schedule Truck", icon: <i className='bx bx-task'></i>, active: false, to: '/dashboard/schedule-trucks' },
    { name: "View Schedules", icon: <i className='bx bx-task'></i>, active: false, to: '/dashboard/view-schedules' },
    { name: "View Deliveries", icon: <i className='bx bx-task'></i>, active: false, to: '/dashboard/view-deliveries' },
]

export const dashboardDeliveryManagerOverview = {
    "summary": [
        { name: "Pending Orders", icon: <i className='bx bxs-group' ></i>, key: 'pendingOrders' },
        { name: "Total Store Managers", icon: <i className='bx bxs-group' ></i>, key: 'totalSmanagers' },
        { name: "Total Delevery Managers", icon: <i className='bx bxs-group' ></i>, key: 'totalDmanagers' },

    ],
    "btnText": "Schedule Truck",
    "btnLink": "schedule-trucks"
}




