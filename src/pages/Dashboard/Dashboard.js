import React, { useState } from 'react';
import Chart from 'react-apexcharts';

// import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'primereact/dropdown';
import PageContainer from '../../components/PageContainer';
import WidgetContainer from '../../components/WidgetContainer';
// import InfoPanel from '../../components/InfoPanel';
// import Info from '../../components/InfoPanel/Info';
// import Icon from '../../components/InfoPanel/Icon';
import './styles.css';

const months = [
  { name: 'January' },
  { name: 'Febuary' },
  { name: 'March' },
  { name: 'April' },
  { name: 'May' },
  { name: 'June' },
  { name: 'July' },
  { name: 'August' },
  { name: 'September' },
  { name: 'October' },
  { name: 'November' },
  { name: 'December' }
];

function Dashboard() {
  const [month, setMonth] = useState(months[new Date().getMonth()]);
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
  /* eslint-disable no-debugger */

  const onChange = (event) => {
    debugger;
    setMonth(event.value);
  };

  const seriesPie = [0, 60, 20, 0, 0, 20];

  const pieOptions = {
    chart: {
      type: 'donut'
    },
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    title: {
      text: 'Pie'
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };
  return (
    <PageContainer>
      <h1>Dashboard</h1>
      <div className="containerRadios">
        <div className="yearToggle">2020</div>
        <div className="yearToggle">2021</div>
        <div className="yearToggle selected">2022</div>
      </div>
      <WidgetContainer>
        <Chart series={series} options={options} height="350" />
      </WidgetContainer>
      <div className="containerDropDown">
        <Dropdown
          value={month}
          options={months}
          onChange={onChange}
          optionLabel="name"
          placeholder="Select a month"
          style={{ width: '300px' }}
        />
      </div>
      <div className="categoriesWidgetsContainer">
        <div className="categoriesWidgetsContainerGrid">
          <WidgetContainer>
            <Chart type={'donut'} series={seriesPie} options={pieOptions} height="350" />
          </WidgetContainer>
        </div>
        <div className="categoriesWidgetsContainerGrid">
          <WidgetContainer>
            <Chart type={'donut'} series={seriesPie} options={pieOptions} height="350" />
          </WidgetContainer>
        </div>
      </div>
    </PageContainer>
  );
}

export default Dashboard;
