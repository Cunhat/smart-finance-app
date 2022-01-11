import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

import { Dropdown } from 'primereact/dropdown';
import PageContainer from '../../components/PageContainer';
import WidgetContainer from '../../components/WidgetContainer';

import useTransactions from '../../hooks/useTransactions';
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */

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

const dat = {
  january: {
    transactions: [],
    total: '',
    pieCategories: [
      {
        categoryName: '',
        percentage: '',
        total: ''
      }
    ],
    pieSubCategories: [
      {
        categoryName: '',
        percentage: '',
        total: ''
      }
    ]
  }
};

const example = {
  january: {
    categoriesExpensesLabels: [],
    categoriesExpensesValues: []
  }
};

function Dashboard() {
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const { data, error, status } = useTransactions();
  const [transactionData, setTransactionData] = useState({});
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [categoriesExpensesPieChartData, setCategoriesExpensesPieChartData] = useState({});
  // const [categoriesExpensesValues, setCategoriesExpensesValues] = useState([]);

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
      data: Array(12).fill(2100),
      type: 'area'
    },
    {
      name: 'Expenses',
      data: monthlyExpenses,
      type: 'area'
    }
  ];

  useEffect(() => {
    const createPieCategories = (pieData) => {
      const arrayOfCategoriesDataValues = [];
      const arrayOfCategoriesDataLabels = [];

      pieData?.pieCategories?.forEach((category) => {
        if (category !== undefined) {
          arrayOfCategoriesDataValues.push(category.percentage);
          arrayOfCategoriesDataLabels.push(category.categoryName);
        }
      });
      return { arrayOfCategoriesDataValues, arrayOfCategoriesDataLabels };
    };

    if (Object.keys(transactionData).length !== 0) {
      const arrayOfMonthlyExpenses = [];
      let objectCategoriesPie = {};

      labels.forEach((label) => {
        arrayOfMonthlyExpenses.push(
          transactionData[label] !== undefined
            ? transactionData[label].totalAmountSpent.toFixed(2)
            : 0
        );

        const { arrayOfCategoriesDataValues, arrayOfCategoriesDataLabels } = createPieCategories(
          transactionData[label]
        );
        objectCategoriesPie = {
          ...objectCategoriesPie,
          [label]: {
            categoriesExpensesLabels: arrayOfCategoriesDataLabels,
            categoriesExpensesValues: arrayOfCategoriesDataValues
          }
        };
      });
      setCategoriesExpensesPieChartData(objectCategoriesPie);
      console.log(objectCategoriesPie);
      setMonthlyExpenses(arrayOfMonthlyExpenses);
    }
  }, [transactionData]);

  const insertCategory = (transaction, pieCategories) => {
    const pieAux = pieCategories;
    const updatedCateg = pieAux.findIndex(
      (elem) => elem.categoryName === transaction.category.name
    );
    if (updatedCateg !== -1) {
      pieAux[updatedCateg].total += transaction.value;
      return pieAux;
    }

    pieAux.push({
      categoryName: transaction.category.name,
      percentage: 0,
      total: transaction.value
    });
    return pieAux;
  };

  const insertSubCategory = (transaction, pieSubCategories) => {
    const pieAux = pieSubCategories;
    const updatedSubCateg = pieAux.findIndex(
      (elem) => elem.subCategoryName === transaction.subCategory.name
    );
    if (updatedSubCateg !== -1) {
      pieAux[updatedSubCateg].total += transaction.value;
      return pieAux;
    }

    pieAux.push({
      subCategoryName: transaction.subCategory.name,
      percentage: 0,
      total: transaction.value
    });
    return pieAux;
  };

  const createDataObjt = (transactionDataObj) => {
    let finalObjt = {};
    transactionDataObj.transaction.forEach((transaction) => {
      const teste = new Date(parseInt(transaction.date, 10)).getMonth();

      if (finalObjt[months[teste].name] === undefined) {
        const transactionArr = [];
        transactionArr.push(transaction);
        finalObjt = {
          ...finalObjt,
          [months[teste].name]: {
            transactions: transactionArr,
            totalAmountSpent: transaction.value,
            pieCategories: [
              {
                categoryName: transaction.category.name,
                percentage: 0,
                total: transaction.value
              }
            ],
            pieSubCategories: [
              {
                SubCategoryName: transaction.subCategory.name,
                percentage: 0,
                total: transaction.value
              }
            ]
          }
        };
      } else {
        const updatedArray = finalObjt[months[teste].name].transactions;
        updatedArray.push(transaction);
        finalObjt[months[teste].name].transactions = updatedArray;
        finalObjt[months[teste].name].totalAmountSpent += transaction.value;
        finalObjt[months[teste].name].pieCategories = insertCategory(
          transaction,
          finalObjt[months[teste].name].pieCategories
        );
        finalObjt[months[teste].name].pieSubCategories = insertSubCategory(
          transaction,
          finalObjt[months[teste].name].pieSubCategories
        );
      }
    });

    months.forEach((selectedMonth) => {
      let totalAmountSpent = 0;
      const selectedMonthElem = finalObjt[selectedMonth.name];
      if (selectedMonthElem?.transactions) {
        selectedMonthElem.transactions?.forEach((transaction) => {
          totalAmountSpent += transaction.value;
        });
        selectedMonthElem.totalAmountSpent = totalAmountSpent;
        selectedMonthElem.pieCategories.forEach((pieCatg) => {
          const pieCategorie = pieCatg;
          pieCategorie.percentage = (pieCategorie.total / totalAmountSpent) * 100;
        });
        selectedMonthElem.pieSubCategories.forEach((pieSubCatg) => {
          const pieSubCategorie = pieSubCatg;
          pieSubCategorie.percentage = (pieSubCategorie.total / totalAmountSpent) * 100;
        });
      }
    });
    setTransactionData(finalObjt);
  };

  useEffect(() => {
    if (status === 'success') {
      createDataObjt(data);
    }
  }, [status, data]);

  /* eslint-disable no-debugger */

  const onChange = (event) => {
    setMonth(event.value);
  };
  const seriesPie =
    Object.keys(categoriesExpensesPieChartData).length === 0
      ? []
      : categoriesExpensesPieChartData[month.name].categoriesExpensesValues; // categoriesExpensesValues;

  const pieOptions = {
    chart: {
      type: 'donut'
    },
    labels:
      Object.keys(categoriesExpensesPieChartData).length === 0
        ? []
        : categoriesExpensesPieChartData[month.name]?.categoriesExpensesLabels, // categoriesExpensesLabels,
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

  useEffect(() => {
    console.log(seriesPie);
  }, [month]);

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
          {Object.keys(categoriesExpensesPieChartData).length !== 0 && (
            <WidgetContainer>
              <Chart type={'donut'} series={seriesPie} options={pieOptions} height="350" />
            </WidgetContainer>
          )}
        </div>
        {/* <div className="categoriesWidgetsContainerGrid">
          <WidgetContainer>
            <Chart type={'donut'} series={seriesPie} options={pieOptions} height="350" />
          </WidgetContainer>
        </div> */}
      </div>
    </PageContainer>
  );
}

export default Dashboard;
