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

   return (
      <div className="mainPagesContainer">
         <span className="pageTitle">Transactions</span>
         <div className="createTransactionSection">
            <div className="gridTransation">
               <span className='fileUploadTitle'>File Upload</span>
               <div {...getRootProps({ className: 'transactionFileUpload' })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
               </div>
            </div>
            <div className="gridTransation">
               <span className='fileUploadTitle'>Single Upload</span>
            </div>
         </div>
      </div>
   );
}

export default Transactions;
