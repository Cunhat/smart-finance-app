import React from 'react';
import './styles.css';
import { faChartPie, faCog, faHandHoldingUsd, faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const SideBarIdem = ({ title, showSideBar, icon, path }) => (
  <NavLink
    to={path}
    className={showSideBar ? 'sideBarItem' : 'sideBarItem hide'}
    activeClassName="selectedItem">
    <FontAwesomeIcon
      className={showSideBar ? 'sideBarItemIcon' : 'sideBarItemIcon hide'}
      icon={icon}
    />
    <span className={showSideBar ? 'sideBarItemLabel' : 'sideBarItemLabel hide'}>{title}</span>
  </NavLink>
);

SideBarIdem.propTypes = {
  title: PropTypes.string,
  showSideBar: PropTypes.bool,
  icon: PropTypes.string,
  path: PropTypes.string
};

function Sidebar({ hideSideBar }) {
  return (
    <>
      <div className={hideSideBar ? 'sideBarContainer' : 'sideBarContainer hide'}>
        <div className={hideSideBar ? 'sideBarItemsContainer' : 'sideBarItemsContainer hide'}>
          <SideBarIdem
            title={'Dashboard'}
            path={'/dashboard'}
            showSideBar={hideSideBar}
            icon={faChartPie}></SideBarIdem>
          <SideBarIdem
            title={'Transactions History'}
            path={'/transactionsHistory'}
            showSideBar={hideSideBar}
            icon={faHistory}></SideBarIdem>
          <SideBarIdem
            title={'New Transactions'}
            path={'/transactions'}
            showSideBar={hideSideBar}
            icon={faHandHoldingUsd}></SideBarIdem>
          <SideBarIdem
            title={'Settings'}
            path={'/settings'}
            showSideBar={hideSideBar}
            icon={faCog}></SideBarIdem>
        </div>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  hideSideBar: PropTypes.bool
};

export default Sidebar;
