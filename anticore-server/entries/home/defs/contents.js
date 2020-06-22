import { fragment } from '@lcf.vs/dom-engine'

export default fragment(`
<form action="{action}" enctype="multipart/form-data" method="post">
  {confirm}
  <fieldset>
    <p class="title">
      <label>
        Title
        <input name="title" pattern="[^ ]+" placeholder="The page title" required value="{title}" />
      </label>
    </p>
    <p class="description">
      <label>
        Description
        <input name="description" pattern="[^ ]+" placeholder="The page description" required value="{description}" />
      </label>
    </p>
    <p class="uri">
      <label>
        URI
        <input name="uri" pattern="^/[\\w\\d-]+(/[\\w\\d-]+)*$" placeholder="/uri" required value="{uri}" />
      </label>
    </p>
    <p class="class">
      <label>
        Class
        <input name="class" pattern="^\\w[\\w\\d-]+$" placeholder="class-name" required value="{class}" />
      </label>
    </p>
  </fieldset>
  <fieldset>
    <p class="contents">
      <label>
        Contents (HTML)
        <textarea name="contents">{contents}</textarea>
      </label>
    </p>
    <p class="contract">
      <label>
        Contract (JS)
        <textarea name="contract">{contract}</textarea>
      </label>
    </p>
  </fieldset>
  <button>Generate</button>
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
