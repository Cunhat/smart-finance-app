import React from 'react';
import Chart from 'react-apexcharts';

import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import PageContainer from '../../components/PageContainer';
import WidgetContainer from '../../components/WidgetContainer';
import InfoPanel from '../../components/InfoPanel';
import Info from '../../components/InfoPanel/Info';
import Icon from '../../components/InfoPanel/Icon';
import './styles.css';

function Dashboard() {
  const labels = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const options = {
    chart: {
      type: 'area',
      height: '100%',
      zoom: {
        enabled: false
      }
    },
    xaxis: {
      categories: labels
    },
    stroke: {
      curve: 'smooth'
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#262b40', '#36b4cb'],
    markers: {
      colors: ['#262b40', '#36b4cb']
    }
  };

  const series = [
    {
      name: 'Income',
      data: [1636, 1636, 1636, 1636, 1636, 1636, 1636, 1636, 1636, 1636, 1636, 1636],
      type: 'area'
    },
    {
      name: 'Expenses',
      data: [300, 400, 450, 500, 490, 600, 700, 910, 920, 560, 440, 1000],
      type: 'area'
    }
  ];

  return (
    <PageContainer>
      <h1>Dashboard</h1>
      <div className="containerRadios">
        <div className="yearToggle selected">2019</div>
        <div className="yearToggle">2020</div>
        <div className="yearToggle">2021</div>
      </div>
      <WidgetContainer>
        <Chart series={series} options={options} height="350" />
      </WidgetContainer>
      <div className="infoWidgetsContainer">
        <InfoPanel>
          <Info label={'Income'} info={'1700k'} />
          <Icon
            icon={faHandHoldingUsd}
            style={{
              color: '#FFF',
              border: 'solid 1px green',
              backgroundColor: 'green',
              padding: '15px',
              borderRadius: '23px',
              fontSize: '70px'
            }}
          />
        </InfoPanel>
        <InfoPanel>
          <Info label={'Outcome'} info={'200K'} />
          <Icon
            icon={faHandHoldingUsd}
            style={{
              color: '#FFF',
              border: 'solid 1px red',
              backgroundColor: 'red',
              padding: '15px',
              borderRadius: '23px',
              fontSize: '70px'
            }}
          />
        </InfoPanel>
        <InfoPanel>
          <Info label={'Fixed Expenses'} info={'200K'} />
          <Icon
            icon={faHandHoldingUsd}
            style={{
              color: '#FFF',
              border: 'solid 1px yellow',
              backgroundColor: 'yellow',
              padding: '15px',
              borderRadius: '23px',
              fontSize: '70px'
            }}
          />
        </InfoPanel>
        <InfoPanel>
          <Info label={'Passive Income'} info={'200K'} />
          <Icon
            icon={faHandHoldingUsd}
            style={{
              color: '#FFF',
              border: 'solid 1px yellow',
              backgroundColor: 'yellow',
              padding: '15px',
              borderRadius: '23px',
              fontSize: '70px'
            }}
          />
        </InfoPanel>
      </div>
    </PageContainer>
  );
}

export default Dashboard;
