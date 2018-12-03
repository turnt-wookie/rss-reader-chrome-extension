class RssNews {
  constructor(url) {
    this.url = url
    this.document = this._fetchRssFeed()
    this.json = this._rssNewsToJson()
    // Fetch a la base de datos
    // Checar que elementos no se han agregado (find)
    // Insertar nuevos elementos
  }

  _fetchRssFeed() {
    let request = new XMLHttpRequest()
    request.open('GET', this.url, false)
    request.send(null)
    if (request.status === 200) {
      return this._stringToXml(request.responseText)
    } else {
      return new Error(`Failure. HTTP Status: ${request.status}`)
    }
  }

  _rssNewsToJson() {
    let title = this.document.querySelector('channel')
                        .querySelector('title')
                        .textContent

    let news = [...this.document.querySelectorAll('item')].map(item => {
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

  _stringToXml(xmlString) {
    let parser = new DOMParser()
    return parser.parseFromString(xmlString, 'text/xml')
  }
}
