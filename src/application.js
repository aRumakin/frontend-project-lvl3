import _ from 'lodash';
import axios from 'axios';
import i18n from 'i18next';
import validator from './validator';
import watchedSt from './view';
import resources from './locales/index.js';
import parseRSS from './parser';

export default () => {
  const defaultLng = 'ru';
  const i18nInstance = i18n.createInstance();
  return i18nInstance.init({
    lng: defaultLng,
    debug: false,
    resources,
  })
    .then(() => {
      const state = {
        lng: defaultLng,
        inputUrl: '',
        validUrls: [],
        form: {
          processState: 'filling',
        },
        validation: {
          processState: '',
          validationState: '', // valid, invalid, duplication
          processError: null,
        },
        parserState: '', // valid, invalid
      };
      const rssFormEl = document.querySelector('.rss-form');
      const inputEl = document.querySelector('#url-input');

      const watchedState = watchedSt(state, i18nInstance);
      rssFormEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputUrl = new FormData(e.target).get('url').trim();
        validator(inputUrl, i18nInstance).then(() => {
          if (watchedState.validUrls.includes(inputUrl)) {
            watchedState.validation.validationState = 'duplication';
          } else {
            axios.get(inputUrl)
              .then((response) => {
                const parsedRSS = parseRSS(response.data, watchedState);
                if (parsedRSS !== '') {
                  watchedState.validation.validationState = 'valid';
                  watchedState.validUrls.push(inputUrl);
                  watchedState.parserState = 'valid';
                } else {
                  watchedState.parserState = 'invalid';
                }
              })
              .catch((error) => {
                watchedState.validation.processState = error;
              });
          }
        }).catch((_err) => {
          watchedState.validation.validationState = 'invalid';
        });
      });
    });
};
