import React, { useState } from "react";
import "./styles.css";
import { useDropzone } from "react-dropzone";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const categorySelectItems = [
   { label: "New York", value: "NY" },
   { label: "Rome", value: "RM" },
   { label: "London", value: "LDN" },
   { label: "Istanbul", value: "IST" },
   { label: "Paris", value: "PRS" }
];

const subCategorySelectItems = [
   { label: "New York", value: "NY" },
   { label: "Rome", value: "RM" },
   { label: "London", value: "LDN" },
   { label: "Istanbul", value: "IST" },
   { label: "Paris", value: "PRS" }
];

let originalRows = {};

function Transactions() {
   const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
   const [category, setCategory] = useState(null);
   const [subCategory, setSubCategory] = useState(null);
   const [description, setDescription] = useState(null);
   const [value, setValue] = useState(0);
   const [data, setData] = useState([]);

   const files = acceptedFiles.map((file) => (
      <li key={file.path}>
         {file.path} - {file.size} bytes
      </li>
   ));

   function categoryHandler(event) {
      setCategory(event.value);
   }

   function subCategoryHandler(event) {
      setSubCategory(event.value);
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
      setDescription("");
      setValue("");
   }

   function saveTransaction() {
      const transaction = {
         description: description,
         value: value,
         category: category,
         subCategory: subCategory
      };
      setData([...data, transaction]);
   }

   const onRowEditInit = (event) => {
      originalRows[event.index] = { ...data[event.index] };
   };

   const onRowEditCancel = (event) => {
      let dataTemp = [...data];
      dataTemp[event.index] = originalRows[event.index];
      delete originalRows[event.index];

      setData(dataTemp);
   };

   const onEditorValueChange = (data, value, field) => {
      let updatedData = [...data];
      updatedData[field.rowIndex][field.field] = value;
      setData(updatedData);
   };

   const inputTextEditor = (data, newValue, field) => {
      return (
         <InputText type="text" value={newValue} onChange={(e) => onEditorValueChange(data, e.target.value, field)} />
      );
   };

   function textEditor(data, typeOf) {
      return inputTextEditor(data, typeOf.rowData.description, typeOf);
   }

   const priceBodyTemplate = (rowData) => {
      return new Intl.NumberFormat("en-EU", { style: "currency", currency: "EUR" }).format(rowData.value);
   };

   const valueEditor = (data, typeOf) => {
      return (
         <InputNumber
            value={typeOf.rowData.value}
            onValueChange={(e) => onEditorValueChange(data, e.target.value, typeOf)}
            mode="currency"
            currency="EUR"
            locale="de-DE"
            minFractionDigits={2}
         />
      );
   };

   function deleteTableCol(data, type) {
      debugger;
      let updatedData = [...data];
      updatedData.splice(type.rowIndex, 1);
      setData(updatedData);
   }

   const actionBodyTemplate = (data, type) => {
      return <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteTableCol(data, type)} />;
   };

   return (
      <div className="mainPagesContainer">
         <span className="pageTitle">Transactions</span>
         <div className="createTransactionSection">
            <div className="gridTransation">
               <span className="fileUploadTitle">File Upload</span>
               <div {...getRootProps({ className: "transactionFileUpload" })}>
                  <input {...getInputProps()} />
                  <p style={{ padding: "20px" }}>Drag 'n' drop some files here, or click to select files</p>
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
                     onChange={descriptionHandler}
                  ></InputText>
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
                  <span className="titleTransactionForm">Category</span>
                  <Dropdown
                     value={category}
                     className="categoryList"
                     options={categorySelectItems}
                     onChange={categoryHandler}
                     placeholder="Select a Category"
                     scrollHeight="300px"
                  />
                  <span className="titleTransactionForm">Sub-Category</span>
                  <Dropdown
                     value={subCategory}
                     className="categoryList"
                     options={subCategorySelectItems}
                     onChange={subCategoryHandler}
                     placeholder="Select a SubCategory"
                     scrollHeight="300px"
                  />
                  <div className="transactionActionButtons">
                     <Button className="transactionButton" label="Clear" onClick={clearAll} />
                     <Button className="transactionButton" label="Save" onClick={saveTransaction} />
                  </div>
               </div>
            </div>
         </div>
         {data.length > 0 && (
            <div className="tableTransactionSection">
               <DataTable
                  value={data}
                  editMode="row"
                  dataKey="id"
                  onRowEditInit={onRowEditInit}
                  onRowEditCancel={onRowEditCancel}
               >
                  <Column field="description" header="Description" editor={(props) => textEditor(data, props)}></Column>
                  <Column
                     field="category"
                     header="Category" /*editor={(props) => nameEditor("products3", props)}*/
                  ></Column>
                  <Column
                     field="subCategory"
                     header="SubCategory"
                     // body={statusBodyTemplate}
                     /* editor={(props) => statusEditor("products3", props)}*/
                  ></Column>
                  <Column
                     field="value"
                     header="value"
                     body={priceBodyTemplate}
                     editor={(props) => valueEditor(data, props)}
                  ></Column>
                  <Column rowEditor headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "center" }}></Column>
                  <Column
                     body={(props, type) => actionBodyTemplate(data, type)}
                     headerStyle={{ width: "8em", textAlign: "center" }}
                     bodyStyle={{ textAlign: "center", overflow: "visible" }}
                  />
               </DataTable>
            </div>
         )}
      </div>
   );
}

export default Transactions;
