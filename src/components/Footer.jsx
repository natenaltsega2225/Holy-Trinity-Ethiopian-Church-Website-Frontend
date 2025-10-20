import React from 'react';
import { Facebook, Youtube, Instagram, MessageCircle } from "lucide-react";
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <p className="footer-title">Address:</p>
            <p className="footer-text">2558 Courchville Pike,</p>
            <p className="footer-text">Nashville, TN 37217</p>
          </div>
          <div className="social-media">
            <a
              href="#"
              className="social-icon facebook"
              aria-label="Facebook"
            >
              <Facebook className="icon" />
            </a>
            <a
              href="#"
              className="social-icon youtube"
              aria-label="YouTube"
            >
              <Youtube className="icon" />
            </a>
            <a
              href="#"
              className="social-icon instagram"
              aria-label="Instagram"
            >
              <Instagram className="icon" />
            </a>
            <a
              href="#"
              className="social-icon contact"
              aria-label="Contact"
            >
              <MessageCircle className="icon" />
            </a>
          </div>
          <div className="footer-section">
            <p className="footer-title">Phone:</p>
            <p className="footer-text">(615) 554-0638</p>
            <p className="footer-email">holytrinitycotn@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;