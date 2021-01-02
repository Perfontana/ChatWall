class UI {
  body = document.body;
  form = document.querySelector('#main-form');
  messageInput = document.querySelector('#message-text');
  timeout = 8000;

  addMessage(message) {
    const span = this.createSpan(message);
    this.setRandomPosition(span);
    this.body.appendChild(span);
    this.fadeIn(span);
    setTimeout(() => {
      this.fadeIn(span);
      this.fadeOut(span);
      setTimeout(() => {
        span.remove();
      }, 2000);
    }, this.timeout);
  }

  fadeIn(element) {
    element.classList.toggle('fadeIn');
  }

  fadeOut(element) {
    element.classList.toggle('fadeOut');
  }

  createSpan(message) {
    const span = document.createElement('span');
    span.classList.add('message');
    span.textContent = message;
    return span;
  }

  setRandomPosition(element) {
    const paddingVertical = 25;
    const paddingHorisontal = 25;
    element.style.top =
      Math.round(
        Math.random() * (this.body.clientHeight - paddingVertical * 2) +
          paddingVertical -
          element.clientHeight
      ) + 'px';
    element.style.left =
      Math.round(
        Math.random() * (this.body.clientWidth - paddingHorisontal * 2) +
          paddingHorisontal -
          element.clientWidth
      ) + 'px';
  }

  addSubmitAction(handleFunction) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFunction(e);
    });
  }

  getInput() {
    return this.messageInput.value;
  }

  clearInput() {
    this.messageInput.value = '';
  }
}

const socket = io();
const ui = new UI();

ui.addSubmitAction((e) => {
  let message = ui.getInput().trim();
  if (message) socket.emit('message', ui.getInput());
  ui.clearInput();
});

socket.on('message-broadcast', (message) => {
  ui.addMessage(message);
});
