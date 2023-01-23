import getBotResponse from "./openai.service.js";

var $messages = document.querySelector(".messages-content");

async function insertUserMessage() {
  let msg = document.querySelector(".message-input").value;
  if (msg == "") {
    return false;
  }
  let div = document.createElement("div");
  div.classList.add("message", "message-personal");
  div.innerHTML = msg;
  updateScrollbar();
  $messages.appendChild(div);
  document.querySelector(".message-input").value = "";
  $messages.scrollTop = $messages.scrollHeight;
  await insertBotMessage(msg);
}
async function insertBotMessage(message) {
  let botMessage = null;
  createLoadingMessage();
  botMessage = await getBotResponse(message);
  createBotMessage(botMessage.choices[0].text);
}
function createLoadingMessage() {
  let div = document.createElement("div");
  div.classList.add("message", "loading", "new");
  div.innerHTML = `<figure class="avatar"><img src="./assets/logo.png" /></figure><span></span>`;
  $messages.appendChild(div);
  $messages.scrollTop = $messages.scrollHeight;
}

function createBotMessage(message) {
  document.querySelector(".loading").remove();
  let div = document.createElement("div");
  div.classList.add("message", "new");
  div.innerHTML = `<figure class="avatar"><img src="./assets/logo.png" /></figure>${message}`;
  $messages.appendChild(div);
  $messages.scrollTop = $messages.scrollHeight;
}

function updateScrollbar() {
  $messages.scrollTop = $messages.scrollHeight;
  $messages.style.overflowY = "scroll";
}
window.addEventListener("keydown", function (e) {
  if (e.which == 13) {
    insertUserMessage();
    return false;
  }
});
window.addEventListener("load", function () {
  document.querySelector(".message-input").focus();
});
