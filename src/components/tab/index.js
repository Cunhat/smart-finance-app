import React, { useState } from 'react';
import './styles.css';
import { faBars, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Tabs({ name }) {
  const [selectedValue, setSelectedValue] = useState(0);

  function changeTabHandler(value) {
    setSelectedValue(value);
  }

  return (
    <div className="mainContainerTabs">
      <div className="tabsTitleContainer">
        <div
          className={selectedValue === 0 ? 'tabSelectedItem' : 'tabItem'}
          onClick={() => changeTabHandler(0)}
        >
          <FontAwesomeIcon icon={faUpload} className="iconTabs" />
          <span className="labelTabs">Upload file</span>
        </div>
        <div
          className={selectedValue === 1 ? 'tabSelectedItem' : 'tabItem'}
          onClick={() => changeTabHandler(1)}
        >
          <FontAwesomeIcon icon={faPlus} className="iconTabs" />
          <span className="labelTabs">Manual creation</span>
        </div>
      </div>
      {selectedValue === 0 && <div> heuehueheuheuheuue</div>}
      {selectedValue === 1 && <div> hahahahaha</div>}
    </div>
  );
}

export default Tabs;
