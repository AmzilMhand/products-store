import React, { useEffect } from 'react';
import { MdClose } from "react-icons/md";
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" 
        onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><MdClose /></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
