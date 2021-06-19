import React, {useState, useEffect} from 'react';
import './styles.css';
import axios from 'axios';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {DEV_ENDPOINT} from '../../Configs';
import {NotificationManager} from 'react-notifications';

function CreateSubCategoryWidget({categories}) {
  const [newSubCategory, setNewSubCategory] = useState('');
  const [canEdit, setCanEdit] = useState(false);
  const [category, setCategory] = useState('');
  const [listOfCategories, setLisOfCategories] = useState([]);

  useEffect(() => {
    if (categories?.length > 0) {
      createCategories();
    }
  }, [categories]);

  function createCategories() {
    const arr = [];
    categories.map((category) => {
      const obj = {
        label: category.label,
        value: category.id,
      };
      arr.push(obj);
    });
    setLisOfCategories(arr);
  }

  function newCategoryHandler(event) {
    setNewSubCategory(event.target.value);
  }

  function enableInputField() {
    if (newSubCategory.length > 0) {
      setNewSubCategory('');
    }
    setCanEdit(!canEdit);
  }

  function clearAll() {
    setNewSubCategory('');
    setCanEdit(false);
    setCategory('');
  }

  function saveSubCategory() {
    const data = {
      name: newSubCategory,
    };

    axios
        .post(DEV_ENDPOINT + 'subCategories/insertSubCategories/' + category, data)
        .then((response) => {
          if (response.status === 200) {
            NotificationManager.success('Sub-Category successfully created', 'Success!');
          }
        })
        .catch(() => {
          NotificationManager.error('Error creatinbg Sub-Category', 'Ooops an error has occurred !', 5000);
        });
    clearAll();
  }

  function onEditorValueChange(event) {
    setCategory(event.value);
  }

  return (
    <div className="createSubCategoryContainer">
      <span className="createSubCategoryTitle">Create Sub-Category</span>
      <span className="infoTitlesCategory">Assign Category</span>
      <Dropdown
        value={category}
        className="categoryList"
        options={listOfCategories}
        onChange={(props) => onEditorValueChange(props)}
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
          label={canEdit ? 'Cancel' : 'Edit'}
          onClick={enableInputField}
        />
        <Button
          className="createSubCategoryButton"
          label="Save"
          onClick={saveSubCategory}
          disabled={newSubCategory.length === 0 || category.length === 0}
        />
      </div>
    </div>
  );
}

export default CreateSubCategoryWidget;
