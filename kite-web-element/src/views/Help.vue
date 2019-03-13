<template>
  <div>
    <el-card>
      <span slot="header">
        <h1 id="getting-started">Getting Started</h1>
        <p>This getting started page is going to walk you through how to complete fundamental tasks in Kite.</p>
      </span>
      <h2 id="creating-a-container">Creating a container</h2>
      <ol>
        <li>
          Visit containers page, either by clicking the navigation icon or using the keyboard shortcut
          <kbd>CTRL+SHIFT+C</kbd>
        </li>
        <li>
          Click anywhere in the dashed area that reads
          <strong>Click here to create a container</strong>
        </li>
        <li>Give your container a name, preferably something cute</li>
        <li>
          <strike>Select your container&#39;s image</strike>Just leave the image as PHP. It will always be PHP, no matter what you choose.
        </li>
        <li>
          Click the blue
          <b style="color: #409EFF;">Create Container</b> button
        </li>
        <li>Wait for your container to be created</li>
      </ol>
      <h2 id="uploading-files-to-a-container">Uploading files to a container</h2>
      <ol>
        <li>
          On the containers page, click the
          <strong>folder</strong> icon.
        </li>
        <li>
          In the panel that opened up on the right-hand side, click the blue
          <b
            style="color: #409EFF;"
          >Upload</b> button
        </li>
        <li>In the dialog, click the dashed box or drag a file from your computer into it, you can do this with multiple files.</li>
        <li>
          Click the
          <strong>Done</strong> button
        </li>
        <li>If your files do not appear, try refreshing the page.</li>
      </ol>
      <h2 id="moving-a-container-to-the-trash">Moving a container to the trash</h2>
      <ol>
        <li>
          Click the red
          <b style="color: #F56C6C;">trash</b> icon on the container you wish to delete
        </li>
        <li>
          In the dialog that has just appeared, click the yellow
          <b
            style="color: #E6A23C;"
          >Move to Trash</b> button
        </li>
        <li>Wait for the container to finish loading</li>
        <li>You can now view this container on the trash page.</li>
      </ol>
      <h2 id="restoring-a-container">Restoring a container</h2>
      <ol>
        <li>Visit the trash page.</li>
        <li>
          Select the container which you would like to restore, if it does
          <em>not</em> appear then I&#39;m afraid there is nothing more we can do for him doctor, it&#39;s time.
        </li>
        <li>
          Click the green
          <b style="color: #67C23A;">Restore Container</b> button.
        </li>
        <li>Patiently await your container&#39;s revival.</li>
      </ol>

      <h2
        id="saying-goodbye-and-deleting-a-container-forever"
      >Saying Goodbye, and deleting a container forever</h2>
      <ol>
        <li>
          On either the trash or containers page, click the the red
          <b style="color: #F56C6C;">trash</b> icon
        </li>
        <li>When the dialog appears, type the name of the container into the input field.</li>
        <li>
          If you have typed in the name correctly, the red
          <b
            style="color: #F56C6C;"
          >Delete Permanently</b> button will be unlocked
        </li>
        <li>
          Click the red
          <b style="color: #F56C6C;">Delete Permanently</b> button.
        </li>
        <li>Wait for the container to disappear.</li>
      </ol>
    </el-card>

    <el-card>
      <span slot="header">
        <h1>Keyboard Shortcuts</h1>
      </span>
      <table>
        <thead>
          <tr>
            <th>Shortcut</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <kbd>shift + →</kbd>
            </td>
            <td>Expand Nav</td>
          </tr>
          <tr>
            <td>
              <kbd>shift + ←</kbd>
            </td>
            <td>Collapse Nav</td>
          </tr>
          <tr>
            <td>
              <kbd>shift + n</kbd>
            </td>
            <td>Toggle Create Container Dialog</td>
          </tr>
          <tr>
            <td>
              <kbd>ctrl + shift + c</kbd>
            </td>
            <td>Containers page</td>
          </tr>
          <tr>
            <td>
              <kbd>ctrl + shift + f</kbd>
            </td>
            <td>File Manager</td>
          </tr>
        </tbody>
      </table>
    </el-card>
  </div>
</template>

<style scoped>
div {
  text-align: left;
}
kbd {
  background-color: #fafbfc;
  border: 1px solid #c6cbd1;
  border-bottom-color: #959da5;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #959da5;
  color: #444d56;
  display: inline-block;
  font-size: 11px;
  line-height: 10px;
  padding: 3px 5px;
  vertical-align: middle;
}
.el-card {
  margin: 10px 0px;
}
</style>
