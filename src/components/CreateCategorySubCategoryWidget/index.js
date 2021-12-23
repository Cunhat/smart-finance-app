import React, { useState } from 'react';
import './styles.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { NotificationManager } from 'react-notifications';
import { useMutation } from 'react-query';
import { request } from 'graphql-request';
import PropTypes from 'prop-types';
import { DEV_ENDPOINT } from '../../Configs';
import Spinner from '../Spinner';

function CreateCategorySubCategoryWidget({ title, inputPlaceHolder, type, mutationFunction }) {
  const [newCategory, setNewCategory] = useState('');
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  function newCategoryHandler(event) {
    setNewCategory(event.target.value);
  }

  function enableInputField() {
    if (newCategory.length > 0) {
      setNewCategory('');
    }
    setCanEdit(!canEdit);
  }

  function clearAll() {
    setNewCategory('');
    setCanEdit(false);
  }

  const mutation = useMutation(async () => {
    const data = await request(DEV_ENDPOINT, mutationFunction(newCategory));
    return data;
  });

  async function saveCategory() {
    try {
      setLoading(true);
      const newCategorr = await mutation.mutateAsync(newCategory);
      if (type === 'SubCategory' && newCategorr?.createCategory !== undefined) {
        setLoading(false);
        NotificationManager.success(
          `${type} ${newCategorr?.createCategory.name} successfully created`,
          'Success!'
        );
      } else if (type === 'SubCategory' && newCategorr?.createSubCategory) {
        setLoading(false);
        NotificationManager.success(
          `${type} ${newCategorr?.createSubCategory.name} successfully created`,
          'Success!'
        );
      }
    } catch (error) {
      NotificationManager.error(`Error creating ${type}`, 'Ooops an error has occurred !', 5000);
      setLoading(false);
    } finally {
      clearAll();
    }
  }

  return (
    <div className="createCategoryContainer">
      {loading && <Spinner />}
      <span className="createCategoryTitle">{title}</span>
      <InputText
        value={newCategory}
        type="text"
        className="inputFormCreateCategory"
        placeholder={inputPlaceHolder}
        onChange={(event) => newCategoryHandler(event)}
        disabled={!canEdit}
      />
      <div className="createCategoryActionButtons">
        <Button
          className="createCategoryButton"
          label={canEdit ? 'Cancel' : 'Edit'}
          onClick={enableInputField}
        />
        <Button
          className="createCategoryButton"
          label="Save"
          onClick={saveCategory}
          disabled={newCategory.length === 0}
        />
      </div>
    </div>
  );
}

CreateCategorySubCategoryWidget.propTypes = {
  title: PropTypes.string,
  inputPlaceHolder: PropTypes.string,
  type: PropTypes.string,
  mutationFunction: PropTypes.func
};

export default CreateCategorySubCategoryWidget;
