import React, { useState } from "react";
import "./styles.css";
import { InputText } from "primereact/inputtext";

function PersonalInfoWidget() {
   const [firstName, setFirstName] = useState("");

   return (
      <div className="personalInfoContainer">
         <span className="generalInfoMainTitle">General Information</span>
         <div className="generalInfoSection">
            <div className="generalInfoGridLeft">
               <span className="infoTitles">First Name</span>
               <InputText
                  value={firstName}
                  className="generalInfoInputs" /*onChange={(e) => this.setState({value1: e.target.value})} */
               />
               <span className="infoTitles">Birthday</span>
               <InputText
                  value={firstName}
                  className="generalInfoInputs" /*onChange={(e) => this.setState({value1: e.target.value})} */
               />
               <span className="infoTitles">Email</span>
               <InputText
                  value={firstName}
                  className="generalInfoInputs" /*onChange={(e) => this.setState({value1: e.target.value})} */
               />
            </div>
            <div className="generalInfoGridRight">
               <span className="infoTitles">Last Name</span>
               <InputText
                  value={firstName}
                  className="generalInfoInputs" /*onChange={(e) => this.setState({value1: e.target.value})} */
               />
               <span className="infoTitles">First Name</span>
               <InputText
                  value={firstName}
                  className="generalInfoInputs" /*onChange={(e) => this.setState({value1: e.target.value})} */
               />
               <span className="infoTitles">First Name</span>
               <InputText
                  value={firstName}
                  className="generalInfoInputs" /*onChange={(e) => this.setState({value1: e.target.value})} */
               />
            </div>
         </div>
      </div>
   );
}

export default PersonalInfoWidget;
