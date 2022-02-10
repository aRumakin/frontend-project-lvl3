import validator from './validator';
import watchedSt from './view';
import _ from 'lodash';
import axios from 'axios';
import parseRSS from './parser';

const state = {
  inputUrl: '',
  validUrls: [],
  form: {
    processState: 'filling',
  },
  validation: {
    processState: '',
    validationState: '',
    processError: null,
  },
  parserState: '',
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
        axios.get(inputUrl)
        .then(function (response) {
          const parsedRSS = parseRSS(response.data, watchedState);
          if (parsedRSS !== '') {
            watchedState.validation.validationState = 'valid';
            watchedState.validUrls.push(inputUrl);
            watchedState.parserState = 'valid';
          } else {
            watchedState.parserState = 'invalid';
          }
        })
        .catch(function (error) {
          watchedState.validation.processState = error;
        })
      }
    }).catch((err) => {
      console.log(err)
      watchedState.validation.validationState = 'invalid';
    })
  });
};
