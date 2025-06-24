import React, { useEffect } from 'react';

type SnackbarType = 'success' | 'error' | 'info';

interface Props {
  message: string | null;
  type?: SnackbarType; 
  onClose: () => void;
}

const getBackgroundColor = (type: SnackbarType = 'info') => {
  switch (type) {
    case 'success':
      return 'bg-green-600';
    case 'error':
      return 'bg-red-700';
    case 'info':
    default:
      return 'bg-blue-600';
  }
};

const Snackbar: React.FC<Props> = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 text-white px-4 py-2 rounded shadow-lg z-50 ${getBackgroundColor(type)}`}>
      {message}
    </div>
  );
};
export default Snackbar;
