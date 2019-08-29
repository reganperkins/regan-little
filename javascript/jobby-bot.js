const webChatContent = document.getElementById('webchat');
const webChatWrapper = document.getElementById('webchat-wrapper');
const webChatBtn = document.getElementById('webchat-btn');
const webChatExit = document.querySelector('.webchat-toolbar');

function clearOldMessages() {
  // a terrible hack to hide old messages since DirectLineJS does not support ending a conversation
  const messages = document.querySelectorAll('.css-1qyo5rb, .css-1gcwblg');
  for (let i = 0; i < messages.length; ++i) {
    messages[i].textContent = '';
  }
}

async function renderChat() {
  const secret = 'TnIc-9ZI498.xj7DL7NF-JZJEG6y7pUx2_xmt7fZrb2Vf4VbZX8YMz8';
  const res = await fetch('https://directline.botframework.com/v3/directline/tokens/generate', {
    body: JSON.stringify({ user: { id: 'dl_user_id', name: 'username' } }),
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-type': 'application/json',
    },
    method: 'POST',
  });
  const { token } = await res.json();

  window.WebChat.renderWebChat({
    directLine: window.WebChat.createDirectLine({ token }),
    styleOptions: {
      backgroundColor: '#f6f8fa',
      botAvatarInitials: 'JB',
    },
  }, webChatContent);
}

function startChat() {
  clearOldMessages();
  webChatWrapper.classList.add('show');
  renderChat();
  document.querySelector('#webchat > *').focus();
}

function closeChat() {
  webChatWrapper.classList.remove('show');
}

webChatBtn.addEventListener('click', startChat);
webChatExit.addEventListener('click', closeChat);
