import React from 'react';
import AssignRoutes, { Delivery } from './AssignRoutes';
import axios from 'axios';

function App() {
  const [del, setDel] = React.useState([])


  React.useEffect(() => {
    axios
      .get('http://localhost:12000/deliveries') // Replace with your API URL
      .then(response => {
        setDel((response).data?.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, [])


  return (
    <div>
      <AssignRoutes deliveries={del} />
    </div>
  );
}

export default App;
