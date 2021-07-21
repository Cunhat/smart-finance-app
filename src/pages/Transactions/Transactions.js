/* eslint-disable no-debugger */
import React, { useState, useContext } from 'react';
import './styles.css';
import { useDropzone } from 'react-dropzone';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import NewTransactionWidget from '../../components/NewTransactionWidget';
import { CategoriesInfoContext } from '../../contexts/CategoriesInfoContext';

const originalRows = {};

function Transactions() {
  const { /* acceptedFiles */ getRootProps, getInputProps } = useDropzone();
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(null);
  const categoriesContext = useContext(CategoriesInfoContext);

  /* const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  )); */

  function categoryHandler(event) {
    setCategory(
      categoriesContext.categorySelectItems.find((element) => element.value === event.value)
    );
  }

  function subCategoryHandler(event) {
    setSubCategory(
      categoriesContext.subCategorySelectItems.find((element) => element.value === event.value)
    );
  }

  function descriptionHandler(event) {
    setDescription(event.target.value);
  }

  function valueHandler(event) {
    setValue(event.target.value);
  }

  function clearAll() {
    setCategory(null);
    setSubCategory(null);
    setDescription('');
    setValue(0);
    setDate(null);
  }

  function saveTransaction() {
    const transaction = {
      description,
      value,
      date: date.toLocaleDateString('pt-PT'),
      category: category.label,
      subCategory: subCategory.label
    };
    setData([...data, transaction]);
    clearAll();
  }

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...data[event.index] };
  };

  const onRowEditCancel = (event) => {
    const dataTemp = [...data];
    dataTemp[event.index] = originalRows[event.index];
    delete originalRows[event.index];

    setData(dataTemp);
  };

  const onEditorValueChange = (values, param, field) => {
    let info = param;
    if (field.field === 'category') {
      info = categoriesContext.categorySelectItems.find((element) => element.value === value).label;
    } else if (field.field === 'date') {
      info = info.toLocaleDateString('pt-PT');
    }

    const updatedData = [...values];
    updatedData[field.rowIndex][field.field] = info;
    setData(updatedData);
  };

  const inputTextEditor = (values, newValue, field) => (
    <InputText
      type="text"
      value={newValue}
      onChange={(e) => onEditorValueChange(values, e.target.value, field)}
    />
  );

  function textEditor(values, typeOf) {
    return inputTextEditor(values, typeOf.rowData.description, typeOf);
  }

  const priceBodyTemplate = (rowData) =>
    new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR' }).format(rowData.value);

  const valueEditor = (values, typeOf) => (
    <InputNumber
      value={typeOf.rowData.value}
      onValueChange={(e) => onEditorValueChange(values, e.target.value, typeOf)}
      mode="currency"
      currency="EUR"
      locale="de-DE"
      minFractionDigits={2}
    />
  );

  function deleteTableCol(values, type) {
    const updatedData = [...values];
    updatedData.splice(type.rowIndex, 1);
    setData(updatedData);
  }

  const actionBodyTemplate = (values, type) => (
    <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteTableCol(values, type)} />
  );

  function editCategory(values, type) {
    return (
      <Dropdown
        value={values[type.rowIndex].category}
        className="categoryList"
        options={categoriesContext.categorySelectItems}
        onChange={(event) => onEditorValueChange(values, event.value, type)}
        placeholder="Select a Category"
        scrollHeight="300px"
      />
    );
  }

  function editSubCategory(values, type) {
    return (
      <Dropdown
        value={values[type.rowIndex].subCategory}
        className="categoryList"
        options={categoriesContext.subCategorySelectItems}
        onChange={(event) => onEditorValueChange(values, event.value, type)}
        placeholder="Select a SubCategory"
        scrollHeight="300px"
      />
    );
  }

  function checkIfCanSave() {
    return !(
      description?.length > 0 &&
      value !== 0 &&
      date !== null &&
      category !== null &&
      subCategory !== null
    );
  }

  function dateEditor(values, properties) {
    return (
      <Calendar
        id="basic"
        className="categoryListNumber"
        value={new Date(values[properties.rowIndex].date)}
        onChange={(e) => onEditorValueChange(data, e.value, properties)}
      />
    );
  }

  function submitTransactions() {}

  return (
    <div className="mainPagesContainer">
      <NewTransactionWidget
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        description={description}
        descriptionHandler={descriptionHandler}
        value={value}
        valueHandler={valueHandler}
        date={date}
        setDate={setDate}
        category={category}
        categorySelectItems={categoriesContext.categorySelectItems}
        categoryHandler={categoryHandler}
        subCategory={subCategory}
        subCategorySelectItems={categoriesContext.subCategorySelectItems}
        subCategoryHandler={subCategoryHandler}
        clearAll={clearAll}
        saveTransaction={saveTransaction}
        checkIfCanSave={checkIfCanSave}
      />
      {data.length > 0 && (
        <div className="tableTransactionSection">
          <div className="submitTrasactionActionCOntainer">
            <Button
              className="submitTransaction"
              label={'Submit Transactions'}
              onClick={submitTransactions}
            />
          </div>
          <DataTable
            value={data}
            editMode="row"
            dataKey="id"
            onRowEditInit={onRowEditInit}
            onRowEditCancel={onRowEditCancel}>
            <Column
              field="description"
              header="Description"
              editor={(props) => textEditor(data, props)}></Column>
            <Column
              field="category"
              header="Category"
              editor={(props) => editCategory(data, props)}></Column>
            <Column
              field="subCategory"
              header="Sub-Category"
              editor={(props) => editSubCategory(data, props)}></Column>
            <Column
              field="value"
              header="Value"
              body={priceBodyTemplate}
              editor={(props) => valueEditor(data, props)}></Column>
            <Column field="date" header="Date" editor={(props) => dateEditor(data, props)}></Column>
            <Column
              rowEditor
              headerStyle={{ width: '7rem' }}
              bodyStyle={{ textAlign: 'center' }}></Column>
            <Column
              body={(props, type) => actionBodyTemplate(data, type)}
              headerStyle={{ width: '8em', textAlign: 'center' }}
              bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
            />
          </DataTable>
        </div>
      )}
    </div>
  );
}

export default Transactions;
