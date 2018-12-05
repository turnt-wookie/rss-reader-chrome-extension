document.addEventListener('DOMContentLoaded', () => {
  let news = new RssNews('http://rss.nytimes.com/services/xml/rss/nyt/Americas.xml')
  let newsDom = new NewsDom(news.json)
  newsDom.render()
  addRefreshNewsListener(newsDom)
})

const addRefreshNewsListener = (newsDom) => {
  document.getElementById('refresh-btn').addEventListener('click', () => {
    newsDom.render()
  })
}
