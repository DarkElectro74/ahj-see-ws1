/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
class Broadcasting {
  constructor(url) {
    this.url = url;
  }

  DOMInit() {
    const broadcastMessages = document.createElement('div');
    broadcastMessages.id = 'broadcast-messages';
    broadcastMessages.innerHTML = '<ul class="messages-list"></ul>';
    document.body.appendChild(broadcastMessages);
  }

  init() {
    this.DOMInit();
    this.messagesList = document.querySelector('.messages-list');
    this.events();
  }

  addMessage(shownMessage) {
    const {
      field, msg, date, id,
    } = JSON.parse(shownMessage);
    this.broadcastMessage = document.createElement('li');
    this.broadcastMessage.className = 'broadcast-message';
    this.broadcastMessage.dataset.id = id;
    this.broadcastMessage.innerHTML = `
    <div class="text-message">
      <span class="date">${this.printData(date)}</span>
      <div class="image-text">
        <span class="${field} image"></span>
        <p class="text">${msg}</p>
      </div>
    </div>
    `;
    this.messagesList.appendChild(this.broadcastMessage);
  }

  events() {
    const eventSource = new EventSource(this.url);

    eventSource.addEventListener('open', (event) => {
      console.log(event);
      console.log('connected to server');
    });

    eventSource.addEventListener('error', (event) => {
      console.log(event);
      console.log('error on server');
    });

    eventSource.addEventListener('comment', (event) => {
      this.addMessage(event.data);
      console.log(event.data);
    });
  }

  printData(shownDate) {
    const newDate = new Date(shownDate);
    const date = this.addNullToDate(newDate.getDate());
    const month = this.addNullToDate(newDate.getMonth() + 1);
    const year = this.addNullToDate(newDate.getFullYear());
    const hours = this.addNullToDate(newDate.getHours());
    const minutes = this.addNullToDate(newDate.getMinutes());
    const seconds = this.addNullToDate(newDate.getSeconds());
    const dateMessage = `${hours}:${minutes}:${seconds} ${date}.${month}.${year}`;
    return dateMessage;
  }

  addNullToDate(value) {
    const newValue = value < 10 ? `0${value}` : value;
    return newValue;
  }
}

const broadcasting = new Broadcasting('https://ahj-homeworks-sse-ws-server.herokuapp.com/sse');
broadcasting.init();