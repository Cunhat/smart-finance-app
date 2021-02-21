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

function Sidebar({hideSideBar}) {
   
   return (
      <>
         <div className={hideSideBar ? "sideBarContainer" : "sideBarContainer hide"}>
            <div className={hideSideBar ? "sideBarItemsContainer" : "sideBarItemsContainer hide"}>
               <SideBarIdem title={"Dashboard"} path={"/dashboard"} showSideBar={hideSideBar} icon={faChartPie}></SideBarIdem>
               <SideBarIdem
                  title={"Transactions"}
                  path={"/transactions"}
                  showSideBar={hideSideBar}
                  icon={faHandHoldingUsd}
               ></SideBarIdem>
               <SideBarIdem title={"Settings"} path={"/settings"} showSideBar={hideSideBar} icon={faCog}></SideBarIdem>
            </div>
         </div>
      </>
   );
}

export default Sidebar;
