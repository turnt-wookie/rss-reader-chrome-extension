document.addEventListener('DOMContentLoaded', () => {
  let news = new RssNews('http://rss.nytimes.com/services/xml/rss/nyt/Americas.xml')
  let newsDom = new NewsDom(news.json)
  newsDom.render()
  addRefreshNewsListener(newsDom)
  addPageListener(newsDom)
  addSearchListener(newsDom)
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

const addSearchListener = (newsDom) => {
  document.getElementById('search-btn').addEventListener('click', () => {
    let query = document.getElementById('search-input').value

    let url = `http://localhost:8080/backend/match.php?q=${query}`
    let request = new XMLHttpRequest()
    request.open('GET', url, false)
    request.send(null)
    if (request.status === 200) {
      let response = JSON.parse(request.responseText)
      newsDom.find(response)
    } else {
      return new Error(`Failure. HTTP Status: ${request.status}`)
    }
  })
}
