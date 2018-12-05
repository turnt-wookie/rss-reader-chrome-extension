document.addEventListener('DOMContentLoaded', () => {
  let news = new RssNews('http://rss.nytimes.com/services/xml/rss/nyt/Americas.xml')
  let newsDom = new NewsDom(news.json)
  newsDom.render()
  addRefreshNewsListener(newsDom)
  addPageListener(newsDom)
})

const addRefreshNewsListener = (newsDom) => {
  document.getElementById('refresh-btn').addEventListener('click', () => {
    newsDom.render()
  })
}

const addPageListener = (newsDom) => {
  [...document.getElementsByClassName('page-btn')].forEach(button => {
    let page = button.getAttribute('data-page')
    button.addEventListener('click', () => {
      newsDom.render(page)
    })
  })
}
