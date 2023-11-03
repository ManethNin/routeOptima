import React from "react";
import styles from "./RegisterForm.module.css";
import axios from "axios";

import { Input, Button, Select, SelectItem, Modal, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";

import { MdMail } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillPhone } from "react-icons/ai";
import { BiStreetView } from "react-icons/bi";
import { RiUserFill } from "react-icons/ri";

export const RegisterForm = () => {

  // Password toggle 
  
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);


  // Get cities from db

  // const [cityList, setCityList] = React.useState([]);

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
  const [msg, setMsg] = React.useState("")
  const [disabled, setDisabled] = React.useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/user/sign-up", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: pwd,
      address: phone,
      street: street,
      store:-1,
      role:0
      // city: city
    }).then((res) => {
        if (res.status === 201) {
          setDisabled(true)
          console.log("Created");
          setMsg("Account is created successfully! Please Login")
          buttonRef.current.click();
          setTimeout(function(){
            window.location.reload();
         }, 2000);
        }
        else {
          console.log(res.data.error);
          window.location.reload();
        }
    })
  }

  // modal
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const buttonRef = React.useRef(null);


  // return

  return (
    <form className={styles["container"]} onSubmit={handleRegister}>
      {/* <h2>Registration</h2> */}

      <Input
        type="text"
        label="First Name"
        endContent={
          <RiUserFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        isRequired={true}
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
        isRequired={true}
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
        isRequired={true}
        isDisabled={disabled}
        placeholder="Enter your email"
      />

      <Input
        label="Password"
        placeholder="Enter your password"
        value={pwd}
        isInvalid={isInvalidPwd}
        errorMessage={isInvalidPwd && "Password should contain at least one uppercase letter, one lowercase letter, one digit, one special character (#?!@$%^&*-), and should have minimum length of 8 characters."}
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
        isRequired={true}
        isDisabled={disabled}
        type={isVisible ? "text" : "password"}
      />

      <Input
        type="tel"
        label="Phone"
        endContent={
          <AiFillPhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        isRequired
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
        isRequired={true}
        onValueChange={setStreet}
        isDisabled={disabled}
        placeholder="Enter your street address"
      />

      {/* <Select label="City" placeholder="Select your city" isRequired onValueChange={setCity} isDisabled={disabled}>
        {cityList.map((city) => (
          <SelectItem key={city.id} value={city.name_en}>
            {city.name_en}
          </SelectItem>
        ))}
      </Select> */}

      <Button type="submit" className={styles["submit-btn"]} color="default" isDisabled={disabled}>
        Register
      </Button>
      {/* <p>
        Already have an account? <a href="/">Login</a>
      </p> */}

      <Button onPress={onOpen} className={styles["invisible-btn"]} ref={buttonRef}></Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="opaque">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{msg}</ModalHeader>
            </>
          )}
        </ModalContent>
      </Modal>
    </form>
  );
};
