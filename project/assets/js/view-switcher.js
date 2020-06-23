import { listen, on } from 'anticore'

const history = []

function replace (element) {
  const tag = element.nodeName.toLowerCase()
  const selector = tag !== 'meta'
    ? tag
    : `${tag}[name="${element.name}"]`
  const current = document.querySelector(selector)

  current.parentNode.replaceChild(element, current)
}

on('title', (title, url) => {
  const { parentNode } = title
  const main = parentNode.querySelector('main')
  const metas = [...parentNode.querySelectorAll(':scope > meta')]
  const elements = [main, title, ...metas]

  if (title.matches('body.anticore > title')) {
    if (!main.classList.contains('error')) {
      const state = {
        key: history.push(elements) - 1
      }

      window.history.pushState(state, title.innerHTML, url)
    }

    window.scrollTo(0, 0)
    elements.forEach(replace)
  } else {
    history.push(elements)
  }
})

listen('popstate', window, ({ state: { key } }) => {
  history[key].forEach(replace)
})
