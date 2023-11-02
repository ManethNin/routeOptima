import React from "react";
import "./Paymentgateway.css";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Navigation } from "../../components/Navigation/Navigation";

export const Paymentgateway = () => {
  return (
    <>
    <Navigation/>
      <h1>Payment gateaway</h1>
      <p className="getaway-msg">Payment gateway only applicable for Production build.</p>
      <div className="btn">
        <Link to="/store">
          <Button>Explore More</Button>
        </Link>
      </div>
    </>
  );
};
