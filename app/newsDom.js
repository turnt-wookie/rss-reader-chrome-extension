class NewsDom {
  constructor(newsObject) {
    this.newsObject = newsObject
    this.currentPage = 0
  }

  render(page = 1) {
    this._cleanFeedDOM()
    this._insertTitle()
    this._insertNews(page)
    this._showEnjoyMessage()
    this._showPageIndicator()
  }

  find(data) {
    let _this = this
    this._cleanFeedDOM()
    data.forEach(item => {
      _this._pushItemNode(item.title, item.description, item.link)
    })
    this._showEnjoyMessage()
  }

  _insertTitle() {
    document.getElementById('title').textContent = this.newsObject.title
  }

  _insertNews(page = 1) {
    let _this = this
    let nyt_news = this._getNews(page)
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

  _getNews(page = 1) {
    let url = `http://localhost:8080/backend/paginated_get.php?page=${page}`
    let request = new XMLHttpRequest()
    request.open('GET', url, false)
    request.send(null)
    if (request.status === 200) {
      let response = JSON.parse(request.responseText)
      this.currentPage = page
      return response.data
    } else {
      return new Error(`Failure. HTTP Status: ${request.status}`)
    }
  }

  _cleanFeedDOM() {
    document.getElementById('feed').innerHTML = null
  }

  _showEnjoyMessage() {
    let enjoyMessageElement = document.getElementById('enjoy-message')
    enjoyMessageElement.classList = [ 'show' ]
    setTimeout(() => {
      enjoyMessageElement.classList = []
    }, 1000)
  }

  _showFoundMessage() {
    let enjoyMessageElement = document.getElementById('enjoy-message')
    enjoyMessageElement.innerHtml = 'I found this: '
    enjoyMessageElement.classList = [ 'show' ]
    setTimeout(() => {
      enjoyMessageElement.classList = []
      enjoyMessageElement.innerHTML = 'Enjoy the fresh news :)'
    }, 1000)
  }

  _showPageIndicator() {
    let _this = this;
    [...document.getElementsByClassName('page-btn')].forEach(button => {
      let page = button.getAttribute('data-page')
      if (page == _this.currentPage) {
        button.classList = 'page-btn current-page'
      } else {
        button.classList = 'page-btn'
      }
    })
  }
}
