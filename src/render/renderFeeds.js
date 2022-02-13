export default (feeds, feedsHeader) => {
  const feedContainer = document.querySelector('.feeds');
  feedContainer.innerHTML = '';
  const divCardBorder = document.createElement('div');
  divCardBorder.classList.add('card', 'border-0');
  const divCardBody = document.createElement('div');
  divCardBody.classList.add('card-body');
  const h2CardTitle = document.createElement('h2');
  h2CardTitle.classList.add('card-title', 'h4');
  h2CardTitle.textContent = feedsHeader;
  divCardBody.append(h2CardTitle);
  divCardBorder.append(divCardBody);
  const ulFeedsList = document.createElement('ul');
  ulFeedsList.classList.add('list-group', 'border-0', 'rounded-0');
  feeds.forEach((feed) => {
    const liForFeed = document.createElement('li');
    liForFeed.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h6El = document.createElement('h6');
    h6El.classList.add('h-6', 'm-0');
    h6El.textContent = feed.feedTitle;
    const pEl = document.createElement('p');
    pEl.classList.add('m-0', 'small', 'text-black-50');
    pEl.textContent = feed.feedDescription;
    liForFeed.append(h6El, pEl);
    ulFeedsList.append(liForFeed);
  });
  divCardBorder.append(ulFeedsList);
  feedContainer.append(divCardBorder);
};
