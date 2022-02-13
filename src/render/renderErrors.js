/* eslint-disable no-param-reassign */
const renderError = (inputEl, feedbackEl, errorText) => {
  inputEl.classList.add('is-invalid');
  feedbackEl.classList.add('text-danger');
  feedbackEl.classList.remove('text-success');
  feedbackEl.textContent = errorText;
};

export default renderError;
