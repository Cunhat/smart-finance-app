import React, { useState, useEffect } from 'react';
import PersonalInfoWidget from '../../components/PersonalInfoWidget';
import './styles.css';
import CreateCategoryWidget from '../../components/CreateCategoryWidget';
import CreateSubCategoryWidget from '../../components/CreateSubCategoryWidget';
import ListCategoriesWidget from '../../components/ListCategoriesWidget';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';

import { DEV_ENDPOINT } from '../../Configs';

function Settings() {
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState('');

   useEffect(() => {
      setLoading(true);
      axios
         .get(DEV_ENDPOINT + 'categories/getAll')
         .then((response) => {
            if (response.status === 200) {
               createCategoriesObj(response.data);
               NotificationManager.success('Categories successfully loaded', 'Success!');
            }
         })
         .catch((err) => {
            NotificationManager.error('Error loading Categories', 'Ooops an error has occurred !', 5000);
            setMessage('Error loading categories!');
         });
   }, []);

   function createCategoriesObj(data) {
      if (data?.length > 0) {
         let categoriesArray = [];
         data.map((elem) => {
            let obj = {
               id: elem.id,
               label: elem.name,
               icon: 'pi pi-fw pi-file'
            };

            let items = [];
            elem.subCategories.map((item) => {
               let subcategories = {
                  label: item.name,
                  icon: 'pi pi-fw pi-trash'
               };
               items.push(subcategories);
            });
            obj = { ...obj, items };
            categoriesArray.push(obj);
         });
         setCategories(categoriesArray);
      } else {
         setMessage("You don't have any categories!!");
      }
   }

   return (
      <div className="mainPagesContainer">
         <span className="pageTitle">Settings</span>
         <PersonalInfoWidget />
         <div className="categoriesWidgetsContainer">
            <div className="categoriesWidgetsContainerGrid">
               <CreateCategoryWidget />
               <CreateSubCategoryWidget categories={categories} />
            </div>
            <div className="categoriesWidgetsContainerGrid">
               <ListCategoriesWidget categories={categories} message={message} />
            </div>
         </div>
      </div>
   );
}

export default Settings;
