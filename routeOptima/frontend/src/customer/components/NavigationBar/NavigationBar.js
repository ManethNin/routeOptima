import React from "react";
import styles from "./NavigationBar.module.css";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  ButtonGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";

export const NavigationBar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { menuItems, current, profile } = props;

  // PopOver
  const popover = () => {
    return (
      <div>
        <Popover placement="bottom-end">
          <PopoverTrigger></PopoverTrigger>
          <PopoverContent></PopoverContent>
        </Popover>
      </div>
    );
  };

  // Tabs
  const [selected, setSelected] = React.useState("login");

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={styles["menu"]}
        />
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">SCMS</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className={styles["links"]} justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem isActive={index === current ? true : false}>
            <a href={item.to} key={index}>
              {item.name}
            </a>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {profile ? (
          profile
        ) : (
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button color="primary" size="sm">
                Account
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
              >
                <Tab key="login" title="Login">
                  <div className={styles["form"]}>
                    <LoginForm />
                  </div>
                  <p className={styles["switch-link"]}>
                    Don't have an account ?{" "}
                    <a onClick={() => setSelected("register")}> Register</a>
                  </p>
                </Tab>
                <Tab key="register" title="Register">
                  <div className={styles["form"]}>
                    <RegisterForm />
                  </div>
                  <p className={styles["switch-link"]}>
                    Already have an account ?{" "}
                    <a onClick={() => setSelected("login")}> Login</a>
                  </p>
                </Tab>
              </Tabs>
            </PopoverContent>
          </Popover>
        )}
        {/* <NavbarItem> */}
        {/* {profile ? profile : <ButtonGroup>
            <Button size="sm" color="primary" onPress={() => handleOpen("login")}>
              Login
            </Button>
            <Button size="sm" color="primary" onPress={() => handleOpen("register")}>
              Register
            </Button>
          </ButtonGroup>} */}
        {/* </NavbarItem> */}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <a
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="/"
            >
              {item.name}
            </a>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
