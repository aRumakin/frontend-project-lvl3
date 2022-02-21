import onChange from 'on-change';
import formControl from './formControl.js';
import renderCloseModal from './render/renderCloseModal.js';
import renderError from './render/renderErrors.js';
import renderFeeds from './render/renderFeeds.js';
import renderModal from './render/renderModal.js';
import renderPosts from './render/renderPosts.js';
import renderValid from './render/renderValid.js';

const watchedState = (state, i18n) => onChange(state, (path, value) => {
  const rssFormEl = document.querySelector('.rss-form');
  const feedbackEl = document.querySelector('.feedback');
  const urlInputEl = document.querySelector('input', '.form-control');
  const containerPostsEl = document.querySelector('.posts');
  const headEl = document.querySelector('#heading');
  const headDescrEl = document.querySelector('#heading_description');
  const headRssLinkEl = document.querySelector('.rss-form label');
  const addButtonEl = document.querySelector('.rss-form button');
  const exampleHeadEl = document.querySelector('section .text-muted');
  const modalButtonReadEl = document.querySelector('.btn-primary', '.full-article');
  const modalButtonCloseEl = document.querySelector('.btn-secondary');

  const { disable, enable } = formControl;

  if (path === 'lng') { // отрисовка языка
    i18n
      .changeLanguage(value)
      .then((l) => {
        headEl.textContent = l('h1Text');
        headDescrEl.textContent = l('headText');
        headRssLinkEl.textContent = l('rssLabel');
        addButtonEl.textContent = l('buttonAdd');
        exampleHeadEl.textContent = l('rssExample');
        modalButtonReadEl.textContent = l('buttonModal.primary');
        modalButtonCloseEl.textContent = l('buttonModal.secondary');
      });
  }
  if (path === 'formUpdateState') {
    switch (value) {
      case 'processing':
        feedbackEl.textContent = '';
        disable(urlInputEl, addButtonEl);
        break;
      case 'failed':
        enable(urlInputEl, addButtonEl);
        break;
      case 'filling':
        enable(urlInputEl, addButtonEl);
        break;
      case 'success':
        enable(urlInputEl, addButtonEl);
        break;
      default:
        throw new Error(`Unknown status ${value}`);
    }
  }
  if (path === 'validationState') { // отрисовка состояния валидации
    if (value === 'valid') {
      renderValid(urlInputEl, feedbackEl, i18n.t('feedback.success'));
      rssFormEl.reset();
      rssFormEl.focus();
    }
  }
  if (path === 'feeds') {
    renderFeeds(value, i18n.t('feeds'));
  }
  if (path === 'posts') {
    renderPosts(value, i18n, state);
  }
  if (path === 'modal.modalView') {
    if (value === 'show') {
      renderModal(state.modal.modalPreview);
    }
    if (value === 'hidden') {
      renderCloseModal();
    }
  }
  if (path === 'watchedPosts') {
    const { watchedPosts } = state;
    watchedPosts.forEach((id) => {
      const watchedPostEl = containerPostsEl.querySelector(`[data-id="${id}"]`);
      watchedPostEl.classList.remove('fw-bold');
      watchedPostEl.classList.add('fw-normal');
      watchedPostEl.classList.add('link-secondary');
    });
  }
  if (path === 'error') {
    if (value !== '') {
      renderError(urlInputEl, feedbackEl, i18n.t(`feedback.${value}`));
    }
  }
});

export default watchedState;
