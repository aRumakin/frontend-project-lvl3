import * as yup from 'yup';

const validator = (dataUrl, watchedState) => {
  if (watchedState.validUrls.includes(dataUrl)) {
    return Promise.reject(new Error('duplication'));
  }

  const schema = yup.object({
    url: yup.string().url(),
  });
  return schema.isValid({ url: dataUrl });
};

export default validator;
