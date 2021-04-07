import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import UserDropDownMenu from '../userDropDownMenu'

function TopBar({ showHideSideBar }) {
   const [count, setCount] = useState(0);

   return (
      <div className="topBarContainer">
         <div className="grid-1">
            <FontAwesomeIcon className="iconTopBar" icon={faBars} onClick={() => showHideSideBar()} />
         </div>
         <div className="grid-2">
            <FontAwesomeIcon className="notificationIcon" icon={faBell} />
            <UserDropDownMenu/>
         </div>
      </div>
   );
}

export default TopBar;
