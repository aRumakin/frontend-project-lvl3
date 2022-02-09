import validator from './validator';
import watchedSt from './view';
import _ from 'lodash';
import axios from 'axios';

const state = {
  inputUrl: '',
  validUrls: [],
  form: {
    processState: 'filling',
    errors: {},
  },
  validation: {
    processState: '',
    validationState: '',
    processError: null,
  },
};

const watchedState = watchedSt(state);

const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

export default () => {
  const rssFormEl = document.querySelector('.rss-form');
  const inputEl = document.querySelector('#url-input');

  rssFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputUrl = new FormData(e.target).get('url').trim();
    validator(inputUrl).then(() => {
      if (watchedState.validUrls.includes(inputUrl)) {
        watchedState.validation.validationState = 'duplication';
      } else {
        watchedState.validation.validationState = 'valid';
        axios.get(inputUrl)
        .then(function (response) {
          parseRSS(response.data);
        })
        .catch(function (error) {
          watchedState.validation.processState = error;
        })
      }
    }).catch((_err) => {
      watchedState.validation.validationState = 'invalid';
    })
  });
};
