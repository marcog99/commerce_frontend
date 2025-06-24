import { useState } from 'react';

export function useSnackbar() {
  const [message, setMessage] = useState<string | null>(null);

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000); 
  };

  return {
    message,
    showSnackbar,
  };
}
