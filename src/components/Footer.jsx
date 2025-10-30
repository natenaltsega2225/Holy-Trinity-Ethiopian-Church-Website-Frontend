import React from "react";
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram, MessageCircle } from "lucide-react";
import "../styles/footer.css"; // updated import

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Info Cards */}
        <div className="footer-cards">
          <div className="footer-card">
            <div className="icon-wrapper">
              <MapPin />
            </div>
            <h4>Address</h4>
            <p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Debre+Birhan+Holy+Trinity+Ethiopian+Orthodox+Church+Nashville+TN"
                target="_blank"
                rel="noopener noreferrer"
              >
                2558 Couchville Pike<br />
                Nashville, TN 37217
              </a>
            </p>
          </div>

          <div className="footer-card">
            <div className="icon-wrapper">
              <Phone />
            </div>
            <h4>Phone</h4>
            <p>
              <a href="tel:+16155540638">(615) 554-0638</a>
            </p>
          </div>

          <div className="footer-card email-card">
            <div className="icon-wrapper">
              <Mail />
            </div>
            <h4>Email</h4>
            <p>
              <a href="mailto:holytrinityeotctn@gmail.com">
                holytrinityeotctn@gmail.com
              </a>
            </p>
          </div>


        </div>

        {/* Social Icons */}
        <div className="footer-social">
          <a href="#" aria-label="Facebook">
            <Facebook />
          </a>
          <a href="#" aria-label="YouTube">
            <Youtube />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram />
          </a>
          <a href="#" aria-label="WhatsApp">
            <MessageCircle />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          © 2024 Holy Trinity Ethiopian Orthodox Tewahedo Church. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
