import { fragment } from '@lcf.vs/dom-engine'

export default fragment(`
<form action="{action}" enctype="multipart/form-data" method="post">
  {confirm}
  <fieldset>
    <legend>Metadata</legend>
    <p>
      <label>
        Title
        <input name="title" pattern="[^ ]+" placeholder="The page title" required value="{title}" />
      </label>
    </p>
    <p>
      <label>
        Description
        <input name="description" pattern="[^ ]+" placeholder="The page description" required value="{description}" />
      </label>
    </p>
    <p>
      <label>
        URI
        <input name="uri" pattern="^/[\\w\\d-]+(/[\\w\\d-]+)*$" placeholder="/uri" required value="{uri}" />
      </label>
    </p>
    <p>
      <label>
        Class
        <input name="class" pattern="^\\w[\\w\\d-]+$" placeholder="class-name" required value="{class}" />
      </label>
    </p>
  </fieldset>
  <fieldset>
    <legend>Code</legend>
    <p>
      <label>
        Contents (HTML)
        <textarea name="contents">{contents}</textarea>
      </label>
    </p>
    <p>
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
  contents: '',
  contract: '',
  description: '',
  path: '',
  title: '',
  uri: ''
})
