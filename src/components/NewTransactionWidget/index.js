import React from 'react';

import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import PropTypes from 'prop-types';

function NewTransactionWidget({
  getRootProps,
  getInputProps,
  description,
  descriptionHandler,
  value,
  valueHandler,
  date,
  setDate,
  category,
  categorySelectItems,
  categoryHandler,
  subCategory,
  subCategorySelectItems,
  subCategoryHandler,
  clearAll,
  saveTransaction,
  checkIfCanSave
}) {
  return (
    <div>
      <span className="pageTitle">Transactions</span>
      <div className="createTransactionSection">
        <div className="gridTransation">
          <span className="fileUploadTitle">File Upload</span>
          <div {...getRootProps({ className: 'transactionFileUpload' })}>
            <input {...getInputProps()} />
            <p style={{ padding: '20px' }}>
              Drag and drop some files here, or click to select files
            </p>
          </div>
        </div>
        <div className="gridTransation">
          <span className="fileUploadTitle">Single Upload</span>
          <div className="transactionForm">
            <span className="titleTransactionFormFirstodList">Description</span>
            <InputText
              value={description}
              type="text"
              className="inputFormTrans"
              placeholder="Description"
              onChange={descriptionHandler}></InputText>
            <span className="titleTransactionForm">Value</span>
            <InputNumber
              value={value}
              onValueChange={valueHandler}
              mode="currency"
              currency="EUR"
              locale="de-DE"
              minFractionDigits={2}
              className="categoryListNumber"
            />
            <span className="titleTransactionForm">Date</span>
            <Calendar
              id="basic"
              className="categoryListNumber"
              value={date}
              onChange={(e) => setDate(e.value)}
            />
            <span className="titleTransactionForm">Category</span>
            <Dropdown
              value={category?.value ? category.value : ''}
              className="categoryList"
              options={categorySelectItems}
              onChange={(props) => categoryHandler(props)}
              placeholder="Select a Category"
              scrollHeight="300px"
            />
            <span className="titleTransactionForm">Sub-Category</span>
            <Dropdown
              value={subCategory?.value ? subCategory.value : ''}
              className="categoryList"
              options={subCategorySelectItems}
              optionLabel="label"
              onChange={(props) => subCategoryHandler(props)}
              placeholder="Select a SubCategory"
              scrollHeight="300px"
            />
            <div className="transactionActionButtons">
              <Button className="transactionButton" label="Clear" onClick={clearAll} />
              <Button
                className="transactionButton"
                label="Save"
                onClick={saveTransaction}
                disabled={checkIfCanSave()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

NewTransactionWidget.propTypes = {
  getRootProps: PropTypes.func,
  getInputProps: PropTypes.func,
  description: PropTypes.string,
  descriptionHandler: PropTypes.func,
  value: PropTypes.number,
  valueHandler: PropTypes.func,
  date: PropTypes.any,
  setDate: PropTypes.func,
  category: PropTypes.string,
  categorySelectItems: PropTypes.object,
  categoryHandler: PropTypes.func,
  subCategory: PropTypes.string,
  subCategorySelectItems: PropTypes.func,
  subCategoryHandler: PropTypes.func,
  clearAll: PropTypes.func,
  saveTransaction: PropTypes.func,
  checkIfCanSave: PropTypes.func
};

export default NewTransactionWidget;
