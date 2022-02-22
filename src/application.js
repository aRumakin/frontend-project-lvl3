import i18n from 'i18next';
import _ from 'lodash';
import axios from 'axios';
import validator from './validator.js';
import watchedSt from './view.js';
import resources from './locales/index.js';
import parseRSS from './parser.js';

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
        watchedPosts: [],
        formUpdateState: 'readyToFill', // readyToFill, processing
        validationState: '', // valid, invalid
        modal: {
          modalView: 'hidden', // hidden, show
          modalPreview: {},
        },
        error: '',
      };
      const rssFormEl = document.querySelector('.rss-form');
      const containerPosts = document.querySelector('.posts');
      const modalContentEl = document.querySelector('.modal-content');

      const watchedState = watchedSt(state, i18nInstance);
      const routes = (value) => `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${value}`;

      const updatePosts = () => {
        setTimeout(() => {
          const tempPosts = [];
          watchedState.validUrls.forEach((url) => {
            axios.get(routes(url)).then((response) => {
              const parsed = parseRSS(response.data.contents);
              tempPosts.push(...parsed.posts);
            }).catch((err) => {
              console.log(err);
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

      const closeButtons = modalContentEl.querySelectorAll('[type="button"]');
      closeButtons.forEach((el) => {
        el.addEventListener('click', () => {
          watchedState.modal.modalView = 'hidden';
        });
      });

      rssFormEl.addEventListener('submit', (e) => {
        e.preventDefault();
        watchedState.error = '';
        const inputUrl = new FormData(e.target).get('url').trim();
        console.log(inputUrl);
        watchedState.formUpdateState = 'processing';
        validator(inputUrl, watchedState).then(() => {
          axios.get(routes(inputUrl)).then((response) => {
            try {
              const parsedRSS = parseRSS(response.data.contents);
              watchedState.error = '';
              watchedState.feeds.push(parsedRSS.feed);
              watchedState.posts.push(...parsedRSS.posts);
              watchedState.formUpdateState = 'readyToFill';
              watchedState.validUrls.push(inputUrl);
              watchedState.validationState = 'valid';
            } catch (err) {
              watchedState.formUpdateState = 'readyToFill';
              watchedState.error = err.message;
              watchedState.validationState = 'invalid';
            }
          }).catch(() => {
            watchedState.formUpdateState = 'readyToFill';
            if (watchedState.error === '') {
              watchedState.error = 'networkError';
            }
            watchedState.validationState = 'invalid';
          });
        }).catch((err2) => {
          watchedState.error = (err2.message === 'duplication') ? 'duplication' : 'invalidLink';
          watchedState.formUpdateState = 'readyToFill';
          watchedState.validationState = 'invalid';
        });
      });
      containerPosts.addEventListener('click', (event) => {
        const { id } = event.target.dataset;
        const { type } = event.target;
        if (!watchedState.watchedPosts.includes(id)) {
          watchedState.watchedPosts.push(id);
        }
        if (type === 'button') {
          const postShow = watchedState.posts.find((post) => post.postGuidId === id);
          watchedState.modal.modalPreview = { ...postShow };
          watchedState.modal.modalView = 'show';
        }
      });
    });
};
