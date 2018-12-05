class NewsDom {
  constructor(newsObject) {
    // No utilizar el objeto que se pasa
    // Obtener las 10 primeras noticias de la base de datos
    this.newsObject = newsObject
  }

  render() {
    this._insertTitle()
    this._insertNews()
  }

  _insertTitle() {
    document.getElementById('title').textContent = this.newsObject.title
  }

  _insertNews() {
    let _this = this
    let nyt_news = this._getNews();
    nyt_news.forEach(item => {
      _this._pushItemNode(item.title, item.description, item.link)
    })
  }

  _pushItemNode(title, description, link) {
    let linkNode = document.createElement('a')
    linkNode.setAttribute('href', link)
    linkNode.setAttribute('target', '_blank')
    let titleNode = document.createElement('h3')
    linkNode.appendChild(titleNode)
    titleNode.textContent = title
    let descriptionNode = document.createElement('p')
    descriptionNode.textContent = description

    let itemNode = document.createElement('div')
    itemNode.classList.add('item')
    itemNode.appendChild(linkNode)
    itemNode.appendChild(descriptionNode)

    document.getElementById('feed').appendChild(itemNode)
  }

  _getNews() {
      let url = 'http://localhost:8080/backend/get.php'
      let request = new XMLHttpRequest()
      request.open('GET', url, false)
      request.send(null)
      if (request.status === 200) {
        return request.responseText
      } else {
        return new Error(`Failure. HTTP Status: ${request.status}`)
      }
  }
}
