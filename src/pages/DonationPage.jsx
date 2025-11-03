import React, { useState } from "react";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";
import "../styles/donation.css";

// images used for payment methods
import ZelleLogo from "../assets/images/Zelle_logo.png";
import CashAppLogo from "../assets/images/Cashapp_icon.png";
import VenmoLogo from "../assets/images/Venmo_logo.png";

export default function DonationPage() {
  const [cardType, setCardType] = useState("");

  const paymentMethods = [
    { 
      name: "PayPal", 
      icon: <FaPaypal size={48} color="#003087" />,
      info: "paypal@yourchurch.org" 
    },
    { 
      name: "Zelle", 
      icon: <img src={ZelleLogo} alt="Zelle" className="payment-icon" />,
      info: "zelle@yourchurch.org" 
    },
    { 
      name: "Cash App", 
      icon: <img src={CashAppLogo} alt="Cash App" className="payment-icon" />,
      info: "$YourChurchCashApp" 
    },
    { 
      name: "Venmo", 
      icon: <img src={VenmoLogo} alt="Venmo" className="payment-icon" />,
      info: "@YourChurchVenmo" 
    },
  ];

  const detectCardType = (number) => {
    const firstDigit = number[0];
    const firstTwoDigits = number.slice(0, 2);
    if (firstDigit === "4") return "visa";
    if (["51","52","53","54","55"].includes(firstTwoDigits)) return "mastercard";
    return "";
  };

  const handleCardChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setCardType(detectCardType(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment submitted! Thank you for your donation.");
  };

  return (
    <section className="donation-wrap">
      <div className="donation-container">

        {/* Verse */}
        <div className="donation-verse">
          <br />
          <blockquote>
            "Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver." 
            <footer>— 2 Corinthians 9:7</footer>
          </blockquote>
        </div>

        {/* Payment Form */}
        <div className="donation-form-wrap">
          <h2 className="donation-form-title">Make a Donation</h2>
          <form className="donation-form" onSubmit={handleSubmit}>
            <label>
              Name on Card
              <input type="text" placeholder="Full Name" required />
            </label>

            <label className="card-number-label">
              Card Number
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                required
                onChange={handleCardChange}
              />
              <span className="card-icon">
                {cardType === "visa" && <FaCcVisa size={36} color="#1a1f71" />}
                {cardType === "mastercard" && <FaCcMastercard size={36} color="#eb001b" />}
              </span>
            </label>

            <div className="donation-form-row">
              <label>
                Expiration
                <input type="text" placeholder="MM/YY" required />
              </label>
              <label>
                CVV
                <input type="text" placeholder="123" required />
              </label>
            </div>

            <label>
              Amount
              <input type="number" placeholder="50" min="1" required />
            </label>

            <button type="submit" className="donation-btn">Donate</button>
          </form>
        </div>

        {/* Other Payment Methods */}
        <div className="donation-methods">
          <h3>Other Payment Methods</h3>
          <div className="donation-methods-grid">
            {paymentMethods.map((method, index) => (
              <div key={index} className="donation-method">
                <div className="donation-method-icon">{method.icon}</div>
                <p className="method-name">{method.name}</p>
                <p className="method-info">{method.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
