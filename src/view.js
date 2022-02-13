import onChange from 'on-change';
import renderError from './render/renderErrors';
import renderFeeds from './render/renderFeeds';
import renderPosts from './render/renderPosts';
import renderValid from './render/renderValid';

const watchedState = (state, i18n) => onChange(state, (path, value) => {
  const rssFormEl = document.querySelector('.rss-form');
  const feedbackEl = document.querySelector('.feedback');
  const urlInputEl = document.querySelector('input', '.form-control');

  const headEl = document.querySelector('#heading');
  const headDescrEl = document.querySelector('#heading_description');
  const headRssLinkEl = document.querySelector('.rss-form label');
  const addButtonEl = document.querySelector('.rss-form button');
  const exampleHeadEl = document.querySelector('section .text-muted');
  const modalButtonReadEl = document.querySelector('.btn-primary', '.full-article');
  const modalButtonCloseEl = document.querySelector('.btn-secondary');

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
  if (path === 'validation.validationState') { // отрисовка состояния валидации
    if (value === 'invalid') {
      renderError(urlInputEl, feedbackEl, i18n.t('feedback.invalidLink'));
    }
    if (value === 'duplication') {
      renderError(urlInputEl, feedbackEl, i18n.t('feedback.duplicate'));
    }
  }
  if (path === 'parserState') {
    if (value === 'invalid') {
      renderError(urlInputEl, feedbackEl, i18n.t('feedback.notValidRss'));
    }
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
    renderPosts(value, i18n);
  }
});

export default watchedState;
