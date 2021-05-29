import React, { useState, useEffect } from "react";
import "./styles.css";

import axios from "axios";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const subCategorySelectItems = [
    { label: "New York", value: "NY" },
    { label: "Rome", value: "RM" },
    { label: "London", value: "LDN" },
    { label: "Istanbul", value: "IST" },
    { label: "Paris", value: "PRS" }
 ];

function CreateSubCategoryWidget({categories}) {
   const [newSubCategory, setNewSubCategory] = useState("");
   const [canEdit, setCanEdit] = useState(false);
   const [category, setCategory] = useState("");

   useEffect(()=> {
      console.log(categories);
   },[categories]);

   
   function newCategoryHandler(event) {
    setNewSubCategory(event.target.value);
   }

   function enableInputField() {
      if (newSubCategory.length > 0) {
         setNewSubCategory("");
      }
      setCanEdit(!canEdit);
   }

   function clearAll() {
      setNewSubCategory("");
      setCanEdit(false);
      setCategory("");
   }

   function saveSubCategory() {
      //will call a webservice on the future
      clearAll();
   }

   function onEditorValueChange(event) {
       setCategory(event.value)
   }

   return (
      <div className="createSubCategoryContainer">
         <span className="createSubCategoryTitle">Create Sub-Category</span>
         <span className="infoTitlesCategory">Assign Category</span>
         <Dropdown
            value={category}
            className="categoryList"
            options={subCategorySelectItems}
            onChange={(props) => onEditorValueChange( props)}
            placeholder="Select a Category"
            scrollHeight="300px"
            disabled={!canEdit}
         />
         <span className="infoTitlesCategory">Create Sub-Category</span>
         <InputText
            value={newSubCategory}
            type="text"
            className="inputFormCreateSubCategory"
            placeholder="Add new category..."
            onChange={(event) => newCategoryHandler(event)}
            disabled={!canEdit}
         />
         <div className="createSubCategoryActionButtons">
            <Button
               className="createSubCategoryButton"
               label={canEdit ? "Cancel" : "Edit"}
               onClick={enableInputField}
            />
            <Button
               className="createSubCategoryButton"
               label="Save"
               onClick={saveSubCategory}
               disabled={newSubCategory.length === 0 || category.length === 0 }
            />
         </div>
      </div>
   );
}

export default CreateSubCategoryWidget;
