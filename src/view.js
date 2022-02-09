import onChange from 'on-change';
import renderError from './render/renderErrors';

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
    if (value === 'valid') {
      renderValid(urlInputEl, feedbackEl, 'RSS успешно загружен');
    }
  }




});

export default watchedState;