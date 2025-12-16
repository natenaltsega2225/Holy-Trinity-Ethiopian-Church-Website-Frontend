import React, { useState } from "react";
import "../styles/formsPage.css";

export default function FormsPage() {
  const [formType, setFormType] = useState("");

  return (
    <div className="forms-page">
      <div className="forms-page-wrapper">
        <h1 className="forms-page-title">Church Forms & Requests</h1>

        <div className="form-selector">
          <label>What form do you want to fill out?</label>
          <select value={formType} onChange={(e) => setFormType(e.target.value)}>
            <option value="">-- Select a form --</option>
            <option value="kids">Kids Program Registration</option>
            <option value="youth">Youth Trip / Outing</option>
            <option value="volunteer">Volunteer Sign-Up</option>
            <option value="baptism">Baptism / Christening</option>
            <option value="membership">Membership Registration</option>
            <option value="prayer">Prayer Request</option>
            <option value="sacrament">Sacrament / Spiritual Needs</option>
            <option value="facility">Facility Use Request</option>
            <option value="teacher">Sunday School Teacher / Assistant</option>
            <option value="choir">Choir Registration</option>
            <option value="lost">Lost & Found</option>
            <option value="incident">Incident Report</option>
          </select>
        </div>

        {formType === "kids" && <KidsProgramForm />}
        {formType === "youth" && <YouthTripForm />}
        {formType === "volunteer" && <VolunteerForm />}
        {formType === "baptism" && <BaptismForm />}
        {formType === "membership" && <MembershipForm />}
        {formType === "prayer" && <PrayerForm />}
        {formType === "sacrament" && <SacramentForm />}
        {formType === "facility" && <FacilityForm />}
        {formType === "teacher" && <TeacherAssistantForm />}
        {formType === "choir" && <ChoirForm />}
        {formType === "lost" && <LostFoundForm />}
        {formType === "incident" && <IncidentForm />}
      </div>
    </div>
  );
}

/* ============================
   1. Kids Program Registration
============================= */

function KidsProgramForm() {
  return (
    <>
      <h2>Kids Program Registration</h2>
      <form className="church-form">
        <input placeholder="Child Full Name" required />
        <input type="date" required />
        <input placeholder="Parent / Guardian Name(s)" required />
        <input placeholder="Parent Phone" required />
        <input placeholder="Parent Email" required />
        <input placeholder="Home Address" required />
        <input placeholder="Emergency Contact Name" required />
        <input placeholder="Emergency Contact Phone" required />
        <textarea placeholder="Allergies / Medical Conditions" />
        <label className="checkbox-line">
          <input type="checkbox" required /> Permission to participate
        </label>
        <label className="checkbox-line">
          <input type="checkbox" /> Photography / Video Release
        </label>
        <select>
          <option>Payment Method</option>
          <option>Online</option>
          <option>Cash</option>
          <option>Check</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

/* ============================
   2. Youth Trip / Outing
============================= */

function YouthTripForm() {
  return (
    <>
      <h2>Youth Trip / Outing Registration</h2>
      <form className="church-form">
        <input placeholder="Participant Name" required />
        <input placeholder="Age / Grade" required />
        <input placeholder="Parent / Guardian Contact" required />
        <input placeholder="Emergency Contact" required />
        <input placeholder="Health Insurance Info" />
        <textarea placeholder="Allergies / Medications / Medical Conditions" />
        <label className="checkbox-line">
          <input type="checkbox" required /> Permission to travel
        </label>
        <label className="checkbox-line">
          <input type="checkbox" required /> Liability waiver
        </label>
        <select>
          <option>Transportation Preference</option>
          <option>Bus</option>
          <option>Carpool</option>
        </select>
        <textarea placeholder="Emergency Instructions" />
        <input type="number" placeholder="Payment Amount" />
        <select>
          <option>T-Shirt Size</option>
          <option>XS</option><option>S</option><option>M</option>
          <option>L</option><option>XL</option>
        </select>
        <button>Submit</button>
      </form>
    </>
  );
}

/* ============================
   3. Volunteer Sign-Up
============================= */

function VolunteerForm() {
  return (
    <>
      <h2>Volunteer Sign-Up</h2>
      <form className="church-form">
        <input placeholder="Full Name" required />
        <input placeholder="Phone" required />
        <input placeholder="Email" required />
        <input type="number" placeholder="Age" />
        <select>
          <option>Ministry Preference</option>
          <option>Kitchen</option>
          <option>Youth</option>
          <option>Choir</option>
          <option>Media</option>
          <option>Events</option>
        </select>
        <input placeholder="Availability" />
        <textarea placeholder="Skills / Experience" />
        <label className="checkbox-line">
          <input type="checkbox" /> Background check consent
        </label>
        <input placeholder="Emergency Contact" />
        <button>Submit</button>
      </form>
    </>
  );
}

/* ============================
   4. Baptism / Christening
============================= */

function BaptismForm() {
  return (
    <>
      <h2>Baptism / Christening Request</h2>
      <form className="church-form">
        <input placeholder="Child Name" required />
        <input type="date" required />
        <input placeholder="Parents’ Names" required />
        <input placeholder="Godparents’ Names" required />
        <input type="date" placeholder="Requested Baptism Date" />
        <input placeholder="Church Membership Status" />
        <input placeholder="Contact Information" required />
        <textarea placeholder="Special Instructions" />
        <label className="checkbox-line">
          <input type="checkbox" /> Consent for photos
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

/* ============================
   5. Membership Registration
============================= */

function MembershipForm() {
  return (
    <>
      <h2>Membership Registration</h2>
      <form className="church-form">
        <input placeholder="Full Name" required />
        <input placeholder="Phone" required />
        <input placeholder="Email" required />
        <input placeholder="Address" required />
        <textarea placeholder="Family Members" />
        <select>
          <option>Are you baptized / chrismated?</option>
          <option>Yes</option>
          <option>No</option>
        </select>
        <textarea placeholder="Spiritual guidance or confession request?" />
        <textarea placeholder="Ministry Interests" />
        <textarea placeholder="Prayer Requests" />
        <input placeholder="How did you hear about the church?" />
        <button>Submit</button>
      </form>
    </>
  );
}

/* ============================
   6. Prayer Request
============================= */

function PrayerForm() {
  return (
    <>
      <h2>Prayer Request</h2>
      <form className="church-form">
        <input placeholder="Name (optional)" />
        <textarea placeholder="Prayer Request" required />
        <select>
          <option>Would you like a priest or servant to reach out?</option>
          <option>Yes</option>
          <option>No</option>
        </select>
        <input placeholder="Contact Info (if requested)" />
        <button>Submit</button>
      </form>
    </>
  );
}

/* ============================
   7. Sacrament / Spiritual Needs
============================= */

function SacramentForm() {
  return (
    <>
      <h2>Sacrament / Spiritual Needs</h2>
      <form className="church-form">
        <input placeholder="Full Name" required />
        <input placeholder="Preferred Method of Contact" required />
        <select required>
          <option value="">Type of Request</option>
          <option>House Visit</option>
          <option>Confession</option>
          <option>Prayer Request</option>
          <option>Anointing of the Sick</option>
        </select>
        <input type="datetime-local" />
        <input placeholder="Address (if home visit)" />
        <textarea placeholder="Additional Notes" />
        <button>Submit</button>
      </form>
    </>
  );
}

/* ============================
   8. Facility Use Request
============================= */

function FacilityForm() {
  return (
    <>
      <h2>Facility Use Request</h2>
      <form className="church-form">
        <input placeholder="Name" required />
        <input placeholder="Phone / Email" required />
        <input placeholder="Type of Event" required />
        <input type="datetime-local" required />
        <input type="number" placeholder="Number of People" />
        <textarea placeholder="Audio / Visual Needs" />
        <label className="checkbox-line">
          <input type="checkbox" required /> Clean-up responsibility agreement
        </label>
        <input placeholder="Ministry Approval" />
        <button>Submit</button>
      </form>
    </>
  );
}

/* ============================
   9. Teacher / Assistant
============================= */

function TeacherAssistantForm() {
  return (
    <>
      <h2>Sunday School Teacher / Parent Assistant</h2>
      <form className="church-form">
        <input placeholder="Full Name" required />
        <input placeholder="Phone & Email" required />
        <input placeholder="Address" />
        <select>
          <option>Are you a church member?</option>
          <option>Yes</option>
          <option>No</option>
        </select>
        <select>
          <option>Age Group</option>
          <option>Elementary</option>
          <option>Middle School</option>
          <option>High School</option>
        </select>
        <textarea placeholder="Previous Experience" />
        <textarea placeholder="Why do you want to serve?" />
        <input placeholder="Availability" />
        <input placeholder="Emergency Contact" />
        <label className="checkbox-line">
          <input type="checkbox" required /> Agreement to safety policies
        </label>
        <input placeholder="Signature" />
        <button>Submit</button>
      </form>
    </>
  );
}

/* ============================
   10. Choir Registration
============================= */

function ChoirForm() {
  return (
    <>
      <h2>Choir Registration</h2>
      <form className="church-form">
        <input placeholder="Full Name" required />
        <input placeholder="Phone & Email" required />
        <input placeholder="Age / Grade (if youth)" />
        <select>
          <option>Which choir?</option>
          <option>Kids</option>
          <option>Youth</option>
          <option>Adult</option>
        </select>
        <input placeholder="Availability" />
        <input placeholder="Parent Contact (if minor)" />
        <select>
          <option>T-Shirt Size</option>
          <option>XS</option><option>S</option><option>M</option>
          <option>L</option><option>XL</option>
        </select>
        <input placeholder="Emergency Contact" />
        <label className="checkbox-line">
          <input type="checkbox" /> Photo / recording consent
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

/* ============================
   11. Lost & Found
============================= */

function LostFoundForm() {
  return (
    <>
      <h2>Lost & Found</h2>
      <form className="church-form">
        <input placeholder="Your Name" />
        <input placeholder="Phone & Email" />
        <input placeholder="Item Description" required />
        <select>
          <option>Lost or Found?</option>
          <option>Lost</option>
          <option>Found</option>
        </select>
        <input type="date" />
        <input placeholder="Location in Church" />
        <textarea placeholder="Additional Description" />
        <input placeholder="Pickup Location (if found)" />
        <input type="file" />
        <textarea placeholder="Staff Notes (internal)" />
        <button>Submit</button>
      </form>
    </>
  );
}

/* ============================
   12. Incident Report
============================= */

function IncidentForm() {
  return (
    <>
      <h2>Incident Report</h2>
      <form className="church-form">
        <input placeholder="Person Involved" required />
        <input placeholder="Contact Information" required />
        <input type="datetime-local" required />
        <input placeholder="Location of Incident" required />
        <select>
          <option>Incident Type</option>
          <option>Injury</option>
          <option>Illness</option>
          <option>Property Damage</option>
          <option>Behavioral Issue</option>
          <option>Safety Concern</option>
        </select>
        <textarea placeholder="Detailed Description" required />
        <textarea placeholder="Witnesses" />
        <input placeholder="First Aid Provided?" />
        <select>
          <option>Was 911 / EMS contacted?</option>
          <option>Yes</option>
          <option>No</option>
        </select>
        <select>
          <option>Parent / Guardian notified?</option>
          <option>Yes</option>
          <option>No</option>
        </select>
        <input type="file" />
        <input placeholder="Ministry Leader Name" />
        <input placeholder="Signature" />
        <textarea placeholder="Follow-up Action Needed" />
        <button>Submit</button>
      </form>
    </>
  );
}
