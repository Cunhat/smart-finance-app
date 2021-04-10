import React, { useState } from "react";
import "./styles.css";
import { useDropzone } from "react-dropzone";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from 'primereact/button';


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

   function clearAll(){
      setCategory(null);
      setSubCategory(null);
      setDescription("");
      setValue("");
   }

   function saveTransaction(){
      const transaction = {
         description: description,
         value: value,
         category: category,
         subCategory: subCategory
      }

      console.log(transaction);
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
                  <InputText value={description} type="text" className="inputFormTrans" placeholder="Description" onChange={descriptionHandler}></InputText>
                  <span className="titleTransactionForm">Value</span>
                  <InputText  value={value} type="text" className="inputFormTrans" placeholder="Value" onChange={valueHandler}></InputText>
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
                     placeholder="Select a Category"
                     scrollHeight="300px"
                  />
                  <div className="transactionActionButtons">
                     <Button className='transactionButton' label="Clear" onClick={clearAll}/>
                     <Button className='transactionButton' label="Save" onClick={saveTransaction}/>
                  </div>
                 
               </div>
            </div>
         </div>
      </div>
   );
}

export default Transactions;
