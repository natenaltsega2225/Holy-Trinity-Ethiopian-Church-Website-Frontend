import React, { useState } from "react";
import "../styles/monthlyPayment.css"; // reuse the donation CSS for styling

export default function MonthlyPaymentPage() {
  const [frequency, setFrequency] = useState("monthly");
  const [defaultPayment, setDefaultPayment] = useState(false);
  const [autopay, setAutopay] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment scheduled: ${frequency} payment. Autopay: ${autopay ? "Yes" : "No"}`);
  };

  return (
    <section className="donation-wrap">
      <div className="donation-container">

        {/* Title */}
        <div className="donation-form-wrap">
          <h2 className="donation-form-title">Set Up Monthly Payment</h2>
          <form className="donation-form" onSubmit={handleSubmit}>

            {/* Account Info */}
            <label>
              Account Holder Name
              <input type="text" placeholder="Full Name" required />
            </label>

            <label>
              Bank Routing Number
              <input type="text" placeholder="123456789" required />
            </label>

            <label>
              Bank Account Number
              <input type="text" placeholder="000123456789" required />
            </label>

            <label>
              Amount
              <input type="number" placeholder="50" min="1" required />
            </label>

            {/* Payment Frequency */}
           <div className="monthly-form-field">
  <label>Payment Frequency</label>
  <div className="custom-select">
    <select required>
      <option value="">Select Frequency</option>
      <option value="monthly">Monthly</option>
      <option value="quarterly">Every 3 Months</option>
    </select>
    <span className="select-arrow">&#9662;</span>
  </div>
</div>


            {/* Options */}
            <div className="auth-terms">
              <label className="terms-check">
                <input 
                  type="checkbox" 
                  checked={autopay} 
                  onChange={() => setAutopay(!autopay)} 
                />
                Enable Autopay
              </label>

              <label className="terms-check">
                <input 
                  type="checkbox" 
                  checked={defaultPayment} 
                  onChange={() => setDefaultPayment(!defaultPayment)} 
                />
                Save this payment method on file
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="donation-btn">Set Up Payment</button>
          </form>
        </div>
      </div>
    </section>
  );
}
