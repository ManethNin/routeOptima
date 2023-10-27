export const dashboardAdminData = [
    { name: "Dashboard", icon: <i className='bx bxs-dashboard' ></i>, active: true,to:'/dashboard' },
    { name: "View Users", icon: <i className='bx bxs-user-plus'></i>, active: false,to:'/dashboard/add-doctors' },
    // { name: "Message", icon:  <i className='bx bxs-message-dots' ></i>, active: false,to:'/dashboard/messsages' },
    // { name: "Analytics", icon:  <i className='bx bxs-doughnut-chart' ></i>, active: false,to:"/dashboard/analytics"},
]

export const dashboardAdminOverview=[
    {name:"Total Customers",icon :<i className='bx bxs-group' ></i>,key:'totalCustomers' },
    {name:"Total Store Managers",icon :<i className='bx bxs-group' ></i>,key:'totalSmanagers' },
    {name:"Total Delevery Managers",icon :<i className='bx bxs-group' ></i>,key:'totalDmanagers' },
    {name:"Total Route Managers",icon :<i className='bx bxs-group' ></i>,key:'totalRmanagers' },
    {name:"Total Drivers",icon :<i className='bx bxs-group' ></i>,key:'totalDrivers' },
    {name:"Total Driver Assistants",icon :<i className='bx bxs-group' ></i>,key:'totalDassistants' },
]

export const dashboardDoctorData = [
    { name: "Dashboard", icon: <i className='bx bxs-dashboard' ></i>, active: true,to:'/doctor' },
    { name: "My Appointments", icon: <i class='bx bx-task'></i>, active: false,to:'/doctor/my-appointments' },
    // { name: "Add a Report", icon: <i class='bx bxs-file-plus'></i>, active: false,to:'/doctor/add-report' },
    { name: "Scan MRI", icon: <i class='bx bx-scan'></i>, active: false,to:'/doctor/mri' },
    // { name: "Scan MRI", icon: <i className='bx bxs-user-plus'></i>, active: false,to:'/admin/mri' },
    { name: "Analytics", icon:  <i className='bx bxs-doughnut-chart' ></i>, active: false,to:"/doctor/analytics"},
]