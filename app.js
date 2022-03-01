const data = {
  loginForm: document.getElementById('welcome-form'),
  messagesSection: document.getElementById('messages-section'),
  messagesList: document.getElementById('messages-list'),
  addMessageForm: document.getElementById('add-messages-form'),
  userNameInput: document.getElementById('username'),
  messageContentInput: document.getElementById('message-content'),
};

let userName;

data.loginForm.addEventListener('submit', event => login(event));
data.addMessageForm.addEventListener('submit', event => sendMessage(event));

function login(e){
  e.preventDefault();

  if(data.userNameInput.value){
    userName = data.userNameInput.value;
    data.loginForm.classList.remove('show');
    data.messagesSection.classList.add('show');
    console.log(userName);
  } else {
    alert('Please write your name :)');
  }
}