import React from 'react';
import Chart from 'react-apexcharts';

import PageContainer from '../../components/PageContainer';
import WidgetContainer from '../../components/WidgetContainer';
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
    </PageContainer>
  );
}

export default Dashboard;
