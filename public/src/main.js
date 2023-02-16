const chatBox = document.querySelector(".chat-box");
const inputField = chatBox.querySelector("input[type='text']");
const button = chatBox.querySelector("button");
const chatBoxBody = chatBox.querySelector(".chat-box-body");

button.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = inputField.value;
  inputField.value = "";

  // concatenate intro to message
  const intro = `//Imagine a conversation between a therapist and a patient. I will provide the patient's dialogue and you only will provide the therapist dialogue. Don't autocomplete the patient's dialogue. Create only the dialogue for the therapist taking in count the patient's answer and the patient's info. If the patient shows any kind of harmful behaviour, please advise the patient to seek for professional real help.
  Patient:`;
  const messageWithIntro = intro + message + "//end of Patient's message";

  chatBoxBody.innerHTML += `<div class="message"><p>${message}</p></div>`;
  chatBoxBody.innerHTML += `<div id="loading" class="response loading">.</div>`;
  scrollToBottom();
  window.dotsGoingUp = true;
    var dots = window.setInterval( function() {
        var wait = document.getElementById("loading");
        if (wait) {
          if ( window.dotsGoingUp ) 
              wait.innerHTML += ".";
          else {
              wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);
          if ( wait.innerHTML.length < 2)
              window.dotsGoingUp = true;
          }
          if ( wait.innerHTML.length > 3 )
              window.dotsGoingUp = false;
        } else {
          clearInterval(dots);
        }
        }, 250);

  fetch('http://localhost:5000/message', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({message: messageWithIntro})
  }).then(response => {
    return response.json();
  }).then(data => {
    document.getElementById("loading").remove();
    chatBoxBody.innerHTML += `<div class="response"><p>${data.message}</p></div>`;
    scrollToBottom();
  })
}

function scrollToBottom() {
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}
