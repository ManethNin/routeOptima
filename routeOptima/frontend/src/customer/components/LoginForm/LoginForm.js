import React from "react";
import styles from "./LoginForm.module.css";

import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { MdMail } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";

export const LoginForm = () => {
  // Password toggle
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Form Details
  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/user/login", {
        email: email,
        password: pwd,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Success");
          setMsg("SuccessFully Logged In");
          buttonRef.current.click();

          localStorage.setItem("AUTHKEY", res.data.token)
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("role", res.data.role)

          setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else {
          console.log("UnAuthorized");
          setMsg("Invalid Password");
          buttonRef.current.click();
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log("UnAuthorized");
          setMsg("Invalid Password");
          buttonRef.current.click();
      });
  };

  // Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const buttonRef = React.useRef(null);
  const [msg, setMsg] = React.useState("");

  return (
    <form className={styles["container"]} onSubmit={(e) => handleLogin(e)}>
      {/* <h2>Login</h2> */}
      <Input
        type="email"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        isRequired={true}
        endContent={
          <MdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        placeholder="Enter your email"
      />

      <Input
        label="Password"
        placeholder="Enter your password"
        onChange={(e) => setPwd(e.target.value)}
        isRequired={true}
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
        type={isVisible ? "text" : "password"}
      />

      <Button className={styles["submit-btn"]} color="default" type="submit">
        Login
      </Button>
      {/* <p>
        Don't have an account ? <a href="/">Register</a>
      </p> */}

      <Button
        onPress={onOpen}
        className={styles["invisible-btn"]}
        ref={buttonRef}
      ></Button>

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
