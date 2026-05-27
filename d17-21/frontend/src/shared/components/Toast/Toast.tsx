// Toast notification component to display operation feedback to the user (Rule #2).

import React, { useEffect } from 'react';
import { UI_CONSTANTS } from '../../constants';
import './Toast.css';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, UI_CONSTANTS.TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast-card toast-${type}`} role="alert">
      <span className="toast-icon">{type === 'success' ? 'Success' : 'Error'}</span>
      <p className="toast-message">{message}</p>
      <button className="toast-close" onClick={onClose} aria-label="Close toast">×</button>
    </div>
  );
};

export default Toast;
