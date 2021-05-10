export default function renderInnerPage() {
  const markup = `
    <div class="inner-page-container">
      <div>
        <h1>This is the inner page</h1>
        <button id="signOutButton">Sign out</button>
      </div>
      <div>
        <input type="text" id="dataToAdd" placeholder="data to add" class="data-to-add">
        <button id="addData">Add data</button>
        <button id="getData">Get data</button>
      </div>
      <div id="results"></div>
    <div>
  `;
  document.querySelector('#root').innerHTML = markup;
}