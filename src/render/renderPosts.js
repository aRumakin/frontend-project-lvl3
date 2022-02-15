export default (posts, i18n, state) => {
  const postsContainer = document.querySelector('.posts');
  postsContainer.innerHTML = '';
  const divCardBorder = document.createElement('div');
  divCardBorder.classList.add('card', 'border-0');
  const divCardBody = document.createElement('div');
  divCardBody.classList.add('card-body');
  const h2CardTitle = document.createElement('h2');
  h2CardTitle.classList.add('card-title', 'h4');
  h2CardTitle.textContent = i18n.t('posts.post');
  const divForUl = document.createElement('div');
  const ulListEl = document.createElement('ul');
  ulListEl.classList.add('list-group', 'border-0', 'rounded-0');
  Array.from(posts).forEach((post) => {
    const liForPost = document.createElement('li');
    liForPost.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const aForPost = document.createElement('a');
    aForPost.setAttribute('href', `${post.postLink}`);
    const postId = post.postGuidId;
    const classTextType = state.watchedPosts.includes(postId) ? 'fw-normal link-secondary' : 'fw-bold';
    aForPost.setAttribute('class', classTextType);
    aForPost.dataset.id = postId;
    aForPost.setAttribute('target', '_blank');
    aForPost.setAttribute('rel', 'noopener noreferrer');
    aForPost.textContent = post.postTitle;
    const buttonForPost = document.createElement('button');
    buttonForPost.setAttribute('type', 'button');
    buttonForPost.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    buttonForPost.dataset.id = postId;
    buttonForPost.dataset.bsToggle = 'modal';
    buttonForPost.dataset.bsTarget = 'modal';
    buttonForPost.textContent = i18n.t('posts.button');
    liForPost.append(aForPost, buttonForPost);
    ulListEl.append(liForPost);
  });
  divForUl.append(ulListEl);
  divCardBody.append(h2CardTitle);
  divCardBorder.append(divCardBody, divForUl);
  postsContainer.append(divCardBorder);
};