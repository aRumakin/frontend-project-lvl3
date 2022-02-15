export default () => {
  document.body.classList.remove('modal-open');
  document.body.removeAttribute('style');
  const modalFadeEl = document.querySelector('#modal');
  modalFadeEl.classList.remove('show');
  modalFadeEl.setAttribute('aria-hidden', 'true');
  modalFadeEl.removeAttribute('aria-modal', 'true');
  modalFadeEl.setAttribute('style', 'display: none;');

  const divEl = document.querySelector('.modal-backdrop', '.fade', '.show');
  divEl.remove();
};
