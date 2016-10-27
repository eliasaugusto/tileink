import joi from 'joi';
import onPostShapeFile from './onPostShapeFile';

export default {
  routes: [{
    method: 'POST',
    path: '/datasource/shape',
    config: {
      handler: onPostShapeFile,
      payload: {
        parse: true,
        output: 'stream',
        allow: 'multipart/form-data'
      },
      validate: {
        payload: {
          name: joi.string().required(),
          file: joi.object().required()
        }
      }
    }
  }]
};
