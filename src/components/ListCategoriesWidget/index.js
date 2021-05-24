import React, { useState, useEffect } from "react";

import axios from "axios";

import { DEV_ENDPOINT } from "../../Configs";
import "./styles.css";
import { PanelMenu } from "primereact/panelmenu";
import { NotificationManager } from "react-notifications";
import Loader from "../Spinner";

/*const items = [
   {
      label: "File",
      icon: "pi pi-fw pi-file",
      items: [
         {
            label: "Delete",
            icon: "pi pi-fw pi-trash"
         },
         {
            label: "Export",
            icon: "pi pi-fw pi-external-link"
         }
      ]
   },
   {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      items: [
         {
            label: "Left",
            icon: "pi pi-fw pi-align-left"
         },
         {
            label: "Right",
            icon: "pi pi-fw pi-align-right"
         },
         {
            label: "Center",
            icon: "pi pi-fw pi-align-center"
         },
         {
            label: "Justify",
            icon: "pi pi-fw pi-align-justify"
         }
      ]
   },
   {
      label: "Users",
      icon: "pi pi-fw pi-user",
      items: [
         {
            label: "New",
            icon: "pi pi-fw pi-user-plus"
         },
         {
            label: "Delete",
            icon: "pi pi-fw pi-user-minus"
         },
         {
            label: "Search",
            icon: "pi pi-fw pi-users",
            items: [
               {
                  label: "Filter",
                  icon: "pi pi-fw pi-filter",
                  items: [
                     {
                        label: "Print",
                        icon: "pi pi-fw pi-print"
                     }
                  ]
               },
               {
                  icon: "pi pi-fw pi-bars",
                  label: "List"
               }
            ]
         }
      ]
   },
   {
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
         {
            label: "Edit",
            icon: "pi pi-fw pi-pencil",
            items: [
               {
                  label: "Save",
                  icon: "pi pi-fw pi-calendar-plus"
               },
               {
                  label: "Delete",
                  icon: "pi pi-fw pi-calendar-minus"
               }
            ]
         },
         {
            label: "Archieve",
            icon: "pi pi-fw pi-calendar-times",
            items: [
               {
                  label: "Remove",
                  icon: "pi pi-fw pi-calendar-minus"
               }
            ]
         }
      ]
   }
];*/

function ListCategoriesWidget() {
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(false);

   function createCategoriesObj(data) {
      if (data?.length > 0) {
         let categoriesArray = [];
         data.map((elem) => {
            let obj = {
               label: elem.name,
               icon: "pi pi-fw pi-file"
            };

            let items = [];
            elem.subCategories.map((item) => {
               let subcategories = {
                  label: item.name,
                  icon: "pi pi-fw pi-trash"
               };
               items.push(subcategories);
            });
            obj = { ...obj, items };
            categoriesArray.push(obj);
         });
         setCategories(categoriesArray);
      }
   }

   useEffect(() => {
      setLoading(true);
      axios
         .get(DEV_ENDPOINT + "categories/getAll")
         .then((response) => {
            if (response.status === 200) {
               createCategoriesObj(response.data);
               NotificationManager.success("Categories successfully loaded", "Success!");
            }
            setLoading(false);
         })
         .catch((err) => {
            NotificationManager.error("Error loading Categories", "Ooops an error has occurred !", 5000);
            setLoading(false);
         });
   }, []);

   return (
      <div className="listCategoriesContainer">
         {loading && <Loader />}
         <span className="listCategoriesContainerWidgetTitle">List Categories and Sub-Categories</span>
         <PanelMenu model={categories} style={{ width: "100%" }} multiple={true} />
      </div>
   );
}

export default ListCategoriesWidget;
