import React from "react";
import "./ConfirmDialog.css";

const ConfirmDialog = ({ 
  message, 
  onConfirm, 
  onCancel 
}) => {
  return (
    <div className="overlay">
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="buttons">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;