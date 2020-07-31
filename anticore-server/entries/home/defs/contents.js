import { template } from '@lcf.vs/dom-engine/lib/backend.js'
import styles from '../../../../common/utils/styles.js'

const classes = styles('./anticore-server/assets/css/style.css')

export default template(`
<form action="{action}" enctype="multipart/form-data" method="post">
  <fieldset>
    <p class="${classes.title}">
      <label>
        Title
        <input name="title" pattern=".+" placeholder="The page title" required value="{title}" />
      </label>
    </p>
    <p class="${classes.description}">
      <label>
        Description
        <input name="description" pattern=".+" placeholder="The page description" required value="{description}" />
      </label>
    </p>
    <p class="${classes.uri}">
      <label>
        URI
        <input name="uri" pattern="^/([\\w\\d-]+(/[\\w\\d-]+)*)?$" placeholder="/uri" required value="{uri}" />
      </label>
    </p>
    <p class="${classes.class}">
      <label>
        Class
        <input name="class" pattern="^\\w[\\w\\d-]+$" placeholder="class-name" required value="{class}" />
      </label>
    </p>
  </fieldset>
  <fieldset>
    <p class="${classes.contents}">
      <label>
        Contents (HTML)
        <textarea name="contents">{contents}</textarea>
      </label>
    </p>
    <p class="${classes.contract}">
      <label>
        Contract (JS)
        <textarea name="contract">{contract}</textarea>
      </label>
    </p>
  </fieldset>
  <button>Generate</button>
  {confirm}
</form>
`, {
  action: '',
  class: '',
  confirm: '',
  contents: `<section>
  <h1></h1>
</section>`,
  contract: `
import { on } from 'anticore'

on('', element => {

})
`,
  description: '',
  path: '',
  title: '',
  uri: ''
})
