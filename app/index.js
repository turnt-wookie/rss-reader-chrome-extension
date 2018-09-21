document.addEventListener('DOMContentLoaded', () => {
  getRssFeed('http://rss.nytimes.com/services/xml/rss/nyt/Americas.xml')
})

var getRssFeed = url => {
  let xmlhttp = new XMLHttpRequest()
  xmlhttp.onreadystatechange = function() {
    let isReady = this.readyState == 4 && this.status == 200
    if (isReady) {
      doc = stringToXml(this.responseText)
      showRssFeed(doc)
    }
  }
  xmlhttp.open('GET', url)
  xmlhttp.send()
}

var stringToXml = xmlString => {
  parser = new DOMParser()
  return parser.parseFromString(xmlString, 'text/xml')
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
