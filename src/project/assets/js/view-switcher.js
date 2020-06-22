import { on } from 'anticore'

on('.anticore > main, .anticore title', (element, url) => {
  const selector = element.nodeName.toLowerCase()
  const current = document.querySelector(selector)

  current.parentNode.replaceChild(element, current)

  if (selector === 'title') {
    history.pushState({}, element.innerHTML, url)
  } else {
    window.scrollTo(0, 0)
  }
})
