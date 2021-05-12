import React, { useState } from "react";
import "./styles.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {DEV_ENDPOINT} from "../../Configs"

function PersonalInfoWidget() {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [birthday, setBirthday] = useState("");
   const [email, setEmail] = useState("");

   const [canEdit, setCanEdit] = useState(false);

   return (
      <div className="personalInfoContainer">
         <span className="generalInfoMainTitle">General Information</span>
         <div className="generalInfoSection">
            <div className="generalInfoGridLeft">
               <span className="infoTitles">First Name</span>
               <InputText
                  value={firstName}
                  className="generalInfoInputs"
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!canEdit}
               />
               {firstName?.length === 0 && canEdit && (
                  <small id="username2-help" className="p-error p-d-block">
                     First Name must be filled.
                  </small>
               )}
               <span className="infoTitles">Birthday</span>
               <InputText
                  value={lastName}
                  className="generalInfoInputs"
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!canEdit}
               />
               {lastName?.length === 0 && canEdit && (
                  <small id="username2-help" className="p-error p-d-block">
                     Last Name must be filled.
                  </small>
               )}
            </div>
            <div className="generalInfoGridRight">
               <span className="infoTitles">Last Name</span>
               <InputText
                  value={birthday}
                  className="generalInfoInputs"
                  onChange={(e) => setBirthday(e.target.value)}
                  disabled={!canEdit}
               />
               {birthday?.length === 0 && canEdit && (
                  <small id="username2-help" className="p-error p-d-block">
                     Last Name must be filled.
                  </small>
               )}
               <span className="infoTitles">Email</span>
               <InputText
                  value={email}
                  className="generalInfoInputs"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!canEdit}
               />
               {email?.length === 0 && canEdit && (
                  <small id="username2-help" className="p-error p-d-block">
                     Email must be filled.
                  </small>
               )}
            </div>
         </div>
         <div className="generalInfoActionButtons">
            <Button
               className="personalInfoButtons"
               label={canEdit ? "Cancel" : "Edit"}
               onClick={() => setCanEdit(!canEdit)}
            />
            <Button
               className="transactionButton"
               label="Save"
               // onClick={saveTransaction}
               disabled={!canEdit}
            />
         </div>
      </div>
   );
}

export default PersonalInfoWidget;
