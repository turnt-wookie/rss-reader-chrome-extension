document.addEventListener('DOMContentLoaded', () => {
  getRssFeed('http://rss.nytimes.com/services/xml/rss/nyt/Americas.xml')
})

var getRssFeed = url => {
  let xmlhttp = new XMLHttpRequest()
  xmlhttp.onreadystatechange = function() {
    let isReady = this.readyState == 4 && this.status == 200
    if (isReady) {
      // console.log(this.responseText)
      showRssFeed(this.responseText)
    }
  }
  xmlhttp.open('GET', url)
  xmlhttp.send()
}

var showRssFeed = (xmlString) => {
  parser = new DOMParser()
  doc = parser.parseFromString(xmlString, 'text/xml')
  items = doc.querySelectorAll('item')
  items.forEach(item => {
    let title = item.querySelector('title').textContent
    let link = item.querySelector('link').textContent
    let description = item.querySelector('description').textContent

    pushItemNode(title, description, link)
  })
}

var pushItemNode = (title, description, link) => {
  titleNode = document.createElement('h3')
  titleNode.textContent = title
  descriptionNode = document.createElement('p')
  descriptionNode.textContent = description

  itemNode = document.createElement('div')
  itemNode.classList.add('item')
  itemNode.appendChild(titleNode)
  itemNode.appendChild(descriptionNode)

  document.getElementById('feed').appendChild(itemNode)
}
