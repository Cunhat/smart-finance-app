export const labels = [
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

export const months = [
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

export const anualOptionsChart = {
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

export const anualSeriesChart = (data) => [
  {
    name: 'Income',
    data: Array(12).fill(2100),
    type: 'area'
  },
  {
    name: 'Expenses',
    data,
    type: 'area'
  }
];
