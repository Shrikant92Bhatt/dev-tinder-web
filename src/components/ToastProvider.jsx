// ToastContext.tsx
import React, { useState, useCallback } from 'react';
import { ToastContext } from '../context/toastContext';

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((toastData) => {
    setToast(toastData);
    setTimeout(() => {
      setToast(null);
    }, 5000); // Auto close after 5 seconds
  }, []);

  const alertClassMap = {
    success: 'alert alert-success',
    error: 'alert alert-error',
    info: 'alert alert-info',
    warning: 'alert alert-warning',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="toast toast-top my-15 toast-end z-5000">
          <div className={alertClassMap[toast.type || 'info']}>
            <span className="text-base">{toast.message}</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
export default ToastProvider;
