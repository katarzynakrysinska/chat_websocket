'use strict';

/* GLOBAL */
const
  loginForm = document.getElementById('welcome-form'),
  messagesSection = document.getElementById('messages-section'),
  messagesList = document.getElementById('messages-list'),
  addMessageForm = document.getElementById('add-messages-form'),
  userNameInput = document.getElementById('username'),
  messageContentInput = document.getElementById('message-content')

let userName;

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);

/* ACTIONS */
function login(event) {
  event.preventDefault();

  if (userNameInput.value) {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    console.log(userName);
  } else {
    alert('What is your name?');
  }
}

function sendMessage(event) {
  event.preventDefault();

  let message = messageContentInput.value;

  if (message) {
    addMessage(userName, message);
    messageContentInput.value= '';
  } else {
    alert('Nothing to say?')
  }
}

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');

  if (author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">${content}</div>
  `;

  messagesList.appendChild(message);

  console.log('addMessage:', author, message);
}

