export type SnackbarPayload = {
  message: string;
  type?: 'success' | 'error' | 'info';
};

let listener: ((data: SnackbarPayload) => void) | null = null;

export const SnackbarEvents = {
  emit: (data: SnackbarPayload) => {
    if (listener) listener(data);
  },
  subscribe: (cb: (data: SnackbarPayload) => void) => {
    listener = cb;
  },
  unsubscribe: () => {
    listener = null;
  },
};
