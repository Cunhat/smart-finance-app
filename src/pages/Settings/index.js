import React from "react";
import PersonalInfoWidget from "../../components/PersonalInfoWidget";
import "./styles.css";
import CreateCategoryWidget from "../../components/CreateCategoryWidget";
import CreateSubCategoryWidget from "../../components/CreateSubCategoryWidget";

function Settings() {
   return (
      <div className="mainPagesContainer">
         <span className="pageTitle">Settings</span>
         <PersonalInfoWidget />
         <CreateCategoryWidget />
         <CreateSubCategoryWidget />
      </div>
   );
}

export default Settings;
