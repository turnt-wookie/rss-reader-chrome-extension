class NewsDom {
  constructor(newsObject) {
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
    this.newsObject.news.forEach(item => {
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
}