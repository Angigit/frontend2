import './index.html';
import './scss/style.scss';
import firebase from 'firebase/app';
import 'firebase/firestore';
import config from './db_config.js';
import scrollIntoView from 'scroll-into-view-if-needed';

const firedb = firebase.initializeApp(config); //firedb object
const db = firedb.firestore(); //db változó, ezzel el tudjuk érni az adatbázist

async function sendMessage(message) {
  const res = await db.collection('messages').add(message);
  console.log(res);
}

/**
 * Delete message from the database 
 * @param {} id - the document id you want to delete - a deleteMessage pedig az adatbázisból törli a bejegyzést
 */
async function deleteMessage(id) {
  await db.collection('messages').doc(id).delete();
}

// a removeMessage a UI-ból szedi ki az üzenetet
// ne csak az adatot add át (doc.data() ) hanem az id-t is (doc.id) amit a függvényen belül megjelenítesz
//A remove message függvény ki kell hogy törölje az adott üzenetet a htmlből 
function removeMessage(id) {
  document.querySelector(`[data-id="${id}"]`).remove();
}



function createMessage() {
  const message = document.querySelector('#message').value;
  const username = document.querySelector('#nickname').value;
  const date = new Date();
  document.querySelector('#message').value = ''; //kitörli a beírt üzenetet az inputból
  return {
    message: message, //amit a user beír
    username: username, //amit a user beír
    date: date
  };
}

//adatbázissal fog kommunikálni, így async 
async function displayAllMessages() {
  const result = await db.collection('messages').orderBy('date', 'asc').get();
  result.forEach((doc) => {
    displayMessage(doc.data(), doc.id);
    //console.log(doc.id)
  });
}

window.addEventListener('DOMContentLoaded', () => {
  displayAllMessages();
  document.querySelector('#send').addEventListener('click', () => {
    const newMessage = createMessage();
    sendMessage(newMessage);
  });
  document.addEventListener('keyup', (event) => {
    if (event.code === 'Enter') {
      const newMessage = createMessage();
      sendMessage(newMessage);
    }
  })
});

function displayMessage(message, id) {
  const messageDOM = /* html */`
  <div class="message" data-id="${id}">
    <i class="fas fa-user"></i>
      <div>
          <span class="username">
             ${message.username}
            <time>${message.date.toDate().toLocaleString('hu')}</time>
          </span>
          <br />
          <span class="message-text">
             ${message.message}
              </span>
            </div>
            <div class="message-edit-buttons">
              <i class="fas fa-trash-alt"></i>
              <i class="fas fa-pen"></i>
            </div>
          </div>
  `;

  document.querySelector('#messages').insertAdjacentHTML('beforeend', messageDOM);

  scrollIntoView(document.querySelector('#messages'), {
    scrollMode: 'if-needed',
    block: 'end'
  });

  // Az event listener callback-jében pedig egyszerűen meghívjuk a deleteMessage és removeMessage függvényeket, paraméterként átadva nekik az id-t.
  document.querySelector(`[data-id="${id}"] .fa-trash-alt`).addEventListener('click', () => {
    deleteMessage(id);
    removeMessage(id);
  });
}

let initialLoad = true;

db.collection("messages").onSnapshot((snapshot) => {
  if (!initialLoad) {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        displayMessage(change.doc.data(), change.doc.id);
      }
      if (change.type === "modified") {
        console.log("Modified message: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed message: ", change.doc.data());
      }
    });
  }
  initialLoad = false;
});






