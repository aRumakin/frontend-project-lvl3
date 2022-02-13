/* eslint-disable no-param-reassign */
const renderValid = (inputEl, feedbackEl, validText) => {
  inputEl.classList.remove('is-invalid');
  feedbackEl.classList.add('text-success');
  feedbackEl.classList.remove('text-danger');
  feedbackEl.textContent = validText;
};

export default renderValid;
