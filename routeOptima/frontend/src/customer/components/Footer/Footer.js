import React from "react";
import "./Footer.css";
import { GiConverseShoe } from "react-icons/gi";

export const Footer = () => {
  return (
    <footer class="footer-distributed">
      <div class="footer-left">
        <GiConverseShoe className="company-logo-footer"/>

        <p class="footer-links">
          <a>Home</a> | 
          <a>About</a> | <a>Contact</a>
        </p>

        <p class="footer-company-name">Company Name © 2023</p>

        <div class="footer-icons">
          <a href="#">
            <i class="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i class="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i class="fa fa-linkedin"></i>
          </a>
          <a href="#">
            <i class="fa fa-github"></i>
          </a>
        </div>
      </div>

      <div class="footer-right">
        <p>Contact Us</p>

        <form action="#" method="post">
          <input type="text" name="email" placeholder="Email" />
          <textarea name="message" placeholder="Message"></textarea>
          <button>Send</button>
        </form>
      </div>
    </footer>
  );
};
