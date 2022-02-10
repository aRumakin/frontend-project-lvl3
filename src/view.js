import onChange from 'on-change';
import renderError from './render/renderErrors';
import renderValid from './render/renderValid';

const watchedState = (state) => onChange(state, (path, value) => {
  const rssFormEl = document.querySelector('.rss-form');
  const feedbackEl = document.querySelector('.feedback');
  const urlInputEl = document.querySelector('input', '.form-control');

  if (path === 'validation.validationState') {
    if (value === 'invalid') {
      renderError(urlInputEl, feedbackEl, 'Ссылка должна быть валидным URL');
    }
    if (value === 'duplication') {
      renderError(urlInputEl, feedbackEl, 'RSS уже существует');
    }
  }
  if (path === 'parserState') {
    if (value === 'invalid') {
      renderError(urlInputEl, feedbackEl, 'Ресурс не содержит валидный RSS');
    }
    if (value === 'valid') {
      renderValid(urlInputEl, feedbackEl, 'RSS успешно загружен');
      rssFormEl.reset();
      rssFormEl.focus();
    }
  }
});

export default watchedState;