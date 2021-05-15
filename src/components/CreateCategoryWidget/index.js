import React, { useState } from "react";
import "./styles.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DEV_ENDPOINT } from "../../Configs";
import axios from "axios";
import { NotificationManager } from "react-notifications";

function CreateCategoryWidget() {
   const [newCategory, setNewCategory] = useState("");
   const [canEdit, setCanEdit] = useState(false);

   function newCategoryHandler(event) {
      setNewCategory(event.target.value);
   }

   function enableInputField() {
      if (newCategory.length > 0) {
         setNewCategory("");
      }
      setCanEdit(!canEdit);
   }

   function clearAll() {
      setNewCategory("");
      setCanEdit(false);
   }

   function saveTransaction() {
      const data = {
         name: newCategory
      };

      axios
         .post(DEV_ENDPOINT + "categories/insertCategory", data)
         .then((response) => {
            if (response.status === 200) {
               NotificationManager.success("Category successfully created", "Success!");
            }
         })
         .catch((err) => {
            debugger;
            NotificationManager.error("Error creating Category", "Ooops an error has occurred !", 5000);
         });
      clearAll();
   }

   return (
      <div className="createCategoryContainer">
         <span className="createCategoryTitle">Create Category</span>
         <InputText
            value={newCategory}
            type="text"
            className="inputFormCreateCategory"
            placeholder="Add new category..."
            onChange={(event) => newCategoryHandler(event)}
            disabled={!canEdit}
         />
         <div className="createCategoryActionButtons">
            <Button className="createCategoryButton" label={canEdit ? "Cancel" : "Edit"} onClick={enableInputField} />
            <Button
               className="createCategoryButton"
               label="Save"
               onClick={saveTransaction}
               disabled={newCategory.length === 0}
            />
         </div>
      </div>
   );
}

export default CreateCategoryWidget;
