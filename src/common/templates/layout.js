import { document } from '@lcf.vs/dom-engine'

export default document(`<!DOCTYPE html>
<html lang="{lang}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
    {meta}
    {refresh}
    <link href="/assets/css/style.min.css" media="screen" rel="stylesheet" />
    <script src="/assets/js/main.min.js" type="module"></script>
  </head>
  <body>
    <header>
      <h1>{branding}</h1>
      {notifiers}
    </header>
    {main}
    {nav}
    {footer}
  </body>
</html>
`, {
  branding: null,
  footer: '',
  lang: null,
  main: null,
  meta: null,
  nav: null,
  notifiers: '',
  refresh: ''
})
