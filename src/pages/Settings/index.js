import React from 'react';
import PersonalInfoWidget from "../../components/PersonalInfoWidget"
import "./styles.css";

function Settings() {
  return (
    <div className='mainPagesContainer'>
      <span className="pageTitle">Settings</span>
      <PersonalInfoWidget />
    </div>
  );
}

export default Settings;
