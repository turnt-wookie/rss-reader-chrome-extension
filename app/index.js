document.addEventListener('DOMContentLoaded', () => {
  let rssDocument = getRssFeed('http://rss.nytimes.com/services/xml/rss/nyt/Americas.xml')
  let rssJson = rssNewsToJson(rssDocument)
  showRssFeed(rssDocument)
})

var getRssFeed = url => {
  let request = new XMLHttpRequest()
  request.open('GET', url, false)
  request.send(null)
  if (request.status === 200) {
    return stringToXml(request.responseText)
  } else {
    return new Error(`Failure. HTTP Status: ${request.status}`)
  }
}

var stringToXml = xmlString => {
  parser = new DOMParser()
  return parser.parseFromString(xmlString, 'text/xml')
}

var rssNewsToJson = doc => {
  let title = doc.querySelector('channel')
                 .querySelector('title')
                 .textContent

  let news = [...doc.querySelectorAll('item')].map(item => {
    return({
      title: item.querySelector('title').textContent,
      link: item.querySelector('link').textContent,
      description: item.querySelector('description').textContent,
      publishedAt: item.querySelector('pubDate').textContent
    })
  })

  return({
    title: title,
    news: news
  })
}

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
