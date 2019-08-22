const webChatContent = document.getElementById('webchat');
const webChatWrapper = document.getElementById('webchat-wrapper');
const webChatBtn = document.getElementById('webchat-btn');
const webChatExit = document.querySelector('.webchat-toolbar');

const startChat = async () => {
  webChatWrapper.classList.add('show');

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
    botAvatarInitials: 'JB',
  }, webChatContent);

  document.querySelector('#webchat > *').focus();
};

const closeChat = () => {
  webChatWrapper.classList.remove('show');
};

webChatBtn.addEventListener('click', startChat);
webChatExit.addEventListener('click', closeChat);
