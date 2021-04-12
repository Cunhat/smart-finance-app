import React, { useState } from "react";
import "./styles.css";
import { useDropzone } from "react-dropzone";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const data = [
   { description: "sadsadasda", value: "99.99", category: "Category 1", subCategory: "Sub category 1" },
   { description: "sadsadasda", value: "99.99", category: "Category 1", subCategory: "Sub category 1" },
   { description: "sadsadasda", value: "99.99", category: "Category 1", subCategory: "Sub category 1" },
   { description: "sadsadasda", value: "99.99", category: "Category 1", subCategory: "Sub category 1" }
];

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

function Transactions() {
   const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
   const [category, setCategory] = useState(null);
   const [subCategory, setSubCategory] = useState(null);
   const [description, setDescription] = useState(null);
   const [value, setValue] = useState(null);
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
                  <InputText
                     value={value}
                     type="text"
                     className="inputFormTrans"
                     placeholder="Value"
                     onChange={valueHandler}
                  ></InputText>
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
         {data.length >0 && <div className='tableTransactionSection'>
            <DataTable
               value={data}
               editMode="row"
               dataKey="id"
               //onRowEditInit={onRowEditInit}
               // onRowEditCancel={onRowEditCancel}
            >
               <Column
                  field="description"
                  header="Description" /*editor={(props) => codeEditor("products3", props)}*/
               ></Column>
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
                  // body={priceBodyTemplate}
                  /* editor={(props) => priceEditor("products3", props)}*/
               ></Column>
               <Column rowEditor headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "center" }}></Column>
            </DataTable>
         </div>}
      </div>
   );
}

export default Transactions;
