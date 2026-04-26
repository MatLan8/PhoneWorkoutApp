let timeout: NodeJS.Timeout;

export const debounceSave = (fn: () => void, delay = 1000) => {
  clearTimeout(timeout);
  timeout = setTimeout(fn, delay);
};
