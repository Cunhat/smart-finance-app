import React, { useState } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import Sidebar from '../sideBar';
import TopBar from '../topBar';

function PageContainer({ children, ...restProps }) {
  const [hideSideBar, setHideSidebar] = useState(true);

  function hideBarHandler() {
    setHideSidebar(!hideSideBar);
  }
  return (
    <div className="pageContainer" {...restProps}>
      <Sidebar hideSideBar={hideSideBar}></Sidebar>
      <main className="mainContainer">
        <TopBar showHideSideBar={hideBarHandler} />
        {children}
      </main>
    </div>
  );
}

PageContainer.propTypes = {
  children: PropTypes.any,
  restProps: PropTypes.any
};

export default PageContainer;
