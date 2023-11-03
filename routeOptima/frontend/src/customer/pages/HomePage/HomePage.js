import React from "react";
import "./HomePage.css";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { Navigation } from "../../components/Navigation/Navigation";
import { Carousel } from "../../components/Carousel/Carousel";

export const HomePage = () => {
  const slides = [
    {
      src: "https://images.pexels.com/photos/5325582/pexels-photo-5325582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "pic 2"
    },
    {
      src: "https://images.pexels.com/photos/5325589/pexels-photo-5325589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "pic 2"
    },
  ];
  return (
    <>
      <Navigation />
        <Carousel data={slides}/>
    </>
  );
};
