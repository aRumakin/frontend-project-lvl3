import * as yup from 'yup';

const validator = (dataUrl, i18) => {
  yup.setLocale({
    string: {
      url: () => i18.t('feedback.ivalidLink'),
    },
  });

  const schema = yup.object({
    url: yup.string().url(),
  });
  return schema.validate({ url: dataUrl });
};

export default validator;
