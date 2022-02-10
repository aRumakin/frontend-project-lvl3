export default (dataXML) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(dataXML, 'application/xml');
  console.log(xmlDoc)
  const errorNode = xmlDoc.querySelector('parsererror');
  if (errorNode) {
    return '';
  }
  const feedTitle = xmlDoc.querySelector('title').textContent.trim();
  const feedDescription = xmlDoc.querySelector('description').textContent.trim();
  const postEls = xmlDoc.querySelectorAll('channel' > 'item');
  console.log(feedTitle, feedDescription, postEls)
  const feed = { feedTitle, feedDescription };
  const posts = [];
  const feedItems = Array.from(postEls);
  feedItems.forEach((post) => {
    post.querySelector('')
  })
};
