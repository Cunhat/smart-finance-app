import React, { useState, useRef } from 'react';
import './styles.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function PersonalInfoWidget() {
  const [canEdit, setCanEdit] = useState(false);
  const firstName = useRef('');
  const lastName = useRef('');
  const birthday = useRef('');
  const email = useRef('');

  function saveTransaction() {
    console.log(firstName.current?.value);
    console.log(lastName.current?.value);
    console.log(birthday.current?.value);
    console.log(email.current?.value);
  }

  return (
    <div className="personalInfoContainer">
      <span className="generalInfoMainTitle">General Information</span>
      <div className="generalInfoSection">
        <div className="generalInfoGridLeft">
          <span className="infoTitles">First Name</span>
          <InputText ref={firstName} className="generalInfoInputs" disabled={!canEdit} />
          {firstName?.length === 0 && canEdit && (
            <small id="username2-help" className="p-error p-d-block">
              First Name must be filled.
            </small>
          )}
          <span className="infoTitles">Birthday</span>
          <InputText ref={lastName} className="generalInfoInputs" disabled={!canEdit} />
          {lastName?.length === 0 && canEdit && (
            <small id="username2-help" className="p-error p-d-block">
              Last Name must be filled.
            </small>
          )}
        </div>
        <div className="generalInfoGridRight">
          <span className="infoTitles">Last Name</span>
          <InputText ref={birthday} className="generalInfoInputs" disabled={!canEdit} />
          {birthday?.length === 0 && canEdit && (
            <small id="username2-help" className="p-error p-d-block">
              Last Name must be filled.
            </small>
          )}
          <span className="infoTitles">Email</span>
          <InputText ref={email} className="generalInfoInputs" disabled={!canEdit} />
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
          label={canEdit ? 'Cancel' : 'Edit'}
          onClick={() => setCanEdit(!canEdit)}
        />
        <Button
          className="transactionButton"
          label="Save"
          onClick={saveTransaction}
          disabled={!canEdit}
        />
      </div>
    </div>
  );
}

export default PersonalInfoWidget;
