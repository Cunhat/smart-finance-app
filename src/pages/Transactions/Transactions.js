import React from "react";
import "./styles.css";
import { useDropzone } from "react-dropzone";

function Transactions() {
   const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

   const files = acceptedFiles.map((file) => (
      <li key={file.path}>
         {file.path} - {file.size} bytes
      </li>
   ));
/*  border: .0625rem solid #d1d7e0;
    box-shadow: 0 0 0 .2rem rgba(#262B40, .25);
    border-color: lighten(#262B40, 25%) !important;*/
   return (
      <div className="mainPagesContainer">
         <span className="pageTitle">Transactions</span>
         <div className="createTransactionSection">
            <div className="gridTransation">
               <span className='fileUploadTitle'>File Upload</span>
               <div {...getRootProps({ className: 'transactionFileUpload' })}>
                  <input {...getInputProps()} />
                  <p style={{padding: "20px"}}>Drag 'n' drop some files here, or click to select files</p>
               </div>
            </div>
            <div className='gridTransation'>
               <span className='fileUploadTitle'>Single Upload</span>
               <div className='transactionForm'>
                  <span>Description</span>
                  <input type="text" className='inputFormTrans' placeholder="Description"></input>
                  <span>Value</span>
                  <input type="text" className='inputFormTrans' placeholder="Value"></input>
                  <span>Category</span>
                  <select className="categoryList" name="country">
                     <option value="category1">Category 1</option>
                     <option value="category2">Category 2</option>
                     <option value="category3">Category 3</option>
                  </select>
                  <span>Sub-Category</span>
                  <select className="categoryList" name="country">
                     <option value="subCategory1">Sub Category 1</option>
                     <option value="subCategory2">Sub Category 2</option>
                     <option value="subCategory3">Sub Category 3</option>
                  </select>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Transactions;
