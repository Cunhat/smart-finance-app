import React from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import UserDropDownMenu from '../userDropDownMenu';

function TopBar({ showHideSideBar }) {
  return (
    <div className="topBarContainer">
      <div className="grid-1">
        <FontAwesomeIcon className="iconTopBar" icon={faBars} onClick={() => showHideSideBar()} />
      </div>
      <div className="grid-2">
        <FontAwesomeIcon className="notificationIcon" icon={faBell} />
        <UserDropDownMenu />
      </div>
    </div>
  );
}

TopBar.propTypes = {
  showHideSideBar: PropTypes.string.isRequired
};

export default TopBar;
