export default (dataXML) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(dataXML, 'application/xml');
  const errorNode = xmlDoc.querySelector('parsererror');
  if (errorNode) {
    throw new Error('notValidRss');
  }
  const feedId = xmlDoc.querySelector('link').textContent.trim();
  const feedTitle = xmlDoc.querySelector('title').textContent.trim();
  const feedDescription = xmlDoc.querySelector('description').textContent.trim();
  const postEls = xmlDoc.querySelectorAll('item');
  const feed = { feedId, feedTitle, feedDescription };
  const posts = [];
  const feedItems = Array.from(postEls);
  feedItems.forEach((post) => {
    const feedPostId = feedId;
    const postGuidId = post.querySelector('guid').textContent.trim();
    const postTitle = post.querySelector('title').textContent.trim();
    const postLink = post.querySelector('link').textContent.trim();
    const postDescription = post.querySelector('description').textContent.trim();
    posts.push({
      feedPostId, postGuidId, postTitle, postLink, postDescription,
    });
  });
  return { feed, posts };
};
