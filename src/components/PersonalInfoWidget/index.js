import React, { useState } from "react";
import "./styles.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function PersonalInfoWidget() {
   const [firstName, setFirstName] = useState("");

   const [canEdit, setCanEdit] = useState(false);

   return (
      <div className="personalInfoContainer">
         <span className="generalInfoMainTitle">General Information</span>
         <div className="generalInfoSection">
            <div className="generalInfoGridLeft">
               <span className="infoTitles">First Name</span>
               <InputText
                  value={firstName}
                  className="generalInfoInputs" /*onChange={(e) => this.setState({value1: e.target.value})} */
                  disabled = {!canEdit}
               />
               <small id="username2-help" className="p-error p-d-block">First Name must be filled.</small>
               <span className="infoTitles">Birthday</span>
               <InputText
                  value={firstName}
                  className="generalInfoInputs" /*onChange={(e) => this.setState({value1: e.target.value})} */
                  disabled = {!canEdit}
               />
               <small id="username2-help" className="p-error p-d-block">Last Name must be filled.</small>
            </div>
            <div className="generalInfoGridRight">
               <span className="infoTitles">Last Name</span>
               <InputText
                  value={firstName}
                  className="generalInfoInputs" /*onChange={(e) => this.setState({value1: e.target.value})} */
                  disabled = {!canEdit}
               />
               <small id="username2-help" className="p-error p-d-block">Last Name must be filled.</small>
               <span className="infoTitles">Email</span>
               <InputText
                  value={firstName}
                  className="generalInfoInputs" /*onChange={(e) => this.setState({value1: e.target.value})} */
                  disabled = {!canEdit}
               />
               <small id="username2-help" className="p-error p-d-block">Email must be filled.</small>
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
               //  disabled={checkIfCanSave()}
            />
         </div>
      </div>
   );
}

export default PersonalInfoWidget;
