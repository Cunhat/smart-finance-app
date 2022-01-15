import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

import { Dropdown } from 'primereact/dropdown';
import PageContainer from '../../components/PageContainer';
import WidgetContainer from '../../components/WidgetContainer';

import useTransactions from '../../hooks/useTransactions';
import { labels, months, anualOptionsChart, anualSeriesChart } from '../../utils';
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */

import './styles.css';

function Dashboard() {
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const { data, error, status } = useTransactions();
  const [transactionData, setTransactionData] = useState({});
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [categoriesExpensesPieChartData, setCategoriesExpensesPieChartData] = useState({});
  const [subCategoriesExpensesPieChartData, setSubCategoriesExpensesPieChartData] = useState({});

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

    const createPieSubCategories = (pieData) => {
      const arrayOfSubCategoriesDataValues = [];
      const arrayOfSubCategoriesDataLabels = [];

      pieData?.pieSubCategories?.forEach((subCategory) => {
        if (subCategory !== undefined) {
          arrayOfSubCategoriesDataValues.push(subCategory.percentage);
          arrayOfSubCategoriesDataLabels.push(subCategory.subCategoryName);
        }
      });
      return { arrayOfSubCategoriesDataValues, arrayOfSubCategoriesDataLabels };
    };

    if (Object.keys(transactionData).length !== 0) {
      const arrayOfMonthlyExpenses = [];
      let objectCategoriesPie = {};
      let objectSubCategoriesPie = {};

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
        const { arrayOfSubCategoriesDataValues, arrayOfSubCategoriesDataLabels } =
          createPieSubCategories(transactionData[label]);
        objectSubCategoriesPie = {
          ...objectSubCategoriesPie,
          [label]: {
            subCategoriesExpensesLabels: arrayOfSubCategoriesDataLabels,
            subCategoriesExpensesValues: arrayOfSubCategoriesDataValues
          }
        };
      });

      setCategoriesExpensesPieChartData(objectCategoriesPie);
      setSubCategoriesExpensesPieChartData(objectSubCategoriesPie);
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
                subCategoryName: transaction.subCategory.name,
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

  const onChange = (event) => {
    setMonth(event.value);
  };
  const seriesPieCategories =
    Object.keys(categoriesExpensesPieChartData).length === 0
      ? []
      : categoriesExpensesPieChartData[month.name].categoriesExpensesValues; // categoriesExpensesValues;

  const pieOptionsCategories = {
    chart: {},
    labels:
      Object.keys(categoriesExpensesPieChartData).length === 0
        ? []
        : categoriesExpensesPieChartData[month.name]?.categoriesExpensesLabels, // categoriesExpensesLabels,
    title: {
      text: 'Categories'
    },
    plotOptions: {
      pie: {
        donut: {
          size: '0%'
        }
      }
    }
  };
  const seriesPieSubCategories =
    Object.keys(subCategoriesExpensesPieChartData).length === 0
      ? []
      : subCategoriesExpensesPieChartData[month.name].subCategoriesExpensesValues; // categoriesExpensesValues;

  const pieOptionsSubCategories = {
    chart: {
      type: 'pie'
    },
    labels:
      Object.keys(subCategoriesExpensesPieChartData).length === 0
        ? []
        : subCategoriesExpensesPieChartData[month.name]?.subCategoriesExpensesLabels, // categoriesExpensesLabels,
    title: {
      text: 'Sub Categories'
    },
    plotOptions: {
      pie: {
        donut: {
          size: '0%'
        }
      }
    }
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
        <Chart
          series={anualSeriesChart(monthlyExpenses)}
          options={anualOptionsChart}
          height="350"
        />
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
          {Object.keys(categoriesExpensesPieChartData).length !== 0 &&
          categoriesExpensesPieChartData[month.name].categoriesExpensesValues.length > 0 ? (
            <WidgetContainer style={{ height: '400px' }}>
              <Chart type={'donut'} series={seriesPieCategories} options={pieOptionsCategories} />
            </WidgetContainer>
          ) : (
            <WidgetContainer style={{ height: '400px' }}>No Data to be shown</WidgetContainer>
          )}
        </div>
        <div className="categoriesWidgetsContainerGrid">
          {Object.keys(categoriesExpensesPieChartData).length !== 0 &&
          subCategoriesExpensesPieChartData[month.name].subCategoriesExpensesValues.length > 0 ? (
            <WidgetContainer style={{ height: '400px' }}>
              <Chart
                type={'donut'}
                series={seriesPieSubCategories}
                options={pieOptionsSubCategories}
                height="350"
              />
            </WidgetContainer>
          ) : (
            <WidgetContainer style={{ height: '400px' }}>No Data to be shown</WidgetContainer>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default Dashboard;
