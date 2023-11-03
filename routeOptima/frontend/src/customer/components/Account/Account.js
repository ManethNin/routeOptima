import React from "react";
import styles from "./Account.module.css";

import {
  User,
  Link,
  Tab,
  Input,
  Card,
  CardBody,
  Tabs,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  SelectItem,
  Select,
} from "@nextui-org/react";

import { MdMail } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillPhone } from "react-icons/ai";
import { BiStreetView } from "react-icons/bi";
import { RiUserFill } from "react-icons/ri";

import axios from "axios";

export const Account = () => {
  // Password toggle

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Get cities from db

  const [cityList, setCityList] = React.useState([]);

  // const getCities = () => {
  //   axios
  //     .get("http://localhost:3001/api/cities")
  //     .then((res) => {
  //       setCityList(res.data);
  //     })
  //     .catch((error) => {
  //       console.error("AxiosError:", error);
  //     });
  // };

  // getCities();

  // Email validation

  const [email, setEmail] = React.useState("");

  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  // Password validation

  const [pwd, setPwd] = React.useState("");

  const validatePwd = (pwd) =>
    pwd.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/);

  const isInvalidPwd = React.useMemo(() => {
    if (pwd === "") return false;

    return validatePwd(pwd) ? false : true;
  }, [pwd]);

  // onChangeHandle

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");

  // Handle Register
  const [msg, setMsg] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/customer/register", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: pwd,
        phone: phone,
        street: street,
        city: city,
      })
      .then((res) => {
        if (res.status === 201) {
          setDisabled(true);
          console.log("Created");
          setMsg("Account is created successfully! Please Login");
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else {
          console.log(res.data.error);
          window.location.reload();
        }
      });
  };

  const [selected, setSelected] = React.useState("login");

  // getCities();
  return (
    <>
      <User
        name="Jane Doe"
        description="Customer"
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        }}
        className={styles["user"]}
      />
      <Tabs
        fullWidth
        size="md"
        aria-label="Tabs form"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="orders" title="Orders">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody></TableBody>
          </Table>
          <Button
            fullWidth
            onClick={() => {
              localStorage.removeItem("AUTHKEY");
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
          >
            Logout
          </Button>
        </Tab>
        <Tab key="account-settings" title="Settings">
          <form className={styles["container"]} onSubmit={handleRegister}>
            <Input
              type="text"
              label="First Name"
              endContent={
                <RiUserFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              onValueChange={setFirstName}
              isDisabled={disabled}
              placeholder="Enter your first name"
            />

            <Input
              type="text"
              label="Last Name"
              endContent={
                <RiUserFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              onValueChange={setLastName}
              isDisabled={disabled}
              placeholder="Enter your last name"
            />

            <Input
              type="email"
              label="Email"
              value={email}
              isInvalid={isInvalid}
              errorMessage={isInvalid && "Please enter a valid email"}
              onValueChange={setEmail}
              endContent={
                <MdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              isDisabled={disabled}
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={pwd}
              isInvalid={isInvalidPwd}
              errorMessage={
                isInvalidPwd &&
                "Password should contain at least one uppercase letter, one lowercase letter, one digit, one special character (#?!@$%^&*-), and should have minimum length of 8 characters."
              }
              onValueChange={setPwd}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              isDisabled={disabled}
              type={isVisible ? "text" : "password"}
            />

            <Input
              type="tel"
              label="Phone"
              endContent={
                <AiFillPhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              onValueChange={setPhone}
              isDisabled={disabled}
              placeholder="Enter your phone number"
            />

            <Input
              type="text"
              label="Street"
              endContent={
                <BiStreetView className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              onValueChange={setStreet}
              isDisabled={disabled}
              placeholder="Enter your street address"
            />

            {/* <Select
              label="City"
              placeholder="Select your city"
              onValueChange={setCity}
              isDisabled={disabled}
            >
              {cityList.map((city) => (
                <SelectItem key={city.id} value={city.name_en}>
                  {city.name_en}
                </SelectItem>
              ))}
            </Select> */}

            <Button
              type="submit"
              className={styles["submit-btn"]}
              color="default"
              isDisabled={disabled}
            >
              Update
            </Button>
          </form>
        </Tab>
      </Tabs>
    </>
  );
};
