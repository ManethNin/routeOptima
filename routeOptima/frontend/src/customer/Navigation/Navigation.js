import React, { useContext, useState } from "react";
import "./Navigation.css";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import { AiFillApple } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { GiConverseShoe } from "react-icons/gi";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/shopContextProvider";

export const Navigation = (props) => {
  const { bagCount } = useContext(ShopContext);
  return (
    <Navbar shouldHideOnScroll height={"2.8rem"}>
      <NavbarBrand></NavbarBrand>
      <div className="nav-links">
        <div className="nav-icon logo">
          <Link to="/">
            <GiConverseShoe />
          </Link>
        </div>
        <div className={props.active === 1 ? "nav-link-active" : "nav-link"}>
          <Link to="/store">Store</Link>
        </div>
        {/* <div className={props.active === 2 ? "nav-link-active" : "nav-link"}>
          <Link>Adidas</Link>
        </div>
        <div className={props.active === 3 ? "nav-link-active" : "nav-link"}>
          <Link>Nike</Link>
        </div>
        <div className={props.active === 4 ? "nav-link-active" : "nav-link"}>
          <Link>Puma</Link>
        </div>
        <div className={props.active === 5 ? "nav-link-active" : "nav-link"}>
          <Link>Vans</Link>
        </div> */}
        <div className={props.active === 6 ? "nav-link-active" : "nav-link"}>
          <Link>About</Link>
        </div>
        <div className={props.active === 7 ? "nav-link-active" : "nav-link"}>
          <Link>Contact</Link>
        </div>
        <div className={props.active === 8 ? "nav-icon-active" : "nav-icon"}>
          <Link to="/bag">
            <div className="bag">
              <BsBag />
              <div className="item-count">{bagCount}</div>
            </div>
          </Link>
        </div>
      </div>
      <NavbarContent justify="end"></NavbarContent>
    </Navbar>
  );
};
