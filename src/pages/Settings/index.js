import React from 'react';
import PersonalInfoWidget from "../../components/PersonalInfoWidget"
import "./styles.css";
import CreateCategoryWidget from "../../components/CreateCategoryWidget"

function Settings() {
  return (
    <div className='mainPagesContainer'>
      <span className="pageTitle">Settings</span>
      <PersonalInfoWidget />
      <CreateCategoryWidget />
    </div>
  );
}

export default Settings;
