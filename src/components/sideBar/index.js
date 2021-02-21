import React, { useState } from "react";
import "./styles.css";
import { faBars, faChartPie, faCog, faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const SideBarIdem = ({ title, showSideBar, icon, path }) => {
   return (
      <NavLink to={path} className={showSideBar ? "sideBarItem" : "sideBarItem hide"} activeClassName="selectedItem">
         
            <FontAwesomeIcon className={showSideBar ? "sideBarItemIcon" : "sideBarItemIcon hide"} icon={icon} />
            <span className={showSideBar ? "sideBarItemLabel" : "sideBarItemLabel hide"}>{title}</span>
         
      </NavLink>
   );
};

function Sidebar() {
   const [showSideBar, setShowSideBar] = useState(true);

   function showHideSideBar() {
      setShowSideBar(!showSideBar);
   }

   return (
      <>
         <div>
            <FontAwesomeIcon className="icon" icon={faBars} onClick={showHideSideBar} />
         </div>
         <div className={showSideBar ? "sideBarContainer" : "sideBarContainer hide"}>
            <div className={showSideBar ? "sideBarItemsContainer" : "sideBarItemsContainer hide"}>
               <SideBarIdem title={"Dashboard"} path={"/dashboard"} showSideBar={showSideBar} icon={faChartPie}></SideBarIdem>
               <SideBarIdem
                  title={"Transactions"}
                  path={"/transactions"}
                  showSideBar={showSideBar}
                  icon={faHandHoldingUsd}
               ></SideBarIdem>
               <SideBarIdem title={"Settings"} path={"/settings"} showSideBar={showSideBar} icon={faCog}></SideBarIdem>
            </div>
         </div>
      </>
   );
}

export default Sidebar;
