document.addEventListener('DOMContentLoaded', () => {
  let news = new RssNews('http://rss.nytimes.com/services/xml/rss/nyt/Americas.xml')
  let newsDom = new NewsDom(news.json)
  newsDom.render()
})

var showRssFeed = doc => {
  titleNode = doc.querySelector('channel').querySelector('title')
  title = titleNode.textContent
  showTitle(title)

  items = doc.querySelectorAll('item')
  items.forEach(item => {
    let title = item.querySelector('title').textContent
    let link = item.querySelector('link').textContent
    let description = item.querySelector('description').textContent

    pushItemNode(title, description, link)
  })
}

var pushItemNode = (title, description, link) => {
  linkNode = document.createElement('a')
  linkNode.setAttribute('href', link)
  linkNode.setAttribute('target', '_blank')
  titleNode = document.createElement('h3')
  linkNode.appendChild(titleNode)
  titleNode.textContent = title
  descriptionNode = document.createElement('p')
  descriptionNode.textContent = description

  itemNode = document.createElement('div')
  itemNode.classList.add('item')
  itemNode.appendChild(linkNode)
  itemNode.appendChild(descriptionNode)

  document.getElementById('feed').appendChild(itemNode)
}

var showTitle = title => {
  document.getElementById('title').textContent = title
}
