import React from "react";
import PersonalInfoWidget from "../../components/PersonalInfoWidget";
import "./styles.css";
import CreateCategoryWidget from "../../components/CreateCategoryWidget";
import CreateSubCategoryWidget from "../../components/CreateSubCategoryWidget";
import ListCategoriesWidget from "../../components/ListCategoriesWidget";
function Settings() {
   return (
      <div className="mainPagesContainer">
         <span className="pageTitle">Settings</span>
         <PersonalInfoWidget />
         <div className="categoriesWidgetsContainer">
            <div className="categoriesWidgetsContainerGrid">
               <CreateCategoryWidget />
               <CreateSubCategoryWidget />
            </div>
            <div className="categoriesWidgetsContainerGrid">
               <ListCategoriesWidget />
            </div>
         </div>
      </div>
   );
}

export default Settings;
