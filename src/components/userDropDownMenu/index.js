import "./styles.css";
import React, { useState } from 'react';
import profile from '../../assets/images/profile.jpg'

function UserDropDownMenu() {
    const [openMenu, setOpenMenu] = useState(false);
  
  return (
    <div className="mainContainerUserDropMenu">
        <img src={profile} alt={"profilePic"} className="imageContainer"></img>
        <span>User Name</span>
        {openMenu && <div></div>}
    </div>
  );
}

export default UserDropDownMenu;