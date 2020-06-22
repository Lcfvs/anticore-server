import { on } from 'anticore'

const config = {
  autoRefresh: true,
  scrollbarStyle: 'overlay',
  theme: 'moxer'
}

on('main.anticore-server textarea[name="contract"]', element => {
  window.CodeMirror.fromTextArea(element, {
    ...config,
    mode: 'javascript'
  })
})

on('main.anticore-server textarea[name="contents"]', element => {
  window.CodeMirror.fromTextArea(element, {
    ...config,
    mode: 'xml'
  })
})
