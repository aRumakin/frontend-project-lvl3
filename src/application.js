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
        feeds: [],
        posts: [],
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

      const updatePosts = () => {
        setTimeout(() => {
          const tempPosts = [];
          watchedState.validUrls.forEach((url) => {
            axios.get(url)
              .then((response) => {
                const parsed = parseRSS(response.data, watchedState);
                if (parsed !== '') {
                  tempPosts.push(...parsed.posts);
                }
              })
              .catch((error) => {
                console.log(error);
                updatePosts();
              });
          });
          Promise.all(tempPosts)
            .then((data) => {
              const differenсes = _.differenceWith(data, watchedState.posts, _.isEqual);
              if (differenсes.length !== 0) {
                watchedState.posts.unshift(...differenсes);
              }
              updatePosts();
            });
        }, 5000);
      };
      updatePosts();

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
                  watchedState.feeds.push(parsedRSS.feed);
                  watchedState.posts.push(...parsedRSS.posts);
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
        // eslint-disable-next-line no-unused-vars
        }).catch((_err) => {
          watchedState.validation.validationState = 'invalid';
        });
      });
    });
};
