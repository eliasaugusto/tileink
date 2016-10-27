import path from 'path';

export default {
  port: 3000,
  mongodb: '',
  paths: {
    root: path.join(__dirname, './'),
    storage: path.join(__dirname, './storage')
  }
};
