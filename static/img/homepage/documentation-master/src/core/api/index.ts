import API from '@agile-ts/api';

const api = new API({
  timeout: 10000,
  options: {
    credentials: undefined,
  },
});

export default api;
