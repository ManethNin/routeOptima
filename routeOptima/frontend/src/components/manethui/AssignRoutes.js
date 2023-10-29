import "./AssignRoutes.css";
import React, { useState } from 'react';

function AssignRoutes(props) {
  const [selectedRoutes, setSelectedRoutes] = useState({});

  function handleDropDown(deliveryId, event) {
    setSelectedRoutes({ ...selectedRoutes, [deliveryId]: event.target.value });
  }

  function handleConfirm() {
    // Handle the confirmation logic here
  }

  return (
    <>
      <div className="Truck-Delivery">
        <div className="Header">
          <h3 className="Heading">Truck Delivery</h3>
        </div>
        <table>
          {props.deliveries.map((delivery) => (
            <tr key={delivery.ID}>
              <td>{delivery.ID}</td>
              <td className="customer-name">{delivery.customerName}</td>
              <td></td>
              <td>
                <div>
                  <label htmlFor="dropdown">Assign Route - </label>
                  <select value={selectedRoutes[delivery.ID] || ''} id="dropdown" onChange={(e) => handleDropDown(delivery.ID, e)}>
                    <option value="">Select...</option>
                    <option value="1A">Route A</option>
                    <option value="2A">Route B</option>
                    <option value="3A">Route C</option>
                  </select>
                </div>
              </td>
              <td>
                <button className="button" onClick={handleConfirm}>Confirm</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}

export default AssignRoutes;
