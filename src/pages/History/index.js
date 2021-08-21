/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
// import { ProgressBar } from 'primereact/progressbar';
// import { Calendar } from 'primereact/calendar';
// import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import PageContainer from '../../components/PageContainer';
import { ExpensesContext } from '../../contexts/ExpensesContext';
import style from './styles.css';

function History() {
  const expensesContext = useContext(ExpensesContext);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const dt = useRef(null);

  function descriptionBodyTemplate(rowData) {
    return <React.Fragment>{rowData.description}</React.Fragment>;
  }

  function categoryBodyTemplate(rowData) {
    return <React.Fragment>{rowData.category.name}</React.Fragment>;
  }

  function subCategoryBodyTemplate(rowData) {
    return <React.Fragment>{rowData.subCategory.name}</React.Fragment>;
  }

  function valueBodyTemplate(rowData) {
    return <React.Fragment>{rowData.value}€</React.Fragment>;
  }

  function dateBodyTemplate(rowData) {
    const date = new Date(rowData.date);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return <React.Fragment>{`${day}/${month}/${year}`}</React.Fragment>;
  }

  function onDateChange(e) {
    dt.current.filter(e.value, 'date', 'custom');
    setSelectedDate(e.value);
  }

  function dateFilter() {
    return (
      <Calendar
        value={selectedDate}
        onChange={onDateChange}
        dateFormat="dd/mm/yy"
        className="p-column-filter"
        placeholder="Registration Date"
      />
    );
  }

  function reset() {
    debugger;
    setGlobalFilter('');
    dt.current.reset();
  }

  const header = (
    <div className="table-header">
      <Button
        type="button"
        label="Clear"
        className="createSubCategoryButton"
        icon="pi pi-filter-slash"
        onClick={() => reset()}
      />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Global Search"
        />
      </span>
    </div>
  );

  const filterDate = (value, filter) =>
    new Date(value).getTime() === filter.getTime() ? value : false;

  return (
    <PageContainer style={style.tableContainer}>
      <h1>History</h1>
      <div className="tableContainer">
        <div>
          <DataTable
            ref={dt}
            value={expensesContext.expenses}
            paginator
            rows={20}
            header={header}
            globalFilter={globalFilter}
            className="dataTable"
            emptyMessage="No expenses found.">
            <Column
              field="description"
              header="Description"
              body={descriptionBodyTemplate}
              filter
              filterPlaceholder="Search by name"
            />
            <Column
              field="category.name"
              header="Category"
              body={categoryBodyTemplate}
              filter
              filterPlaceholder="Search by category"
            />
            <Column
              field="subCategory.name"
              header="Sub Category"
              body={subCategoryBodyTemplate}
              filter
              filterPlaceholder="Search by sub category"
            />
            <Column
              field="value"
              header="Value"
              body={valueBodyTemplate}
              filter
              filterPlaceholder="Search by value"
            />
            <Column
              field="date"
              header="Date"
              body={dateBodyTemplate}
              filter
              filterPlaceholder="Search by value"
              filterElement={dateFilter()}
              filterFunction={filterDate}
            />
          </DataTable>
        </div>
      </div>
    </PageContainer>
  );
}

export default History;
