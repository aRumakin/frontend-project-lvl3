import * as yup from 'yup';

const validator = (dataUrl) => {
    const schema = yup.object({
    url: yup.string().url(),
  });
  return schema.validate({ url: dataUrl });
};

export default validator;
