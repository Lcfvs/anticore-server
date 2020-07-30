import { listen, on } from 'anticore'

const history = []

function replace (element) {console.log(element)
  const tag = element.nodeName.toLowerCase()
  const selector = tag !== 'meta'
    ? tag
    : `${tag}[name="${element.name}"]`
  const current = document.querySelector(selector)

  current.parentNode.replaceChild(element, current)
}

on('main', (main, url) => {
  const { parentNode } = main
  const title = parentNode.querySelector('title')
  const metas = [...parentNode.querySelectorAll(':scope > meta[name]')]
  const elements = [main, title, ...metas]

  window.scrollTo(0, 0)

  if (!main.classList.contains('error')) {
    const state = {
      key: history.push(elements) - 1
    }

    window.history.pushState(state, title.innerHTML, url)
    history.push(elements)
  }

  if (title.matches('.anticore > title')) {
    elements.forEach(replace)
  }
})

listen('popstate', window, ({ state: { key } }) => {
  history[key] && history[key].forEach(replace)
})
