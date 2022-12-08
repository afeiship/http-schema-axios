import httpSchema from '@jswork/http-schema';
import NxAxios from '@jswork/next-axios';

export default (inConfig, inOptions?) => {
  const http = NxAxios.getInstance({ ...inOptions });
  return httpSchema(inConfig, http);
};
