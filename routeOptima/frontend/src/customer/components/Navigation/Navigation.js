import React, { useContext } from "react";
import "./Navigation.css";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { BsBag } from "react-icons/bs";
import { GiConverseShoe } from "react-icons/gi";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shopContextProvider";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { AiOutlineUser } from "react-icons/ai";
import { ProfileModal } from "../ProfileModal/ProfileModal";
import { Account } from "../Account/Account";

export const Navigation = (props) => {
  const isUserLogged = React.useMemo(
    () => localStorage.getItem("AUTHKEY") ?true :false,
    []
  );

  const { bagCount } = useContext(ShopContext);
  const [selected, setSelected] = React.useState("login");
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
        <div className={props.active === 2 ? "nav-link-active" : "nav-link"}>
          <Link>About</Link>
        </div>
        <div className={props.active === 3 ? "nav-link-active" : "nav-link"}>
          <Link>Contact</Link>
        </div>
        <div className={props.active === 4 ? "nav-icon-active" : "nav-icon"}>
          <Link to="/bag">
            <div className="bag">
              <BsBag />
              <div className="item-count">{bagCount}</div>
            </div>
          </Link>
        </div>
        <div className={props.active === 5 ? "nav-icon-active" : "nav-icon"}>
          <div className="sign-in">
            <Popover placement="right">
              <PopoverTrigger>
                <a>
                  <AiOutlineUser className="user-icon" />
                </a>
              </PopoverTrigger>
              <PopoverContent>
                {!isUserLogged ? (
                  <Tabs
                    fullWidth
                    size="md"
                    aria-label="Tabs form"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                  >
                    <Tab key="login" title="Login">
                      <div className={"form"}>
                        <LoginForm />
                      </div>
                      <p className={"switch-link"}>
                        Don't have an account ?{" "}
                        <a onClick={() => setSelected("register")}> Register</a>
                      </p>
                    </Tab>
                    <Tab key="register" title="Register">
                      <div className={"form"}>
                        <RegisterForm />
                      </div>
                      <p className={"switch-link"}>
                        Already have an account ?{" "}
                        <a onClick={() => setSelected("login")}> Login</a>
                      </p>
                    </Tab>
                  </Tabs>
                ) : (
                  <Account />
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <NavbarContent justify="end"></NavbarContent>
    </Navbar>
  );
};
