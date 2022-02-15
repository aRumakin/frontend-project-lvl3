export default (post) => {
  document.body.classList.add('modal-open');
  document.body.setAttribute('style', 'overflow: hidden; padding-right: 0px;');
  const modalFadeEl = document.querySelector('#modal');
  modalFadeEl.classList.add('show');
  modalFadeEl.removeAttribute('aria-hidden');
  modalFadeEl.setAttribute('aria-modal', 'true');
  modalFadeEl.setAttribute('style', 'display: block;');

  const { postTitle, postLink, postDescription } = post;
  const modalTitleEl = document.querySelector('.modal-title');
  const modalLinkEl = document.querySelector('.full-article');
  const modalBodyEl = document.querySelector('.modal-body');

  modalTitleEl.textContent = postTitle;
  modalLinkEl.setAttribute('href', `${postLink}`);
  modalBodyEl.textContent = postDescription;

  const divEl = document.createElement('div');
  divEl.classList.add('modal-backdrop', 'fade', 'show');
  document.body.append(divEl);
};
